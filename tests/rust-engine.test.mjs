import { readFileSync } from "node:fs";
import test from"node:test";import assert from"node:assert/strict";import{engineInfo,normalizeEmbedding,cosineSimilarity,rankEmbeddings,chunkSource,analyzeSource}from"../scripts/rust-engine.mjs";test("loads the native engine or a compatible JavaScript fallback",()=>{const i=engineInfo();assert.ok(i.native===true||i.fallback===true);assert.equal(typeof i.engine,"string");if(process.env.BRIGHTDESK_REQUIRE_NATIVE_ENGINE==="1"){assert.equal(i.native,true);assert.equal(i.nodeApiVersion,8);assert.ok(i.capabilities.includes("vector-ranking"));}});test("normalizes and validates vectors",()=>{assert.ok(Math.abs(normalizeEmbedding([3,4])[0]-0.6)<1e-10);assert.throws(()=>normalizeEmbedding([0,0]),/non-zero/i);});test("similarity and deterministic ranking",()=>{assert.equal(cosineSimilarity([1,0],[2,0]),1);assert.deepEqual(rankEmbeddings([1,0],[[0,1],[1,0],[2,0]]).map(x=>x.index),[1,2,0]);});test("unicode chunking and source stats",()=>{const s="🦀".repeat(100),c=chunkSource(s,128);assert.equal(c.join(""),s);assert.ok(c.every(x=>Buffer.byteLength(x)<=128));assert.equal(analyzeSource("one two\nthree").tokenCount,3);});

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


const productBuilderConfig = readFileSync(
  new URL("../electron-builder.app.config.js", import.meta.url),
  "utf8"
);
test("desktop installer includes and unpacks the native Rust addon", () => {
  assert.ok(productBuilderConfig.includes("'native/brightdesk_engine.node'"));
  assert.ok(productBuilderConfig.includes("asarUnpack: ['native/brightdesk_engine.node']"));
});


const rustWorkflowSource = readFileSync(
  new URL("../.github/workflows/rust-engine.yml", import.meta.url),
  "utf8"
);
test("Rust CI uses verified immutable action pins and requires the native engine", () => {
  assert.ok(rustWorkflowSource.includes("actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683"));
  assert.ok(rustWorkflowSource.includes("actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020"));
  assert.ok(rustWorkflowSource.includes("dtolnay/rust-toolchain@683b588c487a69d01f6c6ddf40f036ff682cc2c8"));
  assert.equal(rustWorkflowSource.includes("a26af69be951a213d495a4c3e4e4022e16d87065"), false);
  assert.ok(rustWorkflowSource.includes('BRIGHTDESK_REQUIRE_NATIVE_ENGINE: "1"'));
  assert.ok(rustWorkflowSource.includes("npm run native:build"));
});
