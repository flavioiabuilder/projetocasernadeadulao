"use strict";
/**
 * Patches históricos da auditoria visual (idempotentes).
 * Opera no protótipo multiarquivo (index.html + css/ + js/).
 */
const fs = require("fs");
const paths = require("./_storytelling-paths");

const files = {
  html: fs.readFileSync(paths.html, "utf8"),
  tokens: fs.readFileSync(paths.css.tokens, "utf8"),
  layout: fs.readFileSync(paths.css.layout, "utf8"),
  components: fs.readFileSync(paths.css.components, "utf8"),
  deck: fs.readFileSync(paths.js.deck, "utf8"),
  shine: fs.readFileSync(paths.js.shine, "utf8"),
};

function onceIn(key, needle, repl, label) {
  const hay = files[key];
  if (!hay.includes(needle)) {
    console.warn("MISS:", label, "(" + key + ")");
    return false;
  }
  files[key] = hay.replace(needle, repl);
  console.log("OK:", label);
  return true;
}

function onceAny(needle, repl, label, keys) {
  const order = keys || ["html", "tokens", "layout", "components", "deck", "shine"];
  for (let i = 0; i < order.length; i++) {
    if (files[order[i]].includes(needle)) {
      return onceIn(order[i], needle, repl, label);
    }
  }
  console.warn("MISS:", label);
  return false;
}

onceAny("--barra:46px;", "--barra:44px;", "barra-44", ["tokens", "layout"]);

onceAny(
  ".arm-ic{opacity:.28;transition:opacity .5s}\n.arm-ic.on{opacity:1}",
  `.arm-ic{opacity:.32;transition:opacity .35s,color .35s;color:var(--estrut)}
.arm-ic.on{opacity:1;color:var(--latao)}
.arm-ic.on svg{filter:none}
body.chrome-escuro .arm-ic{color:rgba(244,244,241,.35)}
body.chrome-escuro .arm-ic.on{color:var(--latao)}`,
  "arm-fill",
  ["layout"]
);

onceAny(
  `.nav-l,.nav-r{position:fixed;top:50%;transform:translateY(-50%);z-index:57;background:none;min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center;
  border:0;cursor:pointer;padding:16px 10px;color:var(--estrut);opacity:.34;transition:.25s}
.nav-l:hover,.nav-r:hover{opacity:1}
.nav-l{left:6px}.nav-r{right:6px}
.nav-l svg,.nav-r svg{display:block;width:18px;height:18px}
.slide.bg-sombra ~ .x{}
@media(max-width:900px){.nav-l,.nav-r{top:auto;bottom:10px;transform:none}
  .nav-l{left:var(--mx)}.nav-r{right:var(--mx)}}`,
  `.nav-l,.nav-r{position:fixed;top:50%;transform:translateY(-50%);z-index:57;background:none;min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center;
  border:0;cursor:pointer;padding:16px 10px;color:var(--estrut);opacity:.4;transition:opacity .25s,color .25s}
.nav-l:hover,.nav-r:hover{opacity:1}
.nav-l{left:6px}.nav-r{right:6px}
.nav-l svg,.nav-r svg{display:block;width:18px;height:18px}
body.chrome-escuro .nav-l,body.chrome-escuro .nav-r{color:rgba(244,244,241,.82);opacity:.55}
body.chrome-escuro .nav-l:hover,body.chrome-escuro .nav-r:hover{opacity:1}
@media(max-width:900px){
  .slide{padding-bottom:calc(8vh + 56px)}
  .nav-l,.nav-r{top:auto;bottom:14px;transform:none;z-index:58}
  .nav-l{left:var(--mx)}.nav-r{right:var(--mx)}
}`,
  "nav-escura-mobile",
  ["layout"]
);

onceAny(
  `.nota-slide{position:absolute;bottom:5.4vh;right:var(--mx);font-family:var(--sans);font-size:11px;
  letter-spacing:.06em;color:var(--estrut);opacity:.62;margin:0;max-width:44ch;text-align:right}
.bg-sombra .nota-slide,.bg-caserna .nota-slide{color:rgba(244,244,241,.55)}
.fecho{position:absolute;bottom:5.2vh;left:var(--mx);right:var(--mx);text-align:center;
  font-size:15px;font-style:italic;color:var(--estrut);opacity:.72;margin:0;max-width:none;
  padding-top:16px;border-top:1px solid rgba(74,74,74,.16)}
.bg-sombra .fecho,.bg-caserna .fecho{color:rgba(244,244,241,.62);border-top-color:rgba(244,244,241,.18)}`,
  `.nota-slide{position:static;display:block;margin:28px 0 0;font-family:var(--sans);font-size:11px;
  letter-spacing:.06em;color:var(--estrut);opacity:.72;max-width:44ch;text-align:left}
.bg-sombra .nota-slide,.bg-caserna .nota-slide{color:rgba(244,244,241,.55)}
.fecho{position:static;display:block;text-align:center;font-size:15px;font-style:italic;
  color:var(--estrut);opacity:.78;margin:36px auto 0;max-width:52ch;
  padding-top:18px;border-top:1px solid rgba(74,74,74,.16)}
.bg-sombra .fecho,.bg-caserna .fecho{color:rgba(244,244,241,.62);border-top-color:rgba(244,244,241,.18)}`,
  "fecho-nota-fluxo",
  ["components", "layout"]
);

onceAny(
  ".display{font-size:clamp(24px,3.4vw,50px);line-height:1.22;margin:34px 0 0;max-width:22ch;font-weight:500}",
  ".display{font-size:clamp(40px,5.2vw,76px);line-height:1.18;margin:34px 0 0;max-width:18ch;font-weight:500}",
  "display-d1",
  ["components", "layout"]
);

onceAny(
  `.cards.g5{grid-template-columns:repeat(5,1fr)}
@media(max-width:1000px){.cards.g4,.cards.g5{grid-template-columns:repeat(2,1fr)}
  .cards.g3{grid-template-columns:repeat(2,1fr)}}
@media(max-width:620px){.cards{grid-template-columns:1fr !important}}`,
  `.cards.g5{grid-template-columns:repeat(5,1fr)}
@media(max-width:1100px){.cards.g5{grid-template-columns:repeat(3,1fr)}}
@media(max-width:1000px){.cards.g4{grid-template-columns:repeat(2,1fr)}
  .cards.g5{grid-template-columns:repeat(2,1fr)}
  .cards.g3{grid-template-columns:repeat(2,1fr)}}
@media(max-width:620px){.cards{grid-template-columns:1fr !important}}`,
  "cards-g5",
  ["components", "layout"]
);

onceAny(
  ".emblema-grande{max-width:min(300px,34vh)}",
  `.emblema-grande{max-width:min(300px,34vh);opacity:0;animation:emblemaIn 1.2s ease forwards}
@keyframes emblemaIn{to{opacity:1}}
@media(prefers-reduced-motion:reduce){.emblema-grande{opacity:1;animation:none}}`,
  "s01-fade",
  ["components", "layout"]
);

onceAny(
  ".slide.visivel .quadro>*>*,.slide.visivel .bloco-central>*{animation:sobe .42s both}",
  `.slide.visivel .quadro>*>*,.slide.visivel .bloco-central>*{animation:sobe .4s both}
.slide.visivel .quadro>*>*:nth-child(1),.slide.visivel .bloco-central>*:nth-child(1){animation-delay:0ms}
.slide.visivel .quadro>*>*:nth-child(2),.slide.visivel .bloco-central>*:nth-child(2){animation-delay:80ms}
.slide.visivel .quadro>*>*:nth-child(3),.slide.visivel .bloco-central>*:nth-child(3){animation-delay:160ms}
.slide.visivel .quadro>*>*:nth-child(4),.slide.visivel .bloco-central>*:nth-child(4){animation-delay:240ms}
.slide.visivel .quadro>*>*:nth-child(5),.slide.visivel .bloco-central>*:nth-child(5){animation-delay:320ms}
.slide.visivel .quadro>*>*:nth-child(n+6),.slide.visivel .bloco-central>*:nth-child(n+6){animation-delay:400ms}`,
  "stagger",
  ["layout", "components"]
);

onceAny(
  "a.skip{position:absolute;left:-9999px;top:0;z-index:100;padding:.6rem 1rem;background:var(--latao);color:#fff;font-family:var(--sans);font-size:.85rem}",
  `.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
a.skip{position:absolute;left:-9999px;top:0;z-index:100;padding:.6rem 1rem;background:var(--latao);color:#fff;font-family:var(--sans);font-size:.85rem}`,
  "sr-only-css",
  ["layout", "components"]
);

onceIn(
  "html",
  '<a class="skip" href="#deck">Ir para o conteúdo</a>',
  `<a class="skip" href="#deck">Ir para o conteúdo</a>
<h1 class="sr-only">Discipulando a Caserna — Apresentação institucional</h1>`,
  "h1"
);

onceAny(
  `    var escuro=s.className.indexOf('bg-sombra')>-1||s.className.indexOf('bg-caserna')>-1||s.className.indexOf('bg-transicao')>-1;
    topo.classList.toggle('escuro',escuro);
    var semC=s.className.indexOf('sem-chrome')>-1;
    topo.classList.toggle('oculto',semC);
    rodape.classList.toggle('oculto',semC);
    rodape.classList.toggle('claro',escuro);`,
  `    var escuroPuro=s.className.indexOf('bg-sombra')>-1||s.className.indexOf('bg-caserna')>-1;
    var transicao=s.className.indexOf('bg-transicao')>-1;
    var topoEscuro=escuroPuro||transicao;
    topo.classList.toggle('escuro',topoEscuro);
    document.body.classList.toggle('chrome-escuro',topoEscuro);
    var semC=s.className.indexOf('sem-chrome')>-1;
    topo.classList.toggle('oculto',semC);
    rodape.classList.toggle('oculto',semC);
    rodape.classList.toggle('claro',escuroPuro);`,
  "chrome-hibrido",
  ["deck"]
);

onceAny(
  `  document.addEventListener('keydown',function(e){
    if(e.key==='ArrowDown'||e.key==='PageDown'||e.key===' '){e.preventDefault();vai(1);}
    if(e.key==='ArrowUp'||e.key==='PageUp'){e.preventDefault();vai(-1);}
    if(e.key==='Escape'){idx.classList.remove('aberto');}
  });`,
  `  document.addEventListener('keydown',function(e){
    var t=e.target;
    var emControle=t&&t.closest&&t.closest('button,input,textarea,select,a,[role="button"],.acc-cab,.fbtn,.checklist,label');
    if(e.key==='ArrowDown'||e.key==='PageDown'){e.preventDefault();vai(1);}
    if(e.key===' '){if(!emControle){e.preventDefault();vai(1);}}
    if(e.key==='ArrowUp'||e.key==='PageUp'){e.preventDefault();vai(-1);}
    if(e.key==='Escape'){idx.classList.remove('aberto');}
  });`,
  "space-guard",
  ["deck"]
);

// data-arm (HTML)
let h = files.html;
let armOk = 0;
for (let i = 1; i <= 69; i++) {
  const id = "s" + String(i).padStart(2, "0");
  let arm = 0;
  if (i >= 47) arm = 4;
  else if (i >= 46) arm = 3;
  else if (i >= 45) arm = 2;
  else if (i >= 41) arm = 1;
  const re = new RegExp('(id="' + id + '"\\s+data-ato="\\d+"\\s+data-arm=")(\\d+)(")');
  if (re.test(h)) {
    h = h.replace(re, "$1" + arm + "$3");
    armOk++;
  } else {
    const reB = new RegExp('(id="' + id + '"[^>]*data-arm=")(\\d+)(")');
    if (reB.test(h)) {
      h = h.replace(reB, "$1" + arm + "$3");
      armOk++;
    } else console.warn("MISS arm", id);
  }
}
["s63a", "s63b", "s63c"].forEach(function (id) {
  const re = new RegExp('(id="' + id + '"\\s+data-ato="\\d+"\\s+data-arm=")(\\d+)(")');
  if (re.test(h)) {
    h = h.replace(re, "$14$3");
    armOk++;
  }
});
files.html = h;
console.log("OK: data-arm ×" + armOk);

// S12
const s12re = /<section class="slide l-L1 bg-base" id="s12"[\s\S]*?<\/section>/;
if (s12re.test(files.html)) {
  files.html = files.html.replace(
    s12re,
    `<section class="slide l-L1 bg-base" id="s12" data-ato="2" data-arm="0" aria-label="Slide 12"><div class="quadro"><div class="bloco-central"><p class="display">Uma coisa esse homem não precisa: de mais cobrança.</p><p>Ele já se cobra o suficiente. O que falta não é alguém que aponte o erro — isso o sistema inteiro já fez, com competência. O que falta é alguém que entre na caverna com ele e aponte Cristo.</p></div></div></section>`
  );
  console.log("OK: s12");
} else console.warn("MISS s12");

// S19 remove fecho
const s19start = files.html.indexOf('id="s19"');
const s20start = files.html.indexOf('id="s20"');
if (s19start !== -1 && s20start !== -1) {
  let chunk = files.html.slice(s19start, s20start);
  if (chunk.includes('class="fecho"')) {
    chunk = chunk.replace(/<p class="fecho">[\s\S]*?<\/p>/, "");
    files.html = files.html.slice(0, s19start) + chunk + files.html.slice(s20start);
    console.log("OK: s19 fecho removed");
  } else console.log("SKIP: s19 no fecho");
}

// S01 seta
const s01a = files.html.indexOf('id="s01"');
const s02a = files.html.indexOf('id="s02"');
if (s01a !== -1 && s02a !== -1) {
  const chunk = files.html.slice(s01a, s02a);
  if (!chunk.includes("seta-rolar")) {
    const seta =
      '<div class="seta-rolar" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9l6 6 6-6"/></svg></div>';
    const needle = '</div></div></section><section class="slide l-L8 bg-sombra" id="s02"';
    if (files.html.includes(needle)) {
      files.html = files.html.replace(
        '</div></div></section><section class="slide l-L8 bg-sombra" id="s02"',
        seta + '</div></div></section><section class="slide l-L8 bg-sombra" id="s02"'
      );
      console.log("OK: s01 seta");
    } else {
      console.warn("MISS s01 seta marker");
    }
  } else console.log("SKIP: s01 seta exists");
}

fs.writeFileSync(paths.html, files.html, "utf8");
fs.writeFileSync(paths.css.tokens, files.tokens, "utf8");
fs.writeFileSync(paths.css.layout, files.layout, "utf8");
fs.writeFileSync(paths.css.components, files.components, "utf8");
fs.writeFileSync(paths.js.deck, files.deck, "utf8");
fs.writeFileSync(paths.js.shine, files.shine, "utf8");

const bundle =
  files.html + files.tokens + files.layout + files.components + files.deck + files.shine;
const v = files.html;
const checks = {
  barra44: bundle.includes("--barra:44px"),
  chrome: bundle.includes("chrome-escuro"),
  space: bundle.includes("emControle"),
  fechoStatic: bundle.includes(".fecho{position:static"),
  d1: bundle.includes("76px"),
  stagger: bundle.includes("animation-delay:80ms"),
  h1: v.includes('h1 class="sr-only"'),
  s12: /id="s12"[\s\S]{0,180}display/.test(v),
  s19fecho: !/<section[^>]*id="s19"[\s\S]*?fecho[\s\S]*?id="s20"/.test(v),
  arm39: (v.match(/id="s39"[^>]*data-arm="(\d+)"/) || [])[1],
  arm41: (v.match(/id="s41"[^>]*data-arm="(\d+)"/) || [])[1],
  arm45: (v.match(/id="s45"[^>]*data-arm="(\d+)"/) || [])[1],
  arm46: (v.match(/id="s46"[^>]*data-arm="(\d+)"/) || [])[1],
  arm47: (v.match(/id="s47"[^>]*data-arm="(\d+)"/) || [])[1],
  seta: v.slice(v.indexOf('id="s01"'), v.indexOf('id="s02"')).includes("seta-rolar"),
  fade: bundle.includes("emblemaIn"),
  modular: v.includes('href="css/tokens.css"') && v.includes('src="js/deck.js"'),
};
console.log(JSON.stringify(checks, null, 2));
