# Plano de implementação — Fase 6

- **Status:** BLUEPRINT — **LIBERADA após F5-12** (produção **não iniciada**)
- **Data:** 2026-08-03
- **Autorização:** `autorizacaoFase6: true` em
  [`../fase-5/estado-prototipo-canonico.json`](../fase-5/estado-prototipo-canonico.json)
- **Restrição:** não criar `prospecto/`, não publicar, não remover `noindex` nesta liberação

## Stack (F6-03)

HTML estático + CSS modular + JavaScript clássico progressivo + geração Node.
Conforme [ADR-001](../../arquitetura/ADR-001-stack-do-projeto.md). Sem Astro,
Next, React, Tailwind, Vite ou CMS nesta fase.

## Path de produção (F6-02 — default do plano)

`programas/discipulando-a-caserna/prospecto/`

Preservar:

- `prototipos/prospecto-v1/`
- `prototipos/prospecto-fase-5-v1/`
- demais protótipos históricos

## Conteúdo (F6-04)

- Fonte: `conteudo/*.md` + JSON estruturados
- Parser: `ferramentas/parse-md-blocos.js` (AST de blocos; fail-on-error)
- Contrato: `index.html` inteiro gerado a partir de template-fonte
- Stale-check: gera em temp, compara, não reescreve na validação

## Design System

- Tokens: `design-system/tokens/tokens.css` (candidato consumível)
- CSS compartilhado: `design-system/styles/` (fundações / componentes / padrões)
- Proibido: `lab.css` como runtime; `--primitivo-*` em página; copiar CSS de referências

## Publicação

Separada da implementação:

- F6-11 — inclusão no Pages
- F6-12 — remoção de `noindex`

Default seguro: não publicar, não redirecionar, manter `noindex`.

## Ondas restantes (após Gate A)

1. Gate B — F6-02…F6-08
2. Fundação técnica em `prospecto/`
3. Composição seção a seção
4. PE + paridade + testes
5. Readiness F7
6. Publicação só após Fase 7 + humanos
