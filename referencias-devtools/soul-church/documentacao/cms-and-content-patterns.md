# Padrões de CMS e conteúdo — Átrio

O que a investigação revelou sobre como o conteúdo é modelado, e o que disso
vale a pena preservar num sistema independente.

---

## 1. Evidência de CMS na referência

| Achado                             | Evidência                                                     |
| ---------------------------------- | ------------------------------------------------------------- |
| 9 coleções na homepage             | `.w-dyn-list`                                                 |
| 22 itens renderizados              | `.w-dyn-item`                                                 |
| 2 coleções **vazias**              | `.w-dyn-empty`                                                |
| Marquees alimentados por coleção   | `.navbar-marquee-collection-list`, `.maruqee-collection-list` |
| Carrosséis alimentados por coleção | `.splide__track.w-dyn-list`                                   |
| Rótulo de transição por página     | texto do destino gravado no HTML de cada página               |

---

## 2. O padrão mais valioso: **o estado vazio colapsa**

`aside.banner` tem altura **0** porque a coleção que o alimenta está vazia.
Não há espaço reservado, não há placeholder, não há “nenhum aviso no
momento”.

Isso é uma decisão de modelagem, não um acaso: o banner de aviso institucional
existe no template o tempo todo, e simplesmente não ocupa lugar quando não há
o que dizer.

> **Regra derivada:** todo bloco alimentado por coleção precisa ter um estado
> vazio que **não deixa rastro**. Um espaço reservado vazio é pior que a
> ausência do bloco, porque comunica que algo falhou.

Na demonstração isso aparece na estrutura: os contêineres
(`data-demo-agenda`, `data-demo-valores`, `data-demo-avisos`) são elementos
vazios no HTML, preenchidos por dados. Sem dados, não ocupam altura.

---

## 3. Modelos de conteúdo identificados

### Evento

| Campo      | Papel                                | Obrigatório |
| ---------- | ------------------------------------ | ----------- |
| `quando`   | data/hora legível — **vem primeiro** | sim         |
| `titulo`   | nome do evento                       | sim         |
| `resumo`   | 1–3 frases                           | não         |
| `acao`     | rótulo do CTA                        | não         |
| `destaque` | marca o cartão de acento             | não         |

O `quando` antes do `titulo` é o que faz a grade ler como agenda: numa
listagem, a data é o critério de varredura.

`destaque` é **exclusivo por grade** — ver §5.

### Caminho (ação/serviço)

| Campo    | Papel                       |
| -------- | --------------------------- |
| `titulo` | nome curto                  |
| `resumo` | o que a pessoa encontra ali |
| `acao`   | rótulo do CTA               |

### Horário

| Campo    | Papel                 |
| -------- | --------------------- |
| `quando` | dia e hora, em cartaz |
| `oque`   | tipo de encontro      |

### Aviso (marquee)

Uma linha de texto. Nada mais. O formato impõe a brevidade.

### Valor (marquee de cartaz)

Uma expressão de 2–4 palavras. Cinco por ciclo.

---

## 4. Separação entre conteúdo e motor

O conteúdo demonstrativo vive inteiramente em
[`../design-system/js/demo.js`](../design-system/js/demo.js), num objeto
`CONTEUDO`. Nenhuma primitiva de `motion.js`, `navigation.js` ou `forms.js`
conhece esses dados.

Trocar `demo.js` troca a página inteira sem tocar no sistema. É esse o
critério de que a separação é real.

> **Ordem obrigatória:** `Atrio.demo.montar(document)` roda **antes** de
> `Atrio.iniciar(document)`. As primitivas observam cada elemento uma única
> vez; o que não existir naquele instante nunca será revelado. Esse foi um
> bug real durante a implementação — os cartões ficavam permanentemente
> invisíveis porque eram criados depois do observer.

---

## 5. Regras de conteúdo que o sistema impõe

| Regra                                  | Motivo                                                        |
| -------------------------------------- | ------------------------------------------------------------- |
| **Um cartão de destaque por grade**    | dois acentos anulam a hierarquia                              |
| Rótulo de ação sempre descritivo       | a referência tem três “LEARN MORE” indistinguíveis            |
| `aria-label` completo no CTA de cartão | “Ver programação” sozinho não diz de quê                      |
| Aviso de marquee cabe em uma linha     | o formato não comporta mais                                   |
| Horário nunca só no corpo do texto     | precisa existir como dado, para aparecer na barra persistente |

O `aria-label` composto (`"Participar — Mutirão da horta comunitária"`) é
gerado a partir dos próprios campos, não escrito à mão. Isso garante que a
regra não dependa de disciplina editorial.

---

## 6. Integrações — mapeadas, não reproduzidas

A referência delega funções inteiras a plataformas externas:

| Função                      | Plataforma                                      |
| --------------------------- | ----------------------------------------------- |
| Inscrição em grupos e times | Planning Center (Church Center)                 |
| Gestão de pessoas           | ChurchSuite                                     |
| Doações                     | Trustbridge Global                              |
| Newsletter                  | Flodesk (link externo, não formulário embutido) |
| Galeria de fotos            | Pixieset                                        |
| Vídeo                       | YouTube                                         |
| Mapa                        | Google Maps                                     |
| Consentimento               | Cookiebot                                       |
| Analytics                   | GA4 via proxy de primeira parte                 |

**Padrão observável:** o site não tenta ser a plataforma. Ele é a camada
editorial que apresenta e encaminha. A newsletter, por exemplo, é um link —
não um formulário — o que evita gerir dados que já são geridos em outro
lugar.

Esse padrão é reutilizável e vale registrar. Mas **nenhuma integração é
reproduzida** na demonstração: não há endpoint, identificador, cookie,
rastreador ou requisição externa de espécie alguma. Ver
[`asset-and-license-boundaries.md`](asset-and-license-boundaries.md).

---

## 7. Templates

| Template               | Quando usar                           | Casca                                              |
| ---------------------- | ------------------------------------- | -------------------------------------------------- |
| **Editorial com hero** | páginas institucionais e de conversão | hero + barra + lajes + rodapé                      |
| **Listagem**           | agenda, diretórios                    | sem hero, sem barra; laje única em tom mais quente |

A escolha não é estética: numa página de varredura o hero atrasa o conteúdo
e a barra persistente compete com os cartões.

---

## 8. Como o sistema seria ligado a um CMS real

Não foi implementado — a demonstração é estática por decisão. Mas a forma
está preparada:

1. Os modelos de §3 correspondem a coleções.
2. As fábricas de marcação em `demo.js` são funções puras de dado → elemento.
3. Substituir a fonte de dados significa trocar o objeto `CONTEUDO`; nada
   mais muda.
4. Estados vazios já colapsam, porque os contêineres são vazios no HTML.

O que **faltaria** decidir num uso real: paginação, ordenação por data,
filtro por categoria e cache. Nenhum desses padrões foi observado na
referência (a listagem de eventos não tem filtros), então não há evidência a
reconstruir.
