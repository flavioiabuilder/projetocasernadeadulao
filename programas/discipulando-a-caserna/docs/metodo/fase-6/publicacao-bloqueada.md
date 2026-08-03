# Publicação — produção ainda bloqueada (Onda 8)

- **Prévia F5:** SUSPENSA (PUB-F5-01)
- **Design System:** INTERNO (fora do Pages)
- **Status produção:** BLOQUEADA até Fase 7 + F6-11 + F6-12
- **Indexação:** BLOQUEADA (`robots.txt` + `noindex`)
- **Workflow:** [`.github/workflows/pages.yml`](../../../../../.github/workflows/pages.yml)
- **Fonte:** [`docs/publicacao/estado-publicacao.json`](../../publicacao/estado-publicacao.json)

```text
noindex ≠ autenticação
robots.txt ≠ controle de acesso
URL pública ≠ circulação controlada
```

## Allowlist atual

Publica (allowlist restrita):

- raiz (`index.html`, `robots.txt`, `404.html`)
- assets PCA listados em `rootAssets`
- `programas/discipulando-a-caserna/index.html`
- assets do programa listados em `programAssets`
- `prototipos/prospecto-v1/`
- `prototipos/storytelling-v1/`
- `prototipos/direcoes-visuais-v1/`
- shims legados na raiz `prototipos/`

**Não** publica:

- `prototipos/prospecto-fase-5-v1/` (canônico local; prévia suspensa)
- `design-system/` (interno)
- futuro `prospecto/` de produção
- `homologacao-pastoral-v1/`
- `conteudo/`, `docs/`, `ferramentas/`, `testes/`, `metodo/`

## Quando autorizar produção

1. Fase 7 concluída
2. F6-11 — incluir path de produção no allowlist (task dedicada + decisão)
3. F6-12 — remover `noindex` (decisão separada)
4. Backup + rollback + verificação de URLs

## Prévia F5

Reautorizar somente com decisão específica (responsável, escopo, dados, PMCE,
licença, pastoral, URL, prazo, rollback) alterando `estado-publicacao.json`.
