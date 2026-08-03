# Progress — auditoria korowa-vic

| Campo | Valor |
| --- | --- |
| Sessão | 2 — PASSO 1–2 + implementação Friso |
| Atualizado | 2026-08-03 |
| Checks | ver `checks.json` (~120+ passes) |
| Host | Playwright (MCP ainda indisponível) |

## Feito

- PASSO 1 refino 0,5% (68 frames) + P8 refine; estados nav/reload/CPU 4×
- PASSO 2: 7 viewports, 129 itens no manifesto
- P5/P6/P7; rede amostrada
- Reconstrução **Friso** em `referencias-devtools/korowa-vic/`
- Docs espelho em `docs/design-system/` + `docs/reference-auditoria/`
- `report.html` atualizado; gates G1–G10 (G2 falha: SSIM NÃO OBSERVADO)
- `npm run test:referencias:korowa-vic` — 4/4

## Lacunas honestas

- MCP chrome-devtools (`SETUP-008`)
- G2 SSIM (`ssim.js` não instalado)
- P3 refine JSON >30KB (agregar numa limpeza futura)
- Lighthouse via MCP NÃO OBSERVADO
