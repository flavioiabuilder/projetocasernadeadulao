/**
 * Átrio — formulários demonstrativos.
 *
 * REGRA ABSOLUTA DESTE ARQUIVO: nada sai do navegador.
 *
 * O submit é sempre interceptado; não há fetch, XHR, sendBeacon, WebSocket,
 * form.submit() nem endpoint algum. O estado de sucesso é simulado e
 * rotulado como demonstração na própria interface.
 *
 * Correções em relação à referência (ver forms-and-conversion-patterns.md):
 *   - todo campo tem <label> visível, não só placeholder;
 *   - erro é ligado ao campo por aria-describedby e aria-invalid;
 *   - o foco vai para o primeiro campo inválido;
 *   - sucesso e erro são anunciados por região viva;
 *   - o consentimento é obrigatório e explicado antes do botão.
 */
(function (window, document) {
  "use strict";

  // `|| {}` cobre o carregamento isolado sob Node, onde main.js pode não
  // ter sido avaliado ainda. No navegador main.js sempre vem antes.
  const A = window.Atrio || {};
  const forms = {};

  /* ============================================================
     Validação (pura — coberta por teste unitário)
     ============================================================ */

  /**
   * Valida um conjunto de valores contra um conjunto de regras simples.
   * Recebe e devolve dados; não toca no DOM. Isso é o que torna a regra
   * testável sem navegador e reutilizável fora deste componente.
   *
   * @param {Object} valores  { nome: valor }
   * @param {Object} regras   { nome: { obrigatorio, tipo, minimo, rotulo } }
   * @returns {Object} { valido, erros: { nome: mensagem } }
   */
  function validar(valores, regras) {
    const erros = {};
    Object.keys(regras).forEach(function (campo) {
      const regra = regras[campo];
      const bruto = valores[campo];
      const valor = typeof bruto === "string" ? bruto.trim() : bruto;
      const rotulo = regra.rotulo || campo;

      if (regra.obrigatorio) {
        const vazio =
          valor === undefined || valor === null || valor === "" || valor === false;
        if (vazio) {
          erros[campo] =
            regra.tipo === "consentimento"
              ? "É preciso aceitar para continuar."
              : rotulo + " é obrigatório.";
          return;
        }
      }

      if (!valor) return;

      if (regra.tipo === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor)) {
        erros[campo] = "Informe um e-mail válido.";
        return;
      }

      if (regra.minimo && String(valor).length < regra.minimo) {
        erros[campo] = rotulo + " precisa de pelo menos " + regra.minimo + " caracteres.";
      }
    });

    return { valido: Object.keys(erros).length === 0, erros: erros };
  }

  /** Extrai os valores de um <form> como objeto simples. */
  function lerValores(formulario) {
    const valores = {};
    Array.prototype.forEach.call(formulario.elements, function (campo) {
      if (!campo.name) return;
      valores[campo.name] = campo.type === "checkbox" ? campo.checked : campo.value;
    });
    return valores;
  }

  /** Lê as regras declaradas nos próprios campos, via atributos. */
  function lerRegras(formulario) {
    const regras = {};
    Array.prototype.forEach.call(formulario.elements, function (campo) {
      if (!campo.name || campo.type === "submit") return;
      const rotuloEl = formulario.querySelector('label[for="' + campo.id + '"]');
      regras[campo.name] = {
        obrigatorio: campo.required,
        tipo:
          campo.type === "checkbox"
            ? "consentimento"
            : campo.type === "email"
              ? "email"
              : "texto",
        minimo: campo.minLength > 0 ? campo.minLength : 0,
        rotulo: rotuloEl ? rotuloEl.textContent.replace(/\s+/g, " ").trim() : campo.name,
      };
    });
    return regras;
  }

  /* ============================================================
     Ligação com o DOM
     ============================================================ */

  function criarFormulario(formulario) {
    const feedback = formulario.querySelector("[data-form-feedback]");
    const campos = Array.prototype.filter.call(formulario.elements, function (c) {
      return c.name && c.type !== "submit";
    });

    function idDoErro(campo) {
      return (formulario.id || "form") + "-erro-" + campo.name;
    }

    function limparErros() {
      campos.forEach(function (campo) {
        campo.removeAttribute("aria-invalid");
        const alvo = document.getElementById(idDoErro(campo));
        if (alvo) {
          alvo.textContent = "";
          alvo.hidden = true;
        }
        const descrito = (campo.getAttribute("aria-describedby") || "")
          .split(/\s+/)
          .filter(function (id) {
            return id && id !== idDoErro(campo);
          });
        if (descrito.length) campo.setAttribute("aria-describedby", descrito.join(" "));
        else campo.removeAttribute("aria-describedby");
      });
      if (feedback) {
        feedback.hidden = true;
        feedback.textContent = "";
        feedback.className = "at-feedback";
      }
    }

    function mostrarErros(erros) {
      let primeiroInvalido = null;
      campos.forEach(function (campo) {
        const mensagem = erros[campo.name];
        if (!mensagem) return;
        if (!primeiroInvalido) primeiroInvalido = campo;
        campo.setAttribute("aria-invalid", "true");
        const alvo = document.getElementById(idDoErro(campo));
        if (alvo) {
          alvo.textContent = mensagem;
          alvo.hidden = false;
        }
        const descrito = (campo.getAttribute("aria-describedby") || "").split(/\s+/);
        if (descrito.indexOf(idDoErro(campo)) === -1) {
          descrito.push(idDoErro(campo));
        }
        campo.setAttribute(
          "aria-describedby",
          descrito
            .filter(function (id) {
              return id;
            })
            .join(" ")
        );
      });

      const quantidade = Object.keys(erros).length;
      const resumo =
        quantidade === 1
          ? "1 campo precisa de atenção."
          : quantidade + " campos precisam de atenção.";

      if (feedback) {
        feedback.className = "at-feedback at-feedback--erro";
        feedback.textContent = resumo;
        feedback.hidden = false;
      }
      A.anunciar(resumo, true);

      if (primeiroInvalido) primeiroInvalido.focus({ preventScroll: false });
    }

    function mostrarSucesso() {
      const mensagem =
        "Demonstração: nenhum dado foi enviado. Este formulário funciona apenas " +
        "no seu navegador.";
      if (feedback) {
        feedback.className = "at-feedback at-feedback--sucesso";
        feedback.textContent = mensagem;
        feedback.hidden = false;
      }
      A.anunciar(mensagem, true);
      formulario.reset();
    }

    function aoEnviar(evento) {
      // Interceptação incondicional: mesmo que a validação passe, nada é
      // transmitido. O preventDefault vem antes de qualquer outra coisa.
      evento.preventDefault();
      limparErros();
      const resultado = validar(lerValores(formulario), lerRegras(formulario));
      if (resultado.valido) mostrarSucesso();
      else mostrarErros(resultado.erros);
    }

    function aoCorrigir(evento) {
      const campo = evento.target;
      if (campo.getAttribute("aria-invalid") !== "true") return;
      const parcial = {};
      const regras = lerRegras(formulario);
      parcial[campo.name] = campo.type === "checkbox" ? campo.checked : campo.value;
      const soEste = {};
      soEste[campo.name] = regras[campo.name];
      if (validar(parcial, soEste).valido) {
        campo.removeAttribute("aria-invalid");
        const alvo = document.getElementById(idDoErro(campo));
        if (alvo) {
          alvo.textContent = "";
          alvo.hidden = true;
        }
      }
    }

    formulario.setAttribute("novalidate", "novalidate");
    formulario.addEventListener("submit", aoEnviar);
    formulario.addEventListener("input", aoCorrigir);
    formulario.addEventListener("change", aoCorrigir);

    return function destruir() {
      formulario.removeEventListener("submit", aoEnviar);
      formulario.removeEventListener("input", aoCorrigir);
      formulario.removeEventListener("change", aoCorrigir);
      limparErros();
    };
  }

  forms.validar = validar;
  forms.lerValores = lerValores;
  forms.lerRegras = lerRegras;
  forms.criarFormulario = criarFormulario;

  A.forms = forms;

  // Sob Node (test runner) não há DOM para registrar: só a camada pura
  // interessa, e ela já está exportada abaixo.
  if (typeof A.registrar === "function") {
    A.registrar("forms", function (raiz) {
      const cancelar = [];
      raiz.querySelectorAll("[data-form-local]").forEach(function (formulario) {
        cancelar.push(criarFormulario(formulario));
      });
      return function destruir() {
        cancelar.forEach(function (fn) {
          fn();
        });
      };
    });
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = forms;
  }
})(
  typeof window !== "undefined" ? window : globalThis,
  typeof document !== "undefined" ? document : {}
);
