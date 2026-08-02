# CMP-02 — Ação (botão)

| Campo                          | Conteúdo                                                                                                        |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| 1. ID e nome                   | CMP-02 — Ação (botão)                                                                                           |
| 2. Camada                      | Componente                                                                                                      |
| 3. Status                      | CANDIDATO (`0.1.0-candidate`)                                                                                   |
| 4. Problema                    | Disparar ação local (menu, filtro, tab) com alvo adequado                                                       |
| 5. Quando usar                 | Controles que não navegam por URL                                                                               |
| 6. Quando não usar             | Links de documento; CTAs inventados sem copy canônica                                                           |
| 7. Anatomia / slots            | Conforme HTML recomendado; slots de texto de `conteudo/` apenas                                                 |
| 8. Conteúdo                    | Obrigatório: texto visível significativo. Opcional: ícone decorativo `aria-hidden`                              |
| 9. HTML nativo                 | `<button type="button">`                                                                                        |
| 10. Semântica / nome acessível | Nome pelo texto ou `aria-label` se só ícone                                                                     |
| 11. API pública                | Elemento + classes `dc-acao dc-acao--primaria                                                                   | secundaria`+ atributos nativos /`data-*` |
| 12. Variantes                  | Ver classes; não proliferar                                                                                     |
| 13. Tamanhos                   | Só se meta 44×44 exigir padding                                                                                 |
| 14. Tokens semânticos          | --cor-acento-editorial, --cor-superficie-_, --tipografia-peso-display, --raio-controle, --foco-anel-_           |
| 15. Estados                    | default, hover, focus-visible, active; disabled/aria-disabled DEPENDE; loading PROIBIDO até operação async real |
| 16. Teclado                    | Tab; Enter/Space                                                                                                |
| 17. Foco                       | `:focus-visible` com tokens `--foco-anel-*` + cor de contexto                                                   |
| 18. Responsividade             | Reflow ≥320px; gutters via MQ + `--espacamento-pagina-gutter-*`                                                 |
| 19. Overflow / extremo         | Texto longo quebra; não truncar sem acesso ao completo                                                          |
| 20. Reduced motion             | Sem animação obrigatória; respeitar `prefers-reduced-motion`                                                    |
| 21. Microcopy                  | Só `conteudo/` ou rótulos UI neutros; sem inventar pastoral                                                     |
| 22. Exemplo correto            | `design-system/laboratorio/` seção CMP-02                                                                       |
| 23. Exemplo incorreto          | Hex solto; `div` clicável; cor como único estado                                                                |
| 24. Dependências               | Fundações tokens; sem DevTools                                                                                  |
| 25. Cobertura de testes        | Contrato unitário + e2e lab (axe/teclado)                                                                       |
| 26. Evidências                 | prospecto barra__sumario, matriz filtros, tabs                                                                  |
| 27. Migração futura            | Classes legado → `dc-*` na Fase 6                                                                               |
| 28. Limitações                 | Runtime dos protótipos ainda não consome este contrato                                                          |
