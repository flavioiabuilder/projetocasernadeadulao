# Matriz de estados — Fase 4

- **Data:** 2026-08-02
- **Legenda:** A = APLICÁVEL · N = NÃO APLICÁVEL · P = PROIBIDO · D = DEPENDE DO CONTEXTO · ? = PENDENTE
- Todo **N** deve ser justificável (peça sem operação / sem foco / sem async).

## Componentes

| Estado                | 01 Link | 02 Ação | 03 Selo | 04 Citação | 05 Estado | 06 Check | 07 Curric | 08 Índice | 09 Prog | 10 Sumário | 11 Abas | 12 Disc | 13 Comp |
| --------------------- | ------- | ------- | ------- | ---------- | --------- | -------- | --------- | --------- | ------- | ---------- | ------- | ------- | ------- |
| default               | A       | A       | A       | A          | A         | A        | A         | A         | A       | A          | A       | A       | A       |
| hover                 | A       | A       | N¹      | N¹         | N¹        | D²       | N¹        | A³        | N¹      | A          | A       | A⁴      | N¹      |
| focus-visible         | A       | A       | N¹      | N¹         | N¹        | D²       | D³        | A         | D⁵      | A          | A       | A       | D³      |
| active/pressed        | A       | A       | N       | N          | N         | D²       | N         | A³        | N       | A          | A       | A       | N       |
| selected              | N       | N       | N       | N          | N         | N        | N         | A         | N       | N          | A       | N       | N       |
| expanded/collapsed    | N       | N       | N       | N          | N         | N        | N         | D⁶        | N       | A          | N       | A       | N       |
| checked/unchecked     | N       | N       | N       | N          | N         | D²       | N         | N         | N       | N          | N       | N       | N       |
| disabled              | P⁷      | D⁸      | N       | N          | N         | D⁸       | N         | N         | N       | N          | D⁸      | N       | N       |
| aria-disabled         | D⁸      | D⁸      | N       | N          | N         | D⁸       | N         | N         | N       | N          | D⁸      | N       | N       |
| loading/busy          | N       | P⁹      | P       | N          | N         | N        | N         | N         | N       | N          | N       | N       | N       |
| success/warning/error | N       | N       | N       | N          | A¹⁰       | N        | D         | N         | N       | N          | N       | N       | N       |
| empty                 | N       | N       | N       | N          | N         | N        | A         | A         | A       | N          | N       | N       | A       |
| overflow              | A       | N       | N       | A          | N         | A        | A         | A         | N       | N          | N       | A       | A       |
| conteúdo ausente      | N       | N       | N       | P¹¹        | N         | N        | D         | N         | N       | N          | N       | N       | D       |
| conteúdo longo        | A       | A       | A       | A          | A         | A        | A         | A         | N       | A          | A       | A       | A       |
| reduced motion        | A       | A       | N       | N          | N         | N        | N         | A         | A       | A          | A       | A       | N       |
| forced colors         | A       | A       | A       | A          | A         | A        | A         | A         | A       | A          | A       | A       | A       |
| zoom 200%             | A       | A       | A       | A          | A         | A        | A         | A         | A       | A          | A       | A       | A       |

### Justificativas N/P

1. Peça tipicamente não focável / não hoverável (texto estático).
2. Só se houver `<input type="checkbox">` real.
3. Se contiver links focáveis.
4. Hover no `summary`.
5. Se a barra for focável ou tiver controle associado; senão N.
6. Overlay/sumário expansível.
7. Links “disabled” — preferir remover href ou `aria-disabled` + explicar.
8. Se indisponível: preferir focável + `aria-disabled` + motivo textual; evitar só `disabled` opaco.
9. Sem operação assíncrona no programa atual — não inventar spinner.
10. Variantes de rótulo (produzido/pendente), não toast de formulário.
11. Citação sem texto canônico — omitir o componente (não placeholder).

## Fundações

| Estado         | Skip | Foco anel | Motion |
| -------------- | ---- | --------- | ------ |
| focus-visible  | A    | A         | N      |
| reduced motion | N    | N         | A      |
