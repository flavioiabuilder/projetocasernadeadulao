# Protótipo — Storytelling v1 (apresentação institucional)

Deck autoexplicativo em 10 atos, derivado de [`docs/storytelling/`](../../docs/storytelling/).

## Como abrir

Duplo clique em `index.html` (offline; fontes e emblema embutidos). Sem CDN.

## Escopo

| É                                                           | Não é                                    |
| ----------------------------------------------------------- | ---------------------------------------- |
| Apresentação institucional imersiva (voz “você” de leitura) | Carta endereçada ao pastor (“o senhor”)  |
| Documento de trabalho para validação                        | Homologação publicada em `apresentacao/` |
| Público amplo: pastor, secretaria, obreiros, liderança      | Prospecto multiarquivo da raiz           |

## Voz

- Corpo: segunda pessoa de leitura (**você**), sem hierarquia.
- Homologação / prefácio / “se a resposta for não”: **liderança pastoral** em terceira pessoa — quem lê não é tratado como o pastor.
- Manter “vocês” só em citações bíblicas; “você” nos exemplos da Ordem do Dia é discurso ao discípulo.

## Regras C.3 (não violar)

1. Emblema sem explicação antes de S52.
2. Frase-âncora exatamente 3×: S04, S31, S69.
3. Slides silenciosos S12, S19, S29, S67 sem gráfico extra.
4. Ilustração da caverna 3× (S02, S26, S68), mesma escala/posição.
5. Nenhum slide cita outro por número.
6. Sem métricas de alcance como argumento de valor.

## Fidelidade

Ver [`docs/storytelling/auditoria-fidelidade-v1.md`](../../docs/storytelling/auditoria-fidelidade-v1.md) e [`docs/storytelling/auditoria-visual-v1.md`](../../docs/storytelling/auditoria-visual-v1.md). Claims institucionais sem fonte canônica no repo estão marcados como estudo/pendente no deck.

## O que já foi aplicado neste protótipo

- Voz institucional (“você” de leitura; fechamento sem vocativo ao pastor-leitor)
- Selo de estudo em claims institucionais sem fonte canônica no repo (Casa de Oração; P1–P9)
- Frase-âncora restaurada em S31 (regra C.3)
- Telas após S63: homologação, prefácio, “se a resposta for não” (3ª pessoa institucional)
- `noindex`, skip link, `:focus-visible`, impressão com acordeões/matriz abertos, scroll sem smooth sob `prefers-reduced-motion`

## Revisão humana (próximo passo)

1. Abrir `index.html` e percorrer os 10 atos + bloco de homologação.
2. Confirmar ou retirar claims marcados como estudo (auditoria em `docs/storytelling/auditoria-fidelidade-v1.md`).
3. Teste C.4: entregar o arquivo a alguém de fora e pedir — _o que é isto, por que existe, o que se espera de quem lê?_
4. Só então decidir promoção (irmão, substituto da homologação, ou gerar via tooling).

## Promoção

Não altera o prospecto (`prototipos/prospecto-v1/`) nem a homologação
(`prototipos/homologacao-pastoral-v1/`) sem pedido explícito.

## Tooling

```bash
# Pipeline completa (fidelidade + a11y + voz institucional)
node ferramentas/aplicar-storytelling-institucional.js

# Só ajustar voz num deck já patchado
node ferramentas/aplicar-storytelling-voz-institucional.js
```

`aplicar-storytelling-pastoral.js` é alias depreciado (encaminha para a pipeline institucional).
