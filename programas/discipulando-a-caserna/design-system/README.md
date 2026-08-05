# Design system — Discipulando a Caserna

> **Versão do sistema:** `0.1.0-candidate`  
> **Status:** CANDIDATO  
> **Não** sincronizar artificialmente com a versão dos tokens ou dos protótipos.

## Camadas

1. **Fundações** — [`tokens/`](tokens/) (ME-T; JSON canônico → CSS gerado)
2. **Brand book (docs)** — [`docs/`](docs/) — guidelines, decisões, motion-spec
3. **CSS compartilhado (produção)** — [`styles/`](styles/) — fundações/componentes/padrões; **não** é `laboratorio/`
4. **Componentes** — [`componentes/`](componentes/) (fichas de contrato; API pública `dc-*`)
5. **Padrões** — [`padroes/`](padroes/) (combinações de domínio)
6. **Páginas** — composição documentada no Manual; produção prevista em `prospecto/` após F5-12

Classes `.lab-*` são scaffolding do laboratório — **não** API pública.

## Fontes de verdade

| Artefato | Papel |
|----------|-------|
| [`docs/brand-guidelines.md`](docs/brand-guidelines.md) | SoT humano operacional da marca |
| [`docs/decisoes.md`](docs/decisoes.md) | Inventário F* + gates H1–H6 |
| [`docs/motion-spec.md`](docs/motion-spec.md) | Motion (mínimo e progressivo) |
| `tokens/tokens.json` | Valores visuais (machine) |
| [`../docs/metodo/04-manual-design-system.md`](../docs/metodo/04-manual-design-system.md) | Contratos e composição |
| `conteudo/` | Copy literal |
| [`laboratorio/`](laboratorio/) | Brand book HTML + demos (não produção, não Pages) |
| Figma | Integração futura — **não** canônico |

## Brand book HTML

Hub: [`laboratorio/index.html`](laboratorio/index.html)  
Capítulos: [`laboratorio/capitulos/`](laboratorio/capitulos/) (01 Marca … 08 Voz)

```bash
npx --yes serve .
# abrir /programas/discipulando-a-caserna/design-system/laboratorio/
```

Marca institucional PCA (não misturar): [`marca/`](../../../marca/).

## Comandos

```bash
npm run generate:discipulando:tokens
npm run validate:discipulando:tokens
npm run validate:discipulando:design-system
npm run test:discipulando:design-system
npm run test:discipulando:design-system:e2e
```

Skills ClaudeKit (`brand` / `design-system`): ler/escrever estes paths sob
`design-system/docs/` e `design-system/tokens/` — não defaults na raiz nem `marca/`.

## Proibições

- Editar `tokens.css` à mão
- Consumir `--primitivo-*` ou hex em CSS de componentes/lab de produto
- Importar Aramco/Estratos/Soul Church/Átrio
- Promover a `ESTÁVEL` / `1.0.0` sem decisão humana
- Migrar runtime dos protótipos nesta fase (Fase 6)
- Misturar kit/tokens/messaging com PCA sem decisão humana
