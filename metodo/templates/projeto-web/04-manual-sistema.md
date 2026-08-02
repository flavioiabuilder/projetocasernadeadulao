# 04 — Manual do Design System

> Template genérico. Preencher na Fase 4 com peças reais. Não inventar
> componentes inexistentes. Não promover a ESTÁVEL/1.0.0 sem decisão humana.

- **Projeto:** {{NOME_DO_PROJETO}}
- **Programa / produto:** {{NOME}}
- **Versão do sistema:** {{0.x.x-candidate}}
- **Status:** CANDIDATO | EXPERIMENTAL | PRONTO PARA PROTÓTIPO | ESTÁVEL | DEPRECADO
- **Tokens relacionados:** `{{PATH_TOKENS_JSON}}` → `{{PATH_TOKENS_CSS}}` (gerado)
- **Figma:** integração futura — **não** canônico até decisão explícita

## 1. Princípios

TODO: 3–7 princípios (ex.: HTML nativo antes de ARIA; só tokens semânticos;
quatro camadas; copy canônica fora do DS).

## 2. Quatro camadas

| Camada       | Conteúdo                                              | Não é              |
| ------------ | ----------------------------------------------------- | ------------------ |
| 1 Fundação   | Tokens, tipografia, foco, motion, linguagem editorial | Componente         |
| 2 Componente | Peça com contrato próprio                             | Seção de página    |
| 3 Padrão     | Combinação recorrente de domínio                      | Wrapper geométrico |
| 4 Página     | Composição de padrões                                 | Kit de UI genérico |

## 3. Inventário

TODO: apontar para inventário classificado (FUNDAÇÃO / COMPONENTE / PADRÃO /
ESPECÍFICO / LEGADO / ANTI-PADRÃO / LACUNA / DECISÃO HUMANA).

## 4. Fundações

TODO: ligação com tokens semânticos; proibição de hex/primitivos em
componentes; gutters via media queries no consumidor.

## 5. Componentes

Para cada componente promovido, ficha com:

1. ID e nome · 2. camada · 3. status de maturidade · 4. problema · 5. quando usar ·
2. quando não usar · 7. anatomia/slots · 8. conteúdo obrigatório/opcional ·
3. HTML nativo · 10. semântica e nome acessível · 11. API pública (elemento,
   classes, `data-*`, atributos, eventos, DOM) · 12. variantes · 13. tamanhos
   (só se justificados) · 14. tokens semânticos · 15. estados · 16. teclado ·
4. foco · 18. responsividade · 19. overflow/extremo · 20. reduced motion ·
5. microcopy · 22. exemplo correto · 23. exemplo incorreto · 24. dependências ·
6. testes · 26. evidências no repo · 27. migração futura · 28. limitações

Nenhum componente nasce ESTÁVEL.

## 6. Padrões

TODO: padrões de domínio (abertura editorial, capítulo, umbral, checklist…);
listar componentes compostos; anti-padrões.

## 7. Composição de páginas

TODO: matriz seção → padrão → componentes → tokens; one-offs justificados;
prova de que uma página-alvo se descreve sem inventar peça por seção.

## 8. Matriz de estados

Colunas candidatas: default, hover, focus-visible, active, selected,
expanded/collapsed, checked, disabled, aria-disabled, loading, success,
warning, error, empty, overflow, conteúdo ausente/longo, reduced motion,
forced colors, zoom 200%.

Células: APLICÁVEL | NÃO APLICÁVEL | PROIBIDO | DEPENDE DO CONTEXTO | PENDENTE.
Todo N/A deve ser justificável. Não inventar loading/erro sem operação real.

## 9. Acessibilidade

- Norma: WCAG 2.2 AA
- Target size AA: 24×24 CSS px (SC 2.5.8); meta interna preferir 44×44
- Foco: visível (AA); meta interna anel ~2px / 3:1 ≈ AAA-inspired — **não** rotular como AA
- HTML nativo antes de ARIA; APG como orientação
- Testes automáticos + manuais

## 10. Governança e versionamento

Ciclo: PROPOSTO → CANDIDATO → EXPERIMENTAL → PRONTO PARA PROTÓTIPO → ESTÁVEL →
DEPRECADO → RETIRADO | REJEITADO.

SemVer do **design system** independente da versão dos tokens:
PATCH / MINOR / MAJOR conforme contratos.

## 11. Relação com tokens

- Consumir só semânticos
- Proibido: hex soltos, `--primitivo-*` em CSS de componentes, tokens de
  componente prematuros
- Exceções: raras, justificadas, registradas

## 12. Laboratório (se adotado)

TODO: lab estático HTML/CSS/JS consumindo `tokens.css`; não runtime; não Pages;
conteúdo demonstrativo marcado; sem frameworks por padrão.

## 13. Figma (futuro)

TODO: mapeamento tokens→Variables, variantes→properties, slots→Auto Layout.
Até decisão: JSON + Manual + conteúdo canônico = fontes de verdade.

## 14. Decisões humanas abertas

TODO: listar IDs (V*, D*, H*) sem preenchê-los.

## 15. Fora de escopo

TODO: o que este manual deliberadamente não cobre.

## 16. Definition of Ready — Fase 5

TODO: paths exatos + bloco de contexto para prompts de prototipagem.
