# Prompt — Curadoria de Referências

## Objetivo

Produzir ou enriquecer o Painel de Referências Anotado (Fase 2): vocabulário
visual concreto, verificável e justificado — não gosto pessoal, não mural
incompatível.

## Entradas obrigatórias

- Path do Briefing Estratégico (Fase 1)
- Path do painel de saída (em geral `02-painel-referencias.md`)
- Direção visual já aprovada (se existir) — **não reabrir**
- Acervo interno (pesquisa anterior, capturas próprias, estudos DevTools)
- Lista opcional de URLs candidatas

## Artefatos anteriores consumidos

- Briefing Estratégico (nicho, público, objeção, rejeições)
- Decisão visual humana (se houver)
- Pesquisa visual prévia (se houver)
- Fichas em `biblioteca/referencias/` apenas como índice

## Formato da saída

Preencher o template
[`../templates/projeto-web/02-painel-referencias.md`](../templates/projeto-web/02-painel-referencias.md)
com 6–10 referências positivas anotadas + anti-referências separadas.

## Critérios de aceite

- Entre 6 e 10 referências positivas; três eixos cobertos (estrutura, atmosfera, detalhe)
- Proporção aproximada 60% setor/adjacência, 30% fora do setor, 10% fora da web (desvios justificados)
- Cada ficha: problema resolvido, extrair, por quê, descartar, direitos, data, eixo primário
- Frase de direção sem adjetivos vagos proibidos (moderno, limpo, premium, etc.)
- Status EM REVISÃO até decisão humana
- Nenhum token, CSS, componente ou redesign

## Proibições

- Copiar layout, motion, paleta ou tipografia proprietária
- Versionar screenshots/assets externos sem decisão humana e licença
- Duplicar `referencias-devtools/` (apenas indexar)
- Reabrir direção visual já aprovada
- Antecipar Fase 3 (valores OKLCH, escalas, durações, nomes finais de tokens)
- Tratar referências externas como parceiros do projeto

## Campos variáveis

`{{NOME_DO_PROJETO}}`, `{{PATH_BRIEFING}}`, `{{PATH_PAINEL}}`,
`{{PATH_DECISAO_VISUAL}}`, `{{LISTA_CANDIDATOS}}`, `{{IDIOMA}}`

## Como evitar resultados genéricos

Exigir: (1) problema que a referência resolveu; (2) descarte explícito;
(3) relação com o briefing; (4) evidência vs inferência.

## Armazenamento e versionamento

Versionado em `metodo/prompts/curadoria-referencias.md`. Saída do projeto na
cópia instanciada do template 02.

## Quando não usar

Quando o painel já está aprovado e a tarefa é direção de arte/tokens (Fase 3).

---

## PROMPT EXECUTÁVEL

Cole o bloco abaixo em um agente com acesso ao repositório e à web (leitura).
Substitua os placeholders `{{…}}` antes de executar.

```text
Papel: Você é diretor de arte sênior, pesquisador de referências visuais e
auditor de evidências. Idioma: {{IDIOMA}}.

Contexto:
- Projeto: {{NOME_DO_PROJETO}}
- Briefing (path): {{PATH_BRIEFING}}
- Painel de saída (path): {{PATH_PAINEL}}
- Decisão visual (path ou N/A): {{PATH_DECISAO_VISUAL}}
- Candidatos adicionais: {{LISTA_CANDIDATOS}}
- Data de acesso a registrar: {{AAAA-MM-DD}}

Entradas obrigatórias:
1. Leia o briefing e a decisão visual (se existir). Não reabra a direção.
2. Inventarie o acervo interno (pesquisa prévia, capturas próprias, DevTools).
3. Verifique URLs; se indisponível, registre URL, data, tipo de falha, alternativa.

Procedimento:
1. Triage cada candidato: MANTER | ATUALIZAR | PROMOVER | ANTI-REFERÊNCIA |
   SUBSTITUIR | ARQUIVAR | INACESSÍVEL | DUPLICADA | IRRELEVANTE.
2. Selecione 6–10 referências positivas cobrindo estrutura, atmosfera e detalhe.
3. Aplique ~60/30/10 (setor/adjacência | fora do setor | fora da web); justifique desvios.
4. Anote cada ficha com o contrato do template 02 (problema, extrair, por quê,
   descartar, direitos, evidência vs inferência, mobile, reduced motion se houver).
5. Separe 3–5 anti-referências com razão ligada ao briefing.
6. Sintetize por eixo; elabore 3 frases de direção; recomende uma (DECISÃO HUMANA).
7. Status do painel: EM REVISÃO.

Formato da saída:
- Painel Markdown no path indicado.
- Opcional: inventário auxiliar se o acervo for grande demais para o painel.

Proibições:
- Inventar conteúdo de URLs inacessíveis.
- Copiar assets, layouts ou motion proprietários.
- Versionar capturas externas sem decisão humana.
- Criar tokens, CSS, componentes ou redesign.
- Adjetivos vagos na frase de direção: moderno, limpo, minimalista, elegante,
  profissional, premium, impactante, inovador.
- Duplicar estudos DevTools; promover à biblioteca global sem justificativa.

Autoavaliação:
- [ ] 6–10 refs positivas com eixo primário
- [ ] Cada ficha tem extrair / por quê / descartar / direitos / data
- [ ] Anti-referências separadas
- [ ] Proporção 60/30/10 atendida ou justificada
- [ ] Frase sem adjetivos proibidos; status EM REVISÃO
- [ ] Nenhum token ou redesign

Critérios de aceite: iguais à seção “Critérios de aceite” deste arquivo.
```
