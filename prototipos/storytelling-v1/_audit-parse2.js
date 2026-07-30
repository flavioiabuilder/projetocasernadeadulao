const fs = require('fs');
const path = 'd:/Faculdade/IA-Builder/Projetos/projetocasernadeadulao/prototipos/storytelling-v1/index.html';
const html = fs.readFileSync(path, 'utf8');

function section(id) {
  const start = html.indexOf(`id="${id}"`);
  if (start < 0) return null;
  const secStart = html.lastIndexOf('<section', start);
  const secEnd = html.indexOf('</section>', start);
  return html.slice(secStart, secEnd + 10);
}

const silentIds = ['s12', 's19', 's29', 's67'];
for (const id of silentIds) {
  const s = section(id);
  const text = s
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  console.log('\n===', id, '===');
  console.log('fecho?', /class="fecho"/.test(s));
  console.log('svg?', /<svg/.test(s));
  console.log('text:', text);
}

for (const id of ['s01', 's02', 's03', 's04', 's25', 's26', 's39', 's41', 's42', 's45', 's46', 's47', 's52', 's66', 's68', 's69', 's33', 's34', 's50', 's57']) {
  const s = section(id);
  if (!s) {
    console.log(id, 'MISSING');
    continue;
  }
  const arm = (s.match(/data-arm="(\d+)"/) || [])[1];
  const cls = (s.match(/class="([^"]*)"/) || [])[1];
  const fecho = (s.match(/class="fecho"[^>]*>([^<]+)/) || [])[1];
  const cave = /fig-caverna/.test(s);
  const emblema = /emblema/.test(s);
  const estudo = [...s.matchAll(/selo-estudo[^>]*>([^<]+)|ESTUDO[^<]{0,40}/g)].map((x) => x[0]);
  const anchors = (s.match(/De quebrantados,\s*valentes\.?/g) || []).length;
  const slideRef = s
    .replace(/aria-label="[^"]*"/g, '')
    .match(/slide\s+\d+|no slide|S0\d|S[1-6]\d/i);
  console.log(
    JSON.stringify({
      id,
      arm,
      cls,
      fecho: fecho || null,
      cave,
      emblema,
      estudo,
      anchors,
      slideRef: slideRef && slideRef[0],
      chars: s.length,
    })
  );
}

// all fig-caverna occurrences with nearest id
let idx = 0;
let n = 0;
while ((idx = html.indexOf('fig-caverna', idx)) >= 0) {
  const before = html.slice(Math.max(0, idx - 500), idx);
  const id = (before.match(/id="(s[^"]+)"/g) || []).pop();
  console.log('fig-caverna at', idx, 'near', id);
  idx += 11;
  n++;
}
console.log('total fig-caverna', n);

// armor fill: does .on change stroke to fill?
const css = html.match(/<style>([\s\S]*?)<\/style>/)[1];
console.log('\narm css related:');
console.log((css.match(/\.arm-ic[\s\S]{0,120}/g) || []).join('\n---\n'));
console.log('\nsobe siblings:');
console.log((css.match(/visivel[\s\S]{0,200}|sobe[\s\S]{0,200}|nth-child[\s\S]{0,120}/g) || []).slice(0, 15).join('\n'));

// JS for arm
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((x) => x[1]);
const js = scripts.join('\n');
console.log('\nJS length', js.length);
for (const key of ['arm-ic', 'data-arm', 'armadura', 'localStorage', 'visivel', 'IntersectionObserver', 'sobe', 'ATO']) {
  console.log(key, js.includes(key));
}
const armPos = js.indexOf('arm');
console.log('first arm ctx:', js.slice(Math.max(0, js.search(/arm-ic|data-arm|dataset\.arm/)), 800));

// search dataset
const ds = js.match(/[\s\S]{0,100}dataset\.arm[\s\S]{0,300}|[\s\S]{0,100}getAttribute\(['\"]data-arm['\"]\)[\s\S]{0,300}/);
console.log('dataset arm:', ds && ds[0]);

// pos label format
const posHtml = html.match(/id="pos"|class="pos"[\s\S]{0,200}/);
console.log('pos:', posHtml && posHtml[0].slice(0, 200));

// check fill on armor - look for fill attribute change in JS
console.log('fill( in js', /fill\(|setAttribute\(['\"]fill/.test(js));
console.log('classList on', /classList\.(add|toggle).*on|arm-ic.*on/.test(js));

// extract updater by line search
const lines = js.split('\n');
lines.forEach((line, i) => {
  if (/arm|data-arm|ATO|MIN REST|localStorage|visivel|animationDelay|80/.test(line)) {
    console.log(String(i + 1).padStart(4), line.slice(0, 160));
  }
});
