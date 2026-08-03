# Discipulando a Caserna

Programa de discipulado cristocêntrico que serve ao **Projeto Caserna de Adulão**.
Este diretório concentra conteúdo, protótipos, ferramentas e documentação do
programa.

## Relação institucional

- **Discipulando a Caserna** — protagonista deste programa
- **Projeto Caserna de Adulão** — contexto institucional maior (raiz do repositório)

## Todas as versões exibíveis são protótipos

Nenhuma superfície HTML abaixo é “produto oficial” estruturalmente. São
experimentos e versões candidatas para apreciação pastoral.

| Protótipo               | Caminho                                                                                  | Público Pages   |
| ----------------------- | ---------------------------------------------------------------------------------------- | --------------- |
| Prospecto Fase 5        | [`prototipos/prospecto-fase-5-v1/`](prototipos/prospecto-fase-5-v1/)                     | Sim (`noindex`) |
| Prospecto v1            | [`prototipos/prospecto-v1/`](prototipos/prospecto-v1/)                                   | Sim             |
| Design System (lab)     | [`design-system/laboratorio/`](design-system/laboratorio/)                               | Sim             |
| Storytelling v1         | [`prototipos/storytelling-v1/`](prototipos/storytelling-v1/)                             | Sim             |
| Direção A               | [`prototipos/direcoes-visuais-v1/direcao-a/`](prototipos/direcoes-visuais-v1/direcao-a/) | Sim             |
| Direção B               | [`prototipos/direcoes-visuais-v1/direcao-b/`](prototipos/direcoes-visuais-v1/direcao-b/) | Sim             |
| Direção C               | [`prototipos/direcoes-visuais-v1/direcao-c/`](prototipos/direcoes-visuais-v1/direcao-c/) | Sim             |
| Homologação pastoral v1 | [`prototipos/homologacao-pastoral-v1/`](prototipos/homologacao-pastoral-v1/)             | Não (restrita)  |

Índice técnico de navegação: [`index.html`](index.html).

## Fontes canônicas

| Fonte                                                                          | Uso                                                         |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| [`conteudo/*.md`](conteudo/)                                                   | Texto editorial literal (citações `>` não parafrasear)      |
| [`conteudo/*.json`](conteudo/)                                                 | Módulos e matriz curricular                                 |
| [`prototipos/prospecto-v1/js/config.js`](prototipos/prospecto-v1/js/config.js) | Destinatário, versão, contato (manual)                      |
| [`fontes/guia-mestre/`](fontes/guia-mestre/)                                   | Referência pastoral; não editar o site a partir do PDF/DOCX |

**Gerados (não editar à mão):** `prototipos/prospecto-v1/js/dados/*.js`, bloco
`FALLBACK-DADOS` no prospecto, `prototipos/homologacao-pastoral-v1/index.html`,
fragmentos em `_gerado/editorial/`.

## Como executar

```bash
# Na raiz do repositório
npx serve .
# Prospecto: /programas/discipulando-a-caserna/prototipos/prospecto-v1/
# Ou duplo clique em prototipos/prospecto-v1/index.html (file://)
```

## Como validar

```bash
npm run validate:discipulando
# ou a cadeia completa do repositório:
npm run validate
```

## Comandos de geração

```bash
npm run generate:discipulando
npm run generate:discipulando:apresentacao
npm run generate:discipulando:editorial
```

Aliases antigos (`generate`, `generate:apresentacao`, `generate:editorial`)
continuam apontando para estes comandos.

## Documentação

- Contexto: [`docs/contexto-do-projeto.md`](docs/contexto-do-projeto.md)
- Arquitetura: [`docs/arquitetura/`](docs/arquitetura/)
- Publicação: [`docs/publicacao.md`](docs/publicacao.md)
- Pendências: [`TODO.md`](TODO.md)
- Histórico: [`CHANGELOG.md`](CHANGELOG.md)
