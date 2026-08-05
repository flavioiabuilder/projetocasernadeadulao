# Marca — Projeto Caserna de Adulão (PCA)

Brand book e design system **institucionais** da raiz do repositório.

**Não** é o design system do Discipulando a Caserna
(`programas/discipulando-a-caserna/design-system/`).

## Mapa

| Caminho | Papel |
|---------|-------|
| [`docs/brand-guidelines.md`](docs/brand-guidelines.md) | SoT humano |
| [`docs/decisoes.md`](docs/decisoes.md) | Gates humanos H1–H6 |
| [`docs/motion-spec.md`](docs/motion-spec.md) | Motion (presença sóbria) |
| [`tokens/tokens.json`](tokens/tokens.json) | SoT machine (3 camadas) |
| [`tokens/tokens.css`](tokens/tokens.css) | Gerado — consumido por `index.html` e pelo lab |
| [`laboratorio/`](laboratorio/) | Brand book HTML (local) |
| [`exemplos/`](exemplos/) | Mocks CSS opcionais |
| [`../assets/img/logo-pca/`](../assets/img/logo-pca/) | Kit de logo canônico |

## Servir o laboratório

Na raiz do repositório:

```bash
npx --yes serve .
```

Abrir `/marca/laboratorio/`.

Publicação no GitHub Pages: **adiada** (H6). O lab não entra no scroll pastoral.

## Tokens

```bash
npm run generate:marca:tokens
npm run validate:marca:tokens
```

Skills ClaudeKit (`brand` / `design-system`) devem ler/escrever estes paths —
não `docs/brand-guidelines.md` nem `assets/design-tokens.*` na raiz.

## Fronteira PCA ≠ DaC

| | PCA | Discipulando |
|--|-----|--------------|
| Logo | `assets/img/logo-pca/` | `…/logo-pdac/` |
| Tokens | `marca/tokens/` | `programas/…/design-system/tokens/` |
| Guidelines | `marca/docs/` | `programas/…/design-system/docs/` |
| Lab | `marca/laboratorio/` | `programas/…/design-system/laboratorio/` |

Brand book do programa: [`programas/discipulando-a-caserna/design-system/`](../programas/discipulando-a-caserna/design-system/) (docs + lab capítulos). Não misturar kits ou tokens.
