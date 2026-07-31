# TASK-P0-06 — decisão editorial sobre o protótipo

Data da decisão: **30 de julho de 2026 (UTC)**.

## Contexto

O protótipo é um instrumento local de apoio à apreciação pastoral. Sua função é
organizar a leitura e registrar decisões durante a apresentação, sem transformar
o convite pastoral em captação, venda ou chamada pública.

Esta decisão antecede e condiciona a TASK-P0-07. Ela registra apenas a orientação
editorial; não autoriza nem implementa alterações funcionais.

## Decisão registrada

Fica **editorialmente aprovada, mas ainda não autorizada para implementação**, a
evolução local do protótipo com os seguintes recursos:

1. checkboxes para marcar os pontos submetidos à apreciação;
2. campos de observações vinculados à sessão de apresentação;
3. geração de um resumo textual das decisões;
4. cópia desse resumo para a área de transferência;
5. preparação de uma mensagem por `mailto:` com o resumo preenchido.

Esses recursos devem funcionar somente no navegador, de modo progressivo e sem
persistência. Nenhum dado poderá ser enviado automaticamente, armazenado em
`localStorage`, gravado em back-end ou transmitido a serviço externo. A cópia e o
`mailto:` deverão depender de uma ação consciente da pessoa usuária.

## Diretriz para o convite ao prefácio

O convite ao prefácio permanece parte editorial e pastoral do documento. Sua
redação, hierarquia e apresentação não podem assumir linguagem ou aparência de
CTA comercial.

Em especial, a implementação futura não poderá:

- converter o convite em botão de conversão, inscrição ou contratação;
- empregar urgência, prazo, escassez ou promessa promocional;
- inferir aceite, homologação ou autoria antes da manifestação pastoral;
- substituir a possibilidade de resposta negativa ou de pedido de mais tempo;
- usar o `mailto:` como ação principal do convite ao prefácio.

O eventual `mailto:` será apenas uma forma local e opcional de transportar o
resumo das decisões já registradas, não um mecanismo de captação.

## Limites funcionais para a TASK-P0-07

Caso seja autorizada posteriormente, a implementação deverá preservar:

| Aspecto        | Limite editorial e técnico                                                 |
| -------------- | -------------------------------------------------------------------------- |
| Estado         | Mantido apenas em memória durante a página aberta                          |
| Observações    | Texto livre local, sem envio automático                                    |
| Resumo         | Texto legível, com data, itens marcados e observações                      |
| Cópia          | Iniciada pela pessoa usuária e acompanhada de retorno de sucesso ou falha  |
| `mailto:`      | Link opcional, editável no cliente de e-mail e sem disparo automático      |
| Impressão      | Pode permanecer como recurso auxiliar do protótipo                         |
| Prefácio       | Convite pastoral, sem CTA comercial                                        |
| Acessibilidade | Rótulos explícitos, foco visível, teclado e anúncio de retornos relevantes |
| Dependências   | Sem framework, back-end, analytics ou serviço externo                      |

## Critérios de aceite editorial

A futura TASK-P0-07 somente poderá ser considerada aderente a esta decisão se:

1. a página continuar reconhecível como documento de trabalho submetido à
   apreciação pastoral;
2. checkboxes e observações servirem ao registro da conversa, e não à coleta de
   leads ou dados;
3. o resumo reproduzir somente dados fornecidos ou marcados na sessão;
4. cópia e `mailto:` forem ações locais, explícitas e reversíveis;
5. a experiência permanecer útil caso as APIs de cópia ou o cliente de e-mail
   não estejam disponíveis;
6. o convite ao prefácio conservar integralmente seu caráter não comercial;
7. não houver persistência ou transmissão silenciosa de informações.

## Gate de autorização

A **TASK-P0-07 permanece bloqueada por autorização humana explícita**. O registro
desta decisão não equivale à autorização de implementação. Até que essa
autorização seja fornecida, não devem ser modificados HTML, CSS, JavaScript ou
testes para introduzir os recursos descritos acima.

## Resultado da TASK-P0-06

- **Decisão editorial:** registrada.
- **Alteração funcional:** não realizada.
- **TASK-P0-07:** aguardando autorização explícita.
