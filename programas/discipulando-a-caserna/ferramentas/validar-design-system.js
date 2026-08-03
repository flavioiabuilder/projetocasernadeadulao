#!/usr/bin/env node
/**
 * Valida artefatos da Fase 4 (Manual, fichas, lab).
 * npm run validate:discipulando:design-system
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../../..");
const PROG = path.join(ROOT, "programas/discipulando-a-caserna");
const DS = path.join(PROG, "design-system");
const FASE4 = path.join(PROG, "docs/metodo/fase-4");
const MANUAL = path.join(PROG, "docs/metodo/04-manual-design-system.md");
const TOKENS_JSON = path.join(DS, "tokens/tokens.json");

let failures = 0;

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  failures += 1;
}

function ok(msg) {
  console.log(`OK: ${msg}`);
}

function read(p) {
  return fs.readFileSync(p, "utf8");
}

function listMd(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(dir, f));
}

const REQUIRED_FASE4 = [
  "inventario-de-componentes.md",
  "matriz-de-estados.md",
  "matriz-de-acessibilidade.md",
  "catalogo-de-padroes.md",
  "cobertura-de-composicao.md",
  "governanca-e-versionamento.md",
  "roteiro-de-validacao-do-sistema.md",
];

const FICHA_FIELDS = [
  "1. ID e nome",
  "5. Quando usar",
  "6. Quando não usar",
  "9. HTML nativo",
  "11. API pública",
  "14. Tokens semânticos",
  "15. Estados",
  "16. Teclado",
  "17. Foco",
];

function checkFiles() {
  const before = failures;
  if (!fs.existsSync(MANUAL)) fail("manual ausente");
  if (!fs.existsSync(path.join(DS, "README.md"))) fail("design-system/README.md ausente");
  for (const name of REQUIRED_FASE4) {
    if (!fs.existsSync(path.join(FASE4, name))) fail(`fase-4/${name} ausente`);
  }
  for (const p of [
    "laboratorio/index.html",
    "laboratorio/css/lab.css",
    "laboratorio/js/lab.js",
    "laboratorio/README.md",
  ]) {
    if (!fs.existsSync(path.join(DS, p))) fail(`${p} ausente`);
  }
  if (failures === before) ok("arquivos obrigatórios F4 presentes");
}

function checkManual() {
  const before = failures;
  const text = read(MANUAL);
  if (!/CANDIDATO/i.test(text)) fail("manual: status CANDIDATO ausente");
  if (!/CMP-01/.test(text) || !/PAD-01/.test(text))
    fail("manual: índices CMP/PAD ausentes");
  if (!/Definition of Ready|Fase 5/i.test(text)) fail("manual: DoR Fase 5 ausente");
  if (!/WCAG/i.test(text)) fail("manual: WCAG ausente");
  if (/\bAPROVADO\b/.test(text) && !/não promover|sem decisão|aguarda/i.test(text)) {
    fail("manual: APROVADO sem ressalva");
  }
  if (failures === before) ok("manual síntese");
}

function checkFichas() {
  const before = failures;
  const comps = listMd(path.join(DS, "componentes"));
  const pads = listMd(path.join(DS, "padroes"));
  if (comps.length < 11) fail(`componentes: esperados ≥11, achados ${comps.length}`);
  if (pads.length < 8) fail(`padrões: esperados ≥8, achados ${pads.length}`);

  const ids = new Set();
  for (const file of comps) {
    const text = read(file);
    const m = text.match(/CMP-\d{2}/);
    if (!m) {
      fail(`${path.basename(file)}: ID CMP ausente`);
      continue;
    }
    if (ids.has(m[0])) fail(`ID duplicado ${m[0]}`);
    ids.add(m[0]);
    for (const field of FICHA_FIELDS) {
      if (!text.includes(field)) fail(`${m[0]}: campo "${field}" ausente`);
    }
    if (!/Quando usar/i.test(text) || !/Quando não usar/i.test(text)) {
      fail(`${m[0]}: quando usar/não usar`);
    }
  }
  for (const file of pads) {
    const text = read(file);
    const m = text.match(/PAD-\d{2}/);
    if (!m) fail(`${path.basename(file)}: ID PAD ausente`);
    else if (ids.has(m[0])) fail(`ID duplicado ${m[0]}`);
    else ids.add(m[0]);
  }
  if (failures === before) ok(`fichas OK (${comps.length} CMP, ${pads.length} PAD)`);
}

function checkLabCss() {
  const before = failures;
  const css = read(path.join(DS, "laboratorio/css/lab.css"));
  if (!/tokens\.css/.test(css)) fail("lab.css não importa tokens.css");
  const cssNoComments = css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  if (/--primitivo-/.test(cssNoComments)) {
    fail("lab.css consome --primitivo-* (proibido)");
  }
  const hexProps = cssNoComments.match(
    /(?:color|background|border-color)\s*:\s*#[0-9a-fA-F]{3,8}/gm
  );
  if (hexProps) fail(`lab.css hex não tokenizado: ${hexProps[0].trim()}`);
  const html = read(path.join(DS, "laboratorio/index.html"));
  if (!/demonstrativ/i.test(html)) fail("lab HTML sem marcação demonstrativa");
  if (!/dc-skip/.test(html)) fail("lab sem skip link");
  if (failures === before) ok("lab CSS/HTML contratos básicos");
}

function checkTokenRefs() {
  const before = failures;
  if (!fs.existsSync(TOKENS_JSON)) {
    fail("tokens.json ausente");
    return;
  }
  const tokens = JSON.parse(read(TOKENS_JSON));
  const css = read(path.join(DS, "tokens/tokens.css"));
  const manual = read(MANUAL);
  if (!css.includes("var(--primitivo-")) {
    fail("tokens.css sem aliases var(--primitivo-*)");
  }
  if (tokens.componentes || tokens.components) {
    fail("camada de componentes em tokens.json proibida");
  }
  if (!/0\.1\.0-candidate/.test(manual)) fail("manual sem versão candidate");
  if (failures === before) ok("relação tokens/manual");
}

function checkPlaceholders() {
  const before = failures;
  const banned = /\{\{PLACEHOLDER\}\}|TODO: inventar componente/i;
  for (const file of listMd(path.join(DS, "componentes"))) {
    if (banned.test(read(file))) fail(`${path.basename(file)}: placeholder proibido`);
  }
  if (failures === before) ok("sem placeholders proibidos nas fichas");
}

function collectDefinedCustomProps(cssText) {
  const defined = new Set();
  const re = /--([a-zA-Z0-9-]+)\s*:/g;
  let m;
  while ((m = re.exec(cssText))) {
    defined.add(`--${m[1]}`);
  }
  return defined;
}

function checkSharedStylesCustomProps() {
  const before = failures;
  const stylesDir = path.join(DS, "styles");
  const tokensCss = read(path.join(DS, "tokens/tokens.css"));
  const defined = collectDefinedCustomProps(tokensCss);
  const files = ["foundations.css", "components.css", "patterns.css"]
    .map((f) => path.join(stylesDir, f))
    .filter((p) => fs.existsSync(p));
  if (files.length < 3) {
    fail("design-system/styles: foundations/components/patterns ausentes");
  }
  for (const file of files) {
    const css = read(file).replace(/\/\*[\s\S]*?\*\//g, "");
    collectDefinedCustomProps(css).forEach((p) => defined.add(p));
    if (/--primitivo-/.test(css)) {
      fail(`${path.basename(file)}: referência a primitivo proibida`);
    }
    if (/devtools|aramco|soul-church/i.test(css)) {
      fail(`${path.basename(file)}: referência DevTools proibida`);
    }
    const refs = css.matchAll(/var\(\s*(--[a-zA-Z0-9-]+)/g);
    for (const ref of refs) {
      const name = ref[1];
      // Variáveis de runtime (progresso JS etc.) usam prefixo --dc-
      if (name.startsWith("--dc-")) continue;
      if (!defined.has(name)) {
        fail(`${path.basename(file)}: custom property indefinida ${name}`);
      }
    }
  }
  if (!defined.has("--cor-foco-sobre-papel")) {
    fail("token --cor-foco-sobre-papel ausente");
  }
  if (defined.has("--foco-anel-cor-sobre-papel")) {
    fail("token legado --foco-anel-cor-sobre-papel não deve existir");
  }
  if (failures === before) ok("custom properties do CSS compartilhado");
}

function main() {
  console.log("validate:discipulando:design-system — Fase 4");
  checkFiles();
  checkManual();
  checkFichas();
  checkLabCss();
  checkTokenRefs();
  checkPlaceholders();
  checkSharedStylesCustomProps();
  if (failures > 0) {
    console.error(
      `\nvalidate:discipulando:design-system FALHOU com ${failures} problema(s).`
    );
    process.exit(1);
  }
  console.log("\nvalidate:discipulando:design-system OK");
}

if (require.main === module) main();

module.exports = { FICHA_FIELDS, REQUIRED_FASE4 };
