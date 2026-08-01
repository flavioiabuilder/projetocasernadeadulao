"use strict";

/**
 * Integridade dos tokens do Átrio.
 *
 * A fonte canônica é tokens.json; tokens.css é artefato gerado. O que estes
 * testes protegem é o contrato entre os dois — inclusive a promessa de que
 * as substituições de movimento reduzido cobrem todo token de movimento.
 */

const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");

const gerador = require(path.resolve(__dirname, "../ferramentas/gerar-tokens.js"));
const { gerar, auditar, paraKebab, nomeVariavel, GRUPOS, SUBSTITUICOES_MOVIMENTO } =
  gerador;

const tokens = JSON.parse(fs.readFileSync(gerador.ORIGEM, "utf8"));

test("paraKebab converte camelCase preservando dígitos", () => {
  assert.strictEqual(paraKebab("areiaProfunda"), "areia-profunda");
  assert.strictEqual(paraKebab("displayXl"), "display-xl");
  assert.strictEqual(paraKebab("corpo"), "corpo");
  assert.strictEqual(paraKebab("16"), "16");
});

test("nomeVariavel monta o nome completo com prefixo e grupo", () => {
  assert.strictEqual(
    nomeVariavel("at", "cor", "areiaProfunda"),
    "--at-cor-areia-profunda"
  );
});

test("todos os grupos declarados existem no tokens.json", () => {
  const relatorio = auditar(tokens);
  assert.deepStrictEqual(
    relatorio.gruposAusentes,
    [],
    "grupos declarados no gerador precisam existir no JSON"
  );
});

test("não há tokens duplicados", () => {
  const relatorio = auditar(tokens);
  assert.deepStrictEqual(relatorio.duplicados, []);
});

test("o conjunto de tokens não está vazio e cobre as famílias essenciais", () => {
  const relatorio = auditar(tokens);
  assert.ok(relatorio.total > 150, `esperado > 150 tokens, obtido ${relatorio.total}`);

  const essenciais = [
    "--at-cor-texto",
    "--at-tipo-familia-display",
    "--at-escala-rampa-desktop",
    "--at-esp-8",
    "--at-larg-total",
    "--at-raio-laje",
    "--at-dur-revelacao",
    "--at-ease-saida-quart",
    "--at-foco-espessura",
    "--at-campo-altura-minima",
    "--at-img-arco-topo-esquerdo",
  ];
  essenciais.forEach((nome) => {
    assert.ok(relatorio.nomes.includes(nome), `token ausente: ${nome}`);
  });
});

test("cada substituição de movimento aponta para um token real", () => {
  const relatorio = auditar(tokens);
  SUBSTITUICOES_MOVIMENTO.forEach(([grupo, chave]) => {
    const nome = nomeVariavel(tokens.$meta.prefixoCSS, grupo, chave);
    assert.ok(relatorio.nomes.includes(nome), `substituição órfã: ${nome}`);
  });
});

test("cada campo de reducedMotion usado existe no JSON", () => {
  SUBSTITUICOES_MOVIMENTO.forEach(([, , campo]) => {
    assert.ok(
      campo in tokens.reducedMotion,
      `reducedMotion.${campo} ausente em tokens.json`
    );
  });
});

test("todo token de duração e distância de movimento tem substituição reduzida", () => {
  // O contrato: nenhum valor que produza movimento pode escapar do
  // prefers-reduced-motion. Só a duração "instantanea" fica de fora, por já
  // ser curta o bastante para não ser percebida como animação.
  const cobertos = new Set(
    SUBSTITUICOES_MOVIMENTO.map(([grupo, chave]) => `${grupo}.${chave}`)
  );
  const isentos = new Set(["dur.instantanea"]);

  Object.keys(tokens.duration).forEach((chave) => {
    const id = `dur.${chave}`;
    assert.ok(
      cobertos.has(id) || isentos.has(id),
      `token de duração sem substituição reduzida: ${id}`
    );
  });

  Object.keys(tokens.motionDistance).forEach((chave) => {
    assert.ok(
      cobertos.has(`mov-dist.${chave}`),
      `token de distância sem substituição reduzida: mov-dist.${chave}`
    );
  });
});

test("o CSS gerado declara :root e o bloco de movimento reduzido", () => {
  const css = gerar(tokens);
  assert.match(css, /^\/\*[\s\S]*ARQUIVO GERADO/m);
  assert.match(css, /:root\s*\{/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.ok(css.indexOf("--at-cor-texto:") !== -1);
});

test("o CSS gerado contém exatamente uma declaração por token", () => {
  const css = gerar(tokens);
  const relatorio = auditar(tokens);
  relatorio.nomes.forEach((nome) => {
    const ocorrencias = css.split(nome + ":").length - 1;
    const esperado = SUBSTITUICOES_MOVIMENTO.some(
      ([grupo, chave]) => nomeVariavel("at", grupo, chave) === nome
    )
      ? 2 // uma no :root, outra na substituição reduzida
      : 1;
    assert.strictEqual(
      ocorrencias,
      esperado,
      `${nome} declarado ${ocorrencias}× (esperado ${esperado})`
    );
  });
});

test("tokens.css versionado está em dia com tokens.json", () => {
  // Se este teste falhar, rode `npm run generate:tokens:soul-church`.
  const emDisco = fs.readFileSync(gerador.DESTINO, "utf8");
  assert.strictEqual(
    emDisco.replace(/\r\n/g, "\n"),
    gerar(tokens).replace(/\r\n/g, "\n"),
    "tokens.css desatualizado — regere a partir de tokens.json"
  );
});

test("nenhum token carrega nome de marca ou de fonte da referência estudada", () => {
  // A reconstrução é independente: nomes de cor, fonte ou componente não
  // podem remeter à identidade comercial estudada.
  //
  // `$meta` fica de fora de propósito: ali mora a proveniência do estudo
  // (caminho da auditoria e do gerador), que DEVE citar a origem.
  const semMeta = Object.assign({}, tokens);
  delete semMeta.$meta;
  const bruto = JSON.stringify(semMeta).toLowerCase();

  [
    "soul",
    "wheat",
    "cornflower",
    "darker grotesque",
    "rama gothic",
    "rocky",
    "neue haas",
    "webflow",
  ].forEach((proibido) => {
    assert.ok(
      bruto.indexOf(proibido) === -1,
      `token contém termo ligado à referência: “${proibido}”`
    );
  });
});

test("o $meta declara a proveniência do estudo", () => {
  assert.match(tokens.$meta.origem, /auditoria/);
  assert.match(tokens.$meta.geradoPor, /soul-church\/ferramentas\/gerar-tokens\.js/);
  assert.strictEqual(tokens.$meta.prefixoCSS, "at");
});

test("a ordem dos grupos é estável (o CSS gerado é determinístico)", () => {
  assert.strictEqual(gerar(tokens), gerar(tokens));
  assert.ok(GRUPOS.length > 20);
});
