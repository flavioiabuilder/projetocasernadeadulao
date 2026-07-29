# Plano de Slides — Apresentação Institucional Autoexplicativa
## Discipulando a Caserna · Projeto Caserna de Adulão

**Natureza:** apresentação de leitura autônoma. Não depende de apresentador. Todo o conteúdo necessário está em tela.
**Extensão:** 69 slides · 10 atos · tempo estimado de leitura: 28 a 35 minutos
**Tratamento:** o texto conversa com o leitor em segunda pessoa ("você") — voz de leitura imersiva, sem hierarquia. Esta é uma **apresentação institucional**: o leitor pode ser pastor, secretaria, obreiro ou outra liderança. Não endereçar o leitor como "o senhor" nem com vocativo "Pastor,". Pedidos de homologação e prefácio falam da **liderança pastoral** em terceira pessoa, sem tratar quem lê como essa pessoa.
**Base:** Plano Narrativo Mestre v1.0 · Guia Mestre v1.0-RC

---

# PARTE A — SISTEMA DE DESIGN

*Definido uma vez. Cada slide referencia este sistema em vez de repeti-lo.*

## A.1 Tela e grade

A apresentação é uma sequência vertical de seções de altura total, com ancoragem por rolagem (*scroll-snap*). Cada slide ocupa exatamente uma tela.

**Grade:** 12 colunas. Margem lateral de 8% da largura em telas grandes, 6% em telas médias, 5% no celular. Margem superior de 12% (abaixo da barra fixa) e inferior de 10%.

**Área útil:** todo conteúdo vive dentro dessa moldura. Nada encosta na borda, exceto os elementos de página inteira explicitamente marcados como *full-bleed*.

**Celular:** a grade de 12 colunas colapsa para coluna única. Layouts de duas colunas empilham — sempre a coluna da esquerda primeiro. Tabelas viram listas de cartões.

## A.2 Paleta

| Nome | Código | Uso |
|---|---|---|
| Base | `#F4F4F1` | fundo padrão de quase todos os slides |
| Chumbo | `#2B2B2B` | texto corrido e títulos |
| Estrutura | `#4A4A4A` | filetes, legendas, rótulos secundários |
| Latão | `#8C6A46` | insígnias, destaques doutrinários, filete das notas do autor |
| Caserna | `#1A2A44` | fundo dos slides de imersão, faixas de módulo |
| Sombra | `#111418` | fundo dos três slides de caverna (abertura e fechamento) |

**Regra de inversão:** quando o fundo é Caserna ou Sombra, o texto passa a `#F4F4F1` e o latão permanece latão — é a única cor que atravessa os dois regimes.

## A.3 Tipografia

Duas famílias, no máximo. Serifa para narrativa e Escritura; sem serifa condensada, em caixa alta, apenas para rótulos militares e nomes de marcha.

| Estilo | Tamanho (desktop / celular) | Uso |
|---|---|---|
| **D1 — Display** | 76 / 40 px, serifa, peso médio | frases isoladas de slide silencioso |
| **D2 — Título de slide** | 46 / 28 px, serifa | título de quase todo slide |
| **H1 — Subtítulo** | 28 / 20 px, serifa | divisões internas |
| **Corpo** | 20 / 17 px, serifa, entrelinha 1,6 | narrativa — o estilo mais usado da apresentação |
| **Rótulo** | 13 / 11 px, sem serifa condensada, caixa alta, espaçamento +0,12em | nomes de peça, marcha, estado de aprovação |
| **Legenda** | 15 / 13 px, sem serifa, cor Estrutura | notas de rodapé de slide, fontes, referências |
| **Escritura** | 24 / 19 px, serifa, itálico | citações bíblicas, sempre com referência ao lado |

**Medida de linha:** o texto corrido nunca ultrapassa 66 caracteres por linha. Em telas largas isso significa que o texto ocupa 6 ou 7 colunas, nunca 12.

## A.4 Elementos fixos

**Barra da armadura (topo, altura 44px, fixa).**
Quatro ícones vazados em contorno de 1,5px, alinhados à direita: cinto, couraça, coturno, escudo. Preenchem-se em latão conforme o avanço — cinto no S41, couraça no S45, coturno no S46, escudo no S47, e o conjunto completo no S66. À esquerda da barra, em Rótulo: `ATO IV DE X · ~14 MIN RESTANTES`. Clicável: abre o índice dos dez atos.

**Rodapé (altura 28px, fixo, cor Estrutura, opacidade 60%).**
`Discipulando a Caserna · Projeto Caserna de Adulão · v1.0`

**Navegação.** Setas anterior/próxima nas laterais em desktop; no celular, dois botões discretos no rodapé. A rolagem funciona, mas nunca é o único caminho.

**Retomada.** A última posição é gravada localmente. Ao reabrir, um aviso discreto no topo oferece retomar de onde parou.

## A.5 Arquétipos de layout

Cada slide declara um destes. Onde houver desvio, ele vem descrito.

- **L1 — Silêncio.** Um único bloco de texto centralizado vertical e horizontalmente, ocupando no máximo 6 colunas. Nada mais na tela. Usado quando a frase precisa carregar sozinha.
- **L2 — Declaração.** Título em D2 alinhado à esquerda, ocupando colunas 1–8. Corpo abaixo, colunas 1–7. Metade direita vazia de propósito.
- **L3 — Espelho.** Duas colunas de igual largura (1–5 e 8–12), separadas por filete vertical de 1px em Estrutura. Usada em oposições: o que dá / o que cobra, o que é / o que não é.
- **L4 — Texto e diagrama.** Texto nas colunas 1–6, elemento gráfico nas colunas 7–12, alinhados pelo topo.
- **L5 — Grade de cartões.** Título no topo (colunas 1–8), abaixo uma grade de 2×2 ou 1×4 cartões com borda de 1px em Estrutura, canto reto, respiro interno de 28px.
- **L6 — Matriz.** Título e linha de enquadramento no topo; abaixo, tabela ou lista ocupando as 12 colunas, com rolagem interna e altura fixa.
- **L7 — Ficha de módulo.** Faixa horizontal superior na cor do módulo, com rótulo. Insígnia grande à esquerda (colunas 1–3), conteúdo à direita (colunas 4–12).
- **L8 — Cena.** Fundo Sombra ou Caserna ocupando a tela inteira; bloco de texto sobreposto, alinhado à esquerda, colunas 1–6.
- **L9 — Nota do autor.** Bloco recuado em duas colunas, filete vertical de 3px em latão à esquerda, corpo um ponto menor, rótulo `NOTA DO AUTOR` acima.

## A.6 Movimento

Discreto e uniforme. Ao entrar na viewport, o conteúdo sobe 16px e ganha opacidade em 400ms, com atraso de 80ms entre elementos irmãos. Nenhum efeito de paralaxe, nenhuma transição em 3D, nenhum elemento que gire ou pulse. Quem tiver "reduzir movimento" ativado no sistema recebe tudo estático.

## A.7 Regras de redação

1. Frases completas. Nada de fragmentos soltos que dependam de alguém para completá-los.
2. O texto fala com o leitor. Perguntas dirigidas são permitidas e desejáveis.
3. Nenhum slide se refere a outro por número. Se algo precisa ser lembrado, é reescrito.
4. Nenhuma instrução de comportamento ao leitor além de interação de interface ("toque para abrir").
5. Quando algo não está pronto, o slide diz que não está.

---

# PARTE B — OS SLIDES

---

## ATO I — A CAVERNA
*Abertura fria. Nada é explicado. Fundo Sombra nos quatro primeiros slides.*

---

### S01 · O emblema
**Ato I · Layout L1 · Fundo Sombra**

**Narrativa**

*(Nenhum texto. Nenhum título. Nenhuma legenda.)*

**Visual**
O emblema do projeto — o escudo com as insígnias cravadas, encimado pelo capacete e atravessado pela espada — centralizado, em versão monocromática latão sobre fundo quase preto. Ocupa cerca de 30% da altura da tela. Ao redor, nada.

**Layout**
Emblema centralizado nos dois eixos. Barra da armadura oculta neste slide. Rodapé oculto. Uma seta fina de rolagem no rodapé, opacidade 40%, que só aparece após 4 segundos.

**Comportamento**
O emblema surge em 1,2s de opacidade. Fica sozinho por 4 segundos antes que qualquer indicação de continuidade apareça. **Este slide não explica o emblema, e nenhum slide o explicará até o Ato VIII.** É a primeira arma de Tchékhov da apresentação: quem chega ao fim descobre que viu a tese inteira antes de ler a primeira palavra.

---

### S02 · A caverna
**Ato I · Layout L8 · Fundo Sombra**

**Narrativa**

> Há três mil anos, um homem chamado Davi fugia do rei que queria matá-lo.
>
> Ele já tinha sido ungido. Já tinha vencido Golias. Já tinha sido celebrado pelo povo inteiro. E, ainda assim, estava escondido numa caverna, sem exército, sem posto e sem futuro visível.
>
> O lugar se chamava Adulão.

**Visual**
Ilustração vetorial em traço branco fino sobre fundo Sombra: a silhueta de uma abertura de caverna vista de dentro, irregular, ocupando o terço direito da tela. Pela abertura entra uma luz difusa, representada por um gradiente suave, não por raios desenhados. Nenhuma figura humana. Nenhum detalhe realista — é sugestão de espaço, não cenário.

**Layout**
Texto nas colunas 1–6, alinhado à esquerda, centralizado verticalmente. Ilustração ocupando as colunas 8–12 e sangrando na borda direita da tela. No celular, a ilustração vai para o topo com 30% da altura e o texto abaixo.

---

### S03 · Quem apareceu lá
**Ato I · Layout L8 · Fundo Sombra**

**Narrativa**

> Foi então que começaram a aparecer homens naquela caverna. E a Escritura é muito específica sobre quem eram eles.
>
> Homens em aperto — gente sob pressão que não conseguia resolver sozinha. Homens endividados — gente com obrigações que não tinha como pagar. E homens amargurados de espírito — gente cuja ferida tinha azedado por dentro.
>
> Ninguém foi convocado. Todos foram parar ali porque não tinham para onde ir.

**Visual**
As três condições dispostas em coluna à direita, cada uma em Rótulo latão com uma linha descritiva abaixo em corpo menor: `APERTO`, `DÍVIDA`, `AMARGURA`. Um filete vertical fino em latão liga as três. A ilustração da caverna permanece ao fundo, agora com opacidade reduzida a 25%, criando continuidade com o slide anterior.

**Layout**
Texto nas colunas 1–6. Bloco das três condições nas colunas 8–11. Referência `1 Samuel 22.1–2` em Legenda, no canto inferior direito.

---

### S04 · O que aconteceu com eles
**Ato I · Layout L1 · Fundo Sombra**

**Narrativa**

> Aqueles homens se tornaram os valentes de Davi.
>
> Os mesmos nomes que a Escritura registra depois como heróis de guerra saíram todos daquela lista de fugitivos.
>
> **De quebrantados, valentes.**

**Visual**
Nenhum elemento gráfico. A última linha é a única em D1; o restante em Corpo. Um filete horizontal curto em latão, de 60px, separa o texto da frase final.

**Layout**
Bloco centralizado, colunas 4–9. Muito espaço acima e abaixo.

**Comportamento**
A frase final entra 600ms depois do restante. É a primeira das três aparições da frase-âncora do projeto. **Não é explicada aqui.** Volta no Ato V e no Ato X, e só na terceira vez o leitor terá construído sozinho o seu significado.

---

### S05 · A pergunta, e o nome
**Ato I · Layout L2 · Transição de Sombra para Base**

**Narrativa**

> Essa história levanta uma pergunta que este documento inteiro tenta responder:
>
> **O que Deus faz com o homem que chegou ao fundo — e chegou lá por culpa própria?**
>
> Não é uma pergunta teórica. Ela é feita todos os dias, em silêncio, por homens que carregam farda e carregam vergonha ao mesmo tempo.

*(Abaixo, separado por filete)*

**Discipulando a Caserna**
Programa de discipulado do Projeto Caserna de Adulão
Apresentação institucional · v1.0

**Visual**
O fundo faz transição de Sombra para Base ao longo da rolagem deste slide — a caverna se abre. É o único momento da apresentação em que o fundo muda dentro de um mesmo slide, e o gesto é intencional: a narrativa sai do escuro.

**Layout**
Pergunta em D2, colunas 1–8. Parágrafo de apoio em Corpo, colunas 1–7. Bloco de identificação em Corpo e Legenda, colunas 1–5, separado por filete horizontal de 1px em Estrutura. A barra da armadura aparece pela primeira vez aqui, com os quatro ícones vazados.

---

### S06 · Como ler este documento
**Ato I · Layout L2**

**Narrativa**

> Antes de seguir, vale explicar o que você tem em mãos.
>
> Esta apresentação foi feita para ser lida sem ninguém ao lado explicando. Tudo o que seria dito em voz alta está escrito aqui. Você pode parar quando quiser e retomar depois — o documento lembra onde você estava.
>
> São dez partes. A leitura completa leva cerca de meia hora. Você não precisa decidir nada durante o caminho: as perguntas estão todas reunidas no final.

**Visual**
Dez pontos em linha horizontal, ligados por um filete fino em Estrutura. O primeiro ponto está preenchido em latão; os outros nove, vazados. Sob cada ponto, o algarismo romano do ato em Rótulo, tamanho reduzido. Ao lado, três informações objetivas em Legenda: `10 PARTES`, `~30 MINUTOS`, `PODE SER INTERROMPIDA`.

**Layout**
Texto nas colunas 1–7. Linha dos dez pontos abaixo, ocupando as colunas 1–10. No celular, a linha vira uma barra segmentada de largura total.

---

## ATO II — O HOMEM
*O protagonista aparece. Descida emocional deliberada.*

---

### S07 · Ele chega com a farda e com a vergonha
**Ato II · Layout L2**

**Narrativa**

> Deixe eu apresentar a você o homem de quem esta apresentação trata. Ele não tem nome aqui, porque não é uma pessoa específica — é o retrato de muitos.
>
> Ele conhece hierarquia. Conhece disciplina. Conhece missão. Foi formado por um sistema que ensina a obedecer, a resistir e a proteger.
>
> E chega carregando culpa. Não uma acusação injusta, não um mal-entendido — culpa real, por algo que ele fez e que não consegue desfazer.

**Visual**
Nenhuma figura humana, nenhuma fotografia. À direita, dois conjuntos de palavras em Rótulo, dispostos verticalmente e sobrepostos parcialmente: o primeiro conjunto em Estrutura — `HIERARQUIA · DISCIPLINA · MISSÃO · LEALDADE`; o segundo, deslocado 24px para baixo e para a direita, em latão de baixa opacidade — `CULPA · VERGONHA · RUPTURA · SILÊNCIO`. A sobreposição é o argumento: as duas coisas ocupam o mesmo homem.

**Layout**
Texto nas colunas 1–6. Composição tipográfica nas colunas 8–12. Legenda no rodapé do slide: `Composição narrativa. Não corresponde a caso individual identificável.`

---

### S08 · O que a farda dá, e o que ela cobra
**Ato II · Layout L3**

**Narrativa**

*(Coluna esquerda)*

**O que a farda dá**

> A caserna forma homem, e isso precisa ser dito com respeito. Ela oferece identidade, pertencimento e propósito. Dá um código que organiza a vida inteira e uma honra que é reconhecida publicamente. Para muitos, foi o primeiro lugar onde alguém exigiu algo deles e acreditou que eram capazes de entregar.

*(Coluna direita)*

**O que a farda cobra**

> Mas ela cobra na mesma proporção. Quando um militar erra, o erro pessoal vira falha institucional. A queda não é privada: ela é registrada, apurada, julgada e conhecida pela tropa inteira. Fracassar de farda é fracassar em público — e é uma dor que quem nunca vestiu uma tem dificuldade de dimensionar.

**Visual**
Filete vertical de 1px em Estrutura separando as colunas, indo do topo ao pé da área útil. Nenhum ícone. A simetria das duas colunas é o elemento gráfico.

**Layout**
Coluna esquerda nas colunas 1–5, direita nas 8–12. Subtítulos em H1. No celular, empilham na ordem lida, com o filete virando horizontal entre elas.

---

### S09 · O ambiente de reclusão
**Ato II · Layout L4**

**Narrativa**

> Agora imagine esse mesmo homem dentro do Presídio Militar da PMCE.
>
> O horário é controlado. A circulação é controlada. O material que entra é controlado. Existe tensão institucional permanente, e o número de participantes de qualquer atividade muda de uma semana para a outra, por razões que ninguém no grupo controla.
>
> Não é um lugar onde se improvisa discipulado. É um lugar onde o improviso custa caro — porque a chance de reunir aqueles homens de novo, na semana seguinte, nas mesmas condições, não é garantida.

**Visual**
Diagrama esquemático em traço fino de 1px, cor Estrutura: um retângulo central rotulado `área de encontro`, cercado por quatro rótulos ligados a ele por filetes — `TEMPO`, `CIRCULAÇÃO`, `MATERIAL`, `ROTATIVIDADE`. Cada filete tem um pequeno traço transversal, sugerindo restrição. Sem preenchimento, sem sombra, sem representação de instalação real.

**Layout**
Texto nas colunas 1–6, diagrama nas colunas 8–12, centralizado verticalmente.

---

### S10 · A ferida que é específica deste homem
**Ato II · Layout L2**

**Narrativa**

> A reclusão de um militar tem uma camada que a reclusão comum não tem.
>
> Não é apenas privação de liberdade. É perda de identidade para alguém cuja identidade estava inteira na função. É desonra diante de uma corporação que o conhecia pelo nome. É ser vigiado por colegas de profissão, dentro de um sistema que ele mesmo servia.
>
> E é, com frequência, isolamento familiar — porque a família também carrega a vergonha do lado de fora.

**Visual**
Quatro camadas horizontais empilhadas, como estratos, cada uma um retângulo de altura decrescente e opacidade crescente em Caserna: `privação de liberdade`, `perda de identidade`, `desonra corporativa`, `isolamento familiar`. A mais escura e mais estreita fica embaixo. A leitura de cima para baixo mostra que a ferida se aprofunda conforme desce.

**Layout**
Texto nas colunas 1–7. Diagrama de estratos nas colunas 8–12, alinhado ao centro vertical.

---

### S11 · O que ele acredita sobre Deus
**Ato II · Layout L2 · Fundo Caserna**

**Narrativa**

> Se você perguntar a esse homem onde Deus estava quando tudo desabou, é provável que ele responda uma de duas coisas.
>
> Que Cristo foi embora na hora da desonra — que havia uma linha, e ele a cruzou, e do outro lado não há mais graça disponível.
>
> Ou que Cristo nunca esteve ali para começo de conversa, e que religião é assunto de outro tipo de gente.
>
> As duas respostas nascem da mesma convicção: a de que existe um ponto a partir do qual alguém deixa de ser alcançável.

**Visual**
Fundo Caserna, texto em Base. Nenhum elemento gráfico além de um filete horizontal em latão, de 80px, acima do último parágrafo. A mudança de fundo marca este slide como o ponto mais baixo da curva emocional da apresentação.

**Layout**
Texto centralizado horizontalmente, colunas 3–10, com muito respiro vertical.

---

### S12 · O que ele não precisa
**Ato II · Layout L1**

**Narrativa**

> Uma coisa esse homem não precisa: de mais cobrança.
>
> Ele já se cobra o suficiente. O que falta não é alguém que aponte o erro — isso o sistema inteiro já fez, com competência. O que falta é alguém que entre na caverna com ele e aponte Cristo.

**Visual**
Nenhum. Fundo Base. Texto isolado.

**Layout**
Bloco centralizado, colunas 4–9. Primeira frase em D1; a segunda, em Corpo, abaixo, com 60px de separação.

**Comportamento**
Este é um dos quatro slides silenciosos da apresentação. **Não adensar.** O vazio é o que dá peso à frase.

---

## ATO III — O DISCIPULADO
*Fundamento doutrinário. O antagonista entra em cena.*

---

### S13 · Discipulado não é curso
**Ato III · Layout L3**

**Narrativa**

> Antes de mostrar o programa, é preciso alinhar o que se entende por discipulado — porque a palavra virou sinônimo de coisas muito diferentes.

*(Coluna esquerda)*
**Curso**
> Transmite informação. Tem começo e fim definidos. Avalia por retenção de conteúdo. Termina quando o conteúdo acaba. Quem conclui sabe mais do que sabia.

*(Coluna direita)*
**Discipulado**
> Forma pessoa. Não tem data de encerramento. Avalia por transformação de vida. Continua quando o conteúdo acaba. Quem conclui é diferente de quem começou.

*(Abaixo, largura total)*
> A confusão entre os dois é a razão pela qual tanto material bom não produz fruto nenhum.

**Visual**
Duas colunas com filete separador. Cada uma encimada por um rótulo em Rótulo. A frase final aparece abaixo das duas, centralizada, com filete horizontal acima.

**Layout**
Introdução nas colunas 1–8. Colunas comparativas em 1–5 e 8–12. Frase de fecho centralizada, colunas 3–10.

---

### S14 · O que a Escritura chama de discípulo
**Ato III · Layout L4**

**Narrativa**

> No Novo Testamento, discípulo é aquele que segue, aprende convivendo e reproduz o que recebeu. São três movimentos, e nenhum deles é opcional.
>
> Repare no que Cristo não fez. Ele não montou um currículo, não abriu uma escola e não distribuiu apostilas. Ele chamou doze homens e caminhou com eles durante três anos, ensinando no percurso — na estrada, no barco, na mesa, no conflito.
>
> O método era a convivência. O conteúdo era Ele mesmo.

**Visual**
Três círculos vazados em latão, dispostos na diagonal ascendente, ligados por filetes: `SEGUE`, `APRENDE CONVIVENDO`, `REPRODUZ`. O terceiro círculo tem, saindo dele, um filete que se ramifica em dois novos círculos menores e vazios — sugerindo, sem legenda, a multiplicação que será retomada no Ato X.

**Layout**
Texto nas colunas 1–6, diagrama nas colunas 7–12.

---

### S15 · O mandato
**Ato III · Layout L2**

**Narrativa**

> A ordem final de Cristo aos discípulos não foi fazer convertidos. Foi fazer discípulos, ensinando-os a guardar tudo o que Ele ordenou. Está em Mateus 28.
>
> E Paulo, escrevendo a Timóteo, foi ainda mais longe. Ele instrui que o que foi ouvido seja confiado a homens fiéis, que sejam capazes de ensinar outros.
>
> Conte as gerações nessa frase: Paulo ensina Timóteo, que confia a homens fiéis, que ensinam outros. **A quarta geração já está prevista no texto.** O discipulado bíblico não pensa em turma. Pensa em linhagem.

**Visual**
Quatro figuras esquemáticas em linha horizontal — apenas círculos vazados de tamanho igual, ligados por setas finas em latão — rotuladas em Rótulo: `PAULO`, `TIMÓTEO`, `HOMENS FIÉIS`, `OUTROS`. A quarta seta continua para fora da tela, sem destino desenhado.

**Layout**
Texto nas colunas 1–7. Diagrama abaixo, largura total, altura de 120px. Referências `Mateus 28.18–20` e `2 Timóteo 2.2` em Legenda, alinhadas à direita do diagrama.

---

### S16 · Contemplar antes de obedecer
**Ato III · Layout L4**

**Narrativa**

> Há uma ordem interna que este programa considera inegociável, e que vale explicar porque ela determina o formato de todas as 48 lições.
>
> Nenhuma disciplina espiritual verdadeira nasce de cobrança. Ela nasce de fascínio. E nenhuma obediência frutífera nasce de medo — nasce de amor.
>
> Por isso toda lição segue a mesma sequência: primeiro o discípulo **vê Cristo**, depois **entende pela Palavra**, e só então **responde em obediência concreta**. Nunca ao contrário.
>
> A prática não paga culpa. Ela responde à graça. Num ambiente onde os homens já vivem sob cobrança permanente, inverter essa ordem seria repetir, em nome de Deus, exatamente o que os adoeceu.

**Visual**
Três etapas encadeadas horizontalmente, cada uma num retângulo de canto reto com borda de 1px: `VER CRISTO` → `ENTENDER PELA PALAVRA` → `RESPONDER EM OBEDIÊNCIA`. Abaixo, uma seta de retorno curva ligando a terceira de volta à primeira, indicando ciclo. A seta de retorno é a única linha curva permitida no sistema gráfico inteiro.

**Layout**
Texto nas colunas 1–6, diagrama nas colunas 7–12, centralizado verticalmente.

---

### S17 · Por que não basta evangelizar
**Ato III · Layout L5**

**Narrativa**

> Uma pergunta razoável neste ponto: se o objetivo é alcançar esses homens, por que não basta evangelizar ou oferecer aconselhamento?
>
> Porque cada uma dessas coisas faz uma parte, e nenhuma faz o todo.

*(Cartão 1)* **Evangelismo** — Apresenta Cristo e vai embora. Indispensável como porta de entrada, insuficiente como caminho.
*(Cartão 2)* **Aconselhamento** — Trata a ferida e encerra o atendimento. Necessário, mas episódico por natureza.
*(Cartão 3)* **Assistência religiosa pontual** — Alcança quem está presente naquele dia. Não constrói progressão.
*(Cartão 4)* **Discipulado** — Permanece, forma caráter e produz quem forma. É o único dos quatro que se reproduz sozinho.

*(Abaixo)*
> Num ambiente de reclusão, os três primeiros isolados tendem a produzir decisão emocional sem raiz. E decisão sem raiz, ali dentro, costuma virar recaída em pouco tempo.

**Visual**
Quatro cartões em grade 2×2. Os três primeiros com borda em Estrutura e texto em chumbo; o quarto com borda em latão de 2px e um pequeno marcador de canto na mesma cor. A diferença de tratamento é sutil e não precisa de legenda.

**Layout**
Introdução nas colunas 1–8, grade nas colunas 1–10, fecho nas colunas 1–7.

---

### S18 · O que trabalha contra
**Ato III · Layout L2 · Fundo Caserna**

**Narrativa**

> Existe uma força que se opõe a tudo isso, e ela não é o que se costuma imaginar. Não é oposição institucional, nem hostilidade dos homens, nem falta de recurso.
>
> **É a perda.**
>
> É o que Deus faz e que, sem forma que o guarde, simplesmente se dissolve. E ela acontece assim:
>
> — Um homem se converte, e ninguém acompanha o que veio depois.
> — Uma turma avança bem, o instrutor é transferido, e a turma seguinte recomeça do zero.
> — Cada instrutor ensina aquilo que domina, e as lacunas doutrinárias ninguém percebe, porque ninguém tem o mapa inteiro.
> — Um homem sai da reclusão espiritualmente maduro e, na igreja, é tratado como recém-chegado.
> — Um material excelente é escrito, é usado por dois anos, e morre junto com a saída de quem o escreveu.

**Visual**
Fundo Caserna. Os cinco itens listados aparecem em texto Base, cada um precedido de um traço horizontal curto em latão. À direita, um elemento gráfico discreto: cinco pequenos quadrados em latão que, de cima para baixo, vão perdendo opacidade até desaparecerem no quinto — a representação literal da dissipação.

**Layout**
Texto nas colunas 1–7, elemento gráfico nas colunas 10–11.

**Comportamento**
Este é o slide que nomeia o antagonista da narrativa. Ele será derrotado explicitamente no Ato IX, quando o Guia Mestre for apresentado. É o que transforma um documento de método no clímax da história em vez de um anexo administrativo.

---

### S19 · Alcançar não é o mesmo que formar
**Ato III · Layout L1**

**Narrativa**

> Vale guardar esta frase, porque ela volta no final:
>
> **Um homem evangelizado é um homem alcançado. Um homem discipulado é uma linhagem.**

**Visual**
Nenhum. Fundo Base.

**Layout**
Bloco centralizado, colunas 3–10. A frase em D1, dividida em duas linhas — a quebra vem exatamente antes de "Um homem discipulado", para que as duas metades se leiam como duas afirmações.

---

## ATO IV — A LINGUAGEM
*A ponte cultural, e a blindagem contra a objeção principal.*

---

### S20 · Toda cultura tem língua própria
**Ato IV · Layout L2**

**Narrativa**

> Há um princípio antigo de missões que se aplica inteiro aqui: quem não fala a língua do povo não é ouvido, ainda que esteja dizendo a verdade.
>
> Isso não é concessão nem estratégia de marketing. É o reconhecimento de que o Evangelho não muda, mas o veículo que o carrega precisa ser inteligível para quem o recebe. Foi assim na Reforma, quando a Escritura foi traduzida para as línguas do povo, e é assim em qualquer campo missionário até hoje.

**Visual**
Nenhum elemento gráfico. Slide propositalmente sóbrio, preparando a densidade do próximo.

**Layout**
Texto nas colunas 1–7, alinhado ao centro vertical.

---

### S21 · A caserna é uma cultura
**Ato IV · Layout L5**

**Narrativa**

> E a caserna é uma cultura — não um jargão profissional, mas um sistema de valores que organiza a identidade de quem vive nela.

*(Seis cartões, 3×2)*
**Hierarquia** — a ordem tem lugar e origem reconhecidos.
**Disciplina** — a constância vale mais que o impulso.
**Missão** — existe algo acima do interesse individual.
**Camaradagem** — ninguém avança sozinho, ninguém fica para trás.
**Honra** — a palavra dada tem peso de compromisso.
**Prontidão** — estar preparado antes de precisar.

*(Abaixo)*
> Um homem formado nesses seis valores não abandona esse vocabulário quando entra numa igreja. Ele apenas não encontra, do outro lado, quem fale com ele nessa língua.

**Visual**
Seis cartões de altura igual, borda de 1px em Estrutura, título em Rótulo latão e descrição em Corpo. Sem ícones — o sistema gráfico da apresentação não usa iconografia decorativa.

**Layout**
Grade 3×2 nas colunas 1–12. No celular, coluna única de seis cartões.

---

### S22 · Quando a igreja fala outra língua
**Ato IV · Layout L2**

**Narrativa**

> O que acontece quando esse homem entra numa igreja onde ninguém fala a língua dele?
>
> Ele ouve o Evangelho traduzido para uma cultura que não é a sua. Reconhece que aquilo é verdadeiro e importante, mas conclui, sem dizer a ninguém, que é para outro tipo de gente. Agradece, cumprimenta na saída, e não volta.
>
> Não houve rejeição da mensagem. Houve falha de tradução — e a diferença entre as duas coisas é enorme, porque a segunda tem conserto.

**Visual**
Elemento tipográfico simples à direita: a mesma frase curta escrita duas vezes, uma acima da outra. A primeira em serifa, cor Estrutura, opacidade 40%, com um `×` em latão ao lado. A segunda em Rótulo, cor chumbo, opacidade total, com um traço em latão ao lado. Sem legenda — a comparação se explica.

**Layout**
Texto nas colunas 1–6, elemento nas colunas 8–12.

---

### S23 · Paulo já fazia isto
**Ato IV · Layout L5**

**Narrativa**

> Esta não é uma invenção do projeto. É um método que a própria Escritura oferece — e o apóstolo Paulo o usava com frequência.

*(Quatro cartões, 1×4)*
**O soldado** — Paulo diz a Timóteo que suporte as dificuldades como bom soldado, e que quem milita não se envolve com os negócios da vida civil. *(2Tm 2.3–4)*
**O atleta e o lavrador** — na mesma passagem, quem compete só é coroado se competir conforme as regras, e o lavrador que trabalha é o primeiro a participar dos frutos. *(2Tm 2.5–6)*
**A armadura completa** — a imagem mais desenvolvida de todas, peça por peça, para descrever a vida cristã em combate. *(Ef 6.10–18)*
**Companheiro de milícia** — é assim que Paulo chama Epafrodito, um irmão da igreja. *(Fp 2.25)*

*(Abaixo)*
> **Paulo falou caserna para falar Evangelho.** O projeto não inventou esse método: ele o herdou.

**Visual**
Quatro cartões em linha, altura uniforme, referência bíblica em Legenda no pé de cada um. A frase de fecho recebe filete horizontal em latão acima.

**Layout**
Cartões nas colunas 1–12. Fecho centralizado, colunas 3–10.

---

### S24 · O critério que impede o erro
**Ato IV · Layout L2 · Fundo Caserna**

**Narrativa**

> Chegando aqui, é provável que uma objeção esteja se formando: isso não corre o risco de militarizar o Evangelho? De transformar a fé numa estética de força, exatamente onde ela deveria falar de quebrantamento?
>
> É uma objeção correta, e o projeto a levou a sério antes de ser questionado. Por isso existe um critério, e ele é único:
>
> **A metáfora serve à Escritura, jamais o contrário.**
>
> Quando a imagem militar contradiz o texto bíblico, quem cede é a imagem. O modelo de autoridade aqui não é a hierarquia terrena — é Cristo, o Comandante que lava pés, que serve e que entrega a própria vida pelos seus. Onde a linguagem sacralizar a instituição militar em vez de usá-la como ponte, é falha de redação e deve ser corrigida.

**Visual**
Fundo Caserna, texto Base. A frase-critério isolada em D2, em latão, com respiro amplo acima e abaixo, e filetes horizontais curtos em latão nas duas extremidades.

**Layout**
Texto centralizado, colunas 3–10.

**Comportamento**
Este slide antecipa a objeção antes que ela se consolide. Objeção respondida antes de ser feita constrói credibilidade; a mesma resposta dada depois soa como defesa.

---

### S25 · Por isso, um nome
**Ato IV · Layout L1**

**Narrativa**

> Então o desafio é duplo. É preciso falar a língua da caserna. E é preciso falar a homens que chegaram ao fundo.
>
> Existe um lugar na Escritura onde essas duas coisas acontecem ao mesmo tempo. Você já esteve nele, no início desta apresentação.

**Visual**
Fundo Base, mas com uma faixa vertical estreita em Sombra ocupando a borda direita da tela, com cerca de 8% da largura — a caverna reaparecendo na periferia, anunciando o retorno sem declará-lo.

**Layout**
Texto centralizado, colunas 3–9.

---

## ATO V — ADULÃO
*O giro. Pico intelectual da apresentação.*

---

### S26 · De volta à caverna
**Ato V · Layout L8 · Fundo Sombra**

**Narrativa**

> Voltemos a Adulão — agora com o vocabulário necessário para entender o que estava acontecendo ali.
>
> Aquela caverna não era um retiro espiritual. Era o esconderijo de um homem perseguido, que virou ponto de encontro de gente sem alternativa.

**Visual**
A mesma ilustração da caverna do slide S02, na mesma posição e escala. A repetição exata é intencional: o leitor deve reconhecer que voltou ao mesmo lugar.

**Layout**
Idêntico ao S02. Texto nas colunas 1–6, ilustração nas colunas 8–12 com sangria à direita.

---

### S27 · As três condições, relidas
**Ato V · Layout L6 · Fundo Sombra**

**Narrativa**

> Releia agora as três condições daqueles homens, pensando no militar recluso que você conheceu no início desta apresentação.

| Em Adulão | No presídio militar |
|---|---|
| **Aperto** — pressão que não se resolve sozinho | Processo em curso, futuro indefinido, ausência de controle sobre a própria vida |
| **Dívida** — obrigação sem meio de pagar | Culpa real por um ato que não se pode desfazer, e uma família que paga junto |
| **Amargura de espírito** — ferida que azedou | Revolta contra a corporação, contra si mesmo, e frequentemente contra Deus |

> Não são categorias antigas. É o retrato exato do homem de quem falamos há dez minutos.

**Visual**
Tabela de duas colunas sobre fundo Sombra, com filetes horizontais finos em latão de baixa opacidade separando as linhas. Cabeçalhos em Rótulo latão. Sem bordas externas.

**Layout**
Tabela nas colunas 2–11. Frase de fecho centralizada abaixo, em D2.

---

### S28 · O que Davi não fez
**Ato V · Layout L3 · Fundo Sombra**

**Narrativa**

*(Coluna esquerda)*
**O que Davi não fez**
> Não exigiu correção como pré-requisito para o acolhimento. Não montou processo seletivo. Não separou os que tinham chance dos que não tinham. Não pediu que resolvessem primeiro as próprias dívidas e voltassem depois.

*(Coluna direita)*
**O que Davi fez**
> Recebeu aqueles homens exatamente no estado em que chegaram. Assumiu a chefia deles. Conviveu com eles. E os formou dentro da crise, não depois que ela passasse — porque a crise não ia passar tão cedo, e esperar teria sido perdê-los.

**Visual**
Duas colunas com filete separador vertical em latão. Sobre fundo Sombra, os títulos em Rótulo latão e o corpo em Base.

**Layout**
Colunas 1–5 e 8–12. No celular, empilham na ordem.

---

### S29 · O que eles se tornaram
**Ato V · Layout L1 · Fundo Sombra**

**Narrativa**

> Os nomes que a Escritura registra depois como os valentes de Davi — os homens que fizeram feitos militares que atravessaram três milênios de memória — saíram todos daquela lista de fugitivos.
>
> Nenhum deles entrou na caverna como herói. Todos saíram de lá como um.

**Visual**
Nenhum elemento gráfico. Fundo Sombra. A segunda frase em D1.

**Layout**
Centralizado, colunas 3–10.

---

### S30 · A equivalência
**Ato V · Layout L6 · Transição de Sombra para Base**

**Narrativa**

> Aqui está a razão de o projeto se chamar Caserna de Adulão. Não é um nome escolhido por soar bem — é uma leitura teológica, e ela se sustenta ponto a ponto.

| Em Adulão | No Projeto Caserna de Adulão |
|---|---|
| A caverna: esconderijo de quem não tinha para onde ir | O presídio militar e o quartel: onde o militar ferido efetivamente está |
| Homens em aperto, dívida e amargura | Militares com culpa real, desonra pública e isolamento |
| Davi: ungido, mas ainda perseguido e sem trono | **Cristo: o Comandante maior que Davi, que desce ao lugar do fracasso** |
| Formação acontecendo dentro da crise | Discipulado dentro da reclusão, sem esperar que ela termine |
| Proscritos que se tornaram valentes | Discípulos que se tornam formadores de outros discípulos |

**Visual**
Tabela de duas colunas ocupando a largura útil. A terceira linha — Davi/Cristo — recebe fundo levemente destacado e o texto da coluna direita em latão: é o eixo da equivalência inteira e precisa ser visualmente identificável em uma varredura rápida. O fundo do slide transiciona de Sombra para Base durante a rolagem, marcando a saída definitiva da caverna narrativa.

**Layout**
Introdução nas colunas 1–8. Tabela nas colunas 1–12, com linhas de 72px de altura mínima. No celular, cada linha vira um cartão com as duas metades empilhadas e um traço latão entre elas.

---

### S31 · Por que a analogia sustenta
**Ato V · Layout L2**

**Narrativa**

> Uma analogia decorativa ilustra o que já foi dito. Esta faz outra coisa: ela responde à pergunta teológica que o homem recluso realmente carrega, e que ele quase nunca formula em voz alta.
>
> **Se eu falhei desse jeito, ainda existe posto para mim?**
>
> Adulão responde que sim. A caverna não é o fim da carreira — é onde ela recomeça, sob um novo comando. E os homens que passaram por lá não voltaram ao lugar anterior: foram além dele.
>
> **De quebrantados, valentes.**

**Visual**
A pergunta em D2, isolada entre filetes horizontais em latão. A frase-âncora final em D1, centralizada, com respiro amplo.

**Layout**
Texto nas colunas 1–8, frase final centralizada nas colunas 3–10.

**Comportamento**
Segunda das três aparições da frase-âncora. A partir daqui ela já significa algo construído pelo leitor, e não precisa mais de apoio.

---

## ATO VI — O PROJETO CASERNA DE ADULÃO
*Da narrativa para a instituição.*

---

### S32 · Antes da estrutura, o mover
**Ato VI · Layout L4**

**Narrativa**

> Vale dizer com clareza como isso começou, porque a ordem dos fatos importa.
>
> Antes de existir qualquer estrutura, não havia matriz curricular. Não havia módulo, símbolo, insígnia ou certificado. Havia homens se assentando, uma Bíblia aberta, e fé reacendendo em lugares onde a culpa tentava apagá-la.
>
> O projeto não criou esse mover. Ele nasceu para guardá-lo — porque o que estava acontecendo era bom demais para depender da memória e da disponibilidade de quem estava conduzindo.

**Visual**
Linha do tempo horizontal sem datas: um ponto preenchido em latão à esquerda, rotulado `o mover`, e um ponto vazado bem mais à direita, rotulado `a estrutura`. O espaço entre eles é longo e vazio, e essa distância é o argumento do slide.

**Layout**
Texto nas colunas 1–6, linha do tempo nas colunas 7–12.

---

### S33 · O que é o Projeto Caserna de Adulão
**Ato VI · Layout L2**

**Narrativa**

> O Projeto Caserna de Adulão é um programa de evangelização e discipulado voltado aos profissionais de segurança pública, com atuação prioritária junto a militares estaduais.
>
> Ele é vinculado à Casa de Oração para Todos os Povos, opera sob liderança pastoral definida e possui personalidade jurídica própria. Não é uma iniciativa informal, nem depende de uma única pessoa para continuar existindo — e as duas coisas foram decisões conscientes desde o início.

**Visual**
Ficha institucional sóbria à direita, com quatro linhas em Rótulo e Corpo: `NATUREZA` — programa de evangelização e discipulado; `VÍNCULO ECLESIÁSTICO` — Casa de Oração para Todos os Povos; `PÚBLICO` — profissionais de segurança pública; `PERSONALIDADE JURÍDICA` — constituída. Filete vertical em latão à esquerda do bloco.

**Layout**
Texto nas colunas 1–6, ficha nas colunas 8–12.

---

### S34 · Por que uma estrutura em setores
**Ato VI · Layout L4**

**Narrativa**

> O projeto se organiza em setores nomeados de P1 a P9, seguindo a lógica de estado-maior que qualquer militar reconhece imediatamente.
>
> Essa escolha tem três razões. A primeira é que a estrutura fala a língua de quem serve, e portanto se explica sozinha para o público-alvo. A segunda é que cada setor tem atribuição delimitada, o que evita que tudo dependa da boa vontade de quem estiver disponível. E a terceira, mais importante: **um projeto com responsabilidades distribuídas não morre quando uma pessoa sai.**

**Visual**
Organograma esquemático simplificado: um bloco superior rotulado `liderança pastoral`, e abaixo uma fileira de nove blocos menores vazados, rotulados de `P1` a `P9`, ligados por filetes finos. Sem nomes de responsáveis. Sem hierarquia visual entre os nove — todos do mesmo tamanho.

**Layout**
Texto nas colunas 1–6, organograma nas colunas 7–12.

---

### S35 · Onde o projeto atua
**Ato VI · Layout L5**

**Narrativa**

> A atuação acontece em frentes distintas, e a ordem entre elas não é acidental.

*(Cinco cartões)*
**Ambiente de reclusão militar** — onde o projeto nasceu e onde a necessidade é mais aguda.
**Unidades operacionais** — quartéis e batalhões, com o militar em serviço ativo.
**Igreja local** — recebendo e dando continuidade a quem sai da reclusão.
**Famílias** — porque a ferida do militar nunca é só dele.
**Capelanias e articulações institucionais** — em construção, respeitando os canais próprios de cada instituição.

**Visual**
Cinco cartões dispostos em linha, com um filete horizontal em latão atravessando todos na altura do título, sugerindo continuidade entre frentes. O quinto cartão tem borda tracejada e um rótulo `EM CONSTRUÇÃO`.

**Layout**
Cartões nas colunas 1–12, altura uniforme. No celular, coluna única.

---

### S36 · Onde entra o Discipulando a Caserna
**Ato VI · Layout L4**

**Narrativa**

> É importante separar duas coisas que às vezes se confundem.
>
> O **Projeto Caserna de Adulão** é a instituição: a estrutura, a governança, as frentes de atuação e o vínculo eclesiástico.
>
> O **Discipulando a Caserna** é o programa formativo que existe dentro dele. É a espinha dorsal pedagógica sobre a qual todo o resto se apoia — e é dele que trata o restante desta apresentação.

**Visual**
Diagrama de contenção: um retângulo externo grande, borda de 1px em Estrutura, rotulado `PROJETO CASERNA DE ADULÃO`. Dentro dele, um retângulo menor preenchido em latão claro, rotulado `DISCIPULANDO A CASERNA`. Ao redor do retângulo interno, dentro do externo, três pequenos blocos vazados sem rótulo, indicando que há outras frentes além do programa formativo.

**Layout**
Texto nas colunas 1–6, diagrama nas colunas 7–12.

---

### S37 · Uma só progressão, em qualquer ambiente
**Ato VI · Layout L4**

**Narrativa**

> Há um princípio que resolve um dos problemas mais frustrantes do trabalho com militares reclusos.
>
> O homem que conclui o Módulo 1 dentro da reclusão **não recomeça do zero quando sai.** Ele é reconhecido como alguém que já percorreu a fase do chamado, e avança para a etapa seguinte na igreja ou no quartel onde for recebido.
>
> Uma única linguagem. Uma única progressão. Válida no presídio, na unidade operacional e na igreja local. Para que isso funcione na prática, é preciso haver comunicação entre quem discipula dentro e quem recebe fora — e essa é uma decisão de fluxo pastoral, não de material didático.

**Visual**
Três blocos rotulados `PRESÍDIO`, `QUARTEL`, `IGREJA`, dispostos horizontalmente. Uma única barra contínua em latão atravessa os três da esquerda à direita, sem interrupção nas junções. A continuidade da barra é o argumento inteiro do slide.

**Layout**
Texto nas colunas 1–6, diagrama nas colunas 7–12.

---

## ATO VII — O PROGRAMA
*Arquitetura pedagógica. O trecho mais denso — o ritmo visual precisa compensar.*

---

### S38 · Não são quatro temas
**Ato VII · Layout L5**

**Narrativa**

> O programa se divide em quatro módulos. Mas eles não são quatro assuntos escolhidos por conveniência — são quatro ações de Cristo, na ordem em que a graça costuma agir na vida de um homem.

*(Quatro cartões em linha)*
**Cristo Chamando** — Ele convoca, perdoa e incorpora.
**Cristo Treinando** — Ele ensina, corrige e firma fundamentos.
**Cristo Moldando** — Ele amadurece afetos, vontade e caráter.
**Cristo Enviando** — Ele comissiona, sustenta e multiplica.

*(Abaixo)*
> Repare no sujeito das quatro frases. Em todas, é Cristo — não o instrutor, e não o discípulo. Isso não é preciosismo retórico: é exatamente o que impede o programa de virar autoajuda com vocabulário militar.

**Visual**
Quatro cartões de largura igual. Cada um com um numeral romano discreto em latão no canto superior direito. Uma seta fina em latão liga cada cartão ao seguinte, indicando sequência obrigatória.

**Layout**
Cartões nas colunas 1–12. Fecho nas colunas 1–8.

---

### S39 · A armadura que unifica tudo
**Ato VII · Layout L4**

**Narrativa**

> Existe uma narrativa bíblica única que dá unidade aos quatro módulos, e ela está em Efésios 6: a armadura de Deus.
>
> A escolha diz algo sobre a natureza do programa. O discípulo não coleciona conteúdos concluídos — ele é **revestido**, peça por peça, por alguém que não é ele mesmo.
>
> Cada módulo corresponde a uma peça: o Cinto da Verdade, a Couraça da Justiça, os Calçados do Evangelho da Paz e o Escudo da Fé.
>
> E se você olhar para o alto desta página, vai reconhecer esses quatro ícones. Aquela barra não é um indicador de progresso comum: é a armadura sendo vestida conforme você avança. A navegação deste documento é a própria doutrina do programa.

**Visual**
As quatro insígnias em linha, inicialmente vazadas. Ao entrar na tela, preenchem-se em latão em sequência, com 200ms entre elas. Simultaneamente, o primeiro ícone da barra fixa no topo se acende — estabelecendo a ligação sem que seja preciso apontá-la duas vezes.

**Layout**
Texto nas colunas 1–6, insígnias nas colunas 7–12.

**Comportamento**
Pagamento da segunda arma de Tchékhov. A barra existe desde o slide S05 sem nenhuma explicação.

---

### S40 · Quatro por doze
**Ato VII · Layout L1**

**Narrativa**

# 4 × 12 = 48

> Quatro módulos sequenciais, doze lições cada, um ciclo anual completo. Um encontro por semana, de uma hora e meia a duas horas.
>
> São 48 semanas efetivas de aula distribuídas em onze a doze meses de calendário — a folga existe para feriados, restrições institucionais, revisões e cerimônias de transição.

**Visual**
Uma grade de 48 marcadores quadrados pequenos, dispostos em quatro fileiras de doze, abaixo do número. Cada fileira recebe um tom distinto, correspondente ao seu módulo. Ao entrar na tela, os marcadores se acendem em sequência rápida, fileira por fileira.

**Layout**
Número em D1 gigante, centralizado. Texto abaixo, colunas 3–10. Grade de 48 abaixo do texto, centralizada, ocupando 6 colunas.

---

### S41 · A progressão é em espiral
**Ato VII · Layout L4**

**Narrativa**

> Um cuidado que vale explicar: nenhum módulo repete o anterior, mas alguns temas retornam.
>
> Oração aparece no Módulo 2 como disciplina pessoal e volta no Módulo 4 como intercessão pela tropa. Identidade aparece no Módulo 1 como reintegração pela graça e retorna no Módulo 3 como caráter formado. O tema é o mesmo; a profundidade e a finalidade, não.
>
> O discípulo não gira em torno dos mesmos assuntos. Ele sobe.

**Visual**
Uma espiral ascendente desenhada em traço fino de latão, vista de perfil, com quatro pontos marcados em alturas crescentes, cada um alinhado verticalmente com o anterior — mostrando que o mesmo tema é revisitado em nível superior. Nenhum rótulo na espiral; ela é ilustrativa e não informativa.

**Layout**
Texto nas colunas 1–6, espiral nas colunas 8–11.

---

### S42 · Módulo 1 — Cristo Chamando
**Ato VII · Layout L7 · Faixa superior em latão**

**Narrativa**

`MÓDULO 1 · LIÇÕES 1 A 12 · CINTO DA VERDADE`

> **Cristo Chamando**
>
> O primeiro módulo trata de acolhimento e fundamento. Ele começa recebendo o ferido antes de qualquer exigência — a primeira lição se chama "Bem-vindo a Adulão: o quartel dos feridos" — e caminha até a vida em comunhão.
>
> No meio do percurso está a lição que sintetiza a tese do projeto inteiro: a graça que devolve a patente. Não como recompensa por mudança, mas como dom que torna a mudança possível.
>
> **O que este módulo forma:** identidade restaurada, compreensão do Evangelho da graça e as primeiras experiências de vida em tropa.
>
> **Encerra na Primeira Marcha — O Recruta que se Rendeu.**

**Visual**
Faixa horizontal superior de 56px em latão, com o rótulo do módulo em Base. Insígnia do cinto à esquerda, grande, em latão sobre fundo Base. À direita, o conteúdo. No pé do bloco, uma barra segmentada de doze divisões, com as doze primeiras acesas.

**Layout**
Faixa em largura total. Insígnia nas colunas 1–3, texto nas colunas 4–11.

---

### S43 · Módulo 2 — Cristo Treinando
**Ato VII · Layout L7 · Faixa superior em Caserna**

**Narrativa**

`MÓDULO 2 · LIÇÕES 13 A 24 · COURAÇA DA JUSTIÇA`

> **Cristo Treinando**
>
> O segundo módulo constrói rotina. Ele vai da oração como comunicação diária até a preparação para o batismo, passando por igreja, santificação, combate espiritual, adoração, mordomia, lar e perdão.
>
> É o módulo em que o discípulo deixa de depender de intensidade emocional e passa a depender de constância. É também o mais exigente, porque disciplina não produz sensação imediata de progresso.
>
> **O que este módulo forma:** disciplinas espirituais estabelecidas, pertencimento à igreja e integridade na rotina.
>
> **Encerra na Segunda Marcha — O Combatente que se Fortalece.**

**Visual**
Idêntico ao S42, com faixa em Caserna e insígnia da couraça. Barra segmentada com as doze seguintes acesas e as doze primeiras em tom apagado — mostrando acúmulo.

**Layout**
Idêntico ao S42.

---

### S44 · Módulo 3 — Cristo Moldando
**Ato VII · Layout L7 · Faixa superior em Estrutura**

**Narrativa**

`MÓDULO 3 · LIÇÕES 25 A 36 · CALÇADOS DO EVANGELHO DA PAZ`

> **Cristo Moldando**
>
> O terceiro módulo trabalha o caráter, que é a parte mais lenta e menos visível da formação. Vai dos dons do Espírito até a multiplicação, passando pelo fruto do Espírito, pela mente de Cristo, pela autoridade e submissão, pelo sofrimento e pela alegria em meio à luta.
>
> É aqui que o discípulo aprende a permanecer de pé quando as circunstâncias não melhoram — e, num ambiente de reclusão, essa é a competência decisiva.
>
> **O que este módulo forma:** caráter obediente, maturidade nos afetos e perseverança sob provação.
>
> **Encerra na Terceira Marcha — O Guerreiro que Persevera.**

**Visual**
Idêntico ao S42, com faixa em Estrutura e insígnia do coturno.

**Layout**
Idêntico ao S42.

---

### S45 · Módulo 4 — Cristo Enviando
**Ato VII · Layout L7 · Faixa superior em Sombra**

**Narrativa**

`MÓDULO 4 · LIÇÕES 37 A 48 · ESCUDO DA FÉ`

> **Cristo Enviando**
>
> O quarto módulo é sobre saída. Vai da Grande Comissão até a formatura, passando por evangelismo relacional, vocação, liderança pelo exemplo, unidade, serviço, intercessão, missões e perseverança até o fim.
>
> A última lição não celebra a conclusão de um curso. Ela envia o discípulo para formar outro — e é isso que fecha o ciclo do programa.
>
> **O que este módulo forma:** visão missionária, liderança pelo exemplo e capacidade de discipular outros.
>
> **Encerra na Formatura do Soldado de Cristo.**

**Visual**
Idêntico ao S42, com faixa em Sombra e insígnia do escudo. A barra segmentada aparece completa, com as 48 divisões acesas.

**Layout**
Idêntico ao S42.

---

### S46 · As 48 lições
**Ato VII · Layout L6**

**Narrativa**

> Aqui está o ano inteiro, lição por lição. Você pode percorrer no seu ritmo — o filtro acima da tabela mostra um módulo de cada vez.
>
> O texto integral de cada lição está nas edições do Instrutor e do Aluno; o que você vê aqui é o mapa.

**Visual**
Filtro de cinco botões no topo — `Todas`, e um por módulo. **O filtro abre por padrão em "Cristo Chamando"**, e não em "Todas": doze linhas são percorríveis, quarenta e oito são um muro. Um contador em Legenda ao lado do filtro exibe `12 de 48 lições`. Abaixo, tabela de quatro colunas — número, título, texto-base, objetivo — com rolagem interna e altura fixa de 60% da tela. Quando um módulo é selecionado, a insígnia correspondente se destaca discretamente ao lado do contador.

**Layout**
Introdução nas colunas 1–8. Filtro e contador em linha, largura total. Tabela nas colunas 1–12. No celular, cada lição vira um cartão com número e título sempre visíveis e o objetivo recolhido sob toque.

---

### S47 · Toda lição tem sete elementos
**Ato VII · Layout L5**

**Narrativa**

> Cada uma das 48 lições segue exatamente a mesma estrutura interna. São sete elementos, sempre nesta ordem.

*(Sete blocos expansíveis)*
**Título** · **Texto-base** · **Objetivo** · **Síntese teológica** · **Aplicação militar** · **Ordem do Dia** · **Perguntas de reflexão**

> Toque em cada elemento para ver como o Guia o define.
>
> A repetição do formato pode parecer rígida, mas ela resolve um problema real: instrutores diferentes, em ambientes diferentes, ministram o mesmo conteúdo sem perda de ênfase. A previsibilidade não cria frieza — **ela cria chão**, principalmente para quem vive num ambiente onde quase nada é previsível.

**Visual**
Sete blocos horizontais empilhados, cada um com o nome do elemento à esquerda e um sinal de expansão à direita. Ao abrir, o bloco revela a definição do Guia e um exemplo extraído de uma lição real — sugestão: a Lição 6, "Ordem de reintegração: a graça que devolve a patente". Dois blocos ficam abertos por padrão: `Aplicação militar` e `Ordem do Dia`, que são os que distinguem este material de uma apostila comum.

**Layout**
Introdução nas colunas 1–8, blocos nas colunas 1–10.

---

### S48 · A Ordem do Dia
**Ato VII · Layout L4**

**Narrativa**

> De todos os sete elementos, um merece explicação separada.
>
> Toda lição termina com uma **Ordem do Dia**: uma ação prática, simples e verificável, a ser cumprida ao longo da semana. Pode ser um versículo memorizado, uma reconciliação buscada, um serviço prestado a alguém da ala, uma oração mantida em horário fixo.
>
> O encontro termina; a lição não. É a Ordem do Dia que atravessa a semana e transforma conteúdo em hábito — e é o que impede o programa de virar uma aula semanal a que se assiste.

**Visual**
Barra horizontal segmentada representando o encontro, com três blocos proporcionais: `CONTEMPLAÇÃO 15–25 MIN`, `DISCERNIMENTO 25–35 MIN`, `ORAÇÃO E COMPROMISSO 10–15 MIN`. A partir do fim da barra, um quarto segmento em latão sai da linha e se prolonga para fora do bloco, atravessando o restante da largura da tela, rotulado `ORDEM DO DIA · A SEMANA INTEIRA`. O gesto gráfico de sair da barra é o argumento.

**Layout**
Texto nas colunas 1–6. Diagrama ocupando as colunas 7–12 e sangrando na borda direita.

---

### S49 · As marchas, e a sobriedade dos ritos
**Ato VII · Layout L3**

**Narrativa**

> Cada módulo termina em um marco reconhecido pelo grupo. São as quatro marchas: **O Recruta que se Rendeu**, **O Combatente que se Fortalece**, **O Guerreiro que Persevera** e a **Formatura do Soldado de Cristo**.
>
> Repare na progressão dos substantivos: recruta, combatente, guerreiro, soldado. É a mesma pessoa, em quatro estágios.
>
> E porque um sistema de insígnias, num ambiente onde a hierarquia já é linguagem corrente, tem caminho curto para virar vaidade, o programa define com precisão o que essas cerimônias são e o que elas não são.

*(Coluna esquerda)* **O que a transição é** — leitura bíblica breve, oração, entrega da insígnia, testemunho de quem concluiu e registro pastoral simples.
*(Coluna direita)* **O que a transição não é** — premiação, ranking, comparação entre discípulos, espetáculo público ou condicionamento de bênçãos ao desempenho.

*(Abaixo)*
> Nenhum discípulo deve ser constrangido ou exposto. Onde o contexto institucional não permitir cerimônia, o registro pastoral cumpre a mesma função.

**Visual**
As quatro marchas em faixas horizontais no topo, cada uma com sua insígnia à esquerda. Abaixo, as duas colunas contrastantes, com a coluna direita em cor Estrutura e opacidade reduzida a 70% — visualmente mais fraca, deliberadamente.

**Layout**
Faixas nas colunas 1–12. Colunas comparativas em 1–5 e 8–12. Fecho centralizado.

---

### S50 · O certificado
**Ato VII · Layout L4**

**Narrativa**

> O certificado de cada marcha existe como memória pastoral, não como comprovação de mérito. O texto-base é sempre o mesmo, e ele deixa claro de quem é a obra:
>
> *"Certificamos que [nome] concluiu, pela graça de Cristo, a [marcha correspondente] do Discipulando a Caserna, como testemunho da obra que Deus começou e haverá de completar."*
>
> A referência é Filipenses 1.6 — e ela volta na última página desta apresentação, pelo mesmo motivo.

**Visual**
Mockup do certificado em proporção real, levemente inclinado, com o campo de nome visivelmente **em branco**. O campo vazio é o elemento mais importante da composição e deve estar centralizado no mockup. Ao lado, três miniaturas dos certificados das outras marchas. Um rótulo `PROPOSTA` no canto superior direito do mockup, caso a arte ainda não esteja homologada.

**Layout**
Texto nas colunas 1–6, mockup nas colunas 7–12.

---

### S51 · O que se espera ao fim do ciclo
**Ato VII · Layout L5**

**Narrativa**

> Ao fim das 48 lições, o programa espera reconhecer cinco marcas no discípulo. Elas não são critérios de aprovação — são sinais de uma obra de graça, e servem para leitura pastoral, não para avaliação.

*(Cinco cartões)*
**Fé bíblica e cristocêntrica** · **Identidade restaurada e honra redimida** · **Disciplina espiritual e vida em comunhão** · **Caráter obediente e servidor** · **Compromisso com a missão e a multiplicação**

*(Abaixo, em destaque)*
> Nenhuma delas descreve perfeição alcançada. Todas descrevem caminho em andamento. Essa distinção não é uma amenização de linguagem: ela é o que impede o perfil de virar régua de cobrança sobre homens que já vivem sob cobrança suficiente.

**Visual**
Cinco cartões dispostos em arco suave, ou em linha se o arco comprometer a legibilidade. A ressalva final ocupa uma faixa horizontal de largura total, com fundo em latão de baixa saturação e texto em chumbo — peso visual equivalente ao dos cartões, nunca menor.

**Layout**
Cartões nas colunas 1–12, faixa de ressalva em largura total abaixo.

---

## ATO VIII — A IDENTIDADE VISUAL
*Pagamento da primeira arma de Tchékhov. Quebra do platô técnico.*

---

### S52 · O emblema volta
**Ato VIII · Layout L1 · Fundo Sombra**

**Narrativa**

> Você viu esta imagem na primeira tela desta apresentação, sem nenhuma explicação.
>
> Agora ela pode ser lida.

**Visual**
O mesmo emblema do slide S01, na mesma escala, na mesma posição, sobre o mesmo fundo Sombra. A repetição precisa ser exata — qualquer variação enfraquece o reconhecimento.

**Layout**
Idêntico ao S01, com o texto acrescentado abaixo, em Corpo, colunas 4–9.

---

### S53 · O escudo é um catecismo
**Ato VIII · Layout L4**

**Narrativa**

> A logomarca do projeto não é decoração. Ela é a doutrina do programa em forma gráfica, e cada elemento tem justificativa.
>
> O corpo é um **escudo**, dividido em quatro campos. Em cada campo está cravada uma das insígnias dos módulos: o cinto, a couraça, os calçados e — no quarto campo — o próprio escudo da fé, repetido dentro do escudo maior.
>
> O conjunto é encimado pelo **capacete** e atravessado pela **espada**.
>
> A leitura da marca é a leitura do programa: **o discípulo não coleciona medalhas. Ele é revestido por Cristo.**

**Visual**
A logomarca ampliada, com linhas de chamada finas em latão apontando para cada elemento, e rótulos numerados ao redor: `1 escudo`, `2 quatro campos`, `3 capacete`, `4 espada`. As chamadas se acendem em sequência, uma a cada 400ms, ao entrar na tela.

**Layout**
Texto nas colunas 1–5, marca anotada nas colunas 6–12.

---

### S54 · Por que cada insígnia está no módulo em que está
**Ato VIII · Layout L6**

**Narrativa**

> A correspondência entre peça da armadura e módulo não foi escolhida por conveniência estética. Cada peça está onde está por uma razão que vem do próprio texto de Efésios 6.

| Módulo | Peça bíblica | Nome na caserna | Por que esta peça neste módulo |
|---|---|---|---|
| **1 · Chamando** | Cinto da Verdade *(Ef 6.14)* | Cinto de guarnição | O cinto é a primeira peça a ser posta e a que sustenta todas as outras. No módulo do chamado, o homem recebe a verdade do Evangelho que sustenta a nova identidade. Sem ele, nenhuma outra peça se prende ao corpo. |
| **2 · Treinando** | Couraça da Justiça *(Ef 6.14)* | Colete balístico | A couraça protege o que é vital. No módulo do treinamento, o discípulo aprende a guardar o coração e a integridade na rotina — a proteção daquilo que, se atingido, encerra o combate. |
| **3 · Moldando** | Calçados do Evangelho da Paz *(Ef 6.15)* | Coturno | O calçado é o que permite permanecer de pé em terreno hostil. No módulo do caráter, o discípulo é firmado para andar dignamente em qualquer terreno, com mansidão e constância. |
| **4 · Enviando** | Escudo da Fé *(Ef 6.16)* | Insígnia final | O escudo é a única peça que **protege também o companheiro ao lado**, e não apenas quem o carrega. No módulo do envio, a fé se torna ativa, missionária e coletiva. |

**Visual**
Tabela de quatro colunas com a insígnia desenhada na primeira célula de cada linha, em latão, com cerca de 48px. Linhas separadas por filetes finos. A quarta linha recebe destaque discreto de fundo, porque é a justificativa mais forte do conjunto e a que melhor demonstra que a atribuição não é arbitrária.

**Layout**
Tabela nas colunas 1–12. No celular, cada linha vira um cartão com insígnia no topo.

---

### S55 · As duas peças que não pertencem a módulo nenhum
**Ato VIII · Layout L4**

**Narrativa**

> Efésios 6 lista seis peças, e o programa usa apenas quatro como insígnias de módulo. As outras duas ficaram de fora de propósito, e a decisão é teológica.
>
> **A Espada do Espírito** é a Palavra de Deus. Ela não pertence a uma etapa da formação: atravessa todas, do chamado ao envio, como instrumento de cada lição. Por isso, na marca, ela corta o escudo transversalmente em vez de ocupar um campo.
>
> **O Capacete da Salvação** guarda a mente na esperança. Está reservado à dimensão pastoral de socorro, nos módulos complementares voltados a quem atravessa crise aguda. Por isso ele encima o escudo: cobre o conjunto inteiro sem estar em nenhuma parte específica.
>
> Quatro peças descrevem a marcha. Duas acompanham o soldado por toda a jornada e em suas crises.

**Visual**
Diagrama de três planos sobrepostos. No plano inferior, os quatro símbolos em sequência linear. Atravessando todos na horizontal, um único traço representando a espada. Acima do conjunto, um arco representando o capacete cobrindo tudo. Os três planos em profundidades visuais distintas, deixando evidente que não estão no mesmo nível.

**Layout**
Texto nas colunas 1–6, diagrama nas colunas 7–12.

---

### S56 · O que pode mudar e o que não pode
**Ato VIII · Layout L3**

**Narrativa**

> Uma regra de governança fecha este assunto, e ela vale para qualquer unidade que venha a adotar o programa.

*(Coluna esquerda)* **Pode variar** — o recurso gráfico usado para cada símbolo, conforme o que estiver disponível: um impresso, um cartão, uma insígnia bordada, uma projeção, ou mesmo apenas a menção verbal na cerimônia.

*(Coluna direita)* **Não pode variar** — o significado espiritual de cada peça e a ordem em que os símbolos são entregues.

*(Abaixo)*
> Em outras palavras: se faltar recurso, a cerimônia acontece do mesmo jeito. O que não pode acontecer é a insígnia significar outra coisa, ou vir fora de ordem.
>
> O Caderno de Identidade Visual que consolidará essas regras está previsto e ainda não foi produzido.

**Visual**
Duas colunas contrastantes. Abaixo, uma faixa com borda tracejada e rótulo `PENDENTE` contendo a última linha — o estado de não-conclusão é declarado graficamente.

**Layout**
Colunas 1–5 e 8–12. Faixa de pendência em largura total.

---

### S57 · A identidade fora da sala
**Ato VIII · Layout L4**

**Narrativa**

> Há uma peça material que o método praticamente exige, e é justo apresentá-la antes de qualquer outra.
>
> Como toda lição termina em Ordem do Dia, e a Ordem do Dia é cumprida ao longo da semana, ela precisa ser registrada em algum lugar. A **Caderneta de Campanha** é onde o discípulo anota o que foi pedido e o que foi cumprido: o versículo memorizado, a reconciliação buscada, o serviço prestado, a oração mantida.
>
> Ela não é lembrança do curso. É instrumento da lição — nasceu da pedagogia, não de uma loja.
>
> Outras aplicações da marca, ligadas a pertencimento e senso de tropa, estão em estudo e não foram aprovadas. Quando forem tratadas, virão acompanhadas de salvaguardas: uso vinculado a participantes do projeto, nenhuma peça condicionando participação ou avanço, e destinação de eventual receita definida e prestada em conta à liderança.

**Visual**
Mockup da caderneta **aberta**, mostrando o miolo, não a capa. A página visível traz o formulário da Ordem do Dia com campos rotulados: `LIÇÃO`, `DATA`, `AÇÃO`, `REGISTRO`. O miolo ocupa mais área que a capa na composição — a prioridade visual comunica a prioridade conceitual. Rótulo `PROPOSTA` no canto.

**Layout**
Texto nas colunas 1–6, mockup nas colunas 7–12.

---

## ATO IX — O GUIA MESTRE
*Clímax argumentativo. O antagonista é derrotado.*

---

### S58 · O problema que ainda não foi resolvido
**Ato IX · Layout L2 · Fundo Caserna**

**Narrativa**

> Tudo o que você viu até aqui pode funcionar muito bem — e desaparecer em três anos.
>
> Lembre da força que trabalha contra este tipo de trabalho: a perda. O melhor discipulado do mundo, se não estiver documentado, dura exatamente o tempo de permanência de quem o conduz. Instrutor é transferido. Voluntário muda de cidade. Liderança se renova.
>
> Um método que só existe na cabeça de quem o criou não é um método. É um talento — e talento não se replica.

**Visual**
Fundo Caserna. À direita, o mesmo elemento gráfico do slide sobre a perda: cinco pequenos quadrados em latão perdendo opacidade de cima para baixo. A repetição do elemento é intencional e liga os dois momentos sem precisar dizer que os liga.

**Layout**
Texto nas colunas 1–7, elemento nas colunas 10–11.

---

### S59 · O que é o Guia Mestre
**Ato IX · Layout L4**

**Narrativa**

> O Guia Mestre do Discipulando a Caserna é a resposta a esse problema.
>
> Ele é a referência oficial do programa — um vade mecum espiritual que reúne a doutrina, o método, a estrutura das 48 lições, os ritos de transição e as regras de governança em um documento único.
>
> Ele não existe para engessar o que Deus faz. Existe para guardar, nutrir e conduzir: guardar o que já foi aprendido, nutrir quem vai conduzir, e conduzir o discípulo por um caminho que alguém pensou inteiro antes de ele começar a andar.

**Visual**
Mockup da capa do Guia Mestre em perspectiva leve, com espessura visível — o volume do documento faz parte do argumento. Ao lado, em Legenda, os dados do documento: `v1.0-RC · 8 capítulos · 48 lições · Fortaleza, 2026`.

**Layout**
Texto nas colunas 1–6, mockup nas colunas 8–11.

---

### S60 · As quatro exigências que o Guia assumiu
**Ato IX · Layout L5**

**Narrativa**

> O documento foi escrito com quatro obrigações declaradas desde a primeira página.

*(Quatro cartões)*
**Unificar a doutrina** — que todos ensinem a mesma coisa, com a mesma ênfase.
**Servir de referência ao instrutor** — que ninguém precise improvisar o que já foi decidido.
**Estabelecer jornada progressiva** — que o discípulo saiba onde está e para onde vai.
**Garantir replicabilidade fiel** — que o programa possa existir sem quem o escreveu.

*(Abaixo)*
> A quarta é a mais importante, e é a que resolve o problema do slide anterior.

**Visual**
Quatro cartões em linha. O quarto com borda em latão de 2px, destacando-se dos demais.

**Layout**
Cartões nas colunas 1–12, fecho nas colunas 1–7.

---

### S61 · Um conteúdo, três profundidades
**Ato IX · Layout L5**

**Narrativa**

> O material se organiza em três edições, cada uma para um uso diferente.

*(Três cartões)*
**Guia Mestre** — doutrina, método, estrutura e governança. Destinado à liderança e à formação de instrutores. É o documento de referência.
**Edição do Instrutor** — a condução de cada lição, com notas pastorais, sugestões de aplicação e as perguntas de reflexão comentadas.
**Edição do Aluno** — o texto da lição, o espaço de registro e a Ordem do Dia da semana.

*(Abaixo)*
> É um só conteúdo em três níveis de profundidade. Isso significa que o discípulo, o instrutor e a liderança estão sempre falando exatamente da mesma coisa.

**Visual**
Três cartões de alturas escalonadas — o Guia Mestre mais alto, a Edição do Instrutor intermediária, a do Aluno menor — sugerindo profundidade sem hierarquia de valor. Cada um com um mockup esquemático de capa em traço fino.

**Layout**
Cartões nas colunas 2–11.

---

### S62 · Como isso torna o programa replicável
**Ato IX · Layout L4**

**Narrativa**

> Aqui está o efeito prático de tudo isso.
>
> Um instrutor formado, em qualquer unidade, em qualquer cidade, abre o mesmo documento e conduz a mesma lição, com a mesma sequência interna e a mesma ênfase teológica. O discípulo que passa por ele recebe o que receberia em qualquer outro lugar onde o programa exista.
>
> **A qualidade deixa de depender do talento de quem ensina e passa a depender da fidelidade ao que está escrito.** Isso não elimina o dom pessoal — apenas garante que a ausência dele não comprometa o resultado.

**Visual**
Diagrama de replicação: um bloco central rotulado `GUIA MESTRE`, do qual saem quatro filetes para quatro blocos idênticos rotulados `UNIDADE A`, `UNIDADE B`, `UNIDADE C`, `UNIDADE D`. Os quatro blocos são graficamente idênticos entre si — a identidade visual entre eles é o argumento do slide.

**Layout**
Texto nas colunas 1–6, diagrama nas colunas 7–12.

---

### S63 · O que o Guia deliberadamente não faz
**Ato IX · Layout L3**

**Narrativa**

> É importante dizer também os limites do documento, porque método sem limite vira legalismo.

*(Coluna esquerda)*
**O Guia não substitui**
> Não substitui o Espírito Santo, que é quem de fato forma. Não dispensa sensibilidade pastoral diante do caso concreto. Não impede que o instrutor adapte a linguagem ao seu grupo.

*(Coluna direita)*
**O Guia estabelece**
> Ajustes pedagógicos são bem-vindos e esperados. Alteração doutrinária, não: ela exige deliberação pastoral formal, e não decisão individual de quem estiver conduzindo.

*(Abaixo)*
> O documento é versionado, as alterações são registradas, e há previsão de instância responsável pela guarda doutrinária. É isso que permite que o programa sobreviva ao seu autor — que é, no fim das contas, o objetivo dele.

**Visual**
Duas colunas com filete separador. Abaixo, uma linha de versionamento esquemática: três marcadores em sequência rotulados `v1.0-RC`, `v1.0`, `v1.1`, com o primeiro preenchido e os outros vazados.

**Layout**
Colunas 1–5 e 8–12, linha de versionamento em largura total.

---

## ATO X — O HORIZONTE
*Visão futura e fechamento em espelho.*

---

### S64 · O que ainda não existe
**Ato X · Layout L5**

**Narrativa**

> Antes de falar do que vem pela frente, é honesto listar o que ainda não está pronto. A clareza sobre as pendências é o que dá crédito ao que já está feito.

*(Três cartões, todos com rótulo `EM PLANEJAMENTO`)*
**Formação de instrutores** — o Guia forma o discípulo; falta um percurso formal para formar quem forma. É a pendência mais crítica das três.
**Apêndices Pastorais** — dois documentos companheiros para situações de crise aguda: *A Marcha da Liberdade*, associada ao Capacete da Salvação, e *Vigília na Tempestade*, associada à Espada do Espírito.
**Caderno de Identidade Visual** — a consolidação das regras de uso da marca e dos símbolos.

*(Abaixo, em faixa)*
> **Limites de escopo, declarados:** nada disso substitui acompanhamento profissional, jurídico ou clínico. O projeto não faz promessas sobre processos institucionais ou progressão de pena. Toda condução acontece em comunhão com a igreja e, onde houver, com a capelania.

**Visual**
Três cartões com borda tracejada e rótulo em Rótulo no canto superior. Faixa de limites com fundo em Estrutura de baixa opacidade, texto em chumbo, ocupando largura total.

**Layout**
Cartões nas colunas 1–12, faixa abaixo em largura total.

---

### S65 · Para onde isso cresce
**Ato X · Layout L4**

**Narrativa**

> O caminho de expansão tem uma ordem, e ela não é definida por oportunidade.
>
> Começa no ambiente de reclusão militar, onde o projeto nasceu. Avança para as unidades operacionais, alcançando o militar em serviço ativo. Chega à igreja local, que recebe e dá continuidade. Alcança as famílias, porque a ferida nunca é só do militar. E só então se articula com capelanias e corporações coirmãs, e eventualmente com outros estados.
>
> Cada etapa depende da anterior estar consolidada. Crescer fora dessa ordem produziria alcance sem profundidade — que é exatamente o oposto do que este programa se propõe.

**Visual**
Cinco anéis concêntricos, do centro para fora, rotulados na ordem: `RECLUSÃO`, `UNIDADES`, `IGREJA`, `FAMÍLIAS`, `ARTICULAÇÃO`. O anel central preenchido em latão sólido; os demais com preenchimento progressivamente mais fraco, e o quinto apenas contornado. A expansão concêntrica comunica que nada substitui o centro.

**Layout**
Texto nas colunas 1–6, anéis nas colunas 8–11.

---

### S66 · Os três critérios que não se negociam
**Ato X · Layout L5**

**Narrativa**

> E qualquer expansão está condicionada a três critérios. Eles existem porque a tentação natural de todo projeto que dá certo é crescer mais rápido do que consegue sustentar.

*(Três cartões)*
**Fidelidade doutrinária** — não relativizar o que o Guia estabeleceu para agradar a um contexto novo.
**Coerência pedagógica** — não pular etapas por pressa, nem comprimir módulos para caber num calendário.
**Integridade pastoral** — não sacrificar o cuidado com as almas em nome do alcance.

*(Abaixo)*
> Se em algum momento crescer significar violar um destes três, o projeto não cresce.

**Visual**
Três cartões de largura igual, com um filete horizontal em latão atravessando os três na base — sugerindo que funcionam como um piso comum, não como itens de uma lista.

**Layout**
Cartões nas colunas 2–11, fecho centralizado.

---

### S67 · A meta não é numérica
**Ato X · Layout L1**

**Narrativa**

> A pergunta que mede este projeto não é quantas turmas foram abertas, nem quantos certificados foram entregues, nem quantas unidades foram alcançadas.
>
> A pergunta é: **quantos discípulos se tornaram capazes de formar outros?**
>
> Porque, como você leu no começo desta apresentação: um homem evangelizado é um homem alcançado. Um homem discipulado é uma linhagem.

**Visual**
Nenhum elemento gráfico. Fundo Base. A pergunta em D1; a última frase em Corpo, separada por filete em latão.

**Layout**
Centralizado, colunas 3–10.

**Comportamento**
Retorno literal da frase plantada no Ato III. O leitor deve reconhecê-la.

---

### S68 · A mesma caverna
**Ato X · Layout L8 · Fundo Sombra**

**Narrativa**

> Termino onde comecei.
>
> Aquele homem do início desta apresentação — o que chegou com a farda e com a vergonha, convencido de que Cristo tinha ido embora na hora da desonra — está sentado numa sala com uma Bíblia aberta.
>
> Só que agora ele não é quem chegou. Ele é quem recebe.
>
> Diante dele há outro homem, que acabou de entrar, e que carrega exatamente o que ele carregava.
>
> **A caverna é a mesma. Mudou quem está em cada cadeira.**

**Visual**
A ilustração da caverna dos slides S02 e S26 retorna pela terceira e última vez, na mesma escala e posição. Desta vez, no interior da caverna, há duas formas geométricas simples e frontais — dois retângulos verticais de proporções humanas, sem traço figurativo, um de frente para o outro, com um pequeno retângulo horizontal entre eles sugerindo um livro aberto sobre uma mesa. Nenhum rosto, nenhuma feição, nenhuma identificação.

**Layout**
Texto nas colunas 1–6, ilustração nas colunas 8–12 com sangria à direita. A última frase em D2.

---

### S69 · Fechamento
**Ato X · Layout L1 · Fundo Sombra**

**Narrativa**

> **De quebrantados, valentes.**

> *"aquele que começou boa obra em vocês há de completá-la"* — Filipenses 1.6

> Este versículo está no certificado de cada marcha, e está aqui pelo mesmo motivo. O que foi construído até agora não é obra de quem escreveu, e o que vier também não será. O trabalho foi apenas organizar, em papel, aquilo que já se via acontecer numa caverna.

*(Rodapé institucional)*
Projeto Caserna de Adulão · CNPJ 63.724.286/0001-78
Discipulando a Caserna · Guia Mestre v1.0-RC · Fortaleza, 2026

**Visual**
Fundo Sombra. A barra da armadura no topo aparece **completa pela primeira e única vez**, com as quatro peças acesas em latão. Abaixo do texto, o emblema do projeto em escala reduzida — cerca de 8% da altura da tela —, fechando o ciclo iniciado no primeiro slide.

**Layout**
Frase-âncora em D1, centralizada. Citação em estilo Escritura, abaixo. Parágrafo em Corpo, colunas 3–10. Rodapé institucional em Legenda, centralizado, no pé da área útil.

**Comportamento**
Terceira e última aparição da frase-âncora. Nenhum botão de reinício, nenhuma chamada para ação, nenhum "obrigado". O documento termina em silêncio.

---

# PARTE C — NOTAS DE PRODUÇÃO

## C.1 Adaptação por público

Esta é a versão institucional plena. As demais são recortes desta, não peças distintas.

| Público | Slides mantidos | Ajustes |
|---|---|---|
| **Apreciação / decisão** | Todos, mais o bloco de decisões após S63 | Manter "você" de leitura; acrescentar telas de homologação, convite ao prefácio e "se a resposta for não" em voz institucional (liderança pastoral em 3ª pessoa — sem tratar o leitor como o pastor) |
| **Institucional / comando** | S01–S12, S20–S37, S64–S69 | Suprimir Ato VII quase inteiro; reforçar limites de escopo do S64 |
| **Igreja local** | S01–S19, S26–S37, S64–S69 | Suprimir Atos VII e IX; acrescentar chamada à participação |
| **Formação de instrutores** | S38–S63 integralmente | Suprimir Atos I e II; abrir direto no método |

## C.2 Impressão

Todo o conteúdo precisa existir na versão impressa, inclusive o que hoje está sob interação. Os sete blocos do slide S47 e os quatro filtros do S46 devem ser renderizados abertos e completos ao imprimir. Nenhuma informação pode depender de toque.

## C.3 Regras que não devem ser violadas na execução

1. O emblema não é explicado antes do slide S52.
2. A frase-âncora aparece exatamente três vezes: S04, S31 e S69.
3. Os quatro slides silenciosos — S12, S19, S29 e S67 — não recebem elementos gráficos nem texto adicional.
4. A ilustração da caverna aparece três vezes, sempre na mesma escala e posição: S02, S26 e S68.
5. Nenhum slide se refere a outro por número. Quando algo precisa ser lembrado, é reescrito por extenso.
6. Nenhum número de alcance é usado como argumento de valor. O projeto conta homens, não métricas.

## C.4 Teste de validação

Entregue o link a alguém que não conheça o projeto, sem nenhuma explicação prévia, e peça que responda depois a três perguntas: *o que é isto, por que existe, e o que se espera de quem lê?* Se as três respostas vierem corretas, a apresentação cumpriu o objetivo de ser autoexplicativa.

---

*Plano de slides v1.0 — Fortaleza, 2026. Conteúdo doutrinário rastreável ao Guia Mestre do Discipulando a Caserna v1.0-RC. O homem descrito nos Atos II e X é composição narrativa e não corresponde a caso individual identificável.*
