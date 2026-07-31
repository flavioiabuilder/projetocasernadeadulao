/**
 * Estratos — matemática de percurso.
 *
 * Camada deliberadamente pura: nenhuma referência a window, document ou timer.
 * É o "cálculo de progresso" da separação de responsabilidades descrita em
 * docs/design-system/motion-system.md, e é o que permite testar a lógica de
 * navegação sem navegador.
 *
 * Funciona como script no navegador (define globalThis.EstratosMatematica) e
 * como módulo CommonJS no Node (module.exports).
 */
(function (raiz) {
  "use strict";

  function limitar(valor, minimo, maximo) {
    return Math.min(maximo, Math.max(minimo, valor));
  }

  /** Normaliza `valor` no intervalo [inicio, fim] para 0..1, saturando fora dele. */
  function normalizar(valor, inicio, fim) {
    if (fim === inicio) return 0;
    return limitar((valor - inicio) / (fim - inicio), 0, 1);
  }

  function interpolar(de, para, t) {
    return de + (para - de) * t;
  }

  /**
   * Aproximação exponencial independente de framerate: a mesma sensação a
   * 60Hz e a 144Hz.
   * @param {number} atual
   * @param {number} alvo
   * @param {number} suavidade 0..1 — quanto maior, mais rápido alcança
   * @param {number} dt segundos desde o quadro anterior
   */
  function aproximar(atual, alvo, suavidade, dt) {
    return interpolar(atual, alvo, 1 - Math.pow(1 - suavidade, dt * 60));
  }

  /**
   * Estado de progresso de uma sequência discreta de cenas.
   * Não toca no DOM: quem renderiza decide o que fazer com o estado.
   * @param {number} total
   */
  function criarProgresso(total) {
    let indice = 0;
    let fracao = 0;

    return {
      get indice() {
        return indice;
      },
      get total() {
        return total;
      },
      /** Progresso global 0..1, contando a fração dentro da cena atual. */
      get global() {
        if (total <= 1) return 0;
        return limitar((indice + fracao) / (total - 1), 0, 1);
      },
      /** @returns {boolean} true se o índice mudou de fato. */
      definir(novo) {
        const anterior = indice;
        indice = limitar(novo, 0, total - 1);
        fracao = 0;
        return indice !== anterior;
      },
      definirFracao(f) {
        fracao = limitar(f, 0, 1);
      },
      noInicio() {
        return indice === 0;
      },
      noFim() {
        return indice === total - 1;
      },
    };
  }

  const api = { limitar, normalizar, interpolar, aproximar, criarProgresso };

  raiz.EstratosMatematica = api;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
