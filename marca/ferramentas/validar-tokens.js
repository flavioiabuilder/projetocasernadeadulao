#!/usr/bin/env node
/**
 * Valida marca/tokens/tokens.json e regenera CSS se necessário.
 *
 * Uso: node marca/ferramentas/validar-tokens.js
 * npm run validate:marca:tokens
 */
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const DIR = path.resolve(__dirname, "../tokens");
const ORIGEM = path.join(DIR, "tokens.json");
const DESTINO = path.join(DIR, "tokens.css");
const GERADOR = path.join(__dirname, "gerar-tokens.js");

const ALIAS_RE = /^\{([a-zA-Z0-9_.-]+)\}$/;
let errors = 0;

function fail(msg) {
  console.error(`ERRO: ${msg}`);
  errors += 1;
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
  for (const key of Object.keys(root)) {
    if (key.startsWith("$") || key === "meta") continue;
    collectLeaves(root[key], prefix ? `${prefix}.${key}` : key, out);
  }
}

function getByPath(obj, dotted) {
  let cur = obj;
  for (const p of dotted.split(".")) {
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
    throw new Error(`ciclo: ${[...stack, ref].join(" → ")}`);
  }
  const target = getByPath(tokens, ref);
  if (!target || !isTokenLeaf(target)) {
    throw new Error(`alias inválido: {${ref}}`);
  }
  return resolveValue(tokens, target.$value, [...stack, ref]);
}

function main() {
  if (!fs.existsSync(ORIGEM)) {
    fail(`ausente: ${ORIGEM}`);
    process.exit(1);
  }

  let tokens;
  try {
    tokens = JSON.parse(fs.readFileSync(ORIGEM, "utf8"));
  } catch (e) {
    fail(`JSON inválido: ${e.message}`);
    process.exit(1);
  }

  if (!tokens.meta) fail("meta ausente");
  if (tokens.meta?.marca !== "Projeto Caserna de Adulão") {
    fail('meta.marca deve ser "Projeto Caserna de Adulão"');
  }

  for (const layer of ["primitive", "semantic", "component"]) {
    if (!tokens[layer]) fail(`camada ausente: ${layer}`);
  }

  const leaves = [];
  collectLeaves(tokens, "", leaves);
  if (leaves.length < 20) fail(`poucos tokens: ${leaves.length}`);

  const cssNames = new Set();
  for (const { path: tokenPath, leaf } of leaves) {
    if (leaf.$value === undefined || leaf.$value === "") {
      fail(`${tokenPath}: $value vazio`);
    }
    try {
      resolveValue(tokens, leaf.$value);
    } catch (e) {
      fail(`${tokenPath}: ${e.message}`);
    }
    const name = leaf.$css;
    if (!name || !name.startsWith("--")) {
      fail(`${tokenPath}: $css deve começar com --`);
    } else if (cssNames.has(name)) {
      fail(`$css duplicado: ${name}`);
    } else {
      cssNames.add(name);
    }
  }

  // Required anchors used by institutional page
  for (const required of [
    "--color-carvao",
    "--color-papel",
    "--color-bronze",
    "--surface-ink",
    "--surface-paper",
    "--accent",
    "--font-display",
    "--font-sans",
  ]) {
    if (!cssNames.has(required)) fail(`token obrigatório ausente: ${required}`);
  }

  execFileSync(process.execPath, [GERADOR], { stdio: "inherit" });

  if (!fs.existsSync(DESTINO)) fail(`CSS não gerado: ${DESTINO}`);
  const css = fs.readFileSync(DESTINO, "utf8");
  if (!css.includes(":root")) fail("tokens.css sem :root");
  if (!css.includes("--color-carvao")) fail("tokens.css sem --color-carvao");

  if (errors) {
    console.error(`Falha: ${errors} erro(s)`);
    process.exit(1);
  }
  console.log(`OK: validate:marca:tokens (${leaves.length} tokens)`);
}

main();
