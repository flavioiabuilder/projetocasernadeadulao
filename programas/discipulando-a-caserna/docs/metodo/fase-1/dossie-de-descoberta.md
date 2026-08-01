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

Data de acesso deste dossiê: **2026-07-31**, salvo indicação.

### 6.1 PMs de Cristo (Brasil)

| Campo                   | Conteúdo                                                                                            |
| ----------------------- | --------------------------------------------------------------------------------------------------- |
| Classificação           | Análogo institucional / referência de capelania                                                     |
| País                    | Brasil (SP)                                                                                         |
| Público declarado       | Família policial militar                                                                            |
| Promessa                | Apoio espiritual/emocional; valorização da pessoa do PM                                             |
| Prova                   | Capelania, Programa Polícia e Igreja, associação                                                    |
| Próximo passo           | Associação / voluntariado / parceria de igrejas                                                     |
| Tom                     | Pastoral de cuidado; mobilização                                                                    |
| O que faz bem           | Clareza de cuidado à família policial; capelania                                                    |
| O que não serve         | Não é currículo anual 48 lições para custodiados; não é prospecto de validação pastoral de material |
| Lacuna explorável       | Prospecto que distingue cuidado pontual vs percurso estruturado de discipulado                      |
| Fonte                   | https://www.pmsdecristo.org.br/quem-somos/ ; capelania; polícia e igreja                            |
| Evidência vs inferência | Missão/visão = evidência do site; “não é currículo 48” = inferência comparativa                     |

### 6.2 UMCEB (Brasil)

| Campo                   | Conteúdo                                                           |
| ----------------------- | ------------------------------------------------------------------ |
| Classificação           | Rede brasileira / referência organizacional                        |
| País                    | Brasil                                                             |
| Público                 | Militares e segurança pública evangélicos e familiares             |
| Promessa                | Companheirismo, evangelização no meio militar, maturidade          |
| Prova                   | Histórico desde AOE/AOC; uniões estaduais; vínculo AMCF            |
| Próximo passo           | Integração em núcleos/associações; congressos                      |
| Tom                     | Institucional associativo                                          |
| O que faz bem           | Escala nacional; linguagem de unidade                              |
| O que não serve         | Não substitui Guia/módulo de discipulado com estados de produção   |
| Fonte                   | https://umceb.com.br/site/historico.html                           |
| Evidência vs inferência | Histórico/missão = evidência; diferença de entregável = inferência |

### 6.3 PMCE — CSASR / organograma (contexto oficial)

| Campo         | Conteúdo                                                                                                          |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
| Classificação | Contexto institucional oficial (**não parceiro**)                                                                 |
| País          | Brasil (CE)                                                                                                       |
| Relevância    | Assistência social/espiritual/saúde; núcleo religioso na estrutura                                                |
| Restrição     | Não inferir vínculo com Discipulando; menção PMCE = LACUNA p/ circulação ampliada (P0-08/TODO)                    |
| Fonte         | https://www.pm.ce.gov.br/csasrpmce/ ; organograma 2025 (acesso na execução pode falhar; marcar LACUNA se offline) |
| Data          | Tentativa 2026-07-31; CSASR fetch timeout neste ambiente — **verificar novamente na validação humana/técnica**    |

### 6.4 Navigators Military (EUA / internacional)

| Campo           | Conteúdo                                                                     |
| --------------- | ---------------------------------------------------------------------------- |
| Classificação   | Referência internacional de discipulado                                      |
| Público         | Militares EUA, famílias, veteranos, academias                                |
| Promessa        | Discipulado life-to-life, estudos, mentoria, multiplicadores                 |
| Prova           | Longevidade desde 1940s; trabalho com capelães                               |
| O que faz bem   | Relacional, multiplicação                                                    |
| O que não serve | Contexto EUA; não é apreciação de Guia pastoral BR; tom de ministry site     |
| Fonte           | https://www.navigators.org/ministry/navigators-military/ (acesso 2026-07-31) |

### 6.5 Officers’ Christian Fellowship (OCF)

| Campo         | Conteúdo                                                          |
| ------------- | ----------------------------------------------------------------- |
| Classificação | Referência internacional                                          |
| Público       | Oficiais / membros militares cristãos (EUA)                       |
| Promessa      | Comunhão bíblica, crescimento, fé–família–profissão               |
| Fonte         | https://www.ocfusa.org/learnmore/ ; handbook                      |
| Nota          | Detalhe fino a confirmar online na revisão; classificação mantida |

### 6.6 Cru Military

| Campo         | Conteúdo                                                                             |
| ------------- | ------------------------------------------------------------------------------------ |
| Classificação | Referência internacional                                                             |
| Promessa      | Parceria com capelães/igrejas; cuidado antes/durante/depois de períodos operacionais |
| Fonte         | https://www.cru.org/us/en/about/news/fact-sheets/cru-military-fact-sheet.html        |
| Nota          | Fact sheet institucional; não inferir parceria com o piloto                          |

### 6.7 Alternativa atual ao site (obrigatória)

| Campo         | Conteúdo                                                                       |
| ------------- | ------------------------------------------------------------------------------ |
| Classificação | Alternativa atual                                                              |
| Componentes   | Guia Mestre PDF/DOCX; apostilas M1; conversas; protótipos; roteiro homologação |
| O que faz bem | Autoridade pastoral do Guia; detalhe curricular                                |
| Limite        | Não oferece documento digital rastreável de status/pedido com a11y e paridade  |
| Fonte         | `fontes/guia-mestre/`, `conteudo/`, `docs/roteiro-…`, protótipos               |

### Suplente (se falha)

Armed Services Ministry — https://armedservicesministry.org/about/

---

## 7. Contexto jurídico e salvaguardas (sem parecer)

| Norma                  | Tema                                                       | Uso no briefing                | Classe             |
| ---------------------- | ---------------------------------------------------------- | ------------------------------ | ------------------ |
| CF art. 5º VI, VII, X  | Liberdade religiosa; assistência em internação; intimidade | Restrição de coerção/exposição | EXTERNO OFICIAL    |
| Lei 9.982/2000         | Acesso à assistência religiosa com acordo do assistido     | Voluntariedade                 | EXTERNO OFICIAL    |
| LEP art. 24            | Liberdade de culto; não obrigar participação               | Voluntariedade                 | EXTERNO OFICIAL    |
| SAMHSA trauma-informed | Segurança, voz/escolha, confiança                          | Só comunicação; não clínica    | EXTERNO SECUNDÁRIO |

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
