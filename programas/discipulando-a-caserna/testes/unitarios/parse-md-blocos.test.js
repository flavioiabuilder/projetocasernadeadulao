"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { parseBlocos, dividirSecoes } = require("../../ferramentas/parse-md-blocos");

const raiz = path.join(__dirname, "../..");

describe("parse-md-blocos", () => {
  it("preserva múltiplas tabelas na mesma seção", () => {
    const md = fs.readFileSync(
      path.join(raiz, "conteudo", "secoes-08-11-o-programa.md"),
      "utf8"
    );
    const mapa = dividirSecoes(md);
    const s11 = mapa.get(11);
    const tables = s11.blocos.filter((b) => b.type === "table");
    assert.equal(tables.length, 2);
    assert.deepEqual(tables[0].header, ["Item", "Descrição"]);
    assert.deepEqual(tables[1].header.slice(0, 3), ["Momento", "Faixa", "Finalidade"]);
    assert.ok(tables[0].rows.length >= 4);
    assert.ok(tables[1].rows.length >= 3);
  });

  it("preserva listas de escopo e fora de escopo", () => {
    const md = fs.readFileSync(
      path.join(raiz, "conteudo", "secoes-08-11-o-programa.md"),
      "utf8"
    );
    const listas = mapaListas(dividirSecoes(md).get(8));
    assert.ok(listas.some((l) => l.items.some((i) => /Fundamentos bíblicos/i.test(i))));
    assert.ok(listas.some((l) => l.items.some((i) => /Debates confessionais/i.test(i))));
  });

  it("preserva salvaguardas na seção 14", () => {
    const md = fs.readFileSync(
      path.join(raiz, "conteudo", "secoes-12-15-a-prova-e-o-pedido.md"),
      "utf8"
    );
    const s14 = dividirSecoes(md).get(14);
    const ul = s14.blocos.filter((b) => b.type === "ul");
    assert.ok(ul.length >= 1);
    assert.ok(ul.some((l) => l.items.some((i) => /ranking/i.test(i))));
  });

  it("não inclui Travas/Decisões no corpo da seção 15", () => {
    const md = fs.readFileSync(
      path.join(raiz, "conteudo", "secoes-12-15-a-prova-e-o-pedido.md"),
      "utf8"
    );
    const s15 = dividirSecoes(md).get(15);
    assert.doesNotMatch(s15.corpo, /## Travas destas seções/);
    assert.doesNotMatch(s15.corpo, /## Decisões fixadas/);
  });

  it("falha em tabela sem separador quando strict", () => {
    assert.throws(() => {
      parseBlocos("| A | B |\n| 1 | 2 |\n", { strict: true });
    }, /separadora/);
  });
});

function mapaListas(secao) {
  return secao.blocos.filter((b) => b.type === "ul" || b.type === "ol");
}
