#!/usr/bin/env node
/**
 * Valida o contrato da camada metodológica (Fase 0).
 * Uso:
 *   node metodo/ferramentas/validar-metodo.js
 *   node metodo/ferramentas/validar-metodo.js --bootstrap   (explícito; já é o padrão)
 *   node metodo/ferramentas/validar-metodo.js --no-bootstrap (só debug local)
 */
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const METODO = path.join(ROOT, "metodo");
const MANIFESTO_PATH = path.join(METODO, "MANIFESTO.json");
const TOKENS_TEMPLATE = path.join(METODO, "templates/projeto-web/03-tokens.json");
const SCHEMA_PATH = path.join(METODO, "schemas/tokens.template.schema.json");
const TEMPLATE_DIR = path.join(METODO, "templates/projeto-web");
const PAGES_YML = path.join(ROOT, ".github/workflows/pages.yml");

const SECRET_PATTERNS = [
  /api[_-]?key\s*[:=]\s*['"][^'"]+['"]/i,
  /BEGIN (RSA |OPENSSH )?PRIVATE KEY/,
  /ghp_[A-Za-z0-9]{20,}/,
  /xox[baprs]-[A-Za-z0-9-]{10,}/,
];

const PLACEHOLDER_MARKERS = ["{{", "TODO", "LACUNA", "NÃO CONFIRMADO", "PLACEHOLDER"];

let failures = 0;

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  failures += 1;
}

function ok(msg) {
  console.log(`OK: ${msg}`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function assertExists(relFromMetodo) {
  const abs = path.join(METODO, relFromMetodo);
  if (!fs.existsSync(abs)) {
    fail(`arquivo obrigatório ausente: metodo/${relFromMetodo}`);
    return false;
  }
  return true;
}

function assertRootExists(relFromRoot) {
  const abs = path.join(ROOT, relFromRoot);
  if (!fs.existsSync(abs)) {
    fail(`integração ausente: ${relFromRoot}`);
    return false;
  }
  return true;
}

function walkFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, acc);
    else acc.push(full);
  }
  return acc;
}

function checkManifest() {
  if (!fs.existsSync(MANIFESTO_PATH)) {
    fail("MANIFESTO.json ausente");
    return null;
  }
  let manifesto;
  try {
    manifesto = readJson(MANIFESTO_PATH);
  } catch (e) {
    fail(`MANIFESTO.json inválido: ${e.message}`);
    return null;
  }
  ok("MANIFESTO.json parseável");
  const list = manifesto.arquivosObrigatorios || [];
  for (const rel of list) {
    if (assertExists(rel)) ok(`presente: ${rel}`);
  }
  return manifesto;
}

function checkIntegracao(manifesto) {
  const list = (manifesto && manifesto.integracaoObrigatoria) || [];
  for (const rel of list) {
    if (assertRootExists(rel)) ok(`integração: ${rel}`);
  }

  const metodoWeb = path.join(ROOT, "metodo-web");
  if (fs.existsSync(metodoWeb)) {
    fail("proibido metodo-web/ na raiz do repositório");
  } else {
    ok("ausência de metodo-web/");
  }

  if (!fs.existsSync(PAGES_YML)) {
    fail(".github/workflows/pages.yml ausente");
    return;
  }
  const pages = fs.readFileSync(PAGES_YML, "utf8");
  const copyLines = pages.split(/\r?\n/).filter((line) => /\b(cp|copy)\b/i.test(line));
  const bad = copyLines.filter((line) => /(?:^|[\s"'/])metodo(?:\/|["'\s]|$)/.test(line));
  if (bad.length) {
    fail(`pages.yml parece copiar metodo/: ${bad.join(" | ")}`);
  } else {
    ok("pages.yml não copia metodo/");
  }
}

function checkTokensTemplate() {
  if (!fs.existsSync(TOKENS_TEMPLATE)) return;
  let tokens;
  const beforeStruct = failures;
  try {
    tokens = readJson(TOKENS_TEMPLATE);
  } catch (e) {
    fail(`03-tokens.json inválido: ${e.message}`);
    return;
  }
  if (!tokens.primitivos || !tokens.semanticos) {
    fail("03-tokens.json precisa de chaves primitivos e semanticos");
    return;
  }
  const cats = [
    "cor",
    "tipografia",
    "espacamento",
    "layout",
    "raio",
    "borda",
    "elevacao",
    "motion",
    "foco",
    "breakpoints",
  ];
  for (const layer of ["primitivos", "semanticos"]) {
    for (const cat of cats) {
      if (!tokens[layer][cat]) {
        fail(`03-tokens.json.${layer}.${cat} ausente`);
      }
    }
  }
  if (failures === beforeStruct) ok("03-tokens.json estrutura mínima");

  if (fs.existsSync(SCHEMA_PATH)) {
    const beforeSchema = failures;
    try {
      const schema = readJson(SCHEMA_PATH);
      for (const key of schema.required || []) {
        if (!(key in tokens)) fail(`tokens não satisfaz schema.required: ${key}`);
      }
      const primReq = schema.properties?.primitivos?.required || [];
      for (const key of primReq) {
        if (!(key in tokens.primitivos)) {
          fail(`tokens.primitivos falta categoria do schema: ${key}`);
        }
      }
      const semReq = schema.properties?.semanticos?.required || [];
      for (const key of semReq) {
        if (!(key in tokens.semanticos)) {
          fail(`tokens.semanticos falta categoria do schema: ${key}`);
        }
      }
      if (failures === beforeSchema) ok("03-tokens.json vs schema (checagem leve)");
    } catch (e) {
      fail(`schema inválido: ${e.message}`);
    }
  }
}

function checkNoCanonicalSkills() {
  const skillsDir = path.join(METODO, "skills");
  if (!fs.existsSync(skillsDir)) return;
  const before = failures;
  const skillFiles = walkFiles(skillsDir).filter((f) => path.basename(f) === "SKILL.md");
  for (const skillMd of skillFiles) {
    const rel = path.relative(skillsDir, skillMd).replace(/\\/g, "/");
    fail(`proibido SKILL.md canônico em metodo/skills/${rel} (use .claude/skills/)`);
  }
  if (failures === before) ok("sem SKILL.md canônico sob metodo/skills/**");
}

function checkMdInternalLinks(rootDir, label) {
  const before = failures;
  const mdFiles = walkFiles(rootDir).filter((f) => f.endsWith(".md"));
  const linkRe = /\]\(([^)]+)\)/g;
  for (const file of mdFiles) {
    const text = fs.readFileSync(file, "utf8");
    let m;
    while ((m = linkRe.exec(text))) {
      const href = m[1].split("#")[0].split(" ")[0];
      if (!href || href.startsWith("http") || href.startsWith("mailto:")) continue;
      if (href.startsWith("//")) continue;
      const target = path.resolve(path.dirname(file), href);
      if (!fs.existsSync(target)) {
        fail(`link quebrado em ${path.relative(ROOT, file)} → ${href}`);
      }
    }
  }
  if (failures === before) ok(`links internos relativos em ${label}`);
}

function checkInternalLinks() {
  checkMdInternalLinks(METODO, "metodo/**/*.md");
  const instanciaMetodo = path.join(ROOT, "programas/discipulando-a-caserna/docs/metodo");
  if (fs.existsSync(instanciaMetodo)) {
    checkMdInternalLinks(
      instanciaMetodo,
      "programas/discipulando-a-caserna/docs/metodo/**/*.md"
    );
  } else {
    fail("programas/discipulando-a-caserna/docs/metodo/ ausente");
  }
}

function checkSecrets() {
  const before = failures;
  const files = walkFiles(METODO);
  for (const file of files) {
    if (file.endsWith(".png") || file.endsWith(".jpg")) continue;
    const text = fs.readFileSync(file, "utf8");
    for (const re of SECRET_PATTERNS) {
      if (re.test(text)) {
        fail(`possível segredo em ${path.relative(ROOT, file)} (${re})`);
      }
    }
  }
  if (failures === before) ok("sem padrões óbvios de segredo em metodo/");
}

function checkPromptExecutavel() {
  const promptRels = [
    "prompts/descoberta.md",
    "prompts/analise-concorrencia.md",
    "prompts/curadoria-referencias.md",
    "prompts/direcao-arte.md",
    "prompts/manual-design-system.md",
    "prompts/prototipagem.md",
    "prompts/critica-estruturada.md",
    "prompts/qa-visual.md",
    "prompts/implementacao.md",
    "prompts/auditoria-final.md",
  ];
  for (const rel of promptRels) {
    const abs = path.join(METODO, rel);
    if (!fs.existsSync(abs)) {
      if (rel === "prompts/curadoria-referencias.md") continue;
      fail(`${rel} ausente`);
      continue;
    }
    const text = fs.readFileSync(abs, "utf8");
    if (!text.includes("## PROMPT EXECUTÁVEL")) {
      fail(`${rel} sem seção ## PROMPT EXECUTÁVEL`);
      continue;
    }
    const afterHeading = text.split("## PROMPT EXECUTÁVEL")[1] || "";
    const fenceMatch = afterHeading.match(/```[^\n]*\n([\s\S]*?)```/);
    if (!fenceMatch || !fenceMatch[1].trim()) {
      fail(`${rel}: PROMPT EXECUTÁVEL sem bloco de código não vazio`);
      continue;
    }
    const block = fenceMatch[1];
    const hasPlaceholder = /\{\{|TODO/.test(block) || /\{\{|TODO/.test(text);
    if (!hasPlaceholder) {
      fail(`${rel}: PROMPT EXECUTÁVEL sem placeholder ({{ ou TODO)`);
      continue;
    }
    if (!/crit[eé]rios?\s+de\s+aceite|autoavalia/i.test(block)) {
      fail(`${rel}: PROMPT EXECUTÁVEL sem critérios de aceite ou autoavaliação`);
      continue;
    }
    if (!/proibi/i.test(block)) {
      fail(`${rel}: PROMPT EXECUTÁVEL sem proibições`);
      continue;
    }
    ok(`PROMPT EXECUTÁVEL contrato mínimo em ${rel}`);
  }
}

/**
 * Validação semântica leve do painel da Fase 2 (heurísticas; não substitui revisão humana).
 */
function checkPainelFase2Semantico() {
  const painelPath = path.join(
    ROOT,
    "programas/discipulando-a-caserna/docs/metodo/02-painel-referencias.md"
  );
  if (!fs.existsSync(painelPath)) {
    fail(
      "painel Fase 2 ausente: programas/discipulando-a-caserna/docs/metodo/02-painel-referencias.md"
    );
    return;
  }
  const before = failures;
  const text = fs.readFileSync(painelPath, "utf8");
  if (!/\*\*Status:\*\*|\bStatus:\s*|EM REVISÃO|APROVADO/i.test(text)) {
    fail("painel F2: status ausente ou irreconhecível");
  }
  const refIds = text.match(/\bREF-\d{2}\b/g) || [];
  const uniqueRefs = new Set(refIds);
  if (uniqueRefs.size < 6 || uniqueRefs.size > 10) {
    fail(
      `painel F2: esperadas 6–10 referências positivas (REF-##); encontradas ${uniqueRefs.size}`
    );
  }
  for (const eixo of ["Estrutura", "Atmosfera", "Detalhe"]) {
    if (!new RegExp(eixo, "i").test(text)) {
      fail(`painel F2: eixo "${eixo}" não mencionado`);
    }
  }
  if (!/\b20\d{2}-\d{2}-\d{2}\b|\bData\b/i.test(text)) {
    fail("painel F2: data de acesso/análise ausente");
  }
  if (!/direitos|licen[cç]a|copyright|fair use|risco de c[oó]pia/i.test(text)) {
    fail("painel F2: menção a direitos/licença ausente");
  }
  if (!/O que extrair|Extrair:/i.test(text)) {
    fail('painel F2: campo "O que extrair" ausente');
  }
  if (!/Por que serve|Por qu[eê] serve/i.test(text)) {
    fail('painel F2: campo "Por que serve" ausente');
  }
  if (!/O que descartar|Descartar:/i.test(text)) {
    fail('painel F2: campo "O que descartar" ausente');
  }
  if (!/Frase de dire[cç][aã]o/i.test(text)) {
    fail("painel F2: seção de frase de direção ausente");
  }
  if (!/[Aa]nti-?refer/i.test(text)) {
    fail("painel F2: seção de anti-referências ausente");
  }
  if (failures === before) ok("painel F2: campos semânticos mínimos presentes");
}

/**
 * Validação semântica leve do Manual do Design System (Fase 4).
 * Exige estrutura mínima quando o status deixa de ser stub/parcial vazio.
 */
function checkManualFase4Semantico() {
  const manualPath = path.join(
    ROOT,
    "programas/discipulando-a-caserna/docs/metodo/04-manual-design-system.md"
  );
  if (!fs.existsSync(manualPath)) {
    fail("manual F4 ausente: docs/metodo/04-manual-design-system.md");
    return;
  }
  const before = failures;
  const text = fs.readFileSync(manualPath, "utf8");
  if (!/\*\*Status:\*\*|\bStatus:\s*/i.test(text)) {
    fail("manual F4: status ausente");
  }
  const isStub = /aguarda Fase 4|Parcial — aguarda/i.test(text) && text.length < 1200;
  if (isStub) {
    ok("manual F4: ainda stub parcial (Fase 4 em andamento)");
    return;
  }
  const requiredBits = [
    [/Princ[ií]pios/i, "princípios"],
    [/camadas|Funda[cç][aã]o|Componente|Padr[aã]o/i, "camadas"],
    [/CMP-|Componentes/i, "índice de componentes"],
    [/PAD-|Padr[oõ]es/i, "índice de padrões"],
    [/WCAG|acessib/i, "acessibilidade"],
    [/CANDIDATO|maturidade|versionamento|governan/i, "governança"],
    [/Definition of Ready|Fase 5/i, "DoR Fase 5"],
    [/tokens\.json|sem[aâ]ntic/i, "relação com tokens"],
  ];
  for (const [re, label] of requiredBits) {
    if (!re.test(text)) fail(`manual F4: seção/campo ausente (${label})`);
  }
  if (
    /\b1\.0\.0\b/.test(text) &&
    /EST[AÁ]VEL|APROVADO/i.test(text) &&
    !/n[aã]o promover|sem.*1\.0\.0|aguarda/i.test(text)
  ) {
    fail("manual F4: promoção 1.0.0/ESTÁVEL sem ressalva humana");
  }
  if (failures === before) ok("manual F4: campos semânticos mínimos presentes");
}

/**
 * Validação semântica leve do estado do protótipo canônico (Fase 5).
 * Não julga qualidade visual; impede canônico fantasma / Fase 6 aberta sem decisão.
 */
function checkFase5EstadoSemantico() {
  const estadoPath = path.join(
    ROOT,
    "programas/discipulando-a-caserna/docs/metodo/fase-5/estado-prototipo-canonico.json"
  );
  const decisaoPath = path.join(
    ROOT,
    "programas/discipulando-a-caserna/docs/metodo/fase-5/decisao-do-prototipo-canonico.md"
  );
  if (!fs.existsSync(estadoPath)) {
    fail("F5: estado-prototipo-canonico.json ausente");
    return;
  }
  if (!fs.existsSync(decisaoPath)) {
    fail("F5: decisao-do-prototipo-canonico.md ausente");
    return;
  }
  const before = failures;
  let estado;
  try {
    estado = readJson(estadoPath);
  } catch (e) {
    fail(`F5: estado JSON inválido: ${e.message}`);
    return;
  }
  const status = String(estado.status || "").toLowerCase();
  const allowed = ["pendente", "candidato", "aprovado", "rejeitado", "retorno-fase-2"];
  if (!allowed.includes(status)) {
    fail(`F5: status inválido (${estado.status}); use ${allowed.join("|")}`);
  }
  const fase6 = String(estado.fase6 || "").toLowerCase();
  if (!["bloqueada", "liberada"].includes(fase6)) {
    fail('F5: fase6 deve ser "bloqueada" ou "liberada"');
  }
  if (status !== "aprovado") {
    if (estado.prototipoCanonico != null) {
      fail("F5: prototipoCanonico deve ser null enquanto status ≠ aprovado");
    }
    if (fase6 !== "bloqueada") {
      fail("F5: fase6 deve permanecer bloqueada até status aprovado + decisão humana");
    }
  } else {
    if (!estado.prototipoCanonico || !estado.path || !estado.data || !estado.responsavel) {
      fail("F5: status aprovado exige prototipoCanonico, path, data e responsavel");
    }
    if (fase6 === "liberada" && !estado.autorizacaoFase6) {
      fail("F5: fase6 liberada exige autorizacaoFase6 true (decisão humana)");
    }
  }
  const decisao = fs.readFileSync(decisaoPath, "utf8");
  if (!/PENDENTE DE DECISÃO|Status:\s*APROVADO|Status:\s*REJEITADO|retorno à Fase 2/i.test(decisao)) {
    fail("F5: decisão MD sem status reconhecível");
  }
  if (status !== "aprovado" && !/NENHUM|BLOQUEADA/i.test(decisao)) {
    fail("F5: enquanto não aprovado, decisão deve declarar canônico NENHUM e Fase 6 BLOQUEADA");
  }
  if (failures === before) ok("F5: estado semântico mínimo presente");
}

function rmRecursive(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

function bootstrapTest() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "metodo-bootstrap-"));
  try {
    const dest = path.join(tmp, "projeto-web");
    fs.cpSync(TEMPLATE_DIR, dest, { recursive: true });
    const required = [
      "01-briefing-estrategico.md",
      "02-painel-referencias.md",
      "03-tokens.json",
      "04-manual-sistema.md",
      "05-regras-agente.md",
    ];
    for (const name of required) {
      const p = path.join(dest, name);
      if (!fs.existsSync(p)) fail(`bootstrap: faltou ${name}`);
      else ok(`bootstrap: ${name}`);
    }
    const tokens = readJson(path.join(dest, "03-tokens.json"));
    if (!tokens.primitivos || !tokens.semanticos) {
      fail("bootstrap: tokens sem primitivos/semanticos");
    } else {
      ok("bootstrap: JSON tokens válido");
    }
    let markerHits = 0;
    for (const name of required) {
      const t = fs.readFileSync(path.join(dest, name), "utf8");
      if (PLACEHOLDER_MARKERS.some((m) => t.includes(m))) markerHits += 1;
    }
    if (markerHits < 4) {
      fail("bootstrap: poucos placeholders/TODO nos templates");
    } else {
      ok(`bootstrap: placeholders presentes (${markerHits}/5 arquivos)`);
    }
    const readme = fs.readFileSync(path.join(dest, "README.md"), "utf8");
    if (!/copiar|Copy-Item|como copiar/i.test(readme)) {
      fail("bootstrap: README sem instruções de cópia");
    } else {
      ok("bootstrap: instruções de início presentes");
    }
  } finally {
    rmRecursive(tmp);
    ok("bootstrap: temp removido");
  }
}

function main() {
  const noBootstrap = process.argv.includes("--no-bootstrap");
  const bootstrap = !noBootstrap;
  console.log("validate:metodo — O Sistema (Fase 0)");
  const manifesto = checkManifest();
  checkIntegracao(manifesto);
  checkTokensTemplate();
  checkNoCanonicalSkills();
  checkPromptExecutavel();
  checkPainelFase2Semantico();
  checkManualFase4Semantico();
  checkFase5EstadoSemantico();
  checkInternalLinks();
  checkSecrets();
  if (bootstrap) bootstrapTest();
  else ok("bootstrap omitido (--no-bootstrap)");
  if (failures > 0) {
    console.error(`\nvalidate:metodo FALHOU com ${failures} problema(s).`);
    process.exit(1);
  }
  console.log("\nvalidate:metodo OK");
}

main();
