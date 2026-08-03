# Auditoria korowa-vic

Canônico desta referência. Harness e artefatos brutos nesta mesma pasta (`raw/`, `captures/`, sondas).

| Campo | Valor |
| --- | --- |
| URL | ver [`PLAN.md`](PLAN.md) |
| Datas | 2026-08-03 (sessões 1–2) |
| Host | Playwright (MCP chrome-devtools indisponível) |
| Reconstrução | Friso — [`../design-system/`](../design-system/) |

## Stack — EVIDÊNCIA vs INFERÊNCIA

| Item | Coluna |
| --- | --- |
| GSAP + ScrollTrigger | EVIDÊNCIA (global) |
| Animações `cloud-scroll_*` / parallax | EVIDÊNCIA (computed animation-name) |
| CMS / framework de página | NÃO DETERMINADO |
| WebGL runtime scene | NÃO OBSERVADO — 0 canvas |
| Smooth scroll lib (Lenis) | NÃO OBSERVADO no global |

## Artefatos

- [`NARRATIVE-MAP.md`](NARRATIVE-MAP.md)
- [`raw/`](raw/)
- [`captures/manifest.json`](captures/manifest.json)
- [`report.html`](report.html)
