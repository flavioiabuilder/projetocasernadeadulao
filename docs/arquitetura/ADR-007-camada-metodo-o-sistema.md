# ADR-007 — Camada do método “O Sistema”

- **Status:** Aceita
- **Data:** 2026-07-31
- **Relacionada:** [ADR-006](ADR-006-ferramentas-de-ia.md), [`../../metodo/README.md`](../../metodo/README.md)

## Contexto

O repositório é o piloto do método de produção web assistida por IA (“O Sistema”).
A Fase 0 exige infraestrutura reutilizável (templates, prompts, checklists,
bibliotecas) sem misturar artefatos genéricos com conteúdo pastoral do
Discipulando a Caserna e sem criar um segundo sistema de skills ou ADRs.

## Decisão

1. **Local canônico da camada metodológica:** `metodo/` na raiz do repositório,
   peer de `programas/` e `referencias-devtools/`.
2. **Não publicar** `metodo/` no GitHub Pages (o workflow já omite essa pasta;
   não adicioná-la ao artefato `_site`).
3. **Skills:** a árvore canônica permanece `.claude/skills/` (ADR-006). Em
   `metodo/skills/` só índices e mapas — proibido hospedar `SKILL.md` canônicos.
4. **Decisões técnicas:** continuam em ADRs. O ledger em
   `metodo/biblioteca/decisoes/` registra produto/design/método e **aponta** para
   ADRs; não as substitui.
5. **Instância do piloto:** status e links em
   `programas/discipulando-a-caserna/docs/metodo/` — stubs, sem inventar conteúdo
   das fases 1–4.
6. **Extração futura** para repositório independente é permitida, mas **fora do
   escopo** desta fase.

## Alternativas rejeitadas

- `docs/metodo/` — mistura documentação global de IA com templates operacionais.
- `sistema/` — colide semanticamente com “design system”.
- `metodo-web/` aninhado — simula monorepo sem benefício.
- Segunda árvore de skills ou ADRs dentro de `metodo/`.

## Consequências

- Novos projetos começam copiando `metodo/templates/projeto-web/`.
- Agentes leem `metodo/` para o método; leem regras `.mdc` e ADRs do programa
  para o produto pastoral.
- `npm run validate:metodo` verifica o contrato da camada (ver `package.json`).
