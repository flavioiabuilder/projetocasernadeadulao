/**
 * Gera o candidato Fase 5 a partir de conteudo/ canônico.
 * Contrato: index.html inteiro é artefato gerado (template neste arquivo).
 * Uso: node ferramentas/gerar-prototipo-fase-5.js
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

const raiz = path.join(__dirname, "..");
const destRoot = path.join(raiz, "prototipos", "prospecto-fase-5-v1");
const parcialDir = path.join(destRoot, "parcial");

const FONTES = [
  { arquivo: "conteudo/secoes-01-04-a-necessidade.md", movimento: 1, rotulo: "I — A necessidade", secoes: [1, 2, 3, 4] },
  { arquivo: "conteudo/secoes-05-07-a-resposta.md", movimento: 2, rotulo: "II — A resposta", secoes: [5, 6, 7] },
  { arquivo: "conteudo/secoes-08-11-o-programa.md", movimento: 3, rotulo: "III — O programa", secoes: [8, 9, 10, 11] },
  { arquivo: "conteudo/secoes-12-15-a-prova-e-o-pedido.md", movimento: 4, rotulo: "IV — A prova", secoes: [12, 13] },
  { arquivo: "conteudo/secoes-12-15-a-prova-e-o-pedido.md", movimento: 5, rotulo: "V — O pedido", secoes: [14, 15] },
];

function lerUtf8(caminho) {
  return fs.readFileSync(caminho, { encoding: "utf8" });
}

function escreverUtf8(caminho, conteudo) {
  fs.mkdirSync(path.dirname(caminho), { recursive: true });
  const saida = conteudo.endsWith("\n") ? conteudo : `${conteudo}\n`;
  fs.writeFileSync(caminho, saida, { encoding: "utf8" });
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
  let html = `    <div class="dc-comparacao">\n`;
  const colA = tabela.header[0];
  const colB = tabela.header[1];
  html += `      <div class="dc-comparacao__lado">\n`;
  html += `        <h3 class="dc-comparacao__titulo">${mdInline(colA)}</h3>\n        <ul class="dc-lista-editorial">\n`;
  for (const row of tabela.rows) {
    html += `          <li>${mdInline(row[0] || "")}</li>\n`;
  }
  html += `        </ul>\n      </div>\n`;
  html += `      <div class="dc-comparacao__lado">\n`;
  html += `        <h3 class="dc-comparacao__titulo">${mdInline(colB)}</h3>\n        <ul class="dc-lista-editorial">\n`;
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
  tabela.header.forEach((h, idx) => {
    const texto = h || (idx === 0 && firstHeaderFallback) || "";
    html += `<th scope="col">${mdInline(texto)}</th>`;
  });
  html += `</tr></thead>\n        <tbody>\n`;
  for (const row of tabela.rows) {
    html += "          <tr>";
    row.forEach((cell, idx) => {
      if (rowScopeFirst && idx === 0) {
        html += `<th scope="row">${mdInline(cell)}</th>`;
      } else {
        html += `<td>${mdInline(cell)}</td>`;
      }
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
    const num = row[0] || "";
    const pedido = row[1] || "";
    const obs = row[2] || "";
    html += `      <li value="${escapeHtml(num)}">\n`;
    html += `        <p class="dc-lista-pedidos__pedido">${mdInline(pedido)}</p>\n`;
    if (obs) html += `        <p class="dc-lista-pedidos__obs">${mdInline(obs)}</p>\n`;
    html += `      </li>\n`;
  }
  html += `    </ol>\n`;
  return html;
}

function renderLista(bloco) {
  const tag = bloco.type === "ol" ? "ol" : "ul";
  let html = `    <${tag} class="dc-lista-editorial">\n`;
  for (const item of bloco.items) {
    html += `      <li>${mdInline(item)}</li>\n`;
  }
  html += `    </${tag}>\n`;
  return html;
}

function renderCode(bloco) {
  let html = `    <pre class="dc-assinatura-bloco"><code>`;
  html += escapeHtml(bloco.value);
  html += `</code></pre>\n`;
  return html;
}

function isCitacaoFinal(text) {
  return /Fp\s*1\.6/i.test(text) || /começou boa obra/i.test(text);
}

function renderCorpoBlocos(num, blocos, citBib) {
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
  ]);

  for (const b of blocos) {
    if (b.type === "meta") {
      const k = String(b.chave).toLowerCase();
      if (skipMeta.has(k)) continue;
      if (k === "números de destaque" || k === "numeros de destaque") continue;
      // Rótulos editoriais sem valor (ex.: **Texto:**) não viram parágrafo vazio.
      if (!String(b.valor || "").trim()) {
        if (/^(texto|parágrafo|elemento|bloco|nota|público|camadas|números)/i.test(b.chave)) {
          continue;
        }
        html += `    <p class="dc-meta-rotulo"><strong>${escapeHtml(b.chave)}</strong></p>\n`;
        continue;
      }
      html += `    <p class="dc-meta-rotulo"><strong>${escapeHtml(b.chave)}:</strong> ${mdInline(b.valor)}</p>\n`;
      continue;
    }

    if (b.type === "heading_inline") {
      html += `    <h3 class="dc-subtitulo-bloco">${escapeHtml(b.text)}</h3>\n`;
      continue;
    }

    if (b.type === "blockquote") {
      if (citBib && b === citBib.block) continue;
      if (citBib && b.text && b.text.includes(citBib.texto.slice(0, 40))) continue;

      if (num === 15 && isCitacaoFinal(b.text)) {
        const lines = b.lines || [];
        const quoteLine = lines.find((l) => l.includes('"')) || b.text;
        const refLine = lines.find((l) => /^—/.test(l.trim()));
        html += `    <blockquote class="dc-citacao-final">\n`;
        html += `      <p>${mdInline(quoteLine.replace(/^"|"$/g, "").replace(/"/g, ""))}</p>\n`;
        if (refLine) html += `      <cite>${escapeHtml(refLine.replace(/^—\s*/, ""))}</cite>\n`;
        html += `    </blockquote>\n`;
        continue;
      }

      if (num === 14 && /certificado|remição de pena/i.test(b.text)) {
        html += `    <aside class="dc-nota dc-pad-04 dc-bloco-certificado" role="note">\n`;
        html += `      <p>${mdInline(b.text)}</p>\n`;
        html += `    </aside>\n`;
        continue;
      }

      if (num === 15 && /página do Guia Mestre que continua em branco|prefácio/i.test(b.text) && /Não há prazo/i.test(b.text)) {
        html += `    <aside class="dc-convite-prefacio dc-pad-06" role="note">\n`;
        html += `      <p class="dc-selo">CONVITE</p>\n`;
        html += `      <h3 class="dc-titulo-secao">O prefácio</h3>\n`;
        html += `      <p>${mdInline(b.text)}</p>\n`;
        html += `    </aside>\n`;
        continue;
      }

      html += `    <blockquote class="dc-prosa-quote">\n`;
      html += `      <p>${mdInline(b.text)}</p>\n`;
      html += `    </blockquote>\n`;
      continue;
    }

    if (b.type === "table") {
      tableIndex += 1;
      if (num === 3 && tableIndex === 1 && b.header.length >= 2) {
        html += renderComparacao(b);
      } else if (num === 15 && tableIndex === 1) {
        html += renderPedidosComoLista(b);
      } else {
        html += renderTabelaDados(b, `Dados da seção ${num} (tabela ${tableIndex})`);
      }
      continue;
    }

    if (b.type === "ul" || b.type === "ol") {
      if (num === 14 && b.items.some((it) => /ranking|constrangido|comunitária/i.test(it))) {
        html += `    <aside class="dc-nota dc-pad-04" role="note">\n`;
        html += `      <p class="dc-meta-rotulo"><strong>Salvaguardas das cerimônias</strong></p>\n`;
        html += renderLista(b);
        html += `    </aside>\n`;
      } else {
        html += renderLista(b);
      }
      continue;
    }

    if (b.type === "code") {
      html += renderCode(b);
      continue;
    }

    if (b.type === "paragraph") {
      if (/^Travas|^Decisões fixadas/i.test(b.text)) continue;
      html += `    <p class="dc-prosa-p">${mdInline(b.text)}</p>\n`;
    }
  }

  return html;
}

function renderSecao(num, meta, movimentoId) {
  const blocos = meta.blocos;
  const sobrelinha = extrairMeta(blocos, "Sobrelinha");
  const titulo = extrairMeta(blocos, "Título") || meta.tituloLinha.replace(/`/g, "");
  const subtitulo = extrairMeta(blocos, "Subtítulo");
  const selo = extrairMeta(blocos, "Selo");
  const citBib = num === 4 ? extrairCitacaoBiblica(blocos) : null;

  const isAbertura = num === 1;
  const isUmbral = num === 4;
  const headingId = `titulo-secao-${num}`;
  const headingTag = isAbertura ? "h1" : "h2";

  let html = `<!-- GERADO: secao-${num} — fonte conteudo/*.md — não editar -->\n`;
  html += `<section class="dc-secao${isUmbral ? " dc-umbral" : ""}${isAbertura ? " dc-abertura" : ""}" id="secao-${num}" aria-labelledby="${headingId}" data-movimento="${movimentoId}" data-origem="gerar-prototipo-fase-5">\n`;
  html += `  <div class="dc-medida">\n`;

  if (isAbertura) {
    html += `    <header class="dc-pad-01">\n`;
    if (sobrelinha) html += `      <p class="dc-sobrelinha">${escapeHtml(sobrelinha)}</p>\n`;
    html += `      <${headingTag} class="dc-titulo-pagina" id="${headingId}">${escapeHtml(titulo)}</${headingTag}>\n`;
    if (subtitulo) html += `      <p class="dc-subtitulo">${escapeHtml(subtitulo)}</p>\n`;
    if (selo) html += `      <p class="dc-selo">${escapeHtml(selo)}</p>\n`;
    html += `    </header>\n`;
  } else {
    html += `    <header class="dc-pad-02">\n`;
    html += `      <p class="dc-folio">Seção ${num}</p>\n`;
    if (sobrelinha) html += `      <p class="dc-sobrelinha">${escapeHtml(sobrelinha)}</p>\n`;
    html += `      <${headingTag} class="dc-titulo-secao" id="${headingId}">${escapeHtml(titulo)}</${headingTag}>\n`;
    if (subtitulo) html += `      <p class="dc-subtitulo">${escapeHtml(subtitulo)}</p>\n`;
    html += `    </header>\n`;
  }

  if (citBib) {
    html += `    <blockquote class="dc-citacao-biblica">\n`;
    html += `      <p>${escapeHtml(citBib.texto)}</p>\n`;
    html += `      <cite>${escapeHtml(citBib.ref)}</cite>\n`;
    html += `    </blockquote>\n`;
  }

  html += `    <div class="dc-prosa">\n`;
  html += renderCorpoBlocos(num, blocos, citBib);
  html += `    </div>\n`;

  if (num === 9) {
    html += `    {{MATRIZ_CURRICULAR}}\n`;
  }

  if (num === 12) {
    html += `    <aside class="dc-nota dc-pad-04" role="note" data-pendencia="F6-05">\n`;
    html += `      <p><strong>Folheador da Lição 1 — pendente de decisão humana (F6-05).</strong> O conteúdo canônico prevê amostra com alternância Aluno/Instrutor. Neste candidato não há asset autorizado nem widget inventado. Opções: amostra acessível, preview estático autorizado ou alteração editorial da copy.</p>\n`;
    html += `    </aside>\n`;
  }

  if (num === 15) {
    html += `    <aside class="dc-nota dc-pad-04" role="note" data-pendencia="F6-06">\n`;
    html += `      <p><strong>Download do dossiê de apreciação — pendente de decisão humana (F6-06).</strong> O conteúdo canônico fixa PDF público de 7 páginas. Nenhum arquivo autorizado está versionado neste repositório; link não é exposto.</p>\n`;
    html += `    </aside>\n`;
    html += `    <div class="dc-pad-06">\n`;
    html += `      <p class="dc-assinatura">${escapeHtml(institucional.autor)}</p>\n`;
    html += `      <p class="dc-meta">${escapeHtml(institucional.instituicao)} · ${escapeHtml(institucional.cidade)}</p>\n`;
    html += `      <p class="dc-meta">CNPJ ${escapeHtml(institucional.cnpj)}</p>\n`;
    html += `      <p class="dc-nota">Pedido pastoral nominal e apreciação: Movimento V — não há CTA comercial, inscrição ou doação.</p>\n`;
    html += `    </div>\n`;
  }

  if (selo && !isAbertura) {
    html += `    <p class="dc-selo">${escapeHtml(selo)}</p>\n`;
  }

  html += `  </div>\n</section>\n`;

  const quoteCount = blocos.filter((b) => b.type === "blockquote").length;
  return { html, titulo, sobrelinha, quotes: Array(quoteCount).fill("") };
}

function renderMatriz(modulos, licoes) {
  let html = `<!-- GERADO: matriz — conteudo/modulos.json + matriz-curricular.json -->\n`;
  html += `<div class="dc-pad-05" id="matriz-curricular">\n`;
  html += `  <h2 class="dc-titulo-secao" id="titulo-matriz">Visão curricular (4 × 12)</h2>\n`;
  html += `  <p class="dc-nota">Arquitetura formativa — não métrica comercial. Campos nulos omitidos. Sem JavaScript, todos os módulos permanecem legíveis.</p>\n`;
  html += `  <div class="dc-abas" data-dc-abas data-ativacao="automatica">\n`;
  html += `    <div class="dc-abas__tablist" role="tablist" aria-label="Módulos do currículo">\n`;
  modulos.forEach((mod, i) => {
    const selected = i === 0;
    html += `      <button type="button" class="dc-abas__tab" role="tab" id="tab-mod-${mod.numero}" aria-controls="panel-mod-${mod.numero}" aria-selected="${selected}" tabindex="${selected ? 0 : -1}">Módulo ${mod.numero}</button>\n`;
  });
  html += `    </div>\n`;
  modulos.forEach((mod) => {
    const estadoClass =
      mod.estado === "produzido"
        ? "dc-estado--produzido"
        : mod.estado === "planejado"
          ? "dc-estado--planejado"
          : "dc-estado--pendente";
    // Sem hidden no HTML estático — PE: JS oculta não selecionados após html.js
    html += `    <div class="dc-abas__panel" role="tabpanel" id="panel-mod-${mod.numero}" aria-labelledby="tab-mod-${mod.numero}">\n`;
    html += `      <article class="dc-curriculo">\n`;
    html += `        <h3 class="dc-curriculo__titulo">${escapeHtml(mod.nome)}</h3>\n`;
    html += `        <p>${escapeHtml(mod.subtitulo || "")}</p>\n`;
    html += `        <p><span class="dc-estado ${estadoClass}">${escapeHtml(mod.estado)}</span></p>\n`;
    if (mod.enfase) html += `        <p>${escapeHtml(mod.enfase)}</p>\n`;
    if (mod.virtude) html += `        <p>Virtude: ${escapeHtml(mod.virtude)}</p>\n`;
    if (mod.tema) html += `        <p>Tema: ${escapeHtml(mod.tema)}</p>\n`;
    if (mod.virtude == null && mod.tema == null) {
      html += `        <p class="dc-nota">Virtude/tema deste módulo: lacuna canônica (null) — omitidos sem placeholder.</p>\n`;
    }
    const doMod = licoes.filter((l) => l.modulo === mod.numero);
    html += `        <ol class="dc-lista-curricular">\n`;
    for (const lic of doMod) {
      const st = lic.produzida ? "produzido" : "planejado";
      html += `          <li class="dc-curriculo-item">\n`;
      html += `            <span class="dc-estado dc-estado--${st === "produzido" ? "produzido" : "planejado"}">${st}</span>\n`;
      html += `            <strong>Lição ${lic.numero}.</strong> ${escapeHtml(lic.titulo)}\n`;
      if (lic.textoBase) html += `            <span class="dc-meta">(${escapeHtml(lic.textoBase)})</span>\n`;
      html += `          </li>\n`;
    }
    html += `        </ol>\n`;
    html += `      </article>\n`;
    html += `    </div>\n`;
  });
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
  itens.forEach((item, i) => {
    const id = `chk-f5-${i + 1}`;
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

function renderConfigJs() {
  return `/**
 * GERADO a partir de ferramentas/institucional.js — não editar à mão.
 */
window.SITE_CONFIG = ${JSON.stringify(institucional, null, 2)};
`;
}

function renderShell(corpo, indiceItems) {
  const navLinks = indiceItems
    .map(
      (it) =>
        `          <li><a class="dc-link" href="#${it.id}">${escapeHtml(it.label)}</a></li>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <meta name="description" content="Candidato Fase 5 — Discipulando a Caserna. Não canônico. Não produção." />
  <title>Discipulando a Caserna — candidato Fase 5 v1</title>
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
      <p class="dc-selo">Candidato Fase 5 — não canônico — Fase 6 bloqueada</p>
      <p>Discipulando a Caserna · ${escapeHtml(institucional.instituicao)}</p>
      <p>${escapeHtml(institucional.email)} · ${escapeHtml(institucional.cidade)}</p>
      <p class="dc-nota">Conteúdo gerado de <code>conteudo/</code>. Contrato: <code>index.html</code> inteiro é artefato gerado. Protótipos históricos não foram alterados.</p>
    </div>
  </footer>
  <script src="js/config.js"></script>
  <script src="js/prototipo.js"></script>
</body>
</html>
`;
}

function main() {
  const t0 = Date.now();
  fs.mkdirSync(parcialDir, { recursive: true });

  const modulos = JSON.parse(lerUtf8(path.join(raiz, "conteudo", "modulos.json"))).modulos;
  const licoes = JSON.parse(lerUtf8(path.join(raiz, "conteudo", "matriz-curricular.json"))).licoes;
  const matrizHtml = renderMatriz(modulos, licoes);
  escreverUtf8(path.join(parcialDir, "matriz.html"), matrizHtml);
  escreverUtf8(path.join(destRoot, "js", "config.js"), renderConfigJs());

  const indice = [];
  const blocosMovimento = [];
  let quoteCount = 0;

  const mdCache = new Map();
  function mapaDe(arquivo) {
    if (!mdCache.has(arquivo)) {
      mdCache.set(arquivo, dividirSecoes(lerUtf8(path.join(raiz, arquivo))));
    }
    return mdCache.get(arquivo);
  }

  const porMovimento = new Map();
  for (const fonte of FONTES) {
    if (!porMovimento.has(fonte.movimento)) {
      porMovimento.set(fonte.movimento, { rotulo: fonte.rotulo, secoes: [], arquivo: fonte.arquivo });
    }
    const bucket = porMovimento.get(fonte.movimento);
    for (const num of fonte.secoes) {
      bucket.secoes.push(num);
    }
  }

  for (const [movId, bucket] of porMovimento) {
    const mapa = mapaDe(bucket.arquivo);
    let movHtml = `<div class="dc-movimento" id="movimento-${movId}" data-movimento="${movId}">\n`;
    movHtml += `  <p class="dc-movimento__rotulo">Movimento ${bucket.rotulo}</p>\n`;
    indice.push({ id: `movimento-${movId}`, label: `Movimento ${bucket.rotulo}` });

    for (const num of bucket.secoes) {
      const meta = mapa.get(num);
      if (!meta) {
        throw new Error(`Seção ${num} ausente em ${bucket.arquivo}`);
      }
      let frag = renderSecao(num, meta, movId);
      quoteCount += frag.quotes.length;
      if (frag.html.includes("{{MATRIZ_CURRICULAR}}")) {
        frag = { ...frag, html: frag.html.replace("{{MATRIZ_CURRICULAR}}", matrizHtml) };
      }
      escreverUtf8(path.join(parcialDir, `secao-${num}.html`), frag.html);
      movHtml += frag.html;
      indice.push({ id: `secao-${num}`, label: `Seção ${num} — ${frag.titulo}` });
    }
    movHtml += `</div>\n`;
    blocosMovimento.push(movHtml);
    escreverUtf8(path.join(parcialDir, `movimento-${movId}.html`), movHtml);
  }

  let corpo = blocosMovimento.join("\n");
  const checklist = renderChecklistPedido();
  escreverUtf8(path.join(parcialDir, "checklist.html"), checklist);
  corpo += checklist;
  indice.push({ id: "checklist-apreciacao", label: "Checklist de apreciação" });
  indice.push({ id: "rodape", label: "Encerramento" });

  const indexHtml = renderShell(corpo, indice);
  escreverUtf8(path.join(destRoot, "index.html"), indexHtml);

  const relatorio = {
    candidato: "prototipos/prospecto-fase-5-v1/",
    canonic: false,
    fase6: "bloqueada",
    quotes: quoteCount,
    secoes: [...porMovimento.values()].reduce((n, b) => n + b.secoes.length, 0),
    contrato: "index-inteiro-gerado",
    parser: "parse-md-blocos",
  };
  escreverUtf8(path.join(parcialDir, "relatorio.json"), JSON.stringify(relatorio, null, 2));

  const telemetry = {
    geradoEm: new Date().toISOString(),
    ms: Date.now() - t0,
  };
  escreverUtf8(path.join(parcialDir, "relatorio-telemetry.local.json"), JSON.stringify(telemetry, null, 2));

  console.log(
    `OK generate:discipulando:prototipo-fase-5 — ${relatorio.secoes} seções, ${quoteCount} quotes, ${telemetry.ms}ms`
  );
  return relatorio;
}

if (require.main === module) {
  try {
    main();
  } catch (err) {
    console.error(String(err && err.stack ? err.stack : err));
    process.exit(1);
  }
}

module.exports = { main, destRoot, parcialDir, renderShell, renderMatriz, renderSecao };
