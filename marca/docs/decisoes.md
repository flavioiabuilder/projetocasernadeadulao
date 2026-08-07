# Decisões humanas — marca PCA

Log de gates e fatos inventariados. Status: `fato` | `candidato` | `adiado` | `homologado` | `decidido`.

Atualizado: 2026-08-07 (kit de logomarca reduzido a `Mono_1C`).

## Inventário — fatos

| ID | Assunto | Status | Nota |
|----|---------|--------|------|
| F1 | Marca institucional ≠ Discipulando a Caserna | fato | Ver `assets/img/logo-pca/LEIA-ME.md` |
| F2 | Paleta viva via `marca/tokens/` | fato | Consumida por `index.html` (UI — não gera logo colorida) |
| F3 | Logomarca = escudo Master `Mono_1C` | fato | Tipografia fundida na arte; única variante do kit |
| F7 | Lockup Vertical = Master + wordmark editorial (2 linhas) | fato | Fonte: `LOGO_PCA_Master_Mono_1C.webp`. Palatino Regular/Bold. SVG híbrido. Geometria 1781×2080 |
| F8 | Kit de logomarca = somente `Mono_1C` | fato | Sem Branca, Color ou Reverso. Novas cores exigem gate |
| F4 | Skills brand/design/design-system instaladas | fato | SoT em `marca/` |
| F5 | Tipografia: stacks Iowan/Palatino + system-ui | fato | H3 homologado — sem web fonts por ora |
| F6 | Motion: presença sóbria | fato | H5 homologado |

## Gates humanos

| ID | Decisão | Status | Registro |
|----|---------|--------|----------|
| H1 | Homologar paleta institucional (carvão/papel/bronze) | **homologado** | 2026-08-05 — tokens de **interface**. **Não** autoriza logomarca colorida (ver H2c). |
| H2 | Arquitetura do logo | **decidido** | Master = logo. Lockup Vertical = composição opcional. Sem símbolo avulso nem lockup H obrigatórios. |
| H2b | Remover `Color_Institucional_Reverso` | **decidido** | 2026-08-07 — **histórico:** reversa colorida saiu do kit. |
| H2c | Kit de logomarca = somente `Mono_1C` | **decidido** | 2026-08-07 — removidas Branca e Color. Fundos escuros: placa `--color-papel`, sem inverter a marca. |
| H3 | Faces tipográficas finais | **homologado** | Manter stacks atuais (`--font-display` / `--font-sans`). Web fonts licenciadas só com novo gate. |
| H4 | Tom de voz institucional (3–5 traços) | **homologado** | Traços derivados da prosa já publicada em `index.html` — ver guidelines §7. Sem doutrina inventada. |
| H5 | Nível de motion | **homologado** | Presença sóbria (`motion-spec.md`); já implementada na home e no lab. |
| H6 | Publicar lab no GitHub Pages | **decidido** | Lab **só local**. Não entra no artefato Pages nesta fase. |

## Skills — caminhos

| Expectativa ClaudeKit | Caminho PCA |
|-----------------------|-------------|
| `docs/brand-guidelines.md` | `marca/docs/brand-guidelines.md` |
| `assets/design-tokens.*` | `marca/tokens/tokens.*` |
| sync | `npm run generate:marca:tokens` |
