# Índice — base Conhecimento

Ponto de entrada do agente. Leia a **ficha** primeiro; abra o `md/` só quando
precisar de detalhe ou citação. Precedência: regras do repositório e ADRs
vencem este material.

## Catálogo

| Slug | Título | Tags | Ficha | Markdown | Origem |
| ---- | ------ | ---- | ----- | -------- | ------ |
| `deixe-seu-codigo-limpo-e-brilha` | Deixe seu Código Limpo e Brilha (José Yoshiriro) | clean-code, nomes, funções, testes, refatoração | [`fichas/deixe-seu-codigo-limpo-e-brilha.md`](fichas/deixe-seu-codigo-limpo-e-brilha.md) | [`md/deixe-seu-codigo-limpo-e-brilha.md`](md/deixe-seu-codigo-limpo-e-brilha.md) | PDF Casa do Código — uso local; não Pages |

## Quando consultar o quê

| Situação | Comece por |
| -------- | ---------- |
| Escrever ou revisar código (nomes, funções, testes, erros) | Ficha Yoshiriro |
| Precisar do texto/exemplo do livro | `md/deixe-seu-codigo-limpo-e-brilha.md` (Grep por seção) |
| Política da pasta / novo PDF | [`README.md`](README.md) |

## Como adicionar material

1. Deposite o PDF em `origem/<slug>/`.
2. Converta com MarkItDown → `md/<slug>.md`.
3. Escreva `fichas/<slug>.md` (tese, tags, quando acionar, limites).
4. Inclua uma linha neste índice.
