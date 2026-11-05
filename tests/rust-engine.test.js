'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const engine = require('../src/rust-engine');
const { createJavaScriptFallback } = require('../src/rust-engine-fallback');

test('engine reports native or fallback mode', () => {
  const info = engine.engineInfo();
  assert.equal(typeof info.engine, 'string');
  assert.ok(info.native === true || info.fallback === true);
  if (process.env.BRIGHTDESK_REQUIRE_NATIVE_ENGINE === '1') {
    assert.equal(info.native, true);
    assert.equal(info.nodeApiVersion, 8);
  }
});

test('fallback validates vectors and ranks them deterministically', () => {
  const fallback = createJavaScriptFallback();
  assert.deepEqual(fallback.normalizeEmbedding([3, 4]), [0.6, 0.8]);
  assert.equal(fallback.cosineSimilarity([1, 0], [2, 0]), 1);
  assert.deepEqual(
    fallback.rankEmbeddings([1, 0], [[0, 1], [1, 0], [2, 0]]).map(item => item.index),
    [1, 2, 0]
  );
  assert.throws(() => fallback.normalizeEmbedding([0, 0]), /non-zero/i);
  assert.throws(() => fallback.normalizeEmbedding([Number.NaN]), /finite/i);
});

test('fallback chunks preserve Unicode and report source statistics', () => {
  const fallback = createJavaScriptFallback();
  const source = '🦀'.repeat(100);
  const chunks = fallback.chunkSource(source, 128);
  assert.ok(chunks.every(chunk => Buffer.byteLength(chunk, 'utf8') <= 128));
  assert.equal(chunks.join(''), source);
  assert.deepEqual(fallback.analyzeSource('one two\nthree'), {
    bytes: 13,
    lines: 2,
    tokenCount: 3
  });
});
