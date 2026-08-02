# Valores não tokenizados — classificação (F4-R05)

| Valor | Onde | Categoria |
| --- | --- | --- |
| `1px` / borda via `--borda-separador` | tokens / CSS | token ou constante física de hairline |
| `4px` (altura progresso) | chrome | constante física de comportamento |
| `44px` (alvo mínimo) | controles | constante física WCAG / meta interna |
| `700px` / `768px` / `1100px` | media queries | breakpoint (não tokenizável em MQ clássica) |
| `1.25rem` (padding lista) | listas | regra tipográfica contextual |
| `0.15em` (underline-offset) | links | regra tipográfica contextual |

Não tokenizar todos os números cegamente. Revisar na migração para `prospecto/`.
