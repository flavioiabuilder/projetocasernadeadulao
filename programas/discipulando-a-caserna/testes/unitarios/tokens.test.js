"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const {
  gerar,
  collectLeaves,
  resolveValue,
  ORIGEM,
  DESTINO,
} = require("../../ferramentas/gerar-tokens");
const {
  contrastRatio,
  CONTRAST_PAIRS,
  resolvedHex,
} = require("../../ferramentas/validar-tokens");

const tokens = JSON.parse(fs.readFileSync(ORIGEM, "utf8"));

describe("design tokens ME-T", () => {
  it("tokens.json tem primitivos e semanticos", () => {
    assert.ok(tokens.primitivos);
    assert.ok(tokens.semanticos);
    assert.equal(tokens.meta.fonteVerdade, "tokens.json");
    assert.match(tokens.meta.versao, /candidate/);
  });

  it("não possui camada de componentes", () => {
    assert.equal(tokens.componentes, undefined);
    assert.equal(tokens.component, undefined);
  });

  it("resolve aliases sem ciclos", () => {
    const leaves = [];
    collectLeaves(tokens.primitivos, "primitivos", leaves);
    collectLeaves(tokens.semanticos, "semanticos", leaves);
    for (const { leaf } of leaves) {
      assert.doesNotThrow(() => resolveValue(tokens, leaf.$value));
    }
  });

  it("geração CSS é determinística", () => {
    const a = gerar(tokens);
    const b = gerar(tokens);
    assert.equal(a, b);
    assert.match(a, /ARQUIVO GERADO/);
    assert.match(a, /prefers-reduced-motion/);
  });

  it("tokens.css no disco corresponde à geração", () => {
    const expected = gerar(tokens);
    const actual = fs.readFileSync(DESTINO, "utf8");
    assert.equal(actual, expected);
  });

  it("pares de contraste mínimos passam", () => {
    for (const pair of CONTRAST_PAIRS) {
      const fg = resolvedHex(tokens, pair.fg);
      const bg = resolvedHex(tokens, pair.bg);
      assert.ok(fg, pair.fg);
      assert.ok(bg, pair.bg);
      const ratio = contrastRatio(fg, bg);
      assert.ok(
        ratio + 1e-9 >= pair.min,
        `${pair.fg} on ${pair.bg}: ${ratio.toFixed(2)} < ${pair.min}`
      );
    }
  });

  it("bronze canônico é #8C6A45", () => {
    assert.equal(tokens.primitivos.cor.bronze["500"].$value.toUpperCase(), "#8C6A45");
  });

  it("paths CSS semânticos usam prefixo de função", () => {
    const css = gerar(tokens);
    assert.match(css, /--cor-superficie-profunda:/);
    assert.match(css, /--cor-acento-editorial:/);
    assert.match(css, /--layout-medida-prosa:/);
    assert.match(css, /--primitivo-cor-navy-800:/);
  });

  it("aliases semânticos preservam var(--primitivo-*) no CSS", () => {
    const css = gerar(tokens);
    assert.match(css, /--cor-superficie-papel:\s*var\(--primitivo-cor-neutro-quente-0\)/);
    assert.match(css, /--cor-superficie-profunda:\s*var\(--primitivo-cor-navy-800\)/);
    assert.doesNotMatch(css, /--cor-superficie-papel:\s*#[0-9a-fA-F]{6}/);
  });
});
