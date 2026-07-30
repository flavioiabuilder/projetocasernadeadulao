/**
 * Protege a condição editorial do Guia Mestre enquanto a homologação pastoral
 * estiver pendente. A verificação é deliberadamente estreita: examina apenas
 * os derivados textuais publicáveis e impede a liberação dos binários já
 * auditados como divergentes, sem tentar reescrevê-los.
 */
"use strict";

const { createHash } = require("node:crypto");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

const base = path.join(__dirname, "..", "fontes", "guia-mestre");

const textuais = [
  "Guia_Mestre_Discipulando_a_Caserna_v1_0-RC_revisado.md",
  "Guia_Mestre_Discipulando_a_Caserna_v1_0-RC_revisado.html",
];

const binariosBloqueados = new Map([
  [
    "Guia_Mestre_Discipulando_a_Caserna_v1_0-RC_revisado.docx",
    {
      hash: "1462d908c83956b3ccd04e1e088ebc051d7f1ff3e1d6740d7ab2c4cc82c37784",
      motivo: "contém prefácio não homologado",
    },
  ],
  [
    "Guia_Mestre_Discipulando_a_Caserna_v1_0-RC_revisado.pdf",
    {
      hash: "de2f7dae5a621f7f5ead3a8095764a832c78b8ebbe220344a8e79162d4fb3588",
      motivo: "não teve o conteúdo semanticamente confirmado",
    },
  ],
]);

const alegacoesNaoHomologadas = [
  /eu o valido pastoralmente/iu,
  /obra que acompanhei de perto, tanto na origem quanto no processo de revisão e validação/iu,
  /pastor-presidente do projeto caserna de adulão/iu,
];

const marcadoresObrigatorios = [
  /homologação pastoral pendente/iu,
  /página reservada ao prefácio pastoral/iu,
  /nada abaixo desta linha antecipa autoria, endosso ou homologação pastoral/iu,
];

const falhas = [];

async function verificar() {
  for (const arquivo of textuais) {
    const conteudo = await readFile(path.join(base, arquivo), "utf8");

    for (const alegacao of alegacoesNaoHomologadas) {
      if (alegacao.test(conteudo)) {
        falhas.push(
          `${arquivo}: contém texto pastoral não homologado (${alegacao.source})`
        );
      }
    }

    for (const marcador of marcadoresObrigatorios) {
      if (!marcador.test(conteudo)) {
        falhas.push(`${arquivo}: não contém a ressalva editorial (${marcador.source})`);
      }
    }
  }

  for (const [arquivo, bloqueio] of binariosBloqueados) {
    const conteudo = await readFile(path.join(base, arquivo));
    const hashAtual = createHash("sha256").update(conteudo).digest("hex");

    if (hashAtual === bloqueio.hash) {
      falhas.push(
        `${arquivo}: binário bloqueado (${bloqueio.motivo}) e não pode ser distribuído`
      );
    } else {
      falhas.push(`${arquivo}: binário mudou e exige nova auditoria documental`);
    }
  }

  if (falhas.length > 0) {
    console.error("Falha na verificação do Guia Mestre:");
    for (const falha of falhas) console.error(`- ${falha}`);
    process.exitCode = 1;
  } else {
    console.log(
      "Guia Mestre verificado: todos os formatos estão aptos para distribuição."
    );
  }
}

verificar();
