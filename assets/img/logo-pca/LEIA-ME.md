# Logomarca — Projeto Caserna de Adulão (PCA)

Pasta canônica dos arquivos oficiais da marca institucional do **Projeto Caserna de Adulão**.

Não confundir com a marca do **Discipulando a Caserna** (`programas/discipulando-a-caserna/assets/img/logo-pdac/`).

## Localização

| Caminho                 | Status                                              |
| ----------------------- | --------------------------------------------------- |
| `assets/img/logo-pca/`  | **Canônico** — usar na página institucional da raiz |
| `marca/`                | Brand book + tokens PCA (guidelines, lab HTML)      |

Ver também: [`marca/README.md`](../../marca/README.md), [`marca/docs/brand-guidelines.md`](../../marca/docs/brand-guidelines.md).

## Kit autorizado — somente `Mono_1C`

O kit oficial da logomarca contém **uma única variante**:

| Variante | Papel |
| -------- | ----- |
| `Mono_1C` | Logomarca canônica (positiva monocromática) |

Não fazem parte do kit (removidas por decisão humana):

- `Mono_1C_Branca_FFFFFF`
- `Color_Institucional`
- `Color_Institucional_Reverso`

Não criar versão branca, colorida, reversa, duotone ou de campanha até novo gate explícito.

A **paleta institucional** (carvão / papel / bronze) permanece nos tokens de interface (`marca/tokens/`). Ela colore fundos, textos e componentes — **não** gera novas versões da logomarca.

## Convenção de nomes

```
LOGO_PCA_{Master|Lockup_Vertical}_Mono_1C[_TAMANHO].{png|webp|svg}
```

| Segmento | Significado |
| -------- | ----------- |
| `Master` | Logomarca canônica (escudo com tipografia fundida) |
| `Lockup_Vertical` | Composição de aplicação: Master + wordmark editorial |
| `Mono_1C` | Única variante autorizada |
| `_800` … `_32` | Escada web do **Master** (lado máx.) |
| `_400` / `_180` / `_128` | Escada do **Lockup** (largura) |

Fonte visual primária (inegociável): `LOGO_PCA_Master_Mono_1C.webp`.

## Inventário ativo

### Master (`Mono_1C`)

| Arquivo | Uso |
| ------- | --- |
| `LOGO_PCA_Master_Mono_1C.png` / `.webp` / `.svg` | Master (1563×1563) |
| `LOGO_PCA_Master_Mono_1C_{800,400,180,128,64,32}.*` | Escada web |

### Lockup vertical (`Lockup_Vertical`)

Composição opcional (não substitui o Master):

```text
        [ Master Mono_1C completo ]
           PROJETO
      CASERNA DE ADULÃO
```

| Arquivo | Uso |
| ------- | --- |
| `LOGO_PCA_Lockup_Vertical_Mono_1C.png` / `.webp` / `.svg` | Master do lockup **1781×2080** |
| `LOGO_PCA_Lockup_Vertical_Mono_1C_{400,180,128}.*` | Escada por largura |

Pipeline: `marca/scripts/generate_lockup_vertical.py` (allowlist fechada: só `Mono_1C`). SVG **híbrido** (Master WebP em `data:` URI + contornos Palatino). Evidência: `marca/laboratorio/_qa/`.

#### Tipografia do wordmark

| Item | Valor |
| ---- | ----- |
| Família | **Palatino Linotype** (stack `--font-display`; não fontes DaC) |
| `PROJETO` | Regular · ~48% do corpo da linha 2 · tracking **0.18em** |
| `CASERNA DE ADULÃO` | Bold · tracking **0.04em** · ≤ 88% da largura do escudo |
| Geometria | **1781×2080** · `@180` → **180×210** · `aspect-ratio: 1781 / 2080` |

## Fundos escuros

Não inverter nem recolorir a logomarca. Não usar `filter`, blend modes ou SVG com fills sobrescritos.

Quando o contraste externo for insuficiente:

1. manter `Mono_1C` intacta;
2. apoiar a marca em uma **placa local** com `--color-papel` / `--surface-paper`;
3. respeitar a área de proteção;
4. não criar uma nova variante de logo.

## Uso na página institucional (`index.html`)

| Superfície | Arquivo |
| ---------- | ------- |
| Favicon / OG | `LOGO_PCA_Master_Mono_1C_{128\|800}.*` |
| Header / Footer | `LOGO_PCA_Master_Mono_1C_128.*` (+ placa papel em chrome ink) |
| Hero | `LOGO_PCA_Master_Mono_1C_180.*` (+ placa papel) |
| Encerramento | `LOGO_PCA_Lockup_Vertical_Mono_1C_180.*` (+ placa papel) |

## Mapa do kit — status

| Versão | Status |
| ------ | ------ |
| Master Mono_1C | **Canônico** |
| Lockup Vertical Mono_1C | **Canônico** (aplicação) |
| Master / Lockup Branca | **Removido** (histórico) |
| Master / Lockup Color | **Removido** (histórico) |
| Master / Lockup Color Reverso | **Removido** (histórico) |
| Lockup horizontal / só símbolo | Fora de escopo |

## Governança

- Kit fechado em `Mono_1C`. Novas cores da logomarca exigem decisão humana.
- Tokens de UI podem evoluir sem autorizar logo colorida.
- Homologação pastoral/institucional permanece decisão humana.
- Após incluir ou renomear arquivos, atualizar este LEIA-ME.
