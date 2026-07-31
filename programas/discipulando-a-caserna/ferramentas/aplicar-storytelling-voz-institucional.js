"use strict";
/**
 * Ajusta o protótipo storytelling-v1 para voz institucional (você de leitura;
 * fechamento sem tratar o leitor como o pastor).
 * Uso: node ferramentas/aplicar-storytelling-voz-institucional.js
 */
const fs = require("fs");
const path = require("path");

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
h = replaceOnce(
  h,
  "<title>Discipulando a Caserna — Apreciação pastoral (protótipo)</title>",
  "<title>Discipulando a Caserna — Apresentação institucional (protótipo)</title>",
  "title"
);
h = replaceOnce(
  h,
  'content="Documento de trabalho para apreciação pastoral do Discipulando a Caserna (protótipo storytelling). Fortaleza, 2026."',
  'content="Apresentação institucional autoexplicativa do Discipulando a Caserna (protótipo storytelling). Fortaleza, 2026."',
  "description"
);
h = replaceAllLiteral(
  h,
  "Discipulando a Caserna · Apreciação pastoral · protótipo storytelling v1",
  "Discipulando a Caserna · Apresentação institucional · protótipo storytelling v1",
  "rodape"
);

// --- Corpo: senhor → você (Plano institucional) ---
const voicePairs = [
  ["vale explicar o que o senhor tem em mãos.", "vale explicar o que você tem em mãos."],
  [
    "O senhor pode parar quando quiser e retomar depois — o documento lembra onde o senhor estava.",
    "Você pode parar quando quiser e retomar depois — o documento lembra onde você estava.",
  ],
  [
    "O senhor não precisa decidir nada durante o caminho",
    "Você não precisa decidir nada durante o caminho",
  ],
  ["Deixe eu apresentar ao senhor o homem", "Deixe eu apresentar a você o homem"],
  ["Se o senhor perguntar a esse homem", "Se você perguntar a esse homem"],
  [
    "O senhor já esteve nele, no início desta apresentação.",
    "Você já esteve nele, no início desta apresentação.",
  ],
  [
    "o militar recluso que o senhor conheceu no início",
    "o militar recluso que você conheceu no início",
  ],
  [
    "E se o senhor olhar para o alto desta página",
    "E se você olhar para o alto desta página",
  ],
  ["conforme o senhor avança.", "conforme você avança."],
  ["O senhor pode percorrer no seu ritmo", "Você pode percorrer no seu ritmo"],
  ["o que o senhor vê aqui é o mapa.", "o que você vê aqui é o mapa."],
  ["O senhor viu esta imagem na primeira tela", "Você viu esta imagem na primeira tela"],
  ["Tudo o que o senhor viu até aqui", "Tudo o que você viu até aqui"],
  [
    "Porque, como o senhor leu no começo desta apresentação",
    "Porque, como você leu no começo desta apresentação",
  ],
];

for (const [a, b] of voicePairs) {
  h = replaceOnce(h, a, b, "voice:" + a.slice(0, 40));
}

// --- Fechamento s63a–c (institucional, sem vocativo ao pastor-leitor) ---
const oldPastoral = `<section class="slide l-L2 bg-base slide-pastoral" id="s63a" data-ato="9" data-arm="4" aria-label="Pedidos pastorais">
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
</div></div></section>`;

const newPastoral = `<section class="slide l-L2 bg-base slide-pastoral" id="s63a" data-ato="9" data-arm="4" aria-label="Estado de homologação">
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
</div></div></section>`;

if (h.includes(oldPastoral)) {
  h = h.replace(oldPastoral, newPastoral);
  console.log("OK: s63a–c institutional block");
} else if (h.includes('id="s63a"') && h.includes("Pastor, o Guia")) {
  // fallback: replace key phrases if whitespace drifted
  h = replaceOnce(
    h,
    "Pastor, o Guia está em v1.0-RC. Nenhum conteúdo é final antes da sua homologação.",
    "O Guia está em v1.0-RC. Nenhum conteúdo é final antes da homologação pastoral.",
    "s63a-title"
  );
  h = replaceOnce(
    h,
    "Chego ao ponto em que esta apresentação deixa de ser apenas informativa. Nada do que o senhor viu aqui é definitivo. O Guia Mestre está em versão candidata; as doze lições do Módulo 1 estão escritas, mas não homologadas; os Módulos 2 a 4 estão planejados, e sua produção não começa antes da sua palavra.",
    "Neste ponto a apresentação deixa de ser apenas informativa. Nada do que se viu até aqui é definitivo. O Guia Mestre está em versão candidata; as doze lições do Módulo 1 estão escritas, mas não homologadas; os Módulos 2 a 4 estão planejados, e sua produção não começa antes da palavra da liderança pastoral.",
    "s63a-intro"
  );
  h = replaceOnce(
    h,
    'aria-label="Pedidos pastorais"',
    'aria-label="Estado de homologação"',
    "s63a-aria"
  );
  h = replaceOnce(
    h,
    "Há uma página do Guia Mestre que continua em branco por decisão minha: o prefácio.",
    "Há uma página do Guia Mestre que continua em branco por decisão do autor: o prefácio.",
    "s63b-p1"
  );
  h = replaceOnce(
    h,
    "e não peço que seja escrito por cortesia. O Guia descreve um método, mas quem pode dizer se esse método é fiel ao Cristo das Escrituras — e se serve de fato aos homens para quem foi escrito — não é o autor. É o pastor que acompanhou a obra desde a origem",
    "e não se pede que seja escrito por cortesia. O Guia descreve um método, mas quem pode dizer se esse método é fiel ao Cristo das Escrituras — e se serve de fato aos homens para quem foi escrito — não é o autor. É a liderança pastoral que acompanhou a obra desde a origem",
    "s63b-p2"
  );
  h = replaceOnce(
    h,
    "Se o senhor entender que o material ainda não está em condições de receber esse prefácio, essa também será uma resposta — e uma resposta que eu acolherei.",
    "Se a liderança pastoral entender que o material ainda não está em condições de receber esse prefácio, essa também será uma resposta — e uma resposta que será acolhida.",
    "s63b-p3"
  );
  h = replaceOnce(
    h,
    "Quando quiser escrevê-lo, basta enviar o texto. Ele entra no Guia exatamente como o senhor o redigir, sem edição de conteúdo, acima da minha nota de autor.",
    "Quando o texto for enviado, entra no Guia exatamente como for redigido, sem edição de conteúdo, acima da nota de autor.",
    "s63b-p4"
  );
  h = replaceOnce(
    h,
    "Se o senhor entender que não é hora, ou que não é assim.",
    "Se a decisão for que ainda não é hora, ou que não é assim.",
    "s63c-title"
  );
  h = replaceOnce(
    h,
    "Se for <strong>“não desse jeito”</strong>, eu reviso — e prefiro revisar agora.<br>\nSe for <strong>“não”</strong>, o trabalho não terá sido perdido: ele já serviu para organizar o que aprendi.",
    "Se for <strong>“não desse jeito”</strong>, o texto será revisado — e é preferível revisar agora.<br>\nSe for <strong>“não”</strong>, o trabalho não terá sido perdido: ele já serviu para organizar o que foi aprendido.",
    "s63c-body"
  );
  h = replaceOnce(
    h,
    "Fico à disposição para o que o senhor determinar.",
    "O autor permanece à disposição da liderança para o que for determinado.",
    "s63c-fecho"
  );
} else if (h.includes('id="s63a"') && !h.includes("Pastor, o Guia")) {
  console.log("SKIP: s63a already institutional or partially updated");
} else {
  console.warn("MISS: pastoral block");
}

// Full block replace if still has senhor in s63*
if (
  h.includes('id="s63a"') &&
  /o senhor/i.test(h.slice(h.indexOf('id="s63a"'), h.indexOf('id="s64"')))
) {
  const start = h.indexOf('<section class="slide l-L2 bg-base slide-pastoral" id="s63a"');
  const end = h.indexOf('<section class="slide l-L5 bg-base" id="s64"');
  if (start !== -1 && end !== -1) {
    h = h.slice(0, start) + newPastoral + "\n" + h.slice(end);
    console.log("OK: s63a–c replaced by slice");
  }
}

fs.writeFileSync(htmlPath, h, "utf8");
console.log("Wrote", htmlPath);

const v = fs.readFileSync(htmlPath, "utf8");
const senhor = [...v.matchAll(/senhor/gi)].map((m) => {
  const i = m.index;
  return v.slice(Math.max(0, i - 40), i + 50).replace(/\s+/g, " ");
});
console.log("senhor leftovers:", senhor.length);
senhor.forEach((s) => console.log(" -", s));
console.log("Pastor, vocative:", v.includes("Pastor, o Guia"));
console.log("você count", (v.match(/você/gi) || []).length);
console.log("vocês", (v.match(/vocês/gi) || []).length);
