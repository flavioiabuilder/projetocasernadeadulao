# Manifesto de redirecionamentos

Shims HTML mínimos na raiz do repositório preservam URLs públicas antigas.
Não são segunda fonte dos protótipos.

Os destinos nos shims são **caminhos relativos** (`../../programas/...`), não
URLs absolutas a partir da raiz do host. Em GitHub Pages de projeto a base é
`/projetocasernadeadulao/`; um `url=/programas/...` resolveria para
`flavioiabuilder.github.io/programas/...` (404).

| URL antiga                     | Destino canônico (relativo ao shim)                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| `/prototipos/storytelling-v1/` | `../../programas/discipulando-a-caserna/prototipos/storytelling-v1/`                             |
| `/prototipos/direcao-a/`       | `../../programas/discipulando-a-caserna/prototipos/direcoes-visuais-v1/direcao-a/`               |
| `/prototipos/direcao-b/`       | `../../programas/discipulando-a-caserna/prototipos/direcoes-visuais-v1/direcao-b/`               |
| `/prototipos/direcao-c/`       | `../../programas/discipulando-a-caserna/prototipos/direcoes-visuais-v1/direcao-c/`               |

A raiz `/` passa a representar o Projeto Caserna de Adulão e **não** redireciona
para o prospecto.
