# 01 — Briefing Estratégico — Discipulando a Caserna

> **Status:** EM REVISÃO
>
> **Data:** 2026-07-31
>
> **Método:** O Sistema — Fase 1 (mapeamento de nicho)
>
> **Não é** fonte de copy literal do site. Copy canônica:
> [`../../conteudo/`](../../conteudo/).
>
> Evidências: [`fase-1/dossie-de-descoberta.md`](fase-1/dossie-de-descoberta.md)
>
> Perguntas humanas:
> [`fase-1/roteiro-de-validacao-humana.md`](fase-1/roteiro-de-validacao-humana.md)

Template genérico de origem:
[`../../../../metodo/templates/projeto-web/01-briefing-estrategico.md`](../../../../metodo/templates/projeto-web/01-briefing-estrategico.md).

---

## Metadados

| Campo                            | Valor                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------ |
| Programa                         | Discipulando a Caserna                                                         |
| Projeto institucional (contexto) | Projeto Caserna de Adulão                                                      |
| Superfície analisada             | Prospecto pastoral digital e artefatos irmãos (protótipos)                     |
| Idioma                           | Português brasileiro                                                           |
| Destinatário configurado         | Pr. Glaydston Gama Lopes (`config.js`) — ver lacunas de papel                  |
| Autor configurado                | Obr. Flávio Alves da Costa (`config.js`) — NÃO CONFIRMADO p/ ampliação (P0-08) |

---

## 1. Escopo

Este briefing define **nicho, públicos, intenção, restrições e critérios de
julgamento** da apresentação digital do programa. Não redesenha o site, não
altera `conteudo/`, não antecipa tokens (Fase 3) nem painel visual (Fase 2).

- **Dentro:** estratégia da apresentação ao decisor pastoral.
- **Fora:** portal do Projeto; LMS; captação; analytics; parecer jurídico;
  conteúdo teológico novo.

---

## 2. Contexto do programa

**CANÔNICO INTERNO** (`conteudo/programa.md`, `contexto-do-projeto.md`):

- Percurso anual estruturado: 4 módulos × 12 lições = 48 encontros (~1 ano).
- Eixo: Cristo chama, treina, molda e envia.
- Metáfora militar (ex.: Efésios 6) a serviço do evangelho — nunca o contrário.
- Módulo 1 produzido (Aluno e Instrutor); Módulos 2–4 com matriz definida;
  produção condicionada à validação pastoral do Módulo 1.
- Campos `null` em M3/M4 (`virtude`, `tema`, `temaRef`) permanecem omitidos na UI.

**Hierarquia:** Projeto Caserna de Adulão (contexto ministerial amplo) ≠
Discipulando a Caserna (programa). Não são sinônimos.

**LACUNA HUMANA:** definição institucional completa do Projeto (estatuto,
governança, relação com igrejas) — ver roteiro H5/H7.

---

## 3. Contexto da apresentação (superfície digital)

A superfície é um **prospecto pastoral digital** / documento de trabalho para
apreciação, orientação e possível validação — não portal público, não plataforma
de curso, não página de arrecadação, não landing comercial
(`contexto-do-projeto.md`, README do programa).

Arquitetura narrativa **shipped** (cinco movimentos):

| Movimento         | Seções | Função                                  |
| ----------------- | ------ | --------------------------------------- |
| I — A necessidade | 1–4    | Abertura, homem, material comum, Adulão |
| II — A resposta   | 5–7    | Convicção, recusas, marca               |
| III — O programa  | 8–11   | Arquitetura, matriz, edições            |
| IV — A prova      | 12–13  | Material pronto, rigor                  |
| V — O pedido      | 14–15  | Progressão, portão pastoral             |

Circulação: **Rota B** — homologação restrita; dados institucionais/pessoais
não tratados como validados para divulgação ampla
(`task-p0-08-e-p0-10-validacao-institucional.md`).

---

## 4. Mapa de stakeholders

| Stakeholder                         | Papel                          | Prioridade       | Fonte / classe                                 |
| ----------------------------------- | ------------------------------ | ---------------- | ---------------------------------------------- |
| Pr. Glaydston Gama Lopes            | Decisor/leitor da apresentação | Máxima           | `config.js` CANÔNICO (nome); papel = LACUNA    |
| Obr. Flávio Alves da Costa          | Autor/apresentador configurado | Alta             | `config.js`; P0-08 NÃO CONFIRMADO p/ ampliação |
| Projeto Caserna de Adulão           | Contexto institucional         | Alta             | README / contexto                              |
| Instrutores, capelanias, lideranças | Implementadores                | Média            | `programa.md`                                  |
| Militares e custodiados             | Beneficiários do programa      | Alta na mensagem | `programa.md`                                  |
| PMCE / órgãos públicos              | Contexto externo               | Restrição        | Não parceiro; menção = LACUNA p/ ampliação     |

Detalhe JTBD: dossiê §4.

---

## 5. Público decisor da apresentação

- **Papel:** autoridade pastoral que recebe projeto em apreciação.
- **Pessoa configurada:** Pr. Glaydston Gama Lopes; cargo “Pastor-presidente”.
- **Situação anterior à leitura:** precisa discernir fidelidade, cuidado,
  coerência, maturidade e viabilidade sem tratar material como homologado.
- **Conhecimento prévio:** LACUNA (não documentado no repo).
- **Decisão esperada:** ver §8 (ação principal) — HIPÓTESE / LACUNA de unificação.

Não confundir com o público do **programa** (beneficiários).

---

## 6. Beneficiários e implementadores

**Beneficiários (programa)** — CANÔNICO INTERNO: militares e custodiados como
irmãos em restauração e futuros multiplicadores sob supervisão pastoral — não
alunos acadêmicos, leads ou público de campanha.

**Implementadores:** instrutores, capelanias e lideranças corresponsáveis.

**Fora do escopo do material do aluno:** debates confessionais secundários;
políticas institucionais; tratamentos clínicos (encaminhamento à capelania/saúde).

---

## 7. Jobs to be done (decisor)

| Tipo             | Trabalho                                                           | Classe                           |
| ---------------- | ------------------------------------------------------------------ | -------------------------------- |
| Funcional        | Entender o que é o programa, para quem é, o que está pronto        | INFERÊNCIA de contexto §objetivo |
| Pastoral         | Julgar fidelidade bíblica e cuidado com feridos                    | INFERÊNCIA                       |
| Institucional    | Distinguir programa vs Projeto; pronto vs condicionado vs pendente | INFERÊNCIA                       |
| Emocional        | Confiar sem pressa de endosso                                      | HIPÓTESE                         |
| Redução de risco | Evitar militarização da fé, coerção, exposição, chancela falsa     | INFERÊNCIA + princípios          |

---

## 8. Ação principal

**HIPÓTESE (não aprovada):** o resultado desejado após a leitura é um
**retorno pastoral documentável** — apreciação/orientação que esclareça ao menos:

1. apreciação do Módulo 1 e do prospecto;
2. posição sobre homologação do Guia v1.0-RC;
3. se a produção dos Módulos 2–4 pode avançar;
4. demais itens do checklist do roteiro de homologação (Tela 29), se aplicáveis.

**Fonte da hipótese:** `docs/roteiro-apresentacao-homologacao-v1.md` (INTERNO NÃO CANÔNICO).

**Bloqueio:** se o destinatário não puder unificar em uma única ação, manter o
**menu** acima e registrar a decisão em H2 do roteiro humano. Não usar CTA
comercial, formulário de captação nem linguagem de “conversão” mercadológica.

---

## 9. Objeção principal

**HIPÓTESE ranqueada #1 (empatada — humano confirma em H3):**

> “Não fica claro o que já pode ser confiado como pronto e o que ainda depende
> de mim — e há risco de a metáfora militar governar o evangelho ou de o
> material parecer produto homologado demais.”

Combina: (a) clareza pronto/pendente; (b) militarização/mérito — ambas
sustentadas por princípios canônicos e pelo estado M1 vs M2–4.

### Cinco objeções priorizadas

| #   | Formulação                                              | Origem                    | Impacto                    | Evidência que responde                            | Resposta pastoral permitida                         | Lacuna                 |
| --- | ------------------------------------------------------- | ------------------------- | -------------------------- | ------------------------------------------------- | --------------------------------------------------- | ---------------------- |
| 1   | Pronto vs pendente opaco / aparência de produto acabado | Estado M1 vs M2–4; Rota B | Atraso ou endosso indevido | `modulos.json` estados; textos de condicionamento | Explicitar estados; nunca declarar M2–4 finalizados | Forma do retorno (H13) |
| 2   | Militarização da fé / mérito                            | Princípio inegociável     | Distorção teológica        | Tabela dos sete princípios                        | Metáfora serve ao evangelho                         | —                      |
| 3   | Clareza institucional / PMCE / cargos                   | P0-08; TODO               | Risco reputacional         | Rota B; sem chancela                              | Não inferir vínculo                                 | H4, H5, H17            |
| 4   | Indefinição do escopo de validação                      | Menu Tela 29              | Pedido confuso             | Roteiro + este briefing                           | Uma ação ou menu explícito                          | H2                     |
| 5   | Extensão / implantação / governança de instrutores      | Natureza 48 encontros     | Medo de inviabilidade      | Progressão como cuidado; público secundário       | Não prometer turma-piloto sem decisão               | H16                    |

---

## 10. Três provas principais

1. **Módulo 1 produzido** (edições Aluno e Instrutor) — CANÔNICO INTERNO
   (`programa.md`, estado em `modulos.json`).
2. **Matriz de 48 lições** com títulos/objetivos e honestidade de estados —
   CANÔNICO INTERNO (`matriz-curricular.json`).
3. **Sete princípios inegociáveis** + fidelidade bíblica (NAA) —
   CANÔNICO INTERNO (`programa.md`).

Provas **proibidas** de inventar: depoimentos, números de participantes,
endossos, resultados espirituais, chancela PMCE.

---

## 11. Frase de posicionamento

> Para a autoridade pastoral que recebe um material ainda em apreciação, o
> Discipulando a Caserna é um percurso anual de discipulado cristocêntrico
> (4×12) apresentado como prospecto digital de trabalho — não como portal nem
> produto homologado — que torna legível o que está pronto, o que está
> condicionado e o que se pede de orientação, diferente de associações de
> capelania ou redes de comunhão militar que não entregam este Guia/matriz com
> estados de produção, porque o Módulo 1 já existe nas edições Aluno e Instrutor
> e os princípios inegociáveis vedam militarizar a fé ou esconder pendências.

(Status da frase: EM REVISÃO — depende de H1/H2.)

---

## 12. Matriz de análogos (síntese)

Detalhe e datas: dossiê §6. Classificações: **não** são concorrentes comerciais.

| #   | Organização / alternativa                 | Classificação              | O que extrair                     | O que descartar                      |
| --- | ----------------------------------------- | -------------------------- | --------------------------------- | ------------------------------------ |
| 1   | PMs de Cristo                             | Capelania / cuidado BR     | Tom de cuidado à família policial | Modelo associativo SP ≠ currículo 48 |
| 2   | UMCEB                                     | Rede militares cristãos BR | Escala/companheirismo             | Não é prospecto de validação de Guia |
| 3   | PMCE CSASR/organograma                    | Contexto oficial           | Vocabulário de assistência        | Qualquer chancela/parceria           |
| 4   | Navigators Military                       | Discipulado internacional  | Relacional / multiplicação        | Contexto EUA; ministry marketing     |
| 5   | OCF                                       | Comunhão internacional     | Fé–família–profissão              | Importar estrutura OCF               |
| 6   | Cru Military                              | Internacional              | Cuidado em ciclos operacionais    | Fact sheet ≠ nosso pedido pastoral   |
| 7   | Guia + apostilas + conversas + protótipos | Alternativa atual          | Autoridade do Guia                | Falta status digital rastreável      |

---

## 13. Convenções do nicho

### Pastorais

Submissão ao decisor; fidelidade às fontes; ausência de promessa espiritual;
cuidado; distinguir discipulado ≠ aconselhamento ≠ tratamento clínico; não
expor pessoas; transparência de estado; pedido explícito.

### Institucionais

Identificação correta; sem chancela implícita; cargos/nomes com classe de
confirmação; Rota B até P0-08 completa.

### Militares

Hierarquia respeitada sem virar argumento teológico; sem bravata; disciplina
subordinada à graça; antimérito.

### Custódia

Voluntariedade; dignidade; não constrangimento; privacidade; participação
religiosa não é privilégio/mérito (alinhar a CF/LEP/9.982 como **restrição**,
sem parecer).

### Digitais

Documento de trabalho; rastreabilidade; leitura autônoma; a11y; linguagem
sóbría; sem CTA de captação; sem parecer “já homologado”.

---

## 14. Contexto jurídico e institucional

Referências (EXTERNO OFICIAL): CF art. 5º VI, VII, X; Lei 9.982/2000; LEP art. 24.
Uso: fundamentar voluntariedade e não coerção na comunicação.

**Não é parecer jurídico.** Interpretação aprofundada = LACUNA / revisão
competente.

SAMHSA (EXTERNO SECUNDÁRIO): apenas princípios de segurança, voz/escolha e
confiança na comunicação — não transformar o programa em intervenção de saúde
mental.

---

## 15. Arquitetura de mensagem (textual)

Avaliação dos movimentos **shipped** frente ao briefing (sem redesenhar):

| Movimento     | Pergunta do destinatário        | Evidência                 | Objeção que reduz           | Prepara  |
| ------------- | ------------------------------- | ------------------------- | --------------------------- | -------- |
| I Necessidade | Por que isso existe?            | Adulão, dor, terreno      | Cinismo / material genérico | Resposta |
| II Resposta   | O que se recusa e o que se crê? | Convicção, marca          | Militarização / mérito      | Programa |
| III Programa  | Como funciona e para quem?      | 4×12, princípios, edições | Incompreensão curricular    | Prova    |
| IV Prova      | O que já posso examinar?        | M1, rigor                 | “Não há substância”         | Pedido   |
| V Pedido      | O que se espera de mim?         | Portão pastoral           | Indefinição de ação         | Retorno  |

Tensão registrada: rótulos da `arquitetura-narrativa-v1.md` diferem; **não**
reordenar o site nesta fase.

---

## 16. Restrições

- Não inventar endossos, parceiros, estatísticas, depoimentos.
- Não completar `null`s.
- Não editar Guia a partir do site nem o contrário sem pipeline.
- Não promover protótipo a produto.
- Não analytics/formulários nesta fase.
- Menção PMCE sujeita a H4.
- Copy literal só via `conteudo/`.

---

## 17. Métricas

| Tipo        | Métrica                                                                        | Classe                               |
| ----------- | ------------------------------------------------------------------------------ | ------------------------------------ |
| Compreensão | Destinatário explica programa, público, princípios, pronto vs pendente, pedido | Proposta                             |
| Decisão     | Emite orientação / aprova parcialmente / pede ajustes / define próximo passo   | Proposta / depende H2                |
| Fidelidade  | Afirmações rastreáveis; sem fatos inventados; princípios preservados           | Confirmada como critério de processo |
| Completude  | Sete perguntas tratadas; objeções/provas; lacunas centralizadas                | Confirmada (este briefing)           |
| Operacional | Lacunas críticas restantes após leitura                                        | Proposta                             |
| Digital     | Analytics/cookies                                                              | NÃO APLICÁVEL / fora do produto      |

---

## 18. Critérios de rejeição deste briefing / da apresentação

Rejeitar se:

- confundir Projeto e programa;
- tratar o site como portal público;
- transformar o destinatário em lead;
- usar CTA comercial ou “conversão” mercadológica;
- chamar análogos de concorrentes comerciais;
- inventar parceiro, chancela ou endosso;
- declarar vínculo oficial com a PMCE sem confirmação;
- tratar participação religiosa como obrigatória;
- expor militares ou custodiados;
- prometer resultado espiritual;
- usar mérito como base da progressão;
- militarizar a fé;
- medicalizar o cuidado pastoral ou substituir clínica por discipulado;
- criar estatísticas sem fonte;
- declarar módulos incompletos como finalizados;
- esconder lacunas;
- alterar copy canônica;
- antecipar direção visual da Fase 2;
- redesenhar o produto durante o mapeamento.

---

## 19. Riscos

| Risco                             | Mitigação                           |
| --------------------------------- | ----------------------------------- |
| Falsa precisão de dados de config | P0-08 / Rota B                      |
| Endosso implícito                 | Status EM REVISÃO; sem “homologado” |
| Exposição / coerção               | Princípios + leis como restrição    |
| Briefing virar nova copy          | Apontar a `conteudo/`               |
| Antecipar Fase 2                  | Sem tokens/layout novos             |

---

## 20. Fontes

- `conteudo/programa.md`, `identidade.md`, `LEIA-ME.md`, `modulos.json`, `matriz-curricular.json`
- `docs/contexto-do-projeto.md`, `roteiro-apresentacao-homologacao-v1.md`, `decisao-visual-v1.md`
- `docs/validacoes/task-p0-08-e-p0-10-validacao-institucional.md`
- `TODO.md`, `prototipos/prospecto-v1/js/config.js`
- Dossiê Fase 1 (análogos e leis)
- ADRs 001–007; `AGENTS.md`; `.cursor/rules/discipulando-caserna.mdc`

---

## 21. Hipóteses

- H-Ação: retorno pastoral documentável (menu Tela 29) é a ação principal.
- H-Objeção: empate entre opacidade pronto/pendente e risco de militarização.
- H-Papel: Glaydston é destinatário com autoridade para orientar; não há homologação concluída.

---

## 22. Lacunas humanas e decisões pendentes

Ver [`fase-1/roteiro-de-validacao-humana.md`](fase-1/roteiro-de-validacao-humana.md)
(H1–H17) e `TODO.md`. Nenhuma lacuna foi preenchida automaticamente.

---

## 23. Situação atual (alternativa ao site)

Hoje a apreciação também pode ocorrer via Guia Mestre, apostilas do M1,
conversas e protótipos. O prospecto digital complementariza com narrativa,
estados e pedido estruturado — não substitui o Guia.
