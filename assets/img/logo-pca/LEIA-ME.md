# Logomarca — Projeto Caserna de Adulão (PCA)

Pasta canônica dos arquivos oficiais da marca institucional do **Projeto Caserna de Adulão**.

Não confundir com a marca do **Discipulando a Caserna** (`programas/discipulando-a-caserna/assets/img/logo-pdac/`).

## Localização

| Caminho                 | Status                                              |
| ----------------------- | --------------------------------------------------- |
| `assets/img/logo-pca/`  | **Canônico** — usar na página institucional da raiz |
| `marca/`                | Brand book + tokens PCA (guidelines, lab HTML)      |

Ver também: [`marca/README.md`](../../marca/README.md), [`marca/docs/brand-guidelines.md`](../../marca/docs/brand-guidelines.md).

## Convenção de nomes

```
LOGO_PCA_{VARIANTE}_{ACABAMENTO}_{COR}[_TAMANHO].png
```

| Segmento     | Significado                                      |
| ------------ | ------------------------------------------------ |
| `LOGO_`      | Escudo completo (tipografia fundida na arte)     |
| `PCA`        | Projeto Caserna de Adulão                        |
| `Master`     | Logomarca canônica (escudo único)                |
| `Lockup_Vertical` | Composição: Master + wordmark editorial abaixo |
| `Mono_1C`    | Monocromático (preto / branco) — positiva        |
| `Mono_1C_Branca_FFFFFF` | Mesma arte invertida (reversed)         |
| `Color_Institucional` | Full color com tokens da página institucional |
| `Color_Institucional_Reverso` | Color com campo/detalhe invertidos (bronze mantido) |
| `_800` … `_32` | Derivados web (Master: lado máx.; Lockup: largura) |

Cada PNG canônico tem um `.webp` irmão (mesmo basename, quality ~82). **Manter os PNG** como fonte/fallback; preferir WebP no runtime.

Há também um `.svg` por variante de cor (mesmo basename). Os PNG/WebP
originais permanecem; o SVG é variação adicional (escala livre, edição de paths).
O SVG preserva múltiplos fills com fundo transparente — não usar traço
binary-only neste escudo (elimina um dos campos).

## Paleta usada no Color_Institucional

Tokens da página institucional (`index.html`), não inventados:

| Papel na arte | Token | Hex |
| ------------- | ----- | --- |
| Campo / traços escuros | `--color-carvao` | `#0E1216` |
| Elementos claros | `--color-papel` | `#F3EEE6` |
| Filete (rim) | `--color-bronze` | `#8B6F47` |

Homologação pastoral/institucional desta colorização permanece decisão humana.

## Variantes de cor (Master)

| Variante | Arte | Fundo recomendado |
| -------- | ---- | ----------------- |
| `Mono_1C` | Campo escuro, elementos claros | Claro / papel |
| `Mono_1C_Branca_FFFFFF` | Campo claro, elementos escuros (invertida) | Escuro / foto escura |
| `Color_Institucional` | Carvão + papel + filete bronze | Claro ou escuro com contraste |
| `Color_Institucional_Reverso` | Papel↔carvão invertidos; bronze mantido | Escuro / foto escura (com cor) |

## Inventário

### Positiva (`Mono_1C`)

| Arquivo | Uso |
| ------- | --- |
| `LOGO_PCA_Master_Mono_1C.png` / `.webp` / `.svg` | Master mono (1563×1563) |
| `LOGO_PCA_Master_Mono_1C_{800,400,180,128,64,32}.*` | Escada web |

### Reversed (`Mono_1C_Branca_FFFFFF`)

| Arquivo | Uso |
| ------- | --- |
| `LOGO_PCA_Master_Mono_1C_Branca_FFFFFF.png` / `.webp` / `.svg` | Master reversed |
| `LOGO_PCA_Master_Mono_1C_Branca_FFFFFF_{800…32}.*` | Escada web (fundos escuros) |

### Full color (`Color_Institucional`)

| Arquivo | Uso |
| ------- | --- |
| `LOGO_PCA_Master_Color_Institucional.png` / `.webp` / `.svg` | Master colorido |
| `LOGO_PCA_Master_Color_Institucional_{800…32}.*` | Escada web |

### Full color reverso (`Color_Institucional_Reverso`)

| Arquivo | Uso |
| ------- | --- |
| `LOGO_PCA_Master_Color_Institucional_Reverso.png` / `.webp` / `.svg` | Master color invertido |
| `LOGO_PCA_Master_Color_Institucional_Reverso_{800…32}.*` | Escada web (fundos escuros com cor) |

Rasters derivados: downscale Lanczos a partir do master da mesma variante (sem upscale).

### Lockup vertical (`Lockup_Vertical`)

Composição de **aplicação** (não substitui o Master): escudo no topo + tipografia editorial abaixo.

```text
        [ Escudo Master ]
           PROJETO
      CASERNA DE ADULÃO
```

O texto externo **não** altera a tipografia fundida na borda do escudo.

#### Tipografia (revisão)

| Item | Valor |
| ---- | ----- |
| Família | **Palatino Linotype** (membro de `--font-display`; não Montserrat/Source Serif do DaC) |
| `PROJETO` | Regular · ~48% do corpo da linha 2 · tracking **0.18em** |
| `CASERNA DE ADULÃO` | Bold · tracking **0.04em** · largura máx. **88%** do escudo |
| Entrelinha | **0.38em** da linha principal |
| Gap escudo→texto | **8%** da largura do escudo (elevação óptica leve) |
| Área de proteção | ≥ ¼ da altura do escudo ao redor do lockup completo |
| Tamanho mínimo | Largura **180px** para leitura confortável; **128px** só em contexto próximo |

**Por que Palatino (e não Georgia):** Georgia é otimizada para corpo de tela e ficou “digitada” sob o escudo. Palatino traz solenidade clássica alinhada à stack institucional (Iowan → Palatino → Georgia), contraste com o sans da borda do escudo, e suporte nativo a `Ã`/`Ú`. Raster usa `pala.ttf` / `palab.ttf`; SVG embute **contornos** (fontTools) + Master inline — sem dependência frágil de `<image href>` nem de fonte no cliente.

| Arquivo | Fundo recomendado |
| ------- | ----------------- |
| `LOGO_PCA_Lockup_Vertical_Mono_1C.png` / `.webp` / `.svg` (+ `_400`, `_180`, `_128`) | Claro |
| `LOGO_PCA_Lockup_Vertical_Mono_1C_Branca_FFFFFF.*` | Escuro |
| `LOGO_PCA_Lockup_Vertical_Color_Institucional.*` | Claro |
| `LOGO_PCA_Lockup_Vertical_Color_Institucional_Reverso.*` | Escuro |

Master do lockup ≈ **800×1008** px (mesma geometria nas 4 cores). Escada por **largura** 400 / 180 / 128 (sem 64/32).

## Uso na página institucional (`index.html`)

| Superfície | Arquivo |
| ---------- | ------- |
| Favicon | `LOGO_PCA_Master_Mono_1C_128.webp` (+ PNG fallback) |
| Header | `LOGO_PCA_Master_Mono_1C_Branca_FFFFFF_128.*` (chrome ink) |
| Hero | `LOGO_PCA_Master_Color_Institucional_Reverso_180.*` (~5rem) |
| Encerramento | `LOGO_PCA_Lockup_Vertical_Color_Institucional_Reverso_180.*` |
| Footer | `LOGO_PCA_Master_Mono_1C_Branca_FFFFFF_128.*` |
| OG/Twitter | `LOGO_PCA_Master_Mono_1C_800.png` |

Em superfícies escuras, preferir `…_Branca_FFFFFF_*` (mono) ou `…_Color_Institucional_Reverso_*` (com cor). `Color_Institucional` para destaque de marca quando houver contraste adequado.

## Mapa do kit — status e skills

**Logomarca canônica:** escudo Master (tipografia fundida). Texto fora do escudo = editorial / composição de layout.

| Versão | Status | Como gerar | Skills |
| ------ | ------ | ---------- | ------ |
| Master Mono positiva | Feito | — | — |
| Master Mono Branca | Feito | Invert RGB do Mono PNG; SVG com swap de fills | brand + Pillow |
| Master Color_Institucional | Feito | Recolor fills SVG com tokens `index.html` → raster | brand + Pillow |
| Master Color_Institucional_Reverso | Feito | Swap papel↔carvão (SVG + remap PNG); bronze mantido | brand + Pillow |
| Lockup vertical | Feito | Master 800 + Palatino Regular/Bold; SVG self-contained (paths) | brand + Pillow + fontTools |
| Lockup horizontal | Fora de escopo | — | — |
| Só símbolo / wordmark tipográfico sozinho | Fora de escopo | Master = logo completa | — |

Pipeline do lockup vertical: Pillow (raster) + fontTools (contornos SVG) → PNG/WebP q82 → LEIA-ME / lab.

## Governança

- Não inventar versões nem recolorir fora desta pasta / desta paleta documentada.
- Homologação pastoral/institucional da marca permanece decisão humana.
- Após incluir ou renomear arquivos, atualizar este LEIA-ME.
