# AGENTS.md — ponte multiagente

Instruções curtas para agentes (Cursor, Claude Code e outros). **Não** duplica
as regras pastorais do Discipulando a Caserna.

## Este repositório

| Área                        | Path                                                                                                                                      |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Método “O Sistema” (Fase 0) | [`metodo/README.md`](metodo/README.md)                                                                                                    |
| Pipeline (9 fases + estado) | [`metodo/PIPELINE.md`](metodo/PIPELINE.md)                                                                                                |
| Anti-padrões                | [`metodo/ANTIPADROES.md`](metodo/ANTIPADROES.md)                                                                                          |
| Glossário do método         | [`metodo/GLOSSARIO.md`](metodo/GLOSSARIO.md)                                                                                              |
| Convenções                  | [`metodo/CONVENCOES.md`](metodo/CONVENCOES.md)                                                                                            |
| Ferramentas                 | [`metodo/FERRAMENTAS.md`](metodo/FERRAMENTAS.md)                                                                                          |
| Skills (canônico)           | [`.claude/skills/`](.claude/skills/) — norma [`docs/skills.md`](docs/skills.md), [ADR-006](docs/arquitetura/ADR-006-ferramentas-de-ia.md) |
| Camada método (ADR)         | [ADR-007](docs/arquitetura/ADR-007-camada-metodo-o-sistema.md)                                                                            |
| Programa piloto             | [`programas/discipulando-a-caserna/`](programas/discipulando-a-caserna/)                                                                  |
| Estudos DevTools            | [`referencias-devtools/`](referencias-devtools/) — não é produto                                                                          |
| Base Conhecimento (técnica) | [`conhecimento/`](conhecimento/) — índice [`conhecimento/indice.md`](conhecimento/indice.md); não é pastoral nem Pages                  |

## Trabalho no Discipulando a Caserna

Leia e obedeça:

- [`.cursor/rules/discipulando-caserna.mdc`](.cursor/rules/discipulando-caserna.mdc)
- [`.cursor/rules/qualidade-estatica.mdc`](.cursor/rules/qualidade-estatica.mdc)
- Ponte da instância: [`programas/discipulando-a-caserna/docs/metodo/05-regras-agente.md`](programas/discipulando-a-caserna/docs/metodo/05-regras-agente.md)

Não inventar conteúdo institucional. Não editar arquivos gerados (`js/dados/*`,
homologação gerada, `_gerado/`).

## Commits

- [`.cursor/rules/commits-na-main.mdc`](.cursor/rules/commits-na-main.mdc) — commits na `main`.

## Validação

```bash
npm run validate:metodo
npm run validate:discipulando
npm run validate
```

## Novos projetos

Copie [`metodo/templates/projeto-web/`](metodo/templates/projeto-web/) e adapte
[`05-regras-agente.md`](metodo/templates/projeto-web/05-regras-agente.md) ao loader
do agente (`.mdc`, `CLAUDE.md`, etc.) sem triplicar o mesmo texto em três lugares.
