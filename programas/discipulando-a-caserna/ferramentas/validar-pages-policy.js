#!/usr/bin/env node
/**
 * Valida a política de publicação no repositório (sem montar _site).
 * npm run validate:pages:policy
 */
"use strict";

const fs = require("fs");
const path = require("path");
const {
  ROOT,
  PAGES_YML,
  PROGRAM_INDEX,
  loadPolitica,
  isPubF5Suspensa,
  normalizePosix,
} = require("./politica-publicacao");

let failures = 0;

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  failures += 1;
}

function ok(msg) {
  console.log(`OK: ${msg}`);
}

function checkEstado() {
  let politica;
  try {
    politica = loadPolitica();
  } catch (e) {
    fail(e.message);
    return null;
  }
  if (politica.pubF5.id !== "PUB-F5-01") fail("pubF5.id deve ser PUB-F5-01");
  if (!isPubF5Suspensa(politica)) {
    fail("PUB-F5-01 deve estar suspensa nesta fase de governança");
  } else {
    ok("PUB-F5-01 suspensa");
  }
  if (String(politica.designSystem?.status).toLowerCase() !== "interno") {
    fail("designSystem.status deve ser interno");
  } else {
    ok("Design System interno");
  }
  if (String(politica.producao?.status).toLowerCase() !== "bloqueada") {
    fail("producao.status deve ser bloqueada");
  } else {
    ok("produção bloqueada");
  }
  const mustForbid = [
    "prospecto-fase-5-v1",
    "design-system",
    "programas/discipulando-a-caserna/prospecto",
  ];
  for (const needle of mustForbid) {
    const hit = (politica.forbidden || []).some((f) =>
      normalizePosix(f).includes(needle)
    );
    if (!hit) fail(`forbidden[] deve incluir ${needle}`);
  }
  for (const surface of politica.surfaces || []) {
    if (normalizePosix(surface).includes("prospecto-fase-5-v1")) {
      fail("surfaces[] não pode incluir prospecto-fase-5-v1 enquanto suspensa");
    }
    if (normalizePosix(surface).includes("design-system")) {
      fail("surfaces[] não pode incluir design-system enquanto suspensa");
    }
  }
  if (failures === 0 || failures < 3) {
    /* keep going */
  }
  ok("allowlist/denylist estrutural");
  return politica;
}

function checkPagesWorkflow(politica) {
  if (!fs.existsSync(PAGES_YML)) {
    fail("pages.yml ausente");
    return;
  }
  const yml = fs.readFileSync(PAGES_YML, "utf8");

  if (!/workflow_run:/.test(yml)) {
    fail("pages.yml deve usar trigger workflow_run");
  } else {
    ok("pages.yml usa workflow_run");
  }

  if (/^\s*workflow_dispatch:\s*$/m.test(yml)) {
    fail("pages.yml não deve ter workflow_dispatch (bypass do gate)");
  } else {
    ok("pages.yml sem workflow_dispatch");
  }

  // push direto no Pages é proibido
  if (/^on:\s*$/m.test(yml)) {
    const onBlock = yml.split(/^on:\s*$/m)[1] || "";
    const untilJobs = onBlock.split(/^permissions:|^concurrency:|^jobs:/m)[0] || onBlock;
    if (/^\s*push:\s*$/m.test(untilJobs) || /^\s*push:\s*\[/m.test(untilJobs)) {
      fail("pages.yml não deve disparar em push direto");
    } else {
      ok("pages.yml sem push direto");
    }
  }

  if (!/workflow_run\.head_sha|github\.event\.workflow_run\.head_sha/.test(yml)) {
    fail("pages.yml deve fazer checkout do head_sha validado");
  } else {
    ok("pages.yml faz checkout do head_sha");
  }

  if (!/workflow_run\.conclusion/.test(yml) || !/success/.test(yml)) {
    fail("pages.yml deve exigir conclusion success");
  } else {
    ok("pages.yml exige Qualidade success");
  }

  if (isPubF5Suspensa(politica)) {
    for (const pattern of politica.workflowForbiddenPatterns || []) {
      if (yml.includes(pattern)) {
        fail(`pages.yml contém padrão proibido enquanto PUB-F5-01 suspensa: ${pattern}`);
      }
    }
    if (/cp\s+-r\s+.*design-system|rsync.*prospecto-fase-5-v1/.test(yml)) {
      fail("pages.yml ainda copia design-system ou prospecto-fase-5-v1");
    }
    if (!yml.includes("build:pages") && !yml.includes("montar-artefato-pages")) {
      fail("pages.yml deve invocar build:pages ou montar-artefato-pages");
    } else {
      ok("pages.yml usa builder allowlist");
    }
  }

  if (
    /(?:^|[\s"'/])metodo(?:\/|["'\s]|$)/.test(yml) &&
    /\b(cp|copy|rsync)\b/i.test(yml)
  ) {
    const copyLines = yml
      .split(/\r?\n/)
      .filter((line) => /\b(cp|copy|rsync)\b/i.test(line));
    const bad = copyLines.filter((line) =>
      /(?:^|[\s"'/])metodo(?:\/|["'\s]|$)/.test(line)
    );
    if (bad.length) fail(`pages.yml parece copiar metodo/: ${bad.join(" | ")}`);
  }
}

function checkPublicIndex(politica) {
  if (!fs.existsSync(PROGRAM_INDEX)) {
    fail("índice do programa ausente");
    return;
  }
  const html = fs.readFileSync(PROGRAM_INDEX, "utf8");
  for (const href of politica.publicIndexForbiddenHrefs || []) {
    const re = new RegExp(
      `href=["'][^"']*${href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
      "i"
    );
    if (re.test(html)) {
      fail(`índice público aponta para path suspenso: ${href}`);
    }
  }
  if (/href=["'][^"']*design-system\//i.test(html)) {
    fail("índice público ainda linka design-system/");
  }
  if (/href=["'][^"']*prospecto-fase-5-v1/i.test(html)) {
    fail("índice público ainda linka prospecto-fase-5-v1");
  }
  if (failures === 0 || !/href=["'][^"']*prospecto-fase-5-v1/i.test(html)) {
    ok("índice público sem hrefs suspensos");
  }
}

function checkRobots() {
  const robots = path.join(ROOT, "robots.txt");
  if (!fs.existsSync(robots)) {
    fail("robots.txt ausente");
    return;
  }
  const text = fs.readFileSync(robots, "utf8");
  if (!/Disallow:\s*\//.test(text)) {
    fail("robots.txt deve Disallow: /");
  } else {
    ok("robots.txt Disallow: /");
  }
  if (/Allow:\s*\/assets\/img\/logo-pdac\//.test(text)) {
    fail("robots.txt contém Allow stale para /assets/img/logo-pdac/");
  }
}

function main() {
  console.log("validate:pages:policy");
  const politica = checkEstado();
  if (politica) {
    checkPagesWorkflow(politica);
    checkPublicIndex(politica);
  }
  checkRobots();
  if (failures) {
    console.error(`\nvalidate:pages:policy FALHOU com ${failures} problema(s).`);
    process.exit(1);
  }
  console.log("\nvalidate:pages:policy OK");
}

if (require.main === module) {
  main();
}

module.exports = { main };
