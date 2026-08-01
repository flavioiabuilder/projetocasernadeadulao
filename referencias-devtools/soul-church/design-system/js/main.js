/**
 * Átrio — núcleo do runtime.
 *
 * Separação deliberada de responsabilidades:
 *   tokens        → tokens.css, lidos aqui por Atrio.token()
 *   cálculo       → funções puras neste arquivo (testáveis sem DOM)
 *   estado        → atributos data-* e aria-* no DOM
 *   renderização  → CSS; o JS só troca atributos e custom properties
 *   efeitos       → módulos registrados, cada um devolvendo destruir()
 *   conteúdo      → HTML; nenhum módulo escreve texto editorial
 *   acessibilidade→ foco, rótulos e regiões vivas, tratados explicitamente
 *
 * Convenção: toda função que registra ouvinte, observer, timer ou animação
 * devolve `destruir()`. `Atrio.iniciar()` acumula esses canceladores e
 * `Atrio.destruir()` executa todos — é assim que a demo e o laboratório
 * podem ser reinicializados sem vazar.
 */
(function (window, document) {
  "use strict";

  const Atrio = {};
  const modulos = [];
  let canceladores = [];

  /* ============================================================
     Preferências e capacidades
     ============================================================ */

  const consultaMovimento = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

  /** Verdadeiro quando o usuário pediu menos movimento. */
  function movimentoReduzido() {
    return !!(consultaMovimento && consultaMovimento.matches);
  }

  /** Verdadeiro quando o ponteiro é fino (mouse/trackpad), não toque. */
  function ponteiroFino() {
    return !!(window.matchMedia && window.matchMedia("(pointer: fine)").matches);
  }

  /* ============================================================
     Leitura de tokens
     ============================================================ */

  /**
   * Lê uma custom property do :root. É a única ponte entre CSS e JS:
   * nenhum módulo deve trazer duração, distância ou cor embutida.
   */
  function token(nome, elemento) {
    const alvo = elemento || document.documentElement;
    return window.getComputedStyle(alvo).getPropertyValue(nome).trim();
  }

  /** Converte "800ms" ou "0.8s" em milissegundos. */
  function paraMs(valor) {
    if (typeof valor !== "string") return 0;
    const texto = valor.trim();
    const numero = parseFloat(texto);
    if (!isFinite(numero)) return 0;
    return /ms\s*$/.test(texto) ? numero : /s\s*$/.test(texto) ? numero * 1000 : numero;
  }

  /** Lê um token de duração já convertido para ms. */
  function duracao(nome) {
    return paraMs(token(nome));
  }

  /* ============================================================
     Matemática pura (sem DOM — coberta por teste unitário)
     ============================================================ */

  /** Mantém `valor` dentro de [min, max]. */
  function limitar(valor, min, max) {
    return valor < min ? min : valor > max ? max : valor;
  }

  /** Mapeia `valor` de [min, max] para 0..1, saturando fora do intervalo. */
  function normalizar(valor, min, max) {
    if (max === min) return 0;
    return limitar((valor - min) / (max - min), 0, 1);
  }

  /**
   * Distribui um stagger total entre `quantidade` itens.
   * Reproduz o comportamento medido na referência: o conjunto inteiro leva
   * sempre o mesmo tempo, independentemente de quantas palavras existirem —
   * um título de 3 palavras e outro de 28 terminam juntos.
   */
  function distribuirStagger(indice, quantidade, totalMs) {
    if (quantidade <= 1) return 0;
    return (indice / (quantidade - 1)) * totalMs;
  }

  /**
   * Duração de um ciclo de marquee, em segundos, dado o comprimento do
   * trilho e a velocidade desejada. Velocidade constante entre trilhos de
   * tamanhos diferentes é o que impede que dois marquees briguem entre si.
   */
  function duracaoMarquee(larguraPx, velocidadePxPorSegundo) {
    if (!(velocidadePxPorSegundo > 0) || !(larguraPx > 0)) return 0;
    return larguraPx / velocidadePxPorSegundo;
  }

  /* ============================================================
     Fatiamento de texto preservando o nome acessível
     ============================================================ */

  /**
   * Envolve cada palavra em <span class="at-palavra"> para poder escaloná-las.
   *
   * A referência fatia letra a letra com SplitType e, com isso, destrói o
   * nome acessível: o leitor de tela soletra o título. Aqui:
   *   - fatiamos por PALAVRA, nunca por letra;
   *   - marcamos os spans com aria-hidden e mantemos o texto original em um
   *     nó visualmente oculto, de modo que a árvore acessível continue
   *     lendo "Todos são bem-vindos" e não "T o d o s".
   *
   * Devolve destruir(), que restaura o conteúdo original.
   */
  function fatiarPalavras(elemento) {
    if (!elemento || elemento.dataset.fatiado === "true") {
      return function () {};
    }
    const original = elemento.innerHTML;
    const texto = elemento.textContent.replace(/\s+/g, " ").trim();
    if (!texto) return function () {};

    const partes = texto.split(" ");
    const fragmento = document.createDocumentFragment();

    const acessivel = document.createElement("span");
    acessivel.className = "at-visualmente-oculto";
    acessivel.textContent = texto;
    fragmento.appendChild(acessivel);

    const visual = document.createElement("span");
    visual.setAttribute("aria-hidden", "true");
    partes.forEach(function (palavra, i) {
      const span = document.createElement("span");
      span.className = "at-palavra";
      span.textContent = palavra;
      visual.appendChild(span);
      if (i < partes.length - 1) visual.appendChild(document.createTextNode(" "));
    });
    fragmento.appendChild(visual);

    elemento.innerHTML = "";
    elemento.appendChild(fragmento);
    elemento.dataset.fatiado = "true";
    elemento.dataset.palavras = String(partes.length);

    return function destruir() {
      elemento.innerHTML = original;
      delete elemento.dataset.fatiado;
      delete elemento.dataset.palavras;
    };
  }

  /* ============================================================
     Foco: armadilha e restauração
     ============================================================ */

  const SELETOR_FOCAVEL = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled]):not([type='hidden'])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");

  /** Elementos focáveis e realmente visíveis dentro de `raiz`. */
  function focaveis(raiz) {
    return Array.prototype.filter.call(
      raiz.querySelectorAll(SELETOR_FOCAVEL),
      function (el) {
        return el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement;
      }
    );
  }

  /**
   * Prende o foco dentro de `container` e o devolve ao sair.
   *
   * A referência abre menu e painel sem mover o foco e sem isolar o fundo:
   * quem navega por teclado continua tabulando pela página atrás do overlay.
   * Aqui o fundo recebe `inert` quando suportado e, como alternativa, o
   * Tab é redirecionado manualmente.
   */
  function prenderFoco(container, opcoes) {
    const cfg = opcoes || {};
    const anterior = document.activeElement;
    const irmaos = cfg.inertizar || [];
    const suportaInert = "inert" in HTMLElement.prototype;

    irmaos.forEach(function (el) {
      if (!el) return;
      if (suportaInert) el.inert = true;
      else el.setAttribute("aria-hidden", "true");
    });

    const alvoInicial = cfg.focoInicial || focaveis(container)[0] || container;
    // Um quadro de espera: o container acaba de sair de display:none.
    const idFoco = window.requestAnimationFrame(function () {
      if (alvoInicial && typeof alvoInicial.focus === "function") {
        alvoInicial.focus({ preventScroll: true });
      }
    });

    function aoTeclar(evento) {
      if (evento.key !== "Tab") return;
      const lista = focaveis(container);
      if (!lista.length) {
        evento.preventDefault();
        return;
      }
      const primeiro = lista[0];
      const ultimo = lista[lista.length - 1];
      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    }

    document.addEventListener("keydown", aoTeclar, true);

    return function destruir() {
      window.cancelAnimationFrame(idFoco);
      document.removeEventListener("keydown", aoTeclar, true);
      irmaos.forEach(function (el) {
        if (!el) return;
        if (suportaInert) el.inert = false;
        else el.removeAttribute("aria-hidden");
      });
      if (anterior && typeof anterior.focus === "function") {
        anterior.focus({ preventScroll: true });
      }
    };
  }

  /* ============================================================
     Bloqueio de rolagem
     ============================================================ */

  let profundidadeBloqueio = 0;

  /**
   * Bloqueia a rolagem do documento preservando a posição. Contabiliza
   * profundidade: se menu e painel abrirem juntos, o primeiro a fechar não
   * libera a rolagem do outro.
   */
  function bloquearRolagem() {
    profundidadeBloqueio += 1;
    if (profundidadeBloqueio > 1) {
      return function () {
        profundidadeBloqueio -= 1;
      };
    }
    const y = window.scrollY;
    const larguraBarra = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.classList.add("at-sem-rolagem");
    if (larguraBarra > 0) {
      document.documentElement.style.paddingRight = larguraBarra + "px";
    }
    return function destruir() {
      profundidadeBloqueio -= 1;
      if (profundidadeBloqueio > 0) return;
      document.documentElement.classList.remove("at-sem-rolagem");
      document.documentElement.style.paddingRight = "";
      window.scrollTo(0, y);
    };
  }

  /* ============================================================
     Região viva compartilhada
     ============================================================ */

  let regiaoViva = null;

  /**
   * Anuncia uma mensagem a leitores de tela. A referência tem regiões de
   * sucesso e erro de formulário sem aria-live: o envio não é anunciado.
   */
  function anunciar(mensagem, assertivo) {
    if (!regiaoViva) {
      regiaoViva = document.createElement("div");
      regiaoViva.className = "at-visualmente-oculto";
      regiaoViva.setAttribute("aria-live", "polite");
      regiaoViva.setAttribute("aria-atomic", "true");
      document.body.appendChild(regiaoViva);
    }
    regiaoViva.setAttribute("aria-live", assertivo ? "assertive" : "polite");
    // Limpar antes força o anúncio mesmo quando a mensagem se repete.
    regiaoViva.textContent = "";
    window.requestAnimationFrame(function () {
      regiaoViva.textContent = mensagem;
    });
  }

  /* ============================================================
     Ciclo de vida
     ============================================================ */

  /** Registra um módulo. `fn(raiz)` deve devolver destruir() ou undefined. */
  function registrar(nome, fn) {
    modulos.push({ nome: nome, fn: fn });
  }

  /**
   * Inicializa todos os módulos registrados. Idempotente: chamar duas vezes
   * destrói a instância anterior antes de recriar.
   */
  function iniciar(raiz) {
    destruir();
    const escopo = raiz || document;
    document.documentElement.classList.add("at-js");
    modulos.forEach(function (modulo) {
      try {
        const cancelar = modulo.fn(escopo);
        if (typeof cancelar === "function") canceladores.push(cancelar);
      } catch (erro) {
        // Um módulo quebrado não pode derrubar os outros: a página precisa
        // continuar navegável mesmo com uma primitiva com defeito.
        window.console.error("[Átrio] módulo “" + modulo.nome + "” falhou:", erro);
      }
    });
    return destruir;
  }

  /** Executa todos os canceladores acumulados. */
  function destruir() {
    canceladores.forEach(function (cancelar) {
      try {
        cancelar();
      } catch (erro) {
        window.console.error("[Átrio] falha ao destruir:", erro);
      }
    });
    canceladores = [];
  }

  Atrio.token = token;
  Atrio.paraMs = paraMs;
  Atrio.duracao = duracao;
  Atrio.limitar = limitar;
  Atrio.normalizar = normalizar;
  Atrio.distribuirStagger = distribuirStagger;
  Atrio.duracaoMarquee = duracaoMarquee;
  Atrio.movimentoReduzido = movimentoReduzido;
  Atrio.ponteiroFino = ponteiroFino;
  Atrio.fatiarPalavras = fatiarPalavras;
  Atrio.focaveis = focaveis;
  Atrio.prenderFoco = prenderFoco;
  Atrio.bloquearRolagem = bloquearRolagem;
  Atrio.anunciar = anunciar;
  Atrio.registrar = registrar;
  Atrio.iniciar = iniciar;
  Atrio.destruir = destruir;
  Atrio.SELETOR_FOCAVEL = SELETOR_FOCAVEL;

  window.Atrio = Atrio;

  // Também exportado para o test runner do Node, que carrega este arquivo
  // sem DOM para exercitar a camada pura.
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Atrio;
  }
})(
  typeof window !== "undefined" ? window : globalThis,
  typeof document !== "undefined"
    ? document
    : { documentElement: {}, createElement: function () {} }
);
