# Prompt — Manual do Design System (Fase 4)

## Objetivo

Transformar tokens e decisões anteriores em peças reutilizáveis com comportamento
definido (fundações, componentes, padrões, composição), sem migrar o runtime
dos protótipos e sem inventar kit genérico de UI.

## Entradas obrigatórias

- Briefing, painel, direção/tokens e decisão visual normativa
- `tokens.json` / `tokens.css` candidatos
- Inventário das superfícies reais (protótipos)
- Template [`04-manual-sistema.md`](../templates/projeto-web/04-manual-sistema.md)
- Regras do agente da instância

## Artefatos anteriores consumidos

- `01-briefing-estrategico.md`
- `02-painel-referencias.md`
- `03-direcao-tokens.md` / `tokens.json`
- Decisão visual humana (Direção normativa)
- Protótipos como evidência (legado operacional)

## Procedimento

1. Confirmar HEAD, paths reais e precedência de fontes (`conteudo/` primeiro).
2. Corrigir resíduos bloqueantes da Fase 3 (aliases CSS, gate CSS stale, tokens
   mínimos de peso/gutter/foco) sem promover `1.0.0`.
3. Inventariar superfícies e classificar achados (FUNDAÇÃO / COMPONENTE /
   PADRÃO / ESPECÍFICO / LEGADO / ANTI-PADRÃO / LACUNA / DECISÃO HUMANA).
4. Promover só peças que atendam critérios de reutilização/a11y/domínio.
5. Escrever fichas (28 campos) e padrões; matrizes de estados e a11y.
6. Provar cobertura de composição numa página-alvo sem migrar HTML.
7. Laboratório estático (HTML/CSS/JS) se agregar testes — sem Storybook por padrão.
8. Validadores + integração método; status CANDIDATO.

## PROMPT EXECUTÁVEL

```text
Você executará a Fase 4 (Design System) do método “O Sistema” no programa
{{NOME_DO_PROGRAMA}}.

Contexto fixo:
- Direção normativa: {{DIRECAO}}
- Tokens: {{PATH_TOKENS_JSON}} (versão {{VERSAO_TOKENS}}, status EM REVISÃO)
- Manual alvo: {{PATH_MANUAL}}
- Copy canônica: {{PATH_CONTEUDO}} — não inventar
- Protótipos: legado operacional — NÃO migrar runtime nesta fase
- Stack runtime: HTML + CSS + JS clássico (ADR-001). Sem React/Tailwind/Storybook
  por padrão.

Tarefas:
1. Auditar e corrigir resíduos F3 bloqueantes (aliases var(--primitivo-*),
   validate sem regenerate silencioso, pesos/gutters/foco mínimos).
2. Inventariar superfícies e classificar peças.
3. Publicar fichas de componentes/padrões promovidos + matrizes.
4. Preencher o Manual (síntese) e cobertura de composição da página-alvo.
5. Criar laboratório estático consumindo tokens.css com demos marcadas.
6. Adicionar validate/test do design system; proteger artefatos no MANIFESTO.
7. Registrar decisões humanas abertas sem resolvê-las (V*, D*, H*).

Critérios de aceite:
- [ ] É possível descrever a página-alvo só com peças/padrões documentados
      (matriz de cobertura).
- [ ] Nenhuma promoção a 1.0.0 / ESTÁVEL / APROVADO sem evidência humana.
- [ ] Componentes consomem só semânticos; CSS gerado não editado à mão.
- [ ] A11y: WCAG 2.2 AA; metas 44×44 e anel 2px documentadas como internas.
- [ ] validate:{{ESCOPO}}:tokens e validate:{{ESCOPO}}:design-system passam.
- [ ] Autoavaliação: liste LACUNAs e DECISÕES HUMANAS restantes.

Proibições:
- Migrar protótipos; reabrir A/B/C; copiar DevTools; inventar copy pastoral
- Preencher H1–H17 / V1–V2 / D3-12; introduzir framework UI
- Tokens de componente prematuros; dualidade Figma canônica inexistente
- Inventar loading/disabled sem operação real

TODO: substituir {{NOME_DO_PROGRAMA}}, {{DIRECAO}}, paths e {{ESCOPO}}.
```

## Critérios de aceite (fase)

Ver DoD da Fase 4 na instância e Definition of Ready da Fase 5 no Manual.

## Proibições

- Migrar runtime; inventar componentes SaaS/e-commerce
- Storybook/React por padrão; dark mode inventado
- Editar `tokens.css` à mão; consumir `--primitivo-*` em componentes
- Aprovar decisões humanas automaticamente
