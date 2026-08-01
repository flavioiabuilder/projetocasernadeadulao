/**
 * Átrio — dados e composição da demonstração.
 *
 * O conteúdo demonstrativo é FICTÍCIO e vive só aqui, separado do motor.
 * Nenhuma primitiva de motion.js, navigation.js ou forms.js conhece estes
 * dados; trocar este arquivo troca a página inteira sem tocar no sistema.
 *
 * A entidade "Centro Comunitário Vale do Bosque" é inventada para esta
 * demonstração. Endereço, telefone, horários e eventos são inventados e
 * não correspondem a nenhuma organização real.
 */
(function (window, document) {
  "use strict";

  const A = window.Atrio;

  /* ============================================================
     Conteúdo fictício
     ============================================================ */

  const CONTEUDO = {
    agenda: [
      {
        quando: "Sábado, 14 de março · 9h",
        titulo: "Mutirão da horta comunitária",
        resumo:
          "Um sábado de mãos na terra, café coletivo e conversa sem pressa. " +
          "Ferramentas emprestadas no local — traga só disposição.",
        acao: "Quero participar",
        destaque: false,
      },
      {
        quando: "Programação completa",
        titulo: "Veja o calendário do semestre",
        resumo:
          "Todas as atividades abertas, com horários, endereço e informações " +
          "de acessibilidade de cada espaço.",
        acao: "Abrir calendário",
        destaque: true,
      },
      {
        quando: "Terças · 19h30",
        titulo: "Roda de leitura",
        resumo:
          "Encontro semanal para ler em voz alta e conversar. Sem leitura " +
          "prévia obrigatória; quem chega no meio do livro é bem-vindo.",
        acao: "Saber mais",
        destaque: false,
      },
      {
        quando: "21 e 22 de junho",
        titulo: "Encontro de bairro",
        resumo:
          "Dois dias de oficinas, apresentações e comida partilhada na praça. " +
          "Entrada gratuita, programação para todas as idades.",
        acao: "Ver programação",
        destaque: false,
      },
    ],

    caminhos: [
      {
        titulo: "Primeira visita",
        resumo:
          "Estacionamento acessível, sala de acolhimento e alguém à porta para " +
          "receber você. Veja o que esperar antes de vir.",
        acao: "O que esperar",
      },
      {
        titulo: "Apoio e escuta",
        resumo:
          "Uma equipe de escuta atende por mensagem durante a semana. " +
          "Confidencial, sem formulário longo e sem fila.",
        acao: "Pedir contato",
      },
      {
        titulo: "Grupos",
        resumo:
          "Encontros pequenos por bairro e por interesse. É onde a maior parte " +
          "das amizades daqui começa.",
        acao: "Encontrar um grupo",
      },
      {
        titulo: "Voluntariado",
        resumo:
          "Cozinha, recepção, horta, som, biblioteca. Há função para quem tem " +
          "duas horas por mês e para quem tem duas por semana.",
        acao: "Quero ajudar",
      },
    ],

    horarios: [
      { quando: "Quarta · 19h", oque: "Encontro aberto" },
      { quando: "Sábado · 9h", oque: "Atividades comunitárias" },
      { quando: "Domingo · 10h", oque: "Encontro principal" },
      { quando: "Domingo · 17h", oque: "Encontro tranquilo (uma vez por mês)" },
    ],

    valores: [
      "Portas abertas",
      "Escuta antes da resposta",
      "Trabalho partilhado",
      "Cuidado com o bairro",
      "Nada de vitrine",
    ],

    avisos: [
      "Inscrições abertas para o mutirão de março",
      "Nova sala de acessibilidade em funcionamento",
      "Biblioteca comunitária recebe doações às quartas",
    ],
  };

  /* ============================================================
     Fábricas de marcação
     ============================================================ */

  function elemento(tag, classe, texto) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto !== undefined) el.textContent = texto;
    return el;
  }

  function botao(rotulo, variante) {
    const el = elemento("button", "at-botao at-botao--" + variante, rotulo);
    el.type = "button";
    return el;
  }

  function cartaoEvento(dado) {
    const artigo = elemento(
      "article",
      "at-evento at-subir at-hover-eleva" + (dado.destaque ? " at-cartao--acento" : "")
    );
    artigo.appendChild(elemento("p", "at-rotulo at-evento__quando", dado.quando));
    artigo.appendChild(elemento("h3", "at-display-md", dado.titulo));
    artigo.appendChild(elemento("p", "at-corpo", dado.resumo));

    const acao = botao(dado.acao, dado.destaque ? "primario" : "secundario");
    acao.classList.add("at-evento__acao");
    // Rótulo acessível completo: "Ver programação" sozinho não diz de quê.
    acao.setAttribute("aria-label", dado.acao + " — " + dado.titulo);
    artigo.appendChild(acao);
    return artigo;
  }

  function cartaoCaminho(dado) {
    const artigo = elemento("article", "at-cartao at-subir at-hover-eleva");
    artigo.appendChild(elemento("h3", "at-display-md", dado.titulo));
    artigo.appendChild(elemento("p", "at-corpo", dado.resumo));
    const acao = botao(dado.acao, "secundario");
    acao.classList.add("at-cartao__acao");
    acao.setAttribute("aria-label", dado.acao + " — " + dado.titulo);
    artigo.appendChild(acao);
    return artigo;
  }

  function linhaHorario(dado) {
    const linha = elemento("div", "at-horarios__linha");
    linha.appendChild(elemento("span", "at-horarios__quando", dado.quando));
    linha.appendChild(elemento("span", "at-corpo", dado.oque));
    return linha;
  }

  function itemMarquee(texto, indice) {
    const grupo = elemento("span", "at-marquee__item");
    grupo.appendChild(elemento("span", "at-cartaz-lg", texto));
    grupo.appendChild(elemento("span", "at-cartaz-lg at-marquee__separador", "—"));
    grupo.dataset.indice = String(indice);
    return grupo;
  }

  /* ============================================================
     Composição das letras do palco
     ============================================================ */

  /**
   * Distribui as letras de uma frase pelo palco em posições fixas.
   * As posições são percentuais para acompanharem a viewport; a ordem no
   * DOM é a ordem de leitura, o que mantém a frase coerente para quem usa
   * leitor de tela (o texto real fica em um nó oculto ao lado).
   */
  function montarPalco(container, frase, posicoes) {
    const letras = frase.replace(/\s+/g, "").split("");
    const acessivel = elemento("span", "at-visualmente-oculto", frase);
    container.appendChild(acessivel);

    const camada = elemento("div", "at-palco__letras");
    camada.setAttribute("aria-hidden", "true");
    letras.forEach(function (letra, i) {
      const span = elemento("span", "at-letra", letra);
      const pos = posicoes[i % posicoes.length];
      span.style.left = pos[0] + "%";
      span.style.top = pos[1] + "%";
      camada.appendChild(span);
    });
    container.appendChild(camada);
  }

  /* ============================================================
     Montagem
     ============================================================ */

  /**
   * Escreve o conteúdo demonstrativo no DOM.
   *
   * Precisa rodar ANTES de Atrio.iniciar(): as primitivas de motion observam
   * os elementos uma única vez, e o que não existir naquele instante nunca
   * será revelado. Conteúdo primeiro, comportamento depois.
   */
  function montar(raiz) {
    const agenda = raiz.querySelector("[data-demo-agenda]");
    if (agenda) {
      CONTEUDO.agenda.forEach(function (dado) {
        const item = elemento("li", "at-carrossel__item");
        item.appendChild(cartaoEvento(dado));
        agenda.appendChild(item);
      });
    }

    const caminhos = raiz.querySelector("[data-demo-caminhos]");
    if (caminhos) {
      CONTEUDO.caminhos.forEach(function (dado) {
        caminhos.appendChild(cartaoCaminho(dado));
      });
    }

    const horarios = raiz.querySelector("[data-demo-horarios]");
    if (horarios) {
      CONTEUDO.horarios.forEach(function (dado) {
        horarios.appendChild(linhaHorario(dado));
      });
    }

    const valores = raiz.querySelector("[data-demo-valores]");
    if (valores) {
      CONTEUDO.valores.forEach(function (texto, i) {
        valores.appendChild(itemMarquee(texto, i));
      });
    }

    const avisos = raiz.querySelector("[data-demo-avisos]");
    if (avisos) {
      CONTEUDO.avisos.forEach(function (texto, i) {
        const item = elemento("span", "at-marquee__item");
        item.appendChild(elemento("span", "at-rotulo", texto));
        item.appendChild(elemento("span", "at-rotulo at-marquee__separador", "·"));
        item.dataset.indice = String(i);
        avisos.appendChild(item);
      });
    }

    const palco = raiz.querySelector("[data-demo-palco]");
    if (palco) {
      montarPalco(palco, "portas abertas", [
        [6, 8],
        [17, 12],
        [28, 6],
        [39, 14],
        [52, 4],
        [63, 16],
        [74, 7],
        [84, 18],
        [12, 62],
        [26, 70],
        [41, 58],
        [56, 72],
        [70, 60],
      ]);
    }

    return raiz;
  }

  A.demo = { montar: montar, CONTEUDO: CONTEUDO };
})(window, document);
