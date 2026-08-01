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
