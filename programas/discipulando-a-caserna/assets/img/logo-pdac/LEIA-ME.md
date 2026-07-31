# Logomarca — Discipulando a Caserna (PDAC)

Pasta canônica dos arquivos oficiais da marca do **Discipulando a Caserna**.

Não confundir com o brasão do **Projeto Caserna de Adulão** (contexto institucional). O protagonista visual desta apresentação é o Discipulando.

## Localização

| Caminho | Status |
|---|---|
| `assets/img/logo-pdac/` | **Canônico** — usar no site e na apresentação |
| `img/logo-pdac/` | Incorreto — não usar (removido após migração) |

Demais imagens do prospecto também vivem sob `assets/img/` (ex.: `licao1/`).

## Convenção de nomes

```
{FAMILIA}_DaC_{VARIANTE}_{ACABAMENTO}_{COR}.png
```

| Segmento | Significado |
|---|---|
| `LOGO_` / `ICON_` | Escudo completo ou ícone reduzido |
| `DaC` | Discipulando a Caserna |
| `Primaria_Hero_3D` | Render 3D para hero / destaque |
| `Master_Flat_2D` | Master flat colorido (uso geral na web) |
| `Emblema` | Escudo completo em 1 cor (sem tipografia) |
| `Mono` | Escudo completo monocromático |
| `Lockup_Horizontal` / `Lockup_Vertical` | Escudo + tipografia |
| `Wordmark_Horizontal` | Só tipografia |
| `Micro_XS` | Ícone de escudo simplificado (favicons, barra) |
| `Color_Institucional` | Polícromo da paleta oficial |
| `Color_Institucional_Reverso` | Polícromo invertido (fundos escuros) |
| `1C_Positiva_4A4A4A` | 1 cor cinza `#4A4A4A` — fundos claros |
| `1C_Negativa_F4F4F1` | 1 cor creme `#F4F4F1` — fundos escuros |
| `1C_Preta_000000` | Preto puro |
| `1C_Branca_FFFFFF` | Branco puro |
| `_40px` | Raster já redimensionado (~125×125) para UI |

Todos os PNGs são **RGBA com fundo transparente**.

## Paleta oficial (`Fundamentos_Paleta.png`)

| Cor | Hex | Uso típico |
|---|---|---|
| Navy | `#1A2A44` | Campos do escudo; tipografia secundária |
| Cinza positiva | `#4A4A4A` | Versões 1C em fundo claro |
| Bronze | `#8C6A46` | Traços, tipografia principal colorida |
| Creme | `#F4F4F1` | Versões 1C em fundo escuro; papel |
| Taupe | `#5B5349` | Apoio |

Alinhada aos tokens do prospecto (`--navy`, `--bronze`, `--creme` / `--papel`).

## Inventário (33 arquivos)

### Referência

| Arquivo | Uso |
|---|---|
| `Fundamentos_Paleta.png` | Amostra de paleta — não usar na UI |

### Primária e master

| Arquivo | Fundo | Uso recomendado |
|---|---|---|
| `LOGO_DaC_Primaria_Hero_3D_Color.png` | Escuro / hero | Destaque máximo (~2 MB; preferir master na web) |
| `LOGO_DaC_Master_Flat_2D_Color.png` | Claro ou escuro | **Padrão web**: abertura, seção da marca, apresentação |

### Emblema e mono (só escudo)

| Arquivo | Fundo |
|---|---|
| `LOGO_DaC_Emblema_1C_Branca_FFFFFF.png` | Escuro |
| `LOGO_DaC_Emblema_1C_Preta_000000.png` | Claro |
| `LOGO_DaC_Emblema_Metal_Latao.png` | Escuro / Sombra — emblema monocromático metalizado (latão); uso no storytelling S01/S52/S69 |
| `LOGO_DaC_Mono_Positiva_1C.png` | Claro |
| `LOGO_DaC_Mono_Negativa_1C.png` | Escuro |

### Lockup (escudo + “DISCIPULANDO A CASERNA” + linha do Projeto)

| Arquivo | Orientação | Fundo |
|---|---|---|
| `LOGO_DaC_Lockup_Horizontal_Color_Institucional.png` | Horizontal | Claro |
| `LOGO_DaC_Lockup_Horizontal_1C_Positiva_4A4A4A.png` | Horizontal | Claro |
| `LOGO_DaC_Lockup_Horizontal_1C_Preta_000000.png` | Horizontal | Claro |
| `LOGO_DaC_Lockup_Horizontal_1C_Negativa_F4F4F1.png` | Horizontal | Escuro |
| `LOGO_DaC_Lockup_Horizontal_1C_Branca_FFFFFF.png` | Horizontal | Escuro |
| `LOGO_DaC_Lockup_Vertical_Color_Institucional.png` | Vertical | Claro |
| `LOGO_DaC_Lockup_Vertical_1C_Positiva_4A4A4A.png` | Vertical | Claro |
| `LOGO_DaC_Lockup_Vertical_1C_Preta_000000.png` | Vertical | Claro |
| `LOGO_DaC_Lockup_Vertical_1C_Negativa_F4F4F1.png` | Vertical | Escuro |
| `LOGO_DaC_Lockup_Vertical_1C_Branca_FFFFFF.png` | Vertical | Escuro |

A linha “Uma iniciativa do Projeto Caserna de Adulão” nas versões coloridas usa navy — legível em fundo claro.

### Wordmark (só tipografia)

| Arquivo | Fundo |
|---|---|
| `LOGO_DaC_Wordmark_Horizontal_Color_Institucional.png` | Claro |
| `LOGO_DaC_Wordmark_Horizontal_1C_Positiva_4A4A4A.png` | Claro |
| `LOGO_DaC_Wordmark_Horizontal_1C_Preta_000000.png` | Claro |
| `LOGO_DaC_Wordmark_Horizontal_1C_Negativa_F4F4F1.png` | Escuro |
| `LOGO_DaC_Wordmark_Horizontal_1C_Branca_FFFFFF.png` | Escuro |

### Ícone micro (escudo simplificado em quatro campos)

| Arquivo | Fundo / nota |
|---|---|
| `ICON_DaC_Micro_XS_Color_Institucional.png` | Claro / geral |
| `ICON_DaC_Micro_XS_Color_Institucional_40px.png` | Idem, UI pequena |
| `ICON_DaC_Micro_XS_Color_Institucional_Reverso.png` | Escuro |
| `ICON_DaC_Micro_XS_Color_Institucional_Reverso_40px.png` | Escuro, UI |
| `ICON_DaC_Micro_XS_1C_Positiva_4A4A4A.png` (+ `_40px`) | Claro |
| `ICON_DaC_Micro_XS_1C_Negativa_F4F4F1.png` (+ `_40px`) | Escuro |
| `ICON_DaC_Micro_XS_1C_Preta_000000.png` | Claro |
| `ICON_DaC_Micro_XS_1C_Branca_FFFFFF.png` | Escuro |

## Uso no prospecto (mapeamento)

| Superfície | Arquivo |
|---|---|
| Favicon | `ICON_DaC_Micro_XS_Color_Institucional_40px.png` |
| Barra (papel) | `ICON_DaC_Micro_XS_Color_Institucional_40px.png` |
| Barra (sobre navy) | `ICON_DaC_Micro_XS_Color_Institucional_Reverso_40px.png` |
| Abertura (hero navy) | `LOGO_DaC_Master_Flat_2D_Color.png` |
| Seção 7 — A marca | `LOGO_DaC_Master_Flat_2D_Color.png` |
| Apresentação (Tela 22) | `LOGO_DaC_Master_Flat_2D_Color.png` |

Arquivos legados de estudo: `assets/img/brasao.svg`, `assets/img/marca-escudo.svg`, `assets/img/favicon.svg` — mantidos no repositório, mas **não** são a fonte visual ativa do prospecto.

## Governança

- Não inventar versões nem recolorir fora desta pasta.
- Homologação pastoral da marca permanece decisão humana (`TODO.md` / checklist da apresentação).
- Após incluir ou renomear arquivos, atualizar este LEIA-ME e o mapeamento acima.
