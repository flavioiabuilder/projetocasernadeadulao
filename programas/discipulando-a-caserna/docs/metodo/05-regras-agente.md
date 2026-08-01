# 05 — Regras do agente (instância piloto)

> **Status:** Ponte — a norma viva está nas regras Cursor do programa.
> **Não** duplicar o texto pastoral aqui.

Template genérico (para novos projetos):
[`../../../../metodo/templates/projeto-web/05-regras-agente.md`](../../../../metodo/templates/projeto-web/05-regras-agente.md).

## Onde estão as regras canônicas deste programa

| Loader             | Path                                                                                           |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| Cursor (programa)  | [`.cursor/rules/discipulando-caserna.mdc`](../../../../.cursor/rules/discipulando-caserna.mdc) |
| Cursor (qualidade) | [`.cursor/rules/qualidade-estatica.mdc`](../../../../.cursor/rules/qualidade-estatica.mdc)     |
| Commits            | [`.cursor/rules/commits-na-main.mdc`](../../../../.cursor/rules/commits-na-main.mdc)           |
| Ponte multiagente  | [`../../../../AGENTS.md`](../../../../AGENTS.md)                                               |
| ADRs do programa   | [`../arquitetura/`](../arquitetura/)                                                           |
| Skills             | [`../../../../docs/skills.md`](../../../../docs/skills.md)                                     |

## Tokens (Fase 3)

- Fonte de verdade candidata: `design-system/tokens/tokens.json`
- CSS gerado: `design-system/tokens/tokens.css` — não editar à mão
- Comandos: `generate:discipulando:tokens` · `validate:discipulando:tokens`
- Não usar `generate:tokens` (Aramco). Não migrar protótipos sem Fase 6.
- Ver [`03-direcao-tokens.md`](03-direcao-tokens.md).

## Validação

```bash
npm run validate:discipulando
# ou
npm run validate
```

## Lembrete

Hierarquia: Projeto Caserna de Adulão ≠ Discipulando a Caserna. Não inventar
conteúdo institucional. Não editar `js/dados/*.js` gerados.
