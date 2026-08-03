/**
 * Parser de blocos Markdown → AST leve para o candidato F5 / produção.
 * Dialeto controlado: parágrafos, blockquotes, tabelas, listas, fences, diretivas.
 * Constructo não suportado falha a geração (strict).
 */
"use strict";

const DIRETIVAS = new Set([
  "nota",
  "convite",
  "assinatura",
  "rodape-institucional",
  "preview-licao",
]);

const ATTRS_PERMITIDOS = {
  nota: new Set(),
  convite: new Set(["titulo"]),
  assinatura: new Set(),
  "rodape-institucional": new Set(),
  "preview-licao": new Set(),
};

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

function isDirectiveOpen(linha) {
  return /^:::([a-z0-9-]+)(?:\[([^\]]*)\])?\s*$/.test(linha.trim());
}

function parseAttrs(raw, nome, fail) {
  const attrs = {};
  const texto = String(raw || "").trim();
  if (!texto) return attrs;
  const re = /([a-zA-Z][\w-]*)\s*=\s*"([^"]*)"/g;
  let m;
  const found = [];
  while ((m = re.exec(texto))) {
    found.push(m[0]);
    const key = m[1];
    const allowed = ATTRS_PERMITIDOS[nome] || new Set();
    if (!allowed.has(key)) {
      fail(`atributo inválido "${key}" na diretiva :::${nome}`);
    }
    attrs[key] = m[2];
  }
  let rest = texto;
  for (const f of found) {
    rest = rest.replace(f, "");
  }
  if (rest.replace(/\s+/g, "").trim()) {
    fail(`atributos malformados na diretiva :::${nome}: ${texto}`);
  }
  return attrs;
}

/**
 * @param {string} corpo
 * @param {{ strict?: boolean, file?: string, lineOffset?: number }} [opts]
 */
function parseBlocos(corpo, opts = {}) {
  const strict = opts.strict !== false;
  const file = opts.file || "(desconhecido)";
  const lineOffset = Number(opts.lineOffset) || 0;
  const linhas = String(corpo || "")
    .replace(/\r\n/g, "\n")
    .split("\n");
  const blocos = [];
  let i = 0;

  function fail(msg, lineNo) {
    if (!strict) return;
    const linha = lineNo == null ? i + 1 + lineOffset : lineNo;
    const err = new Error(`parse-md-blocos: ${msg} (${file}:${linha})`);
    err.code = "MD_PARSE";
    err.file = file;
    err.line = linha;
    throw err;
  }

  while (i < linhas.length) {
    const linha = linhas[i];
    const trim = linha.trim();
    const lineNo = i + 1 + lineOffset;

    if (!trim || trim === "---") {
      i += 1;
      continue;
    }

    if (isDirectiveOpen(linha)) {
      const m = trim.match(/^:::([a-z0-9-]+)(?:\[([^\]]*)\])?\s*$/);
      const nome = m[1];
      if (!DIRETIVAS.has(nome)) {
        fail(`diretiva desconhecida :::${nome}`, lineNo);
      }
      const attrs = parseAttrs(m[2], nome, (msg) => fail(msg, lineNo));
      const bodyLines = [];
      i += 1;
      let closed = false;
      while (i < linhas.length) {
        if (/^:::\s*$/.test(linhas[i].trim())) {
          closed = true;
          i += 1;
          break;
        }
        bodyLines.push(linhas[i]);
        i += 1;
      }
      if (!closed) {
        fail(`diretiva :::${nome} sem fechamento`, lineNo);
      }
      const body = bodyLines.join("\n").replace(/^\n+|\n+$/g, "");
      if (
        (nome === "assinatura" ||
          nome === "rodape-institucional" ||
          nome === "preview-licao") &&
        body.trim()
      ) {
        fail(
          `diretiva :::${nome} deve ter corpo vazio (dados vêm de fontes institucionais/manifesto)`,
          lineNo
        );
      }
      const children =
        nome === "nota" || nome === "convite"
          ? parseBlocos(body, { strict, file, lineOffset: lineNo })
          : [];
      blocos.push({
        type: "directive",
        name: nome,
        attrs,
        body,
        children,
        line: lineNo,
      });
      continue;
    }

    if (/^:::/.test(trim)) {
      fail(`diretiva malformada: ${trim}`, lineNo);
    }

    if (isFenceLine(linha)) {
      const fence = [];
      const start = lineNo;
      i += 1;
      while (i < linhas.length && !isFenceLine(linhas[i])) {
        fence.push(linhas[i]);
        i += 1;
      }
      if (i >= linhas.length) fail("code fence sem fechamento", start);
      i += 1;
      blocos.push({ type: "code", value: fence.join("\n"), line: start });
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
        blocos.push({ type: "meta", chave, valor, raw: trim, line: lineNo });
      }
      i += 1;
      continue;
    }

    if (/^\*\*[^*]+\*\*\s*$/.test(trim) && !trim.includes(":")) {
      blocos.push({
        type: "heading_inline",
        text: trim.replace(/^\*\*|\*\*$/g, ""),
        line: lineNo,
      });
      i += 1;
      continue;
    }

    if (isBlockquoteLine(linha)) {
      const quoteLines = [];
      const start = lineNo;
      while (i < linhas.length && isBlockquoteLine(linhas[i])) {
        quoteLines.push(linhas[i].replace(/^>\s?/, ""));
        i += 1;
      }
      blocos.push({
        type: "blockquote",
        lines: quoteLines,
        text: quoteLines.join(" ").replace(/\s+/g, " ").trim(),
        line: start,
      });
      continue;
    }

    if (isTableLine(linha)) {
      const tableLines = [];
      const start = lineNo;
      while (i < linhas.length && isTableLine(linhas[i])) {
        tableLines.push(linhas[i]);
        i += 1;
      }
      if (tableLines.length < 2) {
        fail(`tabela com menos de 2 linhas perto de: ${tableLines[0]}`, start);
        continue;
      }
      const header = splitCells(tableLines[0]);
      const sep = splitCells(tableLines[1]);
      if (!isSeparatorRow(sep)) {
        fail(`tabela sem linha separadora após cabeçalho: ${tableLines[0]}`, start);
      }
      const rows = [];
      for (let r = 2; r < tableLines.length; r += 1) {
        const cells = splitCells(tableLines[r]);
        if (isSeparatorRow(cells)) {
          fail("linha separadora extra no meio da tabela (possível fusão)", start);
          continue;
        }
        rows.push(cells);
      }
      blocos.push({ type: "table", header, rows, line: start });
      continue;
    }

    if (isListLine(linha)) {
      const ordered = isOrderedListLine(linha);
      const items = [];
      const start = lineNo;
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
      blocos.push({ type: ordered ? "ol" : "ul", items, line: start });
      continue;
    }

    const para = [];
    const start = lineNo;
    while (
      i < linhas.length &&
      linhas[i].trim() &&
      linhas[i].trim() !== "---" &&
      !isBlockquoteLine(linhas[i]) &&
      !isTableLine(linhas[i]) &&
      !isListLine(linhas[i]) &&
      !isFenceLine(linhas[i]) &&
      !isMetaLine(linhas[i]) &&
      !isDirectiveOpen(linhas[i]) &&
      !/^:::/.test(linhas[i].trim()) &&
      !(/^\*\*[^*]+\*\*\s*$/.test(linhas[i].trim()) && !linhas[i].trim().includes(":"))
    ) {
      para.push(linhas[i].trim());
      i += 1;
    }
    if (para.length) {
      const text = para.join(" ").replace(/\s+/g, " ").trim();
      if (
        !/^(Texto|Parágrafo|Elemento|Bloco|Nota|Números|Público|Interação|Camadas)\b\s*$/i.test(
          text
        )
      ) {
        if (/^\*\*.+:\*\*$/.test(text)) {
          // rótulo sozinho
        } else if (!/^\*\*[^:]+:\*\*$/.test(text)) {
          blocos.push({ type: "paragraph", text, line: start });
        }
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
      const texto = b.lines[0].replace(/^"|"$/g, "").trim();
      const ref = b.lines[b.lines.length - 1].replace(/^—\s*/, "").trim();
      return { texto: texto.replace(/^"|"$/g, ""), ref, block: b };
    }
  }
  return null;
}

function truncarCorpoSecao(corpo) {
  return String(corpo || "").split(/^## (?:Travas|Decisões fixadas|TODO)\b/m)[0];
}

function dividirSecoes(md, opts = {}) {
  const file = opts.file || "(desconhecido)";
  const partes = String(md).split(/^## Seção (\d+)\s+[—–-]\s+(.+)$/m);
  const mapa = new Map();
  for (let i = 1; i < partes.length; i += 3) {
    const num = Number(partes[i], 10);
    const tituloLinha = partes[i + 1].trim();
    const corpo = truncarCorpoSecao(partes[i + 2] || "");
    const marker = `## Seção ${num}`;
    const idx = String(md).indexOf(marker);
    const lineOffset = idx < 0 ? 0 : String(md).slice(0, idx).split("\n").length;
    mapa.set(num, {
      tituloLinha,
      corpo,
      blocos: parseBlocos(corpo, { ...opts, file, lineOffset }),
    });
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
  DIRETIVAS,
};
