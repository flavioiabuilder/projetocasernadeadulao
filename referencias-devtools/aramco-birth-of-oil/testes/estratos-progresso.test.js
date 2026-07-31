"use strict";

/**
 * A matemática de percurso do design system é pura de propósito: pode ser
 * verificada sem DOM, sem navegador e sem timers.
 */

const test = require("node:test");
const assert = require("node:assert");
const path = require("path");

const { limitar, normalizar, interpolar, aproximar, criarProgresso } = require(
  path.resolve(__dirname, "../design-system/js/matematica.js")
);

test("limitar mantém o valor dentro do intervalo", () => {
  assert.strictEqual(limitar(5, 0, 10), 5);
  assert.strictEqual(limitar(-3, 0, 10), 0);
  assert.strictEqual(limitar(42, 0, 10), 10);
});

test("normalizar mapeia o intervalo para 0..1", () => {
  assert.strictEqual(normalizar(50, 0, 100), 0.5);
  assert.strictEqual(normalizar(0, 0, 100), 0);
  assert.strictEqual(normalizar(100, 0, 100), 1);
});

test("normalizar satura fora do intervalo em vez de extrapolar", () => {
  assert.strictEqual(normalizar(-20, 0, 100), 0);
  assert.strictEqual(normalizar(500, 0, 100), 1);
});

test("normalizar não divide por zero quando o intervalo é degenerado", () => {
  assert.strictEqual(normalizar(7, 3, 3), 0);
});

test("interpolar percorre linearmente entre os extremos", () => {
  assert.strictEqual(interpolar(0, 100, 0), 0);
  assert.strictEqual(interpolar(0, 100, 1), 100);
  assert.strictEqual(interpolar(0, 100, 0.25), 25);
});

test("aproximar converge para o alvo sem ultrapassá-lo", () => {
  let valor = 0;
  for (let i = 0; i < 240; i += 1) {
    valor = aproximar(valor, 100, 0.1, 1 / 60);
  }
  assert.ok(valor > 99, `esperado > 99, obtido ${valor}`);
  assert.ok(valor <= 100, `não deve ultrapassar o alvo, obtido ${valor}`);
});

test("aproximar é estável quando já está no alvo", () => {
  assert.strictEqual(aproximar(50, 50, 0.2, 1 / 60), 50);
});

test("criarProgresso avança e recua dentro dos limites", () => {
  const p = criarProgresso(4);
  assert.strictEqual(p.indice, 0);
  assert.ok(p.noInicio());

  assert.strictEqual(p.definir(1), true, "mudança de índice deve reportar true");
  assert.strictEqual(p.indice, 1);

  assert.strictEqual(p.definir(-5), true);
  assert.strictEqual(p.indice, 0, "não deve ir abaixo de zero");

  assert.strictEqual(p.definir(99), true);
  assert.strictEqual(p.indice, 3, "não deve passar do total");
  assert.ok(p.noFim());

  assert.strictEqual(p.definir(99), false, "sem mudança deve reportar false");
});

test("criarProgresso calcula o progresso global normalizado", () => {
  const p = criarProgresso(5);
  assert.strictEqual(p.global, 0);
  p.definir(2);
  assert.strictEqual(p.global, 0.5);
  p.definir(4);
  assert.strictEqual(p.global, 1);
});

test("criarProgresso não divide por zero com uma única cena", () => {
  const p = criarProgresso(1);
  assert.strictEqual(p.global, 0);
  assert.ok(p.noInicio());
  assert.ok(p.noFim());
});

test("aproximar independe do framerate dentro de uma tolerância", () => {
  // O mesmo tempo total simulado deve dar aproximadamente o mesmo resultado,
  // seja a 60Hz ou a 144Hz.
  let a = 0;
  for (let i = 0; i < 60; i += 1) a = aproximar(a, 100, 0.1, 1 / 60);

  let b = 0;
  for (let i = 0; i < 144; i += 1) b = aproximar(b, 100, 0.1, 1 / 144);

  assert.ok(
    Math.abs(a - b) < 1,
    `diferença entre framerates deve ser < 1, obtida ${Math.abs(a - b)}`
  );
});
