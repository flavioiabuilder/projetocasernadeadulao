/**
 * Gera fragmentos HTML a partir de conteudo/*.md (pipeline editorial paralelo).
 * Não substitui index.html de produção até go/no-go humano (ADR-004 / ADR-005).
 *
 * Uso: node ferramentas/gerar-editorial.js
 * Saída: _gerado/editorial/secao-N.html + relatorio.json
 */
"use strict";

const fs = require("fs");
const path = require("path");

const raiz = path.join(__dirname, "..");
const saidaDir = path.join(raiz, "_gerado", "editorial");

const FONTES = [
  {
    arquivo: "conteudo/secoes-01-04-a-necessidade.md",
    movimento: 1,
    secoes: [1, 2, 3, 4],
  },
  {
    arquivo: "conteudo/secoes-05-07-a-resposta.md",
    movimento: 2,
    secoes: [5, 6, 7],
  },
  {
    arquivo: "conteudo/secoes-08-11-o-programa.md",
    movimento: 3,
    secoes: [8, 9, 10, 11],
  },
  {
    arquivo: "conteudo/secoes-12-15-a-prova-e-o-pedido.md",
    movimento: 4,
    secoes: [12, 13, 14, 15],
  },
];

function lerUtf8(caminho) {
  return fs.readFileSync(caminho, { encoding: "utf8" });
}

function escreverUtf8(caminho, conteudo) {
  fs.mkdirSync(path.dirname(caminho), { recursive: true });
  const saida = conteudo.endsWith("\n") ? conteudo : `${conteudo}\n`;
  fs.writeFileSync(caminho, saida, { encoding: "utf8" });
}

function normalizar(texto) {
  return texto
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(texto) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function mdInline(texto) {
  const escaped = escapeHtml(texto);
  return escaped.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

/**
 * Divide o MD em blocos por "## Seção N".
 */
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

function renderFragmento(num, meta) {
  const sobrelinha = extrairMeta(meta.corpo, "Sobrelinha");
  const titulo = extrairMeta(meta.corpo, "Título") || meta.tituloLinha.replace(/`/g, "");
  const subtitulo = extrairMeta(meta.corpo, "Subtítulo");
  const selo = extrairMeta(meta.corpo, "Selo");
  const quotes = extrairBlockquotes(meta.corpo);
  const tabela = extrairTabela(meta.corpo);

  const classes =
    num === 1
      ? "secao secao--abertura"
      : num % 2 === 0
        ? "secao secao--papel"
        : "secao secao--navy";

  const heading =
    num === 1
      ? `<h1 class="abertura__titulo" id="titulo-${num}">${escapeHtml(titulo)}</h1>`
      : `<h3 class="secao__titulo" id="titulo-${num}">${escapeHtml(titulo)}</h3>`;

  let html = `<!-- GERADO: secao-${num} — não editar; fonte conteudo/*.md -->\n`;
  html += `<section class="${classes}" id="secao-${num}" aria-labelledby="titulo-${num}" data-origem="gerar-editorial">\n`;
  html += `  <div class="container" data-revelar>\n`;
  if (sobrelinha) {
    html += `    <p class="sobrelinha">${escapeHtml(sobrelinha)}</p>\n`;
  }
  html += `    ${heading}\n`;
  if (subtitulo) {
    html += `    <p class="secao__subtitulo">${escapeHtml(subtitulo)}</p>\n`;
  }
  html += `    <div class="prosa">\n`;
  for (const q of quotes) {
    html += `      <p>${mdInline(q)}</p>\n`;
  }
  html += `    </div>\n`;
  if (tabela) {
    html += `    <div class="tabela-scroll" role="region" aria-label="Comparativo">\n`;
    html += `      <table class="tabela-editorial">\n        <thead><tr>`;
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
  }
  if (selo) {
    html += `    <p class="selo"><span class="selo__texto">${escapeHtml(selo)}</span></p>\n`;
  }
  html += `  </div>\n</section>\n`;
  return {
    html,
    quotes,
    titulo,
    sobrelinha,
  };
}

function cobrirNoIndex(quotes, indexNorm) {
  let presentes = 0;
  const ausentes = [];
  for (const q of quotes) {
    const n = normalizar(q);
    if (!n) continue;
    if (indexNorm.includes(n)) {
      presentes += 1;
    } else {
      // tolerar trecho inicial longo
      const amostra = n.slice(0, Math.min(80, n.length));
      if (amostra.length >= 40 && indexNorm.includes(amostra)) {
        presentes += 1;
      } else {
        ausentes.push(amostra);
      }
    }
  }
  return { presentes, total: quotes.length, ausentes };
}

function main() {
  const t0 = Date.now();
  const indexHtml = lerUtf8(path.join(raiz, "index.html"));
  const indexNorm = normalizar(indexHtml);
  const relatorio = {
    geradoEm: new Date().toISOString(),
    saida: "_gerado/editorial/",
    substituiIndex: false,
    movimentos: [],
    totais: {
      secoes: 0,
      quotes: 0,
      quotesPresentesNoIndex: 0,
      bytesGerados: 0,
    },
  };

  fs.mkdirSync(saidaDir, { recursive: true });

  for (const fonte of FONTES) {
    const md = lerUtf8(path.join(raiz, fonte.arquivo));
    const mapa = dividirSecoes(md);
    const movRel = {
      arquivo: fonte.arquivo,
      movimento: fonte.movimento,
      secoes: [],
    };

    for (const num of fonte.secoes) {
      const meta = mapa.get(num);
      if (!meta) {
        movRel.secoes.push({ num, erro: "seção ausente no MD" });
        continue;
      }
      const frag = renderFragmento(num, meta);
      const dest = path.join(saidaDir, `secao-${num}.html`);
      escreverUtf8(dest, frag.html);
      const cobertura = cobrirNoIndex(frag.quotes, indexNorm);
      relatorio.totais.secoes += 1;
      relatorio.totais.quotes += cobertura.total;
      relatorio.totais.quotesPresentesNoIndex += cobertura.presentes;
      relatorio.totais.bytesGerados += Buffer.byteLength(frag.html, "utf8");
      movRel.secoes.push({
        num,
        titulo: frag.titulo,
        arquivo: `_gerado/editorial/secao-${num}.html`,
        quotes: cobertura.total,
        presentesNoIndex: cobertura.presentes,
        ausentesAmostra: cobertura.ausentes.slice(0, 3),
      });
    }
    relatorio.movimentos.push(movRel);
  }

  relatorio.ms = Date.now() - t0;
  const taxa =
    relatorio.totais.quotes === 0
      ? 0
      : relatorio.totais.quotesPresentesNoIndex / relatorio.totais.quotes;
  relatorio.taxaCoberturaQuotes = Number(taxa.toFixed(4));
  relatorio.goNoGo = {
    recomendacao:
      taxa >= 0.85
        ? "GO_CONDICIONAL — cobertura alta; manter index.html canônico até review visual/a11y por movimento"
        : "NO_GO — cobertura insuficiente para substituir produção",
    criterio:
      "Não substituir index.html sem paridade visual + e2e + aceite humano (ADR-005)",
  };

  escreverUtf8(path.join(saidaDir, "relatorio.json"), JSON.stringify(relatorio, null, 2));

  console.log(
    `OK generate:editorial — ${relatorio.totais.secoes} seções, ` +
      `${relatorio.totais.quotesPresentesNoIndex}/${relatorio.totais.quotes} quotes no index ` +
      `(${Math.round(taxa * 100)}%), ${relatorio.ms}ms → _gerado/editorial/`
  );
  console.log(`Recomendação: ${relatorio.goNoGo.recomendacao}`);
  return relatorio;
}

if (require.main === module) {
  main();
}

module.exports = {
  main,
  normalizar,
  dividirSecoes,
  extrairBlockquotes,
  FONTES,
  saidaDir,
};
