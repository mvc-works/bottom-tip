import assert from "node:assert/strict";
import test from "node:test";

test("compiled public entry imports in native Node ESM without a resolver hook or browser globals", async () => {
  assert.equal(typeof globalThis.document, "undefined");
  assert.equal(typeof globalThis.window, "undefined");
  const api = await import("../lib/bottom-tip.js");
  assert.equal(typeof api.default, "function");
  assert.equal(typeof api.renderTip, "function");
});
