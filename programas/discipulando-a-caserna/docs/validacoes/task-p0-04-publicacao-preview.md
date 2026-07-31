# TASK-P0-04 — validação de publicação e preview

Data da verificação: **30 de julho de 2026 (UTC)**.

## Escopo

A validação foi executada depois da implementação local da TASK-P0-03. Ela
separa, de forma explícita, o estado publicado no GitHub Pages do estado da
mudança candidata, evitando declarar como publicada uma alteração que ainda
não passou por merge e deploy.

## Evidências coletadas

| Verificação                            | Resultado | Evidência                                                                                |
| -------------------------------------- | --------- | ---------------------------------------------------------------------------------------- |
| URL pública responde por HTTPS         | aprovada  | `HTTP/1.1 200 OK`, `content-type: text/html; charset=utf-8` e HSTS na resposta de `curl` |
| Canonical publicado                    | aprovado  | aponta para a própria URL pública                                                        |
| Open Graph publicado antes do deploy   | parcial   | título e descrição presentes; imagem, URL, tipo e locale ainda ausentes                  |
| Twitter Card publicado antes do deploy | pendente  | metadados ainda ausentes na versão publicada                                             |
| Preview candidato local                | aprovado  | Open Graph e Twitter Card apontam para imagem HTTPS existente no repositório             |
| Proteção contra regressão              | aprovada  | teste unitário dedicado e workflow de qualidade para `push` e pull request               |

## Critérios para validação pós-deploy

Depois do merge e da publicação, deve-se repetir:

```bash
curl -sSIL https://flavioiabuilder.github.io/projetocasernadeadulao/
curl -sSL https://flavioiabuilder.github.io/projetocasernadeadulao/ | sed -n '1,80p'
curl -sSIL https://flavioiabuilder.github.io/projetocasernadeadulao/assets/img/logo-pdac/LOGO_DaC_Primaria_Hero_3D_Color.png
```

O aceite final exige resposta `200` para a página e a imagem, canonical igual à
URL pública e presença integral dos campos `og:*` e `twitter:*`. Validadores de
redes sociais podem manter cache; se necessário, deve-se solicitar nova coleta
somente depois de confirmar o deploy.

## Decisão sobre a TASK-P0-05

A TASK-P0-05 **não foi executada**. A versão pública ainda não contém a mudança
candidata da TASK-P0-03 e não houve autorização específica para qualquer ação
condicionada ao aceite pós-deploy. Portanto, suas precondições não foram todas
demonstradas nem autorizadas.
