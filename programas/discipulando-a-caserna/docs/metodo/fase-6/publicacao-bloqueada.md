# Publicação — bloqueada (Onda 8)

- **Status:** BLOQUEADA até Fase 7 + F6-11 + F6-12
- **Workflow:** [`.github/workflows/pages.yml`](../../../../../.github/workflows/pages.yml)

## Estado atual do allowlist

Publica apenas:

- raiz (`index.html`, `robots.txt`, `404.html`)
- `programas/discipulando-a-caserna/index.html` + `assets/`
- `prototipos/prospecto-v1/`
- `prototipos/storytelling-v1/`
- `prototipos/direcoes-visuais-v1/`
- shims legados na raiz `prototipos/`

**Não** publica:

- `prospecto-fase-5-v1/`
- futuro `prospecto/`
- `conteudo/`, `docs/`, `ferramentas/`, `testes/`, `metodo/`, lab

## Quando autorizar

1. Fase 7 concluída
2. F6-11 — incluir path de produção no allowlist (task dedicada)
3. F6-12 — remover `noindex` (decisão separada)
4. Backup + rollback + verificação de URLs

Não executar nesta rodada.
