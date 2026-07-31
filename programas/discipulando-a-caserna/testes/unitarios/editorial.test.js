const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const {
  main,
  dividirSecoes,
  extrairBlockquotes,
  saidaDir,
} = require("../../ferramentas/gerar-editorial.js");

const raiz = path.join(__dirname, "../..");

describe("geração editorial (pipeline paralelo)", () => {
  it("divide Movimento I em quatro seções", () => {
    const md = fs.readFileSync(
      path.join(raiz, "conteudo/secoes-01-04-a-necessidade.md"),
      "utf8"
    );
    const mapa = dividirSecoes(md);
    assert.equal(mapa.size, 4);
    assert.ok(mapa.get(1).corpo.includes("Não começo esta apresentação"));
  });

  it("extrai blockquotes literais", () => {
    const quotes = extrairBlockquotes(
      "**Parágrafos:**\n\n> Uma frase.\n\n> Outra frase.\n"
    );
    assert.deepEqual(quotes, ["Uma frase.", "Outra frase."]);
  });

  it("gera fragmentos sem substituir index.html", () => {
    const indexPath = path.join(raiz, "prototipos", "prospecto-v1", "index.html");
    const antes = fs.readFileSync(indexPath, "utf8");
    const rel = main();
    const depois = fs.readFileSync(indexPath, "utf8");
    assert.equal(antes, depois);
    assert.equal(rel.substituiIndex, false);
    assert.ok(rel.totais.secoes >= 15);
    assert.ok(fs.existsSync(path.join(saidaDir, "secao-1.html")));
    assert.ok(fs.existsSync(path.join(saidaDir, "relatorio.json")));
    const s1 = fs.readFileSync(path.join(saidaDir, "secao-1.html"), "utf8");
    assert.match(s1, /id="secao-1"/);
    assert.match(s1, /data-origem="gerar-editorial"/);
  });
});
