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
