# Publicação — produção ainda bloqueada (Onda 8)

- **Status prévia técnica:** allowlist ampliada (F5 + Design System) — ainda com
  `noindex`
- **Status produção:** BLOQUEADA até Fase 7 + F6-11 + F6-12
- **Workflow:** [`.github/workflows/pages.yml`](../../../../../.github/workflows/pages.yml)

## Allowlist atual

Publica:

- raiz (`index.html`, `robots.txt`, `404.html`)
- `programas/discipulando-a-caserna/index.html` + `assets/`
- `design-system/`
- `prototipos/prospecto-fase-5-v1/`
- `prototipos/prospecto-v1/`
- `prototipos/storytelling-v1/`
- `prototipos/direcoes-visuais-v1/`
- shims legados na raiz `prototipos/`

**Não** publica:

- futuro `prospecto/` de produção
- `homologacao-pastoral-v1/`
- `conteudo/`, `docs/`, `ferramentas/`, `testes/`, `metodo/`

## Quando autorizar produção

1. Fase 7 concluída
2. F6-11 — incluir path de produção no allowlist (task dedicada)
3. F6-12 — remover `noindex` (decisão separada)
4. Backup + rollback + verificação de URLs
