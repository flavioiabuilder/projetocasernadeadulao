# Cobertura de composição — prospecto pastoral

> Prova do critério de aceite da Fase 4: a página-alvo
> [`prototipos/prospecto-v1/`](../../../prototipos/prospecto-v1/) pode ser
> **descrita** só com peças/padrões documentados.  
> Isto **não** migra o HTML nesta fase.

- **Data:** 2026-08-02
- **Status:** CANDIDATO

## Mapa seção → sistema

| Seção (prospecto)                | Padrão               | Componentes                    | Tokens (semânticos)                                     | Estados                           | Responsivo            | Lacuna / one-off                         |
| -------------------------------- | -------------------- | ------------------------------ | ------------------------------------------------------- | --------------------------------- | --------------------- | ---------------------------------------- |
| Skip + barra chrome              | Fundação + chrome    | FND-02, CMP-10, CMP-09, CMP-01 | superfície, foco, tipografia display                    | expanded sumário; progresso valor | nav compacta MQ       | —                                        |
| Abertura / hero documental       | PAD-01               | CMP-03, tipografia página      | --tipografia-pagina-titulo, --cor-superficie-papel      | default                           | empilhar brasão/texto | Brasão: tratamento de mídia fundação     |
| Movimentos I–V (cabecalhos)      | PAD-02               | headings + sobrelinha          | --tipografia-secao-titulo, --tipografia-folio, tracking | default                           | —                     | —                                        |
| Umbral Adulão                    | PAD-03               | —                              | --cor-superficie-profunda, texto sobre profunda         | default; RM se revelar            | full-bleed            | Único import B                           |
| Citações bíblicas                | —                    | CMP-04                         | --cor-citacao, --tipografia-citacao                     | conteúdo longo                    | medida prosa          | —                                        |
| Comparações / paralelos          | —                    | CMP-13                         | borda, espaçamento bloco                                | overflow mobile                   | empilhar              | Paralelo = variante leve de CMP-13       |
| Números formativos / eixos       | PAD-04 ou composição | prosa + lista                  | tipografia prosa                                        | —                                 | —                     | One-off tipográfico OK se não virar card |
| Escudo / anatomia / abas         | —                    | CMP-11                         | foco, borda, acento                                     | selected                          | painéis empilham      | Hotspots: ESPECÍFICO (SPC)               |
| Matriz curricular                | PAD-05               | CMP-07, CMP-05, CMP-02         | estado-*, tipografia                                    | filtros active                    | tabela→lista          | Folheador/edições = SPC-01               |
| Checklist pastoral               | PAD-08               | CMP-06                         | espaçamento grupo                                       | checked se interativo             | —                     | —                                        |
| Índice overlay                   | —                    | CMP-08, CMP-01                 | nav, superfície                                         | current; expanded                 | fullscreen mobile     | —                                        |
| Fechamento / pedido              | PAD-06               | prosa                          | tipografia                                              | —                                 | —                     | Copy de `conteudo/`                      |
| Rodapé                           | PAD-07               | CMP-01                         | tipografia nota                                         | —                                 | —                     | —                                        |
| Notas / destaques / salvaguardas | PAD-04               | —                              | --tipografia-nota, acento                               | —                                 | —                     | LAC-01 evidência → este padrão           |
| Revelação scroll                 | Fundação motion      | —                              | --motion-*                                              | reduced motion                    | —                     | Comportamento, não componente visual     |

## Conclusão da prova

- Seções nucleares mapeiam para PAD-01…08 + CMP-01…13.
- One-offs justificados: hotspots do escudo, folheador/edições (SPC-01) —
  documentados como específicos, não forçados a componente v0.1.
- Nenhuma seção exige e-commerce/SaaS/dashboard.
- Drift de naming (selo/badge, skip/skip-link) resolvido nos contratos `dc-*`.

## Critério de aceite

| Pergunta                                                | Resposta                                  |
| ------------------------------------------------------- | ----------------------------------------- |
| Dá para planejar página nova só com peças documentadas? | **Sim**, para o gênero prospecto pastoral |
| É preciso inventar componente por seção?                | **Não** — padrões cobrem o esqueleto      |
| Runtime já usa o DS?                                    | **Não** — migração é Fase 6               |
