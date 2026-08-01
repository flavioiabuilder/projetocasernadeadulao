"use strict";

/**
 * Fronteiras de propriedade intelectual e de privacidade.
 *
 * Estes testes são a garantia executável das promessas do README:
 * a reconstrução não faz hotlink, não fala com domínio nenhum em runtime,
 * não carrega rastreadores e não transmite dados de formulário.
 *
 * Eles varrem os arquivos de runtime — não a pasta `auditoria/`, cujo papel
 * é justamente registrar as URLs da referência como evidência.
 */

const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");

const RAIZ = path.resolve(__dirname, "..");
const RUNTIME = path.join(RAIZ, "design-system");

/** Lista recursiva de arquivos sob `dir` com as extensões dadas. */
function arquivos(dir, extensoes) {
  const saida = [];
  for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
    const alvo = path.join(dir, entrada.name);
    if (entrada.isDirectory()) saida.push(...arquivos(alvo, extensoes));
    else if (extensoes.includes(path.extname(entrada.name))) saida.push(alvo);
  }
  return saida;
}

const RUNTIME_ARQS = arquivos(RUNTIME, [".html", ".css", ".js", ".json"]);
const relativo = (p) => path.relative(RAIZ, p).replace(/\\/g, "/");

test("o runtime tem arquivos para varrer (a varredura não é vazia)", () => {
  assert.ok(
    RUNTIME_ARQS.length >= 10,
    `esperado ≥10 arquivos, obtido ${RUNTIME_ARQS.length}`
  );
});

test("nenhum arquivo de runtime referencia domínios da referência", () => {
  const proibidos = [
    "soulchurch.com",
    "website-files.com",
    "webflow.com",
    "churchcenter.com",
    "churchsuite.com",
    "myflodesk.com",
    "flodesk.com",
    "cookiebot.com",
    "usercentrics",
    "pixieset.com",
    "trustbridgeglobal.com",
  ];
  RUNTIME_ARQS.forEach((arq) => {
    const texto = fs.readFileSync(arq, "utf8").toLowerCase();
    proibidos.forEach((dominio) => {
      assert.ok(
        texto.indexOf(dominio) === -1,
        `${relativo(arq)} referencia domínio da referência: ${dominio}`
      );
    });
  });
});

test("nenhum arquivo de runtime carrega recurso externo (sem hotlink)", () => {
  // Qualquer URL absoluta em src/href/url()/import é externa por definição.
  const padroes = [
    /\b(?:src|href)\s*=\s*["']https?:\/\//i,
    /url\(\s*["']?https?:\/\//i,
    /@import\s+(?:url\()?\s*["']https?:\/\//i,
    /\/\/(?:fonts|cdn|ajax|unpkg|cdnjs|assets)\./i,
  ];
  RUNTIME_ARQS.forEach((arq) => {
    const texto = fs.readFileSync(arq, "utf8");
    padroes.forEach((padrao) => {
      const achado = texto.match(padrao);
      assert.strictEqual(
        achado,
        null,
        `${relativo(arq)} carrega recurso externo: ${achado && achado[0]}`
      );
    });
  });
});

test("nenhum arquivo de runtime abre conexão de rede", () => {
  const proibidos = [
    "fetch(",
    "XMLHttpRequest",
    "navigator.sendBeacon",
    "new WebSocket",
    "EventSource",
    "importScripts",
    "navigator.geolocation",
  ];
  RUNTIME_ARQS.forEach((arq) => {
    const texto = fs.readFileSync(arq, "utf8");
    proibidos.forEach((termo) => {
      assert.ok(
        texto.indexOf(termo) === -1,
        `${relativo(arq)} usa ${termo} — o runtime precisa ser offline`
      );
    });
  });
});

test("nenhum arquivo de runtime instala rastreador, cookie ou consentimento", () => {
  const proibidos = [
    "document.cookie",
    "localStorage",
    "sessionStorage",
    "gtag(",
    "dataLayer",
    "googletagmanager",
    "google-analytics",
    "fbq(",
    "_paq",
    "hotjar",
  ];
  RUNTIME_ARQS.forEach((arq) => {
    const texto = fs.readFileSync(arq, "utf8");
    proibidos.forEach((termo) => {
      assert.ok(
        texto.indexOf(termo) === -1,
        `${relativo(arq)} contém ${termo} — a reconstrução não rastreia`
      );
    });
  });
});

test("nenhum formulário declara action remota ou method de envio", () => {
  const html = arquivos(RUNTIME, [".html"]);
  html.forEach((arq) => {
    const texto = fs.readFileSync(arq, "utf8");
    const formularios = texto.match(/<form[^>]*>/gi) || [];
    formularios.forEach((tag) => {
      assert.ok(
        !/\saction\s*=/i.test(tag),
        `${relativo(arq)} tem <form action=…> — o envio precisa ser só local`
      );
      assert.ok(
        !/\smethod\s*=/i.test(tag),
        `${relativo(arq)} tem <form method=…> — o envio precisa ser só local`
      );
      assert.ok(
        /data-form-local/.test(tag),
        `${relativo(arq)} tem <form> sem data-form-local — o envio não seria interceptado`
      );
    });
  });
});

test("o módulo de formulários intercepta o envio antes de qualquer outra coisa", () => {
  const texto = fs.readFileSync(path.join(RUNTIME, "js", "forms.js"), "utf8");
  const corpo = texto.slice(texto.indexOf("function aoEnviar"));
  const posPrevent = corpo.indexOf("evento.preventDefault()");
  assert.ok(posPrevent !== -1, "aoEnviar precisa chamar preventDefault");
  // Nenhuma linha executável antes do preventDefault, fora comentários.
  const antes = corpo
    .slice(0, posPrevent)
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "")
    .replace(/function aoEnviar\(evento\)\s*\{/, "")
    .trim();
  assert.strictEqual(antes, "", `há código antes do preventDefault: “${antes}”`);
});

test("nenhuma fonte proprietária é distribuída", () => {
  const binarios = arquivos(RAIZ, [".woff", ".woff2", ".ttf", ".otf", ".eot"]);
  assert.deepStrictEqual(
    binarios.map(relativo),
    [],
    "arquivos de fonte não devem ser versionados nesta referência"
  );
});

test("nenhum ativo de mídia foi copiado para o runtime", () => {
  const midia = arquivos(RUNTIME, [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
    ".mp4",
    ".webm",
    ".mp3",
    ".json",
  ]);
  const naoTokens = midia.filter((p) => path.basename(p) !== "tokens.json");
  assert.deepStrictEqual(
    naoTokens.map(relativo),
    [],
    "o runtime usa gradientes e geometria CSS; nenhum binário deve existir aqui"
  );
});

test("as capturas de auditoria não são carregadas pelo runtime", () => {
  // Evidência não é ativo: nenhuma página pode apontar src/href/url() para
  // `auditoria/`. Citar o caminho em comentário ou em metadados de
  // proveniência (tokens.json → $meta) é legítimo e não conta.
  const paginas = arquivos(RUNTIME, [".html", ".css", ".js"]);
  const padrao =
    /(?:src|href)\s*=\s*["'][^"']*auditoria\/|url\(\s*["']?[^"')]*auditoria\//i;
  paginas.forEach((arq) => {
    const achado = fs.readFileSync(arq, "utf8").match(padrao);
    assert.strictEqual(
      achado,
      null,
      `${relativo(arq)} carrega material de auditoria: ${achado && achado[0]}`
    );
  });
});

test("a identidade demonstrativa é declarada como fictícia nas páginas", () => {
  const html = arquivos(RUNTIME, [".html"]);
  const demo = html.find((p) => path.basename(p) === "demo.html");
  assert.ok(demo, "demo.html precisa existir");
  const texto = fs.readFileSync(demo, "utf8").toLowerCase();
  assert.ok(
    texto.indexOf("fict") !== -1,
    "a demo precisa declarar explicitamente que os dados são fictícios"
  );
  assert.ok(
    texto.indexOf("nenhum dado") !== -1,
    "a demo precisa declarar que nenhum dado é transmitido"
  );
});

test("a reconstrução não usa o nome da referência como marca", () => {
  RUNTIME_ARQS.forEach((arq) => {
    const texto = fs.readFileSync(arq, "utf8").toLowerCase();
    assert.ok(
      !/\bsoul\s*church\b/.test(texto),
      `${relativo(arq)} usa o nome da referência — a demo tem identidade própria`
    );
  });
});
