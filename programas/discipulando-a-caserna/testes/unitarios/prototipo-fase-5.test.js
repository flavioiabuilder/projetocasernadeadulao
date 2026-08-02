"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const raiz = path.join(__dirname, "../..");
const cand = path.join(raiz, "prototipos", "prospecto-fase-5-v1");

describe("prototipo-fase-5 candidato", () => {
  it("index importa tokens do design-system e não lab.css", () => {
    const html = fs.readFileSync(path.join(cand, "index.html"), "utf8");
    assert.match(html, /design-system\/tokens\/tokens\.css/);
    assert.doesNotMatch(html, /laboratorio\/css\/lab\.css/);
  });

  it("declara cinco movimentos e pedido/checklist", () => {
    const html = fs.readFileSync(path.join(cand, "index.html"), "utf8");
    for (let m = 1; m <= 5; m += 1) {
      assert.match(html, new RegExp(`id="movimento-${m}"`));
    }
    assert.match(html, /id="checklist-apreciacao"/);
    assert.match(html, /portão pastoral|A palavra final|prefácio/i);
  });

  it("parcial/relatorio marca não canônico", () => {
    const rel = JSON.parse(
      fs.readFileSync(path.join(cand, "parcial", "relatorio.json"), "utf8")
    );
    assert.equal(rel.canonic, false);
    assert.equal(rel.fase6, "bloqueada");
  });

  it("CSS do candidato não usa primitivos", () => {
    const css = fs.readFileSync(path.join(cand, "css", "prototipo.css"), "utf8");
    const code = css.replace(/\/\*[\s\S]*?\*\//g, "");
    assert.doesNotMatch(code, /--primitivo-/);
  });
});
