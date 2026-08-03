# Inventário semântico editorial — candidato F5

Registro de classificação dos blocos `>` / fences antes da migração
(TASK-F5-SAN-02). Texto literal preservado; só muda a marcação.

| Origem                             | Classificação   | Destino                    |
| ---------------------------------- | --------------- | -------------------------- |
| Headers de arquivo (`secoes-*.md`) | INSTRUÇÃO       | Fora do corpo de seção     |
| Prosa narrativa com `>`            | PROSA           | parágrafo Markdown → `<p>` |
| 1Sm 22.1-2 (§4)                    | CITAÇÃO BÍBLICA | `>` + `<cite>`             |
| Fp 1.6 (§15)                       | CITAÇÃO BÍBLICA | `>` + `<cite>`             |
| Bloco destaque §2 (Nota do Autor)  | NOTA            | `:::nota`                  |
| Certificado / remição §14          | NOTA            | `:::nota`                  |
| Salvaguardas §14 (lista)           | SALVAGUARDA     | `:::nota` + lista          |
| Prefácio §15                       | CONVITE         | `:::convite`               |
| Folheador §12                      | PREVIEW         | `:::preview-licao`         |
| Assinatura fence §15               | ASSINATURA      | `:::assinatura`            |
| Rodapé fence §15                   | RODAPÉ          | `:::rodape-institucional`  |
| Decisão PDF download               | OUTRO           | formulação DEC-F5-06       |
| Instruções §7 (identidade.md)      | INSTRUÇÃO       | omitidas no HTML           |

Contagens pré-migração: ~75 linhas `>`; ~55 `dc-prosa-quote` no HTML;
assinatura triplicada (fence + PAD-06 + footer).
