/**
 * Estratos — núcleo.
 *
 * Expõe o namespace, a leitura de tokens e o laço de animação compartilhado.
 * Um único requestAnimationFrame serve todo o sistema: cada efeito registra
 * uma função e recebe de volta um cancelador. Nada agenda rAF por conta.
 */
(function () {
  "use strict";

  const Estratos = {};

  /* ---------- Preferências do usuário ---------- */

  const consultaMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");

  /** @returns {boolean} true quando o usuário pediu menos movimento. */
  function movimentoReduzido() {
    return consultaMovimento.matches;
  }

  /**
   * Observa mudanças na preferência de movimento em tempo real.
   * @param {(reduzido: boolean) => void} aoMudar
   * @returns {() => void} cancelador
   */
  function observarMovimento(aoMudar) {
    const ouvinte = (evento) => aoMudar(evento.matches);
    consultaMovimento.addEventListener("change", ouvinte);
    return () => consultaMovimento.removeEventListener("change", ouvinte);
  }

  const consultaPonteiroFino = window.matchMedia("(hover: hover) and (pointer: fine)");

  function ponteiroFino() {
    return consultaPonteiroFino.matches;
  }

  /* ---------- Tokens ---------- */

  const cacheTokens = new Map();

  /**
   * Lê um token CSS (--es-*) já resolvido pelo navegador. Como tokens.css
   * troca os valores sob prefers-reduced-motion, o JS herda a substituição
   * sem precisar saber que ela existe.
   * @param {string} nome nome sem o prefixo `--es-`
   * @returns {string}
   */
  function token(nome) {
    if (cacheTokens.has(nome)) return cacheTokens.get(nome);
    const valor = getComputedStyle(document.documentElement)
      .getPropertyValue(`--es-${nome}`)
      .trim();
    cacheTokens.set(nome, valor);
    return valor;
  }

  /** Lê um token numérico, descartando a unidade. */
  function tokenNumero(nome, padrao) {
    const valor = parseFloat(token(nome));
    return Number.isFinite(valor) ? valor : padrao;
  }

  /** Invalida o cache — necessário se a preferência de movimento mudar. */
  function limparCacheTokens() {
    cacheTokens.clear();
  }

  observarMovimento(limparCacheTokens);

  /* ---------- Matemática de progresso ---------- */

  // Camada pura, carregada por matematica.js. Reexportada aqui por conveniência
  // para que os componentes tenham um único ponto de entrada.
  const mat = window.EstratosMatematica;

  /* ---------- Laço compartilhado ---------- */

  const inscritos = new Set();
  let quadro = 0;
  let ultimoTempo = 0;

  function tique(tempo) {
    const dt = ultimoTempo ? Math.min((tempo - ultimoTempo) / 1000, 0.1) : 0.016;
    ultimoTempo = tempo;
    for (const fn of inscritos) fn(dt, tempo);
    quadro = inscritos.size ? requestAnimationFrame(tique) : 0;
  }

  /**
   * Registra uma função no laço compartilhado.
   * @param {(dt: number, tempo: number) => void} fn
   * @returns {() => void} cancelador — sempre chame ao destruir o componente
   */
  function aCadaQuadro(fn) {
    inscritos.add(fn);
    if (!quadro) {
      ultimoTempo = 0;
      quadro = requestAnimationFrame(tique);
    }
    return () => {
      inscritos.delete(fn);
      if (!inscritos.size && quadro) {
        cancelAnimationFrame(quadro);
        quadro = 0;
      }
    };
  }

  /** Pausa o laço quando a aba sai de vista — evita trabalho invisível. */
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && quadro) {
      cancelAnimationFrame(quadro);
      quadro = 0;
    } else if (!document.hidden && inscritos.size && !quadro) {
      ultimoTempo = 0;
      quadro = requestAnimationFrame(tique);
    }
  });

  /* ---------- Exportação ---------- */

  Estratos.movimentoReduzido = movimentoReduzido;
  Estratos.observarMovimento = observarMovimento;
  Estratos.ponteiroFino = ponteiroFino;
  Estratos.token = token;
  Estratos.tokenNumero = tokenNumero;
  Estratos.limparCacheTokens = limparCacheTokens;
  Estratos.limitar = mat.limitar;
  Estratos.normalizar = mat.normalizar;
  Estratos.interpolar = mat.interpolar;
  Estratos.aproximar = mat.aproximar;
  Estratos.criarProgresso = mat.criarProgresso;
  Estratos.aCadaQuadro = aCadaQuadro;

  window.Estratos = Estratos;
})();
