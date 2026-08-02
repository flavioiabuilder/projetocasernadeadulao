# Matriz de acessibilidade — Fase 4

- **Norma:** WCAG 2.2 nível AA
- **Orientação de implementação:** WAI-ARIA APG (não norma substituta)
- **Metas internas (não rotular como AA):** alvo acionável ≥44×44 CSS px; anel de foco ~2px / contraste 3:1 (aproxima SC 2.4.13 AAA)

## Requisitos transversais

| Requisito                 | Norma / meta         | Aplicação                            |
| ------------------------- | -------------------- | ------------------------------------ |
| Nome, função, estado      | AA 4.1.2             | Controles interativos                |
| Foco visível              | AA 2.4.7             | Todos focáveis                       |
| Foco não oculto por autor | AA 2.4.11            | Sticky/overlays                      |
| Target mínimo 24×24       | AA 2.5.8             | Controles; exceção links inline      |
| Target preferido 44×44    | Meta interna         | Botões/chrome                        |
| Contraste texto           | AA 1.4.3             | Pares em tokens                      |
| Contraste UI não-texto    | AA 1.4.11            | Foco, bordas de estado               |
| Teclado                   | AA 2.1.1             | Sem trap                             |
| Ordem de foco             | AA 2.4.3             | DOM = ordem visual                   |
| Reduced motion            | AA 2.3.3 (se animar) | Tokens motion                        |
| Zoom / reflow             | AA 1.4.4 / 1.4.10    | Lab + roteiro                        |
| Cor não única             | AA 1.4.1             | CMP-05 texto + cor                   |
| Imagens                   | AA 1.1.1             | Decorativas `alt=""` / `aria-hidden` |
| Headings                  | AA 1.3.1 / 2.4.6     | Padrões de seção sem saltos          |
| Labels                    | AA 1.3.1 / 3.3.2     | Placeholder nunca único rótulo       |

## Por componente

| ID     | Teclado            | Nome acessível            | Estados expostos         | Notas                                  |
| ------ | ------------------ | ------------------------- | ------------------------ | -------------------------------------- |
| CMP-01 | Tab/Enter          | Texto do link             | —                        | Inline pode <24×24 (exceção)           |
| CMP-02 | Tab/Enter/Space    | Conteúdo ou aria-label    | aria-pressed se toggle   | Meta 44×44                             |
| CMP-03 | —                  | Texto do selo             | —                        | Estático                               |
| CMP-04 | —                  | blockquote + cite         | —                        | Citação literal NAA                    |
| CMP-05 | —                  | Texto do estado           | —                        | Não só cor                             |
| CMP-06 | Tab/Space se input | label associado           | aria-checked se checkbox | Preferir lista sem input se só leitura |
| CMP-07 | links internos     | heading do item           | —                        |                                        |
| CMP-08 | Tab; Esc fecha     | nav aria-label            | aria-current             | Overlay: foco inicial + retorno        |
| CMP-09 | — ou focável       | valuetext / texto         | aria-valuenow            | Não esconder só com aria-hidden        |
| CMP-10 | Enter/Space/Esc    | aria-expanded             | expanded                 | aria-controls                          |
| CMP-11 | Setas/Tab          | tab/tabpanel              | aria-selected            | APG tabs                               |
| CMP-12 | Enter/Space        | summary                   | open nativo              | Preferir details                       |
| CMP-13 | —                  | table/row/cell se tabular | —                        | Empilhar no mobile                     |

## Testes

| Tipo         | Ferramenta                   | Escopo                    |
| ------------ | ---------------------------- | ------------------------- |
| Automatizado | Axe (Playwright)             | Lab + prospecto legado    |
| Teclado      | Manual / e2e                 | Lab demos interativas     |
| Contraste    | validate:discipulando:tokens | Pares semânticos          |
| Zoom 200%    | Roteiro manual               | Lab                       |
| SR smoke     | NVDA/VoiceOver (humano)      | Antes de promoção ESTÁVEL |
