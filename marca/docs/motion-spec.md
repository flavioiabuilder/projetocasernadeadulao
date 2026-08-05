# Motion spec — PCA (presença sóbria)

Status: **candidato** (H5). Alinhado aos tokens `--dur-*` / `--ease-*` da página institucional.

## Princípios

1. Motion reforça hierarquia e presença — não entretenimento.
2. Durações curtas; easing de saída suave.
3. `prefers-reduced-motion: reduce` desliga deslocamento e revela; mantém opacidade instantânea ou corta animação.
4. Proibido: glow, bounce, partículas, parallax agressivo, autoplay ostensivo.

## Tokens

| Token | Valor | Uso |
|-------|-------|-----|
| `--dur-fast` | 180ms | Hover, foco, CTA |
| `--dur-base` | 420ms | Transições de seção / header |
| `--dur-slow` | 780ms | Raro; evitar no lab |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entradas |
| `--ease-soft` | `cubic-bezier(0.4, 0, 0.2, 1)` | UI geral |
| `--reveal-distance` | 1.25rem | TranslateY máximo de reveal |

## Padrões

### Entrada de capítulo / hero lab

- Propriedades: `opacity`, `transform: translateY`
- Duração: 220–320ms (`--dur-fast` … um pouco acima `--dur-base`)
- Easing: `--ease-out`
- Stagger opcional ≤ 70ms entre itens irmãos

### Hover CTA

- Cor / border / underline: `--dur-fast` + `--ease-soft`
- Active: `translateY(1px)` sem bounce

### Scroll reveal (swatches / cards)

- IntersectionObserver; classe `.is-visible`
- Desligado sob reduced-motion

### Lab page load

- Hero do hub: uma entrada orquestrada; demais capítulos sem autoplay em loop
