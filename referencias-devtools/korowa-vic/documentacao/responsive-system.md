# Responsivo — Friso

Breakpoints medidos como viewports de captura: 360, 390, 430, 768, 1024, 1280, 1440.

| Token | Valor |
| --- | --- |
| `--fr-bp-sm` | 360px |
| `--fr-bp-md` | 768px |
| `--fr-bp-lg` | 1024px |
| `--fr-bp-xl` | 1280px |
| `--fr-bp-xxl` | 1440px |

Na referência: `container-type: inline-size` (P1). Friso usa viewport + `clamp` no display; container queries podem estender o lab sem alterar tokens.

Mobile: header compacto, nav fullscreen, pin hero mantido, gutters `--fr-tam-gutter`.