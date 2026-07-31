/**
 * Converte conteudo/*.json → prototipos/prospecto-v1/js/dados/*.js
 * e injeta fallback noscript em prototipos/prospecto-v1/index.html.
 * Uso: node programas/discipulando-a-caserna/ferramentas/gerar-dados.js
 * Não é etapa de build do site no navegador — rode após editar JSON.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const raiz = path.join(__dirname, "..");
const MOJIBAKE = /Ã.|Â.|â€|ðŸ|�/;
const MARK_INICIO = "<!-- FALLBACK-DADOS:START -->";
const MARK_FIM = "<!-- FALLBACK-DADOS:END -->";

function lerUtf8(caminho) {
  return fs.readFileSync(caminho, { encoding: "utf8" });
}

function escreverUtf8(caminho, conteudo) {
  const saida = conteudo.endsWith("\n") ? conteudo : `${conteudo}\n`;
  fs.mkdirSync(path.dirname(caminho), { recursive: true });
  let ultimoErro;
  for (let tentativa = 0; tentativa < 5; tentativa++) {
    try {
      fs.writeFileSync(caminho, saida, { encoding: "utf8" });
      return;
    } catch (err) {
      ultimoErro = err;
      const codigo = err && err.code;
      if (codigo !== "EBUSY" && codigo !== "EPERM" && codigo !== "UNKNOWN") {
        throw err;
      }
      const espera = 40 * (tentativa + 1);
      const inicio = Date.now();
      while (Date.now() - inicio < espera) {
        /* espera breve contra lock do Windows/AV */
      }
    }
  }
  throw ultimoErro;
}

function assertSemMojibake(texto, rotulo) {
  if (MOJIBAKE.test(texto)) {
    const match = texto.match(MOJIBAKE);
    throw new Error(
      `Caracteres corrompidos detectados em ${rotulo}: "${match && match[0]}"`
    );
  }
}

function validarModulos(dados) {
  if (!dados || typeof dados !== "object") {
    throw new Error("modulos.json: raiz inválida");
  }
  if (!Array.isArray(dados.modulos) || dados.modulos.length !== 4) {
    throw new Error("modulos.json: esperado array modulos com 4 itens");
  }
  dados.modulos.forEach((mod, i) => {
    ["numero", "nome", "subtitulo", "enfase", "peca", "estado", "licoes"].forEach(
      (campo) => {
        if (mod[campo] == null) {
          throw new Error(`modulos.json: módulo ${i + 1} sem campo "${campo}"`);
        }
      }
    );
    if (!Array.isArray(mod.licoes) || mod.licoes.length !== 2) {
      throw new Error(`modulos.json: módulo ${mod.numero} — licoes deve ser [ini, fim]`);
    }
  });
}

function validarMatriz(dados) {
  if (!dados || typeof dados !== "object") {
    throw new Error("matriz-curricular.json: raiz inválida");
  }
  if (dados.total !== 48) {
    throw new Error(`matriz-curricular.json: total esperado 48, recebido ${dados.total}`);
  }
  if (!Array.isArray(dados.licoes) || dados.licoes.length !== 48) {
    throw new Error("matriz-curricular.json: esperado 48 lições");
  }
  dados.licoes.forEach((l, i) => {
    ["numero", "modulo", "titulo", "textoBase", "objetivo"].forEach((campo) => {
      if (l[campo] == null) {
        throw new Error(`matriz-curricular.json: lição índice ${i} sem "${campo}"`);
      }
    });
    if (typeof l.produzida !== "boolean") {
      throw new Error(
        `matriz-curricular.json: lição ${l.numero} — produzida deve ser boolean`
      );
    }
  });
}

function gerarScript(origemRel, destinoRel, nomeGlobal, validar) {
  const origem = path.join(raiz, origemRel);
  const destino = path.join(raiz, destinoRel);
  let bruto;
  try {
    bruto = lerUtf8(origem);
  } catch (err) {
    throw new Error(`Falha ao ler ${origemRel}: ${err.message}`);
  }
  assertSemMojibake(bruto, origemRel);

  let dados;
  try {
    dados = JSON.parse(bruto);
  } catch (err) {
    throw new Error(`JSON inválido em ${origemRel}: ${err.message}`);
  }

  validar(dados);
  const corpo = JSON.stringify(dados, null, 2);
  assertSemMojibake(corpo, `${origemRel} (serializado)`);

  const saida = `/**
 * Gerado a partir de ${origemRel}.
 * Não edite à mão — altere o JSON e rode: node ferramentas/gerar-dados.js
 */
window.${nomeGlobal} = ${corpo};
`;
  assertSemMojibake(saida, destinoRel);
  escreverUtf8(destino, saida);

  const relido = lerUtf8(destino);
  assertSemMojibake(relido, `${destinoRel} (após escrita)`);
  const match = relido.match(
    new RegExp(`window\\.${nomeGlobal}\\s*=\\s*([\\s\\S]*);\\s*$`)
  );
  if (!match) {
    throw new Error(`${destinoRel}: formato inesperado após geração`);
  }
  const relidosDados = JSON.parse(match[1]);
  if (JSON.stringify(relidosDados) !== JSON.stringify(dados)) {
    throw new Error(`${destinoRel}: round-trip divergente da fonte ${origemRel}`);
  }

  console.log("OK", destinoRel);
  return dados;
}

function escaparHtml(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function montarFallback(modulos, matriz) {
  const mapa = modulos.modulos
    .map((m) => {
      const estado =
        m.estado === "produzido" ? "Material completo" : "Produção condicionada";
      return `<article class="fallback-item">
  <h4>Módulo ${m.numero}: ${escaparHtml(m.nome)}</h4>
  <p>${escaparHtml(m.subtitulo)} · ${escaparHtml(m.peca)} · ${escaparHtml(estado)}</p>
  <p>${escaparHtml(m.enfase)}</p>
</article>`;
    })
    .join("\n");

  const linhas = matriz.licoes
    .map((l) => {
      const estado = l.produzida ? "Produzida" : "Planejada";
      return `<tr>
  <td>${l.numero}</td>
  <td>${l.modulo}</td>
  <td>${escaparHtml(l.titulo)}</td>
  <td>${escaparHtml(l.textoBase)}</td>
  <td>${escaparHtml(l.objetivo)}</td>
  <td>${estado}</td>
</tr>`;
    })
    .join("\n");

  return `${MARK_INICIO}
<noscript class="fallback-dados">
  <div class="container fluxo">
    <p class="matriz__nota">
      Esta página funciona sem JavaScript. Abaixo estão o mapa dos módulos e a
      matriz curricular completos do programa Discipulando a Caserna.
    </p>
    <section class="fallback-mapa" aria-label="Mapa dos módulos sem JavaScript">
      <h3 class="fallback-titulo">Mapa dos módulos</h3>
      ${mapa}
    </section>
    <section class="fallback-matriz" aria-label="Tabela da matriz curricular sem JavaScript">
      <h3 class="fallback-titulo">Matriz curricular (48 lições)</h3>
      <div class="fallback-tabela-wrap">
        <table class="fallback-tabela">
          <thead>
            <tr>
              <th scope="col">Nº</th>
              <th scope="col">Módulo</th>
              <th scope="col">Título</th>
              <th scope="col">Texto-base</th>
              <th scope="col">Objetivo</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
${linhas}
          </tbody>
        </table>
      </div>
    </section>
  </div>
</noscript>
${MARK_FIM}`;
}

function injetarFallback(modulos, matriz) {
  const indexPath = path.join(raiz, "prototipos", "prospecto-v1", "index.html");
  let html = lerUtf8(indexPath);
  const bloco = montarFallback(modulos, matriz);
  assertSemMojibake(bloco, "fallback noscript");

  if (html.includes(MARK_INICIO) && html.includes(MARK_FIM)) {
    const re = new RegExp(
      `${MARK_INICIO.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${MARK_FIM.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`
    );
    html = html.replace(re, bloco);
  } else if (html.includes('<div class="matriz__lista" data-matriz-lista></div>')) {
    html = html.replace(
      '<div class="matriz__lista" data-matriz-lista></div>',
      `<div class="matriz__lista" data-matriz-lista></div>\n            ${bloco}`
    );
  } else {
    console.warn(
      "AVISO: index.html sem marcadores FALLBACK-DADOS — injeção adianda (matriz no próximo PR)."
    );
    return;
  }

  escreverUtf8(indexPath, html);
  console.log("OK", "index.html (fallback noscript)");
}

function gerarLicao1() {
  const origemRel = "assets/img/licao1/manifest.json";
  const destinoRel = "prototipos/prospecto-v1/js/dados/licao1.js";
  const bruto = lerUtf8(path.join(raiz, origemRel));
  assertSemMojibake(bruto, origemRel);
  let manifesto;
  try {
    manifesto = JSON.parse(bruto);
  } catch (err) {
    throw new Error(`JSON inválido em ${origemRel}: ${err.message}`);
  }
  if (!Array.isArray(manifesto) || !manifesto.length) {
    throw new Error(`${origemRel}: esperado array de páginas`);
  }

  const dados = manifesto.map((p, i) => {
    ["edicao", "pagina", "arquivo", "largura", "altura", "arquivo_sm"].forEach(
      (campo) => {
        if (p[campo] == null) {
          throw new Error(`${origemRel}: item ${i} sem campo "${campo}"`);
        }
      }
    );
    // Manifesto guarda caminhos a partir da raiz do programa; o prospecto
    // vive em prototipos/prospecto-v1/, então o browser precisa de ../../.
    const paraProspecto = (rel) => (String(rel).startsWith("../") ? rel : `../../${rel}`);
    return {
      edicao: p.edicao,
      pagina: p.pagina,
      arquivo: paraProspecto(p.arquivo),
      largura: p.largura,
      altura: p.altura,
      arquivo_sm: paraProspecto(p.arquivo_sm),
    };
  });

  const corpo = JSON.stringify(dados, null, 2);
  const saida = `/**
 * Gerado a partir de ${origemRel}.
 * Não edite à mão — altere o manifesto e rode: node ferramentas/gerar-dados.js
 */
window.DADOS_LICAO1 = ${corpo};
`;
  assertSemMojibake(saida, destinoRel);
  escreverUtf8(path.join(raiz, destinoRel), saida);
  console.log("OK", destinoRel);
  return dados;
}

function main() {
  const modulos = gerarScript(
    "conteudo/modulos.json",
    "prototipos/prospecto-v1/js/dados/modulos.js",
    "DADOS_MODULOS",
    validarModulos
  );
  const matriz = gerarScript(
    "conteudo/matriz-curricular.json",
    "prototipos/prospecto-v1/js/dados/matriz.js",
    "DADOS_MATRIZ",
    validarMatriz
  );
  gerarLicao1();
  injetarFallback(modulos, matriz);
}

try {
  main();
} catch (err) {
  console.error("ERRO:", err.message);
  process.exit(1);
}
