"use strict";

/**
 * Validação HTML da reconstrução Átrio (demo + laboratório).
 *
 * Escopo próprio desta referência. O lint do Discipulando a Caserna
 * (programas/.../ferramentas/lint-html.js) valida outro arquivo, com outras
 * regras, e não é tocado por aqui.
 */

const { HtmlValidate } = require("html-validate");
const fs = require("fs");
const path = require("path");

const RAIZ = path.resolve(__dirname, "..");
const ALVOS = [
  path.join("design-system", "demo.html"),
  path.join("design-system", "laboratorio.html"),
];

const htmlvalidate = new HtmlValidate({
  extends: ["html-validate:recommended"],
  rules: {
    // Prettier (formatador do repositório) escreve `<!doctype html>` em
    // minúsculas. Manter a regra ligada faria lint e format brigarem.
    "doctype-style": "off",
    // A demo e o laboratório carregam estilos posicionais inline em
    // espécimes gerados por JS; a regra atrapalha sem proteger nada aqui.
    "no-inline-style": "off",
    "void-style": "off",
    "no-implicit-button-type": "off",
    "prefer-native-element": "off",
    "text-content": "off",
    "long-title": "off",
    "no-trailing-whitespace": "off",
    // O laboratório usa <h3> como rótulo de espécime dentro de <section>,
    // sem hierarquia editorial real.
    "heading-level": "warn",
  },
});

async function main() {
  let erros = 0;
  let avisos = 0;

  for (const relativo of ALVOS) {
    const absoluto = path.join(RAIZ, relativo);
    const html = fs.readFileSync(absoluto, "utf8");
    const report = await htmlvalidate.validateString(html, relativo);

    for (const resultado of report.results) {
      for (const m of resultado.messages || []) {
        const linha = `${relativo}:${m.line}:${m.column} ${m.ruleId} — ${m.message}`;
        if (m.severity === 2) {
          erros += 1;
          console.error(`  erro   ${linha}`);
        } else {
          avisos += 1;
          console.warn(`  aviso  ${linha}`);
        }
      }
    }
  }

  console.log(
    `lint-html (soul-church): ${ALVOS.length} arquivo(s), ${erros} erro(s), ${avisos} aviso(s)`
  );
  if (erros > 0) process.exitCode = 1;
}

main().catch((erro) => {
  console.error(erro);
  process.exitCode = 1;
});
