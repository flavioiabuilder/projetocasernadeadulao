# Motion — Friso

## Evidência (referência)

| Achado | Procedência |
| --- | --- |
| `gsap`, `ScrollTrigger` no `window` | P4 — EVIDÊNCIA |
| Transitions `background/color` 0.2s | P1 |
| Transform 0.35–0.4s | P1 |
| `parallaxMove`, `cloud-scroll_*`, `scaleLogo`, `movePreloader` | P1 animation-name |
| 0 canvas | P4 |

## Curva scroll → estado (reconstrução)

| Fração | Estado Friso |
| --- | --- |
| 0–0.25 | Pin hero; atmosfera escala 1.1→~1.02; progress rail sobe |
| 0.25–0.55 | Painéis editoriais; reveals por IntersectionObserver |
| 0.55–0.85 | Bloco névoa / profundidade CSS |
| 0.85–1 | Fecho carmesim + footer |

Erro-alvo G3: progresso normalizado da rail ≈ scrollY/maxScroll (identidade linear; a referência usa scrub GSAP — aproximação documentada).

## Primitivas

`data-fr-reveal`, `data-fr-parallax`, `data-fr-pin`, `data-fr-progress` em `motion.js`.
Reduced motion: duração→0.01ms, sem translate de entrada.