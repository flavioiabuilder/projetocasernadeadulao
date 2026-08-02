# CMP-01 — Link

| Campo                          | Conteúdo                                                                                                        |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| 1. ID e nome                   | CMP-01 — Link                                                                                                   |
| 2. Camada                      | Componente                                                                                                      |
| 3. Status                      | CANDIDATO (`0.1.0-candidate`)                                                                                   |
| 4. Problema                    | Navegação textual e in-page sem reinventar estilos                                                              |
| 5. Quando usar                 | Âncoras e links de documento/índice                                                                             |
| 6. Quando não usar             | Ações que submetem ou disparam efeito principal (usar ação)                                                     |
| 7. Anatomia / slots            | Conforme HTML recomendado; slots de texto de `conteudo/` apenas                                                 |
| 8. Conteúdo                    | Obrigatório: texto visível significativo. Opcional: ícone decorativo `aria-hidden`                              |
| 9. HTML nativo                 | `<a href>`                                                                                                      |
| 10. Semântica / nome acessível | Nome pelo texto ou `aria-label` se só ícone                                                                     |
| 11. API pública                | Elemento + classes `dc-link` + atributos nativos / `data-*`                                                     |
| 12. Variantes                  | Ver classes; não proliferar                                                                                     |
| 13. Tamanhos                   | Só se meta 44×44 exigir padding                                                                                 |
| 14. Tokens semânticos          | --cor-texto-primario, --cor-acento-editorial, --foco-anel-*                                                     |
| 15. Estados                    | default, hover, focus-visible, active; visited DEPENDE; disabled PROIBIDO (preferir aria-disabled); loading N/A |
| 16. Teclado                    | Tab; Enter ativa                                                                                                |
| 17. Foco                       | `:focus-visible` com tokens `--foco-anel-*` + cor de contexto                                                   |
| 18. Responsividade             | Reflow ≥320px; gutters via MQ + `--espacamento-pagina-gutter-*`                                                 |
| 19. Overflow / extremo         | Texto longo quebra; não truncar sem acesso ao completo                                                          |
| 20. Reduced motion             | Sem animação obrigatória; respeitar `prefers-reduced-motion`                                                    |
| 21. Microcopy                  | Só `conteudo/` ou rótulos UI neutros; sem inventar pastoral                                                     |
| 22. Exemplo correto            | `design-system/laboratorio/` seção CMP-01                                                                       |
| 23. Exemplo incorreto          | Hex solto; `div` clicável; cor como único estado                                                                |
| 24. Dependências               | Fundações tokens; sem DevTools                                                                                  |
| 25. Cobertura de testes        | Contrato unitário + e2e lab (axe/teclado)                                                                       |
| 26. Evidências                 | prospecto indice__link; direcao-c indice                                                                        |
| 27. Migração futura            | Classes legado → `dc-*` na Fase 6                                                                               |
| 28. Limitações                 | Runtime dos protótipos ainda não consome este contrato                                                          |
