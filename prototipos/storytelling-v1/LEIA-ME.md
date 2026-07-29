# Protótipo — Storytelling v1 (apreciação pastoral)

Deck autoexplicativo em 10 atos, derivado de [`docs/storytelling/`](../../docs/storytelling/).

## Como abrir

Duplo clique em `index.html` (offline; fontes e emblema embutidos). Sem CDN.

## Escopo

| É | Não é |
|---|---|
| Variante pastoral do plano de slides (voz “o senhor”) | Prospecto multiarquivo da raiz |
| Documento de trabalho para validação | Homologação publicada em `apresentacao/` |
| Isolado até auditoria + revisão humana | Canônico para Pages |

## Regras C.3 (não violar)

1. Emblema sem explicação antes de S52.
2. Frase-âncora exatamente 3×: S04, S31, S69.
3. Slides silenciosos S12, S19, S29, S67 sem gráfico extra.
4. Ilustração da caverna 3× (S02, S26, S68), mesma escala/posição.
5. Nenhum slide cita outro por número.
6. Sem métricas de alcance como argumento de valor.

## Fidelidade

Ver [`docs/storytelling/auditoria-fidelidade-v1.md`](../../docs/storytelling/auditoria-fidelidade-v1.md). Claims institucionais sem fonte canônica no repo estão marcados como estudo/pendente no deck.

## O que já foi aplicado neste protótipo

- Voz pastoral (“o senhor”) no endereçamento ao leitor
- Selo de estudo em claims institucionais sem fonte canônica no repo (Casa de Oração; P1–P9)
- Frase-âncora restaurada em S31 (regra C.3)
- Telas pastorais após S63: pedidos, prefácio, “se a resposta for não”
- `noindex`, skip link, `:focus-visible`, impressão com acordeões/matriz abertos, scroll sem smooth sob `prefers-reduced-motion`

## Revisão humana (próximo passo)

1. Abrir `index.html` e percorrer os 10 atos + bloco pastoral.
2. Confirmar ou retirar claims marcados como estudo (auditoria em `docs/storytelling/auditoria-fidelidade-v1.md`).
3. Teste C.4: entregar o arquivo a alguém de fora e pedir — *o que é isto, por que existe, o que se espera de quem lê?*
4. Só então decidir promoção (irmão, substituto da homologação, ou gerar via tooling).

## Promoção

Não altera `index.html` da raiz nem `apresentacao/homologacao-pastoral.html` sem pedido explícito.
