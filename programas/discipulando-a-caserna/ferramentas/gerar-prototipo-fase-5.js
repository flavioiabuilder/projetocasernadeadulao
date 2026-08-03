/**
 * Gera o candidato Fase 5 a partir das fontes canônicas do programa.
 *
 * Uso:
 *   node ferramentas/gerar-prototipo-fase-5.js
 */
"use strict";

const fs = require("fs");
const path = require("path");
const {
  dividirSecoes,
  extrairMeta,
  extrairCitacaoBiblica,
} = require("./parse-md-blocos");
const institucional = require("./institucional");

const repositoryRootPadrao = path.resolve(__dirname, "../../..");
const programaRootPadrao = path.join(
  repositoryRootPadrao,
  "programas",
  "discipulando-a-caserna"
);
const destRoot = path.join(programaRootPadrao, "prototipos", "prospecto-fase-5-v1");
const parcialDir = path.join(destRoot, "parcial");

const CONTEXTOS_SECAO = Object.freeze({
  1: "abertura",
  4: "umbral",
  13: "profunda",
  15: "encerramento-profundo",
});

const FONTES = [
  {
    arquivo: "conteudo/secoes-01-04-a-necessidade.md",
    movimento: 1,
    rotulo: "I — A necessidade",
    secoes: [1, 2, 3, 4],
  },
  {
    arquivo: "conteudo/secoes-05-07-a-resposta.md",
    movimento: 2,
    rotulo: "II — A resposta",
    secoes: [5, 6, 7],
  },
  {
    arquivo: "conteudo/secoes-08-11-o-programa.md",
    movimento: 3,
    rotulo: "III — O programa",
    secoes: [8, 9, 10, 11],
  },
  {
    arquivo: "conteudo/secoes-12-15-a-prova-e-o-pedido.md",
    movimento: 4,
    rotulo: "IV — A prova",
    secoes: [12, 13],
  },
  {
    arquivo: "conteudo/secoes-12-15-a-prova-e-o-pedido.md",
    movimento: 5,
    rotulo: "V — O pedido",
    secoes: [14, 15],
  },
];

function lerUtf8(caminho) {
  return fs.readFileSync(caminho, "utf8");
}

function escreverUtf8(caminho, conteudo) {
  fs.mkdirSync(path.dirname(caminho), { recursive: true });
  const texto = String(conteudo);
  fs.writeFileSync(caminho, texto.endsWith("\n") ? texto : `${texto}\n`, "utf8");
}

function escapeHtml(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function mdInline(texto) {
  return escapeHtml(texto).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function renderComparacao(tabela) {
  if (!tabela || tabela.header.length < 2) return "";
  const colA = tabela.header[0];
  const colB = tabela.header[1];
  let html = `    <div class="dc-comparacao">\n`;
  html += `      <div class="dc-comparacao__lado">\n`;
  html += `        <h3 class="dc-comparacao__titulo">${mdInline(colA)}</h3>\n`;
  html += `        <ul class="dc-lista-editorial">\n`;
  for (const row of tabela.rows) {
    html += `          <li>${mdInline(row[0] || "")}</li>\n`;
  }
  html += `        </ul>\n      </div>\n`;
  html += `      <div class="dc-comparacao__lado">\n`;
  html += `        <h3 class="dc-comparacao__titulo">${mdInline(colB)}</h3>\n`;
  html += `        <ul class="dc-lista-editorial">\n`;
  for (const row of tabela.rows) {
    html += `          <li>${mdInline(row[1] || "")}</li>\n`;
  }
  html += `        </ul>\n      </div>\n    </div>\n`;
  return html;
}

function renderTabelaDados(tabela, label, opts = {}) {
  if (!tabela) return "";
  const { rowScopeFirst = false, firstHeaderFallback = null } = opts;
  let html = `    <div class="dc-tabela-wrap" role="region" aria-label="${escapeHtml(label)}">\n`;
  html += `      <table class="dc-tabela">\n        <thead><tr>`;
  tabela.header.forEach((cabecalho, index) => {
    const texto = cabecalho || (index === 0 && firstHeaderFallback) || "";
    html += `<th scope="col">${mdInline(texto)}</th>`;
  });
  html += `</tr></thead>\n        <tbody>\n`;
  for (const row of tabela.rows) {
    html += "          <tr>";
    row.forEach((celula, index) => {
      html +=
        rowScopeFirst && index === 0
          ? `<th scope="row">${mdInline(celula)}</th>`
          : `<td>${mdInline(celula)}</td>`;
    });
    html += "</tr>\n";
  }
  html += `        </tbody>\n      </table>\n    </div>\n`;
  return html;
}

function renderPedidosComoLista(tabela) {
  if (!tabela) return "";
  let html = `    <ol class="dc-lista-pedidos">\n`;
  for (const row of tabela.rows) {
    const numero = row[0] || "";
    html += `      <li value="${escapeHtml(numero)}">\n`;
    html += `        <p class="dc-lista-pedidos__pedido">${mdInline(row[1] || "")}</p>\n`;
    if (row[2]) {
      html += `        <p class="dc-lista-pedidos__obs">${mdInline(row[2])}</p>\n`;
    }
    html += `      </li>\n`;
  }
  html += `    </ol>\n`;
  return html;
}

function renderLista(bloco, indent = "    ") {
  const tag = bloco.type === "ol" ? "ol" : "ul";
  let html = `${indent}<${tag} class="dc-lista-editorial">\n`;
  for (const item of bloco.items) {
    html += `${indent}  <li>${mdInline(item)}</li>\n`;
  }
  html += `${indent}</${tag}>\n`;
  return html;
}

function renderCode(bloco) {
  return `    <pre class="dc-assinatura-bloco"><code>${escapeHtml(bloco.value)}</code></pre>\n`;
}

function isCitacaoFinal(texto) {
  return /Fp\s*1\.6/i.test(texto) || /começou boa obra/i.test(texto);
}

function renderCitacaoFinal(bloco) {
  const linhas = bloco.lines || [];
  const referencia = linhas.find((linha) => /^—/.test(linha.trim()));
  const texto = linhas
    .filter((linha) => !/^—/.test(linha.trim()))
    .join(" ")
    .replace(/^"|"$/g, "");
  let html = `    <blockquote class="dc-citacao-final">\n`;
  html += `      <p>${mdInline(texto)}</p>\n`;
  if (referencia) {
    html += `      <cite>${escapeHtml(referencia.replace(/^—\s*/, ""))}</cite>\n`;
  }
  html += `    </blockquote>\n`;
  return html;
}

function renderAssinatura(estado) {
  if (estado.assinaturaRenderizada) return "";
  estado.assinaturaRenderizada = true;
  return [
    `    <div class="dc-assinatura-bloco dc-pad-06" data-dc-assinatura>`,
    `      <p class="dc-assinatura">${escapeHtml(institucional.autor)}</p>`,
    `      <p class="dc-meta">${escapeHtml(institucional.instituicao)} · ${escapeHtml(institucional.cidade)}</p>`,
    `    </div>`,
    "",
  ].join("\n");
}

function renderRodapeInstitucional() {
  return [
    `    <aside class="dc-rodape-institucional dc-pad-06" data-dc-rodape-institucional aria-label="Dados institucionais">`,
    `      <p class="dc-meta">${escapeHtml(institucional.instituicao)} · ${escapeHtml(institucional.cidade)}</p>`,
    `      <p class="dc-meta">CNPJ ${escapeHtml(institucional.cnpj)} · ${escapeHtml(institucional.email)}</p>`,
    `      <p class="dc-nota">Material em versão candidata — não distribuir antes da apreciação pastoral.</p>`,
    `    </aside>`,
    "",
  ].join("\n");
}

function renderFolheador(itens) {
  const porEdicao = {
    aluno: itens.filter((item) => item.edicao === "aluno"),
    instrutor: itens.filter((item) => item.edicao === "instrutor"),
  };
  let html = `    <section class="dc-folheador" id="preview-licao-1" data-folheador data-spc="SPC-F5-01" aria-labelledby="titulo-preview-licao-1">\n`;
  html += `      <h3 class="dc-subtitulo-bloco" id="titulo-preview-licao-1">Prévia da Lição 1</h3>\n`;
  html += `      <div class="dc-folheador__controles" data-folheador-controles hidden>\n`;
  html += `        <div role="group" aria-label="Edição da Lição 1">\n`;
  html += `          <button type="button" class="dc-acao" data-folheador-edicao="aluno" aria-pressed="true">Aluno</button>\n`;
  html += `          <button type="button" class="dc-acao" data-folheador-edicao="instrutor" aria-pressed="false">Instrutor</button>\n`;
  html += `        </div>\n`;
  html += `        <button type="button" class="dc-acao" data-folheador-prev>Página anterior</button>\n`;
  html += `        <button type="button" class="dc-acao" data-folheador-next>Próxima página</button>\n`;
  html += `      </div>\n`;

  for (const edicao of ["aluno", "instrutor"]) {
    const nomeEdicao = edicao === "aluno" ? "Aluno" : "Instrutor";
    html += `      <div class="dc-folheador__regiao" data-folheador-regiao="${edicao}" aria-label="Edição do ${nomeEdicao} — ${porEdicao[edicao].length} páginas">\n`;
    for (const item of porEdicao[edicao]) {
      const src = item.arquivo_sm || item.arquivo;
      html += `        <figure class="dc-folheador__pagina" data-folheador-pagina="${item.pagina}">\n`;
      html += `          <img src="${escapeHtml(src)}"`;
      if (item.arquivo_sm && item.arquivo !== item.arquivo_sm) {
        html += ` srcset="${escapeHtml(item.arquivo_sm)} 550w, ${escapeHtml(item.arquivo)} 1100w" sizes="(max-width: 700px) 100vw, 700px"`;
      }
      const primeiraPagina = edicao === "aluno" && item.pagina === 1;
      html += ` alt="Lição 1, edição do ${nomeEdicao}, página ${item.pagina} de ${porEdicao[edicao].length}" width="${item.largura}" height="${item.altura}" loading="${primeiraPagina ? "eager" : "lazy"}" />\n`;
      html += `          <figcaption>Edição do ${nomeEdicao} · Página ${item.pagina} de ${porEdicao[edicao].length}</figcaption>\n`;
      html += `        </figure>\n`;
    }
    html += `      </div>\n`;
  }
  html += `      <p class="dc-visually-hidden" data-folheador-live aria-live="polite" aria-atomic="true"></p>\n`;
  html += `    </section>\n`;
  return html;
}

function renderDirective(bloco, estado) {
  if (bloco.name === "assinatura") return renderAssinatura(estado);
  if (bloco.name === "rodape-institucional") return renderRodapeInstitucional();
  if (bloco.name === "preview-licao") return renderFolheador(estado.paginasLicao1);

  if (bloco.name === "nota") {
    let html = `    <aside class="dc-nota" role="note">\n`;
    html += renderCorpoBlocos(estado.num, bloco.children, null, estado);
    html += `    </aside>\n`;
    return html;
  }

  if (bloco.name === "convite") {
    const titulo = bloco.attrs.titulo || "Convite";
    let html = `    <aside class="dc-convite-prefacio" role="note">\n`;
    html += `      <p class="dc-selo">CONVITE</p>\n`;
    html += `      <h3 class="dc-titulo-secao">${escapeHtml(titulo)}</h3>\n`;
    html += renderCorpoBlocos(estado.num, bloco.children, null, estado);
    html += `    </aside>\n`;
    return html;
  }

  throw new Error(`Diretiva sem renderizador: ${bloco.name}`);
}

function devePularInstrucao(texto) {
  return /Conteúdo integral|Usar aquele arquivo|Parágrafo de transição a acrescentar|^Travas\b|^Decisões\b/i.test(
    String(texto || "")
  );
}

function renderCorpoBlocos(num, blocos, citBib, estadoExterno) {
  const estado = estadoExterno || {
    num,
    paginasLicao1: [],
    assinaturaRenderizada: false,
  };
  let html = "";
  let tableIndex = 0;
  const skipMeta = new Set([
    "sobrelinha",
    "título",
    "titulo",
    "subtítulo",
    "subtitulo",
    "selo",
    "rótulo",
    "rotulo",
    "título do bloco",
    "titulo do bloco",
    "nota de layout",
    "interação",
    "interacao",
    "citação final",
    "citacao final",
    "ajuste de posição",
    "assinatura",
    "rodapé institucional",
    "rodape institucional",
  ]);

  for (const bloco of blocos) {
    if (bloco.type === "directive") {
      html += renderDirective(bloco, estado);
      continue;
    }

    if (bloco.type === "meta") {
      const chave = String(bloco.chave).toLowerCase();
      if (skipMeta.has(chave)) continue;
      if (chave === "números de destaque" || chave === "numeros de destaque") continue;
      if (devePularInstrucao(`${bloco.chave} ${bloco.valor || ""}`)) continue;
      if (!String(bloco.valor || "").trim()) {
        if (
          /^(texto|parágrafo|elemento|bloco|nota|público|camadas|números)/i.test(
            bloco.chave
          )
        ) {
          continue;
        }
        html += `    <p class="dc-meta-rotulo"><strong>${escapeHtml(bloco.chave)}</strong></p>\n`;
      } else {
        html += `    <p class="dc-meta-rotulo"><strong>${escapeHtml(bloco.chave)}:</strong> ${mdInline(bloco.valor)}</p>\n`;
      }
      continue;
    }

    if (bloco.type === "heading_inline") {
      html += `    <h3 class="dc-subtitulo-bloco">${escapeHtml(bloco.text)}</h3>\n`;
      continue;
    }

    if (bloco.type === "blockquote") {
      if (
        citBib &&
        (bloco === citBib.block || bloco.text.includes(citBib.texto.slice(0, 40)))
      ) {
        continue;
      }
      if (num === 15 && isCitacaoFinal(bloco.text)) {
        html += renderCitacaoFinal(bloco);
      } else {
        html += `    <blockquote class="dc-prosa-quote">\n`;
        html += `      <p>${mdInline(bloco.text)}</p>\n`;
        html += `    </blockquote>\n`;
      }
      continue;
    }

    if (bloco.type === "table") {
      tableIndex += 1;
      if (num === 3 && tableIndex === 1 && bloco.header.length >= 2) {
        html += renderComparacao(bloco);
      } else if (num === 15 && tableIndex === 1) {
        html += renderPedidosComoLista(bloco);
      } else {
        html += renderTabelaDados(bloco, `Dados da seção ${num} (tabela ${tableIndex})`);
      }
      continue;
    }

    if (bloco.type === "ul" || bloco.type === "ol") {
      html += renderLista(bloco);
      continue;
    }

    if (bloco.type === "code") {
      html += renderCode(bloco);
      continue;
    }

    if (bloco.type === "paragraph" && !devePularInstrucao(bloco.text)) {
      html += `    <p class="dc-prosa-p">${mdInline(bloco.text)}</p>\n`;
    }
  }
  return html;
}

function renderSecao(num, meta, movimentoId, opts = {}) {
  const blocos = meta.blocos;
  const sobrelinha = extrairMeta(blocos, "Sobrelinha");
  const titulo = extrairMeta(blocos, "Título") || meta.tituloLinha.replace(/`/g, "");
  const subtitulo = extrairMeta(blocos, "Subtítulo");
  const selo = extrairMeta(blocos, "Selo");
  const citBib = num === 4 ? extrairCitacaoBiblica(blocos) : null;
  const contexto = CONTEXTOS_SECAO[num] || null;
  const isAbertura = contexto === "abertura";
  const isUmbral = contexto === "umbral";
  const headingId = `titulo-secao-${num}`;
  const headingTag = isAbertura ? "h1" : "h2";
  const classes = [
    "dc-secao",
    isAbertura ? "dc-abertura" : "",
    isUmbral ? "dc-umbral" : "",
    contexto === "abertura" ||
    contexto === "profunda" ||
    contexto === "encerramento-profundo"
      ? "dc-superficie-profunda"
      : "",
    contexto === "profunda" ? "dc-secao-densa" : "",
    contexto === "encerramento-profundo" ? "dc-encerramento" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const contextoAttr = contexto ? ` data-contexto="${contexto}"` : "";

  let html = `<!-- GERADO: secao-${num} — fonte conteudo/*.md — não editar -->\n`;
  html += `<section class="${classes}" id="secao-${num}" aria-labelledby="${headingId}" data-movimento="${movimentoId}" data-origem="gerar-prototipo-fase-5"${contextoAttr}>\n`;
  html += `  <div class="dc-medida">\n`;
  html += isAbertura
    ? `    <header class="dc-pad-01">\n`
    : `    <header class="dc-pad-02">\n`;
  if (!isAbertura) html += `      <p class="dc-folio">Seção ${num}</p>\n`;
  if (sobrelinha)
    html += `      <p class="dc-sobrelinha">${escapeHtml(sobrelinha)}</p>\n`;
  html += `      <${headingTag} class="${isAbertura ? "dc-titulo-pagina" : "dc-titulo-secao"}" id="${headingId}">${escapeHtml(titulo)}</${headingTag}>\n`;
  if (subtitulo) html += `      <p class="dc-subtitulo">${escapeHtml(subtitulo)}</p>\n`;
  if (isAbertura && selo) html += `      <p class="dc-selo">${escapeHtml(selo)}</p>\n`;
  html += `    </header>\n`;

  if (citBib) {
    html += `    <blockquote class="dc-citacao-biblica">\n`;
    html += `      <p>${escapeHtml(citBib.texto)}</p>\n`;
    html += `      <cite>${escapeHtml(citBib.ref)}</cite>\n`;
    html += `    </blockquote>\n`;
  }

  const estado = {
    num,
    paginasLicao1: opts.paginasLicao1 || [],
    assinaturaRenderizada: false,
  };
  html += `    <div class="dc-prosa">\n`;
  html += renderCorpoBlocos(num, blocos, citBib, estado);
  html += `    </div>\n`;
  if (num === 9) html += `    {{MATRIZ_CURRICULAR}}\n`;
  if (selo && !isAbertura) html += `    <p class="dc-selo">${escapeHtml(selo)}</p>\n`;
  html += `  </div>\n</section>\n`;

  const quoteCount = blocos.filter((bloco) => bloco.type === "blockquote").length;
  return { html, titulo, sobrelinha, quotes: Array(quoteCount).fill("") };
}

function renderMatriz(modulos, licoes) {
  let html = `<!-- GERADO: matriz — conteudo/modulos.json + matriz-curricular.json -->\n`;
  html += `<div class="dc-pad-05" id="matriz-curricular">\n`;
  html += `  <h2 class="dc-titulo-secao" id="titulo-matriz">Visão curricular (4 × 12)</h2>\n`;
  html += `  <p class="dc-nota">Arquitetura formativa — não métrica comercial. Campos nulos omitidos. Sem JavaScript, todos os módulos permanecem legíveis.</p>\n`;
  html += `  <div class="dc-abas" data-dc-abas data-ativacao="automatica">\n`;
  html += `    <div class="dc-abas__tablist" role="tablist" aria-label="Módulos do currículo">\n`;
  modulos.forEach((modulo, index) => {
    const selected = index === 0;
    html += `      <button type="button" class="dc-abas__tab" role="tab" id="tab-mod-${modulo.numero}" aria-controls="panel-mod-${modulo.numero}" aria-selected="${selected}" tabindex="${selected ? 0 : -1}">Módulo ${modulo.numero}</button>\n`;
  });
  html += `    </div>\n`;

  for (const modulo of modulos) {
    const estadoClasse =
      modulo.estado === "produzido"
        ? "dc-estado--produzido"
        : modulo.estado === "planejado"
          ? "dc-estado--planejado"
          : "dc-estado--pendente";
    html += `    <div class="dc-abas__panel" role="tabpanel" id="panel-mod-${modulo.numero}" aria-labelledby="tab-mod-${modulo.numero}">\n`;
    html += `      <article class="dc-curriculo">\n`;
    html += `        <h3 class="dc-curriculo__titulo">${escapeHtml(modulo.nome)}</h3>\n`;
    html += `        <p>${escapeHtml(modulo.subtitulo || "")}</p>\n`;
    html += `        <p><span class="dc-estado ${estadoClasse}">${escapeHtml(modulo.estado)}</span></p>\n`;
    if (modulo.enfase) html += `        <p>${escapeHtml(modulo.enfase)}</p>\n`;
    if (modulo.virtude) html += `        <p>Virtude: ${escapeHtml(modulo.virtude)}</p>\n`;
    if (modulo.tema) html += `        <p>Tema: ${escapeHtml(modulo.tema)}</p>\n`;
    if (modulo.virtude == null && modulo.tema == null) {
      html += `        <p class="dc-nota">Virtude/tema deste módulo: lacuna canônica (null) — omitidos sem placeholder.</p>\n`;
    }
    html += `        <ol class="dc-lista-curricular">\n`;
    for (const licao of licoes.filter((item) => item.modulo === modulo.numero)) {
      const status = licao.produzida ? "produzido" : "planejado";
      html += `          <li class="dc-curriculo-item">\n`;
      html += `            <span class="dc-estado dc-estado--${status}">${status}</span>\n`;
      html += `            <strong>Lição ${licao.numero}.</strong> ${escapeHtml(licao.titulo)}\n`;
      if (licao.textoBase) {
        html += `            <span class="dc-meta">(${escapeHtml(licao.textoBase)})</span>\n`;
      }
      html += `          </li>\n`;
    }
    html += `        </ol>\n`;
    html += `      </article>\n`;
    html += `    </div>\n`;
  }
  html += `  </div>\n</div>\n`;
  return html;
}

function renderChecklistPedido() {
  const itens = [
    "Fidelidade bíblica e pastoral do Módulo 1",
    "Adequação da linguagem ao público da caserna",
    "Clareza do pedido e do que está pendente de apreciação",
    "Honestidade sobre o que ainda não está produzido (Módulos 2–4)",
  ];
  let html = `<section class="dc-secao dc-pad-08" id="checklist-apreciacao" aria-labelledby="titulo-checklist" data-movimento="5">\n`;
  html += `  <div class="dc-medida">\n`;
  html += `    <h2 class="dc-titulo-secao" id="titulo-checklist">Pontos para apreciação</h2>\n`;
  html += `    <ol class="dc-checklist">\n`;
  itens.forEach((item, index) => {
    const id = `chk-f5-${index + 1}`;
    html += `      <li class="dc-checklist__item">\n`;
    html += `        <input id="${id}" type="checkbox" />\n`;
    html += `        <label for="${id}">${escapeHtml(item)}</label>\n`;
    html += `      </li>\n`;
  });
  html += `    </ol>\n`;
  html += `    <aside class="dc-nota dc-pad-04" role="note">\n`;
  html += `      <p>Itens de apreciação derivados do briefing/estado do material — não substituem decisão pastoral. Ação principal permanece hipótese (H2).</p>\n`;
  html += `    </aside>\n`;
  html += `  </div>\n</section>\n`;
  return html;
}

/** Literal JS alinhado ao Prettier (chaves sem aspas + trailing commas). */
function toJsLiteral(value, indent = 0) {
  const pad = "  ".repeat(indent);
  const padIn = "  ".repeat(indent + 1);
  if (value === null) return "null";
  if (typeof value === "boolean" || typeof value === "number") {
    return String(value);
  }
  if (typeof value === "string") return JSON.stringify(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((item) => `${padIn}${toJsLiteral(item, indent + 1)},`);
    return `[\n${items.join("\n")}\n${pad}]`;
  }
  if (typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length === 0) return "{}";
    const lines = keys.map((key) => {
      const safeKey = /^[A-Za-z_$][\w$]*$/.test(key) ? key : JSON.stringify(key);
      return `${padIn}${safeKey}: ${toJsLiteral(value[key], indent + 1)},`;
    });
    return `{\n${lines.join("\n")}\n${pad}}`;
  }
  throw new Error(`toJsLiteral: tipo não suportado (${typeof value})`);
}

function renderConfigJs() {
  return `/**
 * GERADO a partir de ferramentas/institucional.js — não editar à mão.
 */
window.SITE_CONFIG = ${toJsLiteral(institucional)};
`;
}

function renderDadosLicao1(itens) {
  return `/**
 * GERADO a partir de assets/img/licao1/manifest.json — não editar à mão.
 */
window.DADOS_LICAO1 = ${toJsLiteral(itens)};
`;
}

function lerEstadoCanonico(programaRoot) {
  const estadoPath = path.join(
    programaRoot,
    "docs",
    "metodo",
    "fase-5",
    "estado-prototipo-canonico.json"
  );
  if (!fs.existsSync(estadoPath)) {
    return {
      status: "candidato",
      prototipoCanonico: null,
      fase6: "bloqueada",
      autorizacaoFase6: false,
    };
  }
  return JSON.parse(lerUtf8(estadoPath));
}

function renderShell(corpo, indiceItems, estado = {}) {
  const navLinks = indiceItems
    .map(
      (item) =>
        `          <li><a class="dc-link" href="#${item.id}">${escapeHtml(item.label)}</a></li>`
    )
    .join("\n");
  const canonic = Boolean(estado.prototipoCanonico);
  const fase6 = estado.fase6 || "bloqueada";
  const selo = canonic
    ? `Protótipo canônico Fase 5 — referência de implementação — Fase 6 ${fase6}`
    : `Candidato Fase 5 — não canônico — Fase 6 ${fase6}`;
  const descricao = canonic
    ? "Protótipo canônico Fase 5 — Discipulando a Caserna. Referência de implementação. Não produção pública."
    : "Candidato Fase 5 — Discipulando a Caserna. Não canônico. Não produção.";
  const titulo = canonic
    ? "Discipulando a Caserna — protótipo canônico Fase 5"
    : "Discipulando a Caserna — candidato Fase 5 v1";

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <meta name="description" content="${escapeHtml(descricao)}" />
  <title>${escapeHtml(titulo)}</title>
  <link rel="stylesheet" href="../../design-system/tokens/tokens.css" />
  <link rel="stylesheet" href="css/prototipo.css" />
</head>
<body>
  <a class="dc-skip" href="#conteudo">Ir para o conteúdo</a>
  <div class="dc-chrome" data-dc-chrome>
    <div class="dc-progresso" id="progresso-leitura" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Progresso de leitura" data-dc-progresso>
      <div class="dc-progresso__barra"></div>
    </div>
  </div>
  <details class="dc-sumario-pe" id="sumario-pe">
    <summary class="dc-acao dc-sumario-controle" id="sumario-btn">Sumário</summary>
    <nav class="dc-indice" id="sumario-painel" aria-label="Sumário do prospecto">
      <ol>
${navLinks}
      </ol>
    </nav>
  </details>
  <main id="conteudo">
${corpo}
  </main>
  <footer class="dc-pad-07" id="rodape">
    <div class="dc-medida">
      <p class="dc-selo">${escapeHtml(selo)}</p>
      <p>Discipulando a Caserna · ${escapeHtml(institucional.instituicao)}</p>
      <p class="dc-nota">Conteúdo gerado das fontes canônicas do programa. O <code>index.html</code> inteiro é um artefato gerado. Canonização ≠ homologação pastoral nem publicação.</p>
    </div>
  </footer>
  <script src="js/config.js"></script>
  <script src="js/dados/licao1.js"></script>
  <script src="js/folheador.js"></script>
  <script src="js/prototipo.js"></script>
</body>
</html>
`;
}

function validarManifesto(programaRoot) {
  const manifestoPath = path.join(
    programaRoot,
    "assets",
    "img",
    "licao1",
    "manifest.json"
  );
  const manifesto = JSON.parse(lerUtf8(manifestoPath));
  if (!Array.isArray(manifesto)) {
    throw new Error("Manifesto da Lição 1 deve ser um array");
  }

  const contagens = { aluno: 0, instrutor: 0 };
  const paginas = { aluno: new Set(), instrutor: new Set() };
  for (const item of manifesto) {
    if (!Object.prototype.hasOwnProperty.call(contagens, item.edicao)) {
      throw new Error(`Edição inválida no manifesto da Lição 1: ${item.edicao}`);
    }
    contagens[item.edicao] += 1;
    paginas[item.edicao].add(item.pagina);
    for (const campo of ["arquivo", "arquivo_sm"]) {
      if (!item[campo] || !fs.existsSync(path.join(programaRoot, item[campo]))) {
        throw new Error(`Asset ausente no manifesto da Lição 1: ${item[campo] || campo}`);
      }
    }
    if (!Number.isInteger(item.largura) || !Number.isInteger(item.altura)) {
      throw new Error(`Dimensões inválidas no manifesto: ${item.arquivo}`);
    }
  }

  if (contagens.aluno !== 7 || contagens.instrutor !== 9) {
    throw new Error(
      `Manifesto da Lição 1 deve conter 7 páginas de aluno e 9 de instrutor; encontrado ${contagens.aluno}+${contagens.instrutor}`
    );
  }
  for (const [edicao, total] of [
    ["aluno", 7],
    ["instrutor", 9],
  ]) {
    for (let pagina = 1; pagina <= total; pagina += 1) {
      if (!paginas[edicao].has(pagina)) {
        throw new Error(`Página ${pagina} da edição ${edicao} ausente no manifesto`);
      }
    }
  }

  return manifesto
    .map((item) => ({
      edicao: item.edicao,
      pagina: item.pagina,
      arquivo: `../../${item.arquivo.replace(/\\/g, "/")}`,
      largura: item.largura,
      altura: item.altura,
      arquivo_sm: `../../${item.arquivo_sm.replace(/\\/g, "/")}`,
    }))
    .sort((a, b) => {
      if (a.edicao === b.edicao) return a.pagina - b.pagina;
      return a.edicao === "aluno" ? -1 : 1;
    });
}

function buildPrototype({
  repositoryRoot,
  outputDir,
  writeTelemetry = false,
  mode = "canonical",
} = {}) {
  const repoRoot = path.resolve(repositoryRoot || repositoryRootPadrao);
  const programaRoot = path.join(repoRoot, "programas", "discipulando-a-caserna");
  const canonicalOutput = path.join(programaRoot, "prototipos", "prospecto-fase-5-v1");
  const destino = path.resolve(outputDir || canonicalOutput);
  if (destino !== path.resolve(canonicalOutput) && mode !== "stale" && mode !== "temp") {
    throw new Error(
      `outputDir fora do caminho canônico; use mode "stale" ou "temp": ${destino}`
    );
  }

  const inicio = Date.now();
  const parcial = path.join(destino, "parcial");
  const paginasLicao1 = validarManifesto(programaRoot);
  const modulos = JSON.parse(
    lerUtf8(path.join(programaRoot, "conteudo", "modulos.json"))
  ).modulos;
  const licoes = JSON.parse(
    lerUtf8(path.join(programaRoot, "conteudo", "matriz-curricular.json"))
  ).licoes;
  const matrizHtml = renderMatriz(modulos, licoes);
  escreverUtf8(path.join(parcial, "matriz.html"), matrizHtml);
  escreverUtf8(path.join(destino, "js", "config.js"), renderConfigJs());
  escreverUtf8(
    path.join(destino, "js", "dados", "licao1.js"),
    renderDadosLicao1(paginasLicao1)
  );

  const indice = [];
  const blocosMovimento = [];
  const mdCache = new Map();
  let quoteCount = 0;

  function mapaDe(arquivo) {
    if (!mdCache.has(arquivo)) {
      mdCache.set(
        arquivo,
        dividirSecoes(lerUtf8(path.join(programaRoot, arquivo)), {
          file: arquivo,
        })
      );
    }
    return mdCache.get(arquivo);
  }

  const porMovimento = new Map();
  for (const fonte of FONTES) {
    if (!porMovimento.has(fonte.movimento)) {
      porMovimento.set(fonte.movimento, {
        rotulo: fonte.rotulo,
        secoes: [],
        arquivo: fonte.arquivo,
      });
    }
    porMovimento.get(fonte.movimento).secoes.push(...fonte.secoes);
  }

  for (const [movimentoId, bucket] of porMovimento) {
    const mapa = mapaDe(bucket.arquivo);
    let movimentoHtml = `<div class="dc-movimento" id="movimento-${movimentoId}" data-movimento="${movimentoId}">\n`;
    movimentoHtml += `  <p class="dc-movimento__rotulo">Movimento ${bucket.rotulo}</p>\n`;
    indice.push({
      id: `movimento-${movimentoId}`,
      label: `Movimento ${bucket.rotulo}`,
    });

    for (const numero of bucket.secoes) {
      const meta = mapa.get(numero);
      if (!meta) throw new Error(`Seção ${numero} ausente em ${bucket.arquivo}`);
      let fragmento = renderSecao(numero, meta, movimentoId, { paginasLicao1 });
      quoteCount += fragmento.quotes.length;
      if (fragmento.html.includes("{{MATRIZ_CURRICULAR}}")) {
        fragmento = {
          ...fragmento,
          html: fragmento.html.replace("{{MATRIZ_CURRICULAR}}", matrizHtml),
        };
      }
      escreverUtf8(path.join(parcial, `secao-${numero}.html`), fragmento.html);
      movimentoHtml += fragmento.html;
      indice.push({
        id: `secao-${numero}`,
        label: `Seção ${numero} — ${fragmento.titulo}`,
      });
    }
    movimentoHtml += `</div>\n`;
    blocosMovimento.push(movimentoHtml);
    escreverUtf8(path.join(parcial, `movimento-${movimentoId}.html`), movimentoHtml);
  }

  let corpo = blocosMovimento.join("\n");
  const checklist = renderChecklistPedido();
  escreverUtf8(path.join(parcial, "checklist.html"), checklist);
  corpo += checklist;
  indice.push({ id: "checklist-apreciacao", label: "Checklist de apreciação" });
  indice.push({ id: "rodape", label: "Encerramento" });
  const estado = lerEstadoCanonico(programaRoot);
  escreverUtf8(path.join(destino, "index.html"), renderShell(corpo, indice, estado));

  const relatorio = {
    candidato: "prototipos/prospecto-fase-5-v1/",
    canonic: Boolean(estado.prototipoCanonico),
    fase6: estado.fase6 || "bloqueada",
    quotes: quoteCount,
    secoes: [...porMovimento.values()].reduce(
      (total, bucket) => total + bucket.secoes.length,
      0
    ),
    contrato: "index-inteiro-gerado",
    parser: "parse-md-blocos",
    folheador: { spc: "SPC-F5-01", aluno: 7, instrutor: 9 },
    contextos: CONTEXTOS_SECAO,
  };
  escreverUtf8(path.join(parcial, "relatorio.json"), JSON.stringify(relatorio, null, 2));

  if (writeTelemetry) {
    escreverUtf8(
      path.join(parcial, "relatorio-telemetry.local.json"),
      JSON.stringify(
        {
          geradoEm: new Date().toISOString(),
          ms: Date.now() - inicio,
        },
        null,
        2
      )
    );
  }

  return relatorio;
}

function main() {
  const inicio = Date.now();
  const relatorio = buildPrototype({
    repositoryRoot: repositoryRootPadrao,
    outputDir: destRoot,
    writeTelemetry: true,
    mode: "canonical",
  });
  console.log(
    `OK generate:discipulando:prototipo-fase-5 — ${relatorio.secoes} seções, ${relatorio.quotes} quotes, ${Date.now() - inicio}ms`
  );
  return relatorio;
}

if (require.main === module) {
  try {
    main();
  } catch (erro) {
    console.error(String(erro && erro.stack ? erro.stack : erro));
    process.exitCode = 1;
  }
}

module.exports = {
  buildPrototype,
  main,
  CONTEXTOS_SECAO,
  renderShell,
  renderMatriz,
  renderSecao,
  destRoot,
  parcialDir,
};
