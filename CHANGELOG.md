# Changelog

## [Unreleased]

### Auditoria integral (qualidade e governança)

- Gate `validate` alinhado à CI: encoding read-only, paridade editorial, apresentação gerada, Prettier, lint CSS/JS e Guia Mestre.
- Testes do storytelling-v1 alinhados aos controles atuais; fixture DOCX sem depender de `zip` externo.
- `js/dados/licao1.js` passa a ser gerado a partir de `assets/img/licao1/manifest.json`.
- Removidos `js/marcha.js` (código morto) e `fontes/guia-mestre/_guia_tmp.pdf`.
- Skills canônicas em `.claude/skills/`; duplicata `.github/skills/` removida.
- Pages: workflow de artefato filtrado (`docs/publicacao.md`) + `404.html`.
- Hierarquia de headings do Movimento I corrigida (`h2` “A necessidade”).
- Open Graph/Twitter usam master flat 2D (menor) em vez do PNG hero 3D.
- Corrigido `lines.join` quebrado no JS do storytelling-v1 (token inválido impedia cópia/mailto).

### Logomarca oficial (PDAC)

- Arquivos em `assets/img/logo-pdac/` (canônico; inventário em `LEIA-ME.md`).
- Prospecto: favicon, barra (clara/navy), abertura e seção 7 usam a marca oficial.
- Apresentação (Tela 22): master flat colorida; tag de apreciação pastoral pendente.

### Consistência visual (onda 1–2)

- Arquivados `prospecto.css` e `atos.css` (não linkados) em `legado/css/`.
- Tokens `--rotulo*` / `--traco*` em `tokens.css`; literais migrados no CSS vivo.
- Abertura sem RGBA hardcoded; `font-weight: 500` → 400; seção 12 em `--creme`.
- Sumário em painel papel; regra bronze vs bronze-cl documentada.
- `componentes.css` partido em `nav.css`, `editorial.css`, `escudo.css`, `curricular.css`.

### Apresentação de homologação (irmão do prospecto)

- HTML único em `apresentacao/homologacao-pastoral.html` (gerado por `npm run generate:apresentacao`).
- 30 telas / 9 atos conforme `docs/roteiro-apresentacao-homologacao-v1.md`.
- Prefácio como convite; merch como estudo; caderneta como proposta.
- Polimento: fontes locais embutidas (Montserrat + Source Serif 4), tipografia/filetes Direção A, matriz responsiva, cantos retos.
- Passagem editorial vs roteiro v1.1: Tela 15 sem inventário de corpo da Lição 6 (só matriz + Guia 3.4); rótulos completos do ritmo (14); Formatura (18); documento companheiro (26); versos dos símbolos alinhados a 1.6.
- Motion onda 1: entrada em stagger por tela (`IntersectionObserver`), filete nas aberturas de ato, temperatura de fundo por ato, armadura com lock em cascata, grade-48 sob demanda, `prefers-reduced-motion`.
- Motion onda 2: flips com spring/hover, parallax do escudo, morph do filtro da matriz, anatomia expansível, microinterações (merch, Adulão, eixos, UI).
- **v2 documento autônomo:** 33 telas; notas do autor e fechos de ato; telas 01-B / 28-B / 29-B; matriz e checklist redesenhados; `localStorage` + setas + chip de progresso; “Versão contínua”; remoção das notas de condução.
- **Bloqueio Guia:** prefácio removido do corpo (MD/HTML) → `[página reservada ao prefácio pastoral]`; rascunho em `fontes/guia-mestre/rascunhos/`. Matriz JSON sincronizada ao Quadro 1 (48 linhas).

## [1.0.0] — 2026-07-27

### Prospecto v1 — cinco movimentos (seções 1–15)

- Reconstrução narrativa em cinco movimentos; protagonismo do Discipulando a Caserna.
- Seções 1–4 (A necessidade) e 5–7 (A resposta, inclusive a marca).
- Seções 8–11 (arquitetura, matriz, anatomia, edições e encontro).
- Seções 12–15 (material pronto com folheador, rigor, progressão/remição, portão pastoral).
- Direção A: umbral atmosférico único (B), rótulos de estado e checklist de apreciação (C), âncora simbólica de Adulão (não logo oficial).
- Conteúdo canônico em `conteudo/`; fallback noscript da matriz; Stitch só como referência de layout.
- Guia Mestre v1.0-RC em `fontes/guia-mestre/` (referência; homologação pendente).

### Nota sobre commits intermediários

Os commits `fea9267` e `b837b6d` adicionaram o Guia Mestre em `fontes/guia-mestre/`. As mensagens mencionavam seções 8–15 / 16–20, mas esses commits **não** publicaram essas seções no `index.html`.

## [0.4.0] — 2026-07-25

### Correção técnica e consolidação editorial

- Regeneração UTF-8 dos dados (`js/dados/*`) a partir de `conteudo/*.json`, com validação de mojibake e round-trip.
- Hierarquia institucional explícita: Projeto Caserna de Adulão apresenta o programa Discipulando a Caserna.
- Numeração contínua das seções publicadas (1–10); Parte IV com fechamento editorial real.
- Acessibilidade: skip link para `<main>`, headings, sumário móvel, contraste, foco, nomes do escudo, `aria-live` nos filtros.
- Fallback editorial sem JavaScript (mapa + matriz).
- JavaScript resiliente (isolamento de erros, fallback de IntersectionObserver, progresso por rolagem, DOM seguro).
- Metadados técnicos (canonical, theme-color, favicon, Open Graph) mantendo `noindex`.
- Ferramentas mínimas de qualidade (`package.json`, lint, testes unitários e e2e).
- Documentação alinhada à publicação no GitHub Pages (repositório público).

## [0.3.0] — anterior

- Prospecto em quatro partes com seções 1–6 e 10–12.
- Escudo interativo e matriz curricular offline.
