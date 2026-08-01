# Checklist — Revisão de design

Classificação: `MANUAL` | `AUTOMATIZADO` | `PARCIALMENTE AUTOMATIZADO` | `NÃO APLICÁVEL`.

## Especificação

| Item                                          | Classe                    | Como verificar                                    |
| --------------------------------------------- | ------------------------- | ------------------------------------------------- |
| Briefing existe e está utilizável             | MANUAL                    | Template/instância `01-briefing-*`                |
| Painel de referências anotado                 | MANUAL                    | `02-painel-*`                                     |
| Tokens alinhados à direção                    | PARCIALMENTE AUTOMATIZADO | JSON parse (`03-tokens.json`); CSS vivo no piloto |
| Manual do sistema (se Fase 4+)                | MANUAL                    | `04-manual-*`                                     |
| Critérios de rejeição do briefing respeitados | MANUAL                    | Diff vs briefing                                  |

## Qualidade automatizada (repo piloto)

| Item                            | Classe              | Como verificar                        |
| ------------------------------- | ------------------- | ------------------------------------- |
| Lint CSS (prospecto + direções) | AUTOMATIZADO        | `npm run lint:discipulando:css`       |
| Lint CSS storytelling-v1        | NÃO APLICÁVEL / gap | Fora do globs atuais — revisão MANUAL |
| Lint JS                         | AUTOMATIZADO        | `npm run lint:discipulando:js`        |
| Lint HTML prospecto             | AUTOMATIZADO        | `npm run lint:discipulando:html`      |
| Formatação                      | AUTOMATIZADO        | `npm run format:check`                |
| Testes unitários                | AUTOMATIZADO        | `npm run test:discipulando`           |
| E2E                             | AUTOMATIZADO        | `npm run test:e2e`                    |
| Axe a11y (prospecto)            | AUTOMATIZADO        | `npm run test:a11y`                   |
| Validação completa do programa  | AUTOMATIZADO        | `npm run validate:discipulando`       |

## Visual e a11y manual

| Item                                                  | Classe                    | Como verificar                                    |
| ----------------------------------------------------- | ------------------------- | ------------------------------------------------- |
| Hierarquia tipográfica e marca no primeiro viewport   | MANUAL                    | Revisão humana / crítica estruturada              |
| Contraste AA em estados hover/focus                   | PARCIALMENTE AUTOMATIZADO | Axe + revisão MANUAL                              |
| `prefers-reduced-motion`                              | PARCIALMENTE AUTOMATIZADO | Capturas com reduce; checagem MANUAL de animações |
| Leitor de tela (NVDA/VoiceOver) smoke                 | MANUAL                    | Roteiro humano                                    |
| Sem segunda fonte de verdade visual (Figma vs código) | MANUAL                    | Ver `CONVENCOES.md`                               |

## Prompt sugerido

[`../prompts/critica-estruturada.md`](../prompts/critica-estruturada.md)
