# Decisões humanas — marca PCA

Log de gates e fatos inventariados. Status: `fato` | `candidato` | `adiado` | `homologado` | `decidido`.

Atualizado: 2026-08-07 (remoção de `Color_Institucional_Reverso` do kit).

## Inventário — fatos

| ID | Assunto | Status | Nota |
|----|---------|--------|------|
| F1 | Marca institucional ≠ Discipulando a Caserna | fato | Ver `assets/img/logo-pca/LEIA-ME.md` |
| F2 | Paleta viva via `marca/tokens/` | fato | Consumida por `index.html` |
| F3 | Logomarca = escudo Master (4 acabamentos de cor) | fato | Tipografia fundida na arte |
| F7 | Lockup Vertical = Master + wordmark editorial (2 linhas) | fato | Fonte superior: `LOGO_PCA_Master_Mono_1C.webp` (integral). Palatino Regular/Bold. SVG **híbrido** (WebP `data:` + contornos). Geometria 1781×2080. Não substitui o Master |
| F8 | Kit cromático = 3 variantes | fato | `Mono_1C`, `Mono_1C_Branca_FFFFFF`, `Color_Institucional`. Sem novas cores até gate explícito |
| F4 | Skills brand/design/design-system instaladas | fato | SoT em `marca/` |
| F5 | Tipografia: stacks Iowan/Palatino + system-ui | fato | H3 homologado — sem web fonts por ora |
| F6 | Motion: presença sóbria | fato | H5 homologado |

## Gates humanos

| ID | Decisão | Status | Registro |
|----|---------|--------|----------|
| H1 | Homologar colorização `Color_Institucional` | **homologado** | 2026-08-05 — paleta carvão/papel/bronze; única versão colorida autorizada. Revisão pastoral pontual permanece possível sem reabrir o gate. |
| H2 | Arquitetura do logo | **decidido** | Master = logo. Lockup Vertical = composição opcional. Sem símbolo avulso nem lockup H obrigatórios. |
| H2b | Remover `Color_Institucional_Reverso` | **decidido** | 2026-08-07 — **histórico:** a variante reversa colorida saiu do kit. Fundos escuros → `Mono_1C_Branca_FFFFFF`. Não regenerar Reverso nem criar novas cores sem decisão explícita. |
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
