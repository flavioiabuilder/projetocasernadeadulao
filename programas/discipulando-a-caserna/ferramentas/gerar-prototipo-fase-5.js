/**
 * Gera o candidato Fase 5 a partir de conteudo/ canônico.
 * Saída versionada em prototipos/prospecto-fase-5-v1/
 * NÃO editar parcial/ nem regiões marcadas GERADO à mão.
 *
 * Uso: node ferramentas/gerar-prototipo-fase-5.js
 */
"use strict";

const fs = require("fs");
const path = require("path");

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

const MARK_BEGIN = "<!-- F5-GERADO:BEGIN -->";
const MARK_END = "<!-- F5-GERADO:END -->";

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

function dividirSecoes(md) {
  const partes = md.split(/^## Seção (\d+)\s+[—–-]\s+(.+)$/m);
  const mapa = new Map();
  for (let i = 1; i < partes.length; i += 3) {
    const num = Number(partes[i], 10);
    const tituloLinha = partes[i + 1].trim();
    const corpo = partes[i + 2] || "";
    mapa.set(num, { tituloLinha, corpo });
  }
  return mapa;
}

function extrairMeta(corpo, chave) {
  const re = new RegExp(`\\*\\*${chave}:\\*\\*\\s*\`([^\`]+)\``, "i");
  const m = corpo.match(re);
  return m ? m[1].trim() : null;
}

function extrairBlockquotes(corpo) {
  const linhas = corpo.split(/\r?\n/);
  const quotes = [];
  let atual = [];
  for (const linha of linhas) {
    if (linha.startsWith(">")) {
      atual.push(linha.replace(/^>\s?/, ""));
    } else if (atual.length) {
      quotes.push(atual.join(" ").replace(/\s+/g, " ").trim());
      atual = [];
    }
  }
  if (atual.length) {
    quotes.push(atual.join(" ").replace(/\s+/g, " ").trim());
  }
  return quotes.filter(Boolean);
}

function extrairTabela(corpo) {
  const linhas = corpo.split(/\r?\n/).filter((l) => l.trim().startsWith("|"));
  if (linhas.length < 3) return null;
  const cells = (linha) =>
    linha
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());
  const header = cells(linhas[0]);
  const rows = linhas.slice(2).map(cells);
  return { header, rows };
}

function extrairCitacaoBiblica(corpo) {
  const m = corpo.match(
    />\s*"([^"]+)"\s*\n>\s*—\s*([^\n]+)/
  );
  if (!m) return null;
  return { texto: m[1].trim(), ref: m[2].trim() };
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

function renderTabelaDados(tabela, label) {
  if (!tabela) return "";
  let html = `    <div class="dc-tabela-wrap" role="region" aria-label="${escapeHtml(label)}">\n`;
  html += `      <table class="dc-tabela">\n        <thead><tr>`;
  for (const h of tabela.header) {
    html += `<th scope="col">${mdInline(h)}</th>`;
  }
  html += `</tr></thead>\n        <tbody>\n`;
  for (const row of tabela.rows) {
    html += "          <tr>";
    for (const cell of row) {
      html += `<td>${mdInline(cell)}</td>`;
    }
    html += "</tr>\n";
  }
  html += `        </tbody>\n      </table>\n    </div>\n`;
  return html;
}

function renderSecao(num, meta, movimentoId) {
  const sobrelinha = extrairMeta(meta.corpo, "Sobrelinha");
  const titulo = extrairMeta(meta.corpo, "Título") || meta.tituloLinha.replace(/`/g, "");
  const subtitulo = extrairMeta(meta.corpo, "Subtítulo");
  const selo = extrairMeta(meta.corpo, "Selo");
  const quotes = extrairBlockquotes(meta.corpo);
  const tabela = extrairTabela(meta.corpo);
  const citBib = num === 4 ? extrairCitacaoBiblica(meta.corpo) : null;

  const isAbertura = num === 1;
  const isUmbral = num === 4;
  const headingId = `titulo-secao-${num}`;
  const headingTag = isAbertura ? "h1" : "h2";

  let html = `<!-- GERADO: secao-${num} — fonte conteudo/*.md — não editar -->\n`;
  html += `<section class="dc-secao${isUmbral ? " dc-umbral" : ""}${isAbertura ? " dc-abertura" : ""}" id="secao-${num}" aria-labelledby="${headingId}" data-movimento="${movimentoId}" data-origem="gerar-prototipo-fase-5">\n`;
  html += `  <div class="dc-medida">\n`;

  if (isAbertura) {
    html += `    <header class="dc-pad-01">\n`;
    if (sobrelinha) {
      html += `      <p class="dc-sobrelinha">${escapeHtml(sobrelinha)}</p>\n`;
    }
    html += `      <${headingTag} class="dc-titulo-pagina" id="${headingId}">${escapeHtml(titulo)}</${headingTag}>\n`;
    if (subtitulo) {
      html += `      <p class="dc-subtitulo">${escapeHtml(subtitulo)}</p>\n`;
    }
    if (selo) {
      html += `      <p class="dc-selo">${escapeHtml(selo)}</p>\n`;
    }
    html += `    </header>\n`;
  } else {
    html += `    <header class="dc-pad-02">\n`;
    html += `      <p class="dc-folio">Seção ${num}</p>\n`;
    if (sobrelinha) {
      html += `      <p class="dc-sobrelinha">${escapeHtml(sobrelinha)}</p>\n`;
    }
    html += `      <${headingTag} class="dc-titulo-secao" id="${headingId}">${escapeHtml(titulo)}</${headingTag}>\n`;
    if (subtitulo) {
      html += `      <p class="dc-subtitulo">${escapeHtml(subtitulo)}</p>\n`;
    }
    html += `    </header>\n`;
  }

  if (citBib) {
    html += `    <blockquote class="dc-citacao-biblica">\n`;
    html += `      <p>${escapeHtml(citBib.texto)}</p>\n`;
    html += `      <cite>${escapeHtml(citBib.ref)}</cite>\n`;
    html += `    </blockquote>\n`;
  }

  html += `    <div class="dc-prosa">\n`;
  for (const q of quotes) {
    if (citBib && q.includes(citBib.texto.slice(0, 40))) continue;
    html += `      <p>${mdInline(q)}</p>\n`;
  }
  html += `    </div>\n`;

  if (tabela) {
    if (num === 3 && tabela.header.length >= 2) {
      html += renderComparacao(tabela);
    } else {
      html += renderTabelaDados(tabela, `Dados da seção ${num}`);
    }
  }

  if (num === 9) {
    html += `    <!-- MATRIZ: injetada após módulos/lições -->\n`;
    html += `    {{MATRIZ_CURRICULAR}}\n`;
  }

  if (num === 11 || num === 10) {
    html += `    <aside class="dc-nota dc-pad-04" role="note">\n`;
    html += `      <p><strong>Lacuna declarada.</strong> Anatomia completa da lição, formato detalhado do encontro e diferenças plenas entre edições aluno/instrutor permanecem fora do material canônico disponível — não inventadas neste protótipo.</p>\n`;
    html += `    </aside>\n`;
  }

  if (selo && !isAbertura) {
    html += `    <p class="dc-selo">${escapeHtml(selo)}</p>\n`;
  }

  if (num === 15) {
    html += `    <div class="dc-pad-06">\n`;
    html += `      <p class="dc-assinatura">Obr. Flávio Alves da Costa</p>\n`;
    html += `      <p class="dc-meta">Projeto Caserna de Adulão · Fortaleza-CE</p>\n`;
    html += `      <p class="dc-nota">Pedido pastoral nominal e apreciação: Movimento V — não há CTA comercial, inscrição ou doação.</p>\n`;
    html += `    </div>\n`;
  }

  html += `  </div>\n</section>\n`;
  return { html, titulo, sobrelinha, quotes };
}

function renderMatriz(modulos, licoes) {
  let html = `<!-- GERADO: matriz — conteudo/modulos.json + matriz-curricular.json -->\n`;
  html += `<div class="dc-pad-05" id="matriz-curricular">\n`;
  html += `  <h2 class="dc-titulo-secao" id="titulo-matriz">Visão curricular (4 × 12)</h2>\n`;
  html += `  <p class="dc-nota">Arquitetura formativa — não métrica comercial. Campos nulos omitidos.</p>\n`;
  html += `  <div class="dc-abas" data-dc-abas>\n`;
  html += `    <div class="dc-abas__tablist" role="tablist" aria-label="Módulos do currículo">\n`;
  modulos.forEach((mod, i) => {
    const selected = i === 0;
    html += `      <button type="button" class="dc-abas__tab" role="tab" id="tab-mod-${mod.numero}" aria-controls="panel-mod-${mod.numero}" aria-selected="${selected}" tabindex="${selected ? 0 : -1}">Módulo ${mod.numero}</button>\n`;
  });
  html += `    </div>\n`;
  modulos.forEach((mod, i) => {
    const estadoClass =
      mod.estado === "produzido"
        ? "dc-estado--produzido"
        : mod.estado === "planejado"
          ? "dc-estado--planejado"
          : "dc-estado--pendente";
    html += `    <div class="dc-abas__panel" role="tabpanel" id="panel-mod-${mod.numero}" aria-labelledby="tab-mod-${mod.numero}"${i === 0 ? "" : " hidden"}>\n`;
    html += `      <article class="dc-curriculo">\n`;
    html += `        <h4>${escapeHtml(mod.nome)}</h4>\n`;
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
    <button type="button" class="dc-acao dc-sumario-controle" id="sumario-btn" aria-expanded="false" aria-controls="sumario-painel">
      Sumário
    </button>
    <div class="dc-progresso" id="progresso-leitura" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Progresso de leitura" data-dc-progresso>
      <div class="dc-progresso__barra"></div>
    </div>
  </div>
  <nav class="dc-indice" id="sumario-painel" hidden aria-label="Sumário do prospecto">
    <ol>
${navLinks}
    </ol>
  </nav>
  <main id="conteudo">
${MARK_BEGIN}
${corpo}
${MARK_END}
  </main>
  <footer class="dc-pad-07" id="rodape">
    <div class="dc-medida">
      <p class="dc-selo">Candidato Fase 5 — não canônico — Fase 6 bloqueada</p>
      <p>Discipulando a Caserna · Projeto Caserna de Adulão</p>
      <p>casernadeadulao@gmail.com · Fortaleza-CE</p>
      <p class="dc-nota">Conteúdo gerado de <code>conteudo/</code>. Protótipos históricos não foram alterados.</p>
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

  const indice = [];
  const blocosMovimento = [];
  let quoteCount = 0;

  // Cache MD por arquivo
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
        movHtml += `  <!-- ERRO: seção ${num} ausente -->\n`;
        continue;
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
    geradoEm: new Date().toISOString(),
    candidato: "prototipos/prospecto-fase-5-v1/",
    canonic: false,
    fase6: "bloqueada",
    quotes: quoteCount,
    secoes: [...porMovimento.values()].reduce((n, b) => n + b.secoes.length, 0),
    ms: Date.now() - t0,
  };
  escreverUtf8(path.join(parcialDir, "relatorio.json"), JSON.stringify(relatorio, null, 2));

  console.log(
    `OK generate:discipulando:prototipo-fase-5 — ${relatorio.secoes} seções, ${quoteCount} quotes, ${relatorio.ms}ms`
  );
  return relatorio;
}

if (require.main === module) {
  main();
}

module.exports = { main, destRoot, parcialDir };
