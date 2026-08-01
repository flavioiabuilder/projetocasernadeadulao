# Biblioteca de decisões (ledger)

## Papéis — não confundir

| Artefato                                          | Papel                                                                             |
| ------------------------------------------------- | --------------------------------------------------------------------------------- |
| **ADRs** (`docs/arquitetura/`, ADRs do programa)  | Decisões técnicas e arquiteturais revisáveis                                      |
| **Validações** (`programas/.../docs/validacoes/`) | Evidências de execução e aceite                                                   |
| **CHANGELOG**                                     | Mudanças realizadas no produto/programa                                           |
| **TODO**                                          | Pendências abertas                                                                |
| **Este ledger** (`registro.md`)                   | Decisões de **produto, design e método** com hipótese → justificativa → resultado |

## Regras

- O ledger **não** re-decide stack, Pages ou skills canônicas — aponta para a ADR.
- Prefira uma linha nova a reescrever história.
- Formato: Markdown simples (diff-friendly). Evitar JSONL sem necessidade.
- Links relativos para evidências no repositório.

## Arquivo

- [`registro.md`](registro.md)
