# Acessibilidade — Friso

## Referência (amostra P6)

Achados típicos a corrigir na reconstrução (não copiar falhas):

- Alvos de toque &lt; 44px quando ocorrerem → Friso usa `min-height/min-width: 2.75rem` nos controles.
- Focus ring: referência com `outline-style: none` frequente → Friso força `:focus-visible` 3px carmesim.
- Canvas: N/A (0 canvas); fallback textual presente.
- `prefers-reduced-motion`: Friso implementa substituição de tokens + reveals estáticos.

## Garantias Friso

Skip link, landmarks (`header`/`nav`/`main`/`footer`), `aria-expanded` no menu, fechar com Escape, contraste AA nos pares semânticos creme/ardósia e texto sobre carmesim.