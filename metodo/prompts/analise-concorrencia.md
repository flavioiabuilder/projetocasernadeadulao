# Prompt — Análise de análogos e alternativas

## Objetivo

Mapear alternativas e análogos **reais** (não “concorrentes comerciais”) e
extrair o que aproveitar / descartar para o briefing e o painel de referências.

Neste método, use as classificações:

- análogo direto
- análogo institucional
- referência de discipulado
- referência de capelania
- referência de conteúdo
- referência internacional
- alternativa atual (não digital / processo vigente)
- não comparável
- contexto institucional oficial (não parceiro)

## Entradas obrigatórias

- Briefing parcial ou completo (`01-briefing-estrategico.md`)
- Lista de URLs ou nomes de organizações/alternativas **reais**
- Setor e público

## Artefatos anteriores consumidos

- [`../templates/projeto-web/01-briefing-estrategico.md`](../templates/projeto-web/01-briefing-estrategico.md) (instanciado)

## Formato da saída

Seção de análogos/alternativas do briefing + registro detalhado no dossiê de
descoberta (quando existir). Fichas opcionais no painel
[`02-painel-referencias.md`](../templates/projeto-web/02-painel-referencias.md)
quando o análogo também for referência visual/estrutural (Fase 2).

Matriz mínima por entrada: organização; país/contexto; classificação; público
declarado; promessa; prova; estrutura pública; próximo passo; tom; convenções
de confiança; o que faz bem; o que não serve; lacuna explorável; fonte; data
de acesso; evidência vs inferência.

## Critérios de aceite

- Entre 5 e 8 entradas reais (ou mínimo 3 em projetos menores), com URL ou
  identificação clara
- Nenhuma rotulada como “concorrente comercial”
- Distinção evidência vs inferência; data de acesso
- Inclusão, quando aplicável, da **alternativa atual** ao site

## Proibições

- Inventar organizações
- Inferir parceria, chancela ou vínculo com o projeto analisado
- Recomendar cópia de marca, texto ou ativos proprietários
- Tratar estudo DevTools como componente de produção
- Usar “conversão” em sentido de marketing/funil

## Campos variáveis

`{{LISTA_URLS}}`, `{{CRITERIOS_COMPARACAO}}`, `{{IDIOMA}}`

## Como evitar resultados genéricos

Exigir descrições amarradas a elementos concretos (hierarquia de mensagem,
prova, próximo passo, tom, salvaguardas) e paths/URLs verificáveis.

## Armazenamento e versionamento

Prompt em `metodo/prompts/analise-concorrencia.md`. Resultados no projeto.

## Quando não usar

Quando não há alternativas públicas relevantes ou a decisão de posicionamento
já está fechada no briefing aprovado.

---

## PROMPT EXECUTÁVEL

Cole o bloco abaixo em um agente com acesso à web (ou notas pré-capturadas).
Substitua os placeholders `{{…}}` antes de executar.

```text
Papel: Você é pesquisador de analogias institucionais e de discipulado.
NÃO é analista de “concorrência comercial”. Idioma: {{IDIOMA}}.

Contexto:
- Projeto: {{NOME_DO_PROJETO}}
- Briefing (path): {{PATH_BRIEFING}}
- Dossiê de saída (path): {{PATH_DOSSIE}}
- Lista de URLs / alternativas: {{LISTA_URLS}}
- Critérios de comparação: {{CRITERIOS_COMPARACAO}}

Procedimento:
1. Leia o briefing parcial e as restrições do projeto.
2. Para cada URL/alternativa, acesse a página institucional (ou use nota com
   data se offline). Registre título, URL e data de acesso (AAAA-MM-DD).
3. Classifique com UMA das categorias: análogo direto | análogo institucional |
   referência de discipulado | referência de capelania | referência de conteúdo |
   referência internacional | alternativa atual | contexto institucional oficial |
   não comparável.
4. Preencha a matriz mínima (ver seção Formato da saída deste arquivo).
5. Separe o que a FONTE declara (evidência) do que VOCÊ conclui (inferência).
6. Extraia “buracos exploráveis” sem inventar superioridade doutrinária.
7. Inclua sempre, se o projeto tiver processo pré-digital, a “alternativa atual”
   (documentos, conversas, Guia, apostilas — paths internos).

Formato da saída:
- Tabela/seções no dossiê; síntese curta no briefing.
- 5 a 8 entradas na amostra final (justifique exclusões).

Proibições:
- Palavra “concorrente” em sentido comercial.
- Inferir parceria com {{NOME_DO_PROJETO}}.
- Copiar texto longo das fontes; não redistribuir ativos.
- Declarar chancela de órgão público.
- Usar “conversão” como métrica de marketing.

Autoavaliação:
- [ ] 5–8 entradas (ou mínimo acordado) com data de acesso
- [ ] Nenhuma classificação comercial indevida
- [ ] Alternativa atual incluída quando existir
- [ ] Evidência vs inferência explícitas

Critérios de aceite: iguais à seção “Critérios de aceite” deste arquivo.
```
