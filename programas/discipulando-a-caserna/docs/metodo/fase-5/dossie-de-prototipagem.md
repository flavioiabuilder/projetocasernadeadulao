# Dossiê de prototipagem — Fase 5

- **Data de abertura:** 2026-08-02
- **Status:** CANDIDATO (não canônico)
- **Estratégia:** um candidato integrado (F5-01 default)
- **Path do candidato:** `programas/discipulando-a-caserna/prototipos/prospecto-fase-5-v1/`
- **Protótipo canônico:** NENHUM
- **Fase 6:** BLOQUEADA

## 1. Plano

Fluxo A (código direto). Direção A normativa + umbral B (único, seção 4) +
estados/checklist C. Consome `design-system/tokens/tokens.css` e contratos
CMP/PAD. Conteúdo de `conteudo/` via
`npm run generate:discipulando:prototipo-fase-5`. Não migra `prospecto-v1/`.

## 2. Baselines (comparativo — não rivais)

| Path                                        | Papel na F5                    |
| ------------------------------------------- | ------------------------------ |
| `prototipos/prospecto-v1/`                  | Baseline de completude         |
| `prototipos/direcoes-visuais-v1/direcao-a/` | Baseline de gênero             |
| `direcao-b/`                                | Evidência do umbral            |
| `direcao-c/`                                | Evidência de estados/checklist |
| `storytelling-v1/`                          | Deck — não candidato           |
| `homologacao-pastoral-v1/`                  | Restrita — não candidato       |

## 3. Arquitetura shipped (rótulos canônicos)

| Movimento         | Seções | PAD / CMP principais          |
| ----------------- | ------ | ----------------------------- |
| I — A necessidade | 1–4    | PAD-01/02/03/04, CMP-03/04/13 |
| II — A resposta   | 5–7    | PAD-02/04, CMP-04             |
| III — O programa  | 8–11   | PAD-05, CMP-07/05/11          |
| IV — A prova      | 12–13  | CMP-05                        |
| V — O pedido      | 14–15  | PAD-06/08/07, CMP-06          |

## 4. Hipóteses e lacunas (não fechar H*/V*/D*)

- H1–H17 e V1–V5 permanecem abertos; ação principal = hipótese.
- M3/M4 virtude/tema null: omitidos na UI com nota de lacuna.
- Anatomia de lição / encontro (seções 10–11): conteúdo canônico **presente** em `conteudo/`; a nota de “lacuna declarada” foi removida do gerador (F5-R03).
- Folheador da Lição 1: **implementado** (SPC-F5-01) com manifesto local 7+9.
- PDF do dossiê de apreciação: **ausente** — status editorial honesto; circulação pública permanece em backlog (DEC-F5-06).
- Checklist de apreciação: itens derivados do briefing/estado — não substituem roteiro pastoral PDF.
- Parser: `ferramentas/parse-md-blocos.js` (múltiplas tabelas, listas, blockquotes); stale-check `check:discipulando:prototipo-fase-5:stale`.
- Progressive enhancement: sumário via `<details>`; painéis da matriz legíveis sem JS; ativação de abas **automática** (APG).

## 5. Matriz de avaliação

| Critério                        | Peso | Nota (1–5) | Evidência                                              |
| ------------------------------- | ---: | ---------: | ------------------------------------------------------ |
| Fidelidade ao Briefing          |    5 |          4 | Cinco movimentos shipped; hipóteses não fechadas       |
| Fidelidade ao conteúdo          |    5 |          4 | Quotes de `conteudo/`; gerador                         |
| Clareza do pedido pastoral      |    5 |          4 | Seção 15 + PAD-06 assinatura                           |
| Adequação à Direção A           |    5 |          4 | Editorial; sem cards/stat strip                        |
| Cinco movimentos compreensíveis |    5 |          4 | `#movimento-1`…`5`                                     |
| Uso correto do Design System    |    4 |          4 | Classes `dc-*`; fichas CMP usadas                      |
| Tokens semânticos exclusivos    |    4 |          5 | Gate prototipagem                                      |
| Legibilidade sustentada         |    5 |          4 | Medida prosa                                           |
| Ausência de aparência comercial |    5 |          5 | Sem CTA captação                                       |
| Responsividade                  |    4 |          4 | CSS responsivo; e2e overflow no suite F5               |
| Acessibilidade                  |    5 |          4 | PE sem JS; Axe no suite F5; foco pós-sumário           |
| Honestidade sobre lacunas       |    5 |          5 | Pendências F6-05/06 explícitas; sem lacuna falsa 10–11 |
| Clareza de estado               |    4 |          5 | Selo candidato; JSON bloqueado                         |
| Viabilidade para Fase 6         |    4 |          4 | Path isolado + contratos                               |
| Motion contido                  |    3 |          5 | Só progresso/sumário; RM                               |
| Originalidade justificada       |    3 |          3 | Integra especificação, não inventa gênero              |

Pontuação auxilia; **não** decide. Vetos em
[`roteiro-de-validacao.md`](roteiro-de-validacao.md).

## 6. Registro de iterações

### Avaliação inicial (2026-08-02) — sem alteração de UI na passagem

| Eixo           | Achado                                                   |
| -------------- | -------------------------------------------------------- |
| Estrutura      | Headings pós-h1 usavam `h3` (salto) — bloqueante         |
| Tipografia     | Ritmo editorial aceitável; medida prosa OK               |
| Cor            | Umbral único na seção 4; OK                              |
| Detalhe/motion | Progresso sincronizado; sumário lateral papel            |
| Conteúdo       | Quotes canônicas presentes; checklist derivado explícito |
| a11y           | Skip, landmarks, um h1; e2e Axe pendente neste ambiente  |

### Rodada corretiva 1 — Estrutura

- **OBSERVAÇÃO:** seções 2+ usavam `h3` após `h1`.
- **DIAGNÓSTICO:** hierarquia de headings / a11y essencial.
- **DIREÇÃO:** promover títulos de seção a `h2`; comparação mantém `h3`.
- **RESTRIÇÃO:** não alterar copy; não reabrir direção.
- **Feito:** gerador atualizado + regenerado.

### Rodada corretiva 2 — Tipografia

- **OBSERVAÇÃO:** fechamento da seção 15 sem bloco de assinatura tipográfico distinto.
- **DIAGNÓSTICO:** PAD-06 incompleto na composição.
- **DIREÇÃO:** acrescentar bloco de assinatura canônica (autor/instituição).
- **RESTRIÇÃO:** sem CTA; email como texto no rodapé.
- **Feito:** PAD-06 no gerador + estilos `.dc-pad-06` / `.dc-assinatura`.

### Rodada corretiva 3 — Cor / detalhe / movimento

- **OBSERVAÇÃO:** estrutura e tipografia estáveis; umbral já em superfície profunda.
- **DIAGNÓSTICO:** sem violação bloqueante de cor/motion.
- **DIREÇÃO:** preservar um umbral; motion só chrome.
- **RESTRIÇÃO:** não importar efeitos DevTools.
- **Feito:** sem alteração visual adicional (confirmação).

### Rodada corretiva 4 — Fidelidade / PE / gates (Onda 0 Fase 6)

- **OBSERVAÇÃO:** parser regex fundia tabelas, omitia listas, injetava lacuna falsa; tabs/sumário dependiam de JS; relatório não determinístico; F5 fora do gate principal.
- **DIAGNÓSTICO:** F5-R01…R13, R15, R18, R21.
- **DIREÇÃO:** `parse-md-blocos`; PE com `<details>` + painéis sem `hidden` estático; `institucional.js`; stale-check; integração em `validate:discipulando`.
- **RESTRIÇÃO:** não canonizar; não alterar `pages.yml`; não inventar folheador/PDF.
- **Feito:** gerador + testes + PIPELINE alinhado a BLOQUEADA.

## 7. Exceções técnicas

| Item                       | Motivo                                                 |
| -------------------------- | ------------------------------------------------------ |
| `min-height: 44px`         | Meta física de alvo (não token de tipografia)          |
| Breakpoints 700/768/1100px | Constantes de layout documentadas (lab/decisão visual) |
| Altura progresso 4px       | Chrome fino; constante de comportamento                |
| Checklist itens            | Derivados do briefing — não inventam homologação       |

## 8. Decisões humanas F5

| ID       | Tema                    | Estado                                                           |
| -------- | ----------------------- | ---------------------------------------------------------------- |
| F5-01    | Estratégia de candidato | Default aplicado: um integrado                                   |
| F5-02    | Path                    | `prospecto-fase-5-v1`                                            |
| F5-03…07 | Aceites de composição   | Pendente humano                                                  |
| F5-08    | Escolha                 | **APROVADA** — `prospecto-fase-5-v1`                             |
| F5-09    | Descartas               | Histórico justificado (legado/direções/storytelling/homologação) |
| F5-10    | Canonizar               | **APROVADA** — 2026-08-03 — Flávio Alves da Costa                |
| F5-11    | Pages                   | Default mantido: **não** publicar F5 (pages.yml intacto)         |
| F5-12    | Abrir Fase 6            | **APROVADA** — liberada, não iniciada                            |
