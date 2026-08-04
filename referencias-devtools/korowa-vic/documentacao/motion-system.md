# Motion — Friso

## Evidência (referência)

| Achado | Procedência |
| --- | --- |
| `gsap` 3.15.0, `ScrollTrigger` no `window` | P4 (globais), **P9 — MCP chrome-devtools ao vivo** (versão + instâncias) |
| Plataforma: Webflow (`cdn.prod.website-files.com`, `d3e54v103j8qbb.cloudfront.net`) | P9 |
| `ScrollTrigger` real: `section_hero-special` scrub 0.8, duração 0.5s · `steps-stagger_component` scrub 0.8, duração 1.6s · `card-stack_cards-list` scrub false (timeline discreta) | **P9 — `ScrollTrigger.getAll()` medido ao vivo** |
| Trigger global só-callback: `start: "top+=50"`, `end: "max"`, sem `animation`/`pin` — dirige `onUpdate`/`onToggle` próprios, não uma timeline GSAP. Página inteira como range (~14–15k px, varia entre cargas — conteúdo dinâmico). Padrão típico de barra de progresso custom-coded. | **P9 (continuação) — `first.vars` inspecionado diretamente** |
| `--animation--ease: cubic-bezier(.491,.153,.094,.884)` — curva de assinatura, reutilizada em hover de botão, `grid-template-rows` de card e highlight de texto | **P9 — custom property computada** |
| Família de easings de UI: `cubic-bezier(0.19,1,0.22,1)` (entrada), `cubic-bezier(0.165,0.84,0.44,1)` (saída/navbar 0.35s), `cubic-bezier(0.215,0.61,0.355,1)` (ênfase, 0.75s), `cubic-bezier(0.696,0.257,0,1.012)` (impulso com leve overshoot, 0.3s), `cubic-bezier(0.785,0.135,0.15,0.86)` (revelação lenta, 0.5s) | **P9 — CSSOM ao vivo, `raw/p9-gsap-live-1440x900.json`** |
| `@keyframes` reais: `parallaxMove`, `movePreloader`, `scaleLogo`, `cloud-scroll_center-image-scale-in`, `cloud-scroll_side-image-parallax`, `cloud-scroll_show-overlay`, `text-gradient-color-fill`, `spin`, `show-hide` | P1 (nomes, sessão 1) confirmado e capturado por inteiro na P9 |
| 0 canvas da aplicação (canvas transitório rastreado até fingerprinting de terceiro, `dsp-cdn.gammaplatform.com`) | P4 + `canvas-origin` (ver `three-dimensional-language.md`) |
| `.hero-special_bg-visual-wrapper`: 2 `<img>` empilhados (`.is-back` z-index auto, `.is-front` z-index 3), wrapper `scale(1.02)` + `overflow:clip`, camadas `scale(1.1)`, `object-fit:cover`. Sem `mask-image`, sem `mix-blend-mode`. Amostrado em 9 posições de scroll (0–1000px): `transform`/`opacity` idênticos em todas — **o efeito é estático**, resolvido no arquivo de imagem (front tem canal alfa próprio, confirmado no header VP8X do asset), não em CSS/JS de scroll. | **P9 (continuação) — inspeção direta dos elementos + CSSOM** |
| `.image-cloud_scroll .image_scroll-overlay`: `animation-timeline: --image-cloud-timeline; animation-range: contain 5% contain 85%` — confirma que a família `cloud-scroll_*` usa scroll-timeline nativo do CSS, não GSAP (ver seção "Física do scroll" abaixo) | P9 (continuação) |

Tokens correspondentes em `tokens.json` → `easing.*`, `duration.*`, `scrollPhysics.*` (gerados em `tokens.css` como `--fr-ease-*`, `--fr-dur-*`, `--fr-scroll-*`).

## Física do scroll (scrub) — antes e depois da P9

A sessão 2 documentava a rail de progresso como "identidade linear" por não ter acesso a `ScrollTrigger.getAll()` (MCP indisponível). A P9 mediu o valor real: `scrub: 0.8` nas duas seções com scroll contínuo observadas. Isso não é um multiplicador — é uma **constante de tempo de suavização exponencial**: a cada frame, a timeline persegue a posição-alvo do scroll, sem nunca ser 1:1 instantânea.

`motion.js` implementa isso em `createScrollLag(lagSeconds)`: a cada `requestAnimationFrame`, `valor += (alvo − valor) × (1 − e^(−dt/lag))`, com `lag = 0.8` lido de `--fr-scroll-lag-segundos`. Independente de framerate (usa `dt` real, não incremento fixo). Aplicado em `bindPinProgress` (o pin de hero da Friso é o análogo direto de `section_hero-special`).

A rail de progresso (`data-fr-progress`) e o parallax (`data-fr-parallax`) permanecem 1:1 com o scroll. A rail agora tem evidência direta — deixou de ser só hipótese Friso: o trigger global só-callback (`start: top+=50`, `end: max`, sem animação GSAP associada) é consistente com um driver de progresso custom-coded cobrindo quase a página inteira. O parallax é o análogo de `cloud-scroll_side-image-parallax`, que no site real roda via CSS `animation-timeline` nativa (sem lag de JS), não scrub do GSAP.

`prefers-reduced-motion: reduce` desliga o lag por completo (`REDUCE` em `motion.js`): o valor salta direto ao alvo, sem suavização, e as durações no CSS caem para `0.01ms`.

## Curva scroll → estado (reconstrução)

| Fração | Estado Friso |
| --- | --- |
| 0–0.25 | Pin hero; `.fr-hero-visual` (2 fotos) estático — fiel à referência; véu escurece 0.3→0.6 via `createScrollLag` (correção de sessão 3: a referência não anima a imagem no scroll, então Friso move o véu, não a foto); progress rail sobe (instantâneo) |
| 0.25–0.55 | Painéis editoriais; reveals por IntersectionObserver |
| 0.55–0.85 | Bloco névoa / profundidade CSS |
| 0.85–1 | Fecho carmesim + footer |

**Correção de sessão 3**: a sessão 2 tinha implementado `atmosfera escala 1.1→~1.02` no scroll como hipótese (sem medição direta). A P9 mediu `.hero-special_bg-visual` em 9 posições de scroll e não achou nenhuma variação — o efeito é estático. `bindPinProgress` foi ajustado: `data-fr-atmosphere` agora fica no véu (`.fr-immersive__veil`), não na foto, e anima opacidade em vez de escala. A foto composta (`.fr-hero-visual`) ficou fiel ao estático real.

## Primitivas

`data-fr-reveal`, `data-fr-parallax`, `data-fr-pin`, `data-fr-pin-sticky`, `data-fr-atmosphere`, `data-fr-progress` em `motion.js`. Classes utilitárias novas (P9): `.fr-media-stage` (análogo de `cloud-scroll_*`, scale-in + parallax lateral + overlay), `.fr-loader__curtain` (análogo de `movePreloader`, wipe de altura), `.fr-brand-mark` (análogo de `scaleLogo`) — em `motion.css`.

Reduced motion: duração→0.01ms, sem translate de entrada, sem lag de scroll.