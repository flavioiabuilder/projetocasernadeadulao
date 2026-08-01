# Skills — mapa do método (não canônico)

A árvore canônica de skills é **[`.claude/skills/`](../../.claude/skills/)**.
Norma: [`docs/skills.md`](../../docs/skills.md) e
[ADR-006](../../docs/arquitetura/ADR-006-ferramentas-de-ia.md).

**Proibido nesta pasta:** criar `*/SKILL.md` como segunda fonte canônica.
**Proibido no repo:** reintroduzir `.github/skills/`.

Espelhos parciais: `.cursor/skills/`, `.agents/skills/`. Lock: `skills-lock.json`.

## Equivalências do método original

| Ideia do método  | Decisão                                | Usar                                                                                                                    |
| ---------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `design-tokens`  | DESCARTAR POR DUPLICIDADE (pasta nova) | `design-system`, `brand`                                                                                                |
| `auditoria-a11y` | DESCARTAR POR DUPLICIDADE              | `web-a11y-orchestrator` + suite `web-a11y-*`, `a11y-debugging`                                                          |
| `copy-conversao` | DEFERIR                                | Gap: `writing-guidelines` cobre chrome de UI, não copy de conversão/CTA. Criar skill só com necessidade real (Fase 5–6) |

## Cobertura útil já instalada

| Necessidade         | Skills                                                                                  |
| ------------------- | --------------------------------------------------------------------------------------- |
| Design / UI         | `frontend-design`, `impeccable`, `ui-ux-pro-max`, `ui-styling`, `web-design-guidelines` |
| Design system       | `design-system`, `brand`                                                                |
| A11y                | `web-a11y-*`, `a11y-debugging`                                                          |
| Escrita UI          | `writing-guidelines`                                                                    |
| Storytelling scroll | `scroll-world-storytelling`                                                             |
| Browser / QA        | `chrome-devtools`, `chrome-devtools-cli`, …                                             |
| Slides              | `slides`, partes de `design`                                                            |

## Gap documentado

- **copy-conversao:** procedimento de copy de conversão/CTA ainda não é skill.
  Até existir, usar briefing + prompts do método + revisão humana; não forçar
  `writing-guidelines` em texto pastoral.
