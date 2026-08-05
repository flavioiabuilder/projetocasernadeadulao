#!/usr/bin/env node
/**
 * Gera marca/tokens/tokens.css a partir de marca/tokens/tokens.json.
 * Fonte canônica: JSON. Não editar o CSS à mão.
 *
 * Uso: node marca/ferramentas/gerar-tokens.js
 * npm run generate:marca:tokens
 */
"use strict";

const fs = require("fs");
const path = require("path");

const DIR = path.resolve(__dirname, "../tokens");
const ORIGEM = path.join(DIR, "tokens.json");
const DESTINO = path.join(DIR, "tokens.css");

const ALIAS_RE = /^\{([a-zA-Z0-9_.-]+)\}$/;

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
  for (const key of Object.keys(root).sort()) {
    if (key.startsWith("$") || key === "meta") continue;
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
  if (typeof raw !== "string") return raw;
  const m = raw.match(ALIAS_RE);
  if (!m) return raw;
  const ref = m[1];
  if (stack.includes(ref)) {
    throw new Error(`ciclo de alias: ${[...stack, ref].join(" → ")}`);
  }
  const target = getByPath(tokens, ref);
  if (!target || !isTokenLeaf(target)) {
    throw new Error(`alias inexistente ou inválido: {${ref}}`);
  }
  return resolveValue(tokens, target.$value, [...stack, ref]);
}

function cssName(leaf, tokenPath) {
  if (leaf.$css) return leaf.$css;
  const parts = tokenPath.split(".");
  const rest =
    parts[0] === "primitive" ||
    parts[0] === "semantic" ||
    parts[0] === "component"
      ? parts.slice(1)
      : parts;
  return "--" + rest.join("-").replace(/_/g, "-").toLowerCase();
}

function emitCssValue(tokens, leaf) {
  const raw = leaf.$value;
  if (typeof raw === "string" && ALIAS_RE.test(raw)) {
    const ref = raw.match(ALIAS_RE)[1];
    const target = getByPath(tokens, ref);
    if (!target || !isTokenLeaf(target)) {
      throw new Error(`alias inexistente: {${ref}}`);
    }
    return `var(${cssName(target, ref)})`;
  }
  return String(raw);
}

function main() {
  const tokens = readJson(ORIGEM);
  const leaves = [];
  collectLeaves(tokens, "", leaves);

  const byLayer = { primitive: [], semantic: [], component: [], other: [] };
  for (const item of leaves) {
    const layer = item.path.split(".")[0];
    if (byLayer[layer]) byLayer[layer].push(item);
    else byLayer.other.push(item);
  }

  const lines = [
    "/* Gerado por marca/ferramentas/gerar-tokens.js — não editar à mão */",
    `/* Fonte: marca/tokens/tokens.json · ${tokens.meta?.versao || "?"} · ${tokens.meta?.status || "?"} */`,
    "",
    ":root {",
  ];

  for (const layer of ["primitive", "semantic", "component", "other"]) {
    const group = byLayer[layer];
    if (!group.length) continue;
    lines.push(`  /* ${layer} */`);
    for (const { path: tokenPath, leaf } of group) {
      // Validate resolution
      resolveValue(tokens, leaf.$value);
      const name = cssName(leaf, tokenPath);
      const value = emitCssValue(tokens, leaf);
      const comment = leaf.$description ? ` /* ${leaf.$description} */` : "";
      lines.push(`  ${name}: ${value};${comment}`);
    }
    lines.push("");
  }

  // Trim trailing blank before close
  while (lines[lines.length - 1] === "") lines.pop();
  lines.push("}", "");

  fs.writeFileSync(DESTINO, lines.join("\n"), "utf8");
  console.log(`OK: ${path.relative(process.cwd(), DESTINO)} (${leaves.length} tokens)`);
}

main();
