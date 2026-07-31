"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const raiz = path.join(__dirname, "..", "..");
const html = fs.readFileSync(
  path.join(raiz, "prototipos", "prospecto-v1", "index.html"),
  "utf8"
);

describe("estrutura HTML v1", () => {
  it("tem exatamente um h1", () => {
    const matches = html.match(/<h1[\s>]/g) || [];
    assert.equal(matches.length, 1);
  });

  it("h1 aparece antes do primeiro h2", () => {
    const iH1 = html.search(/<h1[\s>]/);
    const iH2 = html.search(/<h2[\s>]/);
    assert.ok(iH1 >= 0 && iH2 >= 0);
    assert.ok(iH1 < iH2);
  });

  it("não salta de h1 para h3 no Movimento I", () => {
    const iH1 = html.search(/<h1[\s>]/);
    const iH2 = html.search(/<h2[\s>]/);
    const iH3 = html.search(/<h3[\s>]/);
    assert.ok(iH1 < iH2 && iH2 < iH3);
    assert.match(
      html,
      /<h2 class="movimento__titulo abertura__movimento">\s*I · A necessidade\s*<\/h2>/
    );
  });

  it("skip link aponta para main#conteudo", () => {
    assert.match(html, /href="#conteudo"[^>]*>\s*Ir para o conteúdo principal/);
    assert.match(html, /<main[^>]*id="conteudo"/);
  });

  it("não possui IDs duplicados", () => {
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    const seen = new Set();
    const dups = [];
    ids.forEach((id) => {
      if (seen.has(id)) dups.push(id);
      seen.add(id);
    });
    assert.deepEqual(dups, []);
  });

  it("possui metadados essenciais", () => {
    assert.match(html, /lang="pt-BR"/);
    assert.match(html, /name="description"/);
    assert.match(html, /rel="canonical"/);
    assert.match(html, /name="theme-color"/);
    assert.match(html, /property="og:title"/);
    assert.match(html, /rel="icon"/);
    assert.match(html, /noindex/);
  });

  it("protege canonical, Open Graph e Twitter Card", () => {
    const urlPublica =
      "https://flavioiabuilder.github.io/projetocasernadeadulao/programas/discipulando-a-caserna/prototipos/prospecto-v1/";
    const imagemPublica =
      "https://flavioiabuilder.github.io/projetocasernadeadulao/programas/discipulando-a-caserna/assets/img/logo-pdac/LOGO_DaC_Master_Flat_2D_Color.png";

    assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
    assert.match(html, new RegExp(`rel="canonical"\\s+href="${urlPublica}"`));
    assert.match(html, /property="og:type" content="website"/);
    assert.match(html, /property="og:locale" content="pt_BR"/);
    assert.match(html, new RegExp(`property="og:url"\\s+content="${urlPublica}"`));
    assert.match(html, /property="og:title"/);
    assert.match(html, /property="og:description"/);
    assert.match(html, new RegExp(`property="og:image"\\s+content="${imagemPublica}"`));
    assert.match(html, /property="og:image:width" content="1563"/);
    assert.match(html, /property="og:image:height" content="1563"/);
    assert.match(html, /property="og:image:alt"/);
    assert.match(html, /name="twitter:card" content="summary"/);
    assert.match(html, /name="twitter:title"/);
    assert.match(html, /name="twitter:description"/);
    assert.match(html, new RegExp(`name="twitter:image"\\s+content="${imagemPublica}"`));
    assert.match(html, /name="twitter:image:alt"/);
    assert.ok(
      fs.existsSync(
        path.join(raiz, "assets/img/logo-pdac/LOGO_DaC_Master_Flat_2D_Color.png")
      )
    );
  });

  it("abertura com protagonismo Discipulando", () => {
    assert.match(html, /Projeto Caserna de Adulão/);
    assert.match(html, /<h1[^>]*>\s*Discipulando a Caserna\s*<\/h1>/);
    assert.match(
      html,
      /Um discipulado cristocêntrico para a caserna e para os que estão em\s+aperto/
    );
  });

  it("selo de versão candidata visível", () => {
    assert.match(html, /Versão candidata — aguardando apreciação pastoral/i);
  });

  it("escudo tem abas e lista operáveis", () => {
    assert.match(html, /data-marca-escudo/);
    assert.match(html, /role="tablist"/);
    assert.match(html, /data-escudo-lista/);
    assert.equal((html.match(/data-escudo-indice=/g) || []).length, 6);
  });

  it("esclarece remição sem concedê-la e sem aprovação conclusiva", () => {
    assert.match(html, /não concede remição de pena/i);
    assert.doesNotMatch(html, /aprovado pastoralmente/i);
    assert.doesNotMatch(html, /homologado(?!as)/i);
  });

  it("seções 8–15 não são mais âncoras vazias", () => {
    assert.doesNotMatch(html, /secao--ancora/);
    assert.match(html, /data-matriz/);
    assert.match(html, /data-anatomia/);
    assert.match(html, /data-folheador/);
    assert.match(html, /checklist-pastoral/);
    assert.match(html, /class="umbral"/);
  });

  it("numeração de seções é contínua 1–15", () => {
    for (let i = 1; i <= 15; i += 1) {
      assert.match(html, new RegExp(`id="secao-${i}"`));
    }
  });

  it("cinco movimentos âncorados", () => {
    for (let i = 1; i <= 5; i += 1) {
      assert.match(html, new RegExp(`id="movimento-${i}"`));
    }
  });

  it("abertura institucional sem saudação nominal", () => {
    assert.doesNotMatch(html, /data-saudacao/);
    assert.doesNotMatch(html, /Pastor Glaydston,/);
    assert.match(html, /Estas páginas são versão candidata/i);
  });
});
