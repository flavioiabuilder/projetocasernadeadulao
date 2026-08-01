# Acessibilidade — Átrio

A referência foi o principal **insumo negativo** deste estudo: o que a
auditoria encontrou de errado ali define boa parte do que o sistema faz
certo.

---

## 1. Placar

| Medida                          | Referência    | Átrio     |
| ------------------------------- | ------------- | --------- |
| Lighthouse — Acessibilidade     | 93            | **100**   |
| Lighthouse — Boas práticas      | 100           | **100**   |
| Lighthouse — Agentic Browsing   | 0             | **100**   |
| Violações axe sérias/críticas   | não medido¹   | **0**     |
| Regras `:focus-visible`         | **0** de 1685 | presentes |
| Regras `prefers-reduced-motion` | **0**         | presentes |
| Regras `forced-colors`          | **0**         | presentes |
| Regras `prefers-contrast`       | **0**         | presentes |
| Link de salto                   | ausente       | presente  |
| Alvos < 44px em 390×844         | **25 de 35**  | **0**     |

¹ axe não foi executado na referência: rodar uma bateria de acessibilidade
contra site de terceiro sob consentimento recusado produz resultado
distorcido. As 16 falhas listadas em §2 vêm de inspeção direta da árvore
acessível e do CSS.

A nota 93 da referência ilustra o limite da auditoria automática: os
problemas mais graves — foco que não entra no menu, nome acessível
soletrado, gatilho inalcançável por teclado — não são detectáveis por
varredura estática.

---

## 2. Defeitos da referência e correções

| #   | Defeito                                                                 | Correção no Átrio                                                                        |
| --- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 1   | Fatiamento por letra destrói o nome acessível (`"T h i s i s H o m e"`) | fatiamento por **palavra**; texto íntegro em nó oculto; spans animados são `aria-hidden` |
| 2   | Menu inalcançável por teclado (`focusableInNav: 0`)                     | gatilho é `<button>` com `aria-expanded` e `aria-controls`                               |
| 3   | Foco não entra no overlay                                               | `prenderFoco()` move o foco no primeiro quadro após a exibição                           |
| 4   | Fundo permanece focável                                                 | `inert` nos blocos `data-inertizavel`, com fallback `aria-hidden`                        |
| 5   | Overlays sem papel                                                      | `role="dialog"` + `aria-modal="true"`                                                    |
| 6   | Foco não retorna                                                        | devolvido ao gatilho no `destruir()` da armadilha                                        |
| 7   | Zero `:focus-visible`                                                   | anel de 3px, deslocamento 3px, invertido sobre superfície escura                         |
| 8   | Zero `prefers-reduced-motion`                                           | substituição por token + regras estruturais                                              |
| 9   | Zero `forced-colors`                                                    | bordas em `currentcolor`, foco em `CanvasText`                                           |
| 10  | Zero `prefers-contrast`                                                 | `texto-tenue` colapsa em `tinta`; filetes viram sólidos                                  |
| 11  | Campos sem rótulo                                                       | `<label for>` visível em todos                                                           |
| 12  | Feedback sem `aria-live`                                                | região viva compartilhada, `polite` e `assertive`                                        |
| 13  | Setas do carrossel são `<div>`                                          | `<button>` com nome acessível e `disabled` nos extremos                                  |
| 14  | 25 de 35 alvos < 44px                                                   | `min-height: 44px` em todo controle não inline                                           |
| 15  | Sem link de salto                                                       | `.at-pular`, primeiro elemento tabulável                                                 |
| 16  | Rodapé sem landmark                                                     | `<footer>` real                                                                          |

---

## 3. Estrutura semântica

| Elemento                        | Uso                                 |
| ------------------------------- | ----------------------------------- |
| `<header class="at-cabecalho">` | banner global                       |
| `<nav>`                         | dentro do menu, com `aria-label`    |
| `<main id="conteudo">`          | alvo do link de salto               |
| `<footer>`                      | contentinfo                         |
| `<section aria-labelledby>`     | cada bloco editorial                |
| `<article>`                     | cartões                             |
| `<ul>` / `<li>`                 | horários, links, pista do carrossel |
| `<button type="button">`        | toda ação sem destino               |
| `<a href>`                      | todo destino                        |

Uma só `<h1>` por página. A hierarquia de títulos não pula níveis.

Blocos sem título visível recebem título oculto — por exemplo, a barra de
serviços tem `<h2 class="at-visualmente-oculto">Horários e avisos</h2>`, para
que apareça no sumário de regiões do leitor de tela.

> **Cuidado com papéis ARIA em elementos semânticos.** `role="group"` numa
> `<ul>` remove o papel de lista e deixa os `<li>` órfãos. A semântica de
> carrossel foi movida para o contêiner. Erro cometido e corrigido durante a
> implementação — detectado pelo teste axe, não por inspeção.

---

## 4. Teclado

| Contexto           | Comportamento                                                                      |
| ------------------ | ---------------------------------------------------------------------------------- |
| Ordem de tabulação | segue a ordem do documento                                                         |
| Link de salto      | primeiro `Tab` da página                                                           |
| Menu               | `Enter`/`Espaço` abre, `Escape` fecha, `Tab` circula dentro, foco volta ao gatilho |
| Painel             | idem, mais clique fora                                                             |
| Acordeão           | `aria-expanded` espelhado; abrir move o foco ao primeiro item da região            |
| Carrossel          | pista focável; `ArrowLeft`/`ArrowRight`                                            |
| Formulário         | envio leva o foco ao primeiro campo inválido                                       |

Verificado por teste e2e: o foco entra, o fundo fica inerte, `Escape` fecha e
o foco volta ao gatilho.

---

## 5. Contraste

| Par                                 | Razão  | Exigência         |
| ----------------------------------- | ------ | ----------------- |
| `texto` sobre `papel`               | 16.6:1 | AAA               |
| `texto` sobre `areia`               | 13.9:1 | AAA               |
| `texto-tenue` sobre `papel`         | 8.9:1  | AAA               |
| `texto-inverso` sobre `tinta`       | 15.9:1 | AAA               |
| `texto-sobre-acento` sobre `acento` | 7.4:1  | AAA               |
| `pedra` sobre `papel`               | 3.4:1  | **só decorativo** |

`--at-cor-pedra` é reservado a placeholder e gradiente de mídia, nunca a
texto de leitura.

Um caso real de vazamento foi detectado no laboratório: um seletor
`.lab h3` atingia títulos dentro dos espécimes e repintava o cartão de
acento, derrubando o contraste para 3.81:1. Corrigido escopando para filho
direto. É o mesmo tipo de erro que a regra “cor por herança, nunca por
descendência” previne no design system.

---

## 6. Movimento

Sob `prefers-reduced-motion: reduce`:

| Elemento                   | Comportamento                                       |
| -------------------------- | --------------------------------------------------- |
| Revelação de texto e bloco | estado final imediato                               |
| Mídia                      | sem escala                                          |
| Paralaxe                   | desligada                                           |
| Marquee                    | animação removida; contêiner vira rolável por gesto |
| Palco de letras            | estado final; **o laço rAF nunca é instalado**      |
| Menu e painel              | trocam de estado sem transição                      |
| Transição de página        | ignorada; a navegação é imediata                    |
| Hover de cartão            | sem elevação                                        |
| Rolagem do carrossel       | `auto` em vez de `smooth`                           |

A substituição é feita **pelos tokens**: os nomes semânticos não mudam, só os
valores. Um teste unitário reprova qualquer token de duração ou distância que
não tenha substituição declarada.

---

## 7. Degradação

| Cenário              | Resultado                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Sem JavaScript**   | todo o conteúdo visível; navegação pelo rodapé; o gatilho do menu **some** em vez de ficar morto; formulário não submete (não há `action`) |
| Sem imagens          | placeholders são gradientes CSS; nenhum `alt` essencial perdido                                                                            |
| Sem animação         | ver §6                                                                                                                                     |
| Cookies bloqueados   | irrelevante — não há cookie                                                                                                                |
| Terceiros bloqueados | irrelevante — não há terceiro                                                                                                              |
| Carregamento parcial | cada folha de estilo é independente; a página degrada em camadas                                                                           |
| Zoom 200%            | sem rolagem horizontal (verificado em 6 viewports)                                                                                         |

O caso “sem JavaScript” é o mais importante, porque **a referência falha
nele hoje**: seu script de animação está hospedado no CodeSandbox e é
bloqueado por ORB em produção. Aqui, a classe `at-js` só é adicionada pelo
runtime; enquanto não existe, nada esconde nada.

---

## 8. Experiência comunitária

Avaliação de uso, sem entrar em conteúdo doutrinário.

| Necessidade                          | Como o sistema responde                                    |
| ------------------------------------ | ---------------------------------------------------------- |
| Saber o horário                      | barra persistente, em todas as páginas                     |
| Planejar a visita                    | cartão “o que esperar” logo no hero                        |
| Pedir ajuda                          | painel de contato a um clique, em qualquer página          |
| Descobrir acessibilidade física      | previsto como campo do modelo de conteúdo                  |
| Encontrar grupos e eventos           | grade de caminhos + agenda                                 |
| Reduzir ansiedade de primeira visita | horário e contato sempre visíveis; linguagem sem jargão    |
| Distinguir informação de ação        | informação em corpo; ação sempre em pílula                 |
| Evitar envio acidental               | consentimento explícito e resultado descritivo             |
| Legibilidade em várias idades        | corpo nunca abaixo de 1em; entrelinha 1.52; medida de 62ch |

---

## 9. Limitações declaradas

- **Nenhum leitor de tela real foi executado.** As conclusões vêm da árvore
  acessível, do axe e de inspeção manual. Um teste com NVDA ou VoiceOver
  poderia revelar problemas de ordem de anúncio que nenhuma dessas
  ferramentas mostra.
- **`forced-colors` não foi testado em execução**, apenas implementado. O
  laboratório expõe o estado da consulta para inspeção manual em ambiente
  que a suporte.
- **Zoom de texto isolado** (sem zoom de página) não foi verificado.
- A avaliação de contraste usou cálculo próprio sobre os tokens e o axe sobre
  as páginas; não houve verificação de contraste sobre fotografia, porque a
  demonstração não usa fotografia.
