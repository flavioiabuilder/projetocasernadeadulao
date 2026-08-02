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

## Prototipagem (Fase 5) e implementação (Fase 6)

- Candidato: `prototipos/prospecto-fase-5-v1/` — **não** editar `index.html`/`parcial/` à mão
- Gerar: `npm run generate:discipulando:prototipo-fase-5`
- Validar: `validate:discipulando:prototipagem` · `check:discipulando:prototipo-fase-5:stale`
- Config institucional: `ferramentas/institucional.js` (espelho gerado em `js/config.js`)
- Fase 6 **bloqueada** até F5-12; blueprint em [`fase-6/`](fase-6/)
- Produção prevista: `prospecto/` (ainda inexistente). Não alterar `pages.yml` sem F6-11
- Não importar `lab.css` nem CSS de `referencias-devtools/`

## Validação

```bash
npm run validate:discipulando
# ou
npm run validate
```

## Lembrete

Hierarquia: Projeto Caserna de Adulão ≠ Discipulando a Caserna. Não inventar
conteúdo institucional. Não editar `js/dados/*.js` gerados.
