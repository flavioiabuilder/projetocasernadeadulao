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

  it("não declara lacuna falsa nas seções 10 e 11", () => {
    const html = fs.readFileSync(path.join(cand, "index.html"), "utf8");
    assert.doesNotMatch(html, /Lacuna declarada/);
    assert.match(html, /Anatomia de uma lição/);
    assert.match(html, /Exclusivo do Instrutor|Objetivos da lição/);
  });

  it("preserva listas de escopo e salvaguardas", () => {
    const html = fs.readFileSync(path.join(cand, "index.html"), "utf8");
    assert.match(html, /Fundamentos bíblicos e hermenêuticos/);
    assert.match(html, /Debates confessionais secundários/);
    assert.match(html, /Não há ranking, comparação/);
  });

  it("separa múltiplas tabelas nas seções 11 e 12", () => {
    const s11 = fs.readFileSync(path.join(cand, "parcial", "secao-11.html"), "utf8");
    const s12 = fs.readFileSync(path.join(cand, "parcial", "secao-12.html"), "utf8");
    assert.equal((s11.match(/dc-tabela-wrap/g) || []).length, 2);
    assert.equal((s12.match(/dc-tabela-wrap/g) || []).length, 2);
    assert.doesNotMatch(s11, /----/);
  });

  it("matriz sem hidden estático e sumário via details", () => {
    const html = fs.readFileSync(path.join(cand, "index.html"), "utf8");
    assert.match(html, /<details class="dc-sumario-pe"/);
    const matriz = fs.readFileSync(path.join(cand, "parcial", "matriz.html"), "utf8");
    assert.doesNotMatch(matriz, /hidden/);
    assert.match(matriz, /data-ativacao="automatica"/);
  });

  it("relatório é determinístico (sem geradoEm/ms)", () => {
    const rel = JSON.parse(
      fs.readFileSync(path.join(cand, "parcial", "relatorio.json"), "utf8")
    );
    assert.equal(rel.geradoEm, undefined);
    assert.equal(rel.ms, undefined);
    assert.equal(rel.parser, "parse-md-blocos");
  });

  it("declara pendências humanas do folheador e do dossiê", () => {
    const html = fs.readFileSync(path.join(cand, "index.html"), "utf8");
    assert.match(html, /data-pendencia="F6-05"/);
    assert.match(html, /data-pendencia="F6-06"/);
  });
});
