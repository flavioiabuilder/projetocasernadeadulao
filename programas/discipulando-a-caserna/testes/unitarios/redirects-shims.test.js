"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRaiz = path.join(__dirname, "..", "..", "..", "..");

const shims = [
  {
    arquivo: path.join("prototipos", "storytelling-v1", "index.html"),
    destinoRelativo:
      "../../programas/discipulando-a-caserna/prototipos/storytelling-v1/",
  },
  {
    arquivo: path.join("prototipos", "direcao-a", "index.html"),
    destinoRelativo:
      "../../programas/discipulando-a-caserna/prototipos/direcoes-visuais-v1/direcao-a/",
  },
  {
    arquivo: path.join("prototipos", "direcao-b", "index.html"),
    destinoRelativo:
      "../../programas/discipulando-a-caserna/prototipos/direcoes-visuais-v1/direcao-b/",
  },
  {
    arquivo: path.join("prototipos", "direcao-c", "index.html"),
    destinoRelativo:
      "../../programas/discipulando-a-caserna/prototipos/direcoes-visuais-v1/direcao-c/",
  },
];

describe("shims de URL legada (Pages project base)", () => {
  for (const { arquivo, destinoRelativo } of shims) {
    it(`${arquivo} redireciona com caminho relativo (não /programas/ na raiz do host)`, () => {
      const html = fs.readFileSync(path.join(repoRaiz, arquivo), "utf8");

      assert.match(
        html,
        new RegExp(
          `http-equiv="refresh"[^>]*content="0;\\s*url=${destinoRelativo.replace(/\//g, "\\/")}"`,
          "i"
        ),
        "meta refresh deve usar destino relativo ao shim"
      );
      assert.match(
        html,
        new RegExp(`href="${destinoRelativo.replace(/\//g, "\\/")}"`),
        "link de fallback deve usar o mesmo destino relativo"
      );
      assert.doesNotMatch(
        html,
        /url=\/programas\//i,
        "url absoluta na raiz do host quebra em GitHub Pages de projeto"
      );
      assert.doesNotMatch(
        html,
        /href="\/programas\//i,
        "href absoluto na raiz do host quebra em GitHub Pages de projeto"
      );
    });
  }
});
