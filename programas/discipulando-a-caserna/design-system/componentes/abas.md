# CMP-11 — Abas

| Campo                          | Conteúdo                                                                           |
| ------------------------------ | ---------------------------------------------------------------------------------- |
| 1. ID e nome                   | CMP-11 — Abas                                                                      |
| 2. Camada                      | Componente                                                                         |
| 3. Status                      | CANDIDATO (`0.1.0-candidate`)                                                      |
| 4. Problema                    | Alternar painéis mutuamente exclusivos                                             |
| 5. Quando usar                 | Escudo/anatomia no prospecto                                                       |
| 6. Quando não usar             | Navegação de seções (usar índice)                                                  |
| 7. Anatomia / slots            | Conforme HTML recomendado; slots de texto de `conteudo/` apenas                    |
| 8. Conteúdo                    | Obrigatório: texto visível significativo. Opcional: ícone decorativo `aria-hidden` |
| 9. HTML nativo                 | tablist/tab/tabpanel (APG) testado                                                 |
| 10. Semântica / nome acessível | Nome pelo texto ou `aria-label` se só ícone                                        |
| 11. API pública                | Elemento + classes `dc-abas` + atributos nativos / `data-*`                        |
| 12. Variantes                  | Ver classes; não proliferar                                                        |
| 13. Tamanhos                   | Só se meta 44×44 exigir padding                                                    |
| 14. Tokens semânticos          | --cor-borda-sutil, --cor-acento-editorial, --foco-anel-*                           |
| 15. Estados                    | selected, focus-visible; disabled DEPENDE                                          |
| 16. Teclado                    | Setas entre tabs; Tab para painel                                                  |
| 17. Foco                       | `:focus-visible` com tokens `--foco-anel-*` + cor de contexto                      |
| 18. Responsividade             | Reflow ≥320px; gutters via MQ + `--espacamento-pagina-gutter-*`                    |
| 19. Overflow / extremo         | Texto longo quebra; não truncar sem acesso ao completo                             |
| 20. Reduced motion             | Sem animação obrigatória; respeitar `prefers-reduced-motion`                       |
| 21. Microcopy                  | Só `conteudo/` ou rótulos UI neutros; sem inventar pastoral                        |
| 22. Exemplo correto            | `design-system/laboratorio/` seção CMP-11                                          |
| 23. Exemplo incorreto          | Hex solto; `div` clicável; cor como único estado                                   |
| 24. Dependências               | Fundações tokens; sem DevTools                                                     |
| 25. Cobertura de testes        | Contrato unitário + e2e lab (axe/teclado)                                          |
| 26. Evidências                 | prospecto marca-escudo / anatomia tablist                                          |
| 27. Migração futura            | Classes legado → `dc-*` na Fase 6                                                  |
| 28. Limitações                 | Runtime dos protótipos ainda não consome este contrato                             |
