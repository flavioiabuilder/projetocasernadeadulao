# Formulários e padrões de conversão — Átrio

---

## 1. O padrão de conversão da referência

Não há um formulário de contato numa página “Contato”. Há um **painel
sempre alcançável**, aberto por um ícone circular na barra persistente, com
cinco assuntos:

> New to Faith · Premier Lifeline · Prayer · Praise · General Enquiry

Cada assunto tem seu próprio formulário, todos com a mesma estrutura: nome,
e-mail, mensagem e consentimento.

**Por que isso importa.** A pessoa que precisa falar não precisa descobrir
onde. O caminho está na mesma barra que mostra o horário, em todas as
páginas, o tempo todo. Para quem chega ansioso — e a categoria “Prayer” diz
que é disso que se trata — isso remove a única barreira que importa.

O padrão é reutilizável em qualquer contexto comunitário: **um caminho de
conversa, persistente, com assunto declarado antes do formulário**.

---

## 2. O que a referência erra

Medido no runtime das páginas `/` e `/plan-your-visit`:

| #   | Defeito                        | Evidência                                                                            |
| --- | ------------------------------ | ------------------------------------------------------------------------------------ |
| 1   | **3 de 5 campos sem rótulo**   | nem `<label>`, nem `aria-label` — só placeholder                                     |
| 2   | **Feedback sem `aria-live`**   | `.w-form-done` / `.w-form-fail` têm `role="region"` e `aria-label`, mas nada anuncia |
| 3   | **`method="get"`**             | os dados vão para a query string                                                     |
| 4   | **Gatilho é `<div>`**          | o ícone que abre o painel não é botão                                                |
| 5   | **Foco não entra no painel**   | `activeElement` continua em `BODY`                                                   |
| 6   | **Sem `role="dialog"`**        | o painel é um `div`                                                                  |
| 7   | **Erro não é ligado ao campo** | sem `aria-describedby`, sem `aria-invalid`                                           |

O item 1 é o mais grave: placeholder desaparece ao digitar. Quem for
interrompido no meio do preenchimento perde a referência do que estava
respondendo — e quem usa leitor de tela nunca a teve.

---

## 3. O que o Átrio faz

### Estrutura

```html
<form data-form-local id="form-escuta" novalidate>
  <div class="at-demo-campo">
    <label for="escuta-nome">Como podemos chamar você</label>
    <input
      id="escuta-nome"
      name="nome"
      type="text"
      required
      minlength="2"
      autocomplete="name"
    />
    <span class="at-erro-campo" id="form-escuta-erro-nome" hidden></span>
  </div>
  …
</form>
```

| Aspecto       | Implementação                                                     |
| ------------- | ----------------------------------------------------------------- |
| Rótulo        | `<label for>` visível, sempre                                     |
| Autocompletar | `autocomplete` nos campos de identidade                           |
| Erro          | `aria-invalid="true"` + `aria-describedby` apontando o nó de erro |
| Foco no erro  | vai para o **primeiro** campo inválido                            |
| Resumo        | “N campos precisam de atenção”, anunciado assertivamente          |
| Correção      | o erro do campo some assim que ele fica válido, sem novo envio    |
| Consentimento | obrigatório, com rótulo em **frase**, não em caixa-alta           |
| `novalidate`  | a validação nativa é substituída para controlar as mensagens      |

O rótulo do consentimento abandona a caixa-alta do resto dos labels de
propósito: é uma frase para ler, não uma etiqueta para identificar.

### Validação

A regra é **pura** — recebe e devolve dados, não toca no DOM:

```js
validar(valores, regras) → { valido, erros }
```

Testável sem navegador, reutilizável fora do componente, coberta por 10
testes unitários em [`../testes/nucleo.test.js`](../testes/nucleo.test.js),
incluindo a verificação de que não altera a entrada.

As regras são lidas dos **próprios atributos do campo** (`required`,
`type`, `minlength`, e o texto do `<label>` associado). Não há esquema
duplicado: o HTML é a fonte.

---

## 4. Nada sai do navegador

Esta é a regra absoluta de
[`../design-system/js/forms.js`](../design-system/js/forms.js).

| Garantia                                     | Como é assegurada                                               |
| -------------------------------------------- | --------------------------------------------------------------- |
| `preventDefault` incondicional               | primeira instrução de `aoEnviar`, antes de qualquer outra coisa |
| Sem `action` / `method`                      | teste estático reprova qualquer `<form>` com esses atributos    |
| Sem `fetch`, XHR, `sendBeacon`, WebSocket    | teste estático varre todo o runtime                             |
| Sem cookie, `localStorage`, `sessionStorage` | idem                                                            |
| Sem host externo                             | teste e2e observa **todas** as requisições e exige lista vazia  |
| Sem query string após envio                  | teste e2e verifica `new URL(page.url()).search === ""`          |
| Estado de sucesso rotulado                   | “Demonstração: nenhum dado foi enviado.”                        |

O teste que verifica o `preventDefault` não confere apenas que ele existe:
remove comentários e exige que **nenhuma linha executável** o preceda.

---

## 5. Hierarquia de ações

| Nível       | Componente                   | Quantidade por seção     |
| ----------- | ---------------------------- | ------------------------ |
| Primária    | `.at-botao--primario`        | no máximo 1              |
| Secundária  | `.at-botao--secundario`      | quantas o conteúdo pedir |
| Discreta    | `.at-botao--fantasma`        | contexto escuro ou denso |
| Persistente | `.at-botao-circulo` na barra | 1, global                |
| Textual     | `.at-link`                   | dentro de texto corrido  |

**Um formato só — pílula.** O que distingue as ações é a superfície. Isso
mantém a página calma mesmo com muitos CTAs, que é a situação normal de um
site comunitário.

---

## 6. Prevenção de envio acidental

| Risco                       | Mitigação                                                                              |
| --------------------------- | -------------------------------------------------------------------------------------- |
| Enviar sem querer           | o botão de envio é `type="submit"` explícito; nenhum outro botão do formulário submete |
| Perder o preenchimento      | erros não limpam os campos                                                             |
| Não saber o que foi enviado | o sucesso descreve o que aconteceu, não só “obrigado”                                  |
| Consentir sem ler           | o rótulo é frase completa e o aviso de escopo vem **antes** do botão                   |
| Não saber se foi            | o resultado é anunciado por região viva, além de visível                               |

---

## 7. Linguagem de feedback

| Situação                | Texto                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| Campo obrigatório vazio | “Nome é obrigatório.”                                                                      |
| Consentimento recusado  | “É preciso aceitar para continuar.”                                                        |
| E-mail malformado       | “Informe um e-mail válido.”                                                                |
| Curto demais            | “Mensagem precisa de pelo menos 10 caracteres.”                                            |
| Resumo                  | “2 campos precisam de atenção.”                                                            |
| Sucesso                 | “Demonstração: nenhum dado foi enviado. Este formulário funciona apenas no seu navegador.” |

O consentimento tem mensagem própria porque “Aceite é obrigatório” não diz o
que fazer. O resumo conta campos em vez de listar erros: quem usa leitor de
tela recebe a dimensão do problema e o foco já está no primeiro item.

Nenhuma mensagem culpa quem preencheu.

---

## 8. Newsletter

Na referência, “SIGN UP” é um **link externo** para Flodesk, não um
formulário embutido. É uma decisão defensável: evita gerir dados que já são
geridos em outro lugar.

Na demonstração o botão de newsletter reaproveita o painel de contato — um
só caminho de conversa em toda a página. Nenhum endereço externo é usado.
