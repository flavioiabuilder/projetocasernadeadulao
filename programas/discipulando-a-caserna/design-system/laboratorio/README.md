# Laboratório — brand book + design system

Referência **executável** do brand book e dos contratos do design system.

- Consome `../tokens/tokens.css` (semânticos via `var`)
- Brand book em `capitulos/` (01–08)
- Demos `dc-*` no capítulo 06
- HTML/CSS/JS clássico — sem frameworks
- Conteúdo **demonstrativo** (marcado) — não é copy pastoral canônica
- **Não** publicar no GitHub Pages
- **Não** é o runtime do prospecto

## Documentação

| Artefato | Papel |
|----------|-------|
| [`../docs/brand-guidelines.md`](../docs/brand-guidelines.md) | SoT humano operacional |
| [`../docs/decisoes.md`](../docs/decisoes.md) | Gates H1–H6 |
| [`../docs/motion-spec.md`](../docs/motion-spec.md) | Motion mínimo/progressivo |

## Servir

Na raiz do repositório:

```bash
npx --yes serve .
```

Abrir `/programas/discipulando-a-caserna/design-system/laboratorio/`.

Ou:

```bash
npx serve programas/discipulando-a-caserna/design-system/laboratorio
npm run test:discipulando:design-system:e2e
```

## Fronteira

Não confundir com o brand book PCA em [`marca/laboratorio/`](../../../../marca/laboratorio/).
