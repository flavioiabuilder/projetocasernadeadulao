# TASK-P0-01 e TASK-P0-02 — autoridade e proteção do Guia Mestre

## Decisão de autoridade documental

O arquivo Markdown
`fontes/guia-mestre/Guia_Mestre_Discipulando_a_Caserna_v1_0-RC_revisado.md`
é a **fonte textual canônica editável** do Guia Mestre enquanto a versão estiver
em estado de candidata à homologação pastoral. O HTML homônimo é um derivado
publicável e deve reproduzir a mesma condição editorial.

O DOCX e o PDF são instantâneos binários anteriores, preservados apenas como
evidência de revisão e referência visual. Eles **não têm autoridade para
sobrescrever o Markdown** e não devem ser distribuídos: ambos ainda contêm um
prefácio atribuído ao Pr. Glaydston Gama Lopes, sua assinatura nominal e uma
declaração de validação pastoral que não foram homologados. Por restrição do
fluxo de PR, os dois binários não foram alterados nesta tarefa.

## Evidências verificadas na TASK-P0-01

| Formato  | Resultado da verificação                                                              | Tratamento                                                   |
| -------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Markdown | Reserva o prefácio e declara a homologação pendente                                   | Definido como fonte canônica                                 |
| HTML     | Reserva o prefácio, mas não explicitava o estado editorial junto aos dados editoriais | Corrigido para declarar a homologação pendente               |
| DOCX     | Contém prefácio, alegação de validação e assinatura pastoral não homologados          | Mantido sem alteração; hash registrado e distribuição vedada |
| PDF      | É o derivado visual do instantâneo binário divergente                                 | Mantido sem alteração; hash registrado e distribuição vedada |

O rascunho removido permanece isolado em
`fontes/guia-mestre/rascunhos/prefacio-rascunho-referencia.md`, com aviso de que
não integra o Guia. Ele é somente evidência interna e não constitui fonte de
conteúdo homologado.

## Proteção proporcional da TASK-P0-02

O comando `npm run check:guia-mestre` aplica duas salvaguardas:

1. nos derivados textuais publicáveis (MD e HTML), rejeita as três marcas
   específicas do prefácio indevido e exige a ressalva de homologação pendente;
2. nos binários, confere os hashes SHA-256 dos artefatos auditados, impedindo que
   uma troca silenciosa seja aceita sem nova auditoria.

A regra não proíbe genericamente palavras como “assinatura” ou o nome do pastor,
pois elas podem aparecer legitimamente em metáforas doutrinárias ou na indicação
do futuro validador. Assim, evita falsos positivos e protege exatamente o risco
identificado. A verificação também integra `npm run validate`.

## Critério para uma futura homologação

Depois de recebida confirmação documental da autoridade competente, a mudança
de estado deve ocorrer em uma tarefa própria: atualizar primeiro o Markdown,
regenerar os três derivados, revisar os quatro formatos e então ajustar ou
remover esta proteção. Alterar apenas um formato não é suficiente.
