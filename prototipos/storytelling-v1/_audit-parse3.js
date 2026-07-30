const fs = require('fs');
const html = fs.readFileSync(
  'd:/Faculdade/IA-Builder/Projetos/projetocasernadeadulao/prototipos/storytelling-v1/index.html',
  'utf8'
);

function section(id) {
  const start = html.indexOf(`id="${id}"`);
  if (start < 0) return null;
  const secStart = html.lastIndexOf('<section', start);
  const secEnd = html.indexOf('</section>', start);
  return html.slice(secStart, secEnd + 10);
}

function text(s) {
  return s
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function has(s, re) {
  return re.test(s);
}

const checks = {};

// S01 emblem timing
const s01 = section('s01');
checks.s01 = {
  text: text(s01),
  seta: /seta-rolar/.test(s01),
  surgeAnim: /seta-rolar/.test(s01),
  emblemaAnim: /animation|opacity|1\.2s|surge/.test(s01),
  semChrome: /sem-chrome/.test(s01),
};

// CSS emblem entrance?
const css = html.match(/<style>([\s\S]*?)<\/style>/)[1];
checks.emblemaCssAnim = /emblema[^{]*\{[^}]*animation|@keyframes[^}]*emblema/.test(css);
checks.setaCss = (css.match(/\.seta-rolar\{[^}]+\}/) || [])[0];
checks.staggerDelays = (css.match(/animation-delay:[^;}]+/g) || []);
checks.siblingStagger = /\.slide\.visivel[\s\S]{0,80}nth-child|\.quadro>\*>\*:nth/.test(css);

// S04
checks.s04 = text(section('s04'));

// S12 structure
const s12 = section('s12');
checks.s12 = {
  html: s12.replace(/class=/g, '\nclass=').slice(0, 1200),
  text: text(s12),
  display: /class="display"/.test(s12),
  fecho: (s12.match(/class="fecho"[^>]*>([^<]+)/) || [])[1],
};

// S19
const s19 = section('s19');
checks.s19 = {
  text: text(s19),
  fecho: (s19.match(/class="fecho"[^>]*>([^<]+)/) || [])[1],
  display: /class="display"/.test(s19),
};

// S25 faixa
checks.s25 = {
  faixa: /faixa-caverna/.test(section('s25')),
  text: text(section('s25')),
};

// S31 anchor
checks.s31 = {
  anchors: (section('s31').match(/De quebrantados/g) || []).length,
  fecho: (section('s31').match(/class="fecho"[^>]*>([^<]+)/) || [])[1],
  text: text(section('s31')).slice(0, 400),
};

// S39 armor explain + icons fill anim
const s39 = section('s39');
checks.s39 = {
  text: text(s39).slice(0, 500),
  armItems: (s39.match(/arm-item/g) || []).length,
  hasFillSeq: /--d|animation-delay/.test(s39),
};

// S40 grid 48
const s40 = section('s40');
checks.s40 = {
  cells: (s40.match(/class="cel"/g) || []).length,
  numerao: /numerao|4\s*[×x]\s*12/.test(s40),
};

// S48 ordem dia bleed
checks.s48 = {
  hasBar: /CONTEMPLAÇÃO|ORDEM DO DIA|ordem/.test(section('s48')),
  svg: /<svg/.test(section('s48')),
};

// S50 certificado
checks.s50 = {
  proposta: /PROPOSTA/.test(section('s50')),
  mock: /cert-/.test(section('s50')),
  blankName: /cert-nome|em branco/.test(section('s50')),
};

// S57 caderneta
checks.s57 = {
  proposta: /PROPOSTA/.test(section('s57')),
  cad: /cad-/.test(section('s57')),
  estudoMerch: /estudo|aprovad/i.test(text(section('s57'))),
};

// S65 anéis
checks.s65 = {
  svg: /<svg/.test(section('s65')),
  rings: /RECLUSÃO|anel|circle/.test(section('s65')),
};

// S68 figures
const s68 = section('s68');
checks.s68 = {
  cave: /fig-caverna/.test(s68),
  rects: (s68.match(/<rect/g) || []).length,
  text: text(s68).slice(-200),
};

// S69
const s69 = section('s69');
checks.s69 = {
  arm: (s69.match(/data-arm="(\d+)"/) || [])[1],
  emblema: /emblema-pequeno/.test(s69),
  anchors: (s69.match(/De quebrantados/g) || []).length,
  cnpj: /63\.724\.286/.test(s69),
  text: text(s69).slice(0, 500),
};

// S33 claims
checks.s33 = text(section('s33'));

// S03 conditions block
checks.s03 = {
  labels: /APERTO|DÍVIDA|AMARGURA/.test(section('s03')),
  caveOpacity: /opacity|fig-caverna/.test(section('s03')),
  svg: /<svg/.test(section('s03')),
};

// S07 overlay words
checks.s07 = {
  hierarquia: /HIERARQUIA/.test(section('s07')),
  culpa: /CULPA/.test(section('s07')),
  fecho: (section('s07').match(/class="fecho"[^>]*>([^<]+)/) || [])[1],
};

// S09 diagram
checks.s09 = /TEMPO|CIRCULAÇÃO|MATERIAL|ROTATIVIDADE/.test(section('s09'));

// S10 strata
checks.s10 = /privação|isolamento familiar|estrat/i.test(section('s10'));

// S14 circles
checks.s14 = /SEGUE|APRENDE|REPRODUZ/.test(section('s14'));

// S16 cycle
checks.s16 = /VER CRISTO|ENTENDER|OBEDI/.test(section('s16'));

// S22 typographic
checks.s22 = /×|x /.test(section('s22')) && /<svg|tipogr/.test(section('s22'));

// S36 containment
checks.s36 = /PROJETO CASERNA|DISCIPULANDO/.test(section('s36'));

// S37 bar
checks.s37 = /PRESÍDIO|QUARTEL|IGREJA/.test(section('s37'));

// armor schedule table
const arms = [];
for (let i = 1; i <= 69; i++) {
  const id = 's' + String(i).padStart(2, '0');
  const s = section(id);
  if (!s) continue;
  const arm = +(s.match(/data-arm="(\d+)"/) || [])[1];
  if (!arms.length || arms[arms.length - 1].arm !== arm) arms.push({ id, arm });
}
checks.armTransitions = arms;

// count anchors
checks.anchorLocations = [];
for (let i = 1; i <= 69; i++) {
  const id = 's' + String(i).padStart(2, '0');
  const s = section(id);
  if (s && /De quebrantados,\s*valentes/.test(s)) checks.anchorLocations.push(id);
}

// content slide number refs (prose)
checks.proseSlideRefs = [];
for (let i = 1; i <= 69; i++) {
  const id = 's' + String(i).padStart(2, '0');
  const t = text(section(id) || '');
  if (/slide\s+\d+|no slide\s+|slides?\s+S\d/i.test(t)) checks.proseSlideRefs.push({ id, hit: t.match(/slide\s+\d+|no slide\s+|slides?\s+S\d/i)[0] });
}

// voice senhor addressing
checks.voiceHits = [];
const bodyText = html
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<style[\s\S]*?<\/style>/g, '');
const re = /([^>]{0,40})(o senhor|O senhor|senhor,|Pastor,)([^<]{0,40})/g;
let m;
while ((m = re.exec(bodyText))) {
  checks.voiceHits.push((m[1] + m[2] + m[3]).replace(/\s+/g, ' ').trim());
}

// pastoral slides voice
checks.s63a = text(section('s63a')).slice(0, 350);
checks.s63b = text(section('s63b')).slice(0, 350);
checks.s63c = text(section('s63c')).slice(0, 350);

// L9 nota do autor?
checks.hasL9 = /l-L9|NOTA DO AUTOR/.test(html);

// condensed sans?
checks.condensed = /condensed|Compress|Narrow/.test(css);

fs.writeFileSync(
  'd:/Faculdade/IA-Builder/Projetos/projetocasernadeadulao/prototipos/storytelling-v1/_audit-report3.json',
  JSON.stringify(checks, null, 2)
);
console.log(JSON.stringify(checks, null, 2));
