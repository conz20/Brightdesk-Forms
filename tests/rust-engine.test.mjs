import test from"node:test";import assert from"node:assert/strict";import{engineInfo,normalizeEmbedding,cosineSimilarity,rankEmbeddings,chunkSource,analyzeSource}from"../scripts/rust-engine.mjs";test("Node-API loads and reports capabilities",()=>{const i=engineInfo();assert.equal(i.engine,"Brightdesk Rust Native Engine");assert.equal(i.nodeApiVersion,8);});test("normalizes and validates vectors",()=>{assert.ok(Math.abs(normalizeEmbedding([3,4])[0]-0.6)<1e-10);assert.throws(()=>normalizeEmbedding([0,0]),/non-zero/i);});test("similarity and deterministic ranking",()=>{assert.equal(cosineSimilarity([1,0],[2,0]),1);assert.deepEqual(rankEmbeddings([1,0],[[0,1],[1,0],[2,0]]).map(x=>x.index),[1,2,0]);});test("unicode chunking and source stats",()=>{const s="🦀".repeat(100),c=chunkSource(s,128);assert.equal(c.join(""),s);assert.ok(c.every(x=>Buffer.byteLength(x)<=128));assert.equal(analyzeSource("one two\nthree").tokenCount,3);});

import fallbackModule from "../src/rust-engine-fallback.js";
const { createJavaScriptFallback } = fallbackModule;
test("JavaScript fallback matches the native engine contract", () => {
  const fallback = createJavaScriptFallback();
  const sample = ["one two", "three"].join(String.fromCharCode(10));
  assert.equal(fallback.engineInfo().native, false);
  assert.deepEqual(fallback.analyzeSource(sample), { bytes: 13, lines: 2, tokenCount: 3 });
  assert.deepEqual(fallback.normalizeEmbedding([3, 4]), [0.6, 0.8]);
  assert.equal(fallback.cosineSimilarity([1, 0], [2, 0]), 1);
  assert.deepEqual(fallback.rankEmbeddings([1, 0], [[0, 1], [1, 0], [2, 0]]).map(x => x.index), [1, 2, 0]);
});
test("JavaScript fallback preserves Unicode chunk boundaries and limits", () => {
  const fallback = createJavaScriptFallback(), source = "🦀".repeat(100);
  const chunks = fallback.chunkSource(source, 128);
  assert.ok(chunks.every(chunk => Buffer.byteLength(chunk) <= 128));
  assert.equal(chunks.join(""), source);
  assert.throws(() => fallback.normalizeEmbedding([0, 0]), /non-zero/i);
  assert.throws(() => fallback.chunkSource("text", 64), /between 128 and 16000/i);
});
