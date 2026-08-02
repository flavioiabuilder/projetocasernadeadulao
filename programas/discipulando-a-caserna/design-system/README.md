# Design system — Discipulando a Caserna

> **Versão do sistema:** `0.1.0-candidate`  
> **Status:** CANDIDATO  
> **Não** sincronizar artificialmente com a versão dos tokens ou dos protótipos.

## Camadas

1. **Fundações** — [`tokens/`](tokens/) (ME-T; JSON canônico → CSS gerado)
2. **CSS compartilhado (produção)** — [`styles/`](styles/) — fundações/componentes/padrões; **não** é `laboratorio/`
3. **Componentes** — [`componentes/`](componentes/) (fichas de contrato; API pública `dc-*`)
4. **Padrões** — [`padroes/`](padroes/) (combinações de domínio)
5. **Páginas** — composição documentada no Manual; produção prevista em `prospecto/` após F5-12

Classes `.lab-*` são scaffolding do laboratório — **não** API pública.

## Fontes de verdade

| Artefato                                                                              | Papel                                           |
| ------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `tokens/tokens.json`                                                                  | Valores visuais                                 |
| [`docs/metodo/04-manual-design-system.md`](../docs/metodo/04-manual-design-system.md) | Contratos e composição                          |
| `conteudo/`                                                                           | Copy literal                                    |
| `laboratorio/`                                                                        | Referência executável (não produção, não Pages) |
| Figma                                                                                 | Integração futura — **não** canônico            |

## Comandos

```bash
npm run generate:discipulando:tokens
npm run validate:discipulando:tokens
npm run validate:discipulando:design-system
npm run test:discipulando:design-system
npm run test:discipulando:design-system:e2e
```

## Proibições

- Editar `tokens.css` à mão
- Consumir `--primitivo-*` ou hex em CSS de componentes/lab de produto
- Importar Aramco/Estratos/Soul Church/Átrio
- Promover a `ESTÁVEL` / `1.0.0` sem decisão humana
- Migrar runtime dos protótipos nesta fase (Fase 6)
