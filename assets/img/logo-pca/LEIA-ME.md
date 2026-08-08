# Logomarca — Projeto Caserna de Adulão (PCA)

Pasta canônica dos arquivos oficiais da marca institucional do **Projeto Caserna de Adulão**.

Não confundir com a marca do **Discipulando a Caserna** (`programas/discipulando-a-caserna/assets/img/logo-pdac/`).

## Uma colorway · várias configurações

| Conceito | Valor |
| -------- | ----- |
| **Colorway** | Somente `Mono_1C` |
| **Tinta do wordmark** | `#000000` em fundo transparente |
| **Master canônico** | `LOGO_PCA_Master_Mono_1C.webp` (imutável) |

Configurações estruturais ≠ variantes cromáticas. Não existem Branca, Color ou Reverso no kit.

A paleta institucional (carvão / papel / bronze) permanece nos tokens de **interface**. Em fundos escuros, use placa `--color-papel` — nunca inverta a logomarca.

## Configurações oficiais

| Configuração | Arquivo base | Status | Função |
| ------------ | ------------ | ------ | ------ |
| **Master** | `LOGO_PCA_Master_Mono_1C` | Canônica | Logomarca autônoma |
| **Lockup Vertical** | `LOGO_PCA_Lockup_Vertical_Mono_1C` | Oficial | Assinatura empilhada |
| **Lockup Horizontal** | `LOGO_PCA_Lockup_Horizontal_Mono_1C` | Oficial | Assinatura em faixa |
| **Wordmark Stacked** | `LOGO_PCA_Wordmark_Stacked_Mono_1C` | Auxiliar | Texto 2 linhas sem Master |
| **Wordmark Horizontal** | `LOGO_PCA_Wordmark_Horizontal_Mono_1C` | Auxiliar | Linha única ultrawide |

### Candidatos rejeitados

| Candidato | Motivo |
| --------- | ------ |
| Lockup Vertical Compact | Só redimensionamento; escada `_180`/`_128` basta |
| Lockup Horizontal Compact | Escada `_240`/`_180` cobre headers estreitos |
| Wordmark em 3 linhas | Duplicaria o Stacked sem ganho |

### Proibido (fora de escopo)

Shield-only extraído, submark, monograma, outline, sombra, gradiente, espelho, rotação, colorways alternativas, favicon redesenhado.

## Geometrias

| Configuração | Master (px) | Proporção |
| ------------ | ----------- | --------- |
| Master | 1563×1563 | 1∶1 |
| Lockup Vertical | 1781×2080 | ≈0,856 |
| Lockup Horizontal | 2313×1008 | ≈2,295 |
| Wordmark Stacked | 2052×400 | ≈5,13 |
| Wordmark Horizontal | 2379×239 | ≈9,95 |

## Escadas de exportação

| Configuração | Sufixos (largura) |
| ------------ | ----------------- |
| Master | `_800` `_400` `_180` `_128` `_64` `_32` |
| Lockup Vertical | `_400` `_180` `_128` |
| Lockup Horizontal | `_800` `_400` `_240` `_180` |
| Wordmarks | `_800` `_400` `_240` `_180` |

Formatos: SVG + PNG + WebP. Lockups com Master = SVG **híbrido** (WebP `data:` + contornos). Wordmarks = SVG vetorial (paths `#000000`).

## Tipografia (wordmarks / lockups)

- `PROJETO`: Palatino Linotype Regular, tracking aberto
- `CASERNA DE ADULÃO`: Palatino Linotype Bold
- Contornos via fontTools na máquina de build (`pala.ttf` / `palab.ttf` **não** versionados)
- Pipeline: `marca/scripts/generate_logo_system.py`

## Seleção por contexto

| Contexto | Preferência |
| -------- | ----------- |
| Favicon / avatar | Master |
| Header mobile | Master (+ texto editorial opcional) |
| Header desktop amplo | Lockup Horizontal |
| Hero | Master (ou Lockup Horizontal se o nome não estiver no copy) |
| Capa / encerramento vertical | Lockup Vertical |
| Documento / ofício | Lockup Horizontal |
| Master já visível no mesmo contexto | Wordmark Stacked |
| Crédito / rodapé ultrawide | Wordmark Horizontal (mín. largura ~400 px) |

Wordmarks **não** substituem o Master como logomarca.

## Tamanhos mínimos (orientação)

| Configuração | Mínimo confortável |
| ------------ | ------------------ |
| Master | 32 px (favicon); 64–128 UI |
| Lockup Vertical | 180 px de largura (128 só próximo) |
| Lockup Horizontal | 240 px de largura |
| Wordmark Stacked | 240 px |
| Wordmark Horizontal | **400 px** (abaixo disso a altura fica ilegível) |

## Uso na página institucional

| Superfície | Asset |
| ---------- | ----- |
| Favicon / OG | Master `_128` / `_800` |
| Header &lt;900 px | Master `_128` + placa papel |
| Header ≥900 px | Lockup Horizontal `_240` + placa papel |
| Hero | Master `_180` + placa papel |
| Encerramento | Lockup Vertical `_180` + placa papel |
| Footer | Master `_128` + placa papel |

## Pipeline e QA

```bash
python marca/scripts/generate_logo_system.py
python marca/scripts/generate_logo_system.py --config Lockup_Horizontal
```

Compatibilidade: `generate_lockup_vertical.py` delega ao sistema (gera só Lockup Vertical).

Evidências: `marca/laboratorio/_qa/LOGO_SYSTEM_CANDIDATES_BOARD.png`, `logo_system_build_report.json`.

## Governança

- Colorway fechada em `Mono_1C`. Novas cores exigem gate humano.
- Não regenerar nem alterar o Master WebP canônico.
- Após incluir ou renomear arquivos, atualizar este LEIA-ME.
