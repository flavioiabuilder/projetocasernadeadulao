"use strict";

/**
 * Camada pura do runtime do Átrio.
 *
 * O que dá para verificar sem DOM, sem navegador e sem timer: a matemática
 * do stagger, a do marquee e as regras de validação de formulário. Tudo o
 * que depende de layout fica para o smoke test de navegador.
 */

const test = require("node:test");
const assert = require("node:assert");
const path = require("path");

const Atrio = require(path.resolve(__dirname, "../design-system/js/main.js"));
const forms = require(path.resolve(__dirname, "../design-system/js/forms.js"));

/* ============================================================ limitar === */

test("limitar mantém o valor dentro do intervalo", () => {
  assert.strictEqual(Atrio.limitar(5, 0, 10), 5);
  assert.strictEqual(Atrio.limitar(-3, 0, 10), 0);
  assert.strictEqual(Atrio.limitar(42, 0, 10), 10);
});

/* ========================================================= normalizar === */

test("normalizar mapeia o intervalo para 0..1", () => {
  assert.strictEqual(Atrio.normalizar(50, 0, 100), 0.5);
  assert.strictEqual(Atrio.normalizar(0, 0, 100), 0);
  assert.strictEqual(Atrio.normalizar(100, 0, 100), 1);
});

test("normalizar satura fora do intervalo em vez de extrapolar", () => {
  assert.strictEqual(Atrio.normalizar(-20, 0, 100), 0);
  assert.strictEqual(Atrio.normalizar(500, 0, 100), 1);
});

test("normalizar não divide por zero em intervalo degenerado", () => {
  assert.strictEqual(Atrio.normalizar(7, 3, 3), 0);
});

/* =========================================================== paraMs ==== */

test("paraMs entende ms, s e número cru", () => {
  assert.strictEqual(Atrio.paraMs("800ms"), 800);
  assert.strictEqual(Atrio.paraMs("0.8s"), 800);
  assert.strictEqual(Atrio.paraMs(" 260ms "), 260);
  assert.strictEqual(Atrio.paraMs("120"), 120);
});

test("paraMs devolve zero para entrada inválida em vez de NaN", () => {
  assert.strictEqual(Atrio.paraMs(""), 0);
  assert.strictEqual(Atrio.paraMs("abc"), 0);
  assert.strictEqual(Atrio.paraMs(null), 0);
  assert.strictEqual(Atrio.paraMs(undefined), 0);
});

/* ================================================= distribuirStagger === */

test("distribuirStagger reparte o total entre os itens", () => {
  assert.strictEqual(Atrio.distribuirStagger(0, 5, 200), 0);
  assert.strictEqual(Atrio.distribuirStagger(4, 5, 200), 200);
  assert.strictEqual(Atrio.distribuirStagger(2, 5, 200), 100);
});

test("distribuirStagger mantém o total constante — o achado da referência", () => {
  // Um título de 3 palavras e outro de 28 precisam terminar juntos: o
  // stagger é um orçamento distribuído, não um atraso fixo por item.
  const curto = Atrio.distribuirStagger(2, 3, 200);
  const longo = Atrio.distribuirStagger(27, 28, 200);
  assert.strictEqual(curto, 200);
  assert.strictEqual(longo, 200);
});

test("distribuirStagger não divide por zero com um item só", () => {
  assert.strictEqual(Atrio.distribuirStagger(0, 1, 200), 0);
  assert.strictEqual(Atrio.distribuirStagger(0, 0, 200), 0);
});

/* ==================================================== duracaoMarquee === */

test("duracaoMarquee deriva o tempo da largura e da velocidade", () => {
  assert.strictEqual(Atrio.duracaoMarquee(1000, 100), 10);
  assert.strictEqual(Atrio.duracaoMarquee(500, 250), 2);
});

test("duracaoMarquee mantém a MESMA velocidade em trilhos diferentes", () => {
  // Dois marquees com textos de tamanhos distintos devem andar no mesmo
  // passo; é a duração que muda, não a velocidade.
  const curto = Atrio.duracaoMarquee(800, 186);
  const longo = Atrio.duracaoMarquee(2400, 186);
  assert.ok(Math.abs(longo / curto - 3) < 1e-9, "a razão deve seguir a largura");
});

test("duracaoMarquee devolve zero em entrada degenerada", () => {
  assert.strictEqual(Atrio.duracaoMarquee(0, 100), 0);
  assert.strictEqual(Atrio.duracaoMarquee(1000, 0), 0);
  assert.strictEqual(Atrio.duracaoMarquee(1000, -5), 0);
});

/* =========================================================== validar === */

const REGRAS = {
  nome: { obrigatorio: true, tipo: "texto", minimo: 2, rotulo: "Nome" },
  email: { obrigatorio: true, tipo: "email", rotulo: "E-mail" },
  mensagem: { obrigatorio: true, tipo: "texto", minimo: 10, rotulo: "Mensagem" },
  aceite: { obrigatorio: true, tipo: "consentimento", rotulo: "Aceite" },
};

const VALIDO = {
  nome: "Ana",
  email: "ana@exemplo.invalid",
  mensagem: "Gostaria de visitar no sábado.",
  aceite: true,
};

test("validar aceita um conjunto completo e correto", () => {
  const r = forms.validar(VALIDO, REGRAS);
  assert.strictEqual(r.valido, true);
  assert.deepStrictEqual(r.erros, {});
});

test("validar reprova campos obrigatórios vazios", () => {
  const r = forms.validar({ nome: "", email: "", mensagem: "", aceite: false }, REGRAS);
  assert.strictEqual(r.valido, false);
  assert.strictEqual(Object.keys(r.erros).length, 4);
});

test("validar trata espaços em branco como vazio", () => {
  const r = forms.validar(Object.assign({}, VALIDO, { nome: "    " }), REGRAS);
  assert.strictEqual(r.valido, false);
  assert.match(r.erros.nome, /obrigatório/);
});

test("validar reprova e-mail malformado", () => {
  ["ana", "ana@", "ana@exemplo", "@exemplo.invalid", "a b@c.dd"].forEach((email) => {
    const r = forms.validar(Object.assign({}, VALIDO, { email: email }), REGRAS);
    assert.strictEqual(r.valido, false, `deveria reprovar: ${email}`);
    assert.match(r.erros.email, /e-mail válido/i);
  });
});

test("validar aceita e-mail bem formado", () => {
  ["a@b.co", "nome.sobrenome@exemplo.invalid", "x+tag@sub.exemplo.invalid"].forEach(
    (email) => {
      const r = forms.validar(Object.assign({}, VALIDO, { email: email }), REGRAS);
      assert.strictEqual(r.valido, true, `deveria aceitar: ${email}`);
    }
  );
});

test("validar exige comprimento mínimo", () => {
  const r = forms.validar(Object.assign({}, VALIDO, { mensagem: "curta" }), REGRAS);
  assert.strictEqual(r.valido, false);
  assert.match(r.erros.mensagem, /pelo menos 10/);
});

test("consentimento recusado produz mensagem específica, não “obrigatório”", () => {
  const r = forms.validar(Object.assign({}, VALIDO, { aceite: false }), REGRAS);
  assert.strictEqual(r.valido, false);
  assert.match(r.erros.aceite, /aceitar para continuar/);
});

test("validar ignora campos ausentes das regras", () => {
  const r = forms.validar(Object.assign({}, VALIDO, { extra: "" }), REGRAS);
  assert.strictEqual(r.valido, true);
});

test("validar não valida formato de campo opcional vazio", () => {
  const regras = { email: { obrigatorio: false, tipo: "email", rotulo: "E-mail" } };
  assert.strictEqual(forms.validar({ email: "" }, regras).valido, true);
  assert.strictEqual(forms.validar({ email: "quebrado" }, regras).valido, false);
});

test("validar é uma função pura — não altera a entrada", () => {
  const entrada = Object.assign({}, VALIDO, { nome: "  Ana  " });
  const copia = JSON.parse(JSON.stringify(entrada));
  forms.validar(entrada, REGRAS);
  assert.deepStrictEqual(entrada, copia);
});
