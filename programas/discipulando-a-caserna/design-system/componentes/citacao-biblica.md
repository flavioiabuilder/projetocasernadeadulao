# CMP-04 — Citação bíblica

| Campo                          | Conteúdo                                                                                |
| ------------------------------ | --------------------------------------------------------------------------------------- |
| 1. ID e nome                   | CMP-04 — Citação bíblica                                                                |
| 2. Camada                      | Componente                                                                              |
| 3. Status                      | CANDIDATO (`0.1.0-candidate`)                                                           |
| 4. Problema                    | Expor citação NAA com referência decimal                                                |
| 5. Quando usar                 | Citações literais de conteudo/                                                          |
| 6. Quando não usar             | Paráfrase; pull-quote secular                                                           |
| 7. Anatomia / slots            | Conforme HTML recomendado; slots de texto de `conteudo/` apenas                         |
| 8. Conteúdo                    | Obrigatório: texto visível significativo. Opcional: ícone decorativo `aria-hidden`      |
| 9. HTML nativo                 | `<blockquote>` + `<cite>`                                                               |
| 10. Semântica / nome acessível | Nome pelo texto ou `aria-label` se só ícone                                             |
| 11. API pública                | Elemento + classes `dc-citacao-biblica` + atributos nativos / `data-*`                  |
| 12. Variantes                  | Ver classes; não proliferar                                                             |
| 13. Tamanhos                   | Só se meta 44×44 exigir padding                                                         |
| 14. Tokens semânticos          | --cor-citacao, --tipografia-citacao, --tipografia-estilo-citacao, --layout-medida-prosa |
| 15. Estados                    | default; conteúdo longo APLICÁVEL; loading N/A                                          |
| 16. Teclado                    | N/A                                                                                     |
| 17. Foco                       | `:focus-visible` com tokens `--foco-anel-*` + cor de contexto                           |
| 18. Responsividade             | Reflow ≥320px; gutters via MQ + `--espacamento-pagina-gutter-*`                         |
| 19. Overflow / extremo         | Texto longo quebra; não truncar sem acesso ao completo                                  |
| 20. Reduced motion             | Sem animação obrigatória; respeitar `prefers-reduced-motion`                            |
| 21. Microcopy                  | Só `conteudo/` ou rótulos UI neutros; sem inventar pastoral                             |
| 22. Exemplo correto            | `design-system/laboratorio/` seção CMP-04                                               |
| 23. Exemplo incorreto          | Hex solto; `div` clicável; cor como único estado                                        |
| 24. Dependências               | Fundações tokens; sem DevTools                                                          |
| 25. Cobertura de testes        | Contrato unitário + e2e lab (axe/teclado)                                               |
| 26. Evidências                 | todas direções + prospecto citacao-biblica                                              |
| 27. Migração futura            | Classes legado → `dc-*` na Fase 6                                                       |
| 28. Limitações                 | Runtime dos protótipos ainda não consome este contrato                                  |
