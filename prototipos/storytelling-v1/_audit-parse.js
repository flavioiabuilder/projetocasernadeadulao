const fs = require('fs');
const path = 'd:/Faculdade/IA-Builder/Projetos/projetocasernadeadulao/prototipos/storytelling-v1/index.html';
const html = fs.readFileSync(path, 'utf8');

const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
const css = (cssMatch?.[1] || '').replace(/--logo:url\([^)]+\);?/, '--logo:...');
fs.writeFileSync(path.replace('index.html', '_audit-css.txt'), css);

const slides = [];
const re = /<section class="([^"]*)" id="([^"]+)"([^>]*)>([\s\S]*?)<\/section>/g;
let m;
while ((m = re.exec(html))) {
  const body = m[4];
  const attrs = m[3];
  const arm = (attrs.match(/data-arm="(\d+)"/) || [])[1];
  const ato = (attrs.match(/data-ato="(\d+)"/) || [])[1];
  const hasFecho = /class="fecho"/.test(body);
  const fechoText = (body.match(/class="fecho"[^>]*>([^<]+)/) || [])[1] || '';
  const hasSvg = /<svg[\s>]/.test(body);
  const hasEmblema = /class="[^"]*emblema/.test(body);
  const hasCaverna = /fig-caverna|class="fig"/.test(body) && /caverna|Adulão|abertura/.test(body + m[0].slice(0, 200));
  const cavernaSvg = /fig-caverna/.test(body);
  const anchor = (body.match(/De quebrantados,\s*valentes\.?/g) || []).length;
  const estudo = (body.match(/selo-estudo|ESTUDO/g) || []).length;
  const senhorReader = /(o senhor|O senhor|senhor,|Senhor,|Pastor,)/.test(body);
  const slideNumRef = /(slide\s+S?\d+|no slide\s+\d+|S0\d|S[1-6]\d)/i.test(body.replace(/aria-label="Slide \d+"/g, ''));
  const textSample = body
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180);
  slides.push({
    id: m[2],
    cls: m[1],
    arm,
    ato,
    hasFecho,
    fechoText,
    hasSvg,
    hasEmblema,
    cavernaSvg,
    anchor,
    estudo,
    senhorReader,
    slideNumRef,
    textSample,
    len: body.length,
  });
}

const jsMatch = html.match(/<script>([\s\S]*?)<\/script>/);
const js = jsMatch?.[1] || '';
fs.writeFileSync(path.replace('index.html', '_audit-js.txt'), js);

const anchors = [...html.matchAll(/De quebrantados,\s*valentes\.?/g)].map((x) => {
  const before = html.slice(Math.max(0, x.index - 200), x.index);
  const id = (before.match(/id="(s\d+[a-z]?)"/g) || []).pop();
  return id;
});

const fechos = [];
const fre = /id="(s[^"]+)"[\s\S]*?class="fecho"[^>]*>([^<]+)/g;
let fm;
while ((fm = fre.exec(html))) fechos.push({ id: fm[1], text: fm[2] });

const armSchedule = slides
  .filter((s) => /^s\d+$/.test(s.id))
  .map((s) => `${s.id}:arm=${s.arm}`)
  .join(' | ');

const silent = ['s12', 's19', 's29', 's67'].map((id) => slides.find((s) => s.id === id));

const caves = slides.filter((s) => s.cavernaSvg || (s.id === 's02' || s.id === 's26' || s.id === 's68'));

const estudoSlides = slides.filter((s) => s.estudo);
const fonts = (css.match(/@font-face[\s\S]*?font-family:\s*([^;]+)/g) || []).slice(0, 5);
const root = (css.match(/:root\{[\s\S]*?\}/) || [])[0];
const motion = {
  sobe: /@keyframes sobe/.test(css),
  reduced: /prefers-reduced-motion/.test(css),
  stagger: /animation-delay|80ms|nth-child/.test(css + js),
  fill: /fill:\s*var\(--latao\)|\.arm-ic\.on[\s\S]{0,80}fill/.test(css + js),
  armOn: /arm-ic\.on|classList\.add\(['"]on['"]\)|data-arm/.test(js),
};

const casa = /Casa de Ora[cç][aã]o/.test(html);
const p1p9 = /P1|P9|estado-maior|ESTUDO/.test(html);
const seloEstudo = [...html.matchAll(/selo-estudo[^>]*>([^<]+)/g)].map((x) => x[1]);
const senhorHits = [...html.matchAll(/senhor|Senhor|Pastor,/gi)].map((x) => {
  const ctx = html.slice(Math.max(0, x.index - 40), x.index + 40).replace(/\s+/g, ' ');
  return ctx;
});

const report = {
  slideCount: slides.length,
  ids: slides.map((s) => s.id),
  anchors,
  fechos,
  silent,
  armBySlide: slides.map((s) => ({ id: s.id, arm: s.arm })),
  firstArm1: slides.find((s) => s.arm === '1'),
  firstArm2: slides.find((s) => s.arm === '2'),
  firstArm3: slides.find((s) => s.arm === '3'),
  firstArm4: slides.find((s) => s.arm === '4'),
  s66: slides.find((s) => s.id === 's66'),
  s41: slides.find((s) => s.id === 's41'),
  s42: slides.find((s) => s.id === 's42'),
  s45: slides.find((s) => s.id === 's45'),
  s46: slides.find((s) => s.id === 's46'),
  s47: slides.find((s) => s.id === 's47'),
  s39: slides.find((s) => s.id === 's39'),
  s01: slides.find((s) => s.id === 's01'),
  s52: slides.find((s) => s.id === 's52'),
  caves: slides.filter((s) => /fig-caverna/.test(html.split(`id="${s.id}"`)[1]?.slice(0, 3000) || '')).map((s) => s.id),
  estudoSlides: estudoSlides.map((s) => s.id),
  seloEstudo,
  senhorHits: senhorHits.slice(0, 40),
  motion,
  root,
  fontsFromCss: (css.match(/--serif:[^;]+|--sans:[^;]+/g) || []),
  displaySize: (css.match(/\.display\{[^}]+\}/) || [])[0],
  barra: (css.match(/--barra:[^;]+/) || [])[0],
  grid12: /12.?col|grid-template-columns:\s*repeat\(12/.test(css),
  lLayouts: [...new Set((css.match(/\.l-L\d+/g) || []))],
  jsArmLogic: (js.match(/data-arm|arm-ic|armadura[\s\S]{0,200}/g) || []).slice(0, 20),
  slideNumRefs: slides.filter((s) => s.slideNumRef).map((s) => s.id),
  metricsHints: [...html.matchAll(/\b(\d+\s*(turmas|certificados|unidades|homens|participantes|alcance)|%\s*de)\b/gi)].map((x) => x[0]).slice(0, 20),
};

// cave SVG count
report.figCavernaCount = (html.match(/fig-caverna/g) || []).length;
report.s02HasCave = /id="s02"[\s\S]{0,2500}fig-caverna/.test(html);
report.s26HasCave = /id="s26"[\s\S]{0,2500}fig-caverna/.test(html);
report.s68HasCave = /id="s68"[\s\S]{0,2500}fig-caverna/.test(html);
report.s03CaveBg = /id="s03"[\s\S]{0,2000}<svg/.test(html);
report.s68Figures = /id="s68"[\s\S]{0,4000}rect/.test(html);

// fill vs stroke for armor
report.armFillCss = (css.match(/\.arm-ic\.on\{[^}]+\}|\.arm-ic\{[^}]+\}/g) || []);
report.armJs = js.includes('arm-ic') ? js.slice(js.indexOf('arm'), js.indexOf('arm') + 800) : 'no arm in js';

// extract JS arm update function more carefully
const armIdx = js.indexOf('data-arm');
report.armJsCtx = armIdx >= 0 ? js.slice(armIdx - 200, armIdx + 600) : 'none';

// silent slide bodies short
for (const id of ['s12', 's19', 's29', 's67', 's04', 's01', 's52', 's39', 's41', 's42', 's66', 's25', 's50', 's57', 's33', 's34']) {
  const s = slides.find((x) => x.id === id);
  if (s) report[id + '_detail'] = s;
}

// Casa / P claims context
const casaIdx = html.indexOf('Casa de Ora');
report.casaCtx = casaIdx >= 0 ? html.slice(casaIdx - 120, casaIdx + 200).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ') : 'absent';
const pIdx = html.indexOf('P1');
report.pCtx = pIdx >= 0 ? html.slice(pIdx - 80, pIdx + 250).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ') : 'absent';

fs.writeFileSync(path.replace('index.html', '_audit-report.json'), JSON.stringify(report, null, 2));
console.log('slides', report.slideCount);
console.log('anchors', report.anchors);
console.log('fechos', report.fechos.length, report.fechos);
console.log('arm firsts', report.firstArm1?.id, report.firstArm2?.id, report.firstArm3?.id, report.firstArm4?.id);
console.log('s41-47', report.s41?.arm, report.s42?.arm, report.s45?.arm, report.s46?.arm, report.s47?.arm, report.s66?.arm);
console.log('silent', silent.map((s) => s && { id: s.id, fecho: s.hasFecho, svg: s.hasSvg, text: s.textSample }));
console.log('caves', report.figCavernaCount, report.s02HasCave, report.s26HasCave, report.s68HasCave);
console.log('estudo', report.seloEstudo);
console.log('display', report.displaySize);
console.log('barra', report.barra);
console.log('motion stagger', report.motion);
console.log('fonts', report.fontsFromCss);
console.log('senhor sample', report.senhorHits.slice(0, 15));
console.log('slideNumRefs', report.slideNumRefs);
console.log('metrics', report.metricsHints);
console.log('arm fill css', report.armFillCss);
console.log('arm js', report.armJsCtx.slice(0, 500));

