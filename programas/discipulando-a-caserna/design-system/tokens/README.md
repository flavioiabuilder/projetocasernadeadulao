# Design tokens — Discipulando a Caserna

Fonte única de valores visuais do programa (Fase 3 — O Sistema).

## Contrato

```text
tokens.json   ← canônico (ME-T)
     ↓  npm run generate:discipulando:tokens
tokens.css    ← GERADO — não editar
```

- **Formato:** Método Estendido Tipado (ME-T) — camadas `primitivos` /
  `semanticos`; folhas com `$value`, `$type`, `$description`.
- **DTCG:** alinhamento de folhas ao Design Tokens Format 2025.10 (Community
  Group Report; **não** W3C Recommendation). Sem camada de componentes.
- **Versão atual:** ver `meta.versao` (`0.1.0-candidate` até D3-12).
- **Direção:** A — Prospecto pastoral editorial.
- **Não é dark mode:** contextos `papel` / `creme` / `profunda`.

## Comandos

```bash
npm run generate:discipulando:tokens
npm run validate:discipulando:tokens
npm run test:discipulando:tokens
```

Idempotência:

```bash
npm run generate:discipulando:tokens
git diff --exit-code -- programas/discipulando-a-caserna/design-system/tokens/tokens.css
```

**Não** usar `npm run generate:tokens` (pipeline Aramco / DevTools).

## Consumo futuro

- Fase 4 especifica componentes consumindo **semânticos**, não hex crus.
- Protótipos atuais **não** importam este CSS nesta fase (mapa em
  `compat.legado` e em `docs/metodo/03-direcao-tokens.md`).
- Não publicar `tokens.json` como página de produto no Pages.

## Proibições

- Editar `tokens.css` à mão
- Tokens de componente (`botao.*`, `card.*`, …)
- Contaminar com prefixos `--es-*` (Aramco Estratos)
- Tailwind / React como obrigação
- Promover Figma a fonte canônica sem governança
- Declarar `1.0.0` sem V1/V2 e D3-12
