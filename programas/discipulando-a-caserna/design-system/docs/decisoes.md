# Decisões humanas — marca Discipulando a Caserna

Log de gates e fatos inventariados. Status: `fato` | `candidato` | `adiado` | `homologado`.

Atualizado: 2026-08-05.

## Inventário (Onda 0) — fatos

| ID | Assunto | Status | Nota |
|----|---------|--------|------|
| F1 | Marca do programa ≠ PCA institucional | fato | Ver `assets/img/logo-pdac/LEIA-ME.md` e `marca/` na raiz |
| F2 | Paleta e tipografia no Guia §1.6 / `conteudo/identidade.md` | fato | Navy, bronze Guia, creme; Montserrat + Source Serif 4 |
| F3 | Kit de logo rico já existe | fato | Master, Emblema, Lockups H/V, Wordmark, Micro, Hero 3D em `logo-pdac/` |
| F4 | Tokens ME-T em `design-system/tokens/` (candidato `0.1.0-candidate`) | fato | Primitivos + semânticos; contratos `dc-*` fora do JSON |
| F5 | Direção visual A homologada | fato | `docs/decisao-visual-v1.md` — prospecto pastoral editorial |
| F6 | Skills `brand`, `design`, `design-system`, `frontend-design`, `impeccable` instaladas | fato | SoT humano em `design-system/docs/`, não defaults ClaudeKit nem `marca/` |
| F7 | Drift bronze Guia `#8C6A45` vs logo `#8C6A46` | fato | Ambos no `tokens.json` (500 vs 600); semântica usa 500 |
| F8 | Lab e DS não publicam no GitHub Pages | fato | Normativo em `laboratorio/README.md` |
| F9 | Runtime dos protótipos ainda não consome `design-system/styles` | fato | Migração = Fase 6; fora deste brand book |

## Gates humanos (Onda 2)

| ID | Decisão | Status | Default enquanto pendente |
|----|---------|--------|---------------------------|
| H1 | Homologar colorização / paleta oficial (incl. drift bronze Guia vs logo) | candidato | Lab e guidelines marcam candidato; cores documentadas no Guia e LEIA-ME |
| H2 | Matriz oficial de uso do kit (Master Flat vs Lockup vs Emblema vs Wordmark vs Hero 3D vs Micro) | candidato | LEIA-ME “Uso no prospecto” como matriz candidata; lab documenta inventário |
| H3 | Faces tipográficas digitais finais (CDN/self-host, pesos) | adiado | Manter Montserrat + Source Serif 4 como no Guia; sem CDN no lab (e2e offline) |
| H4 | Tom de voz do programa (3–5 traços operacionais homologados) | adiado | Cap. Voz lista só restrições já autorizadas nas regras/`conteudo`; sem inventar doutrina |
| H5 | Nível de motion | candidato | **Mínimo e progressivo** (Direção A); ver `motion-spec.md` |
| H6 | Publicar lab no GitHub Pages | adiado | Lab **só local** (`npx serve` / abrir arquivo) |

## Skills — adaptação de caminhos

| Expectativa ClaudeKit | Caminho DaC |
|-----------------------|-------------|
| `docs/brand-guidelines.md` | `programas/discipulando-a-caserna/design-system/docs/brand-guidelines.md` |
| `assets/design-tokens.json` | `…/design-system/tokens/tokens.json` |
| `assets/design-tokens.css` | `…/design-system/tokens/tokens.css` |
| sync skill genérico | `npm run generate:discipulando:tokens` |

Não apontar sync ClaudeKit para a raiz nem para `marca/` (PCA).

## Relação com PCA

Brand book institucional: [`marca/`](../../../../marca/).  
Não misturar kits, tokens ou messaging sem decisão humana explícita.
