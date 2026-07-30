# TASK-P0-01 e TASK-P0-02 — autoridade e proteção do Guia Mestre

## Estado da decisão de autoridade documental

Foi registrada como **proposta técnica, ainda dependente de confirmação humana**, a
adoção do arquivo Markdown
`fontes/guia-mestre/Guia_Mestre_Discipulando_a_Caserna_v1_0-RC_revisado.md`
como fonte textual canônica editável do Guia Mestre. O HTML homônimo seria um
derivado publicável. O histórico e o repositório não contêm decisão humana que
aprove essa autoridade nem ferramenta ou procedimento confiável para gerar DOCX
e PDF. Portanto, esta proposta não autoriza regeneração nem substituição de
binários.

O DOCX e o PDF são instantâneos binários anteriores e **não devem ser
distribuídos**. O DOCX contém prefácio, assinatura nominal e declaração de
validação pastoral não homologados. A inspeção semântica do PDF permanece
bloqueada pela ausência de extrator confiável já instalado; não se infere seu
conteúdo a partir do DOCX. Por restrição do fluxo de PR, os binários não foram
alterados.

## Auditoria reproduzível em 30/07/2026

Ponto de partida: branch `work`, HEAD
`b45a90312db589e761cad61fe3232c7c9b8ce4a5`, árvore de trabalho limpa. Não há
`AGENTS.md` aplicável. O commit `c583ef1` alterou MD e HTML e segregou o
rascunho, mas não alterou DOCX ou PDF. Sua apresentação diz que o Guia completo
“segue em anexo”; nenhum segundo anexo externo é identificável ou recuperável
pelo Git, logo não foi inspecionado.

| Artefato | SHA-256 antes/depois desta auditoria | Inspeção e resultado |
| --- | --- | --- |
| MD | `a13279f48ffaa303204162124d7f2ffd5e23620e9f7ea823bda8f89540b27e64` | UTF-8 textual; reserva presente, sumário por âncoras e homologação pendente |
| HTML | `e185b074d84b3b54a5d73d84c56e53e19feaaf2e6ee5b17ed152da297dcd6d3e` | UTF-8 textual; reserva presente, sumário navegável e estado editorial pendente |
| DOCX | `1462d908c83956b3ccd04e1e088ebc051d7f1ff3e1d6740d7ab2c4cc82c37784` | XML extraído com `unzip`; contém prefácio completo, “Eu o valido pastoralmente”, assinatura e cargo atribuídos; 221 páginas declaradas, TOC com campos `PAGEREF`, 13 quebras explícitas, um `sectPr` e cabeçalhos/rodapés sem texto |
| PDF | `de2f7dae5a621f7f5ead3a8095764a832c78b8ebbe220344a8e79162d4fb3588` | Arquivo presente e hash conferido; conteúdo, metadados, sumário e paginação não confirmados, pois não há extrator de PDF confiável instalado |

Os hashes são idênticos antes e depois porque esta auditoria não altera os
quatro artefatos. No pai de `c583ef1`, MD e HTML tinham respectivamente os
hashes `e06339e4ae05861124435b15b510a8c4e21302a200cb9d9ae43321163e76ef73`
e `d54bb19a3df242647913c69ee94946f0eda564b7d621ad78c5526f80d89ad409`;
DOCX e PDF já tinham os hashes atuais.

Os metadados do DOCX registram título “Guia Mestre do Discipulando a Caserna”,
autor “Obr. Flávio Alves da Costa”, última modificação pelo mesmo autor, revisão
2, criação/modificação em 11/06/2026 e aplicação Microsoft Word. A coerência
visual, a atualização dos números do sumário e as páginas adjacentes não foram
confirmadas sem renderizador. A pesquisa por `strings` no PDF não produziu texto
útil e, por não ser extração semântica confiável, não foi usada como evidência.

## Bloqueio humano e procedimento de saída

Os critérios de aceite dos quatro formatos **não foram atingidos**. Para remover
o bloqueio, uma pessoa responsável deve:

1. confirmar por escrito a fonte autoritativa;
2. aprovar uma ferramenta e um procedimento determinístico de geração;
3. fornecer ou autorizar DOCX e PDF regenerados fora deste fluxo de PR;
4. revisar visual e semanticamente os quatro formatos, inclusive metadados,
   sumário, paginação, cabeçalhos, páginas adjacentes e assinaturas;
5. substituir os binários em um meio compatível e atualizar os hashes somente
   após essa revisão.

Até lá, `npm run check:guia-mestre` falha intencionalmente: valida as ressalvas
dos textuais e reconhece pelos hashes os binários bloqueados, impedindo que um
estado apenas “inalterado” seja confundido com um estado aprovado.

## Evidências verificadas na TASK-P0-01

| Formato  | Resultado da verificação                                                              | Tratamento                                                   |
| -------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Markdown | Reserva o prefácio e declara a homologação pendente                                   | Proposto como fonte canônica; decisão humana pendente        |
| HTML     | Reserva o prefácio, mas não explicitava o estado editorial junto aos dados editoriais | Corrigido para declarar a homologação pendente               |
| DOCX     | Contém prefácio, alegação de validação e assinatura pastoral não homologados          | Mantido sem alteração; hash registrado e distribuição vedada |
| PDF      | Não pôde ser semanticamente confirmado com ferramenta confiável                      | Mantido sem alteração; hash registrado e distribuição vedada |

O rascunho removido permanece isolado em
`fontes/guia-mestre/rascunhos/prefacio-rascunho-referencia.md`, com aviso de que
não integra o Guia. Ele é somente evidência interna e não constitui fonte de
conteúdo homologado.

## Proteção proporcional da TASK-P0-02

O comando `npm run check:guia-mestre` aplica duas salvaguardas:

1. nos derivados textuais publicáveis (MD e HTML), rejeita as três marcas
   específicas do prefácio indevido e exige a ressalva de homologação pendente;
2. nos binários, confere os hashes SHA-256 dos artefatos bloqueados e falha tanto
   para os hashes contaminados conhecidos quanto para troca sem nova auditoria.

A regra não proíbe genericamente palavras como “assinatura” ou o nome do pastor,
pois elas podem aparecer legitimamente em metáforas doutrinárias ou na indicação
do futuro validador. Assim, evita falsos positivos e protege exatamente o risco
identificado. A verificação também integra `npm run validate`.

## Critério para uma futura homologação

Depois de recebida confirmação documental da autoridade competente, a mudança
de estado deve ocorrer em uma tarefa própria: atualizar primeiro o Markdown,
regenerar os três derivados, revisar os quatro formatos e então ajustar ou
remover esta proteção. Alterar apenas um formato não é suficiente.
