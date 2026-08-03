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
| `Mono_1C`    | Monocromático (preto / branco)                   |
| `_800` / `_400` / `_128` | Derivados web por lado máximo (px) |

Cada PNG canônico tem um `.webp` irmão (mesmo basename, quality ~82). **Manter os PNG** como fonte/fallback; preferir WebP no runtime.

## Inventário

| Arquivo                            | Uso recomendado                          |
| ---------------------------------- | ---------------------------------------- |
| `LOGO_PCA_Master_Mono_1C.png`      | Fonte / arquivo master (~1563×1563)      |
| `LOGO_PCA_Master_Mono_1C.webp`     | Idem, WebP                               |
| `LOGO_PCA_Master_Mono_1C_800.*`    | Hero retina / OG                         |
| `LOGO_PCA_Master_Mono_1C_400.*`    | Hero / destaque médio                    |
| `LOGO_PCA_Master_Mono_1C_128.*`    | Header, favicon, footer                  |

## Uso na página institucional (`index.html`)

| Superfície | Arquivo                              |
| ---------- | ------------------------------------ |
| Favicon    | `LOGO_PCA_Master_Mono_1C_128.webp` (+ PNG fallback) |
| Header     | `LOGO_PCA_Master_Mono_1C_128.*`      |
| Hero       | `LOGO_PCA_Master_Mono_1C_400.*` / `_800.*` (srcset) |
| Footer     | `LOGO_PCA_Master_Mono_1C_128.*`      |
| OG/Twitter | `LOGO_PCA_Master_Mono_1C_800.png`    |

## Governança

- Não inventar versões nem recolorir fora desta pasta.
- Homologação pastoral/institucional da marca permanece decisão humana.
- Após incluir ou renomear arquivos, atualizar este LEIA-ME.
