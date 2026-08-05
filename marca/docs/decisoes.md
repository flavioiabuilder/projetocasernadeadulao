# Decisões humanas — marca PCA

Log de gates e fatos inventariados. Status: `fato` | `candidato` | `adiado` | `homologado`.

Atualizado: 2026-08-05.

## Inventário (Onda 0) — fatos

| ID | Assunto | Status | Nota |
|----|---------|--------|------|
| F1 | Marca institucional ≠ Discipulando a Caserna | fato | Ver `assets/img/logo-pca/LEIA-ME.md` |
| F2 | Paleta viva em `index.html` `:root` | fato | Extraída para `marca/tokens/tokens.json` |
| F3 | Logo kit atual = Master apenas (4 acabamentos de cor) | fato | Símbolo/wordmark/lockups faltam |
| F4 | Skills `brand`, `design`, `design-system`, `frontend-design`, `impeccable` instaladas | fato | SoT em `marca/`, não defaults ClaudeKit na raiz |
| F5 | Tipografia atual: Iowan/Palatino stack + system-ui | fato | Sem web fonts licenciadas ainda |
| F6 | Motion na home: reveal + durações/easings em tokens | fato | Nível “presença sóbria” |

## Gates humanos (Onda 2)

| ID | Decisão | Status | Default enquanto pendente |
|----|---------|--------|---------------------------|
| H1 | Homologar colorização `Color_Institucional` | candidato | Lab e guidelines marcam candidato; cores já documentadas no LEIA-ME |
| H2 | Completar kit (símbolo, wordmark, lockups H/V, hero) | adiado | Brand book usa Master-only |
| H3 | Faces tipográficas finais (web fonts vs stacks atuais) | adiado | Manter stacks de `index.html` |
| H4 | Tom de voz institucional PCA (3–5 traços) | adiado | Cap. Voz = pendente de homologação; sem inventar doutrina |
| H5 | Nível de motion | candidato | **Presença sóbria** (fade/translate curtos; ver `motion-spec.md`) |
| H6 | Publicar lab no GitHub Pages | adiado | Lab **só local** (`npx serve` / abrir arquivo) |

## Skills — adaptação de caminhos

| Expectativa ClaudeKit | Caminho PCA |
|-----------------------|-------------|
| `docs/brand-guidelines.md` | `marca/docs/brand-guidelines.md` |
| `assets/design-tokens.json` | `marca/tokens/tokens.json` |
| `assets/design-tokens.css` | `marca/tokens/tokens.css` |
| sync skill genérico | `npm run generate:marca:tokens` |

Não rodar `sync-brand-to-tokens.cjs` da skill apontando para a raiz — poluiria paths que este repo não usa.
