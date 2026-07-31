"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const raiz = path.join(__dirname, "..", "..");
const caminhoHtml = path.join(raiz, "prototipos", "storytelling-v1", "index.html");
const html = fs.readFileSync(caminhoHtml, "utf8");
const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? "";

const metadadosEsperados = new Map([
  ["og:type", "article"],
  ["og:locale", "pt_BR"],
  ["og:site_name", "Projeto Caserna de Adulão"],
  ["og:title", "Discipulando a Caserna — apresentação para apreciação pastoral"],
  [
    "og:description",
    "Documento de trabalho em versão candidata. Leitura de cerca de 30 minutos, sem necessidade de apresentador.",
  ],
  [
    "og:image",
    "https://flavioiabuilder.github.io/projetocasernadeadulao/programas/discipulando-a-caserna/assets/img/logo-pdac/LOGO_DaC_Master_Flat_2D_Color.png",
  ],
  ["og:image:alt", "Escudo do Projeto Caserna de Adulão"],
]);

function escaparExpressaoRegular(valor) {
  return valor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

describe("metadados do protótipo storytelling-v1", () => {
  it("mantém um conjunto único e coerente de Open Graph", () => {
    for (const [propriedade, conteudo] of metadadosEsperados) {
      const propriedadeEscapada = escaparExpressaoRegular(propriedade);
      const ocorrencias = head.match(
        new RegExp(`<meta\\s+property="${propriedadeEscapada}"`, "g")
      );

      assert.equal(ocorrencias?.length ?? 0, 1, propriedade);
      assert.match(
        head,
        new RegExp(
          `<meta\\s+property="${propriedadeEscapada}"\\s+content="${escaparExpressaoRegular(conteudo)}">`
        )
      );
    }
  });

  it("mantém uma Twitter Card summary_large_image", () => {
    const ocorrencias = head.match(/<meta\s+name="twitter:card"/g) ?? [];

    assert.equal(ocorrencias.length, 1);
    assert.match(head, /<meta\s+name="twitter:card"\s+content="summary_large_image">/);
  });

  it("mantém uma canonical absoluta para o diretório publicado", () => {
    const ocorrencias = head.match(/<link\s+rel="canonical"/g) ?? [];

    assert.equal(ocorrencias.length, 1);
    assert.match(
      head,
      /<link\s+rel="canonical"\s+href="https:\/\/flavioiabuilder\.github\.io\/projetocasernadeadulao\/programas\/discipulando-a-caserna\/prototipos\/storytelling-v1\/">/
    );
  });

  it("preserva um único robots com noindex e nofollow", () => {
    const robots = [...head.matchAll(/<meta\s+name="robots"\s+content="([^"]+)">/g)];

    assert.equal(robots.length, 1);
    assert.deepEqual(new Set(robots[0][1].split(",")), new Set(["noindex", "nofollow"]));
  });

  it("referencia o PNG local correspondente à imagem social", () => {
    const caminhoImagem = path.join(
      raiz,
      "assets",
      "img",
      "logo-pdac",
      "LOGO_DaC_Master_Flat_2D_Color.png"
    );
    const imagem = fs.readFileSync(caminhoImagem);

    assert.equal(imagem.subarray(1, 4).toString("ascii"), "PNG");
    assert.ok(imagem.readUInt32BE(16) > 0);
    assert.ok(imagem.readUInt32BE(20) > 0);
  });
});
