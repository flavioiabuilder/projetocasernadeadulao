# Auditoria — korowa-vic

| Campo | Valor |
| --- | --- |
| URL | ver `audit/PLAN.md` (alvo da sessão) |
| Datas | 2026-08-03 (sessões 1–2) |
| Host | Playwright (MCP chrome-devtools indisponível) |
| Reconstrução | Friso |

## Resumo técnico

| Afirmação | Classe |
| --- | --- |
| `gsap` + `ScrollTrigger` no `window` | EVIDÊNCIA (P4) |
| 0 elementos `<canvas>` | EVIDÊNCIA (P4) |
| Tipografia DM Sans | EVIDÊNCIA (P1/P7) |
| Cores creme / ardósia / carmesim | EVIDÊNCIA (P1) |
| Paleta hero escura / carmesim (frames) | EVIDÊNCIA medido-no-render (P8) |
| WebGL app scene | NÃO OBSERVADO / não sustentado |
| Lenis / THREE | ausentes no global (não prova ausência no bundle) |

Artefatos brutos: [`audit/raw/`](../../audit/raw/), capturas [`audit/captures/`](../../audit/captures/), mapa [`audit/NARRATIVE-MAP.md`](../../audit/NARRATIVE-MAP.md).

Estudo completo: [`referencias-devtools/korowa-vic/`](../../referencias-devtools/korowa-vic/).
