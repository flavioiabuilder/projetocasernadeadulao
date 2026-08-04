# NARRATIVE-MAP — korowa-vic

> Sessões 1–2. Host: Playwright (MCP chrome-devtools indisponível).
> Refino 0,5% executado; multiviewport capturado.

## Fronteiras (P8 refine)

- 0.555 → 0.56 (ratio 0.615205)
- 0.01 → 0.015 (ratio 0.594147)
- 0.545 → 0.55 (ratio 0.587706)
- 0.14 → 0.145 (ratio 0.511396)
- 0.495 → 0.5 (ratio 0.507478)
- 0.575 → 0.58 (ratio 0.482109)
- 0.87 → 0.875 (ratio 0.481851)
- 0.54 → 0.545 (ratio 0.471677)
- 0.105 → 0.11 (ratio 0.456233)
- 0.885 → 0.89 (ratio 0.442383)

## Ordem narrativa

1. **Loader** — animação `movePreloader` 1.5s declarada (P1); UI completa do loader: parcial.
2. **Hero pin** (0–~20%) — headings persistem; atmosfera escura→carmesim (P8).
3. **Editorial sob pin / transição clara** (~15–50%) — creme/linho; MENU no chrome.
4. **Bloco mediano** (~50–60%) — pico de delta; superfícies névoa/azul.
5. **Percurso inferior → fecho** (~60–100%) — carmesim dominante no frame final (P8 f100).
6. **Nav overlay** — captura `states-1440x900/nav-open.png`.
7. **Reload** — {"scrollY":13612,"title":"Korowa Anglican Girls' School Melbourne","canvas":0,"gsap":true,"ScrollTrigger":true}.
8. **CPU 4×** — {"cpuThrottle":4,"loadMs":5228,"gsap":true}.

## Canvas / libs

- **canvas da aplicação: 0** — confirmado por três instrumentos independentes.
  - `bracket` 0,10–0,90 passo 1% (81 posições, com e sem dwell de 500 ms): zero.
  - `canvas-origin` (hook em `createElement`/`getContext` antes dos scripts da
    página, 5 cargas): 5 com criação, **0 com canvas remanescente no DOM**.
  - A ocorrência isolada em `p4-canvas-refine-b` (0,49–0,61) é de terceiro:
    `dsp-cdn.gammaplatform.com/.../conv.js` → `webGlBasics()` cria canvas 2d e
    WebGL e descarta. Fingerprinting, não cena. Ver
    `documentacao/three-dimensional-language.md`.
- EVIDÊNCIA de motion: `gsap`, `ScrollTrigger` (globais presentes).
- EVIDÊNCIA de plataforma: `cdn.prod.website-files.com` e
  `d3e54v103j8qbb.cloudfront.net` no grafo de rede → **Webflow**.
- 23 hosts distintos numa carga; maioria ad-tech (adsrvr, doubleclick, adnxs,
  rubicon, linkedin, facebook, gamma). Relevante para o PASSO 5 (custo) e para
  a fronteira de ativos: nada disso é reproduzido em Friso.
- Session2 items: 129

## Artefatos

- `auditoria/captures/refine-1440x900/`, `vp-*/`, `states-1440x900/`
- `auditoria/raw/p5|p6|p7-*.json`, `network-sample.json`
