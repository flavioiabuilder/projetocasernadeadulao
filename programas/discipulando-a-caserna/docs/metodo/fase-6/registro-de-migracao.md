# Registro de migração — Fase 6

- **Status:** PREPARAÇÃO — migração de runtime **não iniciada**
- **Bloqueio:** F5-12 / F6-11

## Preservar (não apagar)

- `prototipos/prospecto-v1/`
- `prototipos/prospecto-fase-5-v1/`
- `prototipos/storytelling-v1/`
- `prototipos/direcoes-visuais-v1/`
- `prototipos/homologacao-pastoral-v1/` (restrito; nunca Pages)

## Criar (após Gates A/B)

- `prospecto/` — superfície de produção
- `ferramentas/gerar-prospecto.js` (+ stale/validate)
- `design-system/styles/*` — CSS compartilhado (esqueleto já iniciado)

## Substituir somente após decisão

- Artefato Pages (`pages.yml` allowlist): `prospecto-v1` → `prospecto/` (F6-11)
- Redirects de URL legada (F6-09/F6-10) com rollback documentado

## Rollback

1. Restaurar allowlist anterior em `pages.yml`
2. Manter `prospecto/` versionado ou removê-lo sem tocar históricos
3. Estado F6 → bloqueada / anterior
4. Verificar URLs antigas
