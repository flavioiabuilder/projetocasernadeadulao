# Inventário do artefato Pages em `ecfd6ab`

- **HEAD auditado:** `ecfd6ab6065521b5c801c49441866673c77968be`
- **Branch:** `main`
- **Data da auditoria:** 2026-08-03
- **Fonte:** reconstrução de [`.github/workflows/pages.yml`](../../../../.github/workflows/pages.yml) nesse commit

## Árvore publicada (antes da correção PUB-F5-01)

```text
_site/
├── index.html
├── robots.txt
├── 404.html
├── .nojekyll
├── assets/img/logo-pca/          # + LEIA-ME.md
├── prototipos/                   # shims
└── programas/discipulando-a-caserna/
    ├── index.html
    ├── assets/                   # cópia ampla
    ├── design-system/            # INTERNO EXPOSTO
    └── prototipos/
        ├── prospecto-fase-5-v1/  # PÚBLICO SEM DECISÃO
        ├── prospecto-v1/
        ├── storytelling-v1/
        └── direcoes-visuais-v1/
```

## Classificação

| Path                                                          | Classe                                                 |
| ------------------------------------------------------------- | ------------------------------------------------------ |
| raiz PCA + shims + prospecto-v1 + storytelling + direções     | HISTÓRICO PÚBLICO / MANTER SOB REVISÃO                 |
| prospecto-fase-5-v1 + design-system                           | PÚBLICO SEM DECISÃO → REMOVER                          |
| assets/img/licao1                                             | CONTEÚDO SENSÍVEL (dependência do legado prospecto-v1) |
| logos PDAC não referenciados, LEIA-ME.md, brasao/marca-escudo | DEPENDÊNCIA NÃO NECESSÁRIA → REMOVER DO ARTEFATO       |
| fonts woff2 + logos PDAC referenciados + favicon              | DEPENDÊNCIA NECESSÁRIA                                 |

## Nota

```text
noindex ≠ autenticação
robots.txt ≠ controle de acesso
URL pública ≠ circulação controlada
```
