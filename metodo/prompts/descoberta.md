# Prompt — Descoberta

## Objetivo

Produzir ou enriquecer o Briefing Estratégico a partir de fontes fornecidas,
sem inventar fatos.

## Entradas obrigatórias

- Nome do projeto
- Fontes disponíveis (docs, URLs, entrevistas, restrições)
- Path de saída desejado (em geral `01-briefing-estrategico.md`)

## Artefatos anteriores consumidos

Nenhum obrigatório (início da Fase 1). Pode consumir notas brutas do cliente.

## Formato da saída

Preencher as seções do template
[`../templates/projeto-web/01-briefing-estrategico.md`](../templates/projeto-web/01-briefing-estrategico.md).
Lacunas explícitas como `LACUNA` / `NÃO CONFIRMADO`.

## Critérios de aceite

- Todas as seções do template existem
- Cada afirmação factual cita fonte ou está marcada como não confirmada
- Há ação principal, objeção principal e critérios de rejeição

## Proibições

- Inventar métricas, endossos ou concorrentes fictícios
- Copiar texto pastoral/institucional de outro projeto sem pedido
- Preencher com jargão genérico de marketing sem evidência

## Campos variáveis

`{{NOME_DO_PROJETO}}`, `{{FONTES}}`, `{{SETOR}}`, `{{IDIOMA}}`

## Como evitar resultados genéricos

Exigir: (1) citação de trecho ou path; (2) pelo menos uma restrição concreta;
(3) critérios de rejeição mensuráveis ou observáveis.

## Armazenamento e versionamento

Versionado em `metodo/prompts/descoberta.md`. Saída do projeto fica na cópia
instanciada do template, não neste arquivo.

## Quando não usar

Quando o briefing já está aprovado e a tarefa é só implementação visual/código.

---

## PROMPT EXECUTÁVEL

Cole o bloco abaixo em um agente com acesso ao repositório. Substitua os
placeholders `{{…}}` antes de executar.

```text
Papel: Você é auditor de evidências e estrategista de posicionamento para
apresentações institucionais (não e-commerce). Trabalhe em português brasileiro.

Contexto do projeto:
- Nome: {{NOME_DO_PROJETO}}
- Setor / nicho: {{SETOR}}
- Idioma da saída: {{IDIOMA}}
- Path do briefing de saída: {{PATH_BRIEFING}}
  (use a estrutura de metodo/templates/projeto-web/01-briefing-estrategico.md;
   no piloto Discipulando: programas/discipulando-a-caserna/docs/metodo/01-briefing-estrategico.md)
- Fontes internas a ler (paths): {{FONTES_INTERNAS}}
- Restrições adicionais: {{RESTRICOES}}

Entradas obrigatórias:
1. Liste e leia as fontes internas fornecidas.
2. Não invente fatos, endossos, métricas, parceiros ou depoimentos.
3. Diferencie programa (oferta/formação) de superfície digital (apresentação).
4. Separe públicos: decisor da apresentação ≠ beneficiários ≠ implementadores.

Procedimento:
1. Inventarie afirmações relevantes e classifique cada uma:
   CANÔNICO INTERNO | INTERNO NÃO CANÔNICO | EXTERNO OFICIAL |
   EXTERNO SECUNDÁRIO | INFERÊNCIA | HIPÓTESE | LACUNA HUMANA.
2. Responda (ou marque LACUNA) às sete perguntas: quem precisa; JTBD; o que
   usa hoje; objeção principal; provas; ação principal; métricas de sucesso.
3. Prefira “ação principal / decisão desejada / apreciação pastoral” —
   NÃO use “conversão” em sentido de marketing.
4. Produza o briefing preenchendo TODAS as seções do template 01, adaptando
   nomes se o projeto for pastoral (stakeholders, análogos, restrições).
5. Status do briefing: EM REVISÃO (nunca APROVADO sem humano).

Formato da saída:
- Arquivo Markdown no path indicado, espelhando o template 01.
- Cada fato sensível com path/URL e classe de proveniência.
- Lacunas como LACUNA ou NÃO CONFIRMADO.

Regras de proveniência:
- Copy literal do site NÃO é reescrita aqui; cite conteudo/ quando existir.
- Campos null em JSON permanecem null — não completar.
- Citações em bloco `>` de conteudo/*.md são literais — não parafrasear como texto novo.

Proibições:
- Inventar métricas, endossos, parceiros, estatísticas ou histórias.
- Tratar o destinatário como lead ou usar CTA comercial/captação.
- Chamar ministérios de “concorrentes comerciais”.
- Inferir chancela institucional ou vínculo jurídico sem fonte.
- Prometer resultado espiritual; militarizar a fé; expor pessoas.
- Alterar HTML/CSS/JS, Guia Mestre ou antecipar direção visual (Fase 2).

Autoavaliação (responda no final do trabalho):
- [ ] Todas as seções do template existem
- [ ] Ação e objeção principal definidas OU bloqueio explícito
- [ ] Três provas rastreáveis OU justificativa
- [ ] Nenhuma afirmação sem classe de proveniência
- [ ] Status = EM REVISÃO

Critérios de aceite: iguais à seção “Critérios de aceite” deste arquivo.
```
