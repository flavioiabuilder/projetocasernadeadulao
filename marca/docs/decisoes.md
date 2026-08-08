# Decisões humanas — marca PCA

Log de gates e fatos inventariados. Status: `fato` | `candidato` | `adiado` | `homologado` | `decidido`.

Atualizado: 2026-08-07 (fundos Transparent + White_FFFFFF na colorway Mono_1C).

## Inventário — fatos

| ID | Assunto | Status | Nota |
|----|---------|--------|------|
| F1 | Marca institucional ≠ Discipulando a Caserna | fato | Ver `assets/img/logo-pca/LEIA-ME.md` |
| F2 | Paleta viva via `marca/tokens/` | fato | UI apenas — não gera colorway de logo |
| F3 | Logomarca canônica = Master `Mono_1C` | fato | Tipografia fundida; fonte `LOGO_PCA_Master_Mono_1C.webp` |
| F7 | Lockups / wordmarks = configurações estruturais | fato | Mesma colorway; tipografia Palatino; tinta `#000000` |
| F8 | Colorway única = `Mono_1C` | fato | Sem Branca/Color/Reverso |
| F9 | Dois fundos oficiais | fato | Transparente (canônico) e `_BG_White_FFFFFF` — não é colorway |
| F4 | Skills brand/design/design-system instaladas | fato | SoT em `marca/` |
| F5 | Tipografia: stacks Iowan/Palatino + system-ui | fato | H3 homologado — sem web fonts por ora |
| F6 | Motion: presença sóbria | fato | H5 homologado |

## Gates humanos

| ID | Decisão | Status | Registro |
|----|---------|--------|----------|
| H1 | Homologar paleta institucional (carvão/papel/bronze) | **homologado** | Tokens de **interface**. Não autoriza logo colorida. |
| H2 | Arquitetura do logo | **decidido** | Master = logo canônica. Configurações oficiais: Lockup Vertical, Lockup Horizontal. Auxiliares: Wordmark Stacked, Wordmark Horizontal. Fundos autorizados: Transparente e Branco `#FFFFFF` (`_BG_White_FFFFFF`). Fundo branco ≠ logo branca/reversa. Proibido criar colorways sem gate. Rejeitados: compactos e wordmark 3 linhas. |
| H2b | Remover `Color_Institucional_Reverso` | **decidido** | **Histórico** — 2026-08-07. |
| H2c | Colorway = somente `Mono_1C` | **decidido** | Fundos escuros → asset `_BG_White_FFFFFF` **ou** placa CSS — nunca ambos; nunca inverter a marca. |
| H3 | Faces tipográficas finais | **homologado** | Stacks `--font-display` / `--font-sans`. |
| H4 | Tom de voz institucional (3–5 traços) | **homologado** | Ver guidelines §7. |
| H5 | Nível de motion | **homologado** | Presença sóbria. |
| H6 | Publicar lab no GitHub Pages | **decidido** | Lab **só local**. |

## Skills — caminhos

| Expectativa ClaudeKit | Caminho PCA |
|-----------------------|-------------|
| `docs/brand-guidelines.md` | `marca/docs/brand-guidelines.md` |
| `assets/design-tokens.*` | `marca/tokens/tokens.*` |
| sync | `npm run generate:marca:tokens` |
