# Instância do método — Discipulando a Caserna

> Templates genéricos: [`../../../../metodo/`](../../../../metodo/).

O repositório é o **piloto** do método “O Sistema” (ADR-007).

| Artefato                 | Status                  | Path                                                                               |
| ------------------------ | ----------------------- | ---------------------------------------------------------------------------------- |
| Briefing Estratégico     | **EM REVISÃO** (Fase 1) | [`01-briefing-estrategico.md`](01-briefing-estrategico.md)                         |
| Dossiê de descoberta     | EM REVISÃO              | [`fase-1/dossie-de-descoberta.md`](fase-1/dossie-de-descoberta.md)                 |
| Roteiro validação humana | Aberto                  | [`fase-1/roteiro-de-validacao-humana.md`](fase-1/roteiro-de-validacao-humana.md)   |
| Painel de referências    | **EM REVISÃO** (Fase 2) | [`02-painel-referencias.md`](02-painel-referencias.md)                             |
| Inventário / triagem F2  | EM REVISÃO              | [`fase-2/inventario-e-triagem.md`](fase-2/inventario-e-triagem.md)                 |
| Roteiro validação visual | Aberto                  | [`fase-2/roteiro-de-validacao-visual.md`](fase-2/roteiro-de-validacao-visual.md)   |
| Inspeção V6              | Registrada              | [`fase-2/inspecao-v6.md`](fase-2/inspecao-v6.md)                                   |
| Direção / tokens         | **0.1.0-candidate**     | [`03-direcao-tokens.md`](03-direcao-tokens.md)                                     |
| Inventário tokens        | EM REVISÃO              | [`fase-3/inventario-de-tokens.md`](fase-3/inventario-de-tokens.md)                 |
| Matriz contraste         | Automatizada            | [`fase-3/matriz-de-contraste.md`](fase-3/matriz-de-contraste.md)                   |
| Roteiro D3               | Aberto                  | [`fase-3/roteiro-de-validacao-direcao.md`](fase-3/roteiro-de-validacao-direcao.md) |
| Tokens JSON/CSS          | Candidatos              | [`../../design-system/tokens/`](../../design-system/tokens/)                       |
| Manual DS                | **CANDIDATO** (Fase 4)  | [`04-manual-design-system.md`](04-manual-design-system.md)                         |
| Inventário componentes   | CANDIDATO               | [`fase-4/inventario-de-componentes.md`](fase-4/inventario-de-componentes.md)       |
| Cobertura composição     | CANDIDATO               | [`fase-4/cobertura-de-composicao.md`](fase-4/cobertura-de-composicao.md)           |
| Lab DS                   | CANDIDATO               | [`../../design-system/laboratorio/`](../../design-system/laboratorio/)             |
| Regras do agente         | Ponte                   | [`05-regras-agente.md`](05-regras-agente.md)                                       |

## Hierarquia

- **Projeto Caserna de Adulão** — raiz do repositório
- **Discipulando a Caserna** — este programa
- Superfícies HTML atuais = **protótipos**

## Regra

`conteudo/` permanece a fonte da copy literal. O briefing não a substitui.
Não marcar o briefing nem o painel como `APROVADO` sem validação humana
explícita. A Direção A em [`../decisao-visual-v1.md`](../decisao-visual-v1.md)
permanece normativa; a Fase 2 anota referências. A Fase 3 estabelece
`design-system/tokens/` como fonte de verdade candidata **sem** migrar o
runtime dos protótipos até decisão humana (V1/V2 + D3-12).
