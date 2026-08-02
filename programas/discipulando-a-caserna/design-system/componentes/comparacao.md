# CMP-13 — Comparação lado a lado

| Campo                          | Conteúdo                                                                           |
| ------------------------------ | ---------------------------------------------------------------------------------- |
| 1. ID e nome                   | CMP-13 — Comparação lado a lado                                                    |
| 2. Camada                      | Componente                                                                         |
| 3. Status                      | CANDIDATO (`0.1.0-candidate`)                                                      |
| 4. Problema                    | Contrastar duas colunas com semântica adequada                                     |
| 5. Quando usar                 | Comparações editoriais do prospecto                                                |
| 6. Quando não usar             | Grid de cards                                                                      |
| 7. Anatomia / slots            | Conforme HTML recomendado; slots de texto de `conteudo/` apenas                    |
| 8. Conteúdo                    | Obrigatório: texto visível significativo. Opcional: ícone decorativo `aria-hidden` |
| 9. HTML nativo                 | role=table ou <table> se dados tabulares                                           |
| 10. Semântica / nome acessível | Nome pelo texto ou `aria-label` se só ícone                                        |
| 11. API pública                | Elemento + classes `dc-comparacao` + atributos nativos / `data-*`                  |
| 12. Variantes                  | Ver classes; não proliferar                                                        |
| 13. Tamanhos                   | Só se meta 44×44 exigir padding                                                    |
| 14. Tokens semânticos          | --espacamento-bloco, --cor-borda-sutil, --layout-medida-prosa                      |
| 15. Estados                    | default; overflow APLICÁVEL (empilhar no mobile)                                   |
| 16. Teclado                    | N/A salvo links                                                                    |
| 17. Foco                       | `:focus-visible` com tokens `--foco-anel-*` + cor de contexto                      |
| 18. Responsividade             | Reflow ≥320px; gutters via MQ + `--espacamento-pagina-gutter-*`                    |
| 19. Overflow / extremo         | Texto longo quebra; não truncar sem acesso ao completo                             |
| 20. Reduced motion             | Sem animação obrigatória; respeitar `prefers-reduced-motion`                       |
| 21. Microcopy                  | Só `conteudo/` ou rótulos UI neutros; sem inventar pastoral                        |
| 22. Exemplo correto            | `design-system/laboratorio/` seção CMP-13                                          |
| 23. Exemplo incorreto          | Hex solto; `div` clicável; cor como único estado                                   |
| 24. Dependências               | Fundações tokens; sem DevTools                                                     |
| 25. Cobertura de testes        | Contrato unitário + e2e lab (axe/teclado)                                          |
| 26. Evidências                 | prospecto .comparacao                                                              |
| 27. Migração futura            | Classes legado → `dc-*` na Fase 6                                                  |
| 28. Limitações                 | Runtime dos protótipos ainda não consome este contrato                             |
