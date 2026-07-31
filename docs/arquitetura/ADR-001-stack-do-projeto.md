# ADR-001 — Stack do projeto

- **Status:** Aceita
- **Data:** 2026-07-31
- **Substitui:** formulações absolutas em README/TODO/contexto (“sem bundler”, “sem framework”) sem critério de revisão

## Contexto

O produto é um prospecto pastoral estático (Discipulando a Caserna), não um
portal, LMS ou SPA. A interatividade limita-se a navegação, matriz, folheador,
abas e revelação progressiva.

## Decisão

1. **Runtime do navegador:** HTML estático + CSS modular nativo + JavaScript
   clássico progressivo (`<script src>`, sem framework de UI).
2. **Ferramentas de desenvolvimento/build:** Node.js é permitido e já é usado
   (`gerar-dados`, `gerar-apresentacao`, linters, testes). Um gerador editorial
   MD→HTML ou SSG leve pode ser adotado se a saída continuar estática.
3. **Não adotar por padrão:** React, Vue, Svelte, Next, Astro com ilhas, Vite
   obrigatório, Tailwind no produto, TypeScript no front do prospecto.
4. **Bundler:** não é obrigatório. Sua ausência no runtime é desejável; isso
   **não** proíbe pipeline de geração em Node.

## Consequências

- Agentes e contribuidores tratam “sem framework” como restrição de **runtime**,
  não como proibição de ferramentas de qualidade ou geração.
- Mudança para framework de UI exige nova ADR e evidência de necessidade
  (estado complexo, hidratação, etc.).
- CSS tokens atuais permanecem a base visual; Tailwind de mockups Stitch não
  entra no produto (ver também decisão visual).

## Alternativas rejeitadas (resumo)

- SPA com runtime de componentes: custo e risco sem benefício ao gênero do documento.
- Vite agora: pouco ganho no conteúdo; tensiona abertura `file://` (ADR-003).
