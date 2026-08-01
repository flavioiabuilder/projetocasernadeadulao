# O Sistema — camada metodológica

Infraestrutura reutilizável do método de produção de sites profissionais com
Inteligência Artificial (**Fase 0 — Preparação do ambiente**).

Esta pasta é **genérica**: não contém conteúdo pastoral do Discipulando a
Caserna. O piloto do método neste repositório instancia status e links em
[`../programas/discipulando-a-caserna/docs/metodo/`](../programas/discipulando-a-caserna/docs/metodo/).

Norma: [`../docs/arquitetura/ADR-007-camada-metodo-o-sistema.md`](../docs/arquitetura/ADR-007-camada-metodo-o-sistema.md).

## O que há aqui

| Área        | Caminho                                              | Papel                                        |
| ----------- | ---------------------------------------------------- | -------------------------------------------- |
| Templates   | [`templates/projeto-web/`](templates/projeto-web/)   | Cinco artefatos permanentes para copiar      |
| Prompts     | [`prompts/`](prompts/)                               | Prompts reutilizáveis das fases posteriores  |
| Checklists  | [`checklists/`](checklists/)                         | Preparação, design e pré-lançamento          |
| Referências | [`biblioteca/referencias/`](biblioteca/referencias/) | Índices e fichas (sem clonar assets)         |
| Decisões    | [`biblioteca/decisoes/`](biblioteca/decisoes/)       | Ledger de produto/design/método              |
| Skills      | [`skills/README.md`](skills/README.md)               | Mapa → `.claude/skills/` (não canônico)      |
| Convenções  | [`CONVENCOES.md`](CONVENCOES.md)                     | Escopos GLOBAL / REPO / PROGRAMA / PROTÓTIPO |
| Ferramentas | [`FERRAMENTAS.md`](FERRAMENTAS.md)                   | Inventário e pré-requisitos                  |

## Como começar um projeto novo

1. Copie `templates/projeto-web/` para o destino do projeto.
2. Preencha os cinco arquivos (não invente fatos não confirmados).
3. Use os prompts em `prompts/` conforme a fase.
4. Valide o contrato: `npm run validate:metodo`.

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
