"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const {
  encontrarMarcadores,
  extrairTextoDocx,
  verificarGuia,
} = require("../../ferramentas/verificar-guia-mestre");

describe("proteção do prefácio não homologado", () => {
  it("detecta um marcador distintivo mesmo quando dividido por tags", () => {
    assert.equal(
      encontrarMarcadores("Eu o <strong>valido pastoralmente</strong>.").length,
      1
    );
  });

  it("aceita a ressalva editorial e a indicação nominal do futuro validador", () => {
    const texto = "Homologação pastoral pendente. Validador previsto: Pastor Glaydston.";
    assert.deepEqual(encontrarMarcadores(texto), []);
  });

  it("lê apenas o corpo do DOCX e ignora marcador presente em metadados", () => {
    const temporario = fs.mkdtempSync(path.join(os.tmpdir(), "guia-mestre-"));
    const pasta = path.join(temporario, "fixture");
    fs.mkdirSync(path.join(pasta, "word"), { recursive: true });
    fs.mkdirSync(path.join(pasta, "docProps"), { recursive: true });
    fs.writeFileSync(
      path.join(pasta, "word", "document.xml"),
      "<w:document><w:t>Homologação pastoral pendente.</w:t></w:document>"
    );
    fs.writeFileSync(
      path.join(pasta, "docProps", "core.xml"),
      "<metadata>Eu o valido pastoralmente.</metadata>"
    );
    const docx = path.join(temporario, "fixture.docx");
    execFileSync("zip", ["-qr", docx, "."], { cwd: pasta });

    assert.deepEqual(encontrarMarcadores(extrairTextoDocx(docx)), []);
    fs.rmSync(temporario, { recursive: true, force: true });
  });

  it("exclui explicitamente o diretório de rascunhos da verificação oficial", async () => {
    const falhas = await verificarGuia();
    assert.equal(
      falhas.some((falha) => falha.includes("rascunhos")),
      false
    );
  });
});
