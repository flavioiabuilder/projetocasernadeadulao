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
    conteudo: `${licao6.textoBase} — “pela graça sois salvos, mediante a fé… não vem de obras”.`,
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
      "Graça é dom, não salário; ordem do Reino que cancela a expulsão espiritual e restitui patente e função para servir — assinada pela cruz e ressurreição de Cristo.",
  },
  {
    chave: "aplicacao",
    rotulo: "Aplicação militar",
    guia: GUIA34.aplicacao,
    conteudo:
      "Confronta mérito (compensar vergonha com performance) e fatalismo (ficha que define para sempre) — a graça reabilita para vida obediente, reordenando lealdades.",
  },
  {
    chave: "ordemDia",
    rotulo: "Ordem do Dia",
    guia: GUIA34.ordemDia,
    conteudo:
      "Receber a graça como ordem do Comandante e decidir um passo concreto de obediência como resposta de gratidão — não para manter patente, mas para marchar sob novo comando.",
  },
  {
    chave: "perguntas",
    rotulo: "Perguntas de reflexão",
    guia: GUIA34.perguntas,
    conteudo:
      "O que Ef 2.8–9 mostrou sobre o Comandante? Onde ainda tentamos reconquistar a patente por mérito? O que muda quando a reintegração veio antes da nossa força?",
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
      "Sustenta toda a armadura — a verdade de Cristo que firma o discípulo no chamado inicial. Ef 6.14.",
  },
  {
    frente: "Couraça da Justiça",
    frenteSub: "Colete Balístico",
    verso:
      "Protege o coração — a justiça imputada que guarda o centro da vida espiritual. Ef 6.14.",
  },
  {
    frente: "Calçados do Evangelho da Paz",
    frenteSub: "Coturno",
    verso:
      "Firmeza em qualquer terreno — prontidão para marchar com o evangelho de paz. Ef 6.15.",
  },
  {
    frente: "Escudo da Fé",
    frenteSub: "Insígnia final",
    verso:
      "Apaga os dardos inflamados — fé que sustenta até o envio e a perseverança. Ef 6.16.",
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
          <span style="flex:2">Contemplação (15–25 min)</span>
          <span style="flex:3">Discernimento (25–35 min)</span>
          <span style="flex:1.5">Oração (10–15 min)</span>
          <span class="ritmo-bar__od">Ordem do Dia</span>
        </div>
        ${blocoConducao("Enfatize o gesto visual da Ordem do Dia saindo da barra: \"O encontro termina, mas a lição não.\"")}
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
        <p class="anatomia-sub">Lição 6 — ${esc(licao6.titulo)} (${esc(licao6.textoBase)})</p>
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
        `<tr data-modulo="${l.modulo}"><td>${l.numero}</td><td>${esc(l.titulo)}</td><td>${esc(l.textoBase)}</td><td>${esc(l.objetivo)}</td></tr>`
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
          <li><span class="mil-label">Formatura</span> — do Soldado de Cristo</li>
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
  return `:root{--bg:#F4F4F1;--text:#2B2B2B;--struct:#4A4A4A;--brass:#8C6A46;--navy:#1A2A44;--serif:Georgia,"Times New Roman",serif;--sans:"Segoe UI",Arial Narrow,sans-serif;--min-font:17px}
*,*::before,*::after{box-sizing:border-box}
html{font-size:var(--min-font);scroll-behavior:smooth}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.cold-id,.timeline__linha,.flip-card__inner{transition:none!important;animation:none!important}}
body{margin:0;font-family:var(--serif);color:var(--text);background:var(--bg);line-height:1.55}
.skip-link{position:absolute;left:-9999px;top:0;z-index:9999;padding:.75rem 1rem;background:var(--navy);color:#fff;text-decoration:none;font-family:var(--sans)}
.skip-link:focus{left:0}
.watermark{position:fixed;inset:0;pointer-events:none;z-index:0;display:flex;align-items:center;justify-content:center;font-family:var(--sans);font-size:.75rem;text-transform:uppercase;letter-spacing:.12em;color:rgba(74,74,74,.08);transform:rotate(-28deg);text-align:center;max-width:60%;margin:auto}
#deck{position:relative;z-index:1}
.screen{min-height:100vh;min-height:100dvh;scroll-snap-align:start;scroll-snap-stop:always;display:flex;flex-direction:column;justify-content:center;padding:4.5rem 1.5rem 3rem;position:relative;border-bottom:1px solid rgba(74,74,74,.12)}
.screen-inner{max-width:46rem;margin:0 auto;width:100%}
.screen-inner--cold{text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:70vh}
.screen-inner--pivot{background:rgba(74,74,74,.04);padding:2rem;border-radius:2px}
.screen-inner--matriz{max-width:56rem}
.screen-inner--decisao{max-width:52rem}
.screen-inner--fechamento{text-align:center}
h1{font-size:clamp(1.6rem,4vw,2.2rem);font-weight:400;margin:0 0 .5rem;color:var(--navy)}
h2{font-size:clamp(1.35rem,3vw,1.75rem);font-weight:400;margin:0 0 1rem;line-height:1.3}
h3{font-size:1.1rem;font-weight:600;margin:0 0 .5rem}
p{margin:0 0 1rem}
.lead{font-size:1.35rem}
.meta{font-size:.95rem;color:var(--struct);font-family:var(--sans)}
.cold-quote{font-size:clamp(1.4rem,3.5vw,2rem);margin:0 0 2rem;border:none;padding:0;font-style:italic}
.cold-quote footer{font-size:1rem;margin-top:.75rem;color:var(--struct);font-style:normal}
.cold-id{opacity:0;animation:coldFade 1s ease 3s forwards}
@keyframes coldFade{to{opacity:1}}
@media(prefers-reduced-motion:reduce){.cold-id{opacity:1;animation:none}}
.scroll-hint{margin-top:3rem;color:var(--struct);font-size:1.5rem;animation:bob 2s ease-in-out infinite}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
.stamp{position:absolute;bottom:1rem;left:50%;transform:translateX(-50%);font-family:var(--sans);font-size:.75rem;color:var(--struct);margin:0;letter-spacing:.04em}
.split-cols{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin:1.5rem 0}
.mil-labels,.soft-labels{list-style:none;padding:0;margin:0}
.mil-labels li{font-family:var(--sans);text-transform:uppercase;letter-spacing:.08em;font-size:.85rem;color:var(--struct);padding:.35rem 0;font-weight:600}
.soft-labels li{font-family:var(--serif);color:rgba(43,43,43,.55);padding:.35rem 0}
.planta{display:block;margin:1.5rem auto;max-width:100%;height:auto}
.timeline{display:flex;align-items:center;gap:1rem;margin:2rem 0;padding:1rem 0}
.timeline__ponto{font-family:var(--sans);font-size:.8rem;text-transform:uppercase;letter-spacing:.06em;color:var(--struct);white-space:nowrap}
.timeline__ponto--mover{color:var(--brass)}
.timeline__linha{flex:1;height:2px;background:var(--struct);transform-origin:left;transform:scaleX(0);animation:lineGrow 1.2s ease .5s forwards}
@keyframes lineGrow{to{transform:scaleX(1)}}
.adulao-comp{position:relative;text-align:center;margin:2rem 0;min-height:5rem}
.adulao-comp__word{font-family:var(--sans);font-size:clamp(2rem,8vw,3.5rem);letter-spacing:.15em;color:var(--navy);font-weight:300}
.adulao-comp__tag{position:absolute;font-family:var(--sans);font-size:.75rem;color:var(--brass);text-transform:lowercase}
.adulao-comp__tag--1{top:0;left:10%}.adulao-comp__tag--2{top:0;right:10%}.adulao-comp__tag--3{bottom:0;left:50%;transform:translateX(-50%)}
.flip-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin:1.5rem 0}
.flip-card{background:none;border:1px solid var(--struct);padding:0;cursor:pointer;min-height:8rem;perspective:800px;border-radius:2px;font:inherit;color:inherit}
.flip-card:focus-visible{outline:2px solid var(--navy);outline-offset:3px}
.flip-card__inner{display:block;position:relative;width:100%;height:100%;min-height:8rem;transition:transform .5s;transform-style:preserve-3d}
.flip-card[aria-pressed=true] .flip-card__inner{transform:rotateY(180deg)}
.flip-card__face{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:1rem;text-align:center;backface-visibility:hidden;background:var(--bg)}
.flip-card__face--back{transform:rotateY(180deg);background:rgba(140,106,70,.08);font-size:.95rem}
.verbos{list-style:none;padding:0;margin:1rem 0}
.verbos li{padding:.35rem 0;border-bottom:1px solid rgba(74,74,74,.15)}
.eixo-grid{display:grid;gap:.75rem;margin:1.5rem 0}
.eixo{padding:1rem;border-left:3px solid var(--brass);background:rgba(26,42,68,.04)}
.eixo h3{margin:0 0 .25rem;font-size:1rem;color:var(--navy)}
.eixo-nota{font-size:.95rem;color:var(--struct)}
.pecas-linha{list-style:none;padding:0;margin:1.5rem 0;counter-reset:peca}
.pecas-linha li{padding:.5rem 0 .5rem 2rem;position:relative;border-bottom:1px solid rgba(74,74,74,.1)}
.pecas-linha li::before{counter-increment:peca;content:counter(peca);position:absolute;left:0;color:var(--brass);font-family:var(--sans)}
.camadas{display:block;margin:1.5rem auto;max-width:100%}
.conta-grande{font-family:var(--sans);font-size:clamp(2.5rem,10vw,4.5rem);color:var(--navy);margin:0 0 1rem;line-height:1}
.grade-48{display:flex;flex-wrap:wrap;gap:3px;margin:1.5rem 0}
.grade-48 span{width:10px;height:10px;border-radius:1px;background:rgba(74,74,74,.2)}
.grade-48 span.on{background:var(--brass)}
.ritmo-bar{display:flex;align-items:stretch;gap:2px;margin:1.5rem 0;min-height:2.5rem;font-family:var(--sans);font-size:.75rem;text-align:center}
.ritmo-bar>span{background:rgba(26,42,68,.12);padding:.5rem .25rem;display:flex;align-items:center;justify-content:center}
.ritmo-bar__od{background:rgba(140,106,70,.2)!important;position:relative;margin-left:.5rem;flex:1.2!important}
.ritmo-bar__od::before{content:"→";position:absolute;left:-.65rem;color:var(--brass)}
.anatomia-sub{color:var(--struct);font-size:.95rem;margin-bottom:1rem}
.anatomia-list{list-style:none;padding:0;margin:0 0 1.5rem}
.anatomia-btn{width:100%;text-align:left;padding:.75rem 1rem;background:rgba(26,42,68,.06);border:1px solid rgba(74,74,74,.2);cursor:pointer;font:inherit;font-family:var(--sans);font-size:.9rem;text-transform:uppercase;letter-spacing:.04em;margin-bottom:.25rem;border-radius:2px;min-height:44px}
.anatomia-btn:focus-visible,.matriz-filtro:focus-visible,#btn-copiar:focus-visible,#btn-imprimir:focus-visible,.nav-toggle:focus-visible,.menu-toggle:focus-visible,.modo-toggle:focus-visible,.armor-piece:focus-visible{outline:2px solid var(--navy);outline-offset:2px}
.anatomia-btn[aria-expanded=true]{background:rgba(140,106,70,.15);border-color:var(--brass)}
.anatomia-panel{padding:.75rem 1rem 1rem;border-left:3px solid var(--brass);margin-bottom:.5rem;font-size:.95rem}
.anatomia-guia{color:var(--struct);font-size:.9rem;margin-bottom:.5rem}
.matriz-hint{margin-bottom:.75rem}
.matriz-toolbar{display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:.75rem}
.matriz-filtro{padding:.5rem .75rem;border:1px solid var(--struct);background:transparent;cursor:pointer;font-family:var(--sans);font-size:.8rem;min-height:44px;border-radius:2px}
.matriz-filtro--ativa,.matriz-filtro[aria-pressed=true]{background:var(--navy);color:#fff;border-color:var(--navy)}
.matriz-scroll{max-height:50vh;overflow:auto;border:1px solid rgba(74,74,74,.2);background:#fff}
.matriz-tabela{width:100%;border-collapse:collapse;font-size:.85rem}
.matriz-tabela th,.matriz-tabela td{padding:.5rem .65rem;text-align:left;border-bottom:1px solid rgba(74,74,74,.12);vertical-align:top}
.matriz-tabela th{position:sticky;top:0;background:var(--bg);font-family:var(--sans);font-size:.75rem;text-transform:uppercase;letter-spacing:.04em}
.matriz-tabela tr[data-modulo="1"] td:first-child{border-left:3px solid var(--brass)}
.marcas-arco{list-style:none;padding:0;margin:1.5rem 0}
.marcas-arco li{padding:.65rem 0;border-bottom:1px solid rgba(74,74,74,.15);padding-left:1rem;border-left:2px solid var(--brass)}
.marcas-salvaguarda{background:rgba(140,106,70,.1);padding:1rem;margin-top:1rem;font-size:.95rem}
.marchas{list-style:none;padding:0;margin:1.5rem 0}
.marchas li{padding:.75rem 0;border-bottom:1px solid rgba(74,74,74,.12)}
.mil-label{font-family:var(--sans);text-transform:uppercase;font-size:.75rem;letter-spacing:.06em;color:var(--struct);display:block;margin-bottom:.15rem}
.flip-grid--simbolos .flip-card{min-height:9rem}
.simbolo-nome{display:block;font-family:var(--sans);font-size:.85rem;color:var(--navy)}
.simbolo-sub{display:block;font-size:.8rem;color:var(--brass);margin-top:.25rem}
.ritos-cols{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin:1.5rem 0}
.ritos-e ul,.ritos-nao ul{margin:0;padding-left:1.25rem}
.ritos-nao{opacity:.55;text-decoration:line-through;text-decoration-color:rgba(74,74,74,.3)}
.cert-quote{border-left:3px solid var(--brass);padding-left:1rem;margin:1.5rem 0;font-style:italic}
.proposta-tag,.estudo-tag{display:inline-block;font-family:var(--sans);font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:var(--brass);border:1px solid var(--brass);padding:.2rem .5rem;margin-bottom:1rem}
.estudo-tag--block{display:block;text-align:center;font-size:.8rem;padding:.5rem;margin:1rem 0}
.escudo-wrap{max-width:12rem;margin:1rem auto;text-align:center}
.escudo-wrap svg{width:100%;height:auto}
.caderneta-mock{border:1px dashed var(--struct);padding:1.25rem;margin:1.5rem 0;font-family:var(--sans);font-size:.9rem;background:#fff}
.merch-list{display:flex;flex-wrap:wrap;gap:.5rem;list-style:none;padding:0;margin:1rem 0}
.merch-list li{padding:.5rem 1rem;border:1px solid var(--struct);font-family:var(--sans);font-size:.85rem}
.salvaguardas{margin-top:1.5rem;padding:1rem;border:1px solid var(--struct)}
.salvaguardas h3{font-size:1rem;margin-bottom:.75rem}
.pendencia{background:rgba(26,42,68,.08);padding:1rem;margin-top:1rem;border-left:3px solid var(--navy)}
.apendices{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1.5rem 0}
.apendices article{border:1px solid var(--struct);padding:1rem}
.selo-planej{font-family:var(--sans);font-size:.65rem;text-transform:uppercase;letter-spacing:.06em;color:var(--struct);display:block;margin-bottom:.5rem}
.limites{margin-top:1rem;padding:1rem;border:1px solid rgba(74,74,74,.2)}
.criterios{padding-left:1.25rem}
.continuidade{display:block;margin:1.5rem auto;max-width:100%}
.checklist{list-style:none;padding:0;margin:1.5rem 0}
.checklist li{margin-bottom:1rem;padding-bottom:.75rem;border-bottom:1px solid rgba(74,74,74,.12)}
.checklist label{display:flex;gap:.5rem;align-items:flex-start;cursor:pointer;min-height:44px}
.checklist input{width:1.25rem;height:1.25rem;margin-top:.2rem;flex-shrink:0}
.check-obs{width:100%;margin-top:.35rem;padding:.35rem;border:1px solid rgba(74,74,74,.25);font:inherit;font-size:.9rem;resize:vertical}
.convite{border:2px solid var(--brass);padding:1.5rem;margin:2rem 0;background:rgba(140,106,70,.05)}
.convite-rotulo{font-family:var(--sans);font-size:.7rem;letter-spacing:.12em;color:var(--brass);margin:0 0 .5rem}
.convite h3{margin-top:0;font-size:1.25rem;color:var(--navy)}
.decisao-acoes{display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1rem}
#btn-copiar,#btn-imprimir{padding:.65rem 1.25rem;font-family:var(--sans);font-size:.9rem;border:1px solid var(--navy);background:var(--navy);color:#fff;cursor:pointer;min-height:44px;border-radius:2px}
#btn-imprimir{background:transparent;color:var(--navy)}
.copiar-status{font-size:.9rem;color:var(--brass);min-height:1.5rem}
.ancora{font-size:clamp(1.4rem,4vw,2rem);color:var(--navy);margin-bottom:1.5rem}
.fp-quote{font-size:clamp(1.1rem,2.5vw,1.35rem);border:none;margin:0 0 1.5rem;padding:0;font-style:italic}
.fp-quote footer{font-size:.95rem;margin-top:.5rem;font-style:normal;color:var(--struct)}
.assinatura{margin-top:2rem;font-family:var(--sans);font-size:.95rem}
.rodape-inst{font-size:.85rem;color:var(--struct);margin-top:1.5rem}
.conducao{display:none;margin-top:2rem;padding:1rem;background:rgba(26,42,68,.06);border-left:3px solid var(--navy);font-size:.9rem;color:var(--struct);font-style:italic}
body.modo-leitura .conducao{display:block}
#armor-bar{position:fixed;top:0;left:0;right:0;z-index:100;display:none;align-items:center;justify-content:center;gap:.5rem;padding:.5rem;background:rgba(244,244,241,.95);border-bottom:1px solid rgba(74,74,74,.15);backdrop-filter:blur(4px)}
#armor-bar.visible{display:flex}
.armor-piece{width:2.5rem;height:2.5rem;border:2px solid var(--struct);background:transparent;cursor:pointer;border-radius:2px;padding:0;display:flex;align-items:center;justify-content:center;font-family:var(--sans);font-size:.55rem;color:var(--struct);text-transform:uppercase;line-height:1;min-width:44px;min-height:44px}
.armor-piece.filled{background:var(--brass);border-color:var(--brass);color:#fff}
.armor-piece:focus-visible{outline:2px solid var(--navy);outline-offset:2px}
#side-menu{position:fixed;top:0;right:0;z-index:200;width:min(18rem,85vw);height:100%;background:var(--bg);border-left:1px solid rgba(74,74,74,.2);transform:translateX(100%);transition:transform .25s ease;padding:4rem 1rem 1rem;overflow-y:auto}
#side-menu.open{transform:translateX(0)}
#side-menu ul{list-style:none;padding:0;margin:0}
#side-menu a{display:block;padding:.75rem .5rem;color:var(--text);text-decoration:none;font-family:var(--sans);font-size:.85rem;border-bottom:1px solid rgba(74,74,74,.1);min-height:44px}
#side-menu a:focus-visible{outline:2px solid var(--navy);outline-offset:-2px;background:rgba(26,42,68,.06)}
.ui-controls{position:fixed;top:.5rem;right:.5rem;z-index:150;display:flex;gap:.35rem}
.menu-toggle,.modo-toggle{padding:.5rem .75rem;font-family:var(--sans);font-size:.75rem;border:1px solid var(--struct);background:var(--bg);cursor:pointer;min-height:44px;border-radius:2px}
@media(max-width:640px){.split-cols,.ritos-cols,.apendices,.flip-grid{grid-template-columns:1fr}.screen{padding-top:5rem}.matriz-tabela{font-size:.8rem}}
@media print{.skip-link,.watermark,.ui-controls,#armor-bar,#side-menu,.scroll-hint,.decisao-acoes,.copiar-status{display:none!important}.screen{page-break-after:always;min-height:auto;padding:1.5rem;border:none}.conducao{display:none!important}body.modo-leitura .conducao{display:none!important}.checklist input{-webkit-appearance:none;appearance:none;width:1rem;height:1rem;border:1px solid #000;display:inline-block;vertical-align:middle;margin-right:.35rem}.checklist input:checked::after{content:"✓";display:block;text-align:center;line-height:1rem;font-size:.85rem}.check-obs{border:1px solid #ccc;min-height:2rem}}`;
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
