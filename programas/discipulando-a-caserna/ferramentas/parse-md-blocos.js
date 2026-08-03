/**
 * Parser de blocos Markdown → AST leve para o candidato F5 / produção.
 * Preserva múltiplas tabelas, listas e blockquotes sem fundir estruturas.
 * Falha em entrada inválida quando strict=true.
 */
"use strict";

function isSeparatorRow(cells) {
  return cells.every((c) => /^:?-{3,}:?$/.test(c.replace(/\s/g, "")));
}

function splitCells(linha) {
  return linha
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

function isTableLine(linha) {
  const t = linha.trim();
  return t.startsWith("|") && t.includes("|", 1);
}

function isListLine(linha) {
  return /^\s*[-*+]\s+/.test(linha) || /^\s*\d+\.\s+/.test(linha);
}

function isOrderedListLine(linha) {
  return /^\s*\d+\.\s+/.test(linha);
}

function isBlockquoteLine(linha) {
  return /^>\s?/.test(linha);
}

function isMetaLine(linha) {
  return /^\*\*[^*]+:\*\*\s*/.test(linha.trim());
}

function isFenceLine(linha) {
  return /^```/.test(linha.trim());
}

/**
 * @param {string} corpo corpo de uma seção (sem o heading ## Seção N)
 * @param {{ strict?: boolean }} [opts]
 * @returns {{ type: string, [key: string]: unknown }[]}
 */
function parseBlocos(corpo, opts = {}) {
  const strict = opts.strict !== false;
  const linhas = String(corpo || "").replace(/\r\n/g, "\n").split("\n");
  const blocos = [];
  let i = 0;

  function fail(msg) {
    if (strict) {
      const err = new Error(`parse-md-blocos: ${msg}`);
      err.code = "MD_PARSE";
      throw err;
    }
  }

  while (i < linhas.length) {
    const linha = linhas[i];
    const trim = linha.trim();

    if (!trim || trim === "---") {
      i += 1;
      continue;
    }

    if (isFenceLine(linha)) {
      const fence = [];
      i += 1;
      while (i < linhas.length && !isFenceLine(linhas[i])) {
        fence.push(linhas[i]);
        i += 1;
      }
      if (i >= linhas.length) fail("code fence sem fechamento");
      i += 1;
      blocos.push({ type: "code", value: fence.join("\n") });
      continue;
    }

    if (isMetaLine(linha)) {
      const m = trim.match(/^\*\*([^*]+):\*\*\s*(.*)$/);
      if (m) {
        const chave = m[1].trim();
        let valor = m[2].trim();
        if (valor.startsWith("`") && valor.endsWith("`")) {
          valor = valor.slice(1, -1);
        }
        blocos.push({ type: "meta", chave, valor, raw: trim });
      }
      i += 1;
      continue;
    }

    if (/^\*\*[^*]+\*\*\s*$/.test(trim) && !trim.includes(":")) {
      blocos.push({ type: "heading_inline", text: trim.replace(/^\*\*|\*\*$/g, "") });
      i += 1;
      continue;
    }

    if (isBlockquoteLine(linha)) {
      const quoteLines = [];
      while (i < linhas.length && isBlockquoteLine(linhas[i])) {
        quoteLines.push(linhas[i].replace(/^>\s?/, ""));
        i += 1;
      }
      blocos.push({ type: "blockquote", lines: quoteLines, text: quoteLines.join(" ").replace(/\s+/g, " ").trim() });
      continue;
    }

    if (isTableLine(linha)) {
      const tableLines = [];
      while (i < linhas.length && isTableLine(linhas[i])) {
        tableLines.push(linhas[i]);
        i += 1;
      }
      if (tableLines.length < 2) {
        fail(`tabela com menos de 2 linhas perto de: ${tableLines[0]}`);
        continue;
      }
      const header = splitCells(tableLines[0]);
      const sep = splitCells(tableLines[1]);
      if (!isSeparatorRow(sep)) {
        fail(`tabela sem linha separadora após cabeçalho: ${tableLines[0]}`);
      }
      const rows = [];
      for (let r = 2; r < tableLines.length; r += 1) {
        const cells = splitCells(tableLines[r]);
        if (isSeparatorRow(cells)) {
          fail("linha separadora extra no meio da tabela (possível fusão)");
          continue;
        }
        rows.push(cells);
      }
      blocos.push({ type: "table", header, rows });
      continue;
    }

    if (isListLine(linha)) {
      const ordered = isOrderedListLine(linha);
      const items = [];
      while (i < linhas.length && isListLine(linhas[i])) {
        const curOrdered = isOrderedListLine(linhas[i]);
        if (curOrdered !== ordered) break;
        items.push(
          linhas[i]
            .replace(/^\s*[-*+]\s+/, "")
            .replace(/^\s*\d+\.\s+/, "")
            .trim()
        );
        i += 1;
      }
      blocos.push({ type: ordered ? "ol" : "ul", items });
      continue;
    }

    // rótulo editorial solto (ex.: **Texto:**) já tratado; prosa em linhas normais
    const para = [];
    while (
      i < linhas.length &&
      linhas[i].trim() &&
      linhas[i].trim() !== "---" &&
      !isBlockquoteLine(linhas[i]) &&
      !isTableLine(linhas[i]) &&
      !isListLine(linhas[i]) &&
      !isFenceLine(linhas[i]) &&
      !isMetaLine(linhas[i]) &&
      !( /^\*\*[^*]+\*\*\s*$/.test(linhas[i].trim()) && !linhas[i].trim().includes(":"))
    ) {
      para.push(linhas[i].trim());
      i += 1;
    }
    if (para.length) {
      const text = para.join(" ").replace(/\s+/g, " ").trim();
      // Ignorar somente rótulos editoriais isolados (ex.: "Texto", "Nota").
      // Prefixo parcial mascarava prosa real ("Nota importante…", "Texto bíblico…").
      if (/^(Texto|Parágrafo|Elemento|Bloco|Nota|Números|Público|Interação|Camadas)\s*$/i.test(text)) {
        continue;
      }
      if (/^\*\*.+:\*\*$/.test(text)) {
        // rótulo markdown isolado já coberto como meta/heading
        continue;
      }
      if (!/^\*\*[^:]+:\*\*$/.test(text)) {
        blocos.push({ type: "paragraph", text });
      }
      continue;
    }

    i += 1;
  }

  return blocos;
}

function extrairMeta(blocos, chave) {
  const alvo = chave.toLowerCase();
  for (const b of blocos) {
    if (b.type === "meta" && String(b.chave).toLowerCase() === alvo) {
      return b.valor;
    }
  }
  return null;
}

function extrairCitacaoBiblica(blocos) {
  for (const b of blocos) {
    if (b.type !== "blockquote" || !b.lines || b.lines.length < 2) continue;
    const joined = b.lines.join("\n");
    const m = joined.match(/^\s*"([^"]+)"\s*\n\s*—\s*(.+)$/m);
    if (m) {
      return { texto: m[1].trim(), ref: m[2].trim(), block: b };
    }
    if (b.lines[0].includes('"') && /^—/.test(b.lines[b.lines.length - 1].trim())) {
      const texto = b.lines[0].replace(/^"|"$/g, "").replace(/^"|"$/g, "").trim();
      const ref = b.lines[b.lines.length - 1].replace(/^—\s*/, "").trim();
      return { texto: texto.replace(/^"|"$/g, ""), ref, block: b };
    }
  }
  return null;
}

function truncarCorpoSecao(corpo) {
  // Apêndices pós-seções (Travas / Decisões fixadas) não fazem parte do HTML da seção.
  return String(corpo || "").split(/^## (?:Travas|Decisões fixadas)\b/m)[0];
}

function dividirSecoes(md) {
  const partes = String(md).split(/^## Seção (\d+)\s+[—–-]\s+(.+)$/m);
  const mapa = new Map();
  for (let i = 1; i < partes.length; i += 3) {
    const num = Number(partes[i], 10);
    const tituloLinha = partes[i + 1].trim();
    const corpo = truncarCorpoSecao(partes[i + 2] || "");
    mapa.set(num, { tituloLinha, corpo, blocos: parseBlocos(corpo) });
  }
  return mapa;
}

module.exports = {
  parseBlocos,
  extrairMeta,
  extrairCitacaoBiblica,
  dividirSecoes,
  isSeparatorRow,
  splitCells,
};
