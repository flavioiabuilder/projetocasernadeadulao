# Roteiro de validação do design system — Fase 4

## Automatizado

```bash
npm run validate:discipulando:tokens
npm run validate:discipulando:design-system
npm run test:discipulando:design-system
npm run test:discipulando:design-system:e2e
npm run validate:metodo
```

Não afirmar “passa” sem executar.

## Manual (lab)

| #   | Checagem       | Critério                                                         |
| --- | -------------- | ---------------------------------------------------------------- |
| M1  | Teclado só     | Tab/Shift+Tab percorre demos interativas; Esc fecha sumário demo |
| M2  | Foco visível   | Anel não some sob sticky; contraste UI ≥3:1 meta                 |
| M3  | Zoom 200%      | Sem perda de conteúdo nas demos; reflow                          |
| M4  | Reduced motion | OS preference: demos sem animação obrigatória                    |
| M5  | Conteúdo longo | Citação e prosa demo não estourom horizontal                     |
| M6  | Forced colors  | Smoke: controles ainda perceptíveis (Windows)                    |
| M7  | SR smoke       | Humano: NVDA/VoiceOver em CMP-08/10/11                           |

## Gates humanos (não auto-fechar)

- V1, V2, D3-12, H1–H17
- Promoção ESTÁVEL / `1.0.0`
