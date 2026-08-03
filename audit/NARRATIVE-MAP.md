# NARRATIVE-MAP — korowa-vic (dry-run 1440×900)

> **Parcial.** Host de injeção: Playwright (`MCP chrome-devtools` ausente nesta sessão).
> Sem refino 0,5%, sem CPU 4× / Slow 4G, sem viewports ≠ 1440×900.
> Textos abaixo são **evidência de medição**, não copy para a reconstrução.

| Campo | Valor medido |
| --- | --- |
| URL | https://www.korowa.vic.edu.au/ |
| Viewport | 1440×900 |
| scrollHeight | 14512 px |
| maxScroll ≈ | 13612 px |
| `<canvas>` | **0** (P4) |
| Globais (EVIDÊNCIA) | `gsap`, `ScrollTrigger` |
| THREE / Lenis / PIXI / OGL | ausentes no `window` (não prova ausência no bundle) |

## Fronteiras candidatas (P8 — picos de delta)

Ordenadas por ratio (pixelmatch, threshold 0.1):

| # | Intervalo (fração) | Ratio | Leitura operacional |
| --- | --- | ---: | --- |
| 1 | 0.00 → 0.05 | 0.861 | Saída forte do frame inicial (hero / media) |
| 2 | 0.10 → 0.15 | 0.859 | Segunda troca visual no terço superior |
| 3 | 0.05 → 0.10 | 0.792 | Continuidade da transição superior |
| 4 | 0.50 → 0.55 | 0.792 | Fronteira a meio do documento |
| 5 | 0.55 → 0.60 | 0.805 | Pico imediatamente seguinte (meio) |

Clusters: **A** ~0–0.15 (abertura / hero pin) · **B** ~0.50–0.60 (bloco mediano) · **C** delta elevado de novo ~0.85–1.00 (curva contínua — candidatos a fecho/rodapé; limiar de pico formal não os listou todos).
Refino 0,5% em ±3% de cada pico: **NÃO OBSERVADO** neste dry-run.

## Ordem narrativa observada (grosseira)

1. **Entrada / hero pin** (≈0–20%) — Headings de hero permanecem visíveis enquanto o scroll avança; 2–3 elementos `fixed`/`sticky`. Labels incluem skip-link; `MENU` aparece ~20%.
2. **Corpo editorial sob pin** (≈20–50%) — Mesmo par de headings de hero ainda reportado como visível (pin/overlay); texto institucional entra na árvore de headings.
3. **Transição mediana** (≈50–60%) — Picos P8; função exata do bloco **NÃO OBSERVADO** sem refino/screenshot annotation.
4. **Resto → fim** (≈60–100%) — Headings de hero ainda listados (persistência); footer/CTAs/áudio: **NÃO OBSERVADO** em detalhe neste dry-run.

## Elementos persistentes

- Skip to main content
- Camada fixed/sticky (2 no topo → 3 após ~20%)
- Globais GSAP + ScrollTrigger (EVIDÊNCIA de motion por scroll)

## Camada canvas

- Nenhum elemento `<canvas>` no DOM nas 21 posições.
- WebGL constructors no filtro de `sceneGlobals` da P3 são **builtins do browser**, não evidência de app WebGL.
- Hipótese inicial de “linguagem 3D/WebGL dominante” **não sustentada** pelo inventário DOM deste dry-run; atmosfera pode ser vídeo/CSS/SVG — **a confirmar** no PASSO 5 (rede + trace).

## Estados ainda NÃO OBSERVADOS

Loader detalhado, hover/ativo, menu aberto, controles de áudio, tooltips/modais, reload/back, CPU 4×, Slow 4G, portrait/mobile, Lighthouse, P5/P6/P7 completos em posições-chave.

## Artefatos

- Capturas: `audit/captures/dry-run-1440x900/f000.png` … `f100.png`
- Raw: `audit/raw/p3-scroll-curve-1440x900.json`, `p4-canvas-*.json`, `p8-frames.json`, `provenance.jsonl`
