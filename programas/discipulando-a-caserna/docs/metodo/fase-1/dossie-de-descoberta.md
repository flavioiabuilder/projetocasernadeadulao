# Dossiê de descoberta — Fase 1

- **Programa:** Discipulando a Caserna
- **Data do dossiê:** 2026-07-31
- **Status:** EM REVISÃO
- **Papel:** evidências da pesquisa; o Briefing Estratégico é a síntese
- **Briefing:** [`../01-briefing-estrategico.md`](../01-briefing-estrategico.md)
- **Roteiro humano:** [`roteiro-de-validacao-humana.md`](roteiro-de-validacao-humana.md)

Classes de proveniência: `CANÔNICO INTERNO` · `INTERNO NÃO CANÔNICO` ·
`EXTERNO OFICIAL` · `EXTERNO SECUNDÁRIO` · `INFERÊNCIA` · `HIPÓTESE` ·
`LACUNA HUMANA`.

---

## 1. Inventário de fontes internas

| Fonte                                         | Papel                         | Autoridade              | Conteúdo útil                         | Limitações                    |
| --------------------------------------------- | ----------------------------- | ----------------------- | ------------------------------------- | ----------------------------- |
| `conteudo/*.md`, `*.json`                     | Copy e dados do site          | CANÔNICO INTERNO        | Público, princípios, currículo, nulls | Não é briefing                |
| `docs/contexto-do-projeto.md`                 | Contexto + dúvidas            | INTERNO NÃO CANÔNICO    | Destinatário, movimentos, lacunas     | Mistura fato e pergunta       |
| `docs/roteiro-apresentacao-homologacao-v1.md` | Homologação restrita          | INTERNO NÃO CANÔNICO    | Checklist Tela 29, pedido             | Afirma “validador” sem P0-08  |
| `docs/validacoes/task-p0-08-e-p0-10-…`        | Rota B                        | CANÔNICO de processo    | O que não está confirmado             | Não define nicho completo     |
| `TODO.md`                                     | Pendências humanas            | Operacional             | Bloqueios                             | Não prova fatos               |
| `prototipos/.../js/config.js`                 | Metadados prospecto           | CANÔNICO para metadados | Nome, cargo, autor, CNPJ…             | Sujeito a P0-08 p/ circulação |
| `docs/arquitetura-narrativa-v1.md`            | Concepção (rótulos distintos) | INTERNO / histórico     | JTBD de leitura                       | Não redesenhar site           |
| `docs/decisao-visual-v1.md`                   | Direção A                     | Decisão humana          | Tom/público visual                    | Fora da F1 visual             |
| `fontes/guia-mestre/`                         | Referência pastoral           | Referência              | Homologação pendente                  | Não extrair copy nova         |
| Protótipos HTML                               | Estado da UI                  | INTERNO NÃO CANÔNICO    | O que a superfície mostra             | Inferior a `conteudo/`        |

---

## 2. Matriz de proveniência (temas críticos)

| Afirmação ou tema                     | Classe                          | Fonte                         | Pode entrar no briefing?               | Ação                               |
| ------------------------------------- | ------------------------------- | ----------------------------- | -------------------------------------- | ---------------------------------- |
| Discipulando ≠ Projeto Caserna        | CANÔNICO INTERNO                | README, rules, contexto       | Sim                                    | Citar                              |
| 4×12=48; eixo Cristo chama…           | CANÔNICO INTERNO                | `programa.md`, JSON           | Sim                                    | Citar                              |
| Sete princípios inegociáveis          | CANÔNICO INTERNO                | `programa.md`                 | Sim                                    | Citar                              |
| M1 produzido; M2–4 condicionados      | CANÔNICO INTERNO                | `programa.md`, `modulos.json` | Sim                                    | Não chamar M2–4 finalizados        |
| Nulls M3/M4 virtude/tema              | CANÔNICO INTERNO                | `modulos.json`                | Sim como restrição                     | Nunca completar                    |
| Destinatário Pr. Glaydston (config)   | CANÔNICO INTERNO                | `config.js`                   | Sim como destinatário configurado      | Separar de papel eclesial          |
| Papel “validador pastoral”            | INTERNO NÃO CANÔNICO + LACUNA   | roteiro; P0-08                | Só como candidato                      | Roteiro humano                     |
| Ação = checklist Tela 29              | INTERNO NÃO CANÔNICO            | roteiro                       | Como HIPÓTESE de ação                  | Confirmar humano                   |
| PMCE como terreno                     | INTERNO + LACUNA circulação     | conteúdo/roteiro; TODO; P0-08 | Com status Rota B                      | Não inferir vínculo                |
| CNPJ, email, Fortaleza                | Em config; P0-08 não confirmado | config; P0-08                 | Candidatos NÃO CONFIRMADO p/ ampliação | Não como parceria                  |
| Movimentos shipped Necessidade→Pedido | CANÔNICO de arquitetura do site | contexto, LEIA-ME, TODO       | Sim                                    | Não trocar por narrativa-concepção |
| Análogos externos                     | EXTERNO OFICIAL                 | URLs §3                       | Sim na matriz                          | Data de acesso                     |
| CF / leis assistência religiosa       | EXTERNO OFICIAL                 | Planalto                      | Contexto de restrição                  | Sem parecer jurídico               |
| SAMHSA trauma-informed                | EXTERNO SECUNDÁRIO              | samhsa.gov                    | Só salvaguarda de comunicação          | Não medicalizar                    |

---

## 3. Divergências internas registradas

1. **Rótulos dos cinco movimentos:** concepção (`arquitetura-narrativa-v1.md`: Endereço…) vs shipped (Necessidade → Pedido). Briefing usa **shipped**.
2. **Glaydston como “validador”** (roteiro) vs **não confirmado** (P0-08) e papel unclear (contexto).
3. **PMCE no conteúdo** vs bloqueio de circulação ampliada (TODO + P0-08).
4. **Neutralidade institucional** (material do aluno) vs menção PMCE na apresentação — superfícies distintas; tensão se misturadas.
5. **identidade.md** ainda menciona placeholder de logo vs arte em `assets/img/logo-pdac/` (apreciação pastoral pendente no TODO).

---

## 4. Quatro mapas de stakeholders / JTBD

### 4.1 Decisor da apresentação

| Campo                  | Conteúdo                                                 | Classe                               |
| ---------------------- | -------------------------------------------------------- | ------------------------------------ |
| Papel                  | Autoridade pastoral destinatária da apreciação           | HIPÓTESE / config CANÔNICO para nome |
| Pessoa configurada     | Pr. Glaydston Gama Lopes; cargo “Pastor-presidente”      | CANÔNICO INTERNO (`config.js`)       |
| Contexto               | Recebe prospecto/homologação ainda em apreciação         | INTERNO NÃO CANÔNICO                 |
| JTBD funcional         | Compreender programa, estado de produção e pedido        | INFERÊNCIA de contexto §objetivo     |
| JTBD pastoral          | Discernir fidelidade, cuidado, coerência, viabilidade    | INFERÊNCIA                           |
| JTBD institucional     | Distinguir pronto / condicionado / pendente              | INFERÊNCIA                           |
| JTBD emocional / risco | Reduzir risco de endosso indevido ou militarização da fé | HIPÓTESE                             |
| Decisão esperada       | Orientação / homologação / ajustes (menu Tela 29)        | HIPÓTESE (roteiro)                   |
| Prioridade             | Máxima                                                   | —                                    |

### 4.2 Implementadores

| Campo                       | Conteúdo                                                           | Classe                           |
| --------------------------- | ------------------------------------------------------------------ | -------------------------------- |
| Papéis                      | Instrutores, capelanias, lideranças corresponsáveis                | CANÔNICO INTERNO (`programa.md`) |
| JTBD                        | Entender como aplicar, limites clínicos/institucionais, governança | INFERÊNCIA                       |
| Decisão na superfície atual | Não é o CTA primário do prospecto                                  | INFERÊNCIA                       |
| Prioridade                  | Média (secundário na F1)                                           | —                                |

### 4.3 Beneficiários do programa

| Campo               | Conteúdo                                                       | Classe                                   |
| ------------------- | -------------------------------------------------------------- | ---------------------------------------- |
| Papéis              | Militares e custodiados — irmãos em restauração                | CANÔNICO INTERNO                         |
| Contexto de chegada | Ferido, culpado, fragilizado; vergonha, estigma, autoridade    | CANÔNICO INTERNO (princípios/progressão) |
| Riscos de mensagem  | Exposição, coerção, mérito, militarização da fé, medicalização | CANÔNICO + INFERÊNCIA de salvaguardas    |
| Decisão no site     | Nenhuma — não são o usuário da apresentação                    | INFERÊNCIA                               |
| Prioridade          | Alta na mensagem; baixa como “persona do site”                 | —                                        |

### 4.4 Contexto institucional ampliado

| Campo                      | Conteúdo                                                       | Classe                                       |
| -------------------------- | -------------------------------------------------------------- | -------------------------------------------- |
| Projeto Caserna de Adulão  | Contexto ministerial mais amplo; não sinônimo do programa      | CANÔNICO INTERNO                             |
| PMCE / NAR                 | Contexto oficial externo possível; **não parceiro confirmado** | EXTERNO OFICIAL (estrutura) + LACUNA vínculo |
| Igreja local / outras orgs | Ampliação futura                                               | LACUNA HUMANA                                |
| Regra                      | Não inferir chancela, parceria ou autorização                  | P0-08 / Rota B                               |

---

## 5. Sete perguntas — estado da descoberta

### P1 — Quem precisa desta apresentação?

- **Respondido parcialmente:** destinatário formal Pr. Glaydston (`config.js`).
- **Falta:** papel eclesial/jurídico exato (só leitor vs autor vs validador homologado).
- **Classe do gap:** LACUNA HUMANA (ver roteiro).

### P2 — Qual trabalho (JTBD)?

- **Respondido:** compreender → apreciar → orientar → validar (contexto §objetivo) — trabalhos funcional, pastoral, institucional e de redução de risco.
- **Falta:** priorização humana de qual decisão fecha o ciclo.

### P3 — O que usa hoje?

- Guia Mestre v1.0-RC; apostilas M1 Aluno/Instrutor; conversas; protótipos (prospecto, storytelling, homologação); roteiro de homologação; processo informal de apreciação.
- O site **não** substitui esses instrumentos (INFERÊNCIA alinhada a ADRs/contexto).

### P4 — Objeção principal?

Candidatas (HIPÓTESES ranqueadas no briefing):

1. Risco de militarização da fé / mérito
2. Programa parcialmente produzido (M2–4)
3. Falta de clareza institucional (Projeto, cargos, PMCE)
4. Indefinição do que exatamente validar
5. Extensão / dificuldade de implantação / governança

**Escolha no briefing:** HIPÓTESE — clareza do que está pronto vs pendente + risco de militarização (empate documentado; humano pode reordenar).

### P5 — Que prova convence?

Provas rastreáveis propostas:

1. Módulo 1 produzido (Aluno + Instrutor) — `programa.md` / matriz
2. Matriz de 48 lições com estados honestos — `matriz-curricular.json` / `modulos.json`
3. Sete princípios inegociáveis + rastreabilidade bíblica (NAA) — `programa.md`

### P6 — Única ação que importa?

- **HIPÓTESE forte (roteiro Tela 29):** retorno pastoral estruturado — apreciação M1, homologação Guia, liberação condicionada M2–4, etc.
- Se o humano não puder unificar → briefing registra menu permitido e bloqueio da “única” ação.

### P7 — Como medir sucesso?

Ver briefing § métricas (compreensão, decisão, fidelidade, completude). Analytics fora do produto.

---

## 6. Pesquisa externa — análogos (amostra de 7)

Data de acesso deste dossiê: **2026-07-31**; revalidação parcial **2026-08-01**.

**Contrato da amostra final:** cada ficha abaixo preenche os campos mínimos
(organização, país/contexto, classificação, público, promessa, prova,
estrutura pública, próximo passo, tom, convenções, acertos, inadequações,
lacuna, fonte, título, data, evidência, inferência) ou fica fora da amostra
como INCOMPLETO / arquivado.

### 6.1 PMs de Cristo (Brasil) — amostra final

| Campo             | Conteúdo                                                                                            |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| Organização       | PMs de Cristo                                                                                       |
| País/contexto     | Brasil (SP)                                                                                         |
| Classificação     | Análogo institucional / referência de capelania                                                     |
| Público           | Família policial militar                                                                            |
| Promessa          | Apoio espiritual/emocional; valorização da pessoa do PM                                             |
| Prova             | Capelania, Programa Polícia e Igreja, associação                                                    |
| Estrutura pública | Quem somos; capelania; programas de cuidado                                                         |
| Próximo passo     | Associação / voluntariado / parceria de igrejas                                                     |
| Tom               | Pastoral de cuidado; mobilização                                                                    |
| Convenções        | Linguagem de família policial; chamada a parceria eclesial                                          |
| Acertos           | Clareza de cuidado à família policial; capelania                                                    |
| Inadequações      | Não é currículo anual 48 lições para custodiados; não é prospecto de validação pastoral de material |
| Lacuna            | Prospecto que distingue cuidado pontual vs percurso estruturado de discipulado                      |
| Fonte             | https://www.pmsdecristo.org.br/quem-somos/                                                          |
| Título            | Quem somos — PMs de Cristo                                                                          |
| Data              | 2026-07-31                                                                                          |
| Evidência         | Missão/visão e programas descritos no site                                                          |
| Inferência        | “Não é currículo 48 / prospecto de Guia” = comparação com o piloto                                  |

### 6.2 UMCEB (Brasil) — amostra final

| Campo             | Conteúdo                                                         |
| ----------------- | ---------------------------------------------------------------- |
| Organização       | UMCEB                                                            |
| País/contexto     | Brasil                                                           |
| Classificação     | Rede brasileira / referência organizacional                      |
| Público           | Militares e segurança pública evangélicos e familiares           |
| Promessa          | Companheirismo, evangelização no meio militar, maturidade        |
| Prova             | Histórico desde AOE/AOC; uniões estaduais; vínculo AMCF          |
| Estrutura pública | Histórico institucional; rede de uniões                          |
| Próximo passo     | Integração em núcleos/associações; congressos                    |
| Tom               | Institucional associativo                                        |
| Convenções        | Linguagem de unidade e companheirismo militar cristão            |
| Acertos           | Escala nacional; linguagem de unidade                            |
| Inadequações      | Não substitui Guia/módulo de discipulado com estados de produção |
| Lacuna            | Entregável com estados de produção e pedido pastoral explícito   |
| Fonte             | https://umceb.com.br/site/historico.html                         |
| Título            | Histórico — UMCEB                                                |
| Data              | 2026-07-31                                                       |
| Evidência         | Histórico/missão no site                                         |
| Inferência        | Diferença de entregável frente ao prospecto do piloto            |

### 6.3 PMCE — CSASR (contexto oficial) — amostra final

| Campo             | Conteúdo                                                                                                                                                         |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Organização       | PMCE — Diretoria de Saúde, Assistência Social e Religiosa (CSASR / DSASR)                                                                                        |
| País/contexto     | Brasil (CE)                                                                                                                                                      |
| Classificação     | Contexto institucional oficial (**não parceiro**)                                                                                                                |
| Público           | Policiais militares (ativa/reserva) e, em alguns serviços, dependentes                                                                                           |
| Promessa          | Acolher, cuidar e monitorar o PM; saúde, assistência social e espiritual                                                                                         |
| Prova             | Página institucional com missão, visão, valores e programas (psicossocial, plantão, NAP, etc.)                                                                   |
| Estrutura pública | Apresentação da diretoria; programas e atividades; contatos                                                                                                      |
| Próximo passo     | Acesso a serviços da diretoria (não é “inscrição em discipulado”)                                                                                                |
| Tom               | Órgão público de assistência                                                                                                                                     |
| Convenções        | Vocabulário de saúde/assistência/espiritualidade institucional                                                                                                   |
| Acertos           | Vocabulário oficial de assistência espiritual no contexto PMCE                                                                                                   |
| Inadequações      | Não é currículo de discipulado; não autoriza chancela do piloto                                                                                                  |
| Lacuna            | Vínculo jurídico/circulação ampliada do Discipulando com PMCE = LACUNA (P0-08)                                                                                   |
| Fonte             | https://www.pm.ce.gov.br/csasrpmce/                                                                                                                              |
| Título            | Diretoria de Saúde – DS/PMCE (CSASR)                                                                                                                             |
| Data              | Revalidação 2026-08-01 (OK); tentativa anterior 2026-07-31 com timeout                                                                                           |
| Evidência         | Missão: “serviço de saúde, assistência social e espiritual”; nome CSASR/DSASR na página                                                                          |
| Inferência        | Qualquer parceria ou endosso do programa = proibido sem confirmação humana                                                                                       |
| Aplicabilidade    | COMPLEMENTAR / CONTEXTO OFICIAL — não clínica do programa; não prova de parceria                                                                                 |

### 6.4 Navigators Military (EUA / internacional) — amostra final

| Campo             | Conteúdo                                                                     |
| ----------------- | ---------------------------------------------------------------------------- |
| Organização       | The Navigators — Military                                                    |
| País/contexto     | EUA / internacional                                                          |
| Classificação     | Referência internacional de discipulado                                      |
| Público           | Militares EUA, famílias, veteranos, academias                                |
| Promessa          | Discipulado life-to-life, estudos, mentoria, multiplicadores                 |
| Prova             | Longevidade desde 1940s; trabalho com capelães (declaração do ministry site) |
| Estrutura pública | Página de ministry; recursos e relatos                                       |
| Próximo passo     | Engajar-se no ministry / doação (padrão ministry site)                       |
| Tom               | Ministry marketing internacional                                             |
| Convenções        | Multiplicação relacional; linguagem de mission field militar                 |
| Acertos           | Ênfase relacional e multiplicação                                            |
| Inadequações      | Contexto EUA; não é apreciação de Guia pastoral BR                           |
| Lacuna            | Forma BR de prospecto de material em apreciação                              |
| Fonte             | https://www.navigators.org/ministry/navigators-military/                     |
| Título            | Navigators Military                                                          |
| Data              | 2026-07-31                                                                   |
| Evidência         | Declarações públicas da página de ministry                                   |
| Inferência        | Adequação limitada ao pedido pastoral do piloto                              |

### 6.5 Cru Military — amostra final

| Campo             | Conteúdo                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| Organização       | Cru Military                                                                                          |
| País/contexto     | EUA / 56 localidades EUA e 35 países (fact sheet)                                                     |
| Classificação     | Referência internacional                                                                              |
| Público           | Recrutas, ativa, reserva, separados e famílias                                                        |
| Promessa          | Cuidado espiritual com capelães/igrejas antes, durante e depois de deployment                         |
| Prova             | Fact sheet: fundação 1965; ~170 staff; programas SFRS, casamento, trauma                              |
| Estrutura pública | Fact sheet + programas + loja de recursos                                                             |
| Próximo passo     | Recursos, parcerias, doação (CTA “Give Bibles”)                                                       |
| Tom               | Ministry / fact sheet corporativo de ONG                                                              |
| Convenções        | Ciclos operacionais; parceria com capelania                                                           |
| Acertos           | Clareza de cuidado em ciclos; nomeação de programas                                                   |
| Inadequações      | Fact sheet ≠ pedido pastoral de Guia; CTAs de captação; não inferir parceria com o piloto             |
| Lacuna            | Prospecto de validação de material com estados de produção                                            |
| Fonte             | https://www.cru.org/us/en/about/news/fact-sheets/cru-military-fact-sheet.html                         |
| Título            | Fact Sheet: Cru Military                                                                              |
| Data              | 2026-08-01                                                                                            |
| Evidência         | Purpose, scope, programs e resources no fact sheet                                                    |
| Inferência        | Distância do entregável “prospecto de apreciação”                                                     |

### 6.6 Alternativa atual ao site (obrigatória) — amostra final

| Campo             | Conteúdo                                                                       |
| ----------------- | ------------------------------------------------------------------------------ |
| Organização       | Processo atual do Discipulando / Projeto (interno)                             |
| País/contexto     | Brasil (Fortaleza-CE)                                                          |
| Classificação     | Alternativa atual                                                              |
| Público           | Autoridade pastoral em apreciação; implementadores                             |
| Promessa          | Apresentar o percurso e o material via documentos e conversa                   |
| Prova             | Guia Mestre; apostilas M1; protótipos; roteiro de homologação                  |
| Estrutura pública | Não é um único documento digital rastreável de status                          |
| Próximo passo     | Conversas e revisão de arquivos dispersos                                      |
| Tom               | Pastoral / documental                                                          |
| Convenções        | Autoridade do Guia; densidade impressa                                         |
| Acertos           | Autoridade pastoral do Guia; detalhe curricular                                |
| Inadequações      | Falta status digital rastreável de pedido com a11y e paridade                  |
| Lacuna            | Superfície digital que torna legível pronto / condicionado / pedido            |
| Fonte             | `fontes/guia-mestre/`, `conteudo/`, `docs/roteiro-…`, protótipos               |
| Título            | Alternativa atual (Guia + apostilas + conversas + protótipos)                  |
| Data              | 2026-07-31                                                                     |
| Evidência         | Paths internos existentes no repositório                                       |
| Inferência        | O prospecto complementariza, não substitui o Guia                              |

### Fora da amostra final (INCOMPLETO / arquivado)

| Item | Status | Razão | Nota |
| ---- | ------ | ----- | ---- |
| Officers’ Christian Fellowship (OCF) — https://www.ocfusa.org/learnmore/ | **INCOMPLETO** | Revalidação 2026-08-01: timeout WebFetch; ficha anterior sem campos mínimos | Não inventar conteúdo; reavaliar se a URL estabilizar |
| Armed Services Ministry — https://armedservicesministry.org/about/ | **Arquivado (suplente)** | Stub sem ficha; não satisfaz contrato da amostra | Mantido só como ponteiro histórico |

---

## 7. Contexto jurídico e salvaguardas (sem parecer)

Separar **autoridade da fonte** de **aplicabilidade ao projeto**.

| Título / norma | Organização | URL / path | Data de acesso | Trecho ou tema utilizado | Autoridade | Aplicabilidade | Limitação |
| -------------- | ----------- | ---------- | -------------- | ------------------------ | ---------- | -------------- | --------- |
| CF art. 5º VI, VII, X | República Federativa do Brasil | http://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm | 2026-07-31 | Liberdade religiosa; assistência em internação; intimidade | EXTERNO OFICIAL | COMPLEMENTAR — restrição de coerção/exposição na comunicação | Sem parecer jurídico; não autoriza conteúdo clínico |
| Lei 9.982/2000 | República Federativa do Brasil | http://www.planalto.gov.br/ccivil_03/leis/l9982.htm | 2026-07-31 | Acesso à assistência religiosa com acordo do assistido | EXTERNO OFICIAL | COMPLEMENTAR — voluntariedade | Sem parecer; não define currículo do programa |
| LEP art. 24 | República Federativa do Brasil | http://www.planalto.gov.br/ccivil_03/leis/l7210.htm | 2026-07-31 | Liberdade de culto; não obrigar participação | EXTERNO OFICIAL | COMPLEMENTAR — voluntariedade em custódia | Sem parecer; não expor pessoas |
| Trauma-Informed Approach (SAMHSA) | SAMHSA (EUA) | https://www.samhsa.gov/ | 2026-07-31 | Segurança, voz/escolha, confiança | EXTERNO SECUNDÁRIO | COMPLEMENTAR / **NÃO CLÍNICA** | Só salvaguarda de comunicação; não medicalizar nem importar protocolo clínico |

Qualquer interpretação normativa → **requer revisão jurídica/institucional competente** (LACUNA se aprofundar).

---

## 8. Limitações da pesquisa

- Algumas URLs (PMCE) podem timeout; revalidar.
- Não houve entrevista com o destinatário nesta fase.
- Dados de `config.js` repetidos no repo ≠ confirmação externa (P0-08).
- Não se produziu parecer jurídico nem teológico novo.

---

## 9. Ligação com o briefing

Síntese operacional em [`../01-briefing-estrategico.md`](../01-briefing-estrategico.md).  
Perguntas humanas em [`roteiro-de-validacao-humana.md`](roteiro-de-validacao-humana.md).
