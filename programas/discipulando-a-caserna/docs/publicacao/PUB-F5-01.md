# PUB-F5-01 — Prévia pública do protótipo canônico F5

- **Status:** SUSPENSA
- **Data:** 2026-08-03
- **Responsável:** Flávio Alves da Costa
- **Fonte verificável:** [`estado-publicacao.json`](estado-publicacao.json)

## Contexto

A Fase 5 foi canonizada tecnicamente (F5-08/F5-10/F5-12). A decisão de Gate A
liberou a Fase 6 e registrou expressamente que isso **não** autoriza
publicação, inclusão no GitHub Pages, remoção de `noindex`, criação de
`prospecto/`, redirects, exclusão de protótipos ou distribuição do PDF
inexistente.

## Problema

O commit `ecfd6ab` alterou `.github/workflows/pages.yml` e a documentação de
publicação para incluir `prospecto-fase-5-v1/` e `design-system/` no artefato
público, sem gate específico de circulação e em conflito com o ledger de
2026-08-03 (“não alterar Pages/noindex”).

## Decisão

- Suspender a publicação pública do protótipo canônico F5 (**PUB-F5-01 —
  SUSPENSA**)
- Remover Design System (incl. laboratório) do Pages
- Manter canônico local e evidências intactas
- Manter Fase 6 **LIBERADA — NÃO INICIADA**
- Manter produção, indexação, redirects e PDF bloqueados
- Exigir decisão futura específica para qualquer prévia pública

## Princípios

```text
noindex ≠ autenticação
robots.txt ≠ controle de acesso
URL pública ≠ circulação controlada
```

## Condições futuras de reautorização

Uma nova autorização deverá definir: responsável; conteúdo; dados; PMCE;
licença; pastoral; URL; indexação; período; rollback; monitoramento.

## Rollback desta correção

1. Reverter o commit de governança **ou** alterar
   [`estado-publicacao.json`](estado-publicacao.json) com decisão explícita
   (`pubF5.status` autorizado) **e** atualizar allowlist/surfaces.
2. Ajustar ADR-002 / ledger com nova decisão (não apagar PUB-F5-01).
3. Rodar `npm run validate:pages:policy`, `npm run build:pages`,
   `npm run validate:pages:artifact`.
4. Deploy só após Qualidade verde no SHA correspondente.

Reincluir F5/DS no Pages somente por commit dedicado + decisão correspondente.

## Task relacionada (fora desta correção)

- **TASK-PUB-LEGACY-01** — auditar suspensão/redação de `prospecto-v1` e
  `storytelling-v1` (P0: PMCE, Lição 1, dados institucionais).
