# Componentes — Friso

Só entram padrões com evidência no manifesto / sondas. Capítulo ≠ componente.

| Componente | Evidência | Notas |
| --- | --- | --- |
| AppShell | estrutura página + sticky chrome | `.fr-shell` |
| GlobalHeader | fixed/sticky P3; MENU label | `.fr-header` |
| ContextMenu / nav overlay | estado `nav-open` captura | `.fr-nav` |
| ExperienceLoader | anim `movePreloader` 1.5s (P1); corpo do keyframe + easing confirmados na P9; marca = lockup vertical PDAC 1C branco (não Korowa) | `.fr-loader` + `.fr-loader__mark` |
| BrandMark | `scaleLogo` (P1); disparo por scroll-threshold é interpretação própria (sem evidência do gatilho exato) | `.fr-brand-mark`, `data-fr-header` |
| MediaStage | família `cloud-scroll_*` completa (P9): scale-in central, parallax lateral, overlay | `.fr-media-stage` |
| ImmersiveViewport | P3 headings persistentes; **não é pin** — `section_hero-special` tem `pin:false` real (P9/P15), a rolagem nunca trava | `.fr-immersive` (100vh, seção normal) |
| ProgressRail | hipótese + utilidade DS | `.fr-progress` |
| ScrollPrompt | padrão imersivo + UI referência | `.fr-scroll-prompt` |
| SceneHeading / SceneBody / Eyebrow | tipografia P7/P1 | `.fr-scene-*` |
| PrimaryAction | botões pill ~85px radius | `.fr-action` |
| EditorialPanel | superfícies creme/ardosia/carmesim/névoa | `.fr-panel` |
| AtmosphericLayer | gradientes radiais P1 | `.fr-immersive__atmosphere` |
| HeroVisualComposite | `.hero-special_bg-visual-wrapper` real (P9/P14/P15): 2 fotos empiladas, wrapper anima scale 1.02→1.2 durante os primeiros ~510px de scroll normal — **sem travar a rolagem** (P15: `pin:false` confirmado), camadas scale 1.1 fixo, front com transparência própria sobre back; tingimento entre as camadas (`.image_scroll-overlay`, opacity 0→1 power3.out) cobre só o back; parallax por cursor 2x entre camadas (P13) | `.fr-hero-visual`, `.fr-hero-visual__layer--back/--front`, `.fr-hero-visual__tint`; fotos próprias (PMCE), não da referência |
| CanvasFallback | 0 canvas → fallback explícito | `.fr-canvas-fallback` |
| ExperienceFooter | rodapé institucional P3 fim | `.fr-footer` |
| ReducedMotionScene | prefers-reduced-motion | tokens + CSS |

**Descartadas / NÃO OBSERVADAS com evidência insuficiente:** AudioControl, DiscoverPrompt, NoiseLayer como componente separado, Immersive WebGL scene.