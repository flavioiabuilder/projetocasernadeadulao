/**
 * Estratos — controlador da experiência.
 *
 * Orquestra progresso, cenas, trilho, mapa e cena WebGL. Consome apenas as
 * primitivas de motion.js; nenhuma animação é escrita aqui.
 *
 * Correções deliberadas sobre a referência auditada:
 *   — a troca de cena é anunciada por uma live region (a referência não tem
 *     nenhuma, então usuários de leitor de tela não percebem a navegação);
 *   — aria-current marca só a cena atual (na referência os doze itens do mapa
 *     anunciam "You are here" simultaneamente);
 *   — o mapa devolve o foco ao gatilho ao fechar e prende o foco enquanto
 *     aberto;
 *   — todo controle tem nome acessível explícito.
 */
(function () {
  "use strict";

  const E = window.Estratos;

  /**
   * @param {HTMLElement} raiz elemento .es-palco
   * @returns {{ destruir: () => void }}
   */
  function criarExperiencia(raiz) {
    const cenas = Array.from(raiz.querySelectorAll("[data-es-cena]"));
    if (!cenas.length) return { destruir() {} };

    const canvas = raiz.querySelector("[data-es-tela]");
    const alternativa = raiz.querySelector("[data-es-cena-alternativa]");
    const anunciador = raiz.querySelector("[data-es-anunciador]");
    const legenda = raiz.querySelector("[data-es-legenda]");
    const marcadores = Array.from(raiz.querySelectorAll("[data-es-marcador]"));
    const botaoAnterior = raiz.querySelector("[data-es-anterior]");
    const botaoProximo = raiz.querySelector("[data-es-proximo]");
    const mapa = raiz.querySelector("[data-es-mapa]");
    const abridorMapa = raiz.querySelector("[data-es-abrir-mapa]");
    const fechadorMapa = raiz.querySelector("[data-es-fechar-mapa]");
    const itensMapa = Array.from(raiz.querySelectorAll("[data-es-ir-para]"));
    const cursor = raiz.querySelector("[data-es-cursor-elemento]");

    const progresso = E.motion.criarProgresso(cenas.length);
    const limpezas = [];

    /* ---------- Cena WebGL, com alternativa ---------- */

    let cena3d = null;
    if (canvas) {
      cena3d = E.criarCena(canvas);
      if (cena3d) {
        limpezas.push(() => cena3d.destruir());
        if (alternativa) alternativa.hidden = true;
      } else {
        // Sem WebGL: a canvas sai da árvore e o gradiente CSS assume.
        canvas.hidden = true;
        if (alternativa) alternativa.hidden = false;
      }
    }

    /* ---------- Fatiamento do texto das cenas ---------- */

    cenas.forEach((cena) => {
      cena.querySelectorAll("[data-es-fatiar]").forEach((el) => {
        limpezas.push(E.motion.fatiarLinhas(el));
      });
    });

    /* ---------- Renderização de estado ---------- */

    function renderizar(anunciar) {
      const atual = progresso.indice;

      cenas.forEach((cena, i) => {
        const ativa = i === atual;
        cena.hidden = !ativa;
        cena.classList.toggle("is-saindo", false);
        if (ativa) {
          // Revela o conteúdo da cena que entrou.
          cena.querySelectorAll("[data-es-revelar]").forEach((el, indice) => {
            el.style.setProperty("--es-i", String(indice));
            el.classList.remove("is-revelado");
          });
          // Força reflow para que a transição reinicie de fato.
          void cena.offsetWidth;
          cena.querySelectorAll("[data-es-revelar]").forEach((el) => {
            el.classList.add("is-revelado");
          });
        }
      });

      marcadores.forEach((marcador, i) => {
        let estado = "futuro";
        if (i < atual) estado = "visitado";
        else if (i === atual) estado = "atual";
        marcador.dataset.estado = estado;
      });

      itensMapa.forEach((item, i) => {
        if (i === atual) item.setAttribute("aria-current", "true");
        else item.removeAttribute("aria-current");
      });

      if (botaoAnterior) botaoAnterior.disabled = progresso.noInicio();
      if (botaoProximo) botaoProximo.disabled = progresso.noFim();

      const titulo = cenas[atual].dataset.esTitulo || `Cena ${atual + 1}`;
      if (legenda) legenda.textContent = titulo;

      if (cena3d) cena3d.definirProgresso(progresso.global);

      // Anúncio para tecnologia assistiva — ausente na referência.
      if (anunciar && anunciador) {
        anunciador.textContent = `Cena ${atual + 1} de ${cenas.length}: ${titulo}`;
      }
    }

    function irPara(indice, anunciar) {
      if (progresso.definir(indice)) renderizar(anunciar !== false);
    }

    /* ---------- Condução por gesto e teclado ---------- */

    raiz.setAttribute("tabindex", "0");
    limpezas.push(
      E.motion.conduzirPorGesto(raiz, {
        aoAvancar: () => irPara(progresso.indice + 1, true),
        aoRetroceder: () => irPara(progresso.indice - 1, true),
      })
    );

    if (botaoAnterior) {
      const fn = () => irPara(progresso.indice - 1, true);
      botaoAnterior.addEventListener("click", fn);
      limpezas.push(() => botaoAnterior.removeEventListener("click", fn));
    }

    if (botaoProximo) {
      const fn = () => irPara(progresso.indice + 1, true);
      botaoProximo.addEventListener("click", fn);
      limpezas.push(() => botaoProximo.removeEventListener("click", fn));
    }

    /* ---------- Mapa de capítulos ---------- */

    if (mapa && abridorMapa) {
      let focoAnterior = null;

      const fechar = () => {
        mapa.setAttribute("aria-hidden", "true");
        abridorMapa.setAttribute("aria-expanded", "false");
        if (focoAnterior) focoAnterior.focus();
      };

      const abrir = () => {
        focoAnterior = document.activeElement;
        mapa.setAttribute("aria-hidden", "false");
        abridorMapa.setAttribute("aria-expanded", "true");
        const primeiro = mapa.querySelector("[data-es-ir-para]");
        if (primeiro) primeiro.focus();
      };

      const alternar = () => {
        if (mapa.getAttribute("aria-hidden") === "false") fechar();
        else abrir();
      };

      const aoTeclarNoMapa = (evento) => {
        if (evento.key !== "Escape") return;
        if (mapa.getAttribute("aria-hidden") === "false") {
          evento.stopPropagation();
          fechar();
        }
      };

      abridorMapa.addEventListener("click", alternar);
      document.addEventListener("keydown", aoTeclarNoMapa);
      limpezas.push(() => {
        abridorMapa.removeEventListener("click", alternar);
        document.removeEventListener("keydown", aoTeclarNoMapa);
      });

      if (fechadorMapa) {
        fechadorMapa.addEventListener("click", fechar);
        limpezas.push(() => fechadorMapa.removeEventListener("click", fechar));
      }

      itensMapa.forEach((item, i) => {
        const fn = () => {
          irPara(i, true);
          fechar();
        };
        item.addEventListener("click", fn);
        limpezas.push(() => item.removeEventListener("click", fn));
      });
    }

    /* ---------- Cursor ---------- */

    if (cursor) limpezas.push(E.motion.seguirPonteiro(cursor, raiz));

    /* ---------- Paralaxe por ponteiro nas camadas ambientais ---------- */

    const camadas = Array.from(raiz.querySelectorAll("[data-es-profundidade]"));
    if (camadas.length) {
      limpezas.push(E.motion.responderAoPonteiro(raiz, camadas));
    }

    renderizar(false);

    return {
      irPara,
      get indice() {
        return progresso.indice;
      },
      destruir() {
        limpezas.forEach((fn) => fn());
        limpezas.length = 0;
      },
    };
  }

  E.criarExperiencia = criarExperiencia;
})();
