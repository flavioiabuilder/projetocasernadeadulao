/**
 * Constrói as 33 telas (v2) da apresentação de homologação pastoral —
 * versão para leitura autônoma, sem blocos de condução oral.
 *
 * Uso:
 *   const buildScreensV2 = require("./apresentacao-screens-v2.js");
 *   const html = buildScreensV2({ esc, matriz, modulos, escudoPng,
 *     FLIP_RISCOS, FLIP_SIMBOLOS, ANATOMIA_L6, licao6, CONVITE });
 */
"use strict";

const ATOS_V2 = [
  { id: 0, rotulo: "Ato 0 — A Caverna", tela: 1 },
  { id: 1, rotulo: "Ato I — A Dor", tela: 3 },
  { id: 2, rotulo: "Ato II — O Que Já Acontecia", tela: 6 },
  { id: 3, rotulo: "Ato III — O Problema", tela: 8 },
  { id: 4, rotulo: "Ato IV — A Concepção", tela: 10 },
  { id: 5, rotulo: "Ato V — A Arquitetura", tela: 14 },
  { id: 6, rotulo: "Ato VI — A Marcha", tela: 19 },
  { id: 7, rotulo: "Ato VII — Identidade Visível", tela: 23 },
  { id: 8, rotulo: "Ato VIII — O Horizonte", tela: 27 },
  { id: 9, rotulo: "Ato IX — A Decisão", tela: 32 },
];

const TOTAL_SCREENS = 33;
const ARMOR_FILL = [11, 19, 23, 33];
const ARMOR_JUMP = [10, 19, 23, 32];
const ATO_ABERTURAS = new Set(ATOS_V2.map((a) => a.tela));

function stamp(n) {
  if (n === 1) return "";
  return `<p class="stamp">v1.0-RC · documento de validação</p>`;
}

function tela(n, act, inner) {
  const ato = ATO_ABERTURAS.has(n) ? " screen--ato" : "";
  return `<section id="tela-${String(n).padStart(2, "0")}" class="screen${ato}" data-screen="${n}" data-act="${act}" tabindex="-1">${inner}${stamp(n)}</section>`;
}

function notaAutor(htmlParas, comAssinatura) {
  const paras = Array.isArray(htmlParas) ? htmlParas : [htmlParas];
  const corpo = paras.map((p) => `<p>${p}</p>`).join("");
  const assinatura = comAssinatura
    ? `<p class="nota-autor__assinatura">— Obr. Flávio Alves da Costa</p>`
    : "";
  return `<aside class="nota-autor" aria-label="Nota do autor"><p class="nota-autor__rotulo">nota do autor</p>${corpo}${assinatura}</aside>`;
}

module.exports = function buildScreensV2(ctx) {
  const {
    esc,
    matriz,
    modulos,
    escudoPng,
    FLIP_RISCOS,
    FLIP_SIMBOLOS,
    ANATOMIA_L6,
    licao6,
    CONVITE,
  } = ctx;

  function fechoAto(texto) {
    return `<p class="fecho-ato">${esc(texto)}</p>`;
  }

  function instrucao(texto) {
    return `<p class="instrucao-leitor">${esc(texto)}</p>`;
  }

  const s = [];

  // ——— Tela 1 — Ato 0 — cold open ———
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
      </div>`
    )
  );

  // ——— Tela 2 — Ato 0 — como ler ———
  const atosDots = ATOS_V2.slice(1)
    .map((a) => `<span class="atos-dots__item" title="${esc(a.rotulo)}"></span>`)
    .join("");

  s.push(
    tela(
      2,
      0,
      `<div class="screen-inner screen-inner--comoler">
        <h2>Antes de começar.</h2>
        <p>Esta apresentação foi feita para ser lida sem mim presente. Tudo o que eu diria está escrito.</p>
        <p><strong>Tempo de leitura:</strong> cerca de 20 minutos · <strong>Nove atos</strong> · pode ser interrompida e retomada<br>
        <strong>Ao final</strong> há uma lista de decisões — é o motivo pelo qual este documento existe<br>
        <strong>Documento de referência:</strong> o Guia Mestre v1.0-RC completo segue em anexo</p>
        <p>O senhor não precisa responder nada durante a leitura. As perguntas estão todas no fim, reunidas.</p>
        <div class="atos-dots" aria-hidden="true">${atosDots}</div>
        <a class="btn-comecar" href="#tela-03">Começar</a>
      </div>`
    )
  );

  // ——— Tela 3 — Ato I — a farda e a vergonha ———
  s.push(
    tela(
      3,
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
      </div>`
    )
  );

  // ——— Tela 4 — Ato I — Presídio Militar ———
  s.push(
    tela(
      4,
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
        <p class="pe-de-pagina">Este documento não foi escrito de gabinete. Tudo o que vem a seguir foi desenhado para funcionar neste terreno.</p>
      </div>`
    )
  );

  // ——— Tela 5 — Ato I — pivô ———
  s.push(
    tela(
      5,
      1,
      `<div class="screen-inner screen-inner--pivot">
        <h2>Ele não precisa de mais cobrança.</h2>
        <p class="lead">Precisa de alguém que vá à caverna com ele e aponte Cristo.</p>
        ${fechoAto("Antes de mostrar o que foi construído, é preciso dizer o que já existia.")}
      </div>`
    )
  );

  // ——— Tela 6 — Ato II — antes da estrutura ———
  s.push(
    tela(
      6,
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
        ${notaAutor(
          [
            esc(
              "Preciso dizer isto antes de mostrar qualquer estrutura: nada aqui é invenção metodológica minha. O que descrevo nas próximas telas é a organização, em papel, de algo que o senhor viu acontecer antes de existir qualquer documento. Se em algum ponto a estrutura parecer maior do que aquilo que ela serve, é erro meu de proporção — e é exatamente esse tipo de erro que peço que o senhor aponte."
            ),
          ],
          true
        )}
      </div>`
    )
  );

  // ——— Tela 7 — Ato II — Adulão ———
  s.push(
    tela(
      7,
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
        ${fechoAto("O mover era real. O que faltava era forma de guardá-lo.")}
      </div>`
    )
  );

  // ——— Tela 8 — Ato III — riscos ———
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
      8,
      3,
      `<div class="screen-inner">
        <h2>Sem método, o que Deus faz se perde.</h2>
        ${instrucao("Toque em cada risco para ver a salvaguarda que o Guia prevê.")}
        <div class="flip-grid">${flipRiscos}</div>
      </div>`
    )
  );

  // ——— Tela 9 — Ato III — Guia Mestre ———
  s.push(
    tela(
      9,
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
        ${fechoAto("O que vem agora não é o conteúdo do Guia. É a razão pela qual ele tem a forma que tem.")}
      </div>`
    )
  );

  // ——— Tela 10 — Ato IV — quatro ações de Cristo ———
  s.push(
    tela(
      10,
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
        <p class="eixo-sujeito">Em cada uma dessas quatro frases, o sujeito é Cristo — não o instrutor, e não o discípulo.</p>
      </div>`
    )
  );

  // ——— Tela 11 — Ato IV — Efésios 6 ———
  s.push(
    tela(
      11,
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
        <p class="armor-nota">A barra no alto desta página é essa armadura. Ela se completa conforme o senhor avança.</p>
      </div>`
    )
  );

  // ——— Tela 12 — Ato IV — Espada e Capacete ———
  s.push(
    tela(
      12,
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
      </div>`
    )
  );

  // ——— Tela 13 — Ato IV — contemplar antes de obedecer ———
  s.push(
    tela(
      13,
      4,
      `<div class="screen-inner">
        <h2>Contemplar antes de obedecer.</h2>
        <p>Nenhuma disciplina espiritual verdadeira nasce de cobrança — nasce de fascínio.<br>Nenhuma obediência frutífera nasce de medo — nasce de amor.</p>
        <p>Por isso toda lição segue a mesma ordem interna:<br><strong>ver Cristo</strong> → <strong>entender pela Palavra</strong> → <strong>responder em obediência concreta</strong></p>
        <p>A prática não paga culpa. Ela responde à graça.</p>
        <div class="metodo-ciclo" role="img" aria-label="Ciclo: ver Cristo, entender, responder">
          <span>ver Cristo</span><span>→</span><span>entender</span><span>→</span><span>responder</span><span class="metodo-ciclo__retorno">↺</span>
        </div>
        ${fechoAto("Definido o eixo, resta mostrar como ele vira ano letivo.")}
      </div>`
    )
  );

  // ——— Tela 14 — Ato V — 4x12=48 ———
  s.push(
    tela(
      14,
      5,
      `<div class="screen-inner">
        <p class="conta-grande" aria-label="4 vezes 12 igual a 48">4 × 12 = 48</p>
        <h2>Quatro módulos sequenciais. Doze lições cada. Um ciclo anual.</h2>
        <p>Nenhum módulo repete o outro. Alguns temas retornam — com profundidade e finalidade diferentes.<br>O discípulo não gira nos mesmos assuntos: ele sobe em espiral.</p>
        <div class="grade-48" id="grade-48" aria-hidden="true"></div>
      </div>`
    )
  );

  // ——— Tela 15 — Ato V — ritmo do encontro ———
  s.push(
    tela(
      15,
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
        <p class="ritmo-nota">O encontro termina; a lição não. A Ordem do Dia é o que atravessa a semana.</p>
      </div>`
    )
  );

  // ——— Tela 16 — Ato V — anatomia da lição ———
  const anatomiaBtns = ANATOMIA_L6.map((el) => {
    const destaque =
      el.chave === "aplicacao" || el.chave === "ordemDia"
        ? " anatomia-btn--destaque"
        : "";
    return `<li><button type="button" class="anatomia-btn${destaque}" data-anatomia="${el.chave}" aria-expanded="false">${esc(el.rotulo)}</button>
        <div class="anatomia-panel" id="anatomia-${el.chave}" hidden>
          <p class="anatomia-guia"><em>Guia 3.4:</em> ${esc(el.guia)}</p>
          <p>${esc(el.conteudo)}</p>
        </div></li>`;
  }).join("");

  s.push(
    tela(
      16,
      5,
      `<div class="screen-inner">
        <h2>Toda lição tem sete elementos. Sempre os mesmos.</h2>
        <p>Título · Texto-base · Objetivo · Síntese teológica · Aplicação militar · <strong>Ordem do Dia</strong> · Perguntas de reflexão</p>
        <p class="anatomia-sub">Exemplo: Lição 6 — ${esc(licao6.titulo)} (${esc(licao6.textoBase)}). Título, texto-base e objetivo vêm da matriz; os demais painéis trazem a definição do Guia 3.4 — o texto integral da lição está nas edições Aluno e Instrutor.</p>
        ${instrucao("Toque em cada elemento para ver a definição do Guia 3.4. Aplicação militar e Ordem do Dia aparecem em destaque, por serem os elementos que a caserna mais precisa reconhecer.")}
        <ul class="anatomia-list">${anatomiaBtns}</ul>
        <p>A repetição do formato não cria frieza. <strong>Cria chão.</strong><br>Instrutores diferentes, em ambientes diferentes, ministram o mesmo conteúdo sem perda de ênfase.</p>
      </div>`
    )
  );

  // ——— Tela 17 — Ato V — matriz curricular ———
  const totalLicoes = matriz.licoes.length;
  const mod1Count = matriz.licoes.filter((l) => l.modulo === 1).length;
  const modBtns = modulos.modulos
    .map(
      (m) =>
        `<button type="button" class="matriz-filtro${m.numero === 1 ? " matriz-filtro--ativa" : ""}" data-modulo="${m.numero}">${esc(m.nome)}</button>`
    )
    .join("");
  const matrizRows = matriz.licoes
    .map(
      (l) =>
        `<tr data-modulo="${l.modulo}"${l.modulo !== 1 ? " hidden" : ""}><td>${l.numero}</td><td>${esc(l.titulo)}</td><td>${esc(l.textoBase)}</td><td class="col-obj">${esc(l.objetivo)}</td></tr>`
    )
    .join("");
  const matrizCards = matriz.licoes
    .map(
      (l) =>
        `<li class="matriz-lista__item" data-modulo="${l.modulo}"${l.modulo !== 1 ? " hidden" : ""}>
          <p class="matriz-lista__num">Lição ${l.numero}</p>
          <p class="matriz-lista__titulo">${esc(l.titulo)}</p>
          <p class="matriz-lista__base">${esc(l.textoBase)}</p>
          <p class="matriz-lista__obj">${esc(l.objetivo)}</p>
        </li>`
    )
    .join("");

  s.push(
    tela(
      17,
      5,
      `<div class="screen-inner screen-inner--matriz">
        <h2>As 48 lições, em visão anual.</h2>
        <p class="matriz-framing">O Módulo 1 é o que submeto à sua apreciação agora. Os demais estão desenhados e aguardam liberação. Use os filtros para percorrer o ano inteiro.</p>
        <div class="matriz-toolbar">
          <button type="button" class="matriz-filtro" data-modulo="0">Todas</button>
          ${modBtns}
        </div>
        <p class="matriz-contador" id="matriz-contador" aria-live="polite">${mod1Count} de ${totalLicoes} lições</p>
        <div class="matriz-scroll">
          <table class="matriz-tabela">
            <thead><tr><th>#</th><th>Título</th><th>Texto-base</th><th>Objetivo</th></tr></thead>
            <tbody>${matrizRows}</tbody>
          </table>
        </div>
        <ul class="matriz-lista">${matrizCards}</ul>
        <p class="matriz-rodape">O texto integral de cada lição está nas edições Aluno e Instrutor do Módulo 1, em anexo.</p>
      </div>`
    )
  );

  // ——— Tela 18 — Ato V — cinco marcas ———
  s.push(
    tela(
      18,
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
        <p class="marcas-salvaguarda marcas-salvaguarda--destaque">Nenhuma delas descreve perfeição alcançada. Todas descrevem <strong>caminho em andamento</strong>.</p>
        ${fechoAto("A estrutura já foi vista. Falta o que a torna memorável para quem a percorre.")}
      </div>`
    )
  );

  // ——— Tela 19 — Ato VI — marchas ———
  s.push(
    tela(
      19,
      6,
      `<div class="screen-inner">
        <h2>Cada módulo termina em um marco reconhecido pela tropa.</h2>
        <ul class="marchas">
          <li><span class="mil-label">Primeira Marcha</span> — O Recruta que se Rendeu</li>
          <li><span class="mil-label">Segunda Marcha</span> — O Combatente que se Fortalece</li>
          <li><span class="mil-label">Terceira Marcha</span> — O Guerreiro que Persevera</li>
          <li><span class="mil-label">Formatura do Soldado de Cristo</span></li>
        </ul>
        <p class="marchas-nota">Recruta, combatente, guerreiro, soldado. É a mesma pessoa, em quatro estágios.</p>
      </div>`
    )
  );

  // ——— Tela 20 — Ato VI — símbolos ———
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
      20,
      6,
      `<div class="screen-inner">
        <h2>Quatro insígnias. Nenhuma é troféu.</h2>
        <p><em>Toque em cada uma para ver o sentido bíblico.</em></p>
        <div class="flip-grid flip-grid--simbolos">${flipSim}</div>
        <p class="simbolos-nota">Cada peça tem o nome que a Escritura dá e o nome que a caserna reconhece.</p>
      </div>`
    )
  );

  // ——— Tela 21 — Ato VI — ritos ———
  s.push(
    tela(
      21,
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
        ${notaAutor(
          [
            esc(
              "Esta foi a preocupação que mais me ocupou na revisão. Um sistema de insígnias, num ambiente onde a hierarquia já é linguagem corrente, tem caminho curto para virar vaidade. O Guia condena triunfalismo em cinco seções distintas, e não como ressalva de rodapé: como critério de condução. Ainda assim, é o ponto do projeto em que eu mais precisaria da sua correção, porque é o ponto em que a boa intenção do autor não basta."
            ),
          ],
          false
        )}
      </div>`
    )
  );

  // ——— Tela 22 — Ato VI — certificado ———
  s.push(
    tela(
      22,
      6,
      `<div class="screen-inner">
        <h2>Memória pastoral, não comprovação de mérito.</h2>
        <blockquote class="cert-quote">
          <p>“Certificamos que [nome] concluiu, pela graça de Cristo, a [marcha correspondente] do Discipulando a Caserna, como testemunho da obra que Deus começou e haverá de completar (Fp 1.6).”</p>
        </blockquote>
        <p class="proposta-tag">PROPOSTA</p>
        <p>Onde o contexto institucional não permitir a entrega física, <strong>o registro pastoral simples cumpre a mesma função.</strong></p>
        ${fechoAto("O que se vive em sala precisa ter forma visível fora dela.")}
      </div>`
    )
  );

  // ——— Tela 23 — Ato VII — escudo ———
  s.push(
    tela(
      23,
      7,
      `<div class="screen-inner">
        <h2>O escudo ensina o que o programa confessa.</h2>
        <p class="estudo-tag">logomarca oficial — apreciação pastoral pendente</p>
        <div class="escudo-wrap"><img class="escudo-img" src="${escudoPng}" width="320" height="320" alt="Logomarca do Discipulando a Caserna" decoding="async" /></div>
        <p>Um escudo com as insígnias cravadas — o cinto, a couraça, os calçados e, no quarto campo, o próprio escudo do Projeto.<br>Encimado pelo <strong>capacete</strong>. Atravessado pela <strong>espada</strong>.</p>
        <p>O discípulo não coleciona medalhas. <strong>Ele é revestido por Cristo.</strong></p>
      </div>`
    )
  );

  // ——— Tela 24 — Ato VII — caderneta ———
  s.push(
    tela(
      24,
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
        ${notaAutor(
          [
            esc(
              "A caderneta é a única peça material que o próprio Guia praticamente exige, porque a Ordem do Dia precisa ser registrada em algum lugar. Coloco-a antes de qualquer outra aplicação da marca de propósito: quero que fique claro que ela nasceu da pedagogia. O que vem na tela seguinte não tem essa justificativa, e por isso está marcado como estudo."
            ),
          ],
          false
        )}
      </div>`
    )
  );

  // ——— Tela 25 — Ato VII — merch ———
  s.push(
    tela(
      25,
      7,
      `<div class="screen-inner">
        <h2>Senso de corpo tem forma visível — em estudo.</h2>
        <p class="estudo-tag estudo-tag--block">ESTUDO — NÃO APROVADO</p>
        <ul class="merch-list"><li>Camisa</li><li>Caneca</li><li>Adesivo</li><li>Insígnia bordada</li><li>Bolsa de campanha</li></ul>
        <p>Não são produtos de vitrine. São sinais de pertencimento a uma tropa — o mesmo princípio que o Guia assume quando fala de senso de corpo, camaradagem e vida comunitária.</p>
        ${notaAutor(
          [
            esc("Esta tela não é um pedido. É uma consulta."),
            esc(
              "Trago o estudo porque acho que o senhor precisa saber que ele existe e que eu pensei nele — não porque queira aprovação hoje. Se a resposta for que o projeto não deve ter esse tipo de aplicação, ou não agora, isso encerra o assunto e não haverá insistência. Registrei salvaguardas abaixo porque, se um dia houver decisão favorável, ela já deve nascer com limite."
            ),
          ],
          false
        )}
        <div class="salvaguardas">
          <h3>Salvaguardas propostas</h3>
          <ul>
            <li>Uso vinculado a discípulos, instrutores e apoiadores do projeto</li>
            <li>Nenhuma peça condiciona participação, avanço ou bênção</li>
            <li>Destinação de eventual receita definida e prestada em conta à liderança</li>
            <li>Aprovação prévia de toda aplicação da marca</li>
          </ul>
        </div>
      </div>`
    )
  );

  // ——— Tela 26 — Ato VII — caderno de identidade ———
  s.push(
    tela(
      26,
      7,
      `<div class="screen-inner">
        <h2>A forma pode variar. O conteúdo teológico, não.</h2>
        <p>O Guia já estabelece: o recurso gráfico de cada símbolo pode mudar conforme o que estiver disponível — impresso, cartão, insígnia, projeção.<br><strong>O significado espiritual e a ordem dos símbolos não devem ser alterados.</strong></p>
        <p class="pendencia">Pendência registrada: <strong>Caderno de Identidade Visual do Projeto</strong>, previsto no item 5.3 e ainda não produzido.</p>
        <p>O Guia previu esse caderno. Ele ainda não existe. Proponho que seja o próximo entregável — sob a supervisão do senhor.</p>
        ${fechoAto("Até aqui, o que existe. A partir daqui, o que ainda não existe.")}
      </div>`
    )
  );

  // ——— Tela 27 — Ato VIII — apêndices ———
  s.push(
    tela(
      27,
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
        <p class="apendices-nota">Não apresento isso como pronto, porque não está.</p>
      </div>`
    )
  );

  // ——— Tela 28 — Ato VIII — multiplicação ———
  s.push(
    tela(
      28,
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
        <p class="multiplicacao-nota">O item 6.4.2 já prevê a multiplicação. O que ainda não existe é o percurso formal de formação do instrutor.</p>
      </div>`
    )
  );

  // ——— Tela 29 — Ato VIII — continuidade ———
  s.push(
    tela(
      29,
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
        ${fechoAto("É tudo o que eu tinha a apresentar. O que segue depende do senhor.")}
      </div>`
    )
  );

  // ——— Tela 30 — Ato VIII — FAQ ———
  const FAQ_V2 = [
    {
      pergunta: "Isso não militariza demais o Evangelho?",
      resposta:
        "A metáfora militar é ponte pedagógica, não conteúdo. O Guia subordina toda imagem de caserna às Escrituras e afirma, em mais de uma seção, que o modelo de autoridade não é a hierarquia terrena, mas Cristo — o Comandante que serve e dá a vida. Onde a linguagem parecer sacralizar a instituição militar, é falha de redação e deve ser corrigida.",
    },
    {
      pergunta: "O sistema de marchas não vira competição entre os homens?",
      resposta:
        "É o risco real do projeto. As salvaguardas estão escritas: sem ranking, sem comparação, sem condicionamento de bênçãos, entrega comunitária, ninguém exposto. Mas salvaguarda em papel não basta — depende de quem conduz. É por isso que a formação de instrutores está listada como pendência, e não como detalhe.",
    },
    {
      pergunta: "Quem garante fidelidade doutrinária se isso for replicado?",
      resposta:
        "Hoje, ninguém — e é uma lacuna que reconheço. O Guia estabelece que ajustes pedagógicos são bem-vindos e que mudanças doutrinárias exigem deliberação pastoral, mas não existe ainda instância formal que exerça isso. Proponho que a homologação venha acompanhada da definição de quem responde por essa guarda.",
    },
    {
      pergunta: "Quanto do meu tempo isso vai exigir?",
      resposta:
        "Para a homologação: a leitura do Guia e a apreciação do Módulo 1. Depois disso, o que eu pediria é acompanhamento pontual em decisões doutrinárias — não gestão de rotina. A condução operacional é minha responsabilidade e da equipe.",
    },
    {
      pergunta: "De onde vem o recurso para isso?",
      resposta:
        "Nada do que está aqui depende de recurso ainda. Impressos, insígnias e aplicações só entram em pauta se e quando houver decisão favorável, com destinação definida pela liderança e prestação de contas. Nenhuma peça foi produzida.",
    },
    {
      pergunta: "E se eu quiser mudar algo estrutural?",
      resposta:
        "Todo o material está em versão candidata justamente para isso. Alterar módulo, símbolo, nomenclatura ou sequência é trabalho de revisão, não perda — e é preferível fazê-lo agora, antes de qualquer turma iniciar.",
    },
  ];

  const faqItems = FAQ_V2.map(
    (f) =>
      `<details class="faq-item"><summary>${esc(f.pergunta)}</summary><div class="faq-resposta"><p>${esc(f.resposta)}</p></div></details>`
  ).join("");

  s.push(
    tela(
      30,
      8,
      `<div class="screen-inner">
        <h2>O que eu responderia, se o senhor me perguntasse.</h2>
        ${instrucao("Toque em cada pergunta.")}
        <div class="faq-acordeao">${faqItems}</div>
      </div>`
    )
  );

  // ——— Tela 31 — Ato IX — se não for hora ———
  s.push(
    tela(
      31,
      9,
      `<div class="screen-inner screen-inner--sobrio">
        <h2>Se o senhor entender que não é hora, ou que não é assim.</h2>
        <p>Este material está em versão candidata. Ele não foi impresso, não foi distribuído, nenhuma turma foi iniciada e nenhuma peça foi produzida. Nada precisa ser desfeito.</p>
        <p>Se a resposta for <strong>“ainda não”</strong>, o material aguarda.<br>
        Se for <strong>“não desse jeito”</strong>, eu reviso — e prefiro revisar agora.<br>
        Se for <strong>“não”</strong>, o trabalho não terá sido perdido: ele já serviu para organizar o que aprendi.</p>
        <p>Não há prazo, não há compromisso assumido com terceiros e não há nada em curso que dependa de uma resposta rápida.</p>
      </div>`
    )
  );

  // ——— Tela 32 — Ato IX — checklist ———
  const CHECKLIST_V2 = [
    {
      titulo: "O que peço agora",
      itens: [
        "Apreciação doutrinária e pastoral do Módulo 1 (doze lições, edições Aluno e Instrutor)",
        "Homologação do Guia Mestre v1.0-RC → v1.0",
        "Liberação para produção dos Módulos 2 a 4",
      ],
    },
    {
      titulo: "O que peço quando for possível",
      itens: [
        "O prefácio do Guia Mestre (convite integral abaixo — sem prazo)",
        "Definição de quem responde pela guarda doutrinária em caso de replicação",
        "Apreciação do estudo de identidade visual e da logomarca",
      ],
    },
    {
      titulo: "Decisões que dependem das anteriores",
      itens: [
        "Turma-piloto: local, período, número de participantes",
        "Instrutor ou instrutores responsáveis",
        "Produção do Caderno de Identidade Visual (pendência do item 5.3)",
        "Desenvolvimento dos Apêndices Pastorais",
        "Política de aplicação da marca e destinação de eventual receita",
        "Fluxo de comunicação com a igreja local (item 1.4.3)",
      ],
    },
  ];

  let checkIdx = 0;
  const checklistBlocos = CHECKLIST_V2.map((bloco) => {
    const itens = bloco.itens
      .map((item) => {
        const i = checkIdx++;
        return `<li><label><input type="checkbox" data-check="${i}" /> <span>${esc(item)}</span></label><textarea class="check-obs" rows="1" placeholder="Observações" aria-label="Observações para ${esc(item)}"></textarea></li>`;
      })
      .join("");
    return `<div class="checklist-bloco"><h3>${esc(bloco.titulo)}</h3><ul class="checklist">${itens}</ul></div>`;
  }).join("");

  s.push(
    tela(
      32,
      9,
      `<div class="screen-inner screen-inner--decisao">
        <h2>Pastor, o Guia está em v1.0-RC. Nenhum conteúdo é final antes da sua homologação.</h2>
        <div class="checklist-blocos">${checklistBlocos}</div>
        <div class="convite">
          <p class="convite-rotulo">CONVITE</p>
          <h3>O prefácio</h3>
          ${CONVITE.split("\n\n")
            .map((p) => `<p>${esc(p)}</p>`)
            .join("")}
        </div>
        <div class="obs-geral-bloco">
          <label for="obs-geral">Observações gerais</label>
          <textarea id="obs-geral" class="obs-geral" rows="4" placeholder="Observações gerais"></textarea>
        </div>
        <div class="decisao-acoes">
          <button type="button" id="btn-copiar">Copiar resumo</button>
          <button type="button" id="btn-imprimir">Imprimir</button>
        </div>
        <p id="copiar-status" class="copiar-status" role="status" aria-live="polite"></p>
        <p class="retorno-caminho">O resumo pode ser enviado por WhatsApp ou e-mail, ou entregue impresso e assinado — o que for mais cômodo. Se preferir tratar pessoalmente, também está bem: a lista serve só para que nada se perca.</p>
        <p class="retorno-assinatura">Obr. Flávio Alves da Costa · <a href="mailto:casernadeadulao@gmail.com">casernadeadulao@gmail.com</a></p>
      </div>`
    )
  );

  // ——— Tela 33 — Ato IX — fechamento ———
  s.push(
    tela(
      33,
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
      </div>`
    )
  );

  return s.join("\n");
};

module.exports.ATOS_V2 = ATOS_V2;
module.exports.TOTAL_SCREENS = TOTAL_SCREENS;
module.exports.ARMOR_FILL = ARMOR_FILL;
module.exports.ARMOR_JUMP = ARMOR_JUMP;
module.exports.ATO_ABERTURAS = ATO_ABERTURAS;
