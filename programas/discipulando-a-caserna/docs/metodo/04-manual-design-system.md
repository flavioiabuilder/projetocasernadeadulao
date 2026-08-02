# 04 — Manual do Design System (instância piloto)

> **Versão do sistema:** `0.1.0-candidate`  
> **Status:** CANDIDATO  
> **Tokens:** [`design-system/tokens/`](../../design-system/tokens/) (`0.1.0-candidate`, EM REVISÃO)  
> **Template:** [`metodo/templates/projeto-web/04-manual-sistema.md`](../../../../metodo/templates/projeto-web/04-manual-sistema.md)  
> **Não** promover a ESTÁVEL / `1.0.0` / APROVADO sem decisão humana (D3-12 + review).

## 1. Princípios

1. A especificação governa; prompts e protótipos não são SoT.
2. Quatro camadas: fundação → componente → padrão → página.
3. HTML nativo antes de ARIA; WCAG 2.2 AA.
4. Componentes consomem **só** tokens semânticos.
5. Copy literal só de `conteudo/` — o DS não inventa pastoral.
6. Direção A normativa; de B só umbral Adulão; de C estados + checklist.
7. Protótipos atuais = legado operacional até Fase 6.

## 2. Quatro camadas

| Camada     | Onde                         | Não é              |
| ---------- | ---------------------------- | ------------------ |
| Fundação   | `tokens/` + FND-*            | Componente         |
| Componente | `design-system/componentes/` | Seção de página    |
| Padrão     | `design-system/padroes/`     | Wrapper geométrico |
| Página     | Composição (cobertura)       | Kit genérico       |

## 3. Inventário

Ver [`fase-4/inventario-de-componentes.md`](fase-4/inventario-de-componentes.md).

## 4. Fundações

- Valores: `tokens.json` → `tokens.css` (gerado; aliases `var(--primitivo-*)`).
- Gutters: `--espacamento-pagina-gutter-mobile|tablet|desktop` + media queries no consumidor.
- Foco: `--foco-anel-largura|offset|estilo` + `--cor-foco-sobre-*`.
- Skip link unificado no lab (`dc-skip`).
- Proibido em CSS de componentes: hex, `--primitivo-*`, tokens DevTools.

## 5. Componentes

| ID     | Nome                | Ficha                                                                        |
| ------ | ------------------- | ---------------------------------------------------------------------------- |
| CMP-01 | Link                | [link.md](../../design-system/componentes/link.md)                           |
| CMP-02 | Ação                | [acao.md](../../design-system/componentes/acao.md)                           |
| CMP-03 | Selo                | [selo.md](../../design-system/componentes/selo.md)                           |
| CMP-04 | Citação bíblica     | [citacao-biblica.md](../../design-system/componentes/citacao-biblica.md)     |
| CMP-05 | Rótulo de estado    | [rotulo-estado.md](../../design-system/componentes/rotulo-estado.md)         |
| CMP-06 | Checklist item      | [checklist-item.md](../../design-system/componentes/checklist-item.md)       |
| CMP-07 | Item curricular     | [item-curricular.md](../../design-system/componentes/item-curricular.md)     |
| CMP-08 | Índice documental   | [indice-documental.md](../../design-system/componentes/indice-documental.md) |
| CMP-09 | Progresso           | [progresso.md](../../design-system/componentes/progresso.md)                 |
| CMP-10 | Controle de sumário | [controle-sumario.md](../../design-system/componentes/controle-sumario.md)   |
| CMP-11 | Abas                | [abas.md](../../design-system/componentes/abas.md)                           |
| CMP-12 | Disclosure          | [disclosure.md](../../design-system/componentes/disclosure.md)               |
| CMP-13 | Comparação          | [comparacao.md](../../design-system/componentes/comparacao.md)               |

API pública = HTML + classes `dc-*` + atributos nativos/`data-*` (sem React).

## 6. Padrões

| ID     | Nome                              |
| ------ | --------------------------------- |
| PAD-01 | Abertura editorial                |
| PAD-02 | Cabeçalho de capítulo / movimento |
| PAD-03 | Umbral atmosférico Adulão         |
| PAD-04 | Nota / salvaguarda                |
| PAD-05 | Matriz / visão curricular         |
| PAD-06 | Pedido pastoral / fechamento      |
| PAD-07 | Encerramento / rodapé documental  |
| PAD-08 | Checklist de apreciação           |

Fichas: [`fase-4/catalogo-de-padroes.md`](fase-4/catalogo-de-padroes.md).

## 7. Composição de páginas

Prova no prospecto: [`fase-4/cobertura-de-composicao.md`](fase-4/cobertura-de-composicao.md).

Regras: uma seção = um padrão (ou composição explícita); não promover one-offs
narrativos; cards de deck = anti-padrão editorial.

## 8. Matriz de estados

[`fase-4/matriz-de-estados.md`](fase-4/matriz-de-estados.md).

## 9. Acessibilidade

[`fase-4/matriz-de-acessibilidade.md`](fase-4/matriz-de-acessibilidade.md).

- AA: foco visível, target 24×24 (SC 2.5.8), contraste texto/UI.
- Metas internas: 44×44; anel 2px/3:1 (AAA-inspired) — **não** declarar como AA.

## 10. Governança

[`fase-4/governanca-e-versionamento.md`](fase-4/governanca-e-versionamento.md).

## 11. Relação com tokens

JSON canônico; CSS gerado; sem camada de componentes em `tokens.json`.
Exceções técnicas: raras, justificadas, registradas.

## 12. Laboratório

[`design-system/laboratorio/`](../../design-system/laboratorio/) — HTML/CSS/JS
estático; consome `tokens.css`; conteúdo **demonstrativo** marcado; não Pages;
não runtime de produção.

## 13. Figma (futuro)

Não há URL canônica. Mapeamento futuro: Variables, variants, Auto Layout.
Até decisão: JSON + este Manual + `conteudo/` + lab.

## 14. Decisões humanas abertas

H1–H17 · V1–V5 · D3-01/02/05–12 · método cromático F3-R05 · promoção ESTÁVEL.

## 15. Fora de escopo

Homepage do Projeto; DevTools; migração de protótipos; Storybook/React;
dark mode; e-commerce/SaaS/dashboard.

## 16. Definition of Ready — Fase 5

### Paths obrigatórios (ordem)

1. `docs/metodo/05-regras-agente.md` + `.cursor/rules/discipulando-caserna.mdc`
2. `conteudo/`
3. `docs/decisao-visual-v1.md`
4. `docs/metodo/03-direcao-tokens.md` + `design-system/tokens/README.md`
5. Este Manual
6. `design-system/componentes/*` + `padroes/*`
7. `docs/metodo/fase-4/cobertura-de-composicao.md`
8. Lab como referência executável

### Bloco de contexto para prompts

```text
Programa: Discipulando a Caserna. Direção A normativa.
DS 0.1.0-candidate CANDIDATO. Tokens 0.1.0-candidate EM REVISÃO.
Compor só com CMP/PAD do Manual; classes dc-*; só semânticos.
Copy de conteudo/. Não migrar prospecto legado. Sem framework.
Não resolver H*/V*/D3-12. Lab = referência; não Pages.
```

### Checklist DoR

- [x] Manual CANDIDATO com índices CMP/PAD
- [x] Matrizes estados + a11y
- [x] Cobertura do prospecto
- [x] Tokens com aliases CSS + gate stale
- [x] Anti-padrões listados
- [x] Decisões humanas listadas (não resolvidas)
