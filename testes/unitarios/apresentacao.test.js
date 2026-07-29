"use strict";

const { describe, it, before } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const raiz = path.join(__dirname, "..", "..");

function ler(rel) {
  return fs.readFileSync(path.join(raiz, rel), "utf8");
}

describe("apresentação de homologação", () => {
  before(() => {
    execFileSync(
      process.execPath,
      [path.join(raiz, "ferramentas", "gerar-apresentacao-homologacao.js")],
      { cwd: raiz, stdio: "pipe" }
    );
  });

  it("alternar versão contínua não recarrega a página (preserva checklist)", () => {
    const fonte = ler("ferramentas/gerar-apresentacao-homologacao.js");
    const html = ler("apresentacao/homologacao-pastoral.html");

    const blocoFonte = fonte.match(
      /getElementById\("modo-toggle"\)\.addEventListener\("click",function\(\)\{[\s\S]*?\n\}\);/
    );
    assert.ok(blocoFonte, "handler modo-toggle ausente no gerador");
    assert.doesNotMatch(
      blocoFonte[0],
      /location\.reload\s*\(/,
      "gerador: location.reload no toggle apaga checklist pastoral"
    );
    assert.match(
      blocoFonte[0],
      /scrollSnapType/,
      "gerador: toggle deve restaurar scroll-snap sem reload"
    );

    const blocoHtml = html.match(
      /getElementById\("modo-toggle"\)\.addEventListener\("click",function\(\)\{[\s\S]*?\n\}\);/
    );
    assert.ok(blocoHtml, "handler modo-toggle ausente no HTML gerado");
    assert.doesNotMatch(
      blocoHtml[0],
      /location\.reload\s*\(/,
      "HTML: location.reload no toggle apaga checklist pastoral"
    );
  });
});
