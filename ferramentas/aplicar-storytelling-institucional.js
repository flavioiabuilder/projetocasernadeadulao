"use strict";
/**
 * Pipeline do protótipo storytelling-v1: fidelidade + a11y + voz institucional.
 * Parte do HTML em prototipos/storytelling-v1/index.html (cópia de docs/storytelling).
 * Uso: node ferramentas/aplicar-storytelling-institucional.js
 *
 * Para só ajustar a voz num deck já patchado:
 *   node ferramentas/aplicar-storytelling-voz-institucional.js
 */
const fs = require("fs");
const path = require("path");

pipeline: {
  const htmlPath = path.join(
    __dirname,
    "..",
    "prototipos",
    "storytelling-v1",
    "index.html"
  );

  let h = fs.readFileSync(htmlPath, "utf8");

  function replaceOnce(hay, needle, repl, label) {
    const i = hay.indexOf(needle);
    if (i === -1) {
      console.warn("MISS:", label);
      return hay;
    }
    console.log("OK:", label);
    return hay.slice(0, i) + repl + hay.slice(i + needle.length);
  }

  function replaceAllLiteral(hay, needle, repl, label) {
    if (!hay.includes(needle)) {
      console.warn("MISS ALL:", label);
      return hay;
    }
    const n = hay.split(needle).length - 1;
    console.log("OK ALL:", label, "×" + n);
    return hay.split(needle).join(repl);
  }

  // --- Meta ---
  if (h.includes("Apreciação pastoral (protótipo)")) {
    h = replaceOnce(
      h,
      "<title>Discipulando a Caserna — Apreciação pastoral (protótipo)</title>",
      "<title>Discipulando a Caserna — Apresentação institucional (protótipo)</title>",
      "title-from-pastoral"
    );
  } else if (
    h.includes("<title>Discipulando a Caserna — Apresentação institucional</title>") &&
    !h.includes("noindex")
  ) {
    h = replaceOnce(
      h,
      "<title>Discipulando a Caserna — Apresentação institucional</title>",
      '<title>Discipulando a Caserna — Apresentação institucional (protótipo)</title>\n<meta name="robots" content="noindex,nofollow">',
      "title+noindex-from-source"
    );
  } else if (!h.includes("noindex")) {
    h = replaceOnce(
      h,
      '<meta charset="utf-8">',
      '<meta charset="utf-8">\n<meta name="robots" content="noindex,nofollow">',
      "noindex-inject"
    );
  }

  // Mantém os metadados de compartilhamento e a canonical após reaplicar a pipeline.
  const socialMetadata = `<meta property="og:type" content="article">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Projeto Caserna de Adulão">
<meta property="og:title" content="Discipulando a Caserna — apresentação para apreciação pastoral">
<meta property="og:description" content="Documento de trabalho em versão candidata. Leitura de cerca de 30 minutos, sem necessidade de apresentador.">
<meta property="og:image" content="https://flavioiabuilder.github.io/projetocasernadeadulao/assets/img/logo-pdac/LOGO_DaC_Master_Flat_2D_Color.png">
<meta property="og:image:alt" content="Escudo do Projeto Caserna de Adulão">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://flavioiabuilder.github.io/projetocasernadeadulao/prototipos/storytelling-v1/">`;

  if (!h.includes('property="og:type"')) {
    h = replaceOnce(
      h,
      '<meta name="author" content="Obr. Flávio Alves da Costa">',
      '<meta name="author" content="Obr. Flávio Alves da Costa">\n' + socialMetadata,
      "social-metadata"
    );
  } else {
    console.log("SKIP: social metadata already present");
  }

  h = replaceAllLiteral(
    h,
    "Discipulando a Caserna · Apreciação pastoral · protótipo storytelling v1",
    "Discipulando a Caserna · Apresentação institucional · protótipo storytelling v1",
    "rodape-from-pastoral"
  );
  h = replaceAllLiteral(
    h,
    "Discipulando a Caserna · Projeto Caserna de Adulão · v1.0",
    "Discipulando a Caserna · Apresentação institucional · protótipo storytelling v1",
    "rodape-from-source"
  );

  // --- A11y (idempotente) ---
  if (!h.includes('class="skip"')) {
    const a11yCss = `
a.skip{position:absolute;left:-9999px;top:0;z-index:100;padding:.6rem 1rem;background:var(--latao);color:#fff;font-family:var(--sans);font-size:.85rem}
a.skip:focus{left:var(--mx);top:.5rem}
:focus-visible{outline:2px solid var(--latao);outline-offset:3px}
button:focus:not(:focus-visible),a:focus:not(:focus-visible){outline:none}
.selo-estudo{display:inline-block;margin:.35rem 0 .75rem;padding:.2rem .55rem;border:1px dashed var(--latao);font-family:var(--sans);font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--latao)}
.bg-caserna .selo-estudo,.bg-sombra .selo-estudo{border-color:var(--latao);color:var(--base)}
.slide-pastoral .checklist{list-style:none;padding:0;margin:1rem 0}
.slide-pastoral .checklist li{margin:0 0 .85rem;min-height:44px}
.slide-pastoral .checklist label{display:flex;gap:.65rem;align-items:flex-start;cursor:pointer;font-size:1rem;line-height:1.45}
.slide-pastoral .checklist input{width:1.2rem;height:1.2rem;margin-top:.2rem;flex-shrink:0;accent-color:var(--caserna)}
.slide-pastoral .convite{margin-top:1.25rem;padding:1.1rem 1.2rem;border-left:3px solid var(--latao);background:rgba(140,106,70,.08)}
.slide-pastoral .convite-rotulo{font-family:var(--sans);font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--latao);margin:0 0 .4rem}
.slide-pastoral .convite h3{margin:.2rem 0 .75rem;font-size:1.35rem}
`;
    h = replaceOnce(
      h,
      "@media(prefers-reduced-motion:reduce){*{animation:none !important;transition:none !important}",
      a11yCss +
        "@media(prefers-reduced-motion:reduce){*{animation:none !important;transition:none !important}",
      "a11y-css"
    );
    h = replaceOnce(
      h,
      "@media print{",
      `@media print{
  .acc{display:block !important}
  .acc .acc-corpo{display:block !important;max-height:none !important;opacity:1 !important}
  .acc.aberto .acc-corpo,.acc .acc-corpo{display:block !important}
  #mtbody tr.oculta{display:table-row !important}
  .slide-pastoral .checklist input{accent-color:#000}
`,
      "print-expand"
    );
    h = replaceOnce(
      h,
      "<body>",
      '<body>\n<a class="skip" href="#deck">Ir para o conteúdo</a>',
      "skip-link"
    );
  } else {
    console.log("SKIP: a11y already present");
  }

  // --- Fidelidade S31 / S33 / S34 ---
  if (
    !h.includes('id="s31"') ||
    !h
      .slice(h.indexOf('id="s31"'), h.indexOf('id="s31"') + 900)
      .includes("De quebrantados, valentes")
  ) {
    h = replaceOnce(
      h,
      'E os homens que passaram por lá não voltaram ao lugar anterior: foram além dele.</p></div><p class="fecho">A leitura teológica está feita.',
      'E os homens que passaram por lá não voltaram ao lugar anterior: foram além dele.</p><p class="display">De quebrantados, valentes.</p></div><p class="fecho">A leitura teológica está feita.',
      "anchor-s31"
    );
  } else {
    console.log("SKIP: anchor s31");
  }

  if (h.includes("Casa de Oração para Todos os Povos") && !h.includes("selo-estudo")) {
    h = replaceOnce(
      h,
      '<h2>O que é o Projeto Caserna de Adulão</h2><p>O Projeto Caserna de Adulão é um programa de evangelização e discipulado voltado aos profissionais de segurança pública, com atuação prioritária junto a militares estaduais.</p><p>Ele é vinculado à Casa de Oração para Todos os Povos, opera sob liderança pastoral definida e possui personalidade jurídica própria. Não é uma iniciativa informal, nem depende de uma única pessoa para continuar existindo — e as duas coisas foram decisões conscientes desde o início.</p></div><div class="figura"><ul class="ficha"><li><span class="rotulo">NATUREZA</span>Programa de evangelização e discipulado</li><li><span class="rotulo">VÍNCULO ECLESIÁSTICO</span>Casa de Oração para Todos os Povos</li><li><span class="rotulo">PÚBLICO</span>Profissionais de segurança pública</li><li><span class="rotulo">PERSONALIDADE JURÍDICA</span>Constituída · CNPJ 63.724.286/0001-78</li></ul></div>',
      `<h2>O que é o Projeto Caserna de Adulão</h2><p class="selo-estudo">Estudo · pendente de validação pastoral</p><p>O Projeto Caserna de Adulão é um programa de evangelização e discipulado voltado aos profissionais de segurança pública, com atuação prioritária junto a militares estaduais.</p><p>A condução pastoral do trabalho está estabelecida na prática desde a origem. Possui CNPJ próprio. A formalização estatutária do vínculo eclesiástico é o que permanece em validação neste documento — e não deve ser lida como estatuto homologado.</p></div><div class="figura"><ul class="ficha"><li><span class="rotulo">NATUREZA</span>Programa de evangelização e discipulado</li><li><span class="rotulo">VÍNCULO ECLESIÁSTICO</span><span class="selo-estudo">Estudo</span> Casa de Oração para Todos os Povos</li><li><span class="rotulo">PÚBLICO</span>Profissionais de segurança pública</li><li><span class="rotulo">CNPJ</span>63.724.286/0001-78</li></ul></div>`,
      "s33-fidelity"
    );
  } else {
    console.log("SKIP: s33 fidelity");
  }

  if (
    h.includes("O projeto se organiza em setores nomeados de P1 a P9") &&
    !h.includes("Estudo · estrutura em validação")
  ) {
    h = replaceOnce(
      h,
      "<h2>Por que uma estrutura em setores</h2><p>O projeto se organiza em setores nomeados de P1 a P9, seguindo a lógica de estado-maior que qualquer militar reconhece imediatamente.</p>",
      '<h2>Por que uma estrutura em setores</h2><p class="selo-estudo">Estudo · estrutura em validação</p><p>O projeto propõe organizar-se em setores nomeados de P1 a P9, seguindo a lógica de estado-maior que qualquer militar reconhece imediatamente. Esta divisão setorial ainda não está consolidada nas fontes canônicas do repositório de apresentação.</p>',
      "s34-fidelity"
    );
  } else {
    console.log("SKIP: s34 fidelity");
  }

  // Voz: remover "senhor" de endereçamento (mantém Senhor teológico)
  // Encaminha ao script dedicado se ainda houver endereçamento pastoral
  if (/\bo senhor\b|\bO senhor\b|\bao senhor\b/.test(h) || h.includes("Pastor, o Guia")) {
    fs.writeFileSync(htmlPath, h, "utf8");
    console.log("→ aplicando voz institucional…");
    require("./aplicar-storytelling-voz-institucional.js");
    break pipeline;
  }

  // Storage / motion
  h = replaceAllLiteral(h, "dac_pos", "dac_story_v1_pos", "storage-key");
  h = replaceOnce(
    h,
    "function vai(d){var i=Math.min(slides.length-1,Math.max(0,atual+d));\n    slides[i].scrollIntoView({behavior:'smooth'});}",
    "function vai(d){var i=Math.min(slides.length-1,Math.max(0,atual+d));\n    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;\n    slides[i].scrollIntoView({behavior:reduce?'auto':'smooth'});}",
    "scroll-reduced-motion"
  );

  const institutionalBlock = `
<section class="slide l-L2 bg-base slide-pastoral" id="s63a" data-ato="9" data-arm="4" aria-label="Estado de homologação">
<div class="quadro"><div class="texto larga">
<h2>O Guia está em v1.0-RC. Nenhum conteúdo é final antes da homologação pastoral.</h2>
<p class="intro">Neste ponto a apresentação deixa de ser apenas informativa. Nada do que se viu até aqui é definitivo. O Guia Mestre está em versão candidata; as doze lições do Módulo 1 estão escritas, mas não homologadas; os Módulos 2 a 4 estão planejados, e sua produção não começa antes da palavra da liderança pastoral.</p>
<ul class="checklist">
<li><label><input type="checkbox"> <span>Apreciação doutrinária e pastoral do Módulo 1 (doze lições, edições Aluno e Instrutor)</span></label></li>
<li><label><input type="checkbox"> <span>Homologação do Guia Mestre v1.0-RC → v1.0</span></label></li>
<li><label><input type="checkbox"> <span>Liberação para produção dos Módulos 2 a 4</span></label></li>
</ul>
<p class="depois">Essa dependência não é formalidade de organograma. É a convicção de que material teológico entregue a homens em situação de fragilidade precisa passar por olhos pastorais antes de chegar às mãos deles.</p>
</div></div></section>
<section class="slide l-L2 bg-base slide-pastoral" id="s63b" data-ato="9" data-arm="4" aria-label="Convite ao prefácio">
<div class="quadro"><div class="texto larga">
<h2>O portão pastoral</h2>
<div class="convite">
<p class="convite-rotulo">Convite</p>
<h3>O prefácio</h3>
<p>Há uma página do Guia Mestre que continua em branco por decisão do autor: o prefácio.</p>
<p>Não é uma formalidade de abertura, e não se pede que seja escrito por cortesia. O Guia descreve um método, mas quem pode dizer se esse método é fiel ao Cristo das Escrituras — e se serve de fato aos homens para quem foi escrito — não é o autor. É a liderança pastoral que acompanhou a obra desde a origem, que conhece os nomes por trás dos exemplos e que responderá diante de Deus pelo que for ensinado em seu nome.</p>
<p>Por isso, aquela página não foi preenchida com texto provisório à espera de aprovação. Está reservada, e permanecerá reservada pelo tempo que for necessário. <strong>Não há prazo.</strong> Se a liderança pastoral entender que o material ainda não está em condições de receber esse prefácio, essa também será uma resposta — e uma resposta que será acolhida.</p>
<p>Quando o texto for enviado, entra no Guia exatamente como for redigido, sem edição de conteúdo, acima da nota de autor.</p>
</div>
</div></div></section>
<section class="slide l-L2 bg-caserna slide-pastoral" id="s63c" data-ato="9" data-arm="4" aria-label="Se a resposta for não">
<div class="quadro"><div class="texto larga">
<h2>Se a decisão for que ainda não é hora, ou que não é assim.</h2>
<p>Este material está em versão candidata. Ele não foi impresso para distribuição ampla sob homologação, e nada precisa ser desfeito.</p>
<p>Se a resposta for <strong>“ainda não”</strong>, o material aguarda.<br>
Se for <strong>“não desse jeito”</strong>, o texto será revisado — e é preferível revisar agora.<br>
Se for <strong>“não”</strong>, o trabalho não terá sido perdido: ele já serviu para organizar o que foi aprendido.</p>
<p>Não há prazo, não há compromisso assumido com terceiros e não há nada em curso que dependa de uma resposta rápida.</p>
<p class="depois">O autor permanece à disposição da liderança para o que for determinado.</p>
<p class="nota-slide">Obr. Flávio Alves da Costa · casernadeadulao@gmail.com</p>
</div></div></section>
`;

  if (h.includes('id="s63a"')) {
    if (
      h.includes("Pastor, o Guia") ||
      /\bo senhor\b/.test(h.slice(h.indexOf('id="s63a"'), h.indexOf('id="s64"')))
    ) {
      const start = h.indexOf(
        '<section class="slide l-L2 bg-base slide-pastoral" id="s63a"'
      );
      const end = h.indexOf('<section class="slide', h.indexOf('id="s64"') - 50);
      const end2 = h.indexOf('id="s64"');
      const secStart = h.lastIndexOf("<section", end2);
      if (start !== -1 && secStart !== -1) {
        h = h.slice(0, start) + institutionalBlock + h.slice(secStart);
        console.log("OK: replaced s63a–c with institutional");
      }
    } else {
      console.log("SKIP: s63a–c already institutional");
    }
  } else {
    const s64 = h.indexOf('id="s64"');
    if (s64 === -1) console.warn("MISS: s64");
    else {
      const start = h.lastIndexOf("<section", s64);
      h = h.slice(0, start) + institutionalBlock + h.slice(start);
      console.log("OK: inserted s63a–c");
    }
  }

  fs.writeFileSync(htmlPath, h, "utf8");
  console.log("Wrote", htmlPath);

  const v = fs.readFileSync(htmlPath, "utf8");
  const endereco = (v.match(/\bo senhor\b|\bO senhor\b|\bao senhor\b/g) || []).length;
  console.log("endereçamento senhor:", endereco);
  console.log("Pastor, vocative:", v.includes("Pastor, o Guia"));
  console.log("s63a", v.includes('id="s63a"'));
  console.log("você", (v.match(/você/gi) || []).length);
  console.log("vocês", (v.match(/vocês/gi) || []).length);
}
