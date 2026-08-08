# Conhecimento — base técnica para agentes

Pasta transversal do repositório com material técnico consultável pelo
assistente (RAG prático: Markdown + índice + fichas). **Não** é produto
ministerial, **não** é fonte pastoral e **não** substitui ADRs nem regras do
método.

## Papéis

| Pasta | Papel |
| ----- | ----- |
| `origem/` | PDFs e originais — **imutáveis** após depósito |
| `md/` | Texto convertido (MarkItDown) — o que o agente lê e pesquisa |
| `fichas/` | Resumos operacionais (quando acionar, tese, limites) |
| `indice.md` | Catálogo curto — ponto de entrada do agente |

## O que esta pasta não é

- Não é [`programas/.../fontes/`](../programas/discipulando-a-caserna/fontes/) (fontes pastorais).
- Não é [`referencias-devtools/`](../referencias-devtools/) (estudos de sites externos).
- Não é [`metodo/biblioteca/referencias/`](../metodo/biblioteca/referencias/) (fichas leves do método).
- Não publicar em GitHub Pages.

## Política

- Material de terceiros: uso local para o agente; declarar autoria na ficha e no índice.
- Não embutir livros inteiros em `.cursor/rules/` nem em `AGENTS.md`.
- Precedência: regras do repositório e ADRs **vencem** orientações genéricas desta base.
- Fluxo para novo material: `origem/<slug>/arquivo.pdf` → MarkItDown → `md/<slug>.md` → ficha → entrada no índice.

## Entrada do agente

Comece por [`indice.md`](indice.md). Em tarefas de código/refatoração, veja também
[`.cursor/rules/conhecimento-tecnico.mdc`](../.cursor/rules/conhecimento-tecnico.mdc).
