/**
 * Impede que o prefácio ou a assinatura pastoral não homologados sejam
 * publicados nos formatos oficiais do Guia Mestre.
 */
"use strict";

const { readFile } = require("node:fs/promises");
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const base = path.join(__dirname, "..", "fontes", "guia-mestre");
const nomeBase = "Guia_Mestre_Discipulando_a_Caserna_v1_0-RC_revisado";
const formatosTextuais = ["md", "html"];
const marcadoresNaoHomologados = [
  /eu o valido pastoralmente/iu,
  /obra que acompanhei de perto, tanto na origem quanto no processo de revisão e validação/iu,
  /pastor-presidente do projeto caserna de adulão/iu,
];

/** Converte XML/HTML em texto contínuo para neutralizar a divisão entre tags. */
function normalizarTexto(conteudo) {
  return conteudo
    .replace(/<[^>]+>/gu, " ")
    .replace(/&nbsp;|&#160;/giu, " ")
    .replace(/\s+/gu, " ")
    .trim();
}

/** Retorna os marcadores editoriais indevidos encontrados no conteúdo. */
function encontrarMarcadores(conteudo) {
  const texto = normalizarTexto(conteudo);
  return marcadoresNaoHomologados.filter((marcador) => marcador.test(texto));
}

/**
 * Extrai somente o corpo documental do DOCX. Metadados não são pesquisados,
 * evitando que o nome de um futuro validador produza falso positivo.
 */
function extrairTextoDocx(arquivo) {
  const resultado = spawnSync("unzip", ["-p", arquivo, "word/document.xml"], {
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
  });

  if (resultado.error || resultado.status !== 0 || !resultado.stdout) {
    const detalhe = resultado.error?.message || resultado.stderr.trim();
    throw new Error(`não foi possível extrair word/document.xml: ${detalhe}`);
  }
  return normalizarTexto(resultado.stdout);
}

async function verificarGuia() {
  const falhas = [];

  for (const extensao of formatosTextuais) {
    const arquivo = `${nomeBase}.${extensao}`;
    const conteudo = await readFile(path.join(base, arquivo), "utf8");
    if (encontrarMarcadores(conteudo).length > 0) {
      falhas.push(`${arquivo}: contém prefácio ou assinatura pastoral não homologados`);
    }
  }

  const docx = `${nomeBase}.docx`;
  try {
    if (encontrarMarcadores(extrairTextoDocx(path.join(base, docx))).length > 0) {
      falhas.push(`${docx}: contém prefácio ou assinatura pastoral não homologados`);
    }
  } catch (erro) {
    falhas.push(`${docx}: ${erro.message}`);
  }

  falhas.push(
    `${nomeBase}.pdf: conteúdo não validado; não há extrator PDF determinístico adotado no projeto`
  );
  return falhas;
}

async function executar() {
  const falhas = await verificarGuia();
  if (falhas.length > 0) {
    console.error("Falha na verificação dos artefatos oficiais do Guia Mestre:");
    for (const falha of falhas) console.error(`- ${falha}`);
    process.exitCode = 1;
    return;
  }
  console.log("Guia Mestre verificado: nenhum marcador não homologado encontrado.");
}

if (require.main === module) executar();

module.exports = {
  encontrarMarcadores,
  extrairTextoDocx,
  normalizarTexto,
  verificarGuia,
};
