# Logomarca — Projeto Caserna de Adulão (PCA)

Pasta canônica dos arquivos oficiais da marca institucional do **Projeto Caserna de Adulão**.

Não confundir com a marca do **Discipulando a Caserna** (`programas/discipulando-a-caserna/assets/img/logo-pdac/`).

## Eixos do sistema

| Eixo | Valores |
| ---- | ------- |
| **Colorway** | Somente `Mono_1C` |
| **Configuração** | Master · Lockup Vertical · Lockup Horizontal · Wordmark Stacked · Wordmark Horizontal |
| **Fundo** | Transparente (canônico) · Branco `#FFFFFF` (`_BG_White_FFFFFF`) |
| **Formato** | SVG · PNG · WebP |
| **Tamanho** | master + escada (`_800`, `_400`, …) |

A tinta do wordmark é `#000000`. O Master canônico é imutável:
`LOGO_PCA_Master_Mono_1C.webp`.

### Fundo branco ≠ logo branca

O sufixo `_BG_White_FFFFFF` significa **canvas** preenchido com `#FFFFFF`. A arte da
logomarca permanece Mono_1C (preto). Não é:

- nova colorway;
- versão branca / reversa da marca;
- recoloração;
- placa de interface.

Não use nomes como `Branca_FFFFFF`, `Color_Institucional` ou `Reverso`.

A paleta institucional (carvão / papel / bronze) permanece nos tokens de **interface**.

## Configurações oficiais

| Configuração | Arquivo base (transparente) | Status | Função |
| ------------ | --------------------------- | ------ | ------ |
| **Master** | `LOGO_PCA_Master_Mono_1C` | Canônica | Logomarca autônoma |
| **Lockup Vertical** | `LOGO_PCA_Lockup_Vertical_Mono_1C` | Oficial | Assinatura empilhada |
| **Lockup Horizontal** | `LOGO_PCA_Lockup_Horizontal_Mono_1C` | Oficial | Assinatura em faixa |
| **Wordmark Stacked** | `LOGO_PCA_Wordmark_Stacked_Mono_1C` | Auxiliar | Texto 2 linhas sem Master |
| **Wordmark Horizontal** | `LOGO_PCA_Wordmark_Horizontal_Mono_1C` | Auxiliar | Linha única ultrawide |

Cada configuração aprovada existe também com fundo branco:

```text
LOGO_PCA_<Config>_Mono_1C_BG_White_FFFFFF[.svg|.png|.webp]
LOGO_PCA_<Config>_Mono_1C_BG_White_FFFFFF_<largura>.[png|webp]
```

A ausência de segmento de fundo no nome = transparente. Não há `_BG_Transparent`.

### Candidatos rejeitados

| Candidato | Motivo |
| --------- | ------ |
| Lockup Vertical Compact | Só redimensionamento; escada `_180`/`_128` basta |
| Lockup Horizontal Compact | Escada `_240`/`_180` cobre headers estreitos |
| Wordmark em 3 linhas | Duplicaria o Stacked sem ganho |

### Proibido (fora de escopo)

Shield-only extraído, submark, monograma, outline, sombra, gradiente, espelho,
rotação, colorways alternativas, favicon redesenhado, logo branca/reversa.

## Geometrias

Versões transparente e branca de uma mesma configuração compartilham largura,
altura, `viewBox`, escala, alinhamento e paths. Só muda o tratamento do canvas.

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

Formatos: SVG + PNG + WebP. Lockups com Master = SVG **híbrido** (WebP `data:` +
contornos). Wordmarks = SVG vetorial (paths `#000000`). SVG branco inclui
`<rect width="100%" height="100%" fill="#FFFFFF"/>` como primeiro elemento visual.

## Tipografia (wordmarks / lockups)

- `PROJETO`: Palatino Linotype Regular, tracking aberto
- `CASERNA DE ADULÃO`: Palatino Linotype Bold
- Contornos via fontTools na máquina de build (`pala.ttf` / `palab.ttf` **não** versionados)
- Pipeline: `marca/scripts/generate_logo_system.py`

## Seleção por contexto

### Configuração

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

### Fundo

| Contexto | Fundo preferido |
| -------- | --------------- |
| Superfície clara / uniforme | Transparente |
| Superfície branca / documento | Transparente |
| Superfície escura | Branco (`_BG_White_FFFFFF`) |
| Fotografia / contraste incerto | Branco |
| Exportação genérica | Transparente |
| Arquivo para terceiros | Disponibilizar ambos |

**Escolha entre asset branco e placa CSS — nunca ambos.** Em fundos escuros do
site, preferir o asset `_BG_White_FFFFFF` e remover a placa improvisada.

## Tamanhos mínimos (orientação)

| Configuração | Mínimo confortável |
| ------------ | ------------------ |
| Master | 32 px (favicon); 64–128 UI |
| Lockup Vertical | 180 px de largura (128 só próximo) |
| Lockup Horizontal | 240 px de largura |
| Wordmark Stacked | 240 px |
| Wordmark Horizontal | **400 px** (abaixo disso a altura fica ilegível) |

Clear space ≈ ¼ da altura do escudo (ou do bloco tipográfico, nos wordmarks).

## Uso na página institucional

| Superfície | Asset |
| ---------- | ----- |
| Favicon / OG | Master transparente `_128` / `_800` |
| Header &lt;900 px | Master `_BG_White_FFFFFF_128` |
| Header ≥900 px | Lockup Horizontal `_BG_White_FFFFFF_240` |
| Hero | Master `_BG_White_FFFFFF_180` |
| Encerramento | Lockup Vertical `_BG_White_FFFFFF_180` |
| Footer | Master `_BG_White_FFFFFF_128` |

## Pipeline e QA

```bash
python marca/scripts/generate_logo_system.py
python marca/scripts/generate_logo_system.py --config Lockup_Horizontal
python marca/scripts/generate_logo_system.py --background White_FFFFFF
python marca/scripts/generate_logo_system.py --config Master --background White_FFFFFF
```

O pipeline rejeita colorways ≠ `Mono_1C` e fundos não autorizados. Não modifica o
Master canônico. Valida dimensões, alpha, cores proibidas no wordmark e
compara transparente∘branco versus asset branco (`MAE 0`).

Compatibilidade: `generate_lockup_vertical.py` delega ao sistema.

Evidências: `marca/laboratorio/_qa/LOGO_SYSTEM_BG_QA_BOARD.png`,
`LOGO_SYSTEM_CANDIDATES_BOARD.png`, `logo_system_build_report.json`.

## Governança

- Colorway fechada em `Mono_1C`. Novas cores exigem gate humano.
- Dois fundos autorizados: transparente e branco — sem confundir com colorway.
- Não regenerar nem alterar o Master WebP canônico.
- Após incluir ou renomear arquivos, atualizar este LEIA-ME.
