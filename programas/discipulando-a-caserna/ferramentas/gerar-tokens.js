#!/usr/bin/env node
/**
 * Gera design-system/tokens/tokens.css a partir de tokens.json (ME-T).
 * Fonte canônica: JSON. Não editar o CSS à mão.
 *
 * Uso: node programas/discipulando-a-caserna/ferramentas/gerar-tokens.js
 * npm run generate:discipulando:tokens
 */
"use strict";

const fs = require("fs");
const path = require("path");

const DIR = path.resolve(__dirname, "../design-system/tokens");
const ORIGEM = path.join(DIR, "tokens.json");
const DESTINO = path.join(DIR, "tokens.css");

const ALIAS_RE = /^\{([a-zA-Z0-9_.-]+)\}$/;
const PLACEHOLDER_RE = /\{\{|PLACEHOLDER|TODO/i;

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function isTokenLeaf(node) {
  return (
    node &&
    typeof node === "object" &&
    !Array.isArray(node) &&
    Object.prototype.hasOwnProperty.call(node, "$value")
  );
}

function collectLeaves(root, prefix, out) {
  if (!root || typeof root !== "object" || Array.isArray(root)) return;
  if (isTokenLeaf(root)) {
    out.push({ path: prefix, leaf: root });
    return;
  }
  const keys = Object.keys(root).sort();
  for (const key of keys) {
    if (key.startsWith("$")) continue;
    const next = prefix ? `${prefix}.${key}` : key;
    collectLeaves(root[key], next, out);
  }
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

function resolveValue(tokens, raw, stack = []) {
  if (typeof raw !== "string") return { value: raw, type: typeof raw };
  const m = raw.match(ALIAS_RE);
  if (!m) return { value: raw, type: "string" };
  const ref = m[1];
  if (stack.includes(ref)) {
    throw new Error(`ciclo de alias: ${[...stack, ref].join(" → ")}`);
  }
  const target = getByPath(tokens, ref);
  if (!target) throw new Error(`alias inexistente: {${ref}}`);
  if (isTokenLeaf(target)) {
    return resolveValue(tokens, target.$value, [...stack, ref]);
  }
  throw new Error(`alias não aponta para folha: {${ref}}`);
}

function pathToCssName(tokenPath, layer) {
  const parts = tokenPath.split(".");
  // Remove layer prefix (primitivos|semanticos)
  const rest = parts[0] === layer ? parts.slice(1) : parts;
  const kebab = rest
    .join("-")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();
  if (layer === "primitivos") return `--primitivo-${kebab}`;
  return `--${kebab}`;
}

function cssValue(value) {
  if (typeof value === "boolean") return value ? "1" : "0";
  if (typeof value === "number") return String(value);
  return String(value);
}

function gerar(tokens) {
  const leaves = [];
  collectLeaves(tokens.primitivos, "primitivos", leaves);
  collectLeaves(tokens.semanticos, "semanticos", leaves);

  for (const { path: p, leaf } of leaves) {
    if (typeof leaf.$value === "string" && PLACEHOLDER_RE.test(leaf.$value)) {
      throw new Error(`placeholder proibido em produto: ${p}`);
    }
  }

  const primLines = [];
  const semLines = [];
  const resolved = new Map();

  for (const { path: p, leaf } of leaves) {
    const { value } = resolveValue(tokens, leaf.$value);
    const layer = p.startsWith("primitivos") ? "primitivos" : "semanticos";
    const cssName = pathToCssName(p, layer);
    resolved.set(p, { cssName, value, leaf });
    const comment = leaf.$description
      ? `  /* ${String(leaf.$description).replace(/\*\//g, "*∕")} */\n`
      : "";
    const line = `${comment}  ${cssName}: ${cssValue(value)};`;
    if (layer === "primitivos") primLines.push(line);
    else semLines.push(line);
  }

  const meta = tokens.meta || {};
  const rm = getByPath(tokens, "semanticos.motion.reduced.duration");
  let rmValue = "0.01ms";
  if (rm && isTokenLeaf(rm)) {
    rmValue = cssValue(resolveValue(tokens, rm.$value).value);
  }

  const header = [
    "/*",
    ` * ${meta.programa || "programa"} — design tokens v${meta.versao || "?"}`,
    ` * Status: ${meta.status || "?"} · Formato: ${meta.formato || "ME-T"}`,
    " *",
    " * ARQUIVO GERADO. Não edite à mão.",
    " * Fonte: design-system/tokens/tokens.json",
    " * Gerador: programas/discipulando-a-caserna/ferramentas/gerar-tokens.js",
    " * npm run generate:discipulando:tokens",
    " */",
    "",
  ].join("\n");

  const body = [
    ":root {",
    "  /* ——— Primitivos ——— */",
    ...primLines,
    "",
    "  /* ——— Semânticos ——— */",
    ...semLines,
    "}",
    "",
    "/* Contextos de superfície (não é dark mode) */",
    '[data-superficie="profunda"] {',
    "  color: var(--cor-texto-sobre-profunda);",
    "  background-color: var(--cor-superficie-profunda);",
    "}",
    "",
    '[data-superficie="papel"] {',
    "  color: var(--cor-texto-primario);",
    "  background-color: var(--cor-superficie-papel);",
    "}",
    "",
    "@media (prefers-reduced-motion: reduce) {",
    "  :root {",
    `    --motion-feedback-rapido: ${rmValue};`,
    `    --motion-transicao-padrao: ${rmValue};`,
    `    --motion-revelacao-lenta: ${rmValue};`,
    `    --primitivo-motion-duracao-rapida: ${rmValue};`,
    `    --primitivo-motion-duracao-padrao: ${rmValue};`,
    `    --primitivo-motion-duracao-lenta: ${rmValue};`,
    "  }",
    "}",
    "",
  ].join("\n");

  return header + body;
}

function main() {
  if (!fs.existsSync(ORIGEM)) {
    console.error(`FAIL: ausente ${ORIGEM}`);
    process.exit(1);
  }
  const tokens = readJson(ORIGEM);
  if (!tokens.primitivos || !tokens.semanticos) {
    console.error("FAIL: tokens.json precisa de primitivos e semanticos");
    process.exit(1);
  }
  const css = gerar(tokens);
  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(DESTINO, css, "utf8");
  console.log(`OK: gerado ${path.relative(process.cwd(), DESTINO)}`);
}

if (require.main === module) {
  try {
    main();
  } catch (e) {
    console.error(`FAIL: ${e.message}`);
    process.exit(1);
  }
}

module.exports = {
  gerar,
  collectLeaves,
  resolveValue,
  isTokenLeaf,
  pathToCssName,
  ORIGEM,
  DESTINO,
};
