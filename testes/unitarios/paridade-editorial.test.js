"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const {
  ANCORAS,
  normalizar,
  main,
} = require("../../ferramentas/verificar-paridade-editorial");
const fs = require("node:fs");
const path = require("node:path");

const raiz = path.join(__dirname, "..", "..");

describe("paridade editorial MD ↔ index.html", () => {
  it("expõe âncoras configuradas", () => {
    assert.ok(ANCORAS.length >= 3);
  });

  it("normaliza espaços e tags", () => {
    assert.equal(normalizar("a   <b>b</b>\n c"), "a b c");
  });

  it("passa o checker sem falhas", () => {
    assert.doesNotThrow(() => main());
  });

  it("cada âncora existe na fonte Markdown", () => {
    ANCORAS.forEach(({ fonte, trecho }) => {
      const md = fs.readFileSync(path.join(raiz, fonte), "utf8");
      assert.ok(
        md.includes(trecho) || normalizar(md).includes(normalizar(trecho)),
        fonte
      );
    });
  });
});
