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
| `Master`     | Master oficial entregue                          |
| `Mono_1C`    | Monocromático (preto / branco) — positiva        |
| `Mono_1C_Branca_FFFFFF` | Mesma arte invertida (reversed)         |
| `_800` … `_32` | Derivados web por lado máximo (px)             |

Cada PNG canônico tem um `.webp` irmão (mesmo basename, quality ~82). **Manter os PNG** como fonte/fallback; preferir WebP no runtime.

Há também um `.svg` por variante de cor (mesmo basename). Os PNG/WebP
originais permanecem; o SVG é variação adicional (escala livre, edição de paths).
O SVG preserva preenchimentos pretos e brancos com fundo transparente —
não usar traço binary-only (elimina um dos campos do escudo).

## Variantes de cor

| Variante | Arte | Fundo recomendado |
| -------- | ---- | ----------------- |
| `Mono_1C` | Campo escuro, elementos claros | Claro / papel |
| `Mono_1C_Branca_FFFFFF` | Campo claro, elementos escuros (invertida) | Escuro / foto escura |

A Branca é derivada da positiva por inversão RGB com alfa preservado (PNG) e swap de fills no SVG canônico — não é redesign.

## Inventário

### Positiva (`Mono_1C`)

| Arquivo                            | Uso recomendado                          |
| ---------------------------------- | ---------------------------------------- |
| `LOGO_PCA_Master_Mono_1C.png`      | Fonte / arquivo master (1563×1563)       |
| `LOGO_PCA_Master_Mono_1C.webp`     | Idem, WebP                               |
| `LOGO_PCA_Master_Mono_1C.svg`      | Vetor (P+B; fundo α)                     |
| `LOGO_PCA_Master_Mono_1C_800.*`    | Hero retina / OG                         |
| `LOGO_PCA_Master_Mono_1C_400.*`    | Hero / destaque médio                    |
| `LOGO_PCA_Master_Mono_1C_180.*`    | Apple Touch Icon                         |
| `LOGO_PCA_Master_Mono_1C_128.*`    | Header, footer, favicon (uso atual)      |
| `LOGO_PCA_Master_Mono_1C_64.*`     | UI compacta                              |
| `LOGO_PCA_Master_Mono_1C_32.*`     | Favicon 32px                             |

### Reversed (`Mono_1C_Branca_FFFFFF`)

| Arquivo                                         | Uso recomendado                |
| ----------------------------------------------- | ------------------------------ |
| `LOGO_PCA_Master_Mono_1C_Branca_FFFFFF.png`     | Master reversed (1563×1563)    |
| `LOGO_PCA_Master_Mono_1C_Branca_FFFFFF.webp`    | Idem, WebP                     |
| `LOGO_PCA_Master_Mono_1C_Branca_FFFFFF.svg`     | Vetor reversed (fundo α)       |
| `LOGO_PCA_Master_Mono_1C_Branca_FFFFFF_800.*`   | Hero / OG em fundo escuro      |
| `LOGO_PCA_Master_Mono_1C_Branca_FFFFFF_400.*`   | Destaque médio em fundo escuro |
| `LOGO_PCA_Master_Mono_1C_Branca_FFFFFF_180.*`   | Touch icon em chrome escuro    |
| `LOGO_PCA_Master_Mono_1C_Branca_FFFFFF_128.*`    | Header/footer em fundo escuro  |
| `LOGO_PCA_Master_Mono_1C_Branca_FFFFFF_64.*`     | UI compacta                    |
| `LOGO_PCA_Master_Mono_1C_Branca_FFFFFF_32.*`     | Favicon 32px                   |

Rasters derivados: downscale Lanczos a partir do master da mesma variante (sem upscale).

## Uso na página institucional (`index.html`)

| Superfície | Arquivo                              |
| ---------- | ------------------------------------ |
| Favicon    | `LOGO_PCA_Master_Mono_1C_128.webp` (+ PNG fallback) |
| Header     | `LOGO_PCA_Master_Mono_1C_128.*`      |
| Hero       | `LOGO_PCA_Master_Mono_1C_128.*` (~5rem)  |
| Footer     | `LOGO_PCA_Master_Mono_1C_128.*`      |
| OG/Twitter | `LOGO_PCA_Master_Mono_1C_800.png`    |

Em superfícies escuras, preferir a família `…_Branca_FFFFFF_*`.

## Governança

- Não inventar versões nem recolorir fora desta pasta.
- Homologação pastoral/institucional da marca permanece decisão humana.
- Após incluir ou renomear arquivos, atualizar este LEIA-ME.
