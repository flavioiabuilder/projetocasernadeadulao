/**
 * Stale-check do candidato F5: regenera em diretório temporário e compara
 * com artefatos versionados. Não altera o working tree do candidato.
 *
 * Uso: node ferramentas/check-prototipo-fase-5-stale.js
 */
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const raiz = path.join(__dirname, "..");
const cand = path.join(raiz, "prototipos", "prospecto-fase-5-v1");
const genFile = path.join(__dirname, "gerar-prototipo-fase-5.js");

const TRACKED = [
  "index.html",
  "js/config.js",
  "parcial/relatorio.json",
  "parcial/matriz.html",
  "parcial/checklist.html",
  ...Array.from({ length: 15 }, (_, i) => `parcial/secao-${i + 1}.html`),
  ...Array.from({ length: 5 }, (_, i) => `parcial/movimento-${i + 1}.html`),
];

function normalize(content) {
  return String(content).replace(/\r\n/g, "\n").replace(/\s+$/gm, "").trim() + "\n";
}

function main() {
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "f5-stale-"));
  const tmpCand = path.join(tmpRoot, "prospecto-fase-5-v1");
  fs.mkdirSync(path.join(tmpCand, "js"), { recursive: true });
  fs.mkdirSync(path.join(tmpCand, "parcial"), { recursive: true });
  // CSS referenciado no HTML mas não comparado aqui
  fs.mkdirSync(path.join(tmpCand, "css"), { recursive: true });

  const parseAbs = path.join(__dirname, "parse-md-blocos.js").replace(/\\/g, "/");
  const instAbs = path.join(__dirname, "institucional.js").replace(/\\/g, "/");
  const raizLit = `const raiz = ${JSON.stringify(raiz)};`;
  const destLit = `const destRoot = ${JSON.stringify(tmpCand)};`;
  const src = fs
    .readFileSync(genFile, "utf8")
    .replace(/const raiz = path\.join\(__dirname, "\.\."\);/, raizLit)
    .replace(
      /const destRoot = path\.join\(raiz, "prototipos", "prospecto-fase-5-v1"\);/,
      destLit
    )
    .replace(`require("./parse-md-blocos")`, `require(${JSON.stringify(parseAbs)})`)
    .replace(`require("./institucional")`, `require(${JSON.stringify(instAbs)})`);
  // Contrato: nunca escrever no candidato versionado. Se o patch de destRoot
  // falhar (ex.: aspas/refactor no gerador), abortar antes do spawn.
  if (!src.includes(raizLit) || !src.includes(destLit)) {
    console.error(
      "FAIL: não foi possível redirecionar raiz/destRoot para o diretório temporário"
    );
    console.error(
      "O stale-check recusou rodar para não sobrescrever prototipos/prospecto-fase-5-v1"
    );
    fs.rmSync(tmpRoot, { recursive: true, force: true });
    process.exit(1);
  }
  if (src.includes('path.join(raiz, "prototipos", "prospecto-fase-5-v1")')) {
    console.error(
      "FAIL: destRoot ainda aponta para o candidato versionado após o patch"
    );
    fs.rmSync(tmpRoot, { recursive: true, force: true });
    process.exit(1);
  }
  const tmpScript = path.join(tmpRoot, "gerar-tmp.js");
  fs.writeFileSync(tmpScript, src, "utf8");

  const child = spawnSync(process.execPath, [tmpScript], {
    encoding: "utf8",
    cwd: raiz,
  });
  if (child.status !== 0) {
    console.error(child.stdout || "");
    console.error(child.stderr || "");
    console.error("FAIL: geração temporária do candidato F5 falhou");
    fs.rmSync(tmpRoot, { recursive: true, force: true });
    process.exit(1);
  }

  let failures = 0;
  for (const rel of TRACKED) {
    const a = path.join(cand, rel);
    const b = path.join(tmpCand, rel);
    if (!fs.existsSync(a)) {
      console.error(`FAIL: versionado ausente: ${rel}`);
      failures += 1;
      continue;
    }
    if (!fs.existsSync(b)) {
      console.error(`FAIL: gerado ausente: ${rel}`);
      failures += 1;
      continue;
    }
    if (normalize(fs.readFileSync(a, "utf8")) !== normalize(fs.readFileSync(b, "utf8"))) {
      console.error(`FAIL: drift em ${rel}`);
      failures += 1;
    } else {
      console.log(`OK: ${rel}`);
    }
  }

  fs.rmSync(tmpRoot, { recursive: true, force: true });

  if (failures > 0) {
    console.error(`\ncheck:discipulando:prototipo-fase-5:stale FALHOU (${failures}).`);
    console.error("Rode: npm run generate:discipulando:prototipo-fase-5");
    process.exit(1);
  }
  console.log("\ncheck:discipulando:prototipo-fase-5:stale OK");
}

main();
