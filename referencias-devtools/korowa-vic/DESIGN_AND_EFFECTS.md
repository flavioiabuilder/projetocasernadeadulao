# Design & Effects — Friso (handover)

Documento de handover da reconstrução **Friso**, feita a partir da auditoria de
`korowa-vic` (ver [`README.md`](README.md) para o mapa de pastas e as
fronteiras de ativos). Este arquivo explica **como a física das animações foi
parametrizada**, para que você consiga ajustar valores no futuro sem precisar
remedir nada.

Não é um clone: nenhum logo, copy ou fotografia real da referência entra aqui
— ver [`documentacao/asset-and-license-boundaries.md`](documentacao/asset-and-license-boundaries.md).
O que foi reproduzido com precisão é o **sistema de movimento** (timing,
curvas de easing, arquitetura de scroll) medido ao vivo na página real.

## De onde vêm os números

Três sessões de auditoria, duas fontes de medição:

| Sessão | Host | O que mediu |
| --- | --- | --- |
| 1–2 | Playwright (MCP indisponível) | Cascata CSS, tipografia, cores, contagem de canvas, nomes de `@keyframes` (sem corpo) |
| 3 (P9–P13) | **MCP chrome-devtools ao vivo** | `gsap`/`ScrollTrigger` em runtime, corpo completo dos `@keyframes`, curvas `cubic-bezier` reais, `scrub` real, composição do hero (P12), parallax por cursor (P13) |

Evidência bruta em `auditoria/raw/p9-gsap-live-*.json` (motion),
`p12-hero-visual-*.json` (composição de imagem) e
`p13-cursor-parallax-*.json` (parallax por cursor). Qualquer número citado
abaixo pode ser conferido lá.

## As curvas de easing (tokens)

Ficam em `design-system/tokens/tokens.json` → grupo `easing`, geradas para
`design-system/css/tokens.css` como `--fr-ease-*`. Não edite `tokens.css` a
mão — edite `tokens.json` e rode:

```bash
node referencias-devtools/korowa-vic/ferramentas/gerar-tokens.js
```

| Token | Valor | Papel | Onde foi medido na referência |
| --- | --- | --- | --- |
| `--fr-ease-assinatura` | `cubic-bezier(.491,.153,.094,.884)` | **Curva de identidade do sistema** — reutilize para qualquer efeito de "destaque com peso" | `--animation--ease`, custom property global reutilizada em hover de botão, `grid-template-rows` de card e highlight de texto |
| `--fr-ease-entrada` | `cubic-bezier(0.19,1,0.22,1)` | Entradas de UI rápidas (ease-out-expo) | `.button_icon-wrapper` hover, 0.4s |
| `--fr-ease-saida` | `cubic-bezier(0.165,0.84,0.44,1)` | Saídas/transforms de navegação | `.section_navbar` transform, 0.35s |
| `--fr-ease-enfase` | `cubic-bezier(0.215,0.61,0.355,1)` | Reveals grandes e lentos (0.75s) | `.button_content-wrapper`, `.navbar_cta-content-wrapper` |
| `--fr-ease-impulso` | `cubic-bezier(0.696,0.257,0,1.012)` | Hover com leve *overshoot* (y > 1 no 2º ponto de controle) | `.mini-video-card_thumb` hover, 0.3s |
| `--fr-ease-revelacao-lenta` | `cubic-bezier(0.785,0.135,0.15,0.86)` | Revelação lenta e pesada (0.5s) | `.statement_highlight-image-wrap` |

**Como ajustar**: se quiser uma curva mais "seca" ou mais "elástica", mexa no
segundo e quarto números do `cubic-bezier` (controlam a velocidade de saída).
Valores do 2º/4º parâmetro acima de 1 (como no `impulso`, `1.012`) produzem
overshoot — o elemento passa levemente do alvo antes de assentar. Cole o
`cubic-bezier(...)` em [cubic-bezier.com](https://cubic-bezier.com) para
visualizar antes de trocar o token.

Durações correspondentes: `--fr-dur-enfase` (0.75s), `--fr-dur-revelacao`
(0.5s), `--fr-dur-impulso` (0.3s), além das genéricas `--fr-dur-rapida` (0.2s),
`--fr-dur-media` (0.35s), `--fr-dur-lenta` (0.4s).

## A física do scroll (a parte que não é só CSS)

A referência usa GSAP `ScrollTrigger` com `scrub: 0.8` em duas seções
(`section_hero-special`, `steps-stagger_component`). **`scrub` não é um
multiplicador de velocidade — é uma constante de tempo de suavização
exponencial.** A cada frame, a timeline persegue a posição de scroll, sem
nunca ser 1:1 instantânea. Se você soltar o mouse do scroll, a animação
continua se movendo por um instante até alcançar o alvo.

Isso está implementado em `design-system/js/motion.js`, função
`createScrollLag(lagSeconds)`:

```js
value += (target - value) * (1 - Math.exp(-dt / lagSeconds));
```

- `dt` é o tempo real desde o último frame (não um incremento fixo) — o
  resultado é o mesmo em 30fps ou 144fps.
- `lagSeconds` vem do token `--fr-scroll-lag-segundos` (0.8, medido). Para
  deixar o pin "mais grudado" no scroll, **diminua** esse número (ex.: 0.3 =
  quase instantâneo). Para um efeito mais "flutuante", **aumente** (ex.: 1.5).
- Está aplicado em `bindPinProgress()` — o pin de hero da Friso é o análogo
  direto de `section_hero-special`.
- A rail de progresso (`data-fr-progress`) e o parallax (`data-fr-parallax`)
  ficam **fora** desse lag de propósito: são 1:1 com o scroll. A rail é
  invenção própria da Friso; o parallax é o análogo de
  `cloud-scroll_side-image-parallax`, que na referência roda via
  `animation-timeline` nativa do CSS (scroll-linked, sem lag de JS).
- `prefers-reduced-motion: reduce` desliga o lag por completo — o valor salta
  direto ao alvo (ver `REDUCE` em `motion.js`).

## HeroVisualComposite — a sobreposição de duas fotos

O hero da referência empilha duas fotos no mesmo espaço (`.hero-special_bg-visual-wrapper`):
uma de trás (`is-back`, opaca, preenche tudo) e uma de frente (`is-front`,
com canal alfa próprio — confirmado no header `VP8X` do arquivo, sem
`mask-image`/`mix-blend-mode` em CSS). O sujeito da foto de cima aparece
recortado sobre a de baixo porque a transparência já vem **pronta no
arquivo de imagem**, não é calculada em runtime.

Reconstruído em `.fr-hero-visual` (`components.css`) com a mesma estrutura —
wrapper `scale(1.02)` + `overflow:clip`, camadas `scale(1.1)` +
`object-fit:cover` — usando fotos do próprio projeto
(`img/hero-back.webp`, `img/hero-front.webp`; ver
`documentacao/asset-and-license-boundaries.md`). Qualquer par de fotos
funciona, desde que a de cima tenha fundo transparente (não branco) ao
redor do sujeito — do contrário ela cobre a de baixo por completo.

## A física do cursor (o efeito que faltava)

As duas camadas do `.fr-hero-visual` também se deslocam sutilmente na
direção **oposta** ao cursor, proporcional à distância até o centro da tela —
um "olhar através da janela" clássico. Medido com `dispatchEvent` de
`mousemove` real na referência (`auditoria/raw/p13-cursor-parallax-1440x900.json`):

- **Câmera única, duas profundidades**: a camada de trás sempre se move
  **exatamente 2×** mais que a de frente. Isso é o que cria a sensação de
  profundidade — quanto "mais longe" a camada, mais ela se move em relação ao
  ponto de vista.
- **Amplitude pequena**: ~6.8px na horizontal, ~3.2px na vertical, na borda
  extrema do viewport. É um efeito sutil, não um tilt agressivo.
- **Resposta rápida**: suaviza em ~20-25ms (contra 0.8s do scrub de scroll).
  Faz sentido — resposta ao cursor precisa parecer imediata, resposta ao
  scroll pode ter um "peso" cinematográfico.

Implementado em `bindCursorParallax()` (`motion.js`), reaproveitando a
**mesma função** `createScrollLag()` do scrub de scroll, só que instanciada
com `lagSeconds = 0.08` (token `--fr-cursor-lag-segundos`) em vez de `0.8`.
Essa é a ideia central deste documento: a física de "perseguir um alvo com
suavização exponencial" é uma primitiva única, reusada com constantes de
tempo diferentes para efeitos com "peso" diferente.

**Para ajustar**: `--fr-cursor-amp-frente-x` / `--fr-cursor-amp-frente-y`
controlam a distância percorrida; `--fr-cursor-lag-segundos` controla o
quão "grudado" o movimento fica no cursor (menor = mais imediato). O
multiplicador da camada de trás é fixo em `data-fr-cursor-parallax="2"` no
HTML — para uma 3ª camada mais distante ainda, use `"3"` ou mais.

O efeito só ativa com `(hover: hover) and (pointer: fine)` (não em touch) e
respeita `prefers-reduced-motion` — nenhuma das duas coisas é medida na
referência, são decisões próprias da Friso.

## As 9 `@keyframes` da referência → análogos na Friso

Nenhum nome ou seletor da referência foi copiado; os *timings e formas de
curva* foram. Tabela de correspondência:

| `@keyframes` da referência | Análogo Friso | Arquivo |
| --- | --- | --- |
| `movePreloader` (`height: 0%`) | `.fr-loader__curtain` + `fr-loader-wipe` | `motion.css` |
| `scaleLogo` (`scale(0.8)`) | `.fr-brand-mark` + `[data-fr-scrolled="true"]` | `motion.css` + `bindHeaderShrink()` em `motion.js` |
| `parallaxMove` (`translate` por scroll) | `data-fr-parallax` (já existia; `bindParallax()`) | `motion.js` |
| `cloud-scroll_center-image-scale-in` | `.fr-media-stage__center` (scale 0.3→1, height 80%→100%) | `motion.css` |
| `cloud-scroll_side-image-parallax` | `.fr-media-stage__side` (translate no reveal) | `motion.css` |
| `cloud-scroll_show-overlay` | `.fr-media-stage__overlay` (opacity 0→1) | `motion.css` |
| `text-gradient-color-fill`, `spin`, `show-hide` | Não reconstruídos — sem componente correspondente na Friso ainda | — |

`.fr-media-stage` é disparado pelo observer de reveal já existente
(`data-fr-reveal` → classe `is-in`), visível na seção "Profundidade" de
`design-system/demo.html`.

## Onde ver funcionando

```bash
npx serve -l 4173 .
```

- `design-system/demo.html` — pin hero com `.fr-hero-visual` (2 fotos + parallax
  por cursor + lag de scroll no véu), header com marca que encolhe ao rolar,
  loader com cortina, `fr-media-stage` na seção "Profundidade".
- `design-system/laboratorio.html` — estados isolados de componente.

## Limites conhecidos (honestidade sobre o que não foi medido)

- `text-gradient-color-fill`, `spin` e `show-hide` têm corpo capturado mas
  nenhum componente Friso os usa ainda.
- G2 (SSIM macro) foi medido e **falha** por decisão de design (0.23 <
  limiar 0.85) — Friso não reproduz fotos/copy reais, então a composição de
  luminância diverge de propósito. Ver `auditoria/raw/p10-ssim-g2-1440x900.json`.
- Lighthouse ao vivo medido (P11): Accessibility 83, Best Practices 58, SEO
  100, Agentic Browsing 50 — ver `documentacao/accessibility.md`.
- P3 refine JSON >30KB — agregação/limpeza ainda pendente (não afeta a
  reconstrução, só o tamanho dos artefatos de auditoria).
