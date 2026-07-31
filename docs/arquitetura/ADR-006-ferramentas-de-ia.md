# ADR-006 — Ferramentas de IA no repositório

- **Status:** Aceita
- **Data:** 2026-07-31
- **Relacionada:** D2 em [`docs/skills.md`](../skills.md)

## Decisão

1. **Canônico:** `.claude/skills/` — única árvore completa versionada como fonte.
2. **Espelhos:** `.cursor/skills/` e `.agents/skills/` são **subconjuntos** para
   o ambiente Cursor; não precisam espelhar 100% das skills (ex.: Higgsfield
   pode existir só no canônico + lock).
3. **Proibido:** reintroduzir cópia completa em `.github/skills/`. Hooks apontam
   para `.claude/skills/impeccable/`.
4. **Natureza:** skills e CLIs (`@higgsfield/cli`, Impeccable, design packs) são
   **ambiente de desenvolvimento**, não superfície do produto pastoral.
5. **Política de espelho (default técnico):** documentação + disciplina manual /
   skill-lock; não exigir sync binário automático nesta fase. Decisão humana
   futura pode introduzir script de sync ou submódulo externo.

## Consequências

- O peso do repositório é dominado por skills; limpezas devem preservar o
  canônico e evitar triplicar árvores.
- README aponta para este ADR; não lista cada skill.
