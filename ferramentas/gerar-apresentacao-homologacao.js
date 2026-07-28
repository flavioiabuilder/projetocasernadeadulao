/**
 * Gera apresentacao/homologacao-pastoral.html — HTML único autocontido
 * para homologação pastoral v1.0-RC.
 * Uso: node ferramentas/gerar-apresentacao-homologacao.js
 */
"use strict";

const fs = require("fs");
const path = require("path");

const raiz = path.join(__dirname, "..");
const saidaDir = path.join(raiz, "apresentacao");
const saidaArq = path.join(saidaDir, "homologacao-pastoral.html");

function ler(caminhoRel) {
  return fs.readFileSync(path.join(raiz, caminhoRel), "utf8");
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const matriz = JSON.parse(ler("conteudo/matriz-curricular.json"));
const modulos = JSON.parse(ler("conteudo/modulos.json"));
const escudoSvg = ler("assets/img/marca-escudo.svg").trim();

const licao6 = matriz.licoes.find((l) => l.numero === 6);

const ATOS = [
  { id: 0, rotulo: "Ato 0 — A Caverna", tela: 1 },
  { id: 1, rotulo: "Ato I — A Dor", tela: 2 },
  { id: 2, rotulo: "Ato II — O Que Já Acontecia", tela: 5 },
  { id: 3, rotulo: "Ato III — O Problema", tela: 7 },
  { id: 4, rotulo: "Ato IV — A Concepção", tela: 9 },
  { id: 5, rotulo: "Ato V — A Arquitetura", tela: 13 },
  { id: 6, rotulo: "Ato VI — A Marcha", tela: 18 },
  { id: 7, rotulo: "Ato VII — Identidade Visível", tela: 22 },
  { id: 8, rotulo: "Ato VIII — O Horizonte", tela: 26 },
  { id: 9, rotulo: "Ato IX — A Decisão", tela: 29 },
];

const GUIA34 = {
  titulo:
    "Indica o tema central da lição, em linguagem bíblica e militar, apontando para a pessoa e a obra de Cristo.",
  textoBase:
    "Passagem bíblica principal; janela pela qual a turma contempla o caráter de Deus em Cristo antes de ouvir as ordens.",
  objetivo:
    "Declara o que o discípulo será levado a crer e obedecer — espiritual e verificável, conectando contemplação e resposta.",
  sintese:
    "Breve explicação bíblico-doutrinária, cristocêntrica, que aquece o coração e conduz à adoração — não moralismo.",
  aplicacao:
    "Tradução para caserna e presídio: hierarquia, honra, serviço — sempre com Cristo como padrão, não o desempenho.",
  ordemDia:
    "Ação prática da semana: simples, verificável, compatível com o ambiente militar-prisional — resposta de gratidão, não moeda.",
  perguntas:
    "Questões que ajudam a nomear o que viu de Cristo no texto-base e a internalizar o ensino em comunhão.",
};

const ANATOMIA_L6 = [
  {
    chave: "titulo",
    rotulo: "Título",
    guia: GUIA34.titulo,
    conteudo: licao6.titulo,
  },
  {
    chave: "textoBase",
    rotulo: "Texto-base",
    guia: GUIA34.textoBase,
    conteudo: licao6.textoBase,
  },
  {
    chave: "objetivo",
    rotulo: "Objetivo",
    guia: GUIA34.objetivo,
    conteudo: licao6.objetivo,
  },
  {
    chave: "sintese",
    rotulo: "Síntese teológica",
    guia: GUIA34.sintese,
    conteudo:
      "Texto integral na edição do Aluno e do Instrutor (Módulo 1 produzido). Aqui: definição do elemento conforme Guia 3.4.",
  },
  {
    chave: "aplicacao",
    rotulo: "Aplicação militar",
    guia: GUIA34.aplicacao,
    conteudo:
      "Texto integral na edição do Aluno e do Instrutor (Módulo 1 produzido). Aqui: definição do elemento conforme Guia 3.4.",
  },
  {
    chave: "ordemDia",
    rotulo: "Ordem do Dia",
    guia: GUIA34.ordemDia,
    conteudo:
      "Texto integral na edição do Aluno e do Instrutor (Módulo 1 produzido). Aqui: definição do elemento conforme Guia 3.4.",
  },
  {
    chave: "perguntas",
    rotulo: "Perguntas de reflexão",
    guia: GUIA34.perguntas,
    conteudo:
      "Texto integral na edição do Aluno e do Instrutor (Módulo 1 produzido). Aqui: definição do elemento conforme Guia 3.4.",
  },
];

const FLIP_RISCOS = [
  {
    frente: "Turmas com estágios diferentes e nenhum critério para reconhecê-los.",
    verso: "Matriz curricular única — 48 lições com progressão definida e reconhecível.",
  },
  {
    frente: "Temas repetidos sem aprofundamento, e lacunas doutrinárias que ninguém percebe.",
    verso: "Progressão em espiral — temas retornam com profundidade e finalidade diferentes.",
  },
  {
    frente: "Instrutores bem-intencionados produzindo materiais incompatíveis.",
    verso: "Padrão didático fixo — sete elementos em toda lição, Guia 3.4.",
  },
  {
    frente: "Um homem que avança no presídio e, na igreja, é convidado a recomeçar do zero.",
    verso: "Remissão de módulo concluído — mesma linguagem e progressão em todos os ambientes.",
  },
];

const FLIP_SIMBOLOS = [
  {
    frente: "Cinto da Verdade",
    frenteSub: "Cinto de Guarnição",
    verso:
      "A base do alistamento espiritual: a verdade do Evangelho que sustenta a nova identidade do recruta e dá firmeza para toda a jornada (Ef 6.14; 2Co 5.17; 2Tm 2.3–4).",
  },
  {
    frente: "Couraça da Justiça",
    frenteSub: "Colete Balístico",
    verso:
      "Disciplina e proteção do coração e da integridade no dia a dia — o discípulo, já chamado, é fortalecido na Palavra e aprende a permanecer firme (Ef 6.14).",
  },
  {
    frente: "Calçados do Evangelho da Paz",
    frenteSub: "Coturno",
    verso:
      "Estabilidade, firmeza e constância na caminhada — andar dignamente em qualquer terreno, com mansidão e perseverança (Ef 6.15).",
  },
  {
    frente: "Escudo da Fé",
    frenteSub: "Insígnia final",
    verso:
      "Fé ativa e avanço em missão, inclusive em proteção mútua, como tropa — restauração pela graça e comissionamento para servir e multiplicar (Ef 6.16).",
  },
];

const CHECKLIST = [
  "Apreciação doutrinária e pastoral do Módulo 1 (doze lições, edições Aluno e Instrutor)",
  "Homologar o Guia Mestre v1.0-RC → v1.0",
  "O prefácio do Guia Mestre — página reservada; ver convite abaixo",
  "Liberação para produção dos Módulos 2 a 4",
  "Autorizar a turma-piloto (pergunta de implantação: local, período, número)",
  "Nomear o instrutor ou instrutores responsáveis (pergunta de implantação)",
  "Aprovar o estudo de identidade visual e a logomarca apresentados",
  "Autorizar a produção do Caderno de Identidade Visual (pendência do item 5.3)",
  "Autorizar o desenvolvimento dos Apêndices Pastorais",
  "Definir a política de aplicação da marca e destinação de receita (Tela 24 — estudo de identidade de tropa)",
  "Definir o fluxo de comunicação com a igreja local (item 1.4.3)",
];

const CONVITE = `Há uma página do Guia Mestre que continua em branco por decisão minha: o prefácio.

Não é uma formalidade de abertura, e não peço que seja escrito por cortesia. O Guia descreve um método, mas quem pode dizer se esse método é fiel ao Cristo das Escrituras — e se serve de fato aos homens para quem foi escrito — não é o autor. É o pastor que acompanhou a obra desde a origem, que conhece os nomes por trás dos exemplos e que responderá diante de Deus pelo que for ensinado em seu nome.

Por isso, aquela página não foi preenchida com texto provisório à espera de aprovação. Está reservada, e permanecerá reservada pelo tempo que for necessário. Não há prazo. Se o senhor entender que o material ainda não está em condições de receber esse prefácio, essa também será uma resposta — e uma resposta que eu acolherei.

Quando quiser escrevê-lo, basta enviar o texto. Ele entra no Guia exatamente como o senhor o redigir, sem edição de conteúdo, acima da minha nota de autor.`;

function blocoConducao(texto) {
  return `<aside class="conducao" aria-label="Notas de condução"><p>${esc(texto)}</p></aside>`;
}

function stamp(n) {
  if (n === 1) return "";
  return `<p class="stamp">v1.0-RC · documento de validação</p>`;
}

function tela(n, act, inner) {
  return `<section id="tela-${String(n).padStart(2, "0")}" class="screen" data-screen="${n}" data-act="${act}" tabindex="-1">${inner}${stamp(n)}</section>`;
}

function buildScreens() {
  const s = [];

  s.push(
    tela(
      1,
      0,
      `<div class="screen-inner screen-inner--cold">
        <blockquote class="cold-quote" cite="1Sm 22.2">
          <p>“todo homem em aperto, endividado e amargurado de espírito”</p>
          <footer>1Sm 22.2</footer>
        </blockquote>
        <div class="cold-id" aria-hidden="true">
          <h1>Discipulando a Caserna</h1>
          <p class="meta">Projeto Caserna de Adulão · Guia Mestre v1.0-RC</p>
          <p class="meta">Apresentação institucional para validação pastoral</p>
        </div>
        <p class="scroll-hint" aria-hidden="true">↓</p>
        ${blocoConducao("Não fale nesta tela. Deixe o silêncio de três a cinco segundos. Só depois: \"Pastor, é daqui que tudo começa — e o senhor sabe disso melhor do que eu.\"")}
      </div>`
    )
  );

  s.push(
    tela(
      2,
      1,
      `<div class="screen-inner">
        <h2>Ele chega com a farda e com a vergonha.</h2>
        <div class="split-cols">
          <ul class="mil-labels" aria-label="O que conhece">
            <li>Hierarquia</li><li>Disciplina</li><li>Missão</li><li>Lealdade</li>
          </ul>
          <ul class="soft-labels" aria-label="O que carrega">
            <li>Culpa</li><li>Vergonha</li><li>Ruptura</li><li>Silêncio</li>
          </ul>
        </div>
        <p>Conhece hierarquia. Conhece disciplina. Conhece missão.<br>E carrega, ao mesmo tempo, a culpa real e o peso do que ainda não conseguiu nomear.</p>
        <p>Muitos chegam acreditando que Cristo foi embora na hora da desonra.<br>Outros, que Ele nunca esteve ali para começo de conversa.</p>
        ${blocoConducao("Este é o primeiro momento de conteúdo. Diga em voz baixa. Não dramatize — o texto já carrega. Se o Pastor comentar aqui, deixe-o comentar.")}
      </div>`
    )
  );

  s.push(
    tela(
      3,
      1,
      `<div class="screen-inner">
        <h2>Presídio Militar da PMCE.</h2>
        <p>Horário controlado. Circulação controlada. Material controlado.<br>Tensão institucional. Número de participantes que varia a cada semana.</p>
        <p><strong>Não é um lugar onde se improvisa discipulado.</strong><br>É um lugar onde o improviso custa caro.</p>
        <svg class="planta" viewBox="0 0 320 200" role="img" aria-label="Diagrama esquemático de restrições: tempo, circulação, material, rotatividade">
          <rect x="80" y="50" width="160" height="100" fill="none" stroke="#4A4A4A" stroke-width="1"/>
          <text x="160" y="105" text-anchor="middle" fill="#4A4A4A" font-size="14">área de encontro</text>
          <text x="160" y="20" text-anchor="middle" fill="#4A4A4A" font-size="12">tempo</text>
          <text x="160" y="185" text-anchor="middle" fill="#4A4A4A" font-size="12">circulação</text>
          <text x="30" y="105" text-anchor="middle" fill="#4A4A4A" font-size="12">material</text>
          <text x="290" y="105" text-anchor="middle" fill="#4A4A4A" font-size="12">rotatividade</text>
        </svg>
        ${blocoConducao("Aqui você estabelece a credencial do documento: ele não foi escrito de gabinete. \"Tudo o que vem a seguir foi desenhado para funcionar neste terreno — não em uma sala de aula ideal.\"")}
      </div>`
    )
  );

  s.push(
    tela(
      4,
      1,
      `<div class="screen-inner screen-inner--pivot">
        <h2>Ele não precisa de mais cobrança.</h2>
        <p class="lead">Precisa de alguém que vá à caverna com ele e aponte Cristo.</p>
        ${blocoConducao("Pausa. Esta é a tela-pivô do primeiro ato. Frase única, dita uma vez, sem repetir.")}
      </div>`
    )
  );

  s.push(
    tela(
      5,
      2,
      `<div class="screen-inner">
        <h2>Antes que houvesse estrutura, método ou currículo, o Senhor já chamava.</h2>
        <p>Não havia matriz curricular.<br>Não havia módulos, símbolos, transições ou certificados.<br>Havia homens se assentando, Bíblia aberta, e fé reacendendo onde a culpa tentava apagar.</p>
        <p><strong>O Guia não criou esse mover. O Guia nasceu para guardar o que já estava acontecendo.</strong></p>
        <div class="timeline" role="img" aria-label="Linha do tempo: o mover, depois o Guia">
          <span class="timeline__ponto timeline__ponto--mover">o mover</span>
          <span class="timeline__linha"></span>
          <span class="timeline__ponto timeline__ponto--guia">o Guia</span>
        </div>
        ${blocoConducao("Esta tela protege o projeto de soar tecnocrático. Diga: \"Nada aqui é invenção metodológica. É organização pastoral de algo que Deus começou antes.\"")}
      </div>`
    )
  );

  s.push(
    tela(
      6,
      2,
      `<div class="screen-inner">
        <h2>A caverna que dá nome a tudo.</h2>
        <p>Davi acolheu em Adulão homens abatidos, endividados e amargurados.<br>Sob liderança forjada na crise, aqueles proscritos se tornaram valentes.</p>
        <p>O projeto reconhece a mesma lógica: <strong>a caserna também pode ser uma caverna</strong> — e Cristo, o Comandante maior que Davi, faz de quebrantados, valentes.</p>
        <div class="adulao-comp" aria-hidden="true">
          <span class="adulao-comp__word">ADULÃO</span>
          <span class="adulao-comp__tag adulao-comp__tag--1">aperto</span>
          <span class="adulao-comp__tag adulao-comp__tag--2">dívida</span>
          <span class="adulao-comp__tag adulao-comp__tag--3">amargura</span>
        </div>
        ${blocoConducao("Primeira aparição da frase-âncora: \"de quebrantados, valentes.\" Ela volta mais duas vezes (Telas 21 e 30). Diga-a devagar e não a explique.")}
      </div>`
    )
  );

  const flipRiscos = FLIP_RISCOS.map(
    (c, i) =>
      `<button type="button" class="flip-card" data-flip="risco-${i}" aria-pressed="false">
        <span class="flip-card__inner">
          <span class="flip-card__face flip-card__face--front"><span>${esc(c.frente)}</span></span>
          <span class="flip-card__face flip-card__face--back"><span>${esc(c.verso)}</span></span>
        </span>
      </button>`
  ).join("");

  s.push(
    tela(
      7,
      3,
      `<div class="screen-inner">
        <h2>Sem método, o que Deus faz se perde.</h2>
        <div class="flip-grid">${flipRiscos}</div>
        ${blocoConducao("Deixe o Pastor virar os cartões ele mesmo se estiver com o dispositivo em mãos. \"Cada risco à esquerda tem uma resposta desenhada no Guia. Nenhum deles é hipotético.\"")}
      </div>`
    )
  );

  s.push(
    tela(
      8,
      3,
      `<div class="screen-inner">
        <h2>Um Guia Mestre.</h2>
        <p>Referência oficial. Vade Mecum espiritual.<br>Não para engessar o que Deus faz — para guardar, nutrir e conduzir.</p>
        <p>Quatro exigências que o documento assumiu desde a primeira linha:</p>
        <ul class="verbos">
          <li><strong>Unificar</strong> a doutrina</li>
          <li><strong>Servir</strong> de referência ao instrutor</li>
          <li><strong>Estabelecer</strong> jornada progressiva</li>
          <li><strong>Garantir</strong> continuidade e replicabilidade</li>
        </ul>
        ${blocoConducao("Transição para o ato conceitual. \"O que vem agora é como esse documento foi pensado — não o que ele contém, mas por que ele tem a forma que tem.\"")}
      </div>`
    )
  );

  s.push(
    tela(
      9,
      4,
      `<div class="screen-inner">
        <h2>Não são quatro temas. São quatro ações de Cristo.</h2>
        <div class="eixo-grid">
          <article class="eixo"><h3>Cristo Chamando</h3><p>convoca, perdoa, incorpora</p></article>
          <article class="eixo"><h3>Cristo Treinando</h3><p>ensina, corrige, firma fundamentos</p></article>
          <article class="eixo"><h3>Cristo Moldando</h3><p>amadurece afetos, vontade e caráter</p></article>
          <article class="eixo"><h3>Cristo Enviando</h3><p>comissiona, sustenta, multiplica</p></article>
        </div>
        <p class="eixo-nota">A ordem não é organizacional. É o próprio caminho da graça na vida do homem — e por isso não pode ser invertida.</p>
        ${blocoConducao("Marque explicitamente: o sujeito de todas as quatro frases é Cristo, não o instrutor e não o discípulo.")}
      </div>`
    )
  );

  s.push(
    tela(
      10,
      4,
      `<div class="screen-inner">
        <h2>Uma narrativa unifica os quatro módulos: Efésios 6.</h2>
        <p>O discípulo não coleciona conteúdos. Ele é <strong>revestido</strong>, peça por peça.</p>
        <ol class="pecas-linha">
          <li>Cinto da Verdade</li>
          <li>Couraça da Justiça</li>
          <li>Calçados do Evangelho da Paz</li>
          <li>Escudo da Fé</li>
        </ol>
        ${blocoConducao("Aponte a barra do topo explicitamente uma única vez, aqui: \"O senhor vai reparar que a barra lá em cima vai se completando conforme avançamos. Ela é a armadura.\"")}
      </div>`
    )
  );

  s.push(
    tela(
      11,
      4,
      `<div class="screen-inner">
        <h2>Duas peças não foram atribuídas a módulos. A decisão é teológica.</h2>
        <p><strong>A Espada do Espírito</strong> — a Palavra não pertence a uma etapa. Ela atravessa todas, do chamado ao envio, como instrumento de cada lição.</p>
        <p><strong>O Capacete da Salvação</strong> — guarda a mente na esperança. Está reservado à dimensão pastoral de socorro, nos módulos complementares.</p>
        <p>Quatro peças descrevem a <strong>marcha</strong>. Duas acompanham o soldado em <strong>toda</strong> a jornada e em suas crises.</p>
        <svg class="camadas" viewBox="0 0 400 120" role="img" aria-label="Diagrama: espada atravessa, capacete cobre, quatro peças em sequência">
          <rect x="20" y="70" width="360" height="30" fill="none" stroke="#8C6A46" stroke-width="1"/>
          <text x="200" y="90" text-anchor="middle" fill="#4A4A4A" font-size="11">cinto · couraça · calçados · escudo</text>
          <line x1="200" y1="20" x2="200" y2="110" stroke="#1A2A44" stroke-width="2"/>
          <text x="210" y="35" fill="#1A2A44" font-size="11">espada</text>
          <ellipse cx="200" cy="15" rx="50" ry="12" fill="none" stroke="#8C6A46" stroke-width="1.5"/>
          <text x="200" y="18" text-anchor="middle" fill="#8C6A46" font-size="10">capacete</text>
        </svg>
        ${blocoConducao("Tela de credibilidade. Mostra que o sistema simbólico foi pensado, não montado por conveniência estética.")}
      </div>`
    )
  );

  s.push(
    tela(
      12,
      4,
      `<div class="screen-inner">
        <h2>Contemplar antes de obedecer.</h2>
        <p>Nenhuma disciplina espiritual verdadeira nasce de cobrança — nasce de fascínio.<br>Nenhuma obediência frutífera nasce de medo — nasce de amor.</p>
        <p>Por isso toda lição segue a mesma ordem interna:<br><strong>ver Cristo</strong> → <strong>entender pela Palavra</strong> → <strong>responder em obediência concreta</strong></p>
        <p>A prática não paga culpa. Ela responde à graça.</p>
        <div class="metodo-ciclo" role="img" aria-label="Ciclo: ver Cristo, entender, responder">
          <span>ver Cristo</span><span>→</span><span>entender</span><span>→</span><span>responder</span><span class="metodo-ciclo__retorno">↺</span>
        </div>
        ${blocoConducao("Coração pastoral do método — sem atribuir Prefácio. Planta o convite; o formalismo do pedido vem na Tela 29.")}
      </div>`
    )
  );

  s.push(
    tela(
      13,
      5,
      `<div class="screen-inner">
        <p class="conta-grande" aria-label="4 vezes 12 igual a 48">4 × 12 = 48</p>
        <h2>Quatro módulos sequenciais. Doze lições cada. Um ciclo anual.</h2>
        <p>Nenhum módulo repete o outro. Alguns temas retornam — com profundidade e finalidade diferentes.<br>O discípulo não gira nos mesmos assuntos: ele sobe em espiral.</p>
        <div class="grade-48" id="grade-48" aria-hidden="true"></div>
        ${blocoConducao("Tela de impacto numérico. Não explique muito. A grade de 48 reaparece filtrável na Tela 16.")}
      </div>`
    )
  );

  s.push(
    tela(
      14,
      5,
      `<div class="screen-inner">
        <h2>Um encontro por semana. De 1h30 a 2h.</h2>
        <p><strong>48 semanas</strong> efetivas de aula · <strong>11 a 12 meses</strong> de calendário<br>A folga existe para feriados, restrições institucionais, revisões e cerimônias de transição.</p>
        <p>Dentro de cada encontro:</p>
        <div class="ritmo-bar" role="img" aria-label="Blocos de tempo do encontro">
          <span style="flex:2">Contemplação na Palavra (15–25 min)</span>
          <span style="flex:3">Discernimento e aplicação (25–35 min)</span>
          <span style="flex:1.5">Oração e compromisso (10–15 min)</span>
          <span class="ritmo-bar__od">Ordem do Dia</span>
        </div>
        ${blocoConducao("Enfatize o gesto visual da Ordem do Dia saindo da barra: \"O encontro termina, mas a lição não. A Ordem do Dia é o que atravessa a semana.\"")}
      </div>`
    )
  );

  const anatomiaBtns = ANATOMIA_L6.map(
    (el) =>
      `<li><button type="button" class="anatomia-btn" data-anatomia="${el.chave}" aria-expanded="false">${esc(el.rotulo)}</button>
        <div class="anatomia-panel" id="anatomia-${el.chave}" hidden>
          <p class="anatomia-guia"><em>Guia 3.4:</em> ${esc(el.guia)}</p>
          <p>${esc(el.conteudo)}</p>
        </div></li>`
  ).join("");

  s.push(
    tela(
      15,
      5,
      `<div class="screen-inner">
        <h2>Toda lição tem sete elementos. Sempre os mesmos.</h2>
        <p>Título · Texto-base · Objetivo · Síntese teológica · Aplicação militar · <strong>Ordem do Dia</strong> · Perguntas de reflexão</p>
        <p class="anatomia-sub">Exemplo: Lição 6 — ${esc(licao6.titulo)} (${esc(licao6.textoBase)}). Título, texto-base e objetivo vêm da matriz; os demais painéis trazem a definição do Guia 3.4 — o texto integral da lição está nas edições Aluno e Instrutor.</p>
        <ul class="anatomia-list">${anatomiaBtns}</ul>
        <p>A repetição do formato não cria frieza. <strong>Cria chão.</strong><br>Instrutores diferentes, em ambientes diferentes, ministram o mesmo conteúdo sem perda de ênfase.</p>
        ${blocoConducao("Deixe o Pastor abrir os elementos. Se o tempo estiver curto, abra apenas Aplicação militar e Ordem do Dia.")}
      </div>`
    )
  );

  const modBtns = modulos.modulos
    .map(
      (m) =>
        `<button type="button" class="matriz-filtro" data-modulo="${m.numero}">${esc(m.nome)}</button>`
    )
    .join("");
  const matrizRows = matriz.licoes
    .map(
      (l) =>
        `<tr data-modulo="${l.modulo}"><td>${l.numero}</td><td>${esc(l.titulo)}</td><td>${esc(l.textoBase)}</td><td class="col-obj">${esc(l.objetivo)}</td></tr>`
    )
    .join("");

  s.push(
    tela(
      16,
      5,
      `<div class="screen-inner screen-inner--matriz">
        <h2>As 48 lições, em visão anual.</h2>
        <p class="matriz-hint"><em>Filtre por módulo para ver a progressão completa.</em></p>
        <div class="matriz-toolbar">
          <button type="button" class="matriz-filtro matriz-filtro--ativa" data-modulo="0">Todas</button>
          ${modBtns}
        </div>
        <div class="matriz-scroll">
          <table class="matriz-tabela">
            <thead><tr><th>#</th><th>Título</th><th>Texto-base</th><th>Objetivo</th></tr></thead>
            <tbody>${matrizRows}</tbody>
          </table>
        </div>
        ${blocoConducao("Esta é a tela em que você para de apresentar e deixa o Pastor navegar. Silêncio produtivo.")}
      </div>`
    )
  );

  s.push(
    tela(
      17,
      5,
      `<div class="screen-inner">
        <h2>Cinco marcas — sinais de uma obra de graça, não medalhas.</h2>
        <ul class="marcas-arco">
          <li>Fé bíblica e cristocêntrica</li>
          <li>Identidade restaurada e honra redimida</li>
          <li>Disciplina espiritual e vida em comunhão</li>
          <li>Caráter obediente e servidor</li>
          <li>Compromisso com a missão e a multiplicação</li>
        </ul>
        <p class="marcas-salvaguarda">Nenhuma delas descreve perfeição alcançada. Todas descrevem <strong>caminho em andamento</strong>.</p>
        ${blocoConducao("Frisar a última linha em voz alta. \"Isso não é um checklist de aprovação. É um mapa de leitura pastoral.\"")}
      </div>`
    )
  );

  s.push(
    tela(
      18,
      6,
      `<div class="screen-inner">
        <h2>Cada módulo termina em um marco reconhecido pela tropa.</h2>
        <ul class="marchas">
          <li><span class="mil-label">Primeira Marcha</span> — O Recruta que se Rendeu</li>
          <li><span class="mil-label">Segunda Marcha</span> — O Combatente que se Fortalece</li>
          <li><span class="mil-label">Terceira Marcha</span> — O Guerreiro que Persevera</li>
          <li><span class="mil-label">Formatura do Soldado de Cristo</span></li>
        </ul>
        ${blocoConducao("Leia os quatro nomes em voz alta, na sequência, sem comentar entre eles.")}
      </div>`
    )
  );

  const flipSim = FLIP_SIMBOLOS.map(
    (c, i) =>
      `<button type="button" class="flip-card flip-card--simbolo" data-flip="simbolo-${i}" aria-pressed="false">
        <span class="flip-card__inner">
          <span class="flip-card__face flip-card__face--front">
            <span class="simbolo-nome">${esc(c.frente)}</span>
            <span class="simbolo-sub">${esc(c.frenteSub)}</span>
          </span>
          <span class="flip-card__face flip-card__face--back"><span>${esc(c.verso)}</span></span>
        </span>
      </button>`
  ).join("");

  s.push(
    tela(
      19,
      6,
      `<div class="screen-inner">
        <h2>Quatro insígnias. Nenhuma é troféu.</h2>
        <p><em>Toque em cada uma para ver o sentido bíblico.</em></p>
        <div class="flip-grid flip-grid--simbolos">${flipSim}</div>
        ${blocoConducao("Chame atenção para o nome duplo: \"Cada peça tem o nome que a Escritura dá e o nome que a caserna reconhece.\"")}
      </div>`
    )
  );

  s.push(
    tela(
      20,
      6,
      `<div class="screen-inner">
        <h2>Sobriedade é regra, não estilo.</h2>
        <div class="ritos-cols">
          <div class="ritos-e"><h3>O que a transição é</h3>
            <ul><li>Leitura bíblica breve</li><li>Oração</li><li>Entrega da insígnia</li><li>Testemunho</li><li>Registro pastoral simples</li></ul>
          </div>
          <div class="ritos-nao"><h3>O que a transição não é</h3>
            <ul><li>Premiação</li><li>Ranking</li><li>Comparação</li><li>Espetáculo</li><li>Condicionamento de bênçãos</li></ul>
          </div>
        </div>
        <p>Nenhum discípulo deve ser constrangido ou exposto.</p>
        ${blocoConducao("Tela de salvaguarda. Responde, antes que seja feita, a preocupação pastoral mais previsível.")}
      </div>`
    )
  );

  s.push(
    tela(
      21,
      6,
      `<div class="screen-inner">
        <h2>Memória pastoral, não comprovação de mérito.</h2>
        <blockquote class="cert-quote">
          <p>“Certificamos que [nome] concluiu, pela graça de Cristo, a [marcha correspondente] do Discipulando a Caserna, como testemunho da obra que Deus começou e haverá de completar (Fp 1.6).”</p>
        </blockquote>
        <p class="proposta-tag">PROPOSTA</p>
        <p>Onde o contexto institucional não permitir a entrega física, <strong>o registro pastoral simples cumpre a mesma função.</strong></p>
        ${blocoConducao("Segunda aparição da frase-âncora: ao mostrar o certificado, diga \"de quebrantados, valentes\" — desta vez apontando o nome em branco no documento.")}
      </div>`
    )
  );

  s.push(
    tela(
      22,
      7,
      `<div class="screen-inner">
        <h2>O escudo ensina o que o programa confessa.</h2>
        <p class="estudo-tag">estudo visual — homologação pendente</p>
        <div class="escudo-wrap">${escudoSvg}</div>
        <p>Um escudo com as insígnias cravadas — o cinto, a couraça, os calçados e, no quarto campo, o próprio escudo do Projeto.<br>Encimado pelo <strong>capacete</strong>. Atravessado pela <strong>espada</strong>.</p>
        <p>O discípulo não coleciona medalhas. <strong>Ele é revestido por Cristo.</strong></p>
        ${blocoConducao("Esta tela precisa vir antes de qualquer aplicação. A identidade visual é doutrina antes de ser design.")}
      </div>`
    )
  );

  s.push(
    tela(
      23,
      7,
      `<div class="screen-inner">
        <h2>Não é brinde. É proposta de instrumento do método.</h2>
        <p class="proposta-tag">PROPOSTA</p>
        <p>Toda lição termina em <strong>Ordem do Dia</strong>: ação prática, simples e verificável, cumprida ao longo da semana — exigência do Guia (3.4).</p>
        <p>A Caderneta seria onde ela é registrada — versículo memorizado, reconciliação buscada, serviço prestado, oração mantida.</p>
        <p>Ela nasce da pedagogia, não da loja. <strong>Ainda não é entregável aprovado.</strong></p>
        <div class="caderneta-mock" role="img" aria-label="Mockup da Caderneta de Campanha — miolo com campos de Ordem do Dia">
          <p><strong>Ordem do Dia</strong></p>
          <p>Lição: ___ · Data: ___</p>
          <p>Ação: _______________</p>
          <p>Registro: _______________</p>
        </div>
        ${blocoConducao("Reenquadra o que vem depois. \"A caderneta é só uma forma que estou propondo para registrá-la — não um produto já decidido.\"")}
      </div>`
    )
  );

  s.push(
    tela(
      24,
      7,
      `<div class="screen-inner">
        <h2>Senso de corpo tem forma visível — em estudo.</h2>
        <p class="estudo-tag estudo-tag--block">ESTUDO — NÃO APROVADO</p>
        <ul class="merch-list"><li>Camisa</li><li>Caneca</li><li>Adesivo</li><li>Insígnia bordada</li><li>Bolsa de campanha</li></ul>
        <p>Não são produtos de vitrine. São sinais de pertencimento a uma tropa — o mesmo princípio que o Guia assume quando fala de senso de corpo, camaradagem e vida comunitária.</p>
        <div class="salvaguardas">
          <h3>Salvaguardas propostas</h3>
          <ul>
            <li>Uso vinculado a discípulos, instrutores e apoiadores do projeto</li>
            <li>Nenhuma peça condiciona participação, avanço ou bênção</li>
            <li>Destinação de eventual receita definida e prestada em conta à liderança</li>
            <li>Aprovação prévia de toda aplicação da marca</li>
          </ul>
        </div>
        ${blocoConducao("Não venda. Apresente e cale. Registre a reação no checklist da Tela 29.")}
      </div>`
    )
  );

  s.push(
    tela(
      25,
      7,
      `<div class="screen-inner">
        <h2>A forma pode variar. O conteúdo teológico, não.</h2>
        <p>O Guia já estabelece: o recurso gráfico de cada símbolo pode mudar conforme o que estiver disponível — impresso, cartão, insígnia, projeção.<br><strong>O significado espiritual e a ordem dos símbolos não devem ser alterados.</strong></p>
        <p class="pendencia">Pendência registrada: <strong>Caderno de Identidade Visual do Projeto</strong>, previsto no item 5.3 e ainda não produzido.</p>
        ${blocoConducao("\"O Guia previu esse caderno. Ele ainda não existe. Proponho que seja o próximo entregável — sob a supervisão do senhor.\"")}
      </div>`
    )
  );

  s.push(
    tela(
      26,
      8,
      `<div class="screen-inner">
        <h2>Duas frentes de socorro, já previstas e ainda não desenvolvidas.</h2>
        <div class="apendices">
          <article><span class="selo-planej">em planejamento</span><h3>A Marcha da Liberdade</h3><p>Associada ao Capacete da Salvação</p></article>
          <article><span class="selo-planej">em planejamento</span><h3>Vigília na Tempestade</h3><p>Associada à Espada do Espírito</p></article>
        </div>
        <p>Mantidas em documento companheiro próprio, fora do corpo do Guia, por serem intervenção pastoral focada.</p>
        <div class="limites">
          <h3>Limites de escopo, explícitos</h3>
          <p>Não substituem acompanhamento profissional, jurídico ou clínico; não fazem promessas sobre processos institucionais; conduzidos em comunhão com a igreja e, havendo, com a capelania.</p>
        </div>
        ${blocoConducao("\"Não vou apresentar isso como pronto, porque não está.\"")}
      </div>`
    )
  );

  s.push(
    tela(
      27,
      8,
      `<div class="screen-inner">
        <h2>Multiplicação fiel, não reprodução vazia.</h2>
        <p>O Guia forma o discípulo. Falta formar quem forma.</p>
        <p>Critérios já estabelecidos para qualquer expansão:</p>
        <ul class="criterios">
          <li><strong>Fidelidade doutrinária</strong> — não relativizar o que o Guia estabeleceu</li>
          <li><strong>Coerência pedagógica</strong> — não pular etapas por pressa</li>
          <li><strong>Integridade pastoral</strong> — não sacrificar cuidado de almas por alcance</li>
        </ul>
        ${blocoConducao("\"O item 6.4.2 já prevê a multiplicação. O que não existe ainda é o percurso formal de formação do instrutor.\"")}
      </div>`
    )
  );

  s.push(
    tela(
      28,
      8,
      `<div class="screen-inner">
        <h2>O ambiente muda. O discipulado, não.</h2>
        <p>O homem que concluiu o Módulo 1 no presídio <strong>não recomeça do zero na igreja.</strong><br>Ele é reconhecido como quem já passou pela fase do chamado, e avança para o treinamento.</p>
        <p>Uma única linguagem. Uma única progressão. Válida em presídio, quartel e igreja local.</p>
        <p>Para isso, é preciso fluxo pastoral entre quem discipula dentro e quem recebe fora.</p>
        <svg class="continuidade" viewBox="0 0 420 80" role="img" aria-label="Presídio, quartel e igreja ligados por linha contínua">
          <line x1="30" y1="40" x2="390" y2="40" stroke="#8C6A46" stroke-width="3"/>
          <circle cx="70" cy="40" r="8" fill="#1A2A44"/><text x="70" y="65" text-anchor="middle" font-size="11" fill="#4A4A4A">presídio</text>
          <circle cx="210" cy="40" r="8" fill="#1A2A44"/><text x="210" y="65" text-anchor="middle" font-size="11" fill="#4A4A4A">quartel</text>
          <circle cx="350" cy="40" r="8" fill="#1A2A44"/><text x="350" y="65" text-anchor="middle" font-size="11" fill="#4A4A4A">igreja</text>
        </svg>
        ${blocoConducao("Última tela de conteúdo antes da decisão. \"Isso exige que a igreja seja avisada do estágio do discípulo.\"")}
      </div>`
    )
  );

  const checkItems = CHECKLIST.map(
    (item, i) =>
      `<li><label><input type="checkbox" data-check="${i}" /> <span>${esc(item)}</span></label><textarea class="check-obs" rows="1" placeholder="Observações" aria-label="Observações para ${esc(item)}"></textarea></li>`
  ).join("");

  s.push(
    tela(
      29,
      9,
      `<div class="screen-inner screen-inner--decisao">
        <h2>Pastor, o Guia está em v1.0-RC. Nenhum conteúdo é final antes da sua homologação.</h2>
        <ul class="checklist" id="checklist">${checkItems}</ul>
        <div class="convite">
          <p class="convite-rotulo">CONVITE</p>
          <h3>O prefácio</h3>
          ${CONVITE.split("\n\n").map((p) => `<p>${esc(p)}</p>`).join("")}
        </div>
        <div class="decisao-acoes">
          <button type="button" id="btn-copiar">Copiar resumo</button>
          <button type="button" id="btn-imprimir">Imprimir</button>
        </div>
        <p id="copiar-status" class="copiar-status" role="status" aria-live="polite"></p>
        ${blocoConducao("Não passe rápido. Leia os itens em voz alta. No bloco do prefácio, leia o convite completo.")}
      </div>`
    )
  );

  s.push(
    tela(
      30,
      9,
      `<div class="screen-inner screen-inner--fechamento">
        <p class="ancora">De quebrantados, valentes.</p>
        <blockquote class="fp-quote" cite="Fp 1.6">
          <p>“Estou plenamente certo de que aquele que começou boa obra em vocês há de completá-la até o Dia de Cristo Jesus.”</p>
          <footer>— Fp 1.6</footer>
        </blockquote>
        <p>Esse versículo está no certificado, e está aqui pelo mesmo motivo. O que foi construído até agora não é obra minha, e o que vier também não será. Fui apenas quem organizou, em papel, aquilo que já se via acontecer numa caverna.</p>
        <p>Fico à disposição para o que o senhor determinar.</p>
        <p class="assinatura">Obr. Flávio Alves da Costa<br>Projeto Caserna de Adulão · Fortaleza-CE</p>
        <p class="rodape-inst">Projeto Caserna de Adulão · CNPJ 63.724.286/0001-78<br>Guia Mestre v1.0-RC — documento de validação · circulação restrita · Fortaleza, 2026</p>
        ${blocoConducao("Terceira e última aparição da frase-âncora. Depois da citação de Fp 1.6, silêncio.")}
      </div>`
    )
  );

  return s.join("\n");
}

function buildCss() {
  return `@font-face{font-family:"Montserrat";src:url(data:font/woff2;base64,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) format("woff2");font-weight:700;font-style:normal;font-display:swap}@font-face{font-family:"Montserrat";src:url(data:font/woff2;base64,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) format("woff2");font-weight:800;font-style:normal;font-display:swap}@font-face{font-family:"Source Serif 4";src:url(data:font/woff2;base64,d09GMgABAAAAAE54ABEAAAAA0agAAE4SAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGUYadBuBoVIckQAGYD9TVEFUXgCEWhEICoHPZIGnDQuFGAABNgIkA4osBCAFhgoHIAwHG4+5RQdiqJ1AVJeqedtlNqJyO0iF5xYyEiFsHISB+IPZ/7cETmRY0Id2bvrCpLtbIEILkVlMayLRJKBMkQoJz5r2oOw6vdDpx1FxdMUEy/jl8/7q7CMo+inX/4qeSO55PwPBHezm6qmJWUqRaGqfmjPAnRyRsJMi3t/7WT33SV/LrDUQU8qRI29mpCBxBAw6x9O2fuZtsCwYxSGiUksYCyiY6FfsuPheZ3mdNTw/tx61MXDJmsVf1d/f+IuCrdmobUQLCDKq9DAR+04b6wLM5so7o+5OTy+NvLb65CKF/+dtamdkfY38xsk3vInys7sTIFoirriyFqEKVERVarsKUbt1QFkguv/3zfXdSuC9t3XTq0lHDEl8xBAfl6qukA4JTBiCrAv529P8WpAzuI0FRkQCnP1cKGJt+x8Rn850SlLRdKWSGtlOVW2dflp/mlrtKVVKOg28DIQaKMAU8Arg48CUS6EAnz45IaEQ08iDJ8vwVwXwbyNnNTAm3ENlL6XwRfNQ6pammVknFFaTIHEIjDv7N0ynx/0ux1/zbUS0jkRECMy/znT98vd/z3HpfC7cFQj2U8tbcFi6TNKXfJK+TneKfCgFHIVk3zXPUcinY4fsEPplSjMVAOxzCFwE2pqp7dZONPV1mNJp7DQyDcPSbetYn3f65dOn8fGW7pRaAKusNoAC4LMk+66slbX9ZfZNSWmzk1JZe5I8Y9l+Tqmd5QTWzoMrgAEojAagyaLg5Ff4GfqVwSb+f9NP6dy5WyTLbY5cUatIgAaGLmAJCmD/j7a9vB23v0Q76ciK0tvfb3e0zA6AQQEox0qpFfBSGuSLeQBAgTS+DN/FC5DoH4qYVeS6HGb4JfuZL1Fo/1gmpTdIMY1rXHN725Sh3/+ZE5Nap9Du7l0g+3a/UEwwwRhhjBFmEEIIE3q/d2Wzjz2xP+1pTMAngYFJlvZrU8ABcAM0+g53SpdRPf5vxzWqJ/9+skL1jKbzFhUWIIQcB4HWw5GnPmGyO+42WxC4FsCJCCZ9apiYDhYdiuTMC8ssABEyhBNycUEFCqEqVVAjjaBWWkOddIb66APZKMrwohherRQEjufQSLKLHrBe6bqNsz39icctxssnhPqZHdXEH/gwSSAQkH8dsKT3/OR1p1PD5Ofq9QzgYuYPcfVZ1yI5+gvR0dE+SN/LeirD0Ue4WsKAF4lj7BolNhJIfeThVSqPVCE4Fm2BP6+JFEd6p4sX/DoDEX5nmUY+i232TlFCBDhA9hqgwd4LbheAUwEQKIIgzVlX8qGk9Vq9uEYO1OSyqKiWn+c/i4Um64XuiqFI+ghIB+8uQlDdvkpPQ12SClREWZjWKcKcqsx0aebh25Lb9fJZtRu5VbAgbcpgfnUbRjm6Go1PEwvvUCuex5J8wbOKXIxwOY9TSX/GZ8b1ckj+Vuq7ByAAL6dlk/Ck9/uogh/3gLPE0uC/RnH4W+OZbBznXxZtuCW22Vs8UkDwPEpE14gxPJLYFtH2rsBIBFT3Apo1IL21/XVbyHBXeVB7LnYgDAokTDbsiCY3BAzz1eS7fcHA30lEk46qMYz4W9VrwAwujbY/8Rzhg7TlFV6AqX1dvBav1qdl1ya68cQT0B1ri8se8gdEiIKzTo2eBie2bBuE785x9ykCvFc829HFatxEXYxZ3j51BbaYA3pGhNEpOgxzf7MM0ttYV6GMfTOH9OfN8oJBW2xzPJOd8UHMqlHDC1GXwSizJarZFuWOr6g3cBdCWLRvB2gcLgHdDG+a+vVKcyD2cdSFflMDLq5rRfzFEzH9AngyLKoS/609DyykUnWoMpJ+h1PSfg8hgU5jUMghR4tO3lBkLRKWQXNaLIYf4/eq20S+hekb5FH3DcnKkpjy6vku0xdafgRjI1X8qhXNRHLyuHNYTl6ZuoHV11oQVyaCiNdJkVPQB1VDw+MkmBZDQZaEJPsdrK0mr4Hu+OVSkoMdyZwcKvyTVSrVXe+dGMIcwc15yNUQ6YcumGg0tErV42PkV4KZPR2Jq6g31cX8YXnoIcumq1uJZNtsAjmn10Kl7lVBxNdriw/rmvH6n86ntuI9XqcGUHdGxdLfz/lGykcNgSoMs9V+x0MgODXUQAQKRKlQAQ0zDG2rrST224913HFMiAicrGx9hetMn0vbegQ1P+zNQRu4kJWlVzgE++oghKE/uLYGQcdkP4K76dXosAymmkqiOCRK4l87JtLCkIvqD7MusPHzanURpk6mge9MGBM+b8JwiKT4nUfXgF8ZgjLnfF6dSnI3kImIbUE7eUOloLMSeyQcHrP7443TCJZHn//WdPvT8V67sGsozhXKa0OPVR1279bKtpo11F+uNpJCjjSiGcZQbo6LPz4y++p7Dzo5y+79PRHzuD9vJUWP+ylyQ9GBolWJ6q6+1+st6Wr2vaiszcrFRVBY1Hpaa0rh820aWQMZytEFSC0zHNuH1vUZtPTSVRg5cBOb0bSkIKL8Jda/LWyj9Y0A/dH7jWvasZXGhXT4BaJ4eGdnCw+ZKIfjiR+tiBUCSQf0brgzTvE/f/7IUCQmmWyGWdZYWyJ6og+CQ6GwJCQ4k0xCTDYZY4YZaLPMgslrUPIQGiTSsuh49nDH3+hqHOAVHO8ch4brYW7YkDvycYboLmts/oNWPpuwE0+rPwQjEjgP4OEAT8VoJV+xTLDuaYfKrztfqBKZwFXUlHUPriKvhcarHyOSJbNsujS9fupx9S0BsOqBqjYwDaAm3UwtXefd4OMWjo35LvDS8raI4FoGYH2/FpA5xJRyopRYcl1axGxbfuSHA6EVK2T1zhwOvR1h6qYy9p1Clt+ZZWv6rll10qoy/n3pFhgrZTKO6yzkoWdmG+oK/13fpG+oDur0qwqW+XmSvdIBkwsEhXRMfIprvBqwxFIEiST91SpF8mSfiXbZMFI9FXpmJKYIAspJurp6HtH6cSUvkeS2V356lHbWGPSb2Qa3G2REYPLMPc9hNHaDmvwhK87jRiN4sOSkjN5alHEfKsgcgsCqjjFpqbzzfh7a+1wCmmgWwH0X2RPdwXRJM5n7inJVsEqfFsTQ8l6AJD8iinrm3N+7NCm3H8yOmC5yr1x1ngISBK31kEm3HwQnW4RTW/DtbvLuSe/RvRrzO4BMJj16ov3cRm1rs7r5DDQ8ndenz2ZDAwhC6eFRui0yhs9mK6qlUEl4lNDOWq9jZwqotiYnHDf8leHmRgSC5oCRcIe8Eg8sgW0abUBGFghAp0ypyO0au2Hcz/OjXuUM4m44/xqiIKdlNNBEU00z3VzzLLPcCiutstoW+xxw0BFHEX7k5DhaWsjIiBhoIDTRRBJTTeVpmmk8TDcdm0vKH4KSqRVoK2vEWBXRVkeMLZHMvoh3IOIdjKSO+lI/JNi8708ueRJALPXbm0Pfm7BPCn+3cnfoXkVRZMLtDwat+6pSh/fDMhARVkvClWf3MIRiUFfZpQdJZsIxmNq0NXx40mUBQBHAoA+ggPreNKl3cAjlUtxukDIMdUnn+tbvvaNKVVeNUlg0F92s91xB2RKPuzhej0nBAhQNd0Ascr8lZfm/SMGmXftK0lRlzK92mJW8RXfTVcDfTC9q+Lnjxcg3mvr0HiYamQQ40qNjl3ZXZD42/i0tKlseHskFcLAWXml/9WoXeOH03dHhhwdRw6o0TNPG12nouds3mrlwF+dBuqhoEHKy5en/9NpdqtjjMwDRXal2kfSH3nRrG6EpfLwTQPXLeRfERLcp58GgJDIIzSNuAOP6iEWnJpjqziySkjiWWwDN5aq6jNohITzKHVqgi9ZtmHWnOkblnC5xv2yZCSATxKmZ5qaYabY55qu2znobGoce6IXeUaJFR/iQkZFycqLTBSVdEUS6IslDsDI1H6u6RhLrIs76SGJDxuVbDShd2gEw7x0w+e4AC9gBpjDm14sOuIMd3ORcKpBvrxYj99Yv1UT3coHtLMHT3XL77/YYBEVjc1smQ0N3NkdeoyFMYknGR1FdOpvOadvJffsIC7b+ISEuRGkyK6EHFOi6tWS0cEGSLK97277AHV1elps0drI9uuMOL6c39lijm6iwYL+CW1xZ1HJO+s2IFNXZ8yzvccq8tVQuP+hdXYjQKb5PmOajN04SikBy1nMPZOF9mf6uZCSyQYoh642G1aushEHN1GBXmY4fjj093oIripZNG+326RUQhKuqfMfa4KU+pYFm6sXZ58aVWP74xcmY0SJcAJ4LnjoeohYvUjkhF8D/fFlW0SPdyWlwB4kNnfCVplIZTx2JRAXIJg7+U4HqXmdrCYbgKJlBmefWnZVazgVWd3v622yT8Agucy2ArCohV3WHS9zuUDVGU4GRZl9xEx0qe2id8b/Rj7DX8XLUV4MWvzm/4RIM/iJASzuwVDCgaU2EqX0J6jPGzfBmmm4p3lm4KgnfFmeM5U3jk6eOiFc+tZCTub4t9Z6JdsfiHQ1R+bXrPIG+KxcVQkQf80noSMcklafoS5SsDLOG0C8TBRrDTwClEIJIoiTl6mqtn8G222GnXXbbkw8RgE6mX4Sw/KAAEkoyIXgCSiRaEkY5Vl281ij9UAajbMfZQWonzi5Su3H2lJZRmnhQL4tOXnOw037yk1IKYrQyNAXuPqE8GmN3f69FqE5vMkjXcodNf0jKTno4zO5LcKzc/a3DX4jZKOUgn4zrGI4yVKzmdbMJhN3lLtiURMrfjaIjZPJJZxH0cHLrcPWAicmE2ZoEMLNHjjP396nfltZRzVN8qPhZe2bzaXArNn0/1PXkUoKSd7W1dkDNwX02y5nRZaoenM3sjTFPlRpbGZ1KmLsZF/DQtpDTWjTJNW6DrmvfDnEIaDGhVZyjYrPfu/b0JYxSKRNdZwoot9zz5ewla8vCy1RxiC6AKcLuybf9vSVEFifldy2CQzGD9yRSLYXf0omJBDb2MAZKfRywvWcm+hfBiMPCEGqTdD4MOZ5cEOMuQHxx9YT4LLaTDnDyDeeSloiIKEKFiLGjqtfw2raTy5wSs66g3+xtdriiBE2eTIwdNyltaJ8Ru0a1VWknwZPURxdB6LOCoMcK3+p+KdYABSwPslRS7cLFHkzTehC1UDBskI108MPIUqkBlRQJxjFFxnL0A9+PUsD9f0Cl76NOiYwZ9hidh24zi3VM30l6SF0AIsJEXL6d6zQezmCxDwYEf4rPqhkzGfvThPTJYeBECmW8I0KD/Vp2JT8oDqjiAYPWsKNdu1erMp2hVM8WiIZlDeLF65YW2NmuDgRdASudPepWp9f59htMJkNlvMu1yeXKUlk/VIvNzVtUVYogL/hUCx6yH5ovw5ldTbwBdRg3HiR6YL9c3VWel4kvChQPI7xzVGy6gZrUhSwQfG36+6waFYfN2a1Lg37PwcWV/l6riDHTbWFkJg1OF5sCbwAmJqs1SvVbRo8WxjRjCRe2Hlo+8veaF8SHS5pm24BrbVlRlAyDPO3MRDfb4Q52fPZtpLZewbUwO8GEFKNpKpsUf3i9/24z/W96vpHO2diHarh155OJVDHCWxVPqmcdk0sOocPXwk8baFd7dzXNv4wS0yrXafCiG8knIbsfYSwbtlLRDTgFBNuJ15UQKTJDxlFGqfcTlKVLTWG4oDmLt5NC0shHybgvtU1mjBF4PgvNBeGKHiIuYPr2p3CjPtZOfSuTvuaGzdDl/f/NCEIQYB8LcXiEB28MX76k/PnjKSjIqKjIqQXzEErDi46BD5Nw/qyiBHJwCBbDJUSyMoJKVRLV05RbC63kaqOzAl31UqGPvv7X3wB1DTJIfUMM1cBGmzXy098mQliGIhKIgpCvkZHF1TIyVP/zfdVAS6b2H2/BGDV0/uFyfnj+THj8/7d491wEJ4ACKwjnX8aHhiR3JUPJUaVsSEfe8OjMfPIn4Ad/hMI/ckwC+rBajoXPeRMl5GOlgJd2DbESJXCIFi6eWQxtgP2RtbJkA/dQAN4EiRZhhxJHUc8A9cC9bdKUCqTCpkJW7lciAlyJSCdVDnAKFuVUjgPgse8I3Em6YuWS/OFkQClOUaGJeaAXQOGiq5rrIZzDREqZceRvJpHHZk/9RAU2M+o/h8JxVM6b2hHBjhbq5DROQucC6B3P4DyYnkrOzIIXJhzNGpwPW1HKLoqMoygTIxHFVWQkS8VwF32lycTKcl4Ki4wipThlRW+V/kdUvRKJehqSaKSxAE005XFDhUcHRV5bndA6P5VEVz1I9dSLTJ/gaH2dh/5OboDzMch5GOLkhqrPjZme++LeJnOozpOBq2zPt1PbmG3+VrSF+lPMv3N3Tk/1LJyKQYyJefdyeTxez/pXaEsjrWtls5pabaHMpcB3Nxy213bVkBminFku6lMapWW0ZIzxZlnoCje40U1udovbvGDQa962ymprbbHNdkOG7bGPYxznJ79Uak4JdcSygpz7ZLWgtZHAua022NPItUACMwcLwbkIbBwu1bPfveeT36dphZZkZrKwd+5IW/Q22BJsf9Oey44Bx0WxctPZsHY2XoDBpM1Qbx9rAJEQDCdDdrfJ7DlUjhal74rGyLuJtjJqa5V+sVPhrdt65sa5I7ZX8nSbJlG4GO0jBVTOMmwmXDhkEmRAYWRSZih19xJZhziHXmSimSRDPYFwsrd5sS8csyZeiLyf8m0BL0Fet9vB3eD+Bx5q7Y861+Mu94TbPDvLIA7l7qoc6QTzZj7pLhs8Sz7PpdYTMdG1Q0GI6XgNf2/mCZUB2TIjxCRJNfv0QRfVQ4Ubjl7yZTfj8FODd9t9uGPqqLlS1JUeLfjhLlWf68fdPVyGNsGbB/W4aIQMWJDeFHrdtuDt/Zgm3IM01tN+joMeD8GPW2OTXAI9Qz0RNBsTZ2sMZJqyWV9vJpsP9TzoPUcGnZDh/79rRFi3977X093vTa9nPF0/8qPud6ebXetyFz7gPfMc00yQCEWwPQ/Ced3iXTnMf/kYfoc35Mf0UVTe4CP5Nz67WWqo/98FeEwdPmdGnmjS1nW1eWlHm7gWN//u6Pp9ddTUhP5VqaqkcKG8ZWZOnzppUOyoEZBDAr9b7KvnHnrsruseu+i0o/bbabNqKywyxzTXTTDKEP300MldR12sBWzQ+hb6O1m5cNXXJ/33Oy63xsw9PrDrD3aY1LOWSh3z+VyXtEzRijAzV/qu7iVWZAVrHCjQizYW2YRsQFuD/awr81s7gLu0EzhY94C52hFu4nqO0+2cIazSMnA8S1H8TASL8AHO4OT9MFdFa1SLDq205tRHYmMExx9GBLxK/vPb1ACvUy4ulX1HlpGGiv9DvM/sQZDl0llXz/eWU14Ji+YvQAiRFQL7gNOwKPZ1s6gb6Xg+fnJnO9juPuhAux7m+seV9pVHhvsWax+7Ltcxs9/O1leW0Lt4JjR3bsPuDkCWOrtkfRzFFWcNgEYxo7ZNz5eAJoO7rLjemmnTd6CELtWB2eExt9wGVvkWN3UxdIEIq+yVYhjKg9aQWaaczwXNqLa0tvGS8crqzgl0UccSxrMTh9mTPYdgW8zocY9Oh86wrM1arM/JTEZDJU/woxM8NbuxQ4FCzlHIWMZp/P8LZOLPJYkGeBfwlmbf67qLEP4uU1FtAPdAYNB3gcbr/5vhMiGr5yRkL/YabtDaBH3bh0X82G5/tUwr73U+vE79gKupu9vAeiWHB40ER9pf3QSBKe+PBt40Oos56DAk//jHb/b0cJe80xO2uw1tnnQcjGj0jMVsQNUzdqM1lZN6xc+6bI7kPifrpL8Au0wGooSB0BcykKZU0mYZ/gIK6Ef56HvY1DmS8RZ0zLyXuSfffbbbuBvZNexK6n62P7e22TMjb2/TCPuh9b0Tz13nbbdA3J2PUQdqaZnLLUGUiLugwQcgrPp3n0k/n6Cvz2DgVlpDUYbVkNJvMtgvGEQMZjta6C1g8Qg03ATgW2v9o9OJZvUesX7svLAIM5+wcNMtt91x1z33PfDQI4898dQzz71AEAiB3/ghDgtsqtjIUYgQ/lAMEHAOAt30CAgmAQpSD4QBzg5iHhnwMr59vgDtIQvedKUsQYVk8snQHWVDf6+aRy3nXVAN0DNAJMYuvv8rr73x1jvvvfCrl/70lzG/+d0f4lHxxtKrk9O87XZJioTW1fNkA5EAh2l6EMj8dK7c3IhQ43XVpzdGsmiEFAXR3CcJeynB0VWvvnZiaqeLSlN6rlEVY/hQneKzjKOzLz/syZBXhqTJU6ZOmy5j5qzZy8yZOy8K4c8GuXPDkyCqKJFFtrDP+52IkCKCgE1+L1Ua5Geo2iA/cjAjkxAxKmggqingDKlMykuFbALVRg3sRdh6WENfHdnvTZ8kWYpUwSEZMmXJlqOsXHnoo7/ROfmWGuaNuu9QoBARbTQ1BW98WVxlZusuPIvTZzpeCCLNWXLlzrLoEMTppuAhG064dujwmRwO8/Yi1ELDCr56rDyx+ei32oUJfZuxgQF5OQqccoWyubnEsAnDPMpLddOilEJV4WigCJJcTEXRPAmRCXK8UP6TuojtcU+7380ud/ZJ0tEtTn79qXckuLdWPnlwS/lYRcooVPpfkLoa0mqsOaM2OgrXVS92hCPYQZLbgimjBKI8LJgKyiiBSC2+2CoYlFECkeoC1FBDDTUuJH1Uh4AwFZRRApFTJc0VaSmnFOLcOy2VlFPqoV4+5cPKG/LkyZElS5as0uIiye5oZRjNNPaNNuEpKvmOB8q0tQaR+Z6dHsQJGDBvmzLg7s1XukeJigtmx1IMzRBCAzgGDABue4dgjv00l6Mljvt7Gdj+nPcQ/DCg78484BAFIQ4FnIkCroE8+zmnp1EPXvzk+dnohU99wWBt9CGMFFiU9LwrEJiBN69oOZjP959YT+UJMIBZsXH0ZH5z7ycFw5dVvBR1NNBLP/uccs8r/+KuW+Ecmc/m5tzekKIpKaXfFIfx0HHQCdCZEBviQUJICmVAVshbsKtwgmBF4eqifiHtleCQTYJU/2uotwX2O+2+19mLzmG+/UCV4zlsOQNiQpyx9JDl2geDdfJ/NYfJ9afTAv7/+6M7jgJHbgBHp/1vP9/pzIVnLuiMAPzoA52Xdr7ovNjZ37nz9I7Tbzr9xlP/PfUn4pQCzwJeArzGMOCrwC9Ax+MC2yGLXH5U/ED8n5UFljsR4AEMs8x2OxxMDnNsNNtec82LHCmKxY7bab9dUW0r3W777IkGLSwOCfyL2+CAQ4U64qcD0W10NI2/pTntTOp8DtuS0Cm/HAyHPMpgiTTpMmQqlyVbjlx58iNAwduR/g3YupnmenN7W+2010HHiNCJq266k+upTyzU+UFovFDDjyR1TflJr4VwLRHQ3QHzIdD/gYsvB+BKrwDY+x7YPQLgk6d2IVkS3mmNAfA+feAR9kcbilX1NfQthcHIaZzATSf+6rT9d9fOw2z8d5eykRgqglpbGnaDNJCoIJZ9ESFGyOUUs+IqHfM0MOg6GkyKNqWiVjbpk1HVbEXjDZVkNMxYyq4Yv+LOig03E+OfUEcQSQzjYmrWPERLqW8cE9IhVpF0sYpILLYZT0X1nKRg0gPYobZGKRpYpsa4kmgJYLGDcg4jNcMjJDutnvONrbgNRAwKflWWJJkverk7zvvTvpthSSdTIEcDhYzlxpYahSfScKKOLSt99LMh7ESNqmxIqNQGk7esIiMTkQgMZNbvnKyQZ2/Pevfjt8AuSFEznG5Mqg/l/7aSzwIW8CROk4PgqIEl/eEc71VoF+/yB4zD0UhwUYPWOSx/2XIR/y2lIoUMi0pIZeeSG/OdXKXFHw5O2Ww0BCtpDMqqw9Lbf6RVRTC8Z/NJfJ8MQv+GxVIeNiBJZTLDnj+KmdMmAgRncEvAWgltKSZsBs6Vcq1mGNbrywJQq2T1kFT2SWq51VUJOxUyfxVdZiQ/Lee3CFWOHdgq0XbMk/INsXwpD4lADjSBDTROWEQQCdh5vDQG6LiQJpUul6gIO2knoJ8tsBDs4gRGz/o9I4Rl9bwF676547BlmLJn+hME2qSxPAJnl2kqOFU4bDAaVkGe1wLKq4AJZPfotoQZz8tPR3X19qRqgayFIDDlSG4RYVNqDETiEePns/E3qW3/+um98c60arIJ+wgF3jSauwmm/HOUIBJAI8HCP0dOTDJe7tqLwTVsG1TRdzBI0di3H95ZRdyuUQrmKOCsG1mwzOTF+PESwtxye0hpaAG+ljzNCooUxqLiRm4T/yyRxA8vTywf63UYpwQbqFARKIsoADypxQMMLMd0uYPlpcfa6R6FYJtR0WPee1Z5AEyG0sVBIG+rnjtP6JaaR+o0rs/xK41tk8IR051pv37nBFUmajHQWpdy0325IngWYO3fTrKLTl7Joftv4s+3gDcOCeQKmS1etK01PpaWvl0AZrVBRpUzLubJH9fpH0pK3iypeHbIi263MxU/4VSpMdQxtbUFFeei1g5p1DmnzLXDq7wpbqXS2C9FkS8V6TQVi7RPEQSBWafWUMY+Qi21KPRYYu3Y9uc29mFhJ02mk0ezGsX6UaeMtMxnIelwkHepbteSoNUNLJY/31OMa4zw3Dk3nb3ywy166BYcAjkoeRQupDP2a6GNRTJJPzZoXp46lpFoFNu4/QCIst4SotmZgVgiLYyTVojwMmbSGRnXyod7qHgyo51zNE/+fpeC8947iFQ1aWYo/+Iccy7lylS64VtUm+GKmT7H20QXD4LInjIhdS34kJ0f4zRjvxaKrDcr8/bO4zAmN8eCDkYDkab3hMfbPtTWUcLBhT6ns3ZJUSIC9nH+LDx/ItalLAH7Kk1o7v4zZrSRnHMtrdMZuFgDvr7vzE+nTBPSEEh/g/JHBJduDcjkjkvwqsiJGQ2EcLrmJyA/l4vyH8laTf1H2ftd7CLrSl0gXAHds4Kg8MKCwKCgSex2xWVy2iHFMBbErwOuDt2OApVCJwbBm6sfXrBujWv8MB6nA7K5hufkYLYjZArKlKbaB3lbDNu5Awv1Px6FIfuPp0k3YIo5ClXihkNEotfqOSBAgkeVQqO4POvCTVI6sVwczPWoVNLfxR/4YMA4LtKD5q5CtPQjsBK5KP3Sp7Rt0brOyCU/HjWtfBgCNtd1Iq7DFswQbqzz7JH1ZlHCdPJAU9qmgsv8E4qsGY0jihw69Xpj2EsV5JRMbhZxmYZxT5beYU+lsnkZVRBWlL0GOWe8b6DIpIhKECKrXhZAj0OAatKt8Eq2dnfDW/x+T6HuBo8YGPbqU9hJZ+otJqvFPHQcuH+BovgXvlSkk8QuQjiKPs2lMF6gHIbX80ClSKZg0GOej5653WZ1JTFXjibiWO+dNoIkZbEFNmeQkwub7aT6HqQ0IkrHXDKZfKxVlbSj30wkjKW4SksuMXRghJzRISuJVTD40aaVMkz/5Y+1f2lGMgu6aTXqaRoJV6lt3jLzw0RM4+O6xGuz+LDpxhyytvzp6wRBiLAy8hSfilR9BzcneJkoNVmMxluyTDnLmOQ21DiK54ZVTrrQv066vbVYOzydH5X71gPzPPpd9gYf00T6+cnvnLAttts6SPKs/7m9u7+F3WKmHirmV2e3cTEPbXjlM0Kp/Mp/aK5MxULWCAdRNjH10enypGUjBlIYjn514VndUf+XJKaUh0v4s/Bm2Pw0afcDE1IGJGeD2Wa1oH2/u09BfnUyQckyYfewcsNdIpjL4XnC9T4bNHmgWxsBM4HbyL6a4qInTtN2FV3cu0VHsXvgzdE9yd18+6oVB2noja6d1vN4uocW716Ey1PQaMN36WGiwuLZ+SG2o0i9t+pAxiqqPPBOjZFDpKuHFrM9jtueGBKPtsdOoLO+sHs1Yj1yGQqZKM5Ay0AK4tdjUxpn85lPHzkfI97xv6Y6s0KQLpuxcoXsv0+CyDTlm7f8ycuHRCmclO9IfyCbF4dsmvzf7BypuOevBC2aK03dbjpT50QIl+9qxUgGiEIBlhbRPhuhp6x2zn0YmgvXuvCHQ51BKEgAN7YHHReDs86DJg7vp6DmLC+YeCWCeFfq9sBDt40ecGSilHntiXX2SsiqsU2hInEF677dMmyPPedYRpsgdAnDAznYTP0+YAcJaZ1Kn4rKTl7pY4XLQfgvDucYYTeqYkPFWSJELmUTMetpFWNukMBAUpjHNVY0OBqsxTxw5+6l6sXzPhaR5w9poR3hzBXOKwshdxANuLzLc833cw6vDofNQCSIdYiJds7ZK+7VK8kTvGGnRzK2z77VVtj6XG6p5OGQWMsXduHKGVbDXTuVgAV8b3Ov1bcSbfC9ICNLa7PDaeja7Nbd1sop5bvxb+qJ922qV0e8SwZdcrkCRpUxtj1GUKsyq539ac+EBFhcAydPqKrsrkeDhSGu3FFWq/bfngtJdC88jAxZCgdOYzeJmqCQ06LqVznv2QsWW8VkmNg0LRxkhIuSJ5X6T0C4esAtMfmr4OWkTxMVkgh5h1Y5KxslyOHv8NZVcjfJ109rY7q9WDjguQUXQPMoyHp9HF6oVbmcID1b4gWq7QSu5u/6MMF4y/+Bf+Xf43dN9O/I9ajLp3pMFN0UXUZtXAlHQeDknVSe2pkHRW9PETzj3JexjN1/cu8lXZ8XrsOaWcfUswkApHvYDrjPzVfm6X9rSOPpjj3Hucae2h6KQWXr/lDPv5Iu39K9ciM5JnIG2T1hW7Hift9Jkyl7CLH9vWt+Ys1AvtZ2oKIXHFF8+psKLEitB/ZMm/3FqWLK8kYobEIyQTYHaEOKmtAqAvFZAuyiVoKAkJYEszpTzH12Z1oWPjxETcQp6F4YtcDm6l2tNlFNsvImIo8H0nbfVqePYglQIkon5kOTQMck3k9UvAOG7QISQuJUCdIwQyKHHnVITuGJ95h6VCg5SXCJiZcSKTNVN+rCpHk8qZU+jVtwuNi9awDvBB/n0m69q3PuJ9Nj8JJNVi95I5njrBGsnvEhSIw5S/Xvvrf/aLWGMuOLsagEhqSBSJF2XGpg02u7TCYtTTErf6AyLqBJugVjM1oPr0P8GasKMlIgwwyv8WznmR0QVI25+sABC3nirpA3oY8O5MF9NGbaceO02fycSsyEhhmzBy9DRd0wbpWaVKLexKeyQQeZPP1N/3kJON/FsdLsVOYrYPP6uGCx2iQiqxaZRjB2ZfBwx+Zmmdl7z5cdZioblVMpLda5YxFknzb65h1Tp4HHaj3bLG5j2QYw7Mlku5PzG7bKmZymhK2gQzXRqcGaAEc1Ini/K6ZHsDZc3pCFHvEdNR/zVjuMcxScPa/HFaK+UmWrOiTVtum5rb4gB1WwzbPep4IumavUP2PYBmkGQEt0bbZeHUxrCdO56SNn35fnlpTHOxUkbPXM2AaPs1MaQu2aCCOKmkON1goFPpFGzUe8T4X2LvOlljf6zDdo1Q+8nVO+cn4D9BeByg0xwrvrg7sWJOKncFUyXJFdG38me+K+5hqUyz5r5Rcn37cHi5vF5ZOsGDBnUy5Mfe6cgyhoOJPJDTM96qL1UZpoPrK8YsEje0UmmeYf8QCuASY7VCJBM9mM7MiUONVgrvzM1BTaddTjNrhfHgYJkjTzYQhsJCG2BuRgIOEeXyzCF89ktSzcTCS4XrdOGsqeTJvEc591X/95MehL9SE/d6FDaqybssqOCqFHnTjqn3Wype6Gvrk2lYxdidEPiYebqSS5v5E07etD6fAlGvV8NGmp2bUQKT4xQt+nhmQOtHrByfEcEyk0cPUpCTZRopoitSm8UR0113cgRGS1ppm21NUbo6q6lrlIOoQjczAmyklXyc6kLaz9+mIiMNc6Z+PgrBMfNJftg/CY3yYwY98PxOe98PwATskzUwcSCrKsvfEPHngncQWFkGlS7rrpLoFNCMtTGKbmiI+X+ryTKN9eMoJ8QYJ5mKR8xG/9MbFYVp7v2saIVb1bGwlMYJiyz/8oqcUCkq2D/8GmhW6HBVIHL8l914ZrVByxTB53Tf/VS8VWD7bjFkEj13MDQqFKIdRCMvlz4de2C1RFyOEWU2eM/NR2lF5K784ESbzo8fdeUAb+pxNgcsc/JeIHdt9R0hUGtBS/0vAVEMVClHp+dsRDxwLzu+RAXbHNq65ffCo7MhZWXb/dHZ/QbdmhMvZS9PChXpTZJXZlOELf3ohgqXbvkJ+ZLXUK9JmULLU2rkaFdwQlmvk4S2qsSP4qv/7TAXY7DBldVCw2PqR6r5NuVr2PS2pYWDyA8anBFLz0V4NrWIXYxUN+v4Y3DTsOafPsvwJHa8wSs7eO/DQC8CUTMfRejOHgo01FTza1fp4H6BO2PTRcMqgM0UuGuRjObIwBSA0zMHi7IiHWhOrQWFN8UwZobEIV5lYQQxWm7voqj9Nd6WmYbnjNHGQblSqRj45OMi4ONEstgQyd3lUpvoXJjW8Rmz16udDr1cfSfZJmdJEdD5YT8ga11RUZsyJhw6zaqkFdrjnGmJQwlJW+3I3JrC7lIf4et2ewtjZrdqc721zDrbS7MelDWQmrC1tZPHXUalKtrTJeh5mF3R7rzLIFs5b2LDKubXwzWLyyva1i7caC1olr5IZ568o6kaaR0VTcUibLxNnQJgf20BKr8ZmRXkFpZVJihsebX0eH7PjiydA7syOWmdjR/scuWIwxXLgO6c3Glw8W1lBaeJ17sf09n8WWEfJmIeMr9LPCBehgbdVsXR6cmzrWThjK4qxw4xyOar4p0O3xDNbUZM3u9eQj2VTdMpOlDxdLBr1W5I8enjpdT9W3JnKB1DAPA83FGD63z8KFlg7QbEBspoOmlbb6bRKbO6xCKh5zbIFYwqxmHgqdi4UQ7Cs/HJiXfE4q/NdqBo3o53/NU6PzHjjgmiP6rdz6B5uOh87isXXte3PjvSjHmAXym8B8UBoDueDNgn3mxIIbrS+nP/E8Qc3oXKwALFwkbLRny8eDiejZ+cDsxcmbUQU6Gwv9XWeYhmFP+wfgruhf6CTst3k74yJse5jmzasbvtqe5cO8a0FPU8yHNsX2CmIx1KZtABNzL1gh2ZeZ/CmlGUXRJVgIiA2dGG4HxvA77uhBO4FeN6ImIu0/PI8wfTW3bHhkYOdhgy8dnvfBhZmGKRjddIzhcyzo6DIXTMxQUzuovM6+CJ2OBdJxwGsPtu0LYXyujd2MJqCtWE5S05sOCqElAf2gFy9Ivm60bQVdBHcfXFaGDBZGdIOlFX06t6cXLi3XDRRGkMGyql7EbTbmwxkRZrPNxmzSHeXDRkMBrLKaZg+rmRlVQAqxOMa9ZZzaOlCPIknGVm9ELPZqg0XB2mbj5Ip+xFHmsDnGDxpjoB7o75zx/3NXm5AaO6M+GcrxSLSMydTD7W7yJ+f4EkAiFPc4CppaLEJjC4ih45P10Y/Fr69LIcr6MuabAkKuzBGyh+cal0yZXRlBDP7x8tMYoMk9uiJjV24fLmPj0ClzD7dP0D9GetoFP8cPZXHWOPHm07YRCerlSoTQW5Hj+UVFKBIyWW3hJpXHWslbGf9GJnfV8+VqL0et/BgIeG/pBqrPlBjUIaPNUdwBg3cMyzCCZRjD5QQbtoWyVXkH+6HzuBwO4e7HTx6LdoMBQn6vJWtSeccWeSrGDKVhRW2eymDJg+UNkXm2oVrH9C777n5Ui87C6kxYNBHtwnCAL/Gvrc88E0iULV/9QdajTQMdqNQ4K0npSDKOoS1YNiDFn9jQvM6RmD4ya8S9NSuB+07PpqwTG4LD+qT0mXPezW9DmWgfFgHYQ5zGo/1XfPz2cMByQGpJP4YawxhOPm8Y4oryhx4+MszEyAYwBmnBGxDfv+Cmv35453DvjuGCZlSMzsTKXuXH39AODAfsMyzDQMvFvlmyQTBfMVGRlwMC4pJL9872fTiQqmqeS3PfPVu1CoXQ6dgMRo+rV48VAqZypPgH7gbMruWijVnYD58qRkq+T9+TdGr955+Ih8AhvCXsckru+VUnzi5d9qHCGqDbFo38QpVck7K6Lz1sElneyP4uXhWgk+/AxXfErKtvvEYszzvMYC6EvmwPFqI5AnnI+QO/goqXT/r1l51ABhcQWIZExt4SgnK1YHPczPjzfiUJ17AlUdx4VCdKdPblomrpNVGxuz5UZ003VI8lOMUFPyyUWiqsaHc0YpxU7QDc1FCrw9yVF86a1O7ymMKQtAudQmePNKRXrmxRQ7BPK61wOhXF2UqtQDBC5XGhIAf8Xziq7Wh3OGLqq8m0i9CF6eJEzwYvrJDdF5d4PaLi+3LYo4smeIT/TGuakZjcQhL741/eSVCuXeKPCyiKhwE3NafFbu7Ky7dNbvZ4HeWwvtSR5lW9psX4PyLLNsnF0r8kZdkOeUlIozf4pcfvhwuD6UCGtODUk3HIkYRsEBDdLNF2Ed8GXkpIvu4jP0MqrVgUf5PD9BXMeJ544ZZt/UbGpgTPuN8mgkB2gvKgdbcV/PXN5TV8hphz+CKvUbP+JJV95lPEnMPpSBfczxgk/vQNyX9ByNs7jy7btoLKUshnm4JQSCaq8SF16dYhc4kMCaEoklMiN0sOHvuk9pf/3BmdO0yxDHq6WiKe+5gPPVktFs/7fuQMlzU+c6wUyJAuXHorDtmJD4E8gY2WAK76tgnyQZA3jLTjOKGrtIsHgnnCuqzZMDsz/4M3eOp8Z7ok4C8p7xbmrdIPKJHOMzfGRUWleBBNUK/SvRc35R0ByAvhdSWciZwTwn2+NiDtV/6EELvoAYflfaXVA+zbhwKFGGdCtWtHJ9fKl0T2Y+tpvlDd1aTNoY5LkSDduPQeHLI/xYAxspfrWvvuzWMbTYnpipW53JlvDAzmlD/aRjr6Hj2Ag8mHkf+QKakTTpxZWhWSaFEXA6UWQPMl284DwXwBylYn0wsT1IO69/CtyM7rHquQDj3xRbrMepgFZ27tZ9oLQr444J0HyA3hm1ySCVndMJPn+GAts6DmL4nPX1g6mY3yXGsl7qK/FdB71PstzNxqF9bN9i0OQKlZHRZPT2Ghp6/DljU6WL0eb2/aW/B/gnKvT1D5H6xhquJiV/wHpt9DunGcaTjkI+ACToGWnapIik56c2xJrYyY3QkDPCceWnNTVHxYK0309QVRjeyauMhdH5pg4azOHXmk+V8slFA2X9TYm81xD5mG43TjkOybK85fEDXuxbfDDiW6lvuoB273B1cfSXBCvMWxSTeJbuCCEqaUZELGYmpc/zoIuNxEoEG6cJyZOOSYTsCcTXALwkv+Z4tjYoN0jtLlgXhttYRHAtpP5ydmMJxhcA31EQoxod/GnoLoBzwUuTypgS64zE996pJKJHK1s0hsVeelfR3XZaW1KRQDHfwMLJ+/SbfO6VfRJUqtu1wG1h20HrI2HzZ7HS6KiPGiVDtAzOdvzkzZbXHL47hp/9x7bBf1PHhZ+IOFoBxwf+6kKVeS5sb1H3cMqdm14dXTOQXj748k4LoQYA0TlCtIc0G/MY+gBn/XPn3aNLILy+3pNnnPPs04hsQhvanIy1TkMpKfygM/6LY9nThjE4Y2sd1umL8pidpSY/LueeqeNhNDjraqWMeQ50h7Kv+rVOQxUoHTfYlDziC5qTxARiqw3GoscvgiScII9Od2H0TacbIWHPLbLzk90JfTGpr4aPutz7Cxjde/IY8dvs5LpDEVOpeKfIVUpzJA66/8E8N8j4nF0osOXwuNHtSO/fGyAOR/7zn9jB91NxfoJh/4TtP4zgflnpUw0PanQC9S4atwOJUHBErbsMLVkbRwgnDZCuw7i5W2kQFmf9KQS7jOmrwdXNkDqmt0sxuS5gXAhkYMpwVjuPFj0n2XGVNYU/iWTszolIcWE2vAgTkUbUY/sWtL6wyDGLz9TNew5crQclzH0wxMRlqO8bYRVN1nCVjsE4vMZpG3dO5W0pnp4O9TldbETiC1sduW+NevDKy/X/sR22KIRGGzOQprE1aLzcZqMkS/HlOU3XRTSJbG5SFTHxUwXGBPbzZFSjU21cjXvj9uzAhMgSsq9LOiEf1gReUUJKC88efxr9arbKUaUzi92bsoIdZi1CwqJDO3gf5h4bof01qZaTHDY1Bh/MVYsp81RWTpwY7KdHbMofkWE5jjqNRXVnceh97rY28Z+2oLc7LcEU9Vj2F6+WS1LWqVcX0eQzsvvO0tbW0VQ/X65mesrW4JFjWic7EH6gzzMKLFGAM4grdH3E7Jb37V6Npl+99XWHIZD9qHXwxI/5JyRsfOWpv620NnJ8TltDos3TlV8MTLQtahKUZiRd55BvN1aMFwsdDgKDDjnKIF9Q6Lo1SDlLnS9Ip+bZLnLFk+lCJWOFXiMj+a/hsnQ+8XnfrzF6V2cPO/0EnKtQvnnN6d+XeprKNsQv8CVTDuVg1GDuarZOvZrBPLzWK7t3fuVtKbmfmtEvVsIFLJJqcD1CZgpwsWsT68LPZE3ek2eogaJ4Z2gyGse5WAhP9vfTFr24t9FiuifkZcsLAiq8IqtSFat0ZQhRxVbji6kKIWi8lU5vGu/SFhD+XwlPbS52CZ04IUpkC2hS0Carfv0qIB6f77zmiIY9Tm89b93oc5lMvbDP+LSO7/87yCyu/h8UgzTmrNSgKthju+tMrqNdwwSx1tyLbx7L7uguNfU6jctgv99iGhQubMFVtVHuLrcbPQ9JnQjxyWoE/EpD4LUxNuLxWyU+8i5yAxZ+o9MZSGfmVZqsMbQKsRUFPhKO9fcaU97GyLma3q7/uGhASnZoI7XBF4rzcATS2u7NIvq/IIWzJzSmQJ8A+8siwHFDmn1hzhF2dm8ou+8Dxx+Tf6Qds9AXC6BDuKk9kl+zKiCQN8QiZxzU3puotGrme3UCM9K6ZygCS6iFsUf1huTtBgjncM3MRfMD0ayJFmnDp2S9hLFG+BZWhaIN4bl++mSN25skbqORaj+Nc5J0s2YyKyX8QYD+flH2Md0BEDn24n/x2VwAiZE9hkK7YwSQymDAvyQJA/8C0+/9exPVZl0V8clvfZqwnrFh0q9WCd8dWuD9mGBFqaFZuTtAVMIfuT62k+a/dVkPCCHngo70YJcj2HDcTAe1P84R+FsIe9jvw1m8Me+vSnBOK36gu3E5ImsStHLbtt1AOqKO1OylIeO9NvBtxetX6IxSC+7zTrZgujFBTvTHnbW9SbEhzdHjld33WAlkcrPB/Y+lE6szirxbvY1+hLcSUc9sVFrX0Hpwa9ayh8xi5fa7b7+bH19LFqvzUSvJ9nx5rIpWvnyxU8RUedxlRk1ktCQaOINh4dmyGQCZweid5QKonrIytnFKQfnnGMWMgvYFb321Ocwpi+1HA1hkWvoeVYMJ21wxv/S7RySXmFHF0UqxJpVa4cARIo8tsseeFiUdrXhZ6QTvmvVC5Q0rbtKEujl02dMj3T7Q5Ipi1NJWfMBTh0NfotQz29ltWNQZerIWAd6u2xrm7IdiL8b3heYmtuLrGN5/uGz3/e8bTlia16NZ6DW/VvpTrXpuofqEFJqVo9j6T/wrwl7upONexfjFRASXXH/LaVvb221bGg2zNxgzvqta6amO1e5ye+j+/7CfLZGOt9hVO/KtW4HMv9KbUUlKg1Mwj6M4a+uCu7Jv9M2wNzcoN6r6cMisgcvoCDhXmthlZYShogMxdWz7C4y0UmZ6UMyTNpJNGS2pDLhQls/prVVAKeF5FmN95Ts5rG3reGHDxeIuFluIV8ldIW4JtggxT18FPkklO7NaxPG/4h+2YPs2nzkIVlEU6Go1pi8Gph2B9RxRKciWVSjTcDNRe16oGJcBruYU+Y+unCA9vSD/oe2M0f+YfBMyxq8D2JbKMxb64lBy7sDLB1HrHQrUUELhekFUljNTRjdXGIRAJjq/4yxVOvMZa7nI7qTj2gprobbdapVTmG+bGWNb5a3JpiSr8np0rY7Y5AdXsk8kk8v87r9lpk2cxnt0SPi2CzJapTl9kRYd6ZfC6Y5tTqs2Wzig8Z/4yAZHRPEBmzUWVHAIZu1R1aul0spn2hsPkyUehHv/qGMdso9aj0ulC5wu4okqp8MP/BNy9XGXRBNb/7H7HAfBTiDPz35luiqNqXkWHKr1eC2nEfFNEnuYOlUJu7SDjxqEw8h+dBEM0PcqWHe+JIfFfUkGkugzPKMhEo94MwV+uOWW2TK0LInAmtQ0GwJpX3Opf3Oo/3Jo/7JjB/MPbGVU5Gyrzb9jN5foh843CBn4bIw9kOsDyV+xqH08/l9HM4r3E+4jyDCBDGk1wWGDegSR0oTS7DeCAC9Io1qdwYh9NEefDvvW3o9AW+Cwll8PLGQQLbtSG3QMYX5OzKQ3cQe7+j0nf55xYK/EZVEFTcYh2FSAUNnWScU41zkjsbCkjQl6DpHOncrgJvmkro/330x5TRqVWlom1LGBwaeHHuV++ajnaPbz8l334ayL4LPg86OAp+WNy662p3pk7vdqjVLodeN3IBu+hh7mLXEmNBqttZtVK7tXp8U6tWoDrFGDYYc2mgeSQBNLcYnhtaQHNi2OQbn6MPTbmdsgCL4jZr7W8ZFmCADijny3pZ1O/irvJlUh/HAMOnEwYhDpTq3ssSnn5CjqM8OSVk7U31QOmCwYRTMGzwcaRS6Er8d2nsXhlIHCZtbnQ1J+i8+437G1Cwfl9y5S+vve69GvdmN7hR/HF4NTnNQyYXppHW1H783vb418aSPi8IDyeO2Ync5fN+mL1436mzD3L3L54/75Dw0LzX3tmXe/3ayeOLe36Yt8F+AjdWDjtrztHGJv/6odttSIh7MLOnk0L/e9+7Lo+OkoxVclZx9MLLM6q3VMKDpL/oXW9+JWS4dbd+e/CFD8UlS1QapatAFHeRiQS5o3B3DZnxUB5m9OIjwCpk1tVclATVTUrRt/y/aLVvPBUw+pwHsU/2fYA2yWTyJfkiYFvlbhXneOW1Noe6ptDdJwwWmFqz78fHmtEH4XdhPO+iN01jgvSWfTY6GQumEIIz4PGVhsFoxDA4vmKGNpg9Uzu+wjAYic5ipZ0uW5XVosgvUHdlBxqjoVZFZmaMKShQdQUCqm4w48mU12wtzUAqber0oM/PU0KhE3GNGlLs1WtHLn5P5DegkG+LjPJ23aveGRzfuHcPyPuAVrcBR+Poe7l/EsQ0EZ1GIgtoIqpSuojBXAxjRUTv/rfakn8tG2iqdw7SM5iTC/SqUFCu1jSGYvQZquygTKMGg8XUrDqnPnegLtNYUgEbjGDwcynTYSyr0BpN5VpDGWB448uY8WXilEjZk7KUSPpNvieB4UngdxlchtX8DLKHn6/mx6vqG/+msCL8jpp7cTX3BFpGe5KNf5pzmt8anzhgNHApwmz+KRDR8lQPYRWrGA595IZEvJT6s4/LmJzer9lhWKMWcXvW6Ciqo8pLwj9ePyg1MDlXzbycOctpHG4To8Ra5huY6o0UzHXWdqLLwlFdf0lBp9ShjZC/j986gYqGZqnryk3zy/MVC/O6WyOD6tDEoUh4daNbHMsK5IhASf3r+vrXOxKPhI/cvHAkcuTba+fSgGMbVT6NfHx2kMI+rUrtHX+EBbPlNV74PdZPxDy3h5j7E4sBSLkeNykPgIt2SSYmow3Jkm3l+cnyNyT6t4Ful7G2VLtVyJLtkJEv3l53rsWcRhKEasIGi8efifC2744f735AvJ0NRjfafNrFmVoCuTBn57VTl9K0/8slD1Gugqn9UCzpkxNX3qKvDhSSiDxrnnmuKCvHqIE95rDABQIZqKQvOx18MzmV+yN5LG9qSdsMarrNr/uMaN8CDmy0e3VNWh2J7A9tvZY41qt8oVJ9qaGNXdpA+ORh4McNqe90s96iwy5OuVL5djYffDIK+2XyfEtWZsfUYElS2DeuxCYrMhgpLjtd0AFr+oXM48JzJFWVWNZ+Vaau9kCgYZf6i0KH9u+AWDXcAT7eqHHRHVD65P+wS/dmCHmC02LpJG6a/eas/z5ex8nItTsU6x5xBN/HzZxx+Us2/znEzeMwA43h+scCtDAL5G4c8JOidkmxCVUrGfzpGvXnYuZIwvyfHmfJJXuxMnm7R6iGfTJ5vs2d1TLJAwaqYEqRoli7xmMLLSkpCy2O6hp4Zq59wMwqrVlQAs/3Vi8uK1kwmut8raKIUgzyPGgWyofxFYmKGEbTJA8hIPQouAYPQ3dVFSY9peVNGtC1kfaUQX9Goz2jM54CHfLxUMUE/X40QGEcYeLLFthVJOEhBYA3CQxppGHVcxHx8p3D8xWlZLKO25+XYbHdzVpJOjYu+f3CDze8OJbJchUS4Ytt71zDKfknwF5KZV5jUqm1p9+WvQvOjmhyZNpck1mbmytXq8eWOWYTnJfxQ05LCNaGWjmcRUG96xaB3V9IE2XyRKkkUS5LDEgOWOVy2wGJ9IBNLrceAJ27ycd0C/DEIiJ+ShpppuDbcTzeuJMCwcmQIfVCl06dHZKrNU3P1iHGq1FHubaQH6VN2bB7iYQFghTM+oSw0Kc/DYMzf8T2EwjFRPwCBPxXWEpEqDMn3EPBt6ZkEyNC+sJ36drHLwv5rbrjDn2eThXIMKL5lSqbMSLSOSvCPeRxU9MDpIggSeYlO7wWnXpXfe77+UapHzYbo/WavIZ34XfVowfhg0Ap05zU4JfDHq2o3OEQF7s1alHR7DumH415fJO33mHszMlz9DQ7nYZ8KLEro4lBan9UTAnZMH92AT1XX6gv52Yafmc4JXzqHI40Q10YRay6fEFma7gnjTBVVUbNO7N1rNTbXV5ozaW1AuWypxCeUVEC0n/THl3RtCRC4Ve1jll6zeUY/UP9BMwEGjQDo+fo62ctKlrMtaZApUQb7shHhRj9x/oQpuOIbp5u7tSvhwiwpwZbCqyrmprtazqiOYif/3GTe3MaofJRKSXqE25LoBhy3LJZ1VXSgZDbRHl33ov+SNnfrYS0XmfT+SC/fKauR9e9LFw8MIdluTKiBA/P/+b67fyJ647r4I/pM+tw2+LFR55AHfj4TYOUY5w+Lq+Xw+3lcfs4Cxa0rzcSY21wxszv/ug4S6PMf8DXLSddJ8+fup55vSnfdCDv9jtJruGk8DBOPYIDgg60Po3Jqs9G+C6nhN9+xFdIZSiKyly837lD7YAXdVz/++gVOZjCzDlD7QTPx33KsspIvHyTSJQFrsr5jNpFei644hE/IxHQly5wv0cWz0XHcb9ikE/T3Nf6ruUCSz5W0BPVCe4RKL0k0spPfn9/AvieLXu+/4cl5SRSIYl4XD/pP3Bu/pUvvrt7aSWR1EshXNUJJkR1wPss9t8k4XEiuZBEKlvy07c/ganqzWujm9eem7NbMWc3iLtWPbuvbWdDdEfD9Dl9YE8h1q1zKtmGf7n/UmkbF7yJdSJuJdv3L34clXpgHXj/5516l4YV0YyT0RgX1rfu0LnT6uFwZXT6z8vB9Br3326w6MUlTA8ofecpqflVQOVIi2GBzvssnTIH90Y0OfP6NBDg9ssNlKffYrJ+SWf/wmLeelN1D4bvqdR3tZr74FJgk1K5Sa5YoVKunM88TqfvYzG+otO/BpwSQoU8JUInCy+ki49bGL/PfsPGPgLnQxqdAeQpmNNezGlAlq7YuppC832a7HEmjc2UCwDlXM/QO3hieDTZ7Uz8d4pQCprtTIjF0jJZfBaLpF1orHt/FZnUQE6p+2ZnYaCli0VimYS5a4HuW0zIwxzsNRcmKadzvyvvp/UESj0lZZB0Fdos3K4ExTgbXA2Rrmhg5zd1KeQGEmnL+2ht8PVJ+iT9wjP8wRRKA4W4/pun1P2zOreQdN7kt9gZXgY78Ui89mrXIGBhI19Lo226ej4dZkiXzOzUzeicsb02WpL4CI5u6iOSesn4szAYODd9TpdidlfbztpoaeKN9aOzCGQPkXBvKTj9Br6GJ/eSSH2bNNFH8RPXrwGzzjnLd9RGZedkXZ7xJ4FYSCJ1jY5sB7SC1pyqojmivjoy/if2aLJ7ZdOhdBnn9v8Kvlo8s2n1Nk3fXhYNMopC4/D8CcmuTz4SC8Y+ibt4XxYsvCBjqOTyxxTap0Ov3n5VTrcxF2I+WQUGTrXPrPMU1LXviKIotzwOnpTlB8lGQnUxlaNNaEuoiS9VP2D+VURdPQpLndYIpquEOi4zKZZQGpcvI6ro+Njc+FuHk6X1O9JSfZ0rZVzR23GriTc6XIBk1q1ZtJaUNolC/GBjwTQwuYTxP4P1P4NJYDEIDfKp7G3BNip1Mgk/uSdad2EIEMD/b+Z/UPOBeADkRBxXBzp0KV1OV9K1SAcT/fq4VRDTsTiujC6ly5FWSU4F18GUVDE4CroUyRViDJznJk0Z1wO6lCZnUbQbaRU6Q+JyQ5fS5UirsEmwGXJSp9r0JYMu0E10C11ENiUkz1CqaNgT+YYu0E1IVHSpIBO2StVbAroATcY+GPqKJRJmu8OmTGjoAt1EtyAR2jrWB9MFugmJioOUmAmXGLFv8n+dd8qedyrvtLzT/+mdcYZ35tJm/SvSNRuje0+IReaU8IMrl4fxXLwZBzDHYBFYObwsSDAbv9xDS32LG6kFV7KMnH2ZY8ApVniwW++DK8wVrunAla6VZBof/P+D1GrpQxvbVKcdFqz2VXsbOcX64dgSIlE6I4Y3gaOfm1tur2Vg9n2bnRWM2re7GCaCkx2OHqScsug0OoPOonPoPLqALqJL6DK6gq6ia+g6vIFT+2GV80Cn0Rl0Fp1D59EFdBFdQpfRFXQVXUPX4Y0wBn4D7PoTRCb31MvsVy4J+wLH3ByTh/6qS3dHqtymHcCbenOl8DAHG51NeOUzjFk1gN5YLOQtpV/vhF9w3G8y329xUhF9SjiQLS/KGjCfXJHgfz8AsP3z///+6z9/cO+jHfq/Jm9/5f9WwK2X1p/m+Udu3QEOwElgPrN1TlA1Go9qMy1lWxOmbfYxQ3qgN45B1VKtZ8c/zZFtPKOn+wmgBIywcf01P6wwpFHEaVB1MXy1NNT1OEB1GWzlB+Y9p8y6fh7qvAIaQ9fQZeqfrSZ0q++H92sP5x/63PAK3fIhzTXpvS83r0D1SLf08F1y0wTnSSmoX8f1CmgMXfNdFtC5yLxCY/u9jF4nTfK8YmJmEfTzmSJy/dpd1Fesn3o172LBMep7M4IZct+q7ACdGCIoUbd+iTHFd/Bjz1jWVdbb1nlksPyV5Uo/YMYum2pJSKs2jrTqJze2r9K5Td15O+cOE9LmQG0n7rIetFOv6YfQqjetpMbhbXrgHw/89VTFYeBe05jXgW7i8WQXxpqnDOshT+Y0XUgzvDRh/VF5W7hBt21EOOh+EIuFohur1r/Vth51cW8zoalsG5HSIZilFEHfFGPXave7LBTHi4XrLVc7S49Vbz1p/WmrxozrbUs0JvhV+ezgLhFTZ5PwIKUkFgtFN1b5F/eY2Yy6eEaY0FTOTiKlQzBLKYK+Kcaa5v5cE4rjxUJzXZ0L9FjVnuSXrcUYjbIk7KlpY13zj+k+y6qvu5XOekI4uA2Q1IW0hAd6wiIt8dZDHe1757lUdHPc0hqtfW7LG1Px5J/3Afc3rzGRmWYMd/z1zzWaqaprLsub2nyzSb3RljH/iC1hHPT6wlosfX0EgV3so0+//XjCaf97M4F6DvjedXYnAPj+ZWt3qDz6bXu0PQL2EYDA79NO/2ORrFFnQtVL7u4zS7E3YL7NY8Yyzhq2uRXrmczT0IoX2TaYsf56xnowR23Tcr1tO8MGhvziDe0NRgXyfzT9/Od30HzKc3vDcxaQzWx+E6IcLuu00k4yNjayDu0V1k0YDd0M0hYkpF3DE20r7XbYljlNPL6X2sE85aydZepbtmL8pk8APbN8SyefeD4TQveSVssgm2y7vb5S25QZ11jacQNhn1bbICTbeW/74eHzJl00Jpc12Wyl7pPR4LXnGrpxQA4Oir1CTqbyMMgk26orZjJtPvrgUUKcq9vXUM5SwvQDyzFq3k+3CziCS+b3wlyjHDIzyiEiEopg8cGOiKfSjURkn0gZqujh2jURagxVb89i7y+8oe09Hl9YsOJgFqSb9VKB/NqNSLVJB20dax2s94Bpk7pDTEHdduC09Ju0w6HfWZuTeeKTDS6553TCupfXooQ2mSvQapOhmKh76yrGpNOh+SjO8empyCkVOGN4fSFkY1FubobBQ2AzCIAb4bAEFWCCCPN/3/oA3NhffD/k+0HkoSS3GWMP9dO0nKZMWxlTv+EOBhyowwYLERAeWwKsWne2zQXbJwjbfG7AfbVl6EJxvLWFa9iFQtrndjBhFz942u+Wy6tH5cACwUHTl3q4ujlYsy1O4/BwEwoRwhz04Wgo82FNGKaGq/5wxmpleEATmjmRDlpotrayMM3qgPVs12hjgFfCHwp0d+PwepJCO69tQwEnq0bBnRTAN5vWbkPqpm4jPGuzjZIcvI0WUfw2RhPztrHMum315OCexQqOEtsaUwrb1hJHt60zOQW6DPPSlZ8K3E97bTXUTo4uXGyjpcZqalo11+Ja2zl0gBYVPuAJlUbnEXtpeiBd+OETWFl11lgnLWldqEiQNirtDWkeX1mRTPnKtNdVJ401VaYpua0Zh0ilmmpu79lGQ51U+vi6vXY0sU1kY+OQqAWkC3uvdBPaRdTGLkaiothaU4I0o6qHpkAUnC6G80wbu4zjNaVPdBLNYX/qh06qdG5FEpX0dw4/pa4U6YX59CGy46LYq1RNtkKjiLqnzroMaauNRo522YiddHDa0C9N+GTmIdLu80tFDZlUjJK2dm0RQSNXt9RFC/3aWVroxqSZGUeXKws11FbGgkOmmrnDBMZzWZ3f+kqUG366V2/8VH0JAAAA) format("woff2");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:"Source Serif 4";src:url(data:font/woff2;base64,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) format("woff2");font-weight:400;font-style:italic;font-display:swap}@font-face{font-family:"Source Serif 4";src:url(data:font/woff2;base64,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) format("woff2");font-weight:600;font-style:normal;font-display:swap}
:root{
--bg:#F4F4F1;--papel:#FBF8F2;--creme:#F5F1E7;--text:#2B2B2B;--struct:#4A4A4A;
--brass:#8C6A46;--brass-cl:#C9A86A;--navy:#1A2A44;--navy-esc:#101D33;
--serif:"Source Serif 4",Georgia,"Times New Roman",serif;
--sans:"Montserrat","Segoe UI",Arial Narrow,sans-serif;
--min-font:17px;--medida:42rem;
--traco-suave:color-mix(in srgb,#C9BCA1 35%,transparent);
--traco:color-mix(in srgb,#C9BCA1 55%,transparent);
--traco-forte:color-mix(in srgb,#C9BCA1 70%,transparent);
--foco:2px solid var(--brass-cl);--foco-off:3px;
--easing:cubic-bezier(0.22,1,0.36,1);--dur:280ms
}
*,*::before,*::after{box-sizing:border-box}
html{font-size:var(--min-font);scroll-behavior:smooth}
@media(prefers-reduced-motion:reduce){
html{scroll-behavior:auto}
.cold-id,.timeline__linha,.flip-card__inner,.scroll-hint{transition:none!important;animation:none!important}
}
body{margin:0;font-family:var(--serif);color:var(--text);background:var(--bg);line-height:1.65;text-rendering:optimizeLegibility}
.skip-link{position:absolute;left:-9999px;top:0;z-index:9999;padding:.75rem 1.1rem;background:var(--navy);color:var(--creme);text-decoration:none;font-family:var(--sans);font-size:.75rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.skip-link:focus,.skip-link:focus-visible{left:0;outline:var(--foco);outline-offset:var(--foco-off)}
.watermark{position:fixed;inset:0;pointer-events:none;z-index:0;display:flex;align-items:center;justify-content:center;font-family:var(--sans);font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.14em;color:color-mix(in srgb,var(--struct) 10%,transparent);transform:rotate(-28deg);text-align:center;max-width:55%;margin:auto}
#deck{position:relative;z-index:1;height:100dvh;overflow-y:auto;scroll-snap-type:y mandatory;overscroll-behavior-y:contain}
.screen{min-height:100vh;min-height:100dvh;scroll-snap-align:start;scroll-snap-stop:always;display:flex;flex-direction:column;justify-content:center;padding:5rem 1.5rem 3.25rem;position:relative;border-bottom:1px solid var(--traco-suave)}
.screen-inner{max-width:var(--medida);margin:0 auto;width:100%}
.screen-inner--cold{text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:72vh}
.screen-inner--pivot{background:color-mix(in srgb,var(--navy-esc) 6%,var(--bg));padding:2.25rem 1.75rem;border-left:2px solid var(--brass)}
.screen-inner--matriz{max-width:56rem}
.screen-inner--decisao{max-width:52rem}
.screen-inner--fechamento{text-align:center}
h1{font-family:var(--sans);font-size:clamp(1.75rem,4.5vw,2.65rem);font-weight:800;margin:0 0 .65rem;color:var(--navy);letter-spacing:-0.02em;text-transform:uppercase;line-height:1.1}
h2{font-family:var(--serif);font-size:clamp(1.4rem,3.2vw,1.85rem);font-weight:400;margin:0 0 1.1rem;line-height:1.3}
h3{font-family:var(--sans);font-size:.95rem;font-weight:700;margin:0 0 .5rem;letter-spacing:.04em}
p{margin:0 0 1rem;max-width:68ch}
.lead{font-size:1.25rem}
.meta{font-size:.85rem;color:var(--struct);font-family:var(--sans);font-weight:700;letter-spacing:.06em}
.cold-quote{font-size:clamp(1.45rem,3.8vw,2.1rem);margin:0 0 2.25rem;border:none;padding:0;font-style:italic;line-height:1.35;max-width:28ch}
.cold-quote footer{font-family:var(--sans);font-size:.8rem;font-weight:700;margin-top:1rem;color:var(--brass);font-style:normal;letter-spacing:.12em;text-transform:uppercase}
.cold-id{opacity:0;animation:coldFade var(--dur) var(--easing) 3s forwards}
@keyframes coldFade{to{opacity:1}}
@media(prefers-reduced-motion:reduce){.cold-id{opacity:1;animation:none}}
.scroll-hint{margin-top:2.5rem;color:var(--brass);font-size:1.25rem;opacity:.7}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
@media(prefers-reduced-motion:no-preference){.scroll-hint{animation:bob 2s var(--easing) infinite}}
.stamp{position:absolute;bottom:.85rem;left:50%;transform:translateX(-50%);font-family:var(--sans);font-size:.65rem;font-weight:700;color:var(--struct);margin:0;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}
.split-cols{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin:1.75rem 0;padding-top:1rem;border-top:1px solid var(--traco)}
.mil-labels,.soft-labels{list-style:none;padding:0;margin:0}
.mil-labels li{font-family:var(--sans);text-transform:uppercase;letter-spacing:.12em;font-size:.8rem;color:var(--struct);padding:.45rem 0;font-weight:700;border-bottom:1px solid var(--traco-suave)}
.soft-labels li{font-family:var(--serif);font-style:italic;color:color-mix(in srgb,var(--text) 55%,transparent);padding:.45rem 0;border-bottom:1px solid var(--traco-suave)}
.planta{display:block;margin:1.75rem auto;max-width:100%;height:auto}
.timeline{display:flex;align-items:center;gap:1rem;margin:2rem 0;padding:1.25rem 0;border-top:1px solid var(--traco-suave);border-bottom:1px solid var(--traco-suave)}
.timeline__ponto{font-family:var(--sans);font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--struct);white-space:nowrap}
.timeline__ponto--mover{color:var(--brass)}
.timeline__linha{flex:1;height:1px;background:var(--brass);transform-origin:left;transform:scaleX(0);animation:lineGrow 1.1s var(--easing) .4s forwards}
@keyframes lineGrow{to{transform:scaleX(1)}}
.adulao-comp{position:relative;text-align:center;margin:2.25rem 0;min-height:5.5rem;padding:1rem 0}
.adulao-comp__word{font-family:var(--sans);font-size:clamp(2.1rem,9vw,3.75rem);letter-spacing:.18em;color:var(--navy);font-weight:800}
.adulao-comp__tag{position:absolute;font-family:var(--sans);font-size:.7rem;font-weight:700;color:var(--brass);text-transform:lowercase;letter-spacing:.06em}
.adulao-comp__tag--1{top:0;left:8%}.adulao-comp__tag--2{top:0;right:8%}.adulao-comp__tag--3{bottom:0;left:50%;transform:translateX(-50%)}
.flip-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin:1.75rem 0}
.flip-card{background:none;border:1px solid var(--traco);padding:0;cursor:pointer;min-height:8.5rem;perspective:800px;font:inherit;color:inherit}
.flip-card:focus-visible{outline:var(--foco);outline-offset:var(--foco-off)}
.flip-card__inner{display:block;position:relative;width:100%;height:100%;min-height:8.5rem;transition:transform .45s var(--easing);transform-style:preserve-3d}
.flip-card[aria-pressed=true] .flip-card__inner{transform:rotateY(180deg)}
.flip-card__face{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:1.1rem;text-align:center;backface-visibility:hidden;background:var(--papel)}
.flip-card__face--back{transform:rotateY(180deg);background:color-mix(in srgb,var(--brass) 10%,var(--papel));font-size:.95rem;border-left:2px solid var(--brass)}
.verbos{list-style:none;padding:0;margin:1.25rem 0}
.verbos li{padding:.5rem 0;border-bottom:1px solid var(--traco-suave);font-family:var(--sans);font-size:.9rem;font-weight:700;letter-spacing:.02em}
.eixo-grid{display:grid;gap:.65rem;margin:1.75rem 0}
.eixo{padding:1rem 1rem 1rem 1.15rem;border-left:2px solid var(--brass);background:color-mix(in srgb,var(--navy) 5%,var(--bg))}
.eixo h3{margin:0 0 .25rem;font-size:.95rem;color:var(--navy);text-transform:uppercase;letter-spacing:.06em}
.eixo-nota{font-size:.95rem;color:var(--struct);font-family:var(--serif);font-weight:400;letter-spacing:0}
.pecas-linha{list-style:none;padding:0;margin:1.75rem 0;counter-reset:peca}
.pecas-linha li{padding:.65rem 0 .65rem 2.25rem;position:relative;border-bottom:1px solid var(--traco-suave)}
.pecas-linha li::before{counter-increment:peca;content:counter(peca);position:absolute;left:0;top:.65rem;color:var(--brass);font-family:var(--sans);font-weight:700;font-size:.8rem}
.camadas{display:block;margin:1.75rem auto;max-width:100%}
.conta-grande{font-family:var(--sans);font-size:clamp(2.6rem,11vw,4.75rem);font-weight:800;color:var(--navy);margin:0 0 1rem;line-height:1;letter-spacing:-0.03em}
.grade-48{display:flex;flex-wrap:wrap;gap:3px;margin:1.75rem 0;max-width:22rem}
.grade-48 span{width:10px;height:10px;background:var(--traco-suave)}
.grade-48 span.on{background:var(--brass)}
.ritmo-bar{display:flex;align-items:stretch;gap:2px;margin:1.75rem 0;min-height:2.75rem;font-family:var(--sans);font-size:.65rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;text-align:center}
.ritmo-bar>span{background:color-mix(in srgb,var(--navy) 10%,var(--bg));padding:.5rem .3rem;display:flex;align-items:center;justify-content:center;border:1px solid var(--traco-suave)}
.ritmo-bar__od{background:color-mix(in srgb,var(--brass) 18%,var(--bg))!important;position:relative;margin-left:.65rem;flex:1.25!important;border-color:var(--brass)!important;color:var(--navy)}
.ritmo-bar__od::before{content:"→";position:absolute;left:-.7rem;color:var(--brass);font-size:1rem}
.anatomia-sub{color:var(--struct);font-size:.95rem;margin-bottom:1rem;font-style:italic}
.anatomia-list{list-style:none;padding:0;margin:0 0 1.5rem}
.anatomia-btn{width:100%;text-align:left;padding:.85rem 1rem;background:var(--papel);border:1px solid var(--traco);border-left:2px solid var(--navy);cursor:pointer;font:inherit;font-family:var(--sans);font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.35rem;min-height:44px}
.anatomia-btn:focus-visible,.matriz-filtro:focus-visible,#btn-copiar:focus-visible,#btn-imprimir:focus-visible,.menu-toggle:focus-visible,.modo-toggle:focus-visible,.armor-piece:focus-visible{outline:var(--foco);outline-offset:var(--foco-off)}
.anatomia-btn[aria-expanded=true]{background:color-mix(in srgb,var(--brass) 12%,var(--papel));border-left-color:var(--brass)}
.anatomia-panel{padding:.85rem 1rem 1.1rem;border-left:2px solid var(--brass);margin:0 0 .65rem;font-size:.95rem;background:color-mix(in srgb,var(--creme) 40%,var(--bg))}
.anatomia-guia{color:var(--struct);font-size:.9rem;margin-bottom:.5rem}
.matriz-hint{margin-bottom:.85rem;font-style:italic;color:var(--struct)}
.matriz-toolbar{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:.85rem}
.matriz-filtro{padding:.55rem .85rem;border:1px solid var(--traco);background:var(--papel);cursor:pointer;font-family:var(--sans);font-size:.7rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;min-height:44px;color:var(--navy)}
.matriz-filtro--ativa,.matriz-filtro[aria-pressed=true]{background:var(--navy);color:var(--creme);border-color:var(--navy)}
.matriz-scroll{max-height:min(52vh,28rem);overflow:auto;border:1px solid var(--traco);background:var(--papel);-webkit-overflow-scrolling:touch}
.matriz-tabela{width:100%;border-collapse:collapse;font-size:.9rem}
.matriz-tabela th,.matriz-tabela td{padding:.65rem .75rem;text-align:left;border-bottom:1px solid var(--traco-suave);vertical-align:top}
.matriz-tabela th{position:sticky;top:0;background:var(--creme);font-family:var(--sans);font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;z-index:1;border-bottom:1px solid var(--traco-forte)}
.matriz-tabela tr[data-modulo="1"] td:first-child{box-shadow:inset 3px 0 0 var(--brass)}
.matriz-tabela tr[data-modulo="2"] td:first-child{box-shadow:inset 3px 0 0 color-mix(in srgb,var(--brass) 70%,var(--navy))}
.matriz-tabela tr[data-modulo="3"] td:first-child{box-shadow:inset 3px 0 0 var(--navy)}
.matriz-tabela tr[data-modulo="4"] td:first-child{box-shadow:inset 3px 0 0 var(--navy-esc)}
.matriz-tabela .col-obj{max-width:22rem}
.marcas-arco{list-style:none;padding:0;margin:1.75rem 0}
.marcas-arco li{padding:.75rem 0 .75rem 1rem;border-bottom:1px solid var(--traco-suave);border-left:2px solid var(--brass)}
.marcas-salvaguarda{border:1px solid var(--traco);border-left:2px solid var(--brass);padding:1.1rem 1.25rem;margin-top:1.25rem;font-size:.95rem;background:color-mix(in srgb,var(--brass) 8%,var(--bg))}
.marchas{list-style:none;padding:0;margin:1.75rem 0}
.marchas li{padding:.9rem 0;border-bottom:1px solid var(--traco-suave)}
.mil-label{font-family:var(--sans);text-transform:uppercase;font-size:.65rem;font-weight:700;letter-spacing:.12em;color:var(--struct);display:block;margin-bottom:.2rem}
.flip-grid--simbolos .flip-card{min-height:9.5rem}
.simbolo-nome{display:block;font-family:var(--sans);font-size:.9rem;font-weight:700;color:var(--navy);letter-spacing:.04em}
.simbolo-sub{display:block;font-size:.8rem;color:var(--brass);margin-top:.3rem;font-family:var(--sans);font-weight:700;letter-spacing:.06em;text-transform:uppercase}
.ritos-cols{display:grid;grid-template-columns:1fr 1fr;gap:1.75rem;margin:1.75rem 0}
.ritos-e,.ritos-nao{padding:1rem;border:1px solid var(--traco-suave)}
.ritos-e{border-left:2px solid var(--brass)}
.ritos-e ul,.ritos-nao ul{margin:0;padding-left:1.2rem}
.ritos-nao{opacity:.6}
.ritos-nao h3{text-decoration:line-through;text-decoration-color:color-mix(in srgb,var(--struct) 40%,transparent)}
.cert-quote{border-left:2px solid var(--brass);padding:1rem 0 1rem 1.15rem;margin:1.75rem 0;font-style:italic;background:color-mix(in srgb,var(--creme) 50%,transparent)}
.proposta-tag,.estudo-tag{display:inline-block;font-family:var(--sans);font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--brass);border:1px solid var(--brass);padding:.35rem .65rem;margin-bottom:1rem}
.estudo-tag--block{display:block;text-align:center;font-size:.75rem;padding:.65rem;margin:1.1rem 0;background:color-mix(in srgb,var(--brass) 8%,var(--bg))}
.escudo-wrap{max-width:14rem;margin:1.25rem auto;text-align:center;padding:1rem;border:1px solid var(--traco-suave);background:var(--papel)}
.escudo-wrap svg{width:100%;height:auto}
.caderneta-mock{border:1px dashed var(--traco);padding:1.35rem;margin:1.75rem 0;font-family:var(--sans);font-size:.85rem;background:var(--papel)}
.caderneta-mock strong{font-weight:700;letter-spacing:.06em;text-transform:uppercase;font-size:.7rem;color:var(--navy)}
.merch-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(8.5rem,1fr));gap:.5rem;list-style:none;padding:0;margin:1.1rem 0}
.merch-list li{padding:.85rem .75rem;border:1px solid var(--traco);font-family:var(--sans);font-size:.8rem;font-weight:700;letter-spacing:.04em;text-align:center;background:var(--papel);min-height:44px;display:flex;align-items:center;justify-content:center}
.salvaguardas{margin-top:1.75rem;padding:1.25rem;border:1px solid var(--traco);border-top:2px solid var(--brass);background:var(--papel)}
.salvaguardas h3{font-size:.8rem;margin-bottom:.85rem;text-transform:uppercase;letter-spacing:.1em}
.pendencia{background:color-mix(in srgb,var(--navy) 7%,var(--bg));padding:1.1rem 1.25rem;margin-top:1.25rem;border-left:2px solid var(--navy)}
.apendices{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1.75rem 0}
.apendices article{border:1px solid var(--traco);padding:1.15rem;background:var(--papel)}
.selo-planej{font-family:var(--sans);font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--struct);display:block;margin-bottom:.55rem}
.limites{margin-top:1.25rem;padding:1.1rem;border:1px solid var(--traco)}
.criterios{padding-left:1.2rem}
.continuidade{display:block;margin:1.75rem auto;max-width:100%}
.checklist{list-style:none;padding:0;margin:1.75rem 0}
.checklist li{margin-bottom:1.1rem;padding-bottom:.9rem;border-bottom:1px solid var(--traco-suave)}
.checklist label{display:flex;gap:.65rem;align-items:flex-start;cursor:pointer;min-height:44px;font-size:1rem}
.checklist input{width:1.25rem;height:1.25rem;margin-top:.15rem;flex-shrink:0;accent-color:var(--navy)}
.check-obs{width:100%;margin-top:.45rem;padding:.55rem .65rem;border:1px solid var(--traco);background:var(--papel);font:inherit;font-size:.9rem;resize:vertical}
.convite{border:1px solid var(--brass);border-left:3px solid var(--brass);padding:1.75rem 1.5rem;margin:2.25rem 0;background:color-mix(in srgb,var(--brass) 6%,var(--papel))}
.convite-rotulo{font-family:var(--sans);font-size:.65rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--brass);margin:0 0 .65rem}
.convite h3{margin-top:0;font-family:var(--serif);font-size:1.45rem;font-weight:400;color:var(--navy);letter-spacing:0;text-transform:none}
.decisao-acoes{display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.25rem}
#btn-copiar,#btn-imprimir{padding:.7rem 1.35rem;font-family:var(--sans);font-size:.75rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--navy);background:var(--navy);color:var(--creme);cursor:pointer;min-height:44px}
#btn-imprimir{background:transparent;color:var(--navy)}
#btn-copiar:hover,#btn-imprimir:hover{background:var(--navy-esc);color:var(--creme);border-color:var(--navy-esc)}
.copiar-status{font-size:.9rem;color:var(--brass);min-height:1.5rem}
.ancora{font-family:var(--serif);font-size:clamp(1.5rem,4vw,2.15rem);color:var(--navy);margin-bottom:1.5rem;font-style:italic}
.fp-quote{font-size:clamp(1.15rem,2.6vw,1.4rem);border:none;margin:0 0 1.5rem;padding:0;font-style:italic;line-height:1.45}
.fp-quote footer{font-family:var(--sans);font-size:.75rem;font-weight:700;margin-top:.75rem;font-style:normal;color:var(--brass);letter-spacing:.1em;text-transform:uppercase}
.assinatura{margin-top:2.25rem;font-family:var(--sans);font-size:.85rem;font-weight:700;letter-spacing:.04em}
.rodape-inst{font-size:.8rem;color:var(--struct);margin-top:1.5rem;font-family:var(--sans)}
.conducao{display:none;margin-top:2rem;padding:1.1rem 1.2rem;background:color-mix(in srgb,var(--navy) 6%,var(--bg));border-left:2px solid var(--navy);font-size:.9rem;color:var(--struct);font-style:italic}
body.modo-leitura .conducao{display:block}
#armor-bar{position:fixed;top:0;left:0;right:0;z-index:100;display:none;align-items:center;justify-content:center;gap:.45rem;padding:.55rem .75rem;background:color-mix(in srgb,var(--bg) 92%,transparent);border-bottom:1px solid var(--traco);backdrop-filter:blur(6px)}
#armor-bar.visible{display:flex}
.armor-piece{min-width:44px;min-height:44px;border:1px solid var(--traco);background:var(--papel);cursor:pointer;padding:.35rem;display:flex;align-items:center;justify-content:center;font-family:var(--sans);font-size:.55rem;font-weight:700;color:var(--struct);text-transform:uppercase;letter-spacing:.06em;line-height:1.1}
.armor-piece.filled{background:var(--brass);border-color:var(--brass);color:var(--papel)}
#side-menu{position:fixed;top:0;right:0;z-index:200;width:min(20rem,88vw);height:100%;background:var(--papel);border-left:1px solid var(--traco);transform:translateX(100%);transition:transform var(--dur) var(--easing);padding:4.5rem 1.25rem 1.5rem;overflow-y:auto}
#side-menu.open{transform:translateX(0)}
#side-menu ul{list-style:none;padding:0;margin:0}
#side-menu a{display:block;padding:.85rem .5rem;color:var(--text);text-decoration:none;font-family:var(--sans);font-size:.8rem;font-weight:700;letter-spacing:.04em;border-bottom:1px solid var(--traco-suave);min-height:44px}
#side-menu a:focus-visible{outline:var(--foco);outline-offset:-2px;background:color-mix(in srgb,var(--navy) 6%,var(--papel))}
.ui-controls{position:fixed;top:.55rem;right:.55rem;z-index:150;display:flex;gap:.4rem}
.menu-toggle,.modo-toggle{padding:.55rem .85rem;font-family:var(--sans);font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:1px solid var(--traco);background:var(--papel);color:var(--navy);cursor:pointer;min-height:44px}
.menu-toggle:hover,.modo-toggle:hover{border-color:var(--navy)}
@media(max-width:700px){
.split-cols,.ritos-cols,.apendices,.flip-grid{grid-template-columns:1fr}
.screen{padding:5.25rem 1.15rem 3rem}
.matriz-tabela{font-size:.85rem}
.matriz-tabela .col-obj{display:none}
.matriz-scroll{max-height:58vh}
.ritmo-bar{flex-wrap:wrap;min-height:auto}
.ritmo-bar>span{flex:1 1 40%;min-height:2.5rem}
.ritmo-bar__od{flex:1 1 100%!important;margin-left:0;margin-top:.35rem}
.ritmo-bar__od::before{display:none}
.merch-list{grid-template-columns:1fr 1fr}
.adulao-comp__tag--1,.adulao-comp__tag--2{position:static;display:inline-block;margin:.25rem .35rem}
.adulao-comp__tag--3{position:static;transform:none;display:block;margin-top:.5rem}
}
@media(max-width:420px){
.matriz-tabela th:nth-child(3),.matriz-tabela td:nth-child(3){display:none}
.merch-list{grid-template-columns:1fr}
}
@media print{
.skip-link,.watermark,.ui-controls,#armor-bar,#side-menu,.scroll-hint,.decisao-acoes,.copiar-status{display:none!important}
#deck{height:auto;overflow:visible;scroll-snap-type:none}
.screen{page-break-after:always;min-height:auto;padding:1.5rem;border:none;justify-content:flex-start}
.conducao,body.modo-leitura .conducao{display:none!important}
.checklist input{-webkit-appearance:none;appearance:none;width:1rem;height:1rem;border:1px solid #000;display:inline-block;vertical-align:middle;margin-right:.35rem}
.checklist input:checked::after{content:"\\2713";display:block;text-align:center;line-height:1rem;font-size:.85rem}
.check-obs{border:1px solid #ccc;min-height:2rem}
}`;
}

function buildJs() {
  const atosJson = JSON.stringify(ATOS);
  const matrizJson = JSON.stringify(matriz);
  return `(function(){
"use strict";
var ATOS=${atosJson};
var MATRIZ=${matrizJson};
var ARMOR_FILL=[10,18,22,30];
var currentScreen=1;

var deck=document.getElementById("deck");
var armorBar=document.getElementById("armor-bar");
var sideMenu=document.getElementById("side-menu");
var screens=[].slice.call(document.querySelectorAll(".screen"));

function goToScreen(n){
  n=Math.max(1,Math.min(30,n));
  var el=document.getElementById("tela-"+String(n).padStart(2,"0"));
  if(el){el.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});currentScreen=n;updateUI();}
}

function screenFromScroll(){
  var mid=window.innerHeight/2;
  for(var i=0;i<screens.length;i++){
    var r=screens[i].getBoundingClientRect();
    if(r.top<=mid&&r.bottom>=mid)return parseInt(screens[i].dataset.screen,10);
  }
  return currentScreen;
}

function updateArmor(n){
  if(n<9){armorBar.classList.remove("visible");return;}
  armorBar.classList.add("visible");
  var pieces=[].slice.call(document.querySelectorAll(".armor-piece"));
  pieces.forEach(function(p,i){
    var fillAt=ARMOR_FILL[i];
    p.classList.toggle("filled",n>=fillAt);
  });
}

function updateUI(){
  var n=screenFromScroll();
  currentScreen=n;
  updateArmor(n);
}

if("scrollSnapType" in document.documentElement.style){
  deck.style.scrollSnapType="y mandatory";
  deck.style.overflowY="auto";
  deck.style.height="100vh";
  document.documentElement.style.height="100%";
  document.body.style.height="100%";
  document.body.style.overflow="hidden";
}

window.addEventListener("scroll",updateUI,{passive:true});
if(deck)deck.addEventListener("scroll",updateUI,{passive:true});

document.addEventListener("keydown",function(e){
  if(e.target.matches("textarea,input"))return;
  if(e.key==="ArrowDown"||e.key==="PageDown"){e.preventDefault();goToScreen(currentScreen+1);}
  else if(e.key==="ArrowUp"||e.key==="PageUp"){e.preventDefault();goToScreen(currentScreen-1);}
  else if(e.key==="Home"){e.preventDefault();goToScreen(1);}
  else if(e.key==="End"){e.preventDefault();goToScreen(30);}
});

var ARMOR_JUMP=[9,18,22,29];
document.querySelectorAll(".armor-piece").forEach(function(btn,i){
  btn.addEventListener("click",function(){goToScreen(ARMOR_JUMP[i]);});
});
document.querySelectorAll("#side-menu a").forEach(function(a){
  a.addEventListener("click",function(e){e.preventDefault();goToScreen(parseInt(a.dataset.tela,10));sideMenu.classList.remove("open");});
});

document.getElementById("menu-toggle").addEventListener("click",function(){
  sideMenu.classList.toggle("open");
  var open=sideMenu.classList.contains("open");
  this.setAttribute("aria-expanded",open);
  sideMenu.setAttribute("aria-hidden",open?"false":"true");
});
document.getElementById("modo-toggle").addEventListener("click",function(){
  document.body.classList.toggle("modo-leitura");
  this.setAttribute("aria-pressed",document.body.classList.contains("modo-leitura"));
  this.textContent=document.body.classList.contains("modo-leitura")?"Modo apresentação":"Modo leitura";
});

document.querySelectorAll(".flip-card").forEach(function(card){
  card.addEventListener("click",function(){
    var on=card.getAttribute("aria-pressed")==="true";
    card.setAttribute("aria-pressed",on?"false":"true");
  });
});

document.querySelectorAll(".anatomia-btn").forEach(function(btn){
  btn.addEventListener("click",function(){
    var key=btn.dataset.anatomia;
    var panel=document.getElementById("anatomia-"+key);
    var open=btn.getAttribute("aria-expanded")==="true";
    document.querySelectorAll(".anatomia-btn").forEach(function(b){b.setAttribute("aria-expanded","false");});
    document.querySelectorAll(".anatomia-panel").forEach(function(p){p.hidden=true;});
    if(!open){btn.setAttribute("aria-expanded","true");panel.hidden=false;}
  });
});

var filtroAtivo=0;
document.querySelectorAll(".matriz-filtro").forEach(function(btn){
  btn.addEventListener("click",function(){
    filtroAtivo=parseInt(btn.dataset.modulo,10);
    document.querySelectorAll(".matriz-filtro").forEach(function(b){
      b.classList.remove("matriz-filtro--ativa");
      b.setAttribute("aria-pressed","false");
    });
    btn.classList.add("matriz-filtro--ativa");
    btn.setAttribute("aria-pressed","true");
    document.querySelectorAll(".matriz-tabela tbody tr").forEach(function(row){
      var m=parseInt(row.dataset.modulo,10);
      row.style.display=filtroAtivo===0||m===filtroAtivo?"":"none";
    });
  });
});

var grade=document.getElementById("grade-48");
if(grade){
  for(var g=0;g<48;g++){
    var d=document.createElement("span");
    d.style.transitionDelay=(g*20)+"ms";
    setTimeout(function(el,i){return function(){el.classList.add("on");};}(d,g),300+g*20);
    grade.appendChild(d);
  }
}

document.getElementById("btn-copiar").addEventListener("click",function(){
  var lines=["Resumo de decisões — Discipulando a Caserna","Data: "+new Date().toLocaleDateString("pt-BR"),""];
  document.querySelectorAll(".checklist li").forEach(function(li,i){
    var cb=li.querySelector("input");
    var obs=li.querySelector(".check-obs");
    var txt=li.querySelector("label span").textContent;
    lines.push((cb.checked?"[x]":"[ ]")+" "+txt);
    if(obs&&obs.value.trim())lines.push("    Obs: "+obs.value.trim());
  });
  var text=lines.join("\\n");
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(function(){
      document.getElementById("copiar-status").textContent="Resumo copiado para a área de transferência.";
    }).catch(fallbackCopy);
  }else fallbackCopy();
  function fallbackCopy(){
    var ta=document.createElement("textarea");
    ta.value=text;document.body.appendChild(ta);ta.select();
    try{document.execCommand("copy");document.getElementById("copiar-status").textContent="Resumo copiado.";}catch(err){document.getElementById("copiar-status").textContent="Selecione e copie manualmente.";}
    document.body.removeChild(ta);
  }
});

document.getElementById("btn-imprimir").addEventListener("click",function(){window.print();});

updateUI();
})();`;
}

function buildHtml() {
  const menuLinks = ATOS.map(
    (a) => `<li><a href="#tela-${String(a.tela).padStart(2, "0")}" data-tela="${a.tela}">${esc(a.rotulo)}</a></li>`
  ).join("");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Discipulando a Caserna — Apresentação para homologação pastoral v1.0-RC</title>
<meta name="author" content="Obr. Flávio Alves da Costa">
<meta name="description" content="Apresentação institucional para validação pastoral do Guia Mestre v1.0-RC — Projeto Caserna de Adulão, Fortaleza 2026. CNPJ 63.724.286/0001-78.">
<style>${buildCss()}</style>
</head>
<body>
<a class="skip-link" href="#deck">Ir para a apresentação</a>
<p class="watermark" aria-hidden="true">documento de validação — circulação restrita</p>
<div class="ui-controls">
<button type="button" class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="side-menu">Menu</button>
<button type="button" class="modo-toggle" id="modo-toggle" aria-pressed="false">Modo leitura</button>
</div>
<nav id="armor-bar" aria-label="Progresso da armadura">
<button type="button" class="armor-piece" title="Ato IV — Cinto" aria-label="Ir para Ato IV">Cinto</button>
<button type="button" class="armor-piece" title="Ato VI — Couraça" aria-label="Ir para Ato VI">Cour.</button>
<button type="button" class="armor-piece" title="Ato VII — Calçados" aria-label="Ir para Ato VII">Calç.</button>
<button type="button" class="armor-piece" title="Ato IX — Escudo" aria-label="Ir para Ato IX">Esc.</button>
</nav>
<nav id="side-menu" aria-label="Atos da apresentação" aria-hidden="true">
<ul>${menuLinks}</ul>
</nav>
<main id="deck">
${buildScreens()}
</main>
<script type="application/json" id="matriz-dados">${JSON.stringify(matriz)}</script>
<script>${buildJs()}</script>
</body>
</html>`;
}

function main() {
  fs.mkdirSync(saidaDir, { recursive: true });
  const html = buildHtml();
  fs.writeFileSync(saidaArq, html, "utf8");
  const stat = fs.statSync(saidaArq);
  console.log(`Gerado: ${saidaArq}`);
  console.log(`Tamanho: ${stat.size} bytes (${(stat.size / 1024).toFixed(1)} KB)`);
  if (stat.size < 51200) {
    console.warn("Aviso: arquivo menor que 50 KB — verifique conteúdo.");
  }
}

main();
