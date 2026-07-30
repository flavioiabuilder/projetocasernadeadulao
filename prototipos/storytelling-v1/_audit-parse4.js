const fs = require('fs');
const html = fs.readFileSync(
  'd:/Faculdade/IA-Builder/Projetos/projetocasernadeadulao/prototipos/storytelling-v1/index.html',
  'utf8'
);
function section(id) {
  const start = html.indexOf(`id="${id}"`);
  const secStart = html.lastIndexOf('<section', start);
  const secEnd = html.indexOf('</section>', start);
  return html.slice(secStart, secEnd + 10);
}
function text(s) {
  return s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

const s22 = section('s22');
console.log('S22 svg', /<svg/.test(s22));
console.log('S22 snippet', s22.replace(/\s+/g, ' ').slice(0, 900));
console.log('S01 full short', section('s01').replace(/src="data:[^"]+"/, 'src="..."').replace(/\s+/g, ' ').slice(0, 500));
console.log('S07 fecho', (section('s07').match(/fecho[^>]*>([^<]+)/) || [])[1]);
console.log('all fechos:');
for (let i = 1; i <= 69; i++) {
  const id = 's' + String(i).padStart(2, '0');
  const s = section(id);
  if (!s) continue;
  const f = s.match(/class="fecho"[^>]*>([^<]+)/);
  if (f) console.log(id, f[1]);
}
// unmarked institutional risky phrases
const risky = ['Casa de Ora', 'P1', 'P9', 'estado-maior', 'personalidade jurídica', 'CNPJ'];
for (const r of risky) {
  let idx = 0;
  while ((idx = html.indexOf(r, idx)) >= 0) {
    const win = html.slice(Math.max(0, idx - 180), idx + 80);
    const nearEstudo = /selo-estudo|Estudo|ESTUDO|PROPOSTA/.test(win);
    const id = (html.slice(Math.max(0, idx - 800), idx).match(/id="(s[^"]+)"/g) || []).pop();
    console.log(r, 'at', id, 'nearEstudo?', nearEstudo);
    idx += r.length;
  }
}
