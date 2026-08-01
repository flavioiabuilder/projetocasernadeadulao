# Checklist — Pré-lançamento

Classificação: `MANUAL` | `AUTOMATIZADO` | `PARCIALMENTE AUTOMATIZADO` | `NÃO APLICÁVEL`.

## Gates automatizados (repo piloto)

| Item                     | Classe       | Como verificar                           |
| ------------------------ | ------------ | ---------------------------------------- |
| Validação global         | AUTOMATIZADO | `npm run validate`                       |
| Programa                 | AUTOMATIZADO | `npm run validate:discipulando`          |
| Método                   | AUTOMATIZADO | `npm run validate:metodo`                |
| Referências              | AUTOMATIZADO | `npm run validate:referencias`           |
| Encoding                 | AUTOMATIZADO | `npm run check:discipulando:encoding`    |
| Guia Mestre (marcadores) | AUTOMATIZADO | `npm run check:discipulando:guia-mestre` |
| Paridade editorial       | AUTOMATIZADO | `npm run check:discipulando:paridade`    |
| Testes                   | AUTOMATIZADO | `npm run test`                           |
| E2E                      | AUTOMATIZADO | `npm run test:e2e`                       |
| A11y Axe                 | AUTOMATIZADO | `npm run test:a11y`                      |
| Format                   | AUTOMATIZADO | `npm run format:check`                   |

## Publicação

| Item                                                                       | Classe                    | Como verificar                                               |
| -------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------ |
| Artefato Pages seletivo (sem docs, Guia, homologação, DevTools, `metodo/`) | PARCIALMENTE AUTOMATIZADO | Revisar `.github/workflows/pages.yml` + `docs/publicacao.md` |
| `robots` / `noindex` conforme política                                     | MANUAL / inspeção         | HTML publicado                                               |
| Redirecionamentos legados preservados                                      | MANUAL                    | Shims em `prototipos/` na raiz                               |
| Não publicar conteúdo restrito                                             | MANUAL                    | Homologação e fontes fora do artifact                        |

## Humanos / externos

| Item                                      | Classe                    | Como verificar                         |
| ----------------------------------------- | ------------------------- | -------------------------------------- |
| Validação pastoral / institucional        | MANUAL                    | TODO do programa                       |
| Licença / direitos de assets              | MANUAL                    | Inventário de assets                   |
| Domínio e indexação                       | MANUAL                    | Política de `noindex`                  |
| Lighthouse (performance/SEO se aplicável) | MANUAL                    | Chrome Lighthouse — não há script npm  |
| Leitor de tela smoke                      | MANUAL                    | NVDA / VoiceOver                       |
| Segredos ausentes do commit               | PARCIALMENTE AUTOMATIZADO | `validate:metodo` + revisão `git diff` |

## Prompt sugerido

[`../prompts/qa-visual.md`](../prompts/qa-visual.md)
