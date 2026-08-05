# Motion spec — Discipulando a Caserna (mínimo e progressivo)

Status: **candidato** (H5). Alinhado à Direção A (`docs/decisao-visual-v1.md`) e aos tokens `--motion-*`.

## Princípios

1. Motion reforça hierarquia e presença editorial — a identidade **não** depende de animação.
2. Durações curtas; easing de saída suave.
3. `prefers-reduced-motion: reduce` desliga deslocamento e revela; corta animação.
4. Proibido: glow, bounce, partículas, parallax agressivo, autoplay ostensivo, CTA comercial animado.

## Tokens

| Token | Valor | Uso |
|-------|-------|-----|
| `--motion-feedback-rapido` | 120ms | Hover, foco, feedback de controle |
| `--motion-transicao-padrao` | 200ms | Transições UI gerais |
| `--motion-revelacao-lenta` | 320ms | Entrada / reveal de capítulo |
| `--motion-easing-entrada` / `--motion-easing-padrao` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entradas |
| `--motion-easing-saida` | `cubic-bezier(0.4, 0, 1, 1)` | Saídas |
| Distância de reveal (lab) | `1.25rem` | TranslateY máximo (`--lab-reveal-distance` no CSS do lab) |

## Padrões

### Entrada de capítulo / hero lab

- Propriedades: `opacity`, `transform: translateY`
- Duração: `--motion-revelacao-lenta` (≈320ms)
- Easing: `--motion-easing-entrada`
- Stagger opcional ≤ 70ms entre itens irmãos

### Hover de link / controle

- Cor / underline: `--motion-feedback-rapido` + `--motion-easing-padrao`
- Sem scale agressivo; active discreto se necessário

### Scroll reveal (swatches / galeria)

- IntersectionObserver; classe `.is-visible`
- Desligado sob reduced-motion

### Lab page load

- Hub: uma entrada orquestrada; capítulos sem autoplay em loop
