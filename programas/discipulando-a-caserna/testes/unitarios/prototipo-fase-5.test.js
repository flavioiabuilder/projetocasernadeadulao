"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const os = require("os");
const { buildPrototype } = require("../../ferramentas/gerar-prototipo-fase-5");
const { parseBlocos, dividirSecoes } = require("../../ferramentas/parse-md-blocos");

const raiz = path.join(__dirname, "../..");
const repoRoot = path.resolve(raiz, "../..");
const cand = path.join(raiz, "prototipos", "prospecto-fase-5-v1");

function hashTree(dir, files) {
  return files
    .map((rel) => {
      const p = path.join(dir, rel);
      if (!fs.existsSync(p)) return `${rel}:missing`;
      return `${rel}:${crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex")}`;
    })
    .join("|");
}

describe("prototipo-fase-5 candidato", () => {
  it("index importa tokens do design-system e não lab.css", () => {
    const html = fs.readFileSync(path.join(cand, "index.html"), "utf8");
    assert.match(html, /design-system\/tokens\/tokens\.css/);
    assert.doesNotMatch(html, /laboratorio\/css\/lab\.css/);
  });

  it("declara cinco movimentos e pedido/checklist", () => {
    const html = fs.readFileSync(path.join(cand, "index.html"), "utf8");
    for (let m = 1; m <= 5; m += 1) {
      assert.match(html, new RegExp(`id="movimento-${m}"`));
    }
    assert.match(html, /id="checklist-apreciacao"/);
    assert.match(html, /portão pastoral|A palavra final|prefácio/i);
  });

  it("parcial/relatorio espelha estado canônico F5", () => {
    const estado = JSON.parse(
      fs.readFileSync(
        path.join(raiz, "docs", "metodo", "fase-5", "estado-prototipo-canonico.json"),
        "utf8"
      )
    );
    const rel = JSON.parse(
      fs.readFileSync(path.join(cand, "parcial", "relatorio.json"), "utf8")
    );
    assert.equal(rel.canonic, Boolean(estado.prototipoCanonico));
    assert.equal(rel.fase6, estado.fase6);
  });

  it("CSS do candidato não usa primitivos", () => {
    const css = fs.readFileSync(path.join(cand, "css", "prototipo.css"), "utf8");
    const code = css.replace(/\/\*[\s\S]*?\*\//g, "");
    assert.doesNotMatch(code, /--primitivo-/);
  });

  it("não declara lacuna falsa nas seções 10 e 11", () => {
    const html = fs.readFileSync(path.join(cand, "index.html"), "utf8");
    assert.doesNotMatch(html, /Lacuna declarada/);
    assert.match(html, /Anatomia de uma lição/);
    assert.match(html, /Exclusivo do Instrutor|Objetivos da lição/);
  });

  it("preserva listas de escopo e salvaguardas", () => {
    const html = fs.readFileSync(path.join(cand, "index.html"), "utf8");
    assert.match(html, /Fundamentos bíblicos e hermenêuticos/);
    assert.match(html, /Debates confessionais secundários/);
    assert.match(html, /Não há ranking, comparação/);
  });

  it("separa múltiplas tabelas nas seções 11 e 12", () => {
    const s11 = fs.readFileSync(path.join(cand, "parcial", "secao-11.html"), "utf8");
    const s12 = fs.readFileSync(path.join(cand, "parcial", "secao-12.html"), "utf8");
    assert.equal((s11.match(/dc-tabela-wrap/g) || []).length, 2);
    assert.equal((s12.match(/dc-tabela-wrap/g) || []).length, 2);
    assert.doesNotMatch(s11, /----/);
  });

  it("matriz sem hidden estático e sumário via details", () => {
    const html = fs.readFileSync(path.join(cand, "index.html"), "utf8");
    assert.match(html, /<details class="dc-sumario-pe"/);
    const matriz = fs.readFileSync(path.join(cand, "parcial", "matriz.html"), "utf8");
    assert.doesNotMatch(matriz, /hidden/);
    assert.match(matriz, /data-ativacao="automatica"/);
  });

  it("relatório é determinístico (sem geradoEm/ms)", () => {
    const rel = JSON.parse(
      fs.readFileSync(path.join(cand, "parcial", "relatorio.json"), "utf8")
    );
    assert.equal(rel.geradoEm, undefined);
    assert.equal(rel.ms, undefined);
    assert.equal(rel.parser, "parse-md-blocos");
  });

  it("prosa não usa blockquote indevido; citações reais permanecem", () => {
    const html = fs.readFileSync(path.join(cand, "index.html"), "utf8");
    assert.equal((html.match(/dc-prosa-quote/g) || []).length, 0);
    assert.match(html, /dc-citacao-biblica/);
    assert.match(html, /dc-citacao-final/);
    assert.match(html, /1Sm 22\.1-2/);
    assert.match(html, /Fp 1\.6/);
  });

  it("assinatura e dados institucionais aparecem uma vez", () => {
    const html = fs.readFileSync(path.join(cand, "index.html"), "utf8");
    assert.equal((html.match(/Obr\. Flávio Alves da Costa/g) || []).length, 1);
    assert.equal((html.match(/63\.724\.286\/0001-78/g) || []).length, 1);
    assert.equal((html.match(/casernadeadulao@gmail\.com/g) || []).length, 1);
    assert.match(html, /data-dc-assinatura/);
    assert.match(html, /data-dc-rodape-institucional/);
  });

  it("PDF representado honestamente sem link falso", () => {
    const html = fs.readFileSync(path.join(cand, "index.html"), "utf8");
    assert.match(html, /versão pública em preparação/i);
    assert.doesNotMatch(html, /href=["']#["']/);
    assert.doesNotMatch(html, /download[^<]*disponível/i);
    assert.doesNotMatch(html, /data-pendencia="F6-06"/);
  });

  it("folheador usa manifesto 7+9 sem dependência do legado", () => {
    const html = fs.readFileSync(path.join(cand, "index.html"), "utf8");
    const dados = fs.readFileSync(path.join(cand, "js", "dados", "licao1.js"), "utf8");
    const folheador = fs.readFileSync(path.join(cand, "js", "folheador.js"), "utf8");
    assert.match(html, /data-folheador/);
    assert.match(html, /data-spc="SPC-F5-01"/);
    assert.equal((html.match(/dc-folheador__pagina/g) || []).length, 16);
    assert.match(html, /data-folheador-regiao="aluno"/);
    assert.match(html, /data-folheador-regiao="instrutor"/);
    assert.match(html, /data-folheador-controles[^>]*\bhidden\b/);
    assert.doesNotMatch(html, /data-pendencia="F6-05"/);
    assert.match(dados, /DADOS_LICAO1/);
    assert.doesNotMatch(folheador, /prospecto-v1/);
    assert.doesNotMatch(html, /prospecto-v1\/js/);
  });

  it("contextos visuais das seções 1, 4, 13 e 15", () => {
    const html = fs.readFileSync(path.join(cand, "index.html"), "utf8");
    assert.match(html, /id="secao-1"[^>]*data-contexto="abertura"/);
    assert.match(html, /id="secao-4"[^>]*data-contexto="umbral"/);
    assert.match(html, /id="secao-13"[^>]*data-contexto="profunda"/);
    assert.match(html, /id="secao-15"[^>]*data-contexto="encerramento-profundo"/);
    assert.match(html, /dc-convite-prefacio/);
  });

  it("buildPrototype em temp não altera working tree", () => {
    const tracked = [
      "index.html",
      "js/config.js",
      "js/dados/licao1.js",
      "parcial/relatorio.json",
    ];
    const before = hashTree(cand, tracked);
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "f5-build-"));
    const out = path.join(tmp, "prospecto-fase-5-v1");
    buildPrototype({
      repositoryRoot: repoRoot,
      outputDir: out,
      writeTelemetry: false,
      mode: "stale",
    });
    const after = hashTree(cand, tracked);
    assert.equal(after, before);
    assert.ok(fs.existsSync(path.join(out, "index.html")));
    fs.rmSync(tmp, { recursive: true, force: true });
  });
});

describe("parse-md-blocos diretivas", () => {
  it("reconhece prosa, citação e diretivas", () => {
    const blocos = parseBlocos(
      [
        "Parágrafo normal.",
        "",
        '> "Citação."',
        "> — Fp 1.6",
        "",
        ":::nota",
        "Nota pastoral.",
        ":::",
        "",
        ':::convite[titulo="O prefácio"]',
        "Texto do convite.",
        ":::",
        "",
        ":::assinatura",
        ":::",
        "",
        ":::preview-licao",
        ":::",
      ].join("\n")
    );
    assert.equal(blocos.filter((b) => b.type === "paragraph").length, 1);
    assert.equal(blocos.filter((b) => b.type === "blockquote").length, 1);
    assert.ok(blocos.some((b) => b.type === "directive" && b.name === "nota"));
    assert.ok(blocos.some((b) => b.type === "directive" && b.name === "convite"));
    assert.ok(blocos.some((b) => b.type === "directive" && b.name === "assinatura"));
    assert.ok(blocos.some((b) => b.type === "directive" && b.name === "preview-licao"));
  });

  it("falha em diretiva desconhecida, sem fechamento e atributo inválido", () => {
    assert.throws(() => parseBlocos(":::foo\n:::\n"), /desconhecida/);
    assert.throws(() => parseBlocos(":::nota\nsem fechar\n"), /sem fechamento/);
    assert.throws(
      () => parseBlocos(':::convite[cor="vermelha"]\n:::\n'),
      /atributo inválido/
    );
  });

  it("fonte canônica §15 não inclui Travas no corpo", () => {
    const md = fs.readFileSync(
      path.join(raiz, "conteudo", "secoes-12-15-a-prova-e-o-pedido.md"),
      "utf8"
    );
    const s15 = dividirSecoes(md, { file: "secoes-12-15" }).get(15);
    assert.doesNotMatch(s15.corpo, /## Travas destas seções/);
    assert.ok(s15.blocos.some((b) => b.type === "directive" && b.name === "convite"));
    assert.ok(s15.blocos.some((b) => b.type === "directive" && b.name === "assinatura"));
  });
});
