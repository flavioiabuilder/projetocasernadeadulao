/**
 * Verifica âncoras literais de conteudo/*.md presentes em index.html.
 * Não converte Markdown em HTML — apenas detecta deriva óbvia.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const raiz = path.join(__dirname, "..");

/** Frases-chave que devem existir (normalizadas) no prospecto publicado. */
const ANCORAS = [
  {
    fonte: "conteudo/secoes-01-04-a-necessidade.md",
    trecho:
      "Não começo esta apresentação pelo material. Começo pelo homem que o tornou necessário.",
  },
  {
    fonte: "conteudo/secoes-01-04-a-necessidade.md",
    trecho: "Presídio Militar da Polícia Militar do Ceará",
  },
  {
    fonte: "conteudo/secoes-05-07-a-resposta.md",
    trecho: "Cristo chama, treina, molda e envia",
  },
  {
    fonte: "conteudo/secoes-12-15-a-prova-e-o-pedido.md",
    trecho: "não distribuir antes da apreciação pastoral",
  },
];

function normalizar(texto) {
  return texto
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function main() {
  const html = normalizar(
    fs.readFileSync(path.join(raiz, "prototipos", "prospecto-v1", "index.html"), "utf8")
  );
  let falhas = 0;

  ANCORAS.forEach(({ fonte, trecho }) => {
    const mdPath = path.join(raiz, fonte);
    const md = fs.readFileSync(mdPath, "utf8");
    if (!md.includes(trecho) && !normalizar(md).includes(normalizar(trecho))) {
      console.error(`FALHA âncora ausente na fonte ${fonte}: ${trecho}`);
      falhas += 1;
      return;
    }
    if (!html.includes(normalizar(trecho))) {
      console.error(`FALHA paridade: trecho de ${fonte} ausente em index.html`);
      console.error(`  → ${trecho}`);
      falhas += 1;
    } else {
      console.log(`OK paridade: ${trecho.slice(0, 48)}…`);
    }
  });

  if (falhas > 0) {
    process.exit(1);
  }
  console.log("check:paridade-editorial OK");
}

if (require.main === module) {
  main();
}

module.exports = { ANCORAS, normalizar, main };
