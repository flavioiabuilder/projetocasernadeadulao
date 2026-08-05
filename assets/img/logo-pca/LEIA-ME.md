# Logomarca — Projeto Caserna de Adulão (PCA)

Pasta canônica dos arquivos oficiais da marca institucional do **Projeto Caserna de Adulão**.

Não confundir com a marca do **Discipulando a Caserna** (`programas/discipulando-a-caserna/assets/img/logo-pdac/`).

## Localização

| Caminho                 | Status                                              |
| ----------------------- | --------------------------------------------------- |
| `assets/img/logo-pca/`  | **Canônico** — usar na página institucional da raiz |

## Convenção de nomes

```
LOGO_PCA_{VARIANTE}_{ACABAMENTO}_{COR}[_TAMANHO].png
```

| Segmento     | Significado                                      |
| ------------ | ------------------------------------------------ |
| `LOGO_`      | Escudo completo (lockup com tipografia na arte)  |
| `PCA`        | Projeto Caserna de Adulão                        |
| `Master`     | Master / escudo completo                         |
| `Mono_1C`    | Monocromático (preto / branco) — positiva        |
| `Mono_1C_Branca_FFFFFF` | Mesma arte invertida (reversed)         |
| `Color_Institucional` | Full color com tokens da página institucional |
| `Color_Institucional_Reverso` | Color com campo/detalhe invertidos (bronze mantido) |
| `_800` … `_32` | Derivados web por lado máximo (px)             |

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

## Uso na página institucional (`index.html`)

| Superfície | Arquivo |
| ---------- | ------- |
| Favicon | `LOGO_PCA_Master_Mono_1C_128.webp` (+ PNG fallback) |
| Header | `LOGO_PCA_Master_Mono_1C_128.*` |
| Hero | `LOGO_PCA_Master_Mono_1C_128.*` (~5rem) |
| Footer | `LOGO_PCA_Master_Mono_1C_128.*` |
| OG/Twitter | `LOGO_PCA_Master_Mono_1C_800.png` |

Em superfícies escuras, preferir `…_Branca_FFFFFF_*` (mono) ou `…_Color_Institucional_Reverso_*` (com cor). `Color_Institucional` para destaque de marca quando houver contraste adequado.

## Mapa do kit — status e skills

Estrutura atual: só o **escudo Master** (tipografia na arte).

| Versão | Status | Como gerar | Skills |
| ------ | ------ | ---------- | ------ |
| Master Mono positiva | Feito | — | — |
| Master Mono Branca | Feito | Invert RGB do Mono PNG; SVG com swap de fills | brand + Pillow |
| Master Color_Institucional | Feito | Recolor fills SVG com tokens `index.html` → raster | brand + Pillow |
| Master Color_Institucional_Reverso | Feito | Swap papel↔carvão (SVG + remap PNG); bronze mantido; escada Lanczos | brand + Pillow |
| Só símbolo | Falta | Redesign sem tipografia da borda | higgsfield-generate (`recraft_v4_1`) ou design/logo → homologação → vectorize → Pillow |
| Só wordmark | Falta | Redesign tipográfico | higgsfield-generate / design/logo → homologação → vectorize → Pillow |
| Lockup horizontal | Falta | Compor símbolo + wordmark | Após símbolo/wordmark: composição → brand → vectorize → Pillow |
| Lockup vertical | Falta | Compor empilhado | Idem lockup H |
| Hero editorial | Falta | Tratamento de impacto | higgsfield-generate → brand → Pillow |

Pipeline padrão após existir arte-fonte:

1. **brand** — nomear, clear space, usos, LEIA-ME  
2. **vectorize** (`svgsmith`) — SVG a partir de raster novo (neste escudo, preferir `color` + α; binary elimina campos)  
3. **Pillow** — escada PNG + WebP q82  
4. **image-convert** — conversão pontual PNG↔WebP  

Limite: o master é arte fundida. Lockups / só-símbolo / wordmark exigem nova arte + homologação humana.

Ordem sugerida do que ainda falta: só símbolo → wordmark → lockups H/V → hero.

## Governança

- Não inventar versões nem recolorir fora desta pasta / desta paleta documentada.
- Homologação pastoral/institucional da marca permanece decisão humana.
- Após incluir ou renomear arquivos, atualizar este LEIA-ME.
