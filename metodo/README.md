# O Sistema — camada metodológica

Infraestrutura reutilizável do método de produção de sites profissionais com
Inteligência Artificial (**Fase 0 — Preparação do ambiente**).

Esta pasta é **genérica**: não contém conteúdo pastoral do Discipulando a
Caserna. O piloto do método neste repositório instancia status e links em
[`../programas/discipulando-a-caserna/docs/metodo/`](../programas/discipulando-a-caserna/docs/metodo/).

Norma: [`../docs/arquitetura/ADR-007-camada-metodo-o-sistema.md`](../docs/arquitetura/ADR-007-camada-metodo-o-sistema.md).

## O que há aqui

| Área         | Caminho                                              | Papel                                                          |
| ------------ | ---------------------------------------------------- | -------------------------------------------------------------- |
| Doutrina     | [`O-SISTEMA.md`](O-SISTEMA.md)                       | Documento-fonte do método (verbatim + nota de adaptação)       |
| Pipeline     | [`PIPELINE.md`](PIPELINE.md)                         | As nove fases e o estado de cada uma neste repositório         |
| Templates    | [`templates/projeto-web/`](templates/projeto-web/)   | Cinco artefatos permanentes para copiar                        |
| Prompts      | [`prompts/`](prompts/)                               | Fases 1–7: descoberta, prototipagem, crítica, implementação, QA |
| Fases 5–8    | [`fases/`](fases/)                                   | Guias da metade do pipeline com validação humana               |
| Checklists   | [`checklists/`](checklists/)                         | Preparação, design e pré-lançamento                            |
| Anti-padrões | [`ANTIPADROES.md`](ANTIPADROES.md)                   | Os dez mais caros + os deste repositório, com a defesa de cada |
| Glossário    | [`GLOSSARIO.md`](GLOSSARIO.md)                       | Vocabulário do método (domínio fica em `CONTEXT.md`)           |
| Referências  | [`biblioteca/referencias/`](biblioteca/referencias/) | Índices e fichas (sem clonar assets)                           |
| Decisões     | [`biblioteca/decisoes/`](biblioteca/decisoes/)       | Ledger de produto/design/método                                |
| Skills       | [`skills/README.md`](skills/README.md)               | Mapa → `.claude/skills/` (não canônico)                        |
| Convenções   | [`CONVENCOES.md`](CONVENCOES.md)                     | Escopos GLOBAL / REPO / PROGRAMA / PROTÓTIPO                   |
| Ferramentas  | [`FERRAMENTAS.md`](FERRAMENTAS.md)                   | Inventário, vocação e matriz de decisão                        |

## Como começar um projeto novo

1. Copie `templates/projeto-web/` para o destino do projeto.
2. Preencha os cinco arquivos (não invente fatos não confirmados).
3. Use os prompts em `prompts/` conforme a fase; para as fases 5–8, siga
   [`fases/`](fases/).
4. Valide o contrato: `npm run validate:metodo`.

Cobertura por fase, prompt e estado no piloto: [`PIPELINE.md`](PIPELINE.md).

Critério de aceite da Fase 0: é possível iniciar um projeto copiando a
estrutura-base e preenchendo esses cinco arquivos
(`npm run validate:metodo -- --bootstrap`).

## O que esta pasta não é

- Não é superfície publicada no GitHub Pages.
- Não é segunda árvore canônica de skills (ver ADR-006).
- Não substitui ADRs técnicos do produto.
- Não duplica `referencias-devtools/` (só indexa).
- Não unifica identidades visuais dos protótipos existentes.

## Extração futura

A pasta pode ser extraída para um repositório independente no futuro. Até lá,
este repositório é o piloto. Não criar workspaces npm só para documentos.
