# Registro de decisões (produto / design / método)

Formato por entrada:

- **Data**
- **Hipótese**
- **Decisão**
- **Justificativa**
- **Resultado observado**
- **Links**

---

## 2026-07-31 — Reorganização sob `programas/`

- **Hipótese:** Separar programa ministerial de estudos técnicos melhora navegação e publicação.
- **Decisão:** Código e docs do Discipulando vivem em `programas/discipulando-a-caserna/`; estudos em `referencias-devtools/`.
- **Justificativa:** Hierarquia institucional (Caserna ≠ programa) e artefato Pages seletivo.
- **Resultado observado:** Paths públicos ajustados; shims de URL legada mantidos.
- **Links:** CHANGELOG do programa; ADR-002; commit de reorg.

## 2026-07-31 — Publicação seletiva (GitHub Pages)

- **Hipótese:** Preview útil sem expor Guia, homologação restrita, docs internos e DevTools.
- **Decisão:** Workflow copia apenas índices, assets e protótipos públicos acordados.
- **Justificativa:** Risco reputacional e licença; `noindex`.
- **Resultado observado:** Storytelling e prospecto públicos; homologação fora.
- **Links:** `.github/workflows/pages.yml`; `docs/publicacao.md`; ADR-002.

## 2026-07-31 — Storytelling no artefato público

- **Hipótese:** Deck institucional pode ser público com `noindex` sem promover a “produto final”.
- **Decisão:** Incluir `prototipos/storytelling-v1/` no Pages (com shims).
- **Justificativa:** Validação e compartilhamento controlado.
- **Resultado observado:** Protótipo permanece classificado como protótipo.
- **Links:** `pages.yml`; docs storytelling.

## 2026-07-31 — Skills canônicas em `.claude/skills/`

- **Hipótese:** Uma árvore canônica evita drift e peso triplicado.
- **Decisão:** ADR-006 — canônico `.claude/skills/`; espelhos parciais; sem `.github/skills/`.
- **Justificativa:** DX e manutenção.
- **Resultado observado:** `docs/skills.md` + `skills-lock.json`.
- **Links:** [ADR-006](../../../docs/arquitetura/ADR-006-ferramentas-de-ia.md).

## 2026-07-31 — Camada `metodo/` (Fase 0 do “O Sistema”)

- **Hipótese:** Infraestrutura reutilizável pode viver no piloto sem misturar com pastoral.
- **Decisão:** Criar `metodo/` na raiz; instância stub no programa; sem skills canônicas ali.
- **Justificativa:** Extração futura; Pages omite por padrão; ADR-007.
- **Resultado observado:** Templates, prompts, checklists e `validate:metodo` disponíveis.
- **Links:** [ADR-007](../../../docs/arquitetura/ADR-007-camada-metodo-o-sistema.md); [`../../README.md`](../../README.md).

## 2026-07-31 — Baseline pré-Fase 0

- **Hipótese:** Implementação da Fase 0 não deve regressar o produto.
- **Decisão:** Exigir `npm ci` + `npm run validate` + `git diff --check` verdes antes e depois.
- **Justificativa:** Critério de não-regressão do plano.
- **Resultado observado:** Baseline pré-mudança exit 0 (2026-07-31, ambiente local de implementação).
- **Links:** `package.json` scripts `validate`.

## 2026-07-31 — Saneamento residual F0 + Fase 1 EM REVISÃO

- **Hipótese:** Prompts executáveis, bootstrap no gate e contrato de integração
  desbloqueiam um Briefing Estratégico rastreável sem redesenhar o site.
- **Decisão:** (1) `PROMPT EXECUTÁVEL` em descoberta/análogos; (2) bootstrap
  sempre em `validate:metodo` + script `test:metodo:bootstrap`; (3) manifesto
  com `integracaoObrigatoria` e checagem de Pages; (4) briefing do piloto
  preenchido com status **EM REVISÃO**, dossiê e roteiro humano em
  `docs/metodo/fase-1/`.
- **Justificativa:** Critério da Fase 1 do método; Rota B e P0-08 impedem
  status APROVADO automático.
- **Resultado observado:** Artefatos criados; ação/objeção principais como
  HIPÓTESE; lacunas centralizadas no roteiro H1–H17.
- **Links:**
  [`programas/discipulando-a-caserna/docs/metodo/01-briefing-estrategico.md`](../../../programas/discipulando-a-caserna/docs/metodo/01-briefing-estrategico.md);
  [`fase-1/dossie-de-descoberta.md`](../../../programas/discipulando-a-caserna/docs/metodo/fase-1/dossie-de-descoberta.md).

## 2026-08-01 — Fase 2 curadoria + saneamento F0/F1 residual

- **Hipótese:** Um painel anotado (6–10 refs) + contrato de validador mais
  estrito transforma a pesquisa visual dispersa em vocabulário para a Fase 3
  sem redesenhar o site nem reabrir a Direção A.
- **Decisão:** (1) proteger `fase-1/*` e `fase-2/*` no manifesto; (2) links MD
  da instância + SKILL.md recursivo + contrato mínimo de `PROMPT EXECUTÁVEL`;
  (3) prompt `curadoria-referencias.md`; (4) painel EM REVISÃO com 8 refs
  (5/2/1); (5) inventário e roteiro visual em `fase-2/`; (6) nenhuma promoção
  nova à biblioteca global (Aramco permanece a única ficha DevTools);
  (7) frase de posicionamento F1 sem comparação negativa a ministérios
  externos; (8) matriz de análogos F1 uniformizada / OCF fora da amostra.
- **Justificativa:** Plano Fase 2; Direção A normativa; repo público sem
  assets externos.
- **Resultado observado:** Artefatos criados; painel e inventário EM REVISÃO;
  decisões V1–V5 abertas no roteiro visual.
- **Links:**
  [`02-painel-referencias.md`](../../../programas/discipulando-a-caserna/docs/metodo/02-painel-referencias.md);
  [`fase-2/inventario-e-triagem.md`](../../../programas/discipulando-a-caserna/docs/metodo/fase-2/inventario-e-triagem.md);
  [`prompts/curadoria-referencias.md`](../../prompts/curadoria-referencias.md).

## 2026-08-02 — Fase 4 design system (candidato)

- **Hipótese:** Contratos de componentes/padrões + lab estático permitem
  compor páginas sem migrar runtime nem introduzir framework.
- **Decisão:** (1) Manual síntese em `04-manual-design-system.md` status
  CANDIDATO; (2) fichas em `design-system/componentes|padroes/`; (3) evidência
  em `docs/metodo/fase-4/`; (4) lab HTML/CSS/JS consumindo `tokens.css`;
  (5) F3-R01 aliases `var(--primitivo-*)`; (6) F3-R02 validate sem regenerate;
  (7) sem camada de tokens de componente; (8) sem Storybook; (9) SemVer do DS
  independente dos tokens; (10) V*/D*/H* permanecem humanas.
- **Justificativa:** Plano Fase 4; ADR-001; Direção A + importações B/C.
- **Links:**
  [`04-manual-design-system.md`](../../../programas/discipulando-a-caserna/docs/metodo/04-manual-design-system.md);
  [`prompts/manual-design-system.md`](../../prompts/manual-design-system.md).

## 2026-08-02 — Cobertura integral da doutrina (fases 5–8 + arsenal)

- **Hipótese:** A camada `metodo/` cobria bem as fases 0–4 e quase nada da
  metade em que o método depende de julgamento humano. Documentar as fases 5–8
  e o “arsenal” (anti-padrões, glossário, matriz de ferramentas) transforma
  disciplina implícita em procedimento verificável, sem tocar no produto.
- **Decisão:** (1) doutrina-fonte verbatim em `metodo/O-SISTEMA.md`, com nota
  de adaptação declarando onde o repositório prevalece sobre o texto
  (`metodo/` vs `metodo-web/`, hex-first vs OKLCH, estático vs Astro,
  `AGENTS.md` vs `CLAUDE.md`, skills canônicas); (2) `PIPELINE.md` com as nove
  fases, estado real de cada uma e os bloqueios humanos abertos; (3) guias
  `fases/fase-5..8`; (4) prompts faltantes `implementacao.md` (A.6) e
  `auditoria-final.md` (A.7), ambos sob o contrato `PROMPT EXECUTÁVEL`;
  (5) `ANTIPADROES.md` com a **defesa** de cada anti-padrão neste repositório e
  oito anti-padrões próprios do piloto; (6) `GLOSSARIO.md` do método, separado
  do vocabulário de domínio em `CONTEXT.md`; (7) vocação + matriz de decisão em
  `FERRAMENTAS.md`; (8) manifesto `0.2.0` e validador estendidos.
- **Justificativa:** O documento afirma que o ativo não é o prompt, é a
  especificação. As fases 5–8 eram justamente as sem especificação escrita.
  Alvos de Core Web Vitals entram como **referência**, não budget — o repo
  declara `sem budget numérico formal` e mudar isso é decisão humana.
- **Resultado observado:** `npm run validate:metodo` verde com os novos
  arquivos sob contrato. Nenhuma superfície, token ou copy alterada; fases 5–8
  permanecem **abertas** — foram documentadas, não executadas.
- **Links:** [`../../O-SISTEMA.md`](../../O-SISTEMA.md);
  [`../../PIPELINE.md`](../../PIPELINE.md);
  [`../../ANTIPADROES.md`](../../ANTIPADROES.md);
  [`../../fases/README.md`](../../fases/README.md).

## 2026-08-02 — Fase 5 candidata aberta (não canônica)

- **Hipótese:** Um candidato isolado consumindo tokens DS + Manual prova a
  composição dos cinco movimentos sem migrar o prospecto legado.
- **Decisão:** (1) Criar `prototipos/prospecto-fase-5-v1/` como candidato;
  (2) prompt `metodo/prompts/prototipagem.md` + crítica executável;
  (3) estado operacional em `docs/metodo/fase-5/estado-prototipo-canonico.json`
  com `fase6: bloqueada`; (4) **não** declarar canônico; (5) **não** alterar
  `pages.yml`.
- **Justificativa:** Plano Fase 5; Fluxo A; Direção A normativa.
- **Resultado observado:** Candidato gerado de `conteudo/`; gates estruturais
  verdes; e2e/capturas dependem de Chromium Playwright no ambiente.
- **Links:**
  [`fase-5/`](../../../programas/discipulando-a-caserna/docs/metodo/fase-5/);
  [`prospecto-fase-5-v1/`](../../../programas/discipulando-a-caserna/prototipos/prospecto-fase-5-v1/).

## 2026-08-02 — Saneamento F5 + blueprint Fase 6 (bloqueada)

- **Hipótese:** Fidelidade editorial e PE honestos são pré-requisito de canonização; produção não pode começar sem F5-12.
- **Decisão:** (1) parser de blocos `parse-md-blocos.js` com falha em tabela inválida;
  (2) contrato `index.html` inteiro gerado; (3) config institucional única em
  `ferramentas/institucional.js`; (4) stale-check F5 sem escrever working tree;
  (5) path de produção previsto `programas/discipulando-a-caserna/prospecto/`
  **após** F5-12; (6) stack permanece HTML/CSS/JS + Node (ADR-001); (7) CSS
  compartilhado do DS em `design-system/styles/` (esqueleto); (8) **não**
  publicar / **não** remover `noindex` / **não** redirecionar legado;
  (9) PIPELINE: Fase 5 CANDIDATO EM VALIDAÇÃO, Fase 6 BLOQUEADA.
- **Justificativa:** Plano Fase 6 bloqueado; gates F6-G01…G03 abertos.
- **Resultado observado:** Candidato regenerado com multi-tabelas/listas; PE
  sem JS; Folheador/PDF como pendências humanas F6-05/F6-06.
- **Links:**
  [`fase-6/`](../../../programas/discipulando-a-caserna/docs/metodo/fase-6/);
  [`PIPELINE.md`](../../PIPELINE.md).

## 2026-08-01 — Fase 3 tokens candidatos (ME-T)

- **Hipótese:** JSON canônico + gerador próprio unifica drift sem migrar
  runtime nem antecipar componentes.
- **Decisão:** (1) SoT em
  `programas/discipulando-a-caserna/design-system/tokens/tokens.json`
  (`0.1.0-candidate`); (2) contrato ME-T com folhas tipadas; (3) scripts
  `*:discipulando:tokens` sem colidir com Aramco; (4) bronze default
  `#8C6A45` (D3-05); (5) hex-first; sem dark mode; (6) protótipos intocados;
  (7) V1/V2 e D3-12 humanos para `1.0.0`.
- **Justificativa:** Plano Fase 3; Direção A; identidade Guia.
- **Resultado observado:** JSON/CSS/gerador/validador/testes e docs fase-3;
  painel permanece EM REVISÃO.
- **Links:**
  [`03-direcao-tokens.md`](../../../programas/discipulando-a-caserna/docs/metodo/03-direcao-tokens.md);
  [`design-system/tokens/`](../../../programas/discipulando-a-caserna/design-system/tokens/).
