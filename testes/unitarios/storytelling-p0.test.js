"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(
  path.join(__dirname, "..", "..", "prototipos", "storytelling-v1", "index.html"),
  "utf8"
);

describe("achados P0 do storytelling-v1", () => {
  it("oferece três decisões nativas com rótulos associados", () => {
    const ids = ["decisao-modulo-1", "decisao-guia-mestre", "decisao-modulos-2-4"];
    for (const id of ids) {
      assert.match(html, new RegExp(`<input id="${id}"[^>]+type="checkbox"`));
      assert.match(html, new RegExp(`<label for="${id}">`));
    }
    assert.match(html, /<fieldset class="decisao" id="decisao-pastoral">/);
  });

  it("inclui observações, ações e retorno acessível", () => {
    assert.match(html, /<textarea id="observacoes-pastorais"/);
    assert.match(html, /id="copiar-resumo"[^>]*>Copiar resumo/);
    assert.match(
      html,
      /id="responder-email"[^>]*href="mailto:casernadeadulao@gmail.com"/
    );
    assert.match(html, /id="estado-copia" role="status" aria-live="polite"/);
  });

  it("declara no Ato VI a ausência de registros publicáveis sem placeholders", () => {
    const atoSeis = html.match(/id="s32"[\s\S]*?data-ato="7"/)?.[0] ?? "";
    assert.match(
      atoSeis,
      /Este documento não publica registros, imagens ou testemunhos dos militares atendidos\./
    );
    assert.doesNotMatch(
      atoSeis,
      /\[(?:mês\/ano|número de encontros|nome da autorização|a preencher)\]/i
    );
  });
});
