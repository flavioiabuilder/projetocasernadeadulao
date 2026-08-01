"use strict";

/**
 * Gera design-system/css/tokens.css a partir da fonte canônica
 * design-system/tokens/tokens.json (Átrio).
 *
 * Fonte única: nenhum valor de token deve ser escrito à mão no CSS.
 * Rode `npm run generate:tokens:soul-church` após editar o JSON.
 *
 * Este gerador é próprio desta referência. O gerador da Aramco
 * (referencias-devtools/aramco-birth-of-oil/ferramentas/gerar-tokens.js)
 * permanece intocado: os dois estudos têm grupos e substituições distintos,
 * e uma abstração compartilhada custaria mais do que renderia.
 */

const fs = require("fs");
const path = require("path");

const RAIZ = path.resolve(__dirname, "..");
const ORIGEM = path.join(RAIZ, "design-system", "tokens", "tokens.json");
const DESTINO = path.join(RAIZ, "design-system", "css", "tokens.css");

/** Grupos exportados como custom properties, na ordem de escrita. */
const GRUPOS = [
  ["color", "cor"],
  ["gradient", "grad"],
  ["typography", "tipo"],
  ["scale", "escala"],
  ["spacing", "esp"],
  ["sizing", "tam"],
  ["contentWidth", "larg"],
  ["grid", "grade"],
  ["border", "borda"],
  ["radius", "raio"],
  ["opacity", "opac"],
  ["blur", "desfoque"],
  ["shadow", "sombra"],
  ["zIndex", "z"],
  ["breakpoint", "bp"],
  ["duration", "dur"],
  ["easing", "ease"],
  ["stagger", "stagger"],
  ["motionDistance", "mov-dist"],
  ["motionScale", "mov-escala"],
  ["marquee", "marquee"],
  ["overlay", "overlay"],
  ["focusRing", "foco"],
  ["formState", "campo"],
  ["imageTreatment", "img"],
];

/**
 * Substituições de movimento reduzido, declaradas como pares
 * [grupoCss, chave, campoDeReducedMotion]. Manter aqui — e não espalhado
 * pelo CSS — garante que os nomes semânticos não mudem quando o movimento cai.
 */
const SUBSTITUICOES_MOVIMENTO = [
  ["dur", "rapida", "duracao"],
  ["dur", "media", "duracao"],
  ["dur", "revelacao", "duracao"],
  ["dur", "menu", "duracao"],
  ["dur", "transicaoPagina", "duracao"],
  ["mov-dist", "palavra", "distancia"],
  ["mov-dist", "bloco", "distancia"],
  ["mov-dist", "midia", "distancia"],
  ["mov-dist", "letra", "distancia"],
  ["stagger", "palavra", "stagger"],
  ["stagger", "item", "stagger"],
  ["stagger", "bloco", "stagger"],
  ["stagger", "totalPalavras", "stagger"],
  ["mov-escala", "midiaEntrada", "escala"],
  ["mov-escala", "pressionado", "escala"],
  ["marquee", "velocidade", "velocidadeMarquee"],
  ["marquee", "velocidadeLenta", "velocidadeMarquee"],
];

/** camelCase → kebab-case, preservando dígitos. */
function paraKebab(nome) {
  return nome.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function nomeVariavel(prefixo, grupo, chave) {
  return `--${prefixo}-${grupo}-${paraKebab(chave)}`;
}

function bloco(titulo, linhas) {
  return [`  /* ${titulo} */`, ...linhas, ""].join("\n");
}

function gerar(tokens) {
  const prefixo = tokens.$meta.prefixoCSS;
  const partes = [];

  for (const [grupoJson, grupoCss] of GRUPOS) {
    const valores = tokens[grupoJson];
    if (!valores) continue;
    const linhas = Object.keys(valores).map(
      (chave) => `  ${nomeVariavel(prefixo, grupoCss, chave)}: ${valores[chave]};`
    );
    partes.push(bloco(`${grupoJson} → ${prefixo}-${grupoCss}-*`, linhas));
  }

  const rm = tokens.reducedMotion;
  const linhasRM = SUBSTITUICOES_MOVIMENTO.map(([grupo, chave, campo]) => {
    if (!(campo in rm)) {
      throw new Error(`reducedMotion.${campo} ausente em tokens.json`);
    }
    return `    ${nomeVariavel(prefixo, grupo, chave)}: ${rm[campo]};`;
  });

  const cabecalho = [
    "/*",
    ` * ${tokens.$meta.nome} — tokens v${tokens.$meta.versao}`,
    " *",
    " * ARQUIVO GERADO. Não edite à mão.",
    ` * Fonte: design-system/tokens/tokens.json → ${tokens.$meta.geradoPor}`,
    " */",
    "",
    ":root {",
  ].join("\n");

  const rodape = [
    "}",
    "",
    "/* Substituição de movimento: mesmos nomes semânticos, valores neutros. */",
    "@media (prefers-reduced-motion: reduce) {",
    "  :root {",
    linhasRM.join("\n"),
    "  }",
    "}",
    "",
  ].join("\n");

  return `${cabecalho}\n${partes.join("\n")}${rodape}`;
}

/** Verificações de integridade que o teste unitário também consome. */
function auditar(tokens) {
  const prefixo = tokens.$meta.prefixoCSS;
  const vistos = new Map();
  const duplicados = [];
  for (const [grupoJson, grupoCss] of GRUPOS) {
    const valores = tokens[grupoJson];
    if (!valores) continue;
    for (const chave of Object.keys(valores)) {
      const nome = nomeVariavel(prefixo, grupoCss, chave);
      if (vistos.has(nome)) duplicados.push(nome);
      vistos.set(nome, valores[chave]);
    }
  }
  const gruposAusentes = GRUPOS.filter(([g]) => !tokens[g]).map(([g]) => g);
  return {
    total: vistos.size,
    duplicados,
    gruposAusentes,
    nomes: Array.from(vistos.keys()),
  };
}

function main() {
  const tokens = JSON.parse(fs.readFileSync(ORIGEM, "utf8"));
  const relatorio = auditar(tokens);
  if (relatorio.duplicados.length) {
    throw new Error(`Tokens duplicados: ${relatorio.duplicados.join(", ")}`);
  }
  const css = gerar(tokens);
  fs.mkdirSync(path.dirname(DESTINO), { recursive: true });
  fs.writeFileSync(DESTINO, css, "utf8");
  console.log(`tokens.css gerado — ${relatorio.total} custom properties`);
}

if (require.main === module) main();

module.exports = {
  gerar,
  auditar,
  paraKebab,
  nomeVariavel,
  GRUPOS,
  SUBSTITUICOES_MOVIMENTO,
  ORIGEM,
  DESTINO,
};
