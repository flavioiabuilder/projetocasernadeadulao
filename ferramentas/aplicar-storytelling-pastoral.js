'use strict';
/**
 * Aplica variante pastoral + fidelidade + a11y ao protótipo storytelling-v1.
 * Uso: node ferramentas/aplicar-storytelling-pastoral.js
 */
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(
  __dirname,
  '..',
  'prototipos',
  'storytelling-v1',
  'index.html'
);

let h = fs.readFileSync(htmlPath, 'utf8');

function replaceOnce(hay, needle, repl, label) {
  const i = hay.indexOf(needle);
  if (i === -1) {
    console.warn('MISS:', label);
    return hay;
  }
  console.log('OK:', label);
  return hay.slice(0, i) + repl + hay.slice(i + needle.length);
}

function replaceAllLiteral(hay, needle, repl, label) {
  if (!hay.includes(needle)) {
    console.warn('MISS ALL:', label);
    return hay;
  }
  const n = hay.split(needle).length - 1;
  console.log('OK ALL:', label, '×' + n);
  return hay.split(needle).join(repl);
}

// --- Meta / head ---
h = replaceOnce(
  h,
  '<title>Discipulando a Caserna — Apresentação institucional</title>',
  '<title>Discipulando a Caserna — Apreciação pastoral (protótipo)</title>\n<meta name="robots" content="noindex,nofollow">',
  'title+noindex'
);
h = replaceOnce(
  h,
  'content="Apresentação institucional autoexplicativa do programa Discipulando a Caserna, do Projeto Caserna de Adulão. Fortaleza, 2026."',
  'content="Documento de trabalho para apreciação pastoral do Discipulando a Caserna (protótipo storytelling). Fortaleza, 2026."',
  'description'
);

// Skip link + focus-visible + print accordion (inject after <style> open rules area)
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
  '@media(prefers-reduced-motion:reduce){*{animation:none !important;transition:none !important}',
  a11yCss +
    '@media(prefers-reduced-motion:reduce){*{animation:none !important;transition:none !important}',
  'a11y-css'
);

// Expand print rules: open accordion, show all matrix rows
h = replaceOnce(
  h,
  '@media print{',
  `@media print{
  .acc{display:block !important}
  .acc .acc-corpo{display:block !important;max-height:none !important;opacity:1 !important}
  .acc.aberto .acc-corpo,.acc .acc-corpo{display:block !important}
  #mtbody tr.oculta{display:table-row !important}
  .slide-pastoral .checklist input{accent-color:#000}
`,
  'print-expand-prefix'
);

// Also ensure .acc-corpo visible - check class names in HTML
if (!h.includes('.acc-corpo')) {
  // anatomia may use different class - patch print for .acc .aberto content
  h = replaceAllLiteral(
    h,
    '.acc.aberto .acc-corpo,.acc .acc-corpo{display:block !important}',
    '.acc > div:not(.acc-cab){display:block !important;max-height:none !important;opacity:1 !important;height:auto !important}',
    'print-acc-fallback'
  );
}

h = replaceOnce(
  h,
  '<body>',
  '<body>\n<a class="skip" href="#deck">Ir para o conteúdo</a>',
  'skip-link'
);

// --- Frase-âncora em S31 (C.3) ---
h = replaceOnce(
  h,
  'E os homens que passaram por lá não voltaram ao lugar anterior: foram além dele.</p></div><p class="fecho">A leitura teológica está feita.',
  'E os homens que passaram por lá não voltaram ao lugar anterior: foram além dele.</p><p class="display">De quebrantados, valentes.</p></div><p class="fecho">A leitura teológica está feita.',
  'anchor-s31'
);

// --- S33: marcar lacunas institucionais ---
h = replaceOnce(
  h,
  '<h2>O que é o Projeto Caserna de Adulão</h2><p>O Projeto Caserna de Adulão é um programa de evangelização e discipulado voltado aos profissionais de segurança pública, com atuação prioritária junto a militares estaduais.</p><p>Ele é vinculado à Casa de Oração para Todos os Povos, opera sob liderança pastoral definida e possui personalidade jurídica própria. Não é uma iniciativa informal, nem depende de uma única pessoa para continuar existindo — e as duas coisas foram decisões conscientes desde o início.</p></div><div class="figura"><ul class="ficha"><li><span class="rotulo">NATUREZA</span>Programa de evangelização e discipulado</li><li><span class="rotulo">VÍNCULO ECLESIÁSTICO</span>Casa de Oração para Todos os Povos</li><li><span class="rotulo">PÚBLICO</span>Profissionais de segurança pública</li><li><span class="rotulo">PERSONALIDADE JURÍDICA</span>Constituída · CNPJ 63.724.286/0001-78</li></ul></div>',
  `<h2>O que é o Projeto Caserna de Adulão</h2><p class="selo-estudo">Estudo · pendente de validação pastoral</p><p>O Projeto Caserna de Adulão é um programa de evangelização e discipulado voltado aos profissionais de segurança pública, com atuação prioritária junto a militares estaduais.</p><p>Opera sob liderança pastoral definida e possui CNPJ próprio. A formulação completa do vínculo eclesiástico e da governança institucional permanece em validação neste documento de trabalho — e não deve ser lida como estatuto homologado.</p></div><div class="figura"><ul class="ficha"><li><span class="rotulo">NATUREZA</span>Programa de evangelização e discipulado</li><li><span class="rotulo">VÍNCULO ECLESIÁSTICO</span><span class="selo-estudo">Estudo</span> Casa de Oração para Todos os Povos</li><li><span class="rotulo">PÚBLICO</span>Profissionais de segurança pública</li><li><span class="rotulo">CNPJ</span>63.724.286/0001-78</li></ul></div>`,
  's33-fidelity'
);

// --- S34: marcar P1–P9 ---
h = replaceOnce(
  h,
  '<h2>Por que uma estrutura em setores</h2><p>O projeto se organiza em setores nomeados de P1 a P9, seguindo a lógica de estado-maior que qualquer militar reconhece imediatamente.</p>',
  '<h2>Por que uma estrutura em setores</h2><p class="selo-estudo">Estudo · estrutura em validação</p><p>O projeto propõe organizar-se em setores nomeados de P1 a P9, seguindo a lógica de estado-maior que qualquer militar reconhece imediatamente. Esta divisão setorial ainda não está consolidada nas fontes canônicas do repositório de apresentação.</p>',
  's34-fidelity'
);

// --- Voz pastoral: endereçamento (não tocar vocês bíblico nem exemplos da lição) ---
const voicePairs = [
  [
    'vale explicar o que você tem em mãos.',
    'vale explicar o que o senhor tem em mãos.'
  ],
  [
    'Você pode parar quando quiser e retomar depois — o documento lembra onde você estava.',
    'O senhor pode parar quando quiser e retomar depois — o documento lembra onde o senhor estava.'
  ],
  [
    'Você não precisa decidir nada durante o caminho',
    'O senhor não precisa decidir nada durante o caminho'
  ],
  [
    'Deixe eu apresentar a você o homem',
    'Deixe eu apresentar ao senhor o homem'
  ],
  [
    'Se você perguntar a esse homem',
    'Se o senhor perguntar a esse homem'
  ],
  [
    'Você já esteve nele, no início desta apresentação.',
    'O senhor já esteve nele, no início desta apresentação.'
  ],
  [
    'o militar recluso que você conheceu no início',
    'o militar recluso que o senhor conheceu no início'
  ],
  [
    'E se você olhar para o alto desta página',
    'E se o senhor olhar para o alto desta página'
  ],
  [
    'conforme você avança.',
    'conforme o senhor avança.'
  ],
  [
    'Você pode percorrer no seu ritmo',
    'O senhor pode percorrer no seu ritmo'
  ],
  [
    'o que você vê aqui é o mapa.',
    'o que o senhor vê aqui é o mapa.'
  ],
  [
    'Você viu esta imagem na primeira tela',
    'O senhor viu esta imagem na primeira tela'
  ],
  [
    'Tudo o que você viu até aqui',
    'Tudo o que o senhor viu até aqui'
  ],
  [
    'Porque, como você leu no começo desta apresentação',
    'Porque, como o senhor leu no começo desta apresentação'
  ]
];

for (const [a, b] of voicePairs) {
  h = replaceOnce(h, a, b, 'voice:' + a.slice(0, 36));
}

// localStorage key isolada
h = replaceAllLiteral(h, "dac_pos", "dac_story_v1_pos", 'storage-key');

// Scroll sem smooth sob reduced motion
h = replaceOnce(
  h,
  "function vai(d){var i=Math.min(slides.length-1,Math.max(0,atual+d));\n    slides[i].scrollIntoView({behavior:'smooth'});}",
  "function vai(d){var i=Math.min(slides.length-1,Math.max(0,atual+d));\n    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;\n    slides[i].scrollIntoView({behavior:reduce?'auto':'smooth'});}",
  'scroll-reduced-motion'
);

// --- Slides pastorais após S63 ---
if (h.includes('id="s63a"')) {
  console.log('SKIP: pastoral slides already present');
} else {
const pastoralBlock = `
<section class="slide l-L2 bg-base slide-pastoral" id="s63a" data-ato="9" data-arm="4" aria-label="Pedidos pastorais">
<div class="quadro"><div class="texto larga">
<h2>Pastor, o Guia está em v1.0-RC. Nenhum conteúdo é final antes da sua homologação.</h2>
<p class="intro">Chego ao ponto em que esta apresentação deixa de ser apenas informativa. Nada do que o senhor viu aqui é definitivo. O Guia Mestre está em versão candidata; as doze lições do Módulo 1 estão escritas, mas não homologadas; os Módulos 2 a 4 estão planejados, e sua produção não começa antes da sua palavra.</p>
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
<p>Há uma página do Guia Mestre que continua em branco por decisão minha: o prefácio.</p>
<p>Não é uma formalidade de abertura, e não peço que seja escrito por cortesia. O Guia descreve um método, mas quem pode dizer se esse método é fiel ao Cristo das Escrituras — e se serve de fato aos homens para quem foi escrito — não é o autor. É o pastor que acompanhou a obra desde a origem, que conhece os nomes por trás dos exemplos e que responderá diante de Deus pelo que for ensinado em seu nome.</p>
<p>Por isso, aquela página não foi preenchida com texto provisório à espera de aprovação. Está reservada, e permanecerá reservada pelo tempo que for necessário. <strong>Não há prazo.</strong> Se o senhor entender que o material ainda não está em condições de receber esse prefácio, essa também será uma resposta — e uma resposta que eu acolherei.</p>
<p>Quando quiser escrevê-lo, basta enviar o texto. Ele entra no Guia exatamente como o senhor o redigir, sem edição de conteúdo, acima da minha nota de autor.</p>
</div>
</div></div></section>
<section class="slide l-L2 bg-caserna slide-pastoral" id="s63c" data-ato="9" data-arm="4" aria-label="Se a resposta for não">
<div class="quadro"><div class="texto larga">
<h2>Se o senhor entender que não é hora, ou que não é assim.</h2>
<p>Este material está em versão candidata. Ele não foi impresso para distribuição ampla sob homologação, e nada precisa ser desfeito.</p>
<p>Se a resposta for <strong>“ainda não”</strong>, o material aguarda.<br>
Se for <strong>“não desse jeito”</strong>, eu reviso — e prefiro revisar agora.<br>
Se for <strong>“não”</strong>, o trabalho não terá sido perdido: ele já serviu para organizar o que aprendi.</p>
<p>Não há prazo, não há compromisso assumido com terceiros e não há nada em curso que dependa de uma resposta rápida.</p>
<p class="depois">Fico à disposição para o que o senhor determinar.</p>
<p class="nota-slide">Obr. Flávio Alves da Costa · casernadeadulao@gmail.com</p>
</div></div></section>
`;

// Insert before s64
const s64 = h.indexOf('id="s64"');
if (s64 === -1) {
  console.warn('MISS: s64');
} else {
  const start = h.lastIndexOf('<section', s64);
  h = h.slice(0, start) + pastoralBlock + h.slice(start);
  console.log('OK: pastoral slides before s64');
}
}

// Update rodapé if present
h = replaceAllLiteral(
  h,
  'Discipulando a Caserna · Projeto Caserna de Adulão · v1.0',
  'Discipulando a Caserna · Apreciação pastoral · protótipo storytelling v1',
  'rodape'
);

// Indice: add pastoral entries if indice lists atos only - skip if complex

fs.writeFileSync(htmlPath, h, 'utf8');
console.log('Wrote', htmlPath, 'bytes', Buffer.byteLength(h, 'utf8'));

// Verify
const v = fs.readFileSync(htmlPath, 'utf8');
console.log('anchor count', (v.match(/De quebrantados, valentes/g) || []).length);
console.log('voce restante (excl. exemplos lição?)', (v.match(/você/gi) || []).length);
console.log('vocês', (v.match(/vocês/gi) || []).length);
console.log('s63a', v.includes('id="s63a"'));
console.log('noindex', v.includes('noindex'));
console.log('focus-visible', v.includes('focus-visible'));
console.log('skip', v.includes('class="skip"'));
console.log('slides', (v.match(/class="slide /g) || []).length);
