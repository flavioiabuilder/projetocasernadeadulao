# Linguagem tridimensional — Friso

## Achado

- **0** elementos `<canvas>` da aplicação (P4, todas as posições do dry-run).
- Valores de `perspective` no CSSOM (ex.: 720px) e `matrix3d` leves (P1).
- Globais WebGL* na P3 inicial eram builtins do browser — **não** evidência de app WebGL.

### O canvas transitório e por que ele não conta

Uma varredura com passo de 0,5% registrou `canvasCount: 1` em 0,49–0,61
(`raw/p4-canvas-refine-b-1440x900.json`): canvas de viewport inteiro, 1440×900,
sem id nem classe. Não reproduziu em nenhuma outra execução — `bracket` cobriu
0,10–0,90 em passo de 1% (81 posições, e de novo com dwell de 500 ms) e achou
zero.

A sonda `canvas-origin` instrumenta `createElement` e `getContext` antes de
qualquer script da página e grava o stack de quem cria. Em 5 carregamentos
(`raw/canvas-origin-1440x900.json`): **5 com criação, 0 com canvas remanescente
no DOM**. O criador é terceiro, não a referência:

```
dsp-cdn.gammaplatform.com/static/js/cv/conv.js
  → createElement('canvas') + getContext('2d')
  → Se() → webGlBasics() → createElement('canvas') + getContext('webgl')
```

Um canvas 2d e um WebGL criados, lidos e descartados por script de DSP com
função nomeada `webGlBasics` — assinatura de **fingerprinting de canvas/WebGL**,
não de renderização de cena. A captura da `refine-b` pegou o elemento na janela
em que esteve anexado; é artefato de amostragem, não capítulo da experiência.

**Consequência para o modelo de duas camadas:** a camada canvas de Korowa é
vazia. A atmosfera é DOM/CSS/mídia sob GSAP + ScrollTrigger, e toda a
profundidade sai de `perspective`, camadas absolutas e parallax — medida no
CSSOM, procedência `declarado`. Nada aqui exige `medido-no-render`.

Friso não reproduz o script de terceiro nem o comportamento de fingerprinting.

## Decisão de reconstrução

Não introduzir Three.js/OGL. Profundidade = camadas absolutas + `perspective` + parallax + escala da atmosfera no pin. Documenta a *decisão* da referência (DOM-first) em vez de inventar uma cena WebGL.