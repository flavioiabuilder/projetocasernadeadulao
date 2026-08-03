"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const raiz = path.resolve(__dirname, "..");
const tokens = JSON.parse(
  fs.readFileSync(path.join(raiz, "design-system", "tokens", "tokens.json"), "utf8"),
);
const css = fs.readFileSync(path.join(raiz, "design-system", "css", "tokens.css"), "utf8");

describe("Friso tokens", () => {
  it("tem meta e prefixo fr", () => {
    assert.equal(tokens.$meta.prefixoCSS, "fr");
  });

  it("expõe carmesim e creme no CSS gerado", () => {
    assert.match(css, /--fr-color-carmesim:\s*#b21e3b/i);
    assert.match(css, /--fr-color-creme:\s*#fbfaf8/i);
  });

  it("não hotlinka o domínio da referência", () => {
    const demo = fs.readFileSync(path.join(raiz, "design-system", "demo.html"), "utf8");
    assert.doesNotMatch(demo, /korowa\.vic\.edu\.au/i);
  });

  it("motion progress é função total", () => {
    const motion = fs.readFileSync(path.join(raiz, "design-system", "js", "motion.js"), "utf8");
    assert.match(motion, /function progress/);
    assert.match(motion, /prefers-reduced-motion/);
  });
});
