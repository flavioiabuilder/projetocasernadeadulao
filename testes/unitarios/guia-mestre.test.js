"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const {
  encontrarMarcadores,
  extrairTextoDocx,
  textoDeDocumentXml,
  verificarGuia,
} = require("../../ferramentas/verificar-guia-mestre");

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
  }
  return ~c >>> 0;
}

/** ZIP store (sem compressão) suficiente para fixture DOCX. */
function escreverZipStore(destino, arquivos) {
  const partes = [];
  const centrais = [];
  let offset = 0;

  for (const { nome, dados } of arquivos) {
    const nomeBuf = Buffer.from(nome, "utf8");
    const soma = crc32(dados);
    const local = Buffer.alloc(30 + nomeBuf.length);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(0, 8);
    local.writeUInt16LE(0, 10);
    local.writeUInt16LE(0, 12);
    local.writeUInt32LE(soma, 14);
    local.writeUInt32LE(dados.length, 18);
    local.writeUInt32LE(dados.length, 22);
    local.writeUInt16LE(nomeBuf.length, 26);
    local.writeUInt16LE(0, 28);
    nomeBuf.copy(local, 30);

    const central = Buffer.alloc(46 + nomeBuf.length);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt16LE(0, 12);
    central.writeUInt16LE(0, 14);
    central.writeUInt32LE(soma, 16);
    central.writeUInt32LE(dados.length, 20);
    central.writeUInt32LE(dados.length, 24);
    central.writeUInt16LE(nomeBuf.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(offset, 42);
    nomeBuf.copy(central, 46);

    partes.push(local, dados);
    centrais.push(central);
    offset += local.length + dados.length;
  }

  const centralDir = Buffer.concat(centrais);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(arquivos.length, 8);
  end.writeUInt16LE(arquivos.length, 10);
  end.writeUInt32LE(centralDir.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);

  fs.writeFileSync(destino, Buffer.concat([...partes, centralDir, end]));
}

describe("proteção do prefácio não homologado", () => {
  for (const marcador of [
    "Eu o <strong>valido pastoralmente</strong>.",
    "Obra que acompanhei de perto.",
    "Processo de revisão e validação.",
    "Pastor-presidente do Projeto Caserna de Adulão.",
    "Prefácio — Pr. Glaydston.",
  ]) {
    it(`detecta atribuição indevida: ${marcador.replace(/<[^>]+>/g, "")}`, () => {
      assert.equal(encontrarMarcadores(marcador).length, 1);
    });
  }

  it("aceita a ressalva editorial e a indicação nominal do futuro validador", () => {
    const texto = "Homologação pastoral pendente. Validador previsto: Pastor Glaydston.";
    assert.deepEqual(encontrarMarcadores(texto), []);
  });

  it("detecta marcador partido no meio da palavra entre runs DOCX", () => {
    const xml =
      "<w:document><w:body><w:p><w:r><w:t>Eu o vali</w:t></w:r>" +
      "<w:r><w:t>do pastoralmente.</w:t></w:r></w:p></w:body></w:document>";
    assert.equal(textoDeDocumentXml(xml), "Eu o valido pastoralmente.");
    assert.equal(encontrarMarcadores(textoDeDocumentXml(xml)).length, 1);
  });

  it("lê apenas o corpo do DOCX e ignora marcador presente em metadados", () => {
    const temporario = fs.mkdtempSync(path.join(os.tmpdir(), "guia-mestre-"));
    const docx = path.join(temporario, "fixture.docx");
    escreverZipStore(docx, [
      {
        nome: "word/document.xml",
        dados: Buffer.from(
          "<w:document><w:t>Homologação pastoral pendente.</w:t></w:document>",
          "utf8"
        ),
      },
      {
        nome: "docProps/core.xml",
        dados: Buffer.from("<metadata>Eu o valido pastoralmente.</metadata>", "utf8"),
      },
    ]);

    assert.deepEqual(encontrarMarcadores(extrairTextoDocx(docx)), []);
    fs.rmSync(temporario, { recursive: true, force: true });
  });

  it("detecta marcador partido entre runs no DOCX extraído via zip", () => {
    const temporario = fs.mkdtempSync(path.join(os.tmpdir(), "guia-mestre-"));
    const docx = path.join(temporario, "fixture-split.docx");
    escreverZipStore(docx, [
      {
        nome: "word/document.xml",
        dados: Buffer.from(
          "<w:document><w:body><w:p><w:r><w:t>Eu o vali</w:t></w:r>" +
            "<w:r><w:t>do pastoralmente.</w:t></w:r></w:p></w:body></w:document>",
          "utf8"
        ),
      },
    ]);

    assert.equal(encontrarMarcadores(extrairTextoDocx(docx)).length, 1);
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
