"use strict";

const { describe, it, before } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const raiz = path.join(__dirname, "..", "..");
const htmlPath = path.join(raiz, "prototipos", "homologacao-pastoral-v1", "index.html");

describe("apresentação de homologação", () => {
  before(() => {
    execFileSync(
      process.execPath,
      [path.join(raiz, "ferramentas", "gerar-apresentacao-homologacao.js")],
      { cwd: raiz, stdio: "pipe" }
    );
  });

  it("gera HTML com um h1, skip link e chave de retomada", () => {
    const html = fs.readFileSync(htmlPath, "utf8");
    const h1 = html.match(/<h1[\s>]/g) || [];
    assert.equal(h1.length, 1);
    assert.match(html, /class="skip-link" href="#deck"/);
    assert.match(html, /dac-homologacao-v2-tela/);
    assert.match(html, /<style>/);
    assert.match(html, /licoes/i);
  });

  it("permanece autocontido (sem script src externo)", () => {
    const html = fs.readFileSync(htmlPath, "utf8");
    assert.doesNotMatch(html, /<script[^>]+src=["']https?:/i);
    assert.doesNotMatch(html, /<link[^>]+href=["']https?:\/\/fonts/i);
  });
});
