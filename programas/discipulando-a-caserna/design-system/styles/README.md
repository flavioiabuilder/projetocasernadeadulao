# CSS compartilhado do Design System (produção)

Camada de runtime CSS para superfícies do programa — **não** é o laboratório.

| Arquivo           | Responsabilidade                                  |
| ----------------- | ------------------------------------------------- |
| `foundations.css` | Importa `tokens.css`; reset mínimo; layout/medida |
| `components.css`  | Contratos públicos `dc-*`                         |
| `patterns.css`    | PAD (abertura, umbral, pedido, rodapé, …)         |

## Regras

- Consumir apenas tokens **semânticos**
- Não importar `laboratorio/css/lab.css`
- Não editar `tokens/tokens.css` à mão
- Classes `.lab-*` não são API pública

## Estado

Esqueleto iniciado na preparação da Fase 6. O candidato F5 ainda usa
`prototipos/prospecto-fase-5-v1/css/prototipo.css` até migração controlada para
`prospecto/` após F5-12.
