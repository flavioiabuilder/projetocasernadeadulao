---
titulo: "O Sistema — Método de produção de sites profissionais com Inteligência Artificial"
autor: "Flávio Alves da Costa"
versao: "1.0"
data: "2026-07-31"
idioma: pt-BR
descricao: >
  Método completo em nove fases para produzir sites profissionais com ferramentas
  de IA (Claude Design, Claude Code, Cursor, Figma, Google Stitch), cobrindo
  mapeamento de nicho, curadoria de referências, design tokens, design system,
  prototipagem, implementação, QA e evolução.
tags:
  [web-design, design-system, design-tokens, ia, claude-code, figma, seo, acessibilidade]
---

# O Sistema

> **NOTA DE ADAPTAÇÃO (deste repositório — não faz parte do documento original).**
> Este arquivo é a **doutrina-fonte** do método, mantida verbatim para consulta.
> A camada operacional vive em [`README.md`](README.md) e [`PIPELINE.md`](PIPELINE.md).
> Onde o repositório diverge do texto, **o repositório prevalece** e a divergência
> está registrada:
>
> | Documento diz                 | Aqui é                              | Onde está registrado                                                                     |
> | ----------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------- |
> | Repositório `metodo-web`      | `metodo/` na raiz deste repositório | [ADR-007](../docs/arquitetura/ADR-007-camada-metodo-o-sistema.md)                        |
> | Cor em OKLCH                  | hex-first no piloto; sem mandato    | [`CONVENCOES.md`](CONVENCOES.md) — seção Cor                                             |
> | Astro / Next / Tailwind       | HTML+CSS+JS estático                | [ADR-001](../docs/arquitetura/ADR-001-stack-do-projeto.md)                               |
> | `CLAUDE.md` na raiz           | `AGENTS.md` + `.cursor/rules/`      | [`templates/projeto-web/05-regras-agente.md`](templates/projeto-web/05-regras-agente.md) |
> | `skills/` dentro de `metodo/` | `.claude/skills/` é canônico        | [ADR-006](../docs/arquitetura/ADR-006-ferramentas-de-ia.md)                              |
>
> Anti-padrões operacionais: [`ANTIPADROES.md`](ANTIPADROES.md).
> Glossário: [`GLOSSARIO.md`](GLOSSARIO.md).

## Método de produção de sites profissionais com Inteligência Artificial

_Do mapeamento de nicho ao deploy: como transformar ferramentas de IA em uma linha de produção de design de alto padrão._

---

## Sumário executivo

Existe uma pergunta que quase todo mundo faz errado. A pergunta errada é _"qual o melhor prompt para a IA criar um site bonito?"_. A pergunta certa é _"que informação eu preciso ter em mãos antes de escrever qualquer prompt?"_.

Este documento responde à segunda pergunta. Ele descreve um método completo — nove fases, do diagnóstico de nicho ao lançamento e evolução — para produzir sites profissionais usando ferramentas de IA como Claude Design, Claude Code, Cursor, Figma e Google Stitch, apoiado em bancos de referência como Dribbble, Behance e Awwwards.

A tese central é simples e desconfortável: **a IA não é o gargalo da qualidade; a especificação é.** Duas pessoas com as mesmas ferramentas produzem resultados opostos porque uma delas chega com um dossiê e a outra chega com uma frase. Este documento é o manual para construir o dossiê — e para transformá-lo em uma linha de montagem repetível.

O que você encontra aqui:

- **Parte I — A tese.** Por que a IA regride ao genérico e qual é o mecanismo exato para vencer isso.
- **Parte II — O pipeline.** Nove fases operacionais, cada uma com objetivo, procedimento, entregável e critério de aceite.
- **Parte III — O arsenal.** Biblioteca de prompts, matriz de ferramentas, checklists, estrutura de arquivos, anti-padrões, glossário e um roteiro de 21 dias.

Leia a Parte I uma vez. Volte à Parte II a cada projeto. Mantenha a Parte III aberta enquanto trabalha.

---

# PARTE I — A TESE

## 1. O paradoxo do prompt perfeito

Dois profissionais recebem o mesmo briefing: um site para uma clínica odontológica de médio porte. Ambos assinam as mesmas ferramentas. Ambos sabem escrever prompt.

O primeiro abre a ferramenta e digita: _"crie uma landing page moderna e profissional para uma clínica odontológica, com hero, serviços, depoimentos e formulário de contato."_ Em quarenta segundos ele tem uma página. Ela é limpa, responsiva, tecnicamente correta — e absolutamente intercambiável. Troque a palavra "odontológica" por "veterinária" e nada quebra. Troque por "escritório de advocacia" e nada quebra. Essa é a definição operacional de genérico: **um artefato cuja identidade sobrevive à troca do assunto.**

O segundo passa três horas antes de tocar em qualquer ferramenta. Ele descobre que a maioria dos pacientes daquele tipo de clínica chega por indicação, que a objeção número um não é preço mas medo de dor, que os concorrentes locais usam todos o mesmo azul-clínico institucional, e que o diferencial real do cliente é uma técnica de sedação consciente que quase ninguém explica direito. Só então ele escreve o prompt — e o prompt tem novecentas palavras, referências anotadas, uma paleta definida em OKLCH e uma lista de nove componentes com estados especificados.

O segundo profissional não é melhor em IA. Ele é melhor em **especificação**. É exatamente aí que mora o segredo.

> **PRINCÍPIO —** A IA não amplia o seu talento. Ela amplia a sua clareza. Onde você é vago, ela preenche com a média da internet. Onde você é preciso, ela executa com uma velocidade que nenhum humano acompanha.

## 2. Por que a IA produz design genérico

Isso não é um defeito a ser corrigido com um prompt mais esperto. É uma consequência de como esses modelos funcionam, e entender o mecanismo muda a forma como você trabalha.

Um modelo generativo aprende a distribuição estatística do que viu. Quando você dá pouca informação, a resposta mais provável é também a mais comum — a média. E a média do design web dos últimos anos tem uma cara muito reconhecível:

- Hero centralizado, headline em duas linhas, dois botões (um sólido, um fantasma).
- Três ou quatro cards com ícone no topo, título e dois parágrafos.
- Gradiente roxo-para-azul; ou fundo creme com serifada de alto contraste e acento terracota.
- Faixa de logos "confiado por", carrossel de depoimentos, FAQ em acordeão, CTA final.
- Raio de 12px em tudo, sombra suave, _fade-in_ no scroll.

Nada disso é errado. Tudo isso é **previsível**. E design profissional é, por definição, um desvio deliberado da previsibilidade — um desvio que existe porque foi justificado por algo real: o público, o setor, a mensagem, o diferencial.

Daí a fórmula operacional do método:

> **PRINCÍPIO —** Qualidade = (Especificação × Iteração dirigida) ÷ Ambiguidade. Você não melhora o resultado aumentando o esforço da IA. Você melhora reduzindo a ambiguidade da entrada e estruturando os ciclos de crítica.

Há um corolário pouco discutido: **quanto melhor o modelo, mais caro fica um briefing ruim.** Um modelo fraco produz algo obviamente ruim e você percebe na hora. Um modelo forte produz algo bonito, competente e completamente errado para o problema — e você descobre depois de três semanas de desenvolvimento. Ferramenta excelente com especificação pobre é a armadilha mais cara do mercado hoje.

## 3. O ativo não é o prompt. É a especificação.

Colecionar prompts é a distração favorita de quem está começando. Prompt é descartável: serve a um modelo, a uma versão, a um contexto. Em seis meses, metade dos "prompts mágicos" que você guardou estará obsoleta.

O que não fica obsoleto são os **artefatos de especificação** — documentos estruturados que descrevem o problema e a solução com precisão suficiente para qualquer executor, humano ou máquina, produzir a coisa certa.

Este método produz cinco artefatos permanentes, e eles são o verdadeiro patrimônio do processo:

| #   | Artefato                      | Formato               | Responde à pergunta                                  |
| --- | ----------------------------- | --------------------- | ---------------------------------------------------- |
| 01  | Briefing Estratégico          | Markdown              | Para quem, por quê, contra quem, dizendo o quê?      |
| 02  | Painel de Referências Anotado | Markdown + imagens    | Como isso deve parecer, e por que exatamente assim?  |
| 03  | Design Tokens                 | JSON + CSS            | Quais são as constantes visuais inegociáveis?        |
| 04  | Manual do Design System       | Markdown + Figma      | Quais peças existem, em que estados, com que regras? |
| 05  | Regras do Agente              | CLAUDE.md / AGENTS.md | Como o código deve ser escrito neste projeto?        |

Esses cinco arquivos são o _contexto composto_ que você injeta em qualquer ferramenta. Eles viajam entre modelos, entre projetos, entre equipes. São reutilizáveis, versionáveis e, com o tempo, viram o seu diferencial competitivo — porque ninguém copia o seu método olhando o site pronto.

> **ARMADILHA —** Guardar prompts e não guardar especificações. Prompt sem especificação é pedir para um arquiteto desenhar sua casa por telefone. A especificação é a planta; o prompt é apenas o telefonema.

## 4. A Lei do Contexto Composto

Contexto composto é o princípio de que a qualidade do output cresce de forma não-linear quando você fornece **camadas diferentes** de informação — e não mais informação do mesmo tipo.

São cinco camadas, em ordem crescente de raridade. E é a raridade que carrega o valor:

1. **Camada de intenção** — objetivo de negócio, público, ação desejada. _(Quase todo mundo fornece.)_
2. **Camada de restrição** — o que não pode existir, o que o setor exige, limites técnicos e legais. _(Poucos fornecem.)_
3. **Camada de referência** — exemplos concretos com anotação do que extrair de cada um. _(Raros fornecem.)_
4. **Camada de sistema** — tokens, componentes, nomenclatura, estados. _(Muito raros.)_
5. **Camada de julgamento** — critérios explícitos de aceite e rejeição. _(Praticamente ninguém.)_

O salto entre um profissional mediano e um excelente acontece nas camadas 3, 4 e 5. A boa notícia é que essas camadas são **acumulativas entre projetos**: o seu segundo site sai mais rápido que o primeiro não porque você prompta melhor, mas porque você já tem sistema.

## 5. Os quatro papéis que você não pode delegar

A IA executa. Ela não decide. Em qualquer projeto sério você ocupa quatro cadeiras, e nenhuma delas é terceirizável:

**O Estrategista** decide o que o site precisa fazer e para quem. Define proposta de valor, hierarquia de mensagem e o que fica de fora. A IA pesquisa e organiza; não escolhe posicionamento.

**O Diretor de Arte** decide como aquilo deve parecer e por quê. Escolhe a tensão visual, o desvio deliberado da média, o elemento-assinatura. A IA gera dez direções; não julga qual é verdadeira para a marca.

**O Arquiteto de Sistema** decide como as peças se organizam. Define tokens, componentes, contratos, estrutura de código. A IA implementa; não define o modelo mental.

**O Editor** decide o que é bom o bastante para sair. É o papel mais subestimado e o que mais separa amador de profissional. A IA nunca vai dizer "isso está mediano, refaz". Você vai.

> **PRINCÍPIO —** O trabalho humano migrou da execução para o julgamento. Quem só sabe executar compete com uma máquina que executa mais rápido. Quem sabe julgar pilota a máquina.

---

# PARTE II — O PIPELINE

O pipeline tem nove fases. Cada uma tem um **objetivo**, um **procedimento**, um **entregável** e um **critério de aceite**. A regra de ouro é: não avance de fase sem o entregável da anterior. Pular fase não economiza tempo — transfere o tempo para o retrabalho, com juros.

| Fase | Nome                     | Entregável               | Tempo típico |
| ---- | ------------------------ | ------------------------ | ------------ |
| 0    | Preparação do ambiente   | Repositório-método       | Uma vez, 4h  |
| 1    | Mapeamento de nicho      | Briefing Estratégico     | 3–6h         |
| 2    | Curadoria de referências | Painel Anotado           | 2–4h         |
| 3    | Direção de arte e tokens | tokens.json + tokens.css | 3–5h         |
| 4    | Design system            | Manual do Sistema        | 4–8h         |
| 5    | Prototipagem com IA      | Protótipo aprovado       | 2–6h         |
| 6    | Implementação            | Código em repositório    | 8–24h        |
| 7    | Qualidade e conformidade | Relatório de QA          | 3–5h         |
| 8    | Entrega e evolução       | Handoff + roadmap        | 2–4h         |

---

## Fase 0 — Preparação do ambiente

**Objetivo.** Construir uma vez a infraestrutura que serve a todos os projetos futuros. Esta fase não se repete; ela se aprimora.

### 0.1 O repositório-método

Crie um repositório privado chamado, por exemplo, `metodo-web`. Ele não contém projetos: contém o _modo de fazer_ projetos.

```
metodo-web/
├── templates/
│   ├── 01-briefing-estrategico.md
│   ├── 02-painel-referencias.md
│   ├── 03-tokens.json
│   ├── 04-manual-sistema.md
│   └── 05-CLAUDE.md
├── prompts/
│   ├── descoberta.md
│   ├── analise-concorrencia.md
│   ├── direcao-arte.md
│   ├── critica-estruturada.md
│   └── qa-visual.md
├── skills/
│   ├── design-tokens/SKILL.md
│   ├── auditoria-a11y/SKILL.md
│   └── copy-conversao/SKILL.md
├── checklists/
│   ├── pre-lancamento.md
│   └── revisao-design.md
└── biblioteca/
    ├── referencias/          # capturas anotadas por setor
    └── decisoes/             # registro de decisões e seus resultados
```

O diretório `biblioteca/decisoes/` é o mais valioso e o que quase ninguém mantém. Ali você registra, em uma linha por projeto: qual decisão de design foi tomada, por quê, e qual foi o resultado medido. Depois de doze projetos, esse arquivo vale mais que qualquer curso.

### 0.2 Ferramentas base

- **Um agente de código com acesso ao sistema de arquivos** — Claude Code ou Cursor. Não negociável.
- **Uma ferramenta de canvas/exploração visual** — Claude Design, Google Stitch ou Figma com IA.
- **Figma** — mesmo que você gere no código, ele continua sendo o repositório canônico de sistema visual para trabalho com terceiros.
- **Node.js e Git** — base de tudo.
- **Navegador com Lighthouse e um leitor de tela** (NVDA no Windows, VoiceOver no Mac).

### 0.3 Convenções que você define agora e nunca mais discute

Escolha e registre: unidade base de espaçamento (4 ou 8px), sistema de cor (OKLCH ou HSL), convenção de nomes de token, framework padrão, biblioteca de componentes padrão, padrão de commit. Decisões tomadas uma vez, no frio, valem mais do que decisões tomadas trinta vezes, no calor do projeto.

> **CRITÉRIO DE ACEITE —** Você consegue começar um projeto novo copiando uma pasta e preenchendo cinco arquivos.

---

## Fase 1 — Mapeamento de nicho

**Objetivo.** Sair da genérica "site para dentista" e chegar a uma descrição do problema tão específica que ela sozinha já sugere o design.

Esta é a fase que mais gente pula e a que mais determina o resultado. Um site profissional não é um site bonito: é um site que resolve o problema comercial de alguém específico melhor do que as alternativas disponíveis.

### 1.1 As sete perguntas de descoberta

Se você tem cliente, faça essas perguntas a ele. Se o projeto é seu, responda-as por escrito — a escrita é o que revela o que você ainda não sabe.

1. **Quem é a pessoa que precisa disso?** Não "empresas de tecnologia". Uma pessoa: cargo, contexto, o que ela estava fazendo cinco minutos antes de procurar por você.
2. **Qual trabalho ela está tentando realizar?** A lógica de _jobs to be done_: ninguém quer um site; querem agendar, comprar, confiar, decidir.
3. **O que ela usa hoje e por que isso a irrita?** Aqui mora a proposta de valor.
4. **Qual é a objeção número um?** Preço, medo, tempo, confiança, complexidade. A objeção principal define a arquitetura da página.
5. **Que prova convence essa pessoa?** Número, depoimento, credencial, demonstração, garantia, portfólio. Setores diferentes confiam em provas diferentes.
6. **Qual é a única ação que importa?** Um site com cinco objetivos não tem nenhum.
7. **Como o sucesso será medido?** Se ninguém sabe responder, você está fazendo decoração, não design.

### 1.2 Análise competitiva estruturada

Selecione de cinco a oito concorrentes: três diretos locais, dois de referência nacional, dois de fora do setor que resolvem problema análogo, e um "melhor da categoria" mundial. Preencha uma matriz:

| Concorrente | Promessa da dobra | Prova principal | Estrutura de página | Paleta | Tom | O que faz bem | Buraco explorável |
| ----------- | ----------------- | --------------- | ------------------- | ------ | --- | ------------- | ----------------- |

A coluna que importa é a última. Ela responde: **onde o setor inteiro está sendo preguiçoso?** É esse buraco que vira o diferencial visual e de mensagem.

### 1.3 Convenções de setor: o que você não pode inventar

Todo nicho tem convenções que funcionam como sinalização de confiança. Quebrá-las por estética custa conversão.

- **Saúde** — credenciais visíveis, foto de equipe real, endereço e registro profissional acima da dobra, linguagem sóbria.
- **Jurídico** — áreas de atuação claras, ausência de promessa de resultado, formalidade tipográfica.
- **SaaS B2B** — screenshot do produto na primeira tela, preço transparente ou explicitamente sob consulta, integração e segurança.
- **Serviço local** — telefone e WhatsApp clicáveis, bairro atendido, avaliações do Google, horário.
- **E-commerce** — foto grande, preço, frete, prazo, política de troca, selo de pagamento.
- **Educação** — grade curricular, corpo docente, certificação, formato e carga horária.
- **Setor público / institucional** — acessibilidade digital, transparência, identidade visual normatizada.

> **PRINCÍPIO —** Inove na atmosfera, nunca na convenção. O usuário do nicho tem um mapa mental do que espera encontrar; quem apaga o mapa perde o usuário antes de impressioná-lo.

### 1.4 Arquitetura de mensagem

Antes de qualquer layout, escreva em texto puro:

- **Uma frase de posicionamento:** _"Para [público] que [situação], [marca] é [categoria] que [benefício único], diferente de [alternativa], porque [razão para crer]."_
- **Três provas** que sustentam a frase.
- **Cinco objeções** e a resposta de cada uma.
- **A sequência lógica da página:** que pergunta cada seção responde, na ordem em que a pessoa a faz.

Essa sequência **é** o wireframe. Quem escreve isso antes não precisa de wireframe.

### 1.5 Entregável: Briefing Estratégico

Um arquivo Markdown com: contexto do negócio, público e JTBD, matriz competitiva, convenções obrigatórias do setor, arquitetura de mensagem, restrições (técnicas, legais, de marca, de prazo), métricas de sucesso e critérios explícitos de rejeição.

> **CRITÉRIO DE ACEITE —** Um profissional que nunca ouviu falar do cliente consegue explicar, lendo só o briefing, por que o site será do jeito que será.

---

## Fase 2 — Curadoria de referências

**Objetivo.** Substituir "faz algo moderno" por um vocabulário visual concreto e justificado.

### 2.1 Onde buscar

| Fonte                                       | Serve melhor para                               | Cuidado                                                    |
| ------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------- |
| **Awwwards**                                | Direção de arte ousada, motion, experiências    | Muitos casos são vitrine, não conversão                    |
| **Land-book**                               | Landing pages reais de produtos reais           | Viés forte para SaaS                                       |
| **Godly**                                   | Curadoria de sites com alto nível estético      | Volume menor                                               |
| **SiteInspire**                             | Filtro por estilo, tipo e setor                 | Catálogo mais conservador                                  |
| **Lapa Ninja / One Page Love**              | Landing pages por categoria                     | Repetição de padrões                                       |
| **Mobbin / Page Flows**                     | Fluxos reais de produto, tela a tela            | Foco em app, não site institucional                        |
| **Dribbble**                                | Ideias de detalhe: micro-interação, ícone, card | Muita peça irreal, que não sobrevive a conteúdo de verdade |
| **Behance**                                 | Casos completos com racional de branding        | Apresentações mais vendem do que informam                  |
| **Refero / Navbar.gallery / Footer.design** | Padrões de componente específico                | Uso pontual                                                |
| **Really Good Emails**                      | Sistema de marca aplicado fora do site          | Só e-mail                                                  |
| **Concorrentes e adjacentes**               | Convenção do setor                              | Não confunda com inspiração estética                       |

Regra de proporção: **60% de referências do setor** (para acertar a convenção), **30% de fora do setor** (para achar a diferenciação), **10% fora da web** — embalagem, editorial, sinalização, arquitetura. As melhores ideias visuais raramente vêm de outros sites.

### 2.2 O método dos três eixos

Referência não se coleta inteira. Colete-a por eixo, separadamente, porque cada eixo pode vir de uma fonte diferente:

- **Eixo A — Estrutura.** Como a informação é organizada: densidade, grid, ritmo de seções, tratamento da dobra.
- **Eixo B — Atmosfera.** Cor, luz, textura, tipografia, temperatura emocional.
- **Eixo C — Detalhe.** Micro-interações, estados, cantos, sombras, ícones, transições.

Combinar estrutura de A com atmosfera de B e detalhe de C produz algo novo. Copiar tudo de uma só referência produz plágio — e plágio, em web, é notado.

### 2.3 A anotação é o produto, não a imagem

Uma referência sem anotação é decoração de pasta. Cada item do painel recebe três linhas obrigatórias:

- **O que eu extraio daqui:** _(uma decisão específica e implementável)_
- **Por que serve a este projeto:** _(ligação explícita com o briefing)_
- **O que eu descarto:** _(o que existe na referência e não vem junto)_

Exemplo real de anotação bem-feita:

> **Referência:** página de produto de uma marca de café de origem.
> **Extraio:** a barra fixa de contexto no topo que mostra origem, altitude e torra — resolve a necessidade de exibir credenciais técnicas sem poluir o hero.
> **Por quê:** o briefing exige que registro profissional e credenciais apareçam acima da dobra, e o hero já está sob pressão.
> **Descarto:** a paleta terrosa e a serifada — pertencem ao universo do café, não ao da clínica.

### 2.4 Extrair princípio, não copiar layout

A diferença entre inspiração e cópia é a camada em que você opera. Copiar layout é reproduzir a solução. Extrair princípio é entender o problema que a solução resolveu e reaplicar o raciocínio ao seu contexto.

Pergunte de cada referência que te impressionou: _que problema esse elemento resolveu?_ Se você não sabe responder, ainda não está pronto para usá-la.

> **ARMADILHA —** Montar um painel de vinte peças lindas e incompatíveis entre si. Um painel coerente tem de seis a dez itens e passa no teste da frase: você consegue descrever a direção visual em uma frase que não use as palavras "moderno", "limpo" ou "minimalista".

### 2.5 Entregável: Painel de Referências Anotado

Markdown com capturas, agrupadas por eixo, cada uma com as três linhas de anotação, e ao final: **a frase de direção** — a sentença única que resume a atmosfera pretendida, escrita de forma que um terceiro consiga julgar se o resultado a cumpriu.

> **CRITÉRIO DE ACEITE —** A frase de direção é específica o bastante para excluir 90% dos sites existentes.

---

## Fase 3 — Direção de arte e tokens

**Objetivo.** Converter atmosfera em números. Um design system começa quando a subjetividade vira variável.

### 3.1 Cor

Trabalhe em **OKLCH** sempre que possível: é um espaço perceptualmente uniforme, ou seja, variações iguais de número produzem variações iguais aos olhos. Isso resolve o problema clássico das escalas em HSL, onde o amarelo a 50% de luminosidade parece muito mais claro que o azul a 50%.

Estrutura mínima de paleta:

- **Uma família de marca** em escala de 50 a 950 (onze passos).
- **Uma família neutra** própria, levemente contaminada pelo matiz da marca — cinzas puros deixam a interface morta.
- **Quatro cores semânticas de estado**: sucesso, aviso, erro, informação.
- **Um acento** usado em no máximo 5% da área da tela. Acento que aparece muito deixa de ser acento.

Contraste: mínimo de **4,5:1** para texto normal e **3:1** para texto grande e elementos de interface, conforme WCAG 2.2 nível AA. Verifique também o contraste de foco e de estados desabilitados — é onde quase todo projeto falha.

### 3.2 Tipografia

Escolha duas famílias com papéis distintos e uma terceira apenas se houver dado ou código a exibir:

- **Display** — carrega a personalidade. Usada com restrição, em poucos tamanhos.
- **Texto** — carrega a legibilidade. Precisa de boa altura-x, numerais consistentes e vários pesos.
- **Utilitária/mono** — legendas técnicas, dados, código.

Defina uma **escala modular** e nunca use tamanho fora dela. Razões úteis: 1,200 (menor mudança, interfaces densas), 1,250 (equilibrada), 1,333 (editorial), 1,414 (dramática). Sete passos costumam bastar.

Regras de composição que separam profissional de amador:

- Medida de linha entre **60 e 75 caracteres** em texto corrido.
- Altura de linha inversamente proporcional ao tamanho: títulos grandes entre 1,0 e 1,15; corpo entre 1,5 e 1,7.
- _Tracking_ negativo em títulos grandes (−1% a −3%); positivo em versaletes e rótulos pequenos.
- Um único alinhamento por bloco. Texto centralizado só em blocos curtos.
- Números tabulares em tabelas e preços.

> **PRINCÍPIO —** Tipografia é 70% da percepção de qualidade de um site. É também a decisão que a IA mais erra sozinha, porque ela otimiza para "seguro". Especifique família, pesos, escala e medida — sempre.

### 3.3 Espaço, grid e ritmo

Escolha uma base (4px ou 8px) e derive toda a escala: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Proíba valores fora dela. O ritmo vertical consistente é o que faz uma página "parecer profissional" sem que ninguém saiba dizer por quê.

Defina: largura máxima de conteúdo, calhas, número de colunas por breakpoint, e — o mais importante — **a relação de espaçamento entre seções e dentro de seções**. Espaço entre blocos relacionados deve ser sensivelmente menor que entre blocos não relacionados. Isso é a Lei da Proximidade, e é a diferença entre uma página lida e uma página escaneada com esforço.

Breakpoints sugeridos: 480, 768, 1024, 1280, 1536. Projete **mobile-first** e trate o desktop como o caso de expansão, não o contrário.

### 3.4 Forma, elevação e movimento

- **Raio:** escolha uma escala de três a quatro valores e uma regra de aninhamento (raio interno = raio externo menos o padding).
- **Elevação:** sombras em camadas — nunca uma sombra só. Uma sombra realista tem um componente curto e escuro (contato) e um longo e difuso (ambiente).
- **Movimento:** defina durações (rápido 120ms, padrão 200ms, lento 320ms) e curvas de easing. Entrada e saída usam curvas diferentes. Respeite `prefers-reduced-motion` — não é opcional.

### 3.5 Entregável: tokens

Dois arquivos gerados a partir de uma fonte única:

```json
{
  "color": {
    "brand": { "500": "oklch(0.55 0.18 258)", "600": "oklch(0.48 0.19 258)" },
    "neutral": { "50": "oklch(0.98 0.004 258)", "900": "oklch(0.21 0.02 258)" },
    "semantic": {
      "bg-surface": "{color.neutral.50}",
      "text-primary": "{color.neutral.900}",
      "action-primary": "{color.brand.600}"
    }
  },
  "font": {
    "family": { "display": "Space Grotesk", "body": "Inter", "mono": "JetBrains Mono" },
    "size": { "xs": "0.75rem", "base": "1rem", "xl": "1.5rem", "3xl": "2.986rem" }
  },
  "space": { "1": "4px", "2": "8px", "4": "16px", "8": "32px", "12": "64px" },
  "radius": { "sm": "4px", "md": "8px", "lg": "16px", "full": "9999px" },
  "motion": { "fast": "120ms", "base": "200ms", "ease-out": "cubic-bezier(0.16,1,0.3,1)" }
}
```

Note a estrutura em **duas camadas**: tokens primitivos (`neutral.50`) e tokens semânticos (`bg-surface`) que referenciam os primitivos. Essa separação é o que permite trocar tema, criar modo escuro e mudar a marca sem reescrever componentes. É a decisão de arquitetura mais rentável de todo o sistema.

> **CRITÉRIO DE ACEITE —** Nenhum valor visual do projeto existe fora do arquivo de tokens. Se você encontrar um `#3B82F6` solto no código, o sistema já vazou.

---

## Fase 4 — Design system

**Objetivo.** Transformar tokens em peças reutilizáveis com comportamento definido, para que a IA construa páginas montando, e não inventando.

### 4.1 As quatro camadas

1. **Primitivos** — tokens puros. Não são visíveis; são vocabulário.
2. **Componentes** — botão, campo, card, badge, avatar, tooltip. Peças isoladas com API própria.
3. **Padrões** — combinações recorrentes com semântica: formulário de contato, cabeçalho de seção, bloco de prova social, tabela de preços.
4. **Páginas** — composições de padrões. A página deve ser a camada mais burra do sistema.

Quando um agente de IA tem acesso às camadas 1–3, ele monta a camada 4 com consistência quase perfeita. Quando não tem, ele reinventa cada botão — e é assim que nascem sites com sete tons de azul.

### 4.2 Nomenclatura

Duas camadas, sempre:

- **Primitivo descreve o que é:** `blue-600`, `space-4`, `radius-md`.
- **Semântico descreve para que serve:** `action-primary`, `surface-raised`, `text-muted`, `border-subtle`.

Componentes consomem **apenas** semânticos. Se um componente referencia um primitivo diretamente, ele quebrou o contrato — e vai quebrar o modo escuro no dia em que ele existir.

### 4.3 A matriz de estados

Este é o teste que separa um "kit de UI" de um design system de verdade. Todo componente interativo precisa ter especificados:

| Estado         | Pergunta que responde                         |
| -------------- | --------------------------------------------- |
| Default        | Como é em repouso?                            |
| Hover          | O que sinaliza que é clicável?                |
| Focus-visible  | Como o usuário de teclado sabe onde está?     |
| Active/pressed | Há feedback tátil?                            |
| Disabled       | Está claro que não funciona, e por quê?       |
| Loading        | O que acontece nos 2s de espera?              |
| Error          | O erro diz o que houve e como resolver?       |
| Empty          | A tela vazia orienta ou apenas informa vazio? |
| Overflow       | O que acontece com texto muito longo?         |

Estados vazios e de erro são onde produtos amadores se entregam. Um estado vazio é um convite à ação, não uma lápide. Um erro explica o que aconteceu e o caminho de saída, sem pedir desculpas e sem vaguidade.

### 4.4 Acessibilidade embutida, não anexada

Acessibilidade tratada como etapa final vira remendo. Tratada como propriedade do componente, custa quase nada:

- Área de toque mínima de 44×44px.
- Foco visível com contraste de 3:1 contra o fundo adjacente — nunca `outline: none` sem substituto.
- Hierarquia de cabeçalhos sem pulos (H1 → H2 → H3).
- Rótulo associado a todo campo de formulário; `placeholder` não é rótulo.
- Cor nunca como único portador de informação.
- Imagens com texto alternativo descritivo; decorativas com `alt=""`.
- Ordem do DOM igual à ordem visual de leitura.

### 4.5 O sistema no Figma

Mesmo em fluxo _code-first_, manter o Figma vale a pena porque ele é a língua franca com clientes e designers. Estruture com:

- **Variables** com _modes_ para tema (claro/escuro) e densidade — o espelho direto dos tokens semânticos.
- **Componentes com properties** (variantes booleanas e enums) em vez de dezenas de cópias.
- **Auto Layout em tudo.** Um arquivo sem Auto Layout gera código péssimo via MCP.
- **Nomes semânticos nas camadas.** O agente lê os nomes. `Frame 427` não informa nada; `card/pricing/featured` informa tudo.

Um arquivo Figma bem estruturado não é capricho: é o que determina se a geração de código sai limpa ou vira uma sopa de `div` aninhada.

### 4.6 Entregável: Manual do Sistema

Documento Markdown com inventário de componentes, API de cada um (props, variantes, estados), regras de uso e não-uso, exemplos corretos e incorretos, e princípios de composição. Este arquivo é lido pela IA em toda sessão de implementação.

> **CRITÉRIO DE ACEITE —** É possível montar uma página nova inteira sem criar nenhum componente novo.

---

## Fase 5 — Prototipagem com IA

**Objetivo.** Explorar direções e validar a mais promissora antes de investir em código de produção.

### 5.1 A orquestra: quem faz o quê

Cada ferramenta tem uma vocação. Usar a ferramenta certa na fase certa é metade do ganho de produtividade.

| Ferramenta                        | Vocação real                                                                                                                                        | Melhor momento                                                          | Limite                                                                                      |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **Claude Design**                 | Canvas conversacional que renderiza HTML/CSS/React ao vivo; importa documentos, código e captura de sites; comentários inline e controles de ajuste | Fases 2–5: explorar direções, apresentar proposta, prototipar interação | _Research preview_; edição colaborativa limitada; não substitui o Figma como fonte canônica |
| **Claude Code**                   | Agente de engenharia com acesso ao repositório, skills, subagentes e MCP                                                                            | Fases 6–8: implementação, refatoração, QA automatizado                  | Não tem julgamento estético; precisa de tokens e referência visual                          |
| **Cursor**                        | Editor com agente integrado, ótimo para edição cirúrgica multi-arquivo                                                                              | Fase 6, trabalho fino no código                                         | Contexto menor de projeto do que um agente de terminal em tarefas longas                    |
| **Figma**                         | Fonte canônica do sistema visual; Variables, componentes, Dev Mode; servidor MCP bidirecional                                                       | Fases 3–4 e handoff                                                     | Custa tempo; só compensa com arquivo bem estruturado                                        |
| **Google Stitch**                 | Geração rápida de múltiplas telas a partir de texto ou imagem, com canvas e exportação para Figma e código                                          | Fase 5, exploração de volume e variações                                | Qualidade depende muito do prompt; exportação para Figma varia conforme o agente escolhido  |
| **Dribbble / Behance / Awwwards** | Bancos de referência                                                                                                                                | Fase 2                                                                  | Não são briefing; são vocabulário                                                           |

Uma nota de calibragem importante: **o Claude Design e o Google Stitch resolvem o problema da primeira versão; o Figma resolve o problema da fonte de verdade; o Claude Code e o Cursor resolvem o problema da produção.** Tentar usar um no papel do outro é a causa mais comum de frustração com essas ferramentas.

### 5.2 Os três fluxos canônicos

**Fluxo A — Código direto (mais rápido).**
Briefing + tokens → Claude Design ou Claude Code gera o protótipo em HTML/React → iteração por crítica → o próprio código vira base de produção.
_Ideal para:_ landing pages, sites de porte pequeno e médio, projetos sem designer dedicado.

**Fluxo B — Figma primeiro (mais controlado).**
Briefing + tokens → sistema montado no Figma (Variables + componentes) → telas desenhadas ou geradas → servidor MCP do Figma conectado ao Claude Code → geração de código a partir dos frames, com Code Connect apontando para os componentes reais do repositório.
_Ideal para:_ produtos com equipe, sistemas que vão evoluir por anos, clientes que exigem aprovação visual formal.

**Fluxo C — Híbrido (o mais usado na prática).**
Exploração rápida no Stitch ou Claude Design → a direção vencedora é normalizada no Figma como sistema → implementação no Claude Code lendo Figma via MCP → a interface construída é devolvida ao canvas do Figma como camadas editáveis, mantendo design e código sincronizados.
_Ideal para:_ quase todo mundo. Combina velocidade de exploração com rigor de sistema.

> **NA PRÁTICA —** A integração bidirecional entre Figma e agentes de código (ler o design para gerar código, e empurrar a interface pronta de volta ao canvas) mudou a economia do handoff. O que antes era um documento de especificação que ninguém lia virou um canal sincronizado. Vale investir tempo em configurar isso corretamente uma vez.

### 5.3 Anatomia de um prompt de design

Um prompt profissional tem sete blocos. Sempre os mesmos, na mesma ordem — o que permite reaproveitá-lo como template.

```text
1. PAPEL E PADRÃO
   Você é diretor de arte de um estúdio conhecido por identidades que não
   poderiam ser confundidas com nenhuma outra. O cliente já rejeitou
   propostas que pareciam template.

2. CONTEXTO DE NEGÓCIO
   [3–5 linhas do Briefing Estratégico: público, JTBD, objeção principal,
   ação desejada, diferencial real]

3. DIREÇÃO VISUAL
   Frase de direção: [a sentença do Painel de Referências]
   Extrair da referência A: [estrutura]
   Extrair da referência B: [atmosfera]
   Extrair da referência C: [detalhe]

4. SISTEMA (INEGOCIÁVEL)
   [cole o tokens.json ou o resumo: paleta, tipografia, escala, raio, motion]
   Use exclusivamente estes valores. Não introduza cor, tamanho ou
   espaçamento fora do sistema.

5. ESTRUTURA REQUERIDA
   Seção 1: [pergunta que responde] — [componentes]
   Seção 2: ...
   [derivado da arquitetura de mensagem, não inventado]

6. RESTRIÇÕES E PROIBIÇÕES
   Não usar: [lista específica — gradiente roxo, hero centralizado com
   dois botões, cards com ícone no topo, carrossel de depoimentos...]
   Obrigatório: [convenções do setor, exigências legais, acessibilidade AA]

7. CRITÉRIO DE ACEITE
   O resultado passa se: [3–5 critérios verificáveis]
   Antes de entregar, avalie o próprio resultado contra esses critérios
   e liste o que ainda não cumpre.
```

O bloco 6 é o mais subestimado. **Proibições são mais eficientes que instruções**, porque removem justamente as saídas de alta probabilidade — que são as genéricas. Uma lista de dez proibições específicas muda o resultado mais do que dois parágrafos de adjetivos.

O bloco 7 é o segundo mais subestimado: pedir autoavaliação antes da entrega ativa um ciclo de crítica interno e costuma elevar o nível do primeiro rascunho de forma perceptível.

### 5.4 Iteração dirigida: como criticar

"Melhora isso" é um pedido vazio. A IA vai mexer em algo aleatório e você vai perder duas rodadas. Critique em quatro campos:

```text
OBSERVAÇÃO: o que eu vejo, de forma factual e localizada
   "O espaçamento entre o título da seção e o primeiro card é igual ao
    espaçamento entre os cards."

DIAGNÓSTICO: qual princípio foi violado
   "Isso viola a Lei da Proximidade: elementos de níveis hierárquicos
    diferentes têm o mesmo afastamento, então a hierarquia sumiu."

DIREÇÃO: o que deve acontecer, sem microgerenciar a solução
   "Aumente a separação entre título e grupo para pelo menos o dobro
    da separação interna do grupo."

RESTRIÇÃO: o que não pode mudar junto
   "Sem alterar a altura total da seção nem os breakpoints."
```

Trabalhe **um eixo por rodada**: primeiro estrutura e hierarquia, depois tipografia, depois cor, depois detalhe e movimento. Misturar eixos na mesma rodada produz regressões — você conserta a cor e a hierarquia se desfaz.

> **ARMADILHA —** Iterar infinitamente sobre a mesma direção fraca. Se após três rodadas dirigidas o resultado ainda não convence, o problema não é execução: é direção. Volte à Fase 2.

> **CRITÉRIO DE ACEITE —** O protótipo pode ser apresentado ao cliente sem nenhuma frase começando com "imagina que aqui vai ter...".

---

## Fase 6 — Implementação

**Objetivo.** Transformar protótipo aprovado em código de produção sustentável — código que outra pessoa (ou você em seis meses) consiga manter.

### 6.1 Stack

- **Site institucional, landing, blog, conteúdo:** Astro. Envia praticamente zero JavaScript por padrão; ganha em Core Web Vitals quase de graça.
- **Aplicação, área logada, conteúdo dinâmico:** Next.js.
- **Estilo:** Tailwind com os tokens configurados como fonte de verdade, ou CSS Modules com custom properties. O que importa não é a escolha, é que **os tokens sejam a única origem dos valores**.
- **Componentes:** shadcn/ui sobre Radix é a base mais produtiva hoje — acessibilidade resolvida, código no seu repositório, estilo totalmente seu.
- **Conteúdo:** arquivos Markdown para projetos pequenos; CMS headless quando houver equipe editorial.

### 6.2 Estrutura de repositório

```
projeto/
├── CLAUDE.md                    # regras permanentes do agente
├── docs/
│   ├── 01-briefing.md
│   ├── 02-referencias.md
│   └── 04-design-system.md
├── .claude/
│   ├── skills/                  # especialistas sob demanda
│   └── agents/                  # subagentes
├── src/
│   ├── styles/tokens.css
│   ├── components/ui/           # primitivos do sistema
│   ├── components/patterns/     # padrões compostos
│   └── pages/
└── tests/visual/                # snapshots de referência
```

Manter `docs/` dentro do repositório não é burocracia: é o que permite ao agente ler o briefing e o sistema a qualquer momento, sem você recolar contexto em toda sessão.

### 6.3 O arquivo de regras do agente

`CLAUDE.md` (ou `AGENTS.md`, conforme a ferramenta) é contexto **sempre ativo**. Por isso deve ser curto e conter apenas o que vale para quase toda tarefa. Tudo que é situacional vai para skills.

```markdown
# Projeto — [nome]

## Contexto

Site institucional para [público]. Objetivo primário: [ação].
Briefing completo em docs/01-briefing.md. Sistema em docs/04-design-system.md.

## Regras invioláveis

- Nenhum valor de cor, espaçamento, raio ou tipografia fora de src/styles/tokens.css.
- Componentes consomem apenas tokens semânticos, nunca primitivos.
- Todo componente interativo implementa: default, hover, focus-visible,
  active, disabled, loading.
- Acessibilidade WCAG 2.2 AA é critério de aceite, não melhoria futura.
- Antes de criar um componente, verifique se já existe em src/components/ui.

## Stack

Astro 5 · Tailwind 4 · TypeScript estrito · pnpm

## Convenções

- Commits: Conventional Commits em português.
- Componentes em PascalCase; arquivos utilitários em kebab-case.
- Sem `any`. Sem `!important`. Sem estilo inline exceto valores calculados.

## Antes de finalizar qualquer tarefa

1. `pnpm lint && pnpm typecheck`
2. Verificar renderização em 375px, 768px e 1440px
3. Conferir contraste dos estados alterados
```

### 6.4 Skills: quando criar e como escrever

Uma _skill_ é uma pasta com um arquivo `SKILL.md` que o agente carrega **sob demanda**, quando a descrição casa com a tarefa atual. É a diferença entre carregar tudo sempre (caro e ruidoso) e carregar o especialista certo na hora certa.

A regra de decisão é direta:

| Se...                                                 | Use           |
| ----------------------------------------------------- | ------------- |
| A regra vale para quase toda tarefa                   | `CLAUDE.md`   |
| O conhecimento vale só às vezes, mas é profundo       | **Skill**     |
| A tarefa é pesada e polui o contexto principal        | **Subagente** |
| É um efeito determinístico em evento do ciclo de vida | **Hook**      |
| Precisa de dado externo ao vivo                       | **MCP**       |
| Quer distribuir tudo isso empacotado                  | **Plugin**    |

Skills ficam em `.claude/skills/` (projeto) ou `~/.claude/skills/` (pessoal). Cada uma é uma pasta com `SKILL.md` e, opcionalmente, scripts e arquivos de apoio que são lidos só quando necessários — o padrão de _revelação progressiva_, que mantém o contexto enxuto.

Skills que valem a pena para trabalho de web design:

- **`design-tokens`** — como ler, aplicar e estender o sistema de tokens deste projeto.
- **`auditoria-a11y`** — checklist WCAG 2.2 AA com procedimento de verificação, não só a lista.
- **`copy-conversao`** — princípios de microcopy, hierarquia de mensagem, tom de voz do cliente.
- **`qa-visual`** — como rodar o agente de navegador, capturar telas em cada breakpoint e comparar com a referência.
- **`seo-tecnico`** — metadados, dados estruturados, sitemap, canônicas, Open Graph.

O que mais importa em uma skill é a **descrição** no cabeçalho: ela é o que decide se a skill é acionada. Descrição vaga significa skill que nunca dispara. Escreva a descrição citando os gatilhos concretos — nomes de arquivo, formatos, verbos que a pessoa realmente usa.

### 6.5 MCPs úteis

- **Figma** — leitura de contexto de design e escrita de volta no canvas; com Code Connect, o agente reutiliza os componentes reais do repositório em vez de recriá-los aninhados.
- **Navegador/Playwright** — o agente abre a página, navega, captura e verifica o próprio trabalho. É o que mais eleva a qualidade final, porque fecha o laço entre "escrevi o código" e "vi o resultado".
- **Repositório e CI** — abrir PR, ler checks, corrigir falhas.

> **PRINCÍPIO —** Um agente que não consegue ver o que produziu está codificando com os olhos fechados. Dê a ele um navegador antes de dar mais um parágrafo de instrução.

### 6.6 Disciplina de trabalho

- **Uma tarefa, uma conversa.** Sessões longas acumulam contexto contraditório.
- **Planejar antes de codar.** Peça o plano, aprove o plano, depois execute. Aprovar plano custa dois minutos; revisar código errado custa duas horas.
- **Commits pequenos e frequentes.** Facilita reverter quando o agente erra — e ele erra.
- **Revisar o diff, sempre.** Código que você não leu é código que você não mantém.

> **CRITÉRIO DE ACEITE —** Um desenvolvedor externo consegue adicionar uma seção nova ao site sem perguntar nada a você.

---

## Fase 7 — Qualidade e conformidade

**Objetivo.** Provar, com evidência, que o site atende ao padrão prometido. Sem esta fase, "profissional" é opinião.

### 7.1 Performance

Meça os **Core Web Vitals** em condições realistas (rede móvel simulada, dispositivo de gama média), não no seu desktop com fibra:

| Métrica                             | O que mede                                 | Alvo    |
| ----------------------------------- | ------------------------------------------ | ------- |
| **LCP** — Largest Contentful Paint  | Quando o conteúdo principal aparece        | ≤ 2,5s  |
| **INP** — Interaction to Next Paint | Resposta à interação do usuário            | ≤ 200ms |
| **CLS** — Cumulative Layout Shift   | Estabilidade visual durante o carregamento | ≤ 0,1   |

As causas de falha são quase sempre as mesmas cinco: imagem grande sem formato moderno, fonte web sem `font-display` e sem `preload`, JavaScript de terceiros bloqueante, ausência de `width`/`height` em mídia, e animação de propriedades que forçam recálculo de layout.

Correções de maior retorno: servir AVIF/WebP com dimensões declaradas, `loading="lazy"` abaixo da dobra, subsetting de fontes variáveis, adiar scripts de terceiros, e animar somente `transform` e `opacity`.

### 7.2 Acessibilidade

Automatize o que dá para automatizar (axe, Lighthouse) e reserve o julgamento humano para o resto — ferramentas automáticas detectam cerca de um terço dos problemas reais.

Roteiro manual, quinze minutos, obrigatório:

1. Navegue a página inteira **só com Tab**. O foco está sempre visível? A ordem faz sentido? Dá para sair de todos os componentes?
2. Amplie para **200%**. Algo se sobrepõe, corta ou some?
3. Desligue o CSS. O conteúdo continua em ordem lógica?
4. Passe um leitor de tela pelos cabeçalhos. A estrutura conta a história da página?
5. Verifique o contraste dos estados de foco, hover e desabilitado — não só do texto em repouso.

### 7.3 SEO técnico

- Título único por página, entre 50 e 60 caracteres, com o termo real de busca.
- Meta description entre 140 e 160 caracteres, escrita para o clique, não para o robô.
- Um único H1 por página; hierarquia sem saltos.
- Dados estruturados schema.org compatíveis com o tipo de negócio (`LocalBusiness`, `Organization`, `Article`, `Product`, `FAQPage`).
- Open Graph e Twitter Card com imagem de 1200×630 — a primeira impressão do link compartilhado.
- URLs curtas, semânticas e estáveis; canônicas definidas; sitemap e `robots.txt` corretos.
- Texto alternativo real em imagens; nomes de arquivo descritivos.

### 7.4 QA visual automatizado

Configure o agente para: abrir a página em 375, 768, 1280 e 1920 pixels; capturar cada seção; comparar com a referência aprovada; e listar divergências com localização. Isso pega, em minutos, o tipo de erro que passa despercebido em revisão manual: espaçamento inconsistente entre seções, quebra de texto em telas intermediárias, estados de foco ausentes, imagem esticada.

### 7.5 Checklist de lançamento

- [ ] Todos os links funcionam, inclusive os do rodapé
- [ ] Formulários enviam, validam e mostram sucesso e erro
- [ ] Página 404 personalizada e útil
- [ ] Favicon completo e manifesto do site
- [ ] HTTPS, redirecionamento de www, HSTS
- [ ] Analytics instalado e testado
- [ ] Política de privacidade e aviso de cookies conforme a LGPD
- [ ] Metadados e Open Graph validados em pré-visualização real
- [ ] Testado em Chrome, Safari, Firefox e em um iPhone e um Android reais
- [ ] Lighthouse ≥ 90 em Performance, Acessibilidade, Boas Práticas e SEO
- [ ] Backup e rollback documentados

> **CRITÉRIO DE ACEITE —** Existe um relatório com números, não uma afirmação de que está bom.

---

## Fase 8 — Entrega e evolução

**Objetivo.** Encerrar o projeto de forma que ele continue vivo sem você — e que o próximo projeto comece mais adiantado.

### 8.1 Handoff

Entregue quatro coisas: acesso (repositório, hospedagem, domínio, analytics), documentação (os cinco artefatos atualizados), um vídeo curto mostrando como editar o conteúdo, e um plano de manutenção com o que precisa ser revisto e com que frequência.

### 8.2 Evolução do sistema

Versione o design system em `MAJOR.MINOR.PATCH`. Mudança que quebra componente existente é _major_. Componente novo é _minor_. Ajuste de valor é _patch_. Mantenha um changelog — em seis meses você não vai lembrar por que aquele token mudou.

### 8.3 Medir e aprender

Trinta dias após o lançamento, colete: taxa de conversão da ação principal, tempo até a primeira interação, seções mais e menos vistas, dispositivos predominantes. Registre em `biblioteca/decisoes/` o que funcionou e o que não funcionou. É este arquivo que faz o décimo projeto ser melhor que o primeiro — não a ferramenta nova que sair no mês que vem.

### 8.4 Produtizar o método

Quando o pipeline estiver rodando, ele deixa de ser processo e vira produto. Três formas de capturar esse valor:

- **Pacote por nicho.** Um sistema pré-configurado para clínicas, outro para escritórios de advocacia, outro para indústrias. O trabalho da Fase 1 já está 70% feito, e a margem sobe.
- **Assinatura de evolução.** Em vez de vender site, venda melhoria contínua medida por métrica.
- **Licenciamento do sistema.** O design system documentado é, ele próprio, um entregável vendável.

> **CRITÉRIO DE ACEITE —** O próximo projeto do mesmo nicho começa na Fase 3.

---

# PARTE III — O ARSENAL

## A. Biblioteca de prompts

Prompts prontos para copiar. Substitua o que está entre colchetes. Todos assumem que você já anexou os artefatos das fases anteriores.

### A.1 Descoberta de nicho

```text
Aja como estrategista de produto digital especializado em [SETOR] no Brasil.

Vou construir um site para [DESCRIÇÃO DO NEGÓCIO], em [CIDADE/REGIÃO],
cujo público é [PÚBLICO].

Produza:
1. Três perfis de cliente ideal, cada um com: gatilho de busca, contexto
   do momento da busca, critério de decisão e principal medo.
2. Os cinco "trabalhos" que essa pessoa está tentando realizar, em ordem
   de frequência.
3. As sete objeções mais prováveis, com a evidência que neutraliza cada uma.
4. As convenções que sites deste setor precisam obrigatoriamente respeitar
   para gerar confiança, e por quê.
5. Três hipóteses de diferenciação que o setor local provavelmente não explora.

Seja específico ao setor e à região. Se algo depender de dado que você não
tem, diga explicitamente e indique como eu obtenho.
```

### A.2 Análise de concorrência

```text
Analise estes [N] concorrentes: [URLS OU DESCRIÇÕES].

Para cada um, preencha:
- Promessa da primeira dobra (transcreva a ideia, não copie o texto)
- Prova principal usada
- Ordem das seções
- Paleta dominante e famílias tipográficas aparentes
- Tom de voz em três adjetivos
- Um acerto e um erro claros

Depois, sintetize:
1. O que todos fazem igual (a convenção do setor — respeitar)
2. O que todos fazem igual e mal (a preguiça coletiva — atacar)
3. Três oportunidades de diferenciação com justificativa e risco de cada uma
```

### A.3 Frase de direção visual

```text
Com base no briefing anexo e nas referências anotadas, proponha três
direções de arte distintas. Para cada direção:

- Nome (2 palavras)
- Frase de direção: uma sentença que descreva a atmosfera sem usar as
  palavras "moderno", "limpo", "minimalista", "elegante" ou "profissional"
- Paleta em 5 valores OKLCH, com o papel de cada um
- Par tipográfico (display + texto) e por que essa combinação
- O elemento-assinatura: a única coisa pela qual a página será lembrada
- Que público esta direção agrada e qual ela afasta

As três direções devem ser genuinamente diferentes entre si, não
variações da mesma ideia. Ao final, recomende uma e defenda a escolha
contra as outras duas.
```

### A.4 Geração de tokens

```text
Converta a direção escolhida em um sistema de design tokens.

Estruture em duas camadas: primitivos (valores brutos) e semânticos
(referências aos primitivos por função de uso).

Inclua: escala de cor 50–950 para marca e neutros, quatro cores
semânticas de estado, escala tipográfica modular de razão [1.25],
escala de espaçamento base [8px], raio, elevação em camadas e motion.

Entregue: (a) tokens.json, (b) tokens.css com custom properties,
(c) uma tabela de verificação de contraste de todos os pares de
texto/fundo previstos, marcando quais passam em WCAG AA.
```

### A.5 Crítica estruturada

```text
Avalie a página anexa contra o briefing e o painel de referências.

Estruture a resposta em cinco eixos, e para cada um liste no máximo três
problemas, do mais grave ao menos grave, usando o formato
OBSERVAÇÃO / DIAGNÓSTICO / DIREÇÃO:

1. Hierarquia e estrutura
2. Tipografia
3. Cor e contraste
4. Espaço e ritmo
5. Conteúdo e microcopy

Não elogie. Não proponha refazer tudo. Se algo estiver correto, ignore.
Ao final, indique qual é o único problema que, resolvido, gera o maior
salto de qualidade percebida.
```

### A.6 Implementação a partir do design

```text
Implemente [TELA/SEÇÃO] seguindo estritamente:
- docs/04-design-system.md para componentes e regras
- src/styles/tokens.css para todos os valores visuais
- [link do Figma ou protótipo] para a composição

Regras:
- Reutilize os componentes existentes em src/components/ui. Só crie novo
  se realmente não existir equivalente, e justifique antes de criar.
- Nenhum valor visual fora dos tokens.
- Implemente todos os estados: default, hover, focus-visible, active,
  disabled, loading, erro e vazio.
- Mobile-first. Verifique em 375, 768 e 1440.

Antes de escrever código, apresente o plano: quais componentes serão
usados, quais serão criados e como a seção será estruturada. Aguarde
minha aprovação.
```

### A.7 Auditoria final

```text
Faça uma auditoria completa desta página e entregue um relatório com
evidências, não opiniões.

1. Acessibilidade: rode a verificação automática e depois o roteiro
   manual (navegação por teclado, zoom 200%, ordem de leitura,
   contraste de todos os estados). Liste cada falha com o seletor
   do elemento e a correção.
2. Performance: meça LCP, INP e CLS em rede móvel simulada. Para cada
   métrica fora do alvo, identifique a causa raiz.
3. SEO técnico: verifique títulos, descrições, hierarquia de cabeçalhos,
   dados estruturados, canônicas e Open Graph.
4. Consistência com o sistema: liste todo valor visual usado que não
   venha dos tokens.

Ordene tudo por impacto e esforço, em uma tabela.
```

---

## B. Matriz de decisão de ferramentas

| Sua situação                             | Comece por                 | Depois                          | Não perca tempo com                         |
| ---------------------------------------- | -------------------------- | ------------------------------- | ------------------------------------------- |
| Landing page sozinho, prazo curto        | Claude Design ou Stitch    | Claude Code                     | Montar sistema completo no Figma            |
| Site institucional para cliente exigente | Figma (sistema)            | Claude Code via MCP             | Gerar direto em código sem aprovação visual |
| Produto que vai evoluir por anos         | Design system primeiro     | Figma + Code Connect            | Protótipo descartável                       |
| Explorar muitas direções rápido          | Google Stitch              | Normalizar a vencedora no Figma | Refinar tudo antes de escolher              |
| Refatorar site existente                 | Claude Code lendo o código | Extrair tokens do que já existe | Redesenhar antes de entender                |
| Trabalho com designer na equipe          | Figma como fonte única     | MCP bidirecional                | Duas fontes de verdade                      |

---

## C. Os dez anti-padrões mais caros

1. **Prompt sem briefing.** Gera algo bonito e irrelevante. Custo: retrabalho total.
2. **Referência sem anotação.** Vira colagem incoerente. Custo: direção fraca.
3. **Valor visual fora do token.** O sistema vaza e a consistência morre em três semanas.
4. **Pular a matriz de estados.** O site parece profissional na captura e amador no uso.
5. **Acessibilidade no fim.** Custa cinco vezes mais do que embutida desde o componente.
6. **Iterar sem eixo definido.** Conserta a cor, quebra a hierarquia, repete.
7. **Aceitar o primeiro resultado.** O primeiro resultado é sempre a média. Sempre.
8. **Design system sem documentação.** Um sistema que só existe na sua cabeça não é um sistema.
9. **Duas fontes de verdade.** Figma e código divergem, e ninguém sabe qual está certo.
10. **Não medir nada.** Sem métrica, você não tem método: tem gosto pessoal com etapas.

---

## D. Roteiro de 21 dias

**Semana 1 — Fundação.** Monte o repositório-método. Escreva os cinco templates. Faça o briefing completo de um projeto real (mesmo fictício). Analise oito concorrentes de verdade.

**Semana 2 — Sistema.** Monte o painel de referências anotado. Derive tokens. Construa dez componentes com todos os estados. Documente o manual do sistema.

**Semana 3 — Produção.** Prototipe em uma ferramenta de canvas. Implemente com agente de código lendo seus artefatos. Rode a auditoria completa. Corrija. Registre em `biblioteca/decisoes/` o que você aprendeu.

Ao final de 21 dias você não terá um site: terá uma linha de produção. O site é consequência.

---

## E. Glossário

**Design token** — valor visual nomeado e centralizado (cor, espaço, tipo, raio) que serve como fonte única de verdade.

**Token primitivo / semântico** — primitivo descreve o valor (`blue-600`); semântico descreve o uso (`action-primary`). Componentes consomem apenas semânticos.

**OKLCH** — espaço de cor perceptualmente uniforme, no qual variações numéricas iguais correspondem a variações visuais iguais.

**Escala modular** — progressão de tamanhos tipográficos gerada por uma razão constante.

**JTBD (Jobs To Be Done)** — modelo que descreve o que a pessoa está tentando realizar, não quem ela é demograficamente.

**Core Web Vitals** — LCP, INP e CLS: as três métricas do Google para carregamento, resposta e estabilidade visual.

**WCAG 2.2 AA** — nível de conformidade de acessibilidade adotado como padrão profissional.

**MCP (Model Context Protocol)** — protocolo que conecta agentes de IA a ferramentas e dados externos ao vivo.

**Skill** — pasta com um `SKILL.md` que o agente carrega sob demanda quando a tarefa corresponde à descrição.

**Subagente** — instância separada, com contexto próprio, que executa uma tarefa pesada e devolve só o resultado.

**Code Connect** — mapeamento entre componentes do Figma e componentes reais do código, para que o agente reutilize em vez de recriar.

**Revelação progressiva** — técnica de manter instruções em camadas, carregando o detalhe apenas quando necessário.

---

## Colofão

Este documento descreve um método, não uma ferramenta. As ferramentas citadas mudarão — algumas antes do fim deste ano. O que não muda é a estrutura: especificar antes de gerar, referenciar antes de decidir, sistematizar antes de escalar, medir antes de concluir.

Se você guardar uma única frase daqui, que seja esta: **a IA transformou a execução em commodity e o julgamento em ativo.** Todo o método acima existe para uma coisa só — construir, projeto após projeto, a capacidade de julgar bem e a evidência que sustenta esse julgamento.

O resto é velocidade. E velocidade, hoje, qualquer um tem.
