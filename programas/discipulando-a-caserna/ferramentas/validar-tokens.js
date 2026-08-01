#!/usr/bin/env node
/**
 * Valida tokens.json (ME-T) e tokens.css gerado do Discipulando a Caserna.
 *
 * Uso: node programas/discipulando-a-caserna/ferramentas/validar-tokens.js
 * npm run validate:discipulando:tokens
 */
"use strict";

const fs = require("fs");
const path = require("path");
const {
  gerar,
  collectLeaves,
  resolveValue,
  isTokenLeaf,
  ORIGEM,
  DESTINO,
} = require("./gerar-tokens");

const ROOT = path.resolve(__dirname, "../../..");
const SCHEMA_PATH = path.join(ROOT, "metodo/schemas/tokens.template.schema.json");

let failures = 0;

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  failures += 1;
}

function ok(msg) {
  console.log(`OK: ${msg}`);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function getByPath(obj, dotted) {
  const parts = dotted.split(".");
  let cur = obj;
  for (const p of parts) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = cur[p];
  }
  return cur;
}

function resolvedHex(tokens, dottedPath) {
  const leaf = getByPath(tokens, dottedPath);
  if (!isTokenLeaf(leaf)) return null;
  const { value } = resolveValue(tokens, leaf.$value);
  if (typeof value !== "string") return null;
  const m = value.trim().match(/^#([0-9a-fA-F]{6})$/);
  return m ? `#${m[1].toUpperCase()}` : null;
}

function relativeLuminance(hex) {
  const h = hex.replace("#", "");
  const rgb = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const lin = rgb.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

function contrastRatio(fg, bg) {
  const L1 = relativeLuminance(fg);
  const L2 = relativeLuminance(bg);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

const CONTRAST_PAIRS = [
  {
    fg: "semanticos.cor.texto.primario",
    bg: "semanticos.cor.superficie.papel",
    uso: "normal",
    min: 4.5,
  },
  {
    fg: "semanticos.cor.texto.primario",
    bg: "semanticos.cor.superficie.creme",
    uso: "normal",
    min: 4.5,
  },
  {
    fg: "semanticos.cor.texto.suave",
    bg: "semanticos.cor.superficie.papel",
    uso: "normal",
    min: 4.5,
  },
  {
    fg: "semanticos.cor.texto.inverso",
    bg: "semanticos.cor.superficie.profunda",
    uso: "normal",
    min: 4.5,
  },
  {
    fg: "semanticos.cor.texto.sobreProfunda",
    bg: "semanticos.cor.superficie.profundaEscura",
    uso: "normal",
    min: 4.5,
  },
  {
    fg: "semanticos.cor.acento.editorial",
    bg: "semanticos.cor.superficie.papel",
    uso: "ui",
    min: 3,
  },
  {
    fg: "primitivos.cor.bronze.700",
    bg: "semanticos.cor.superficie.papel",
    uso: "normal",
    min: 4.5,
  },
  {
    fg: "primitivos.cor.bronze.300",
    bg: "semanticos.cor.superficie.profunda",
    uso: "ui",
    min: 3,
  },
  {
    fg: "semanticos.cor.foco.sobrePapel",
    bg: "semanticos.cor.superficie.papel",
    uso: "ui",
    min: 3,
  },
  {
    fg: "semanticos.cor.foco.sobreProfunda",
    bg: "semanticos.cor.superficie.profunda",
    uso: "ui",
    min: 3,
  },
];

function checkStructure(tokens) {
  const before = failures;
  if (!tokens.primitivos || !tokens.semanticos) {
    fail("faltam primitivos/semanticos");
    return;
  }
  const cats = [
    "cor",
    "tipografia",
    "espacamento",
    "layout",
    "raio",
    "borda",
    "elevacao",
    "motion",
    "foco",
    "breakpoints",
  ];
  for (const layer of ["primitivos", "semanticos"]) {
    for (const cat of cats) {
      if (!tokens[layer][cat]) fail(`${layer}.${cat} ausente`);
    }
  }
  if (tokens.componentes || tokens.components || tokens.component) {
    fail("camada de componentes proibida na Fase 3");
  }
  if (failures === before) ok("estrutura primitivos/semanticos");
}

function checkMeta(tokens) {
  const before = failures;
  const meta = tokens.meta || {};
  for (const key of ["projeto", "programa", "versao", "status", "formato"]) {
    if (!meta[key]) fail(`meta.${key} ausente`);
  }
  if (meta.fonteVerdade !== "tokens.json") {
    fail('meta.fonteVerdade deve ser "tokens.json"');
  }
  if (!String(meta.versao).includes("candidate") && meta.status === "EM REVISAO") {
    // allow either candidate version or explicit note
  }
  if (/\b1\.0\.0\b/.test(meta.versao) && /REVISAO|CANDIDAT/i.test(meta.status)) {
    fail("versão 1.0.0 incompatível com status EM REVISAO/candidato");
  }
  if (failures === before) ok(`meta v${meta.versao} status=${meta.status}`);
}

function checkSchemaLight(tokens) {
  const before = failures;
  if (!fs.existsSync(SCHEMA_PATH)) {
    fail("schema método ausente");
    return;
  }
  const schema = readJson(SCHEMA_PATH);
  for (const key of schema.required || []) {
    if (!(key in tokens)) fail(`schema.required: ${key}`);
  }
  if (failures === before) ok("schema leve OK");
}

function checkLeaves(tokens) {
  const before = failures;
  const leaves = [];
  collectLeaves(tokens.primitivos, "primitivos", leaves);
  collectLeaves(tokens.semanticos, "semanticos", leaves);

  for (const { path: p, leaf } of leaves) {
    if (!leaf.$type) fail(`${p}: $type ausente`);
    if (leaf.$value === undefined) fail(`${p}: $value ausente`);
    if (typeof leaf.$value === "string" && /\{\{|PLACEHOLDER/i.test(leaf.$value)) {
      fail(`${p}: placeholder proibido`);
    }
    if (typeof leaf.$value === "string") {
      const m = leaf.$value.match(/^\{([^}]+)\}$/);
      if (m) {
        const ref = m[1];
        if (p.startsWith("primitivos.") && ref.startsWith("semanticos.")) {
          fail(`${p}: primitivo referencia semântico (${ref})`);
        }
        try {
          resolveValue(tokens, leaf.$value);
        } catch (e) {
          fail(`${p}: ${e.message}`);
        }
      }
    }
    if (/botao\.|card\.|modal\.|button\.|component/i.test(p)) {
      fail(`${p}: token de componente proibido`);
    }
    if (/aramco|estratos|--es-/i.test(JSON.stringify(leaf))) {
      fail(`${p}: contaminação Aramco/Estratos`);
    }
  }
  if (failures === before) ok(`folhas tipadas (${leaves.length})`);
}

function checkContrast(tokens) {
  const before = failures;
  const rows = [];
  for (const pair of CONTRAST_PAIRS) {
    const fg = resolvedHex(tokens, pair.fg);
    const bg = resolvedHex(tokens, pair.bg);
    if (!fg || !bg) {
      fail(`contraste: não resolvido ${pair.fg} sobre ${pair.bg}`);
      continue;
    }
    const ratio = contrastRatio(fg, bg);
    const pass = ratio + 1e-9 >= pair.min;
    rows.push({ ...pair, fg, bg, ratio, pass });
    if (!pass) {
      fail(
        `contraste ${pair.uso}: ${fg} sobre ${bg} = ${ratio.toFixed(2)}:1 < ${pair.min}:1 (${pair.fg})`
      );
    }
  }
  if (failures === before) {
    ok(`contraste: ${rows.length} pares AA mínimos`);
  }
  return rows;
}

function checkCssGenerated(tokens) {
  const before = failures;
  if (!fs.existsSync(DESTINO)) {
    fail("tokens.css ausente — rode generate:discipulando:tokens");
    return;
  }
  let expected;
  try {
    expected = gerar(tokens);
  } catch (e) {
    fail(`geração: ${e.message}`);
    return;
  }
  const actual = fs.readFileSync(DESTINO, "utf8");
  if (actual !== expected) {
    fail("tokens.css desatualizado ou editado à mão (diff vs geração)");
  }
  if (!actual.includes("ARQUIVO GERADO")) {
    fail("tokens.css sem cabeçalho de arquivo gerado");
  }
  if (!actual.includes("prefers-reduced-motion")) {
    fail("tokens.css sem bloco reduced motion");
  }
  if (failures === before) ok("tokens.css sincronizado e determinístico");
}

function checkMotionFoco(tokens) {
  const before = failures;
  const rm = getByPath(tokens, "semanticos.motion.respeitarReducedMotion");
  if (!isTokenLeaf(rm) || rm.$value !== true) {
    fail("semanticos.motion.respeitarReducedMotion deve ser true");
  }
  const focoW = getByPath(tokens, "primitivos.foco.largura");
  if (!isTokenLeaf(focoW)) fail("primitivos.foco.largura ausente");
  if (failures === before) ok("motion reduced + foco presentes");
}

function checkNoSecrets(tokens) {
  const before = failures;
  const blob = JSON.stringify(tokens);
  if (/ghp_[A-Za-z0-9]{20,}|BEGIN (RSA )?PRIVATE KEY|api[_-]?key\s*[:=]/i.test(blob)) {
    fail("possível segredo em tokens.json");
  }
  if (failures === before) ok("sem segredos óbvios");
}

function main() {
  console.log("validate:discipulando:tokens — Fase 3");
  if (!fs.existsSync(ORIGEM)) {
    fail(`tokens.json ausente: ${ORIGEM}`);
    process.exit(1);
  }
  let tokens;
  try {
    tokens = readJson(ORIGEM);
    ok("tokens.json parseável");
  } catch (e) {
    fail(`JSON inválido: ${e.message}`);
    process.exit(1);
  }

  checkMeta(tokens);
  checkStructure(tokens);
  checkSchemaLight(tokens);
  checkLeaves(tokens);
  checkMotionFoco(tokens);
  checkContrast(tokens);
  checkCssGenerated(tokens);
  checkNoSecrets(tokens);

  if (failures > 0) {
    console.error(`\nvalidate:discipulando:tokens FALHOU com ${failures} problema(s).`);
    process.exit(1);
  }
  console.log("\nvalidate:discipulando:tokens OK");
}

if (require.main === module) {
  main();
}

module.exports = {
  contrastRatio,
  relativeLuminance,
  CONTRAST_PAIRS,
  resolvedHex,
};
