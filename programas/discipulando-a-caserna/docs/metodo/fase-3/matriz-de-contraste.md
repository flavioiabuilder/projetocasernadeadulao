# Matriz de contraste — Fase 3

- **Programa:** Discipulando a Caserna
- **Data:** 2026-08-01
- **Método:** luminância relativa sRGB (WCAG 2.x) via `validar-tokens.js`
- **Baseline:** AA — texto normal ≥ 4,5:1; texto grande/UI gráfico ≥ 3:1
- **Foco 2px + ≥3:1:** padrão **interno** (aproxima Focus Appearance AAA; **não** é requisito AA)

Fonte dos tokens: [`../../../design-system/tokens/tokens.json`](../../../design-system/tokens/tokens.json).

## Pares validados (automatizados)

| Foreground                     | Background                            | Uso                     | Critério     | Resultado       |
| ------------------------------ | ------------------------------------- | ----------------------- | ------------ | --------------- |
| texto.primario (`#23262B`)     | superficie.papel (`#FBF8F2`)          | normal                  | AA 4,5:1     | passa           |
| texto.primario                 | superficie.creme (`#F5F1E7`)          | normal                  | AA 4,5:1     | passa           |
| texto.suave (`#4A4A4A`)        | superficie.papel                      | normal                  | AA 4,5:1     | passa           |
| texto.inverso (creme)          | superficie.profunda (`#1A2A44`)       | normal                  | AA 4,5:1     | passa           |
| texto.sobreProfunda            | superficie.profundaEscura (`#101D33`) | normal                  | AA 4,5:1     | passa           |
| acento.editorial (`#8C6A45`)   | superficie.papel                      | UI / acento             | AA 3:1       | passa (~4,65:1) |
| bronze.700 (`#7C6038`)         | superficie.papel                      | normal (citação/rótulo) | AA 4,5:1     | passa           |
| bronze.300 (`#C9A86A`)         | superficie.profunda                   | UI                      | AA 3:1       | passa           |
| foco.sobrePapel (`#8C6A45`)    | superficie.papel                      | UI foco                 | interno ≥3:1 | passa           |
| foco.sobreProfunda (`#C9A86A`) | superficie.profunda                   | UI foco                 | interno ≥3:1 | passa           |

## Restrições

- Bronze `#8C6A45` **não** é cor de corpo corrido sobre creme se a razão cair
  abaixo de 4,5:1 (sobre creme ~4,37:1 — usar tinta ou bronze.700 para texto
  pequeno).
- Bronze claro `#C9A86A` **não** serve como anel de foco sobre papel (~2,13:1).
- Rótulos editoriais de estado não dependem só de cor (sucesso/aviso/erro/info).

## Como recalcular

```bash
npm run validate:discipulando:tokens
```
