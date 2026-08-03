# Progress — auditoria korowa-vic

| Campo | Valor |
| --- | --- |
| Sessão | 1 — setup + dry-run (**encerrada**) |
| Atualizado | 2026-08-03 |
| Check em andamento | — (parar após commit) |
| Baseline git | `1191c73` |

## Feito

- Harness `./audit/` (PLAN, checks×189, init/cli, sondas P1–P8).
- Dry-run 1440×900: 21 screenshots, P3/P4/P8, P1/P2 no topo.
- `NARRATIVE-MAP.md` parcial; `globalsPresent: gsap, ScrollTrigger`; **0 canvas**.
- Deps: `pixelmatch`, `pngjs`.

## Obstáculos

- MCP `chrome-devtools` não carregado (`SETUP-008` falha até o usuário ativar o servidor no Cursor).
- P3 `sceneGlobals` capturou builtins WebGL* por regex ampla — filtrar na próxima sessão.
- Sem refino 0,5% / multiviewport / throttle.

## Próxima sessão

1. Ativar MCP chrome-devtools e repetir P3/P4 via `evaluate_script`.
2. Refinar fronteiras; PASSO 2 multiviewport.
3. Não implementar design system até PASSO 3+ fechado.
