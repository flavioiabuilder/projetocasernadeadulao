/**
 * Estratos — cena procedural.
 *
 * WebGL cru, sem engine. A referência usa Three.js r158 com um GLB e nove
 * texturas; aqui a mesma linguagem de profundidade (corpo mineral iluminado
 * sobre campo atmosférico, com horizonte luminoso) é gerada por shader, o que
 * elimina ativos licenciáveis e mantém o projeto sem dependências.
 *
 * Estratégias de desempenho herdadas da auditoria:
 *   — DPR limitado por token (--es-amb-dpr-maximo), medido em 2 na referência;
 *   — render sob demanda: o laço só roda quando a cena está visível;
 *   — contexto liberado explicitamente em destruir().
 */
(function () {
  "use strict";

  const E = window.Estratos;

  const VERTEX = `
    attribute vec2 posicao;
    void main() { gl_Position = vec4(posicao, 0.0, 1.0); }
  `;

  const FRAGMENT = `
    precision highp float;

    uniform vec2 uResolucao;
    uniform float uTempo;
    uniform float uProgresso;
    uniform vec2 uPonteiro;
    uniform vec3 uCorFundoA;
    uniform vec3 uCorFundoB;
    uniform vec3 uCorCorpo;
    uniform vec3 uCorLuz;

    // Ruído por valor + fBm: superfície mineral sem textura de arquivo.
    float aleatorio(vec3 p) {
      return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
    }

    float ruido(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float n000 = aleatorio(i);
      float n100 = aleatorio(i + vec3(1.0, 0.0, 0.0));
      float n010 = aleatorio(i + vec3(0.0, 1.0, 0.0));
      float n110 = aleatorio(i + vec3(1.0, 1.0, 0.0));
      float n001 = aleatorio(i + vec3(0.0, 0.0, 1.0));
      float n101 = aleatorio(i + vec3(1.0, 0.0, 1.0));
      float n011 = aleatorio(i + vec3(0.0, 1.0, 1.0));
      float n111 = aleatorio(i + vec3(1.0, 1.0, 1.0));
      return mix(
        mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
        mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y),
        f.z
      );
    }

    // 3 oitavas: medido como o ponto em que reduzir mais degrada a silhueta
    // sem ganho de quadro perceptível. Ver docs/design-system/three-dimensional-language.md.
    float fbm(vec3 p) {
      float soma = 0.0;
      float amp = 0.5;
      for (int i = 0; i < 3; i++) {
        soma += amp * ruido(p);
        p *= 2.17;
        amp *= 0.5;
      }
      return soma;
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uResolucao) / uResolucao.y;

      // Campo atmosférico
      float rampa = clamp(uv.y * 0.9 + 0.5, 0.0, 1.0);
      vec3 cor = mix(uCorFundoA, uCorFundoB, rampa);

      // Corpo mineral: esfera implícita deslocada pelo progresso
      vec2 centro = vec2(-0.28 + uProgresso * 0.1 + uPonteiro.x * 0.02, uPonteiro.y * 0.02);
      float raio = 0.62;
      vec2 d = uv - centro;
      float dist = length(d);

      if (dist < raio) {
        // Normal da esfera
        float z = sqrt(max(raio * raio - dist * dist, 0.0));
        vec3 normal = normalize(vec3(d, z));

        // Rotação lenta da textura procedural sobre a superfície
        float giro = uTempo * 0.03 + uProgresso * 1.4;
        vec3 amostra = vec3(
          normal.x * cos(giro) - normal.z * sin(giro),
          normal.y,
          normal.x * sin(giro) + normal.z * cos(giro)
        );

        // Uma única avaliação de fBm: a segunda passada de detalhe custava o
        // dobro do quadro e some sob a escala de render.
        float superficie = fbm(amostra * 4.0);

        vec3 luz = normalize(vec3(-0.45, 0.6, 0.75));
        float difusa = max(dot(normal, luz), 0.0);
        float rasante = pow(1.0 - max(dot(normal, vec3(0.0, 0.0, 1.0)), 0.0), 2.5);

        vec3 corCorpo = mix(uCorCorpo * 0.55, uCorCorpo * 1.25, superficie);
        corCorpo *= 0.35 + difusa * 0.9;
        corCorpo += uCorLuz * rasante * 0.35;

        float borda = smoothstep(raio, raio - 0.004, dist);
        cor = mix(cor, corCorpo, borda);
      }

      // Horizonte luminoso
      float linha = smoothstep(0.0035, 0.0, abs(uv.y + 0.16));
      float extensao = smoothstep(1.1, 0.0, abs(uv.x));
      cor += uCorLuz * linha * extensao * 0.85;

      // Vinheta
      float vinheta = smoothstep(1.25, 0.35, length(uv));
      cor *= mix(0.62, 1.0, vinheta);

      gl_FragColor = vec4(cor, 1.0);
    }
  `;

  /** Converte "#rrggbb" em [r, g, b] normalizado. */
  function hexParaRGB(hex) {
    const limpo = hex.trim().replace("#", "");
    const n = parseInt(
      limpo.length === 3
        ? limpo
            .split("")
            .map((c) => c + c)
            .join("")
        : limpo,
      16
    );
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }

  function compilar(gl, tipo, fonte) {
    const shader = gl.createShader(tipo);
    gl.shaderSource(shader, fonte);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const erro = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Falha ao compilar shader: ${erro}`);
    }
    return shader;
  }

  /**
   * Monta a cena numa canvas. Devolve null se WebGL não estiver disponível,
   * cabendo ao chamador exibir a alternativa em CSS.
   *
   * @param {HTMLCanvasElement} canvas
   * @returns {{ definirProgresso: (p:number)=>void, destruir: ()=>void } | null}
   */
  function criarCena(canvas) {
    let gl;
    try {
      gl =
        canvas.getContext("webgl", { antialias: false, alpha: false }) ||
        canvas.getContext("experimental-webgl", { antialias: false, alpha: false });
    } catch {
      gl = null;
    }
    if (!gl) return null;

    let programa;
    try {
      const vs = compilar(gl, gl.VERTEX_SHADER, VERTEX);
      const fs = compilar(gl, gl.FRAGMENT_SHADER, FRAGMENT);
      programa = gl.createProgram();
      gl.attachShader(programa, vs);
      gl.attachShader(programa, fs);
      gl.linkProgram(programa);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (!gl.getProgramParameter(programa, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(programa));
      }
    } catch {
      // Shader não compilou ou não linkou: o chamador exibe a alternativa CSS.
      return null;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    const attrPosicao = gl.getAttribLocation(programa, "posicao");
    const uni = {
      resolucao: gl.getUniformLocation(programa, "uResolucao"),
      tempo: gl.getUniformLocation(programa, "uTempo"),
      progresso: gl.getUniformLocation(programa, "uProgresso"),
      ponteiro: gl.getUniformLocation(programa, "uPonteiro"),
      corFundoA: gl.getUniformLocation(programa, "uCorFundoA"),
      corFundoB: gl.getUniformLocation(programa, "uCorFundoB"),
      corCorpo: gl.getUniformLocation(programa, "uCorCorpo"),
      corLuz: gl.getUniformLocation(programa, "uCorLuz"),
    };

    // As cores da cena vêm dos mesmos tokens que o CSS consome.
    const paleta = {
      fundoA: hexParaRGB(E.token("cor-mineral") || "#24333c"),
      fundoB: hexParaRGB(E.token("cor-bruma") || "#a9bcc0"),
      corpo: hexParaRGB(E.token("cor-limo") || "#6b7f86"),
      luz: hexParaRGB(E.token("cor-brasa-clara") || "#e8b177"),
    };

    const dprMaximo = E.tokenNumero("amb-dpr-maximo", 2);
    // A cena é um campo de gradiente suave: renderizar abaixo da resolução
    // nativa e deixar o navegador escalar é invisível e corta ~64% dos pixels.
    const escalaRender = E.tokenNumero("amb-escala-render", 0.6);
    let progressoAlvo = 0;
    let progresso = 0;
    let ponteiroX = 0;
    let ponteiroY = 0;
    let tempo = 0;
    const reduzido = E.movimentoReduzido();

    function redimensionar() {
      const dpr = Math.min(window.devicePixelRatio || 1, dprMaximo) * escalaRender;
      const largura = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const altura = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== largura || canvas.height !== altura) {
        canvas.width = largura;
        canvas.height = altura;
        gl.viewport(0, 0, largura, altura);
      }
    }

    function desenhar(dt) {
      redimensionar();
      if (!reduzido) tempo += dt;
      progresso = E.aproximar(progresso, progressoAlvo, 0.06, dt);

      gl.useProgram(programa);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(attrPosicao);
      gl.vertexAttribPointer(attrPosicao, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(uni.resolucao, canvas.width, canvas.height);
      gl.uniform1f(uni.tempo, tempo);
      gl.uniform1f(uni.progresso, progresso);
      gl.uniform2f(uni.ponteiro, ponteiroX, ponteiroY);
      gl.uniform3fv(uni.corFundoA, paleta.fundoA);
      gl.uniform3fv(uni.corFundoB, paleta.fundoB);
      gl.uniform3fv(uni.corCorpo, paleta.corpo);
      gl.uniform3fv(uni.corLuz, paleta.luz);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    const aoMover = (evento) => {
      if (reduzido) return;
      ponteiroX = (evento.clientX / window.innerWidth - 0.5) * 2;
      ponteiroY = (evento.clientY / window.innerHeight - 0.5) * -2;
    };

    if (E.ponteiroFino()) {
      window.addEventListener("pointermove", aoMover, { passive: true });
    }

    // Só anima enquanto a canvas estiver em vista.
    let pararLaco = null;
    const iniciar = () => {
      if (!pararLaco) pararLaco = E.aCadaQuadro(desenhar);
    };
    const parar = () => {
      if (pararLaco) {
        pararLaco();
        pararLaco = null;
      }
    };

    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas[0].isIntersecting) iniciar();
        else parar();
      },
      { threshold: 0 }
    );
    observador.observe(canvas);

    return {
      definirProgresso(p) {
        progressoAlvo = E.limitar(p, 0, 1);
      },
      destruir() {
        parar();
        observador.disconnect();
        window.removeEventListener("pointermove", aoMover);
        gl.deleteBuffer(buffer);
        gl.deleteProgram(programa);
        const perder = gl.getExtension("WEBGL_lose_context");
        if (perder) perder.loseContext();
      },
    };
  }

  E.criarCena = criarCena;
})();
