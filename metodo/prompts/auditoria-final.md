# Prompt — Auditoria final (Fase 7)

## Objetivo

Produzir um relatório de conformidade com **evidência numerada**, não opinião:
acessibilidade, performance, SEO técnico e aderência ao sistema de tokens,
ordenado por impacto e esforço.

Diferença para [`qa-visual.md`](qa-visual.md): QA visual verifica a superfície
contra a referência aprovada; a auditoria final verifica a página contra os
**padrões externos** (WCAG, Core Web Vitals, SEO) e contra o sistema.

## Entradas obrigatórias

- URL local ou paths da superfície auditada
- Tokens canônicos do projeto
- Alvos numéricos acordados (ou declaração de que não há budget formal)
- Checklist [`../checklists/pre-lancamento.md`](../checklists/pre-lancamento.md)
- Política de indexação do projeto (`noindex` ou público)

## Artefatos anteriores consumidos

- `01-briefing-estrategico.md` (métricas de sucesso e critérios de rejeição)
- `03-tokens.json` / `tokens.css`
- `04-manual-sistema.md`
- [`../fases/fase-7-qualidade.md`](../fases/fase-7-qualidade.md)
- Relatório anterior, se houver (para comparar regressão)

## Procedimento

1. Registrar ambiente: navegador, versão, viewport, rede simulada, dispositivo.
2. Rodar as verificações automatizadas disponíveis no repositório.
3. Executar o roteiro manual de acessibilidade (teclado, zoom 200%, CSS
   desligado, cabeçalhos, contraste de estados).
4. Medir Core Web Vitals em rede móvel simulada — não no desktop com fibra.
5. Conferir SEO técnico item a item.
6. Varrer o código em busca de valor visual que não venha dos tokens.
7. Ordenar tudo por impacto × esforço e emitir go / no-go.

## Formato da saída

Relatório com:

1. **Ambiente** — navegador, viewport(s), rede simulada, data
2. **Acessibilidade** — cada falha com seletor do elemento, critério WCAG e correção
3. **Performance** — LCP, INP, CLS medidos + causa raiz de cada métrica fora do alvo
4. **SEO técnico** — título, description, `h1`, hierarquia, dados estruturados,
   canônica, Open Graph, `robots`
5. **Consistência com o sistema** — todo valor visual fora dos tokens, com path e linha
6. **Tabela final** — achado × severidade × impacto × esforço × responsável
7. **Go / no-go** explícito

## Critérios de aceite

- Toda afirmação tem número, seletor, path ou comando por trás
- Verificações não executadas estão marcadas `N/A` **com motivo**
- Falhas de acessibilidade citam o critério WCAG 2.2 correspondente
- Métricas de performance dizem em que condição foram medidas
- Achados ordenados por impacto e esforço, não por ordem de descoberta
- Decisão go / no-go explícita e justificada

## Proibições

- Declarar “Lighthouse OK”, “acessível” ou “rápido” sem número ou evidência
- Reportar métrica de desktop como se fosse de rede móvel
- Confundir ausência de erro automatizado com ausência de problema —
  ferramentas automáticas cobrem cerca de um terço dos casos reais
- Corrigir o código durante a auditoria (auditar e corrigir são passos separados)
- Alterar conteúdo canônico para “passar” em métrica
- Publicar docs internos, fontes restritas ou referências de estudo
- Inventar alvo numérico onde o projeto declarou não ter budget formal

## Campos variáveis

`{{URL_LOCAL}}`, `{{VIEWPORTS}}`, `{{REDE_SIMULADA}}`, `{{COMANDOS_VALIDATE}}`,
`{{ALVOS_CWV}}`, `{{PATH_TOKENS_CSS}}`, `{{POLITICA_INDEXACAO}}`, `{{TIPO_SCHEMA}}`

## Como evitar resultados genéricos

Proibir a frase “considere melhorar”. Cada achado precisa de um par
`evidência → correção específica`. Um relatório sem seletor e sem número é
uma opinião com formatação de relatório.

## Armazenamento e versionamento

Prompt em `metodo/prompts/auditoria-final.md`.
Relatórios da instância em `docs/metodo/fase-7/` ou `docs/validacoes/` do programa.

## Quando não usar

Durante a construção (use [`critica-estruturada.md`](critica-estruturada.md)) ou
quando o objetivo é comparar a superfície com a referência visual aprovada
(use [`qa-visual.md`](qa-visual.md)).

## PROMPT EXECUTÁVEL

Cole o bloco abaixo em um agente com acesso ao repositório e a um navegador
(MCP DevTools/Playwright). Substitua os placeholders `{{…}}` antes de executar.

```text
Papel: Você é auditor técnico independente. Você entrega evidência, não elogio.
Idioma: português brasileiro.

Contexto:
- Projeto: {{NOME_DO_PROJETO}}
- Superfície auditada: {{URL_LOCAL}}
- Viewports: {{VIEWPORTS}}
- Rede simulada: {{REDE_SIMULADA}}
- Alvos Core Web Vitals: {{ALVOS_CWV}}
- Tokens CSS canônicos: {{PATH_TOKENS_CSS}}
- Política de indexação: {{POLITICA_INDEXACAO}}
- Tipo de dado estruturado esperado: {{TIPO_SCHEMA}}
- Comandos de validação do repositório: {{COMANDOS_VALIDATE}}

Procedimento:
1. Registre o ambiente real de medição antes de qualquer número.
2. Acessibilidade:
   a. rode a verificação automatizada disponível;
   b. execute o roteiro manual — navegação só por Tab, zoom 200%, CSS
      desligado, leitura da árvore de cabeçalhos, contraste dos estados
      hover/foco/desabilitado;
   c. para cada falha: seletor do elemento + critério WCAG 2.2 + correção.
3. Performance: meça LCP, INP e CLS em {{REDE_SIMULADA}}. Para cada métrica
   fora de {{ALVOS_CWV}}, identifique a causa raiz (imagem, fonte, script de
   terceiro, mídia sem dimensão, animação de propriedade que força layout).
4. SEO técnico: título, meta description, h1 único, hierarquia sem salto,
   dados estruturados {{TIPO_SCHEMA}}, canônica, Open Graph, robots — coerentes
   com {{POLITICA_INDEXACAO}}.
5. Consistência com o sistema: liste todo valor visual que não venha de
   {{PATH_TOKENS_CSS}}, com path e linha.
6. Ordene tudo em uma tabela: achado × severidade × impacto × esforço.
7. Emita go / no-go.

Formato da saída: as sete seções da seção “Formato da saída” deste arquivo.

Proibições:
- Afirmação sem número, seletor, path ou comando.
- Métrica de desktop apresentada como rede móvel.
- "Lighthouse OK" sem o número; "acessível" sem o roteiro manual.
- Tratar scanner automático como cobertura completa.
- Corrigir código nesta execução; alterar copy canônica.
- Publicar docs internos, fontes restritas ou referências de estudo.
- Inventar alvo numérico onde o projeto não declarou budget.
- TODO: não inventar conteúdo institucional, endossos, datas ou resultados.

Autoavaliação (responda antes de entregar):
- [ ] ambiente de medição registrado
- [ ] cada falha de a11y tem seletor + critério WCAG + correção
- [ ] LCP/INP/CLS medidos na rede declarada, com causa raiz das fora do alvo
- [ ] SEO conferido item a item, coerente com a política de indexação
- [ ] valores fora dos tokens listados com path e linha
- [ ] itens não verificados marcados N/A com motivo
- [ ] tabela ordenada por impacto e esforço
- [ ] go/no-go explícito

Critérios de aceite: iguais à seção “Critérios de aceite” deste arquivo.
```
