/**
 * Regenera o candidato Fase 5 em área temporária e compara os artefatos
 * versionados, sem modificar o candidato canônico.
 */
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { buildPrototype } = require("./gerar-prototipo-fase-5");

const raiz = path.resolve(__dirname, "../../..");
const cand = path.join(
  raiz,
  "programas",
  "discipulando-a-caserna",
  "prototipos",
  "prospecto-fase-5-v1"
);

const TRACKED = [
  "index.html",
  "js/config.js",
  "js/dados/licao1.js",
  "parcial/relatorio.json",
  "parcial/matriz.html",
  "parcial/checklist.html",
  ...Array.from({ length: 15 }, (_, index) => `parcial/secao-${index + 1}.html`),
  ...Array.from({ length: 5 }, (_, index) => `parcial/movimento-${index + 1}.html`),
];

function normalize(conteudo) {
  const normalizado = String(conteudo)
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n+$/, "");
  return `${normalizado}\n`;
}

function main() {
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "f5-stale-"));
  const tmpCand = path.join(tmpRoot, "prospecto-fase-5-v1");
  const divergencias = [];

  try {
    buildPrototype({
      repositoryRoot: raiz,
      outputDir: tmpCand,
      writeTelemetry: false,
      mode: "stale",
    });

    for (const relativo of TRACKED) {
      const versionado = path.join(cand, relativo);
      const gerado = path.join(tmpCand, relativo);
      if (!fs.existsSync(versionado)) {
        divergencias.push(`${relativo} (versionado ausente)`);
        continue;
      }
      if (!fs.existsSync(gerado)) {
        divergencias.push(`${relativo} (gerado ausente)`);
        continue;
      }
      if (
        normalize(fs.readFileSync(versionado, "utf8")) !==
        normalize(fs.readFileSync(gerado, "utf8"))
      ) {
        divergencias.push(relativo);
      }
    }
  } catch (erro) {
    divergencias.push(`geração temporária falhou: ${erro.message || erro}`);
  } finally {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  }

  if (divergencias.length > 0) {
    console.error("FAIL: candidato Fase 5 está divergente:");
    for (const divergencia of divergencias) {
      console.error(`- ${divergencia}`);
    }
    process.exitCode = 1;
    return divergencias;
  }

  console.log("check:discipulando:prototipo-fase-5:stale OK");
  return [];
}

if (require.main === module) {
  main();
}

module.exports = { main, normalize, TRACKED };
