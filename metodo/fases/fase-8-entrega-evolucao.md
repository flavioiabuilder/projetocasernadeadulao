# Fase 8 — Entrega e evolução

**Objetivo.** Encerrar o projeto de forma que ele continue vivo sem você — e
que o próximo projeto comece mais adiantado.

Estado no piloto: **aberta**. O ledger de decisões já roda
([`../biblioteca/decisoes/registro.md`](../biblioteca/decisoes/registro.md)),
que é a parte que quase ninguém mantém; o handoff não foi formalizado.

## 8.1 Handoff

Quatro coisas, nem mais nem menos:

| Entrega      | Conteúdo                                                               |
| ------------ | ---------------------------------------------------------------------- |
| Acesso       | Repositório, hospedagem, domínio, analytics                            |
| Documentação | Os cinco artefatos **atualizados** — não a versão do começo do projeto |
| Demonstração | Vídeo curto mostrando como editar o conteúdo                           |
| Manutenção   | O que precisa ser revisto e com que frequência                         |

Neste repositório o handoff é **pastoral e institucional**, não comercial: a
entrega é a apreciação do Pr. Glaydston, e o “acesso” relevante é a
compreensão de onde vive a fonte canônica de conteúdo
(`programas/discipulando-a-caserna/conteudo/`) e do que é gerado
([ADR-005](../../docs/arquitetura/ADR-005-artefatos-gerados.md)).

## 8.2 Evolução do sistema

Versione o design system em `MAJOR.MINOR.PATCH`:

- **MAJOR** — muda ou remove contrato de componente existente.
- **MINOR** — componente ou padrão novo, retrocompatível.
- **PATCH** — ajuste de valor sem mudar contrato.

O SemVer do design system é **independente** do SemVer dos tokens. Governança
detalhada:
[`fase-4/governanca-e-versionamento.md`](../../programas/discipulando-a-caserna/docs/metodo/fase-4/governanca-e-versionamento.md).

Mantenha changelog. Em seis meses ninguém lembra por que aquele token mudou.

## 8.3 Medir e aprender

Trinta dias após o lançamento, colete o que for aplicável ao tipo de projeto.
Para um prospecto pastoral, as métricas de e-commerce não servem; as
equivalentes são:

| Genérico                            | Equivalente aqui                                        |
| ----------------------------------- | ------------------------------------------------------- |
| Taxa de conversão da ação principal | A apreciação aconteceu? Houve orientação registrada?    |
| Tempo até a primeira interação      | O documento foi lido até o pedido de fechamento?        |
| Seções mais e menos vistas          | Que seções geraram pergunta; quais foram ignoradas      |
| Dispositivos predominantes          | Em que dispositivo a leitura pastoral realmente ocorreu |

Registre o resultado em
[`../biblioteca/decisoes/registro.md`](../biblioteca/decisoes/registro.md), no
campo **Resultado observado**. Uma entrada sem resultado observado é uma
intenção, não um aprendizado.

> É este arquivo que faz o décimo projeto ser melhor que o primeiro — não a
> ferramenta nova que sair no mês que vem.

## 8.4 Produtizar o método

Quando o pipeline roda, ele deixa de ser processo e vira produto:

- **Pacote por nicho** — um sistema pré-configurado por setor; a Fase 1 já
  vem 70% feita e a margem sobe.
- **Assinatura de evolução** — vender melhoria contínua medida, não site.
- **Licenciamento do sistema** — o design system documentado é, ele próprio,
  um entregável vendável.

Aqui isso é a hipótese de extração de [`../README.md`](../README.md): a pasta
`metodo/` pode virar repositório independente. Fora do escopo desta fase
([ADR-007](../../docs/arquitetura/ADR-007-camada-metodo-o-sistema.md)).

## Procedimento

1. Atualizar os cinco artefatos ao estado real — não ao estado planejado.
2. Fechar o changelog da versão.
3. Entregar acesso, documentação, demonstração e plano de manutenção.
4. Agendar a coleta de 30 dias.
5. Registrar resultado observado no ledger.
6. Promover para [`../ANTIPADROES.md`](../ANTIPADROES.md) o que deu errado duas vezes.

## Entregável

Handoff + roadmap + entrada de ledger com resultado observado.

## Critério de aceite

> O próximo projeto do mesmo nicho começa na Fase 3.

## Proibições

- Entregar documentação desatualizada como se fosse o estado atual
- Fechar o projeto sem entrada de ledger
- Registrar decisão sem resultado observado, depois da janela de medição
- Inventar métrica, endosso, aprovação ou data
- Promover `metodo/` a repositório independente sem ADR
