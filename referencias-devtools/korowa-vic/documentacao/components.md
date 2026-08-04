# Componentes — Friso

Só entram padrões com evidência no manifesto / sondas. Capítulo ≠ componente.

| Componente | Evidência | Notas |
| --- | --- | --- |
| AppShell | estrutura página + sticky chrome | `.fr-shell` |
| GlobalHeader | fixed/sticky P3; MENU label | `.fr-header` |
| ContextMenu / nav overlay | estado `nav-open` captura | `.fr-nav` |
| ExperienceLoader | anim `movePreloader` 1.5s (P1); corpo do keyframe + easing confirmados na P9 | `.fr-loader` + `.fr-loader__curtain` |
| BrandMark | `scaleLogo` (P1); disparo por scroll-threshold é interpretação própria (sem evidência do gatilho exato) | `.fr-brand-mark`, `data-fr-header` |
| MediaStage | família `cloud-scroll_*` completa (P9): scale-in central, parallax lateral, overlay | `.fr-media-stage` |
| ImmersiveViewport / pin | P3 headings persistentes | `.fr-pin-chapter` |
| ProgressRail | hipótese + utilidade DS | `.fr-progress` |
| ScrollPrompt | padrão imersivo + UI referência | `.fr-scroll-prompt` |
| SceneHeading / SceneBody / Eyebrow | tipografia P7/P1 | `.fr-scene-*` |
| PrimaryAction | botões pill ~85px radius | `.fr-action` |
| EditorialPanel | superfícies creme/ardosia/carmesim/névoa | `.fr-panel` |
| AtmosphericLayer | gradientes radiais P1 | `.fr-immersive__atmosphere` |
| CanvasFallback | 0 canvas → fallback explícito | `.fr-canvas-fallback` |
| ExperienceFooter | rodapé institucional P3 fim | `.fr-footer` |
| ReducedMotionScene | prefers-reduced-motion | tokens + CSS |

**Descartadas / NÃO OBSERVADAS com evidência insuficiente:** AudioControl, DiscoverPrompt, NoiseLayer como componente separado, Immersive WebGL scene.