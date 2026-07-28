# Contexto do projeto — apresentação Discipulando a Caserna

Documento de orientação permanente.  
Não inventa fatos: lacunas aparecem como **dúvidas**.

Versão de referência do site atual: **v1.0** (Movimentos I–V; seções 1–15).  
Trabalho cotidiano na branch `main` (ver `.cursor/rules/commits-na-main.mdc`).

---

## O que é o Projeto Caserna de Adulão

Projeto ministerial, missionário e institucional mais amplo, sediado em Fortaleza-CE (conforme rodapé e `js/config.js`).

No material atual, aparece como:

- contexto da metáfora de Adulão (1Sm 22.2): refúgio de homens feridos, não academia de elite;
- instituição à qual o discipulado serve e que figura na marca, rodapé e metadados;
- portador de CNPJ e contato institucional publicados no site.

**Dúvida:** além do que o prospecto e o rodapé já dizem, não há neste repositório um estatuto, missão institucional completa ou descrição autônoma do Projeto Caserna de Adulão (escopo missionário, estrutura, relação com igrejas/capelanias, etc.).

---

## O que é o Discipulando a Caserna

Projeto específico de formação bíblica e discipulado no contexto da caserna, desenvolvido para servir ao Projeto Caserna de Adulão.

Características documentadas nas fontes canônicas (`conteudo/`, `index.html`):

- quatro módulos sequenciais, doze lições cada (48 encontros, ~1 ano);
- eixo teológico: Cristo chama, treina, molda e envia;
- metáfora da armadura de Efésios 6 a serviço do evangelho (nunca o contrário);
- público primário: militares e custodiados, em restauração; secundário: instrutores, capelanias e lideranças;
- Módulo 1 produzido (edições Aluno e Instrutor); Módulos 2–4 com matriz definida e produção condicionada à validação pastoral do Módulo 1;
- fonte pastoral de referência: Guia Mestre v1.0-RC em `fontes/guia-mestre/` (homologação pendente). O site publica apenas o que está em `conteudo/`.

---

## Relação entre os dois

| Nome | Papel |
|---|---|
| Projeto Caserna de Adulão | Contexto institucional, missionário e ministerial |
| Discipulando a Caserna | Protagonista da apresentação; programa/projeto de discipulado |

Não são sinônimos. O discipulado serve ao Projeto; o site não substitui um portal institucional do Projeto.

---

## Objetivo do site

Ser uma apresentação digital do Discipulando a Caserna ao **Pr. Glaydston**, para que ele compreenda e possa apreciar, orientar e validar:

1. o contexto que originou a proposta;
2. a necessidade pastoral identificada;
3. o que é o Discipulando a Caserna;
4. a quem se destina;
5. fundamentos bíblicos;
6. princípios pastorais;
7. metodologia;
8. arquitetura curricular;
9. módulos e encontros;
10. integração com o Projeto Caserna de Adulão;
11. o que já foi produzido;
12. o que ainda está em desenvolvimento;
13. o que precisa de apreciação, orientação ou validação pastoral.

Natureza desejada da experiência: prospecto pastoral digital; carta institucional; apresentação de projeto; manifesto de missão; documento editorial interativo; narrativa em rolagem; apresentação curricular.

---

## Destinatário

- Configurado em `js/config.js`: destinatário `Glaydston`; nome formal `Pr. Glaydston Gama Lopes`; cargo `Pastor-presidente`.
- Saudação da abertura: “Pastor Glaydston,”.
- Fechamento lista nome, cargo e e-mail institucional.

**Dúvida:** o repositório não documenta se o Pr. Glaydston é apenas o destinatário da apreciação, também autor/responsável editorial, ou ambos. O cargo “Pastor-presidente” aparece no encerramento sem esclarecer a relação jurídica ou eclesial com o Projeto.

---

## Arquitetura narrativa vigente

Cinco movimentos, quinze seções (ver `README.md` e `TODO.md`):

| Movimento | Seções | Função |
|---|---|---|
| I — A necessidade | 1–4 | Carta, homem, material comum, Adulão |
| II — A resposta | 5–7 | Convicção, recusas, marca |
| III — O programa | 8–11 | Arquitetura, matriz, anatomia, edições/encontro |
| IV — A prova | 12–13 | Material pronto, rigor de produção |
| V — O pedido | 14–15 | Progressão/certificados, portão pastoral |

Direção visual aprovada: **A — Prospecto pastoral editorial** ([`docs/decisao-visual-v1.md`](decisao-visual-v1.md)), com umbral atmosférico único (de B) e rótulos/checklist editoriais (de C).

---

## O que o site deve comunicar

- Hierarquia clara: Discipulando a Caserna em primeiro plano; Projeto como contexto.
- Necessidade pastoral (ferimento, Adulão, acolhimento antes da exigência).
- Convicção cristocêntrica e o que o programa recusa (moralismo, militarização da fé, lógica de troféu, exposição do ferido).
- Marca como doutrina em imagem (estudo visual provisório até homologação).
- Arquitetura, matriz, progressão, público, princípios.
- Estado real de produção e pedidos explícitos de apreciação pastoral.
- Tom de documento de trabalho — não de produto acabado ou campanha.

---

## O que o site não deve parecer

- Portal público comum de igreja
- Página de eventos ou notícias
- Catálogo de ministérios
- Página de arrecadação
- Landing page comercial
- Template religioso genérico
- Plataforma de cursos / LMS
- Site de captação de participantes

Também fora do escopo técnico atual (`TODO.md`): formulários, analytics, cookies, back-end, frameworks, bundlers, migração para React/Vue/Next/Astro/Tailwind.

---

## Estado técnico atual (síntese)

- Site estático de página única (`index.html`), sem bundler.
- CSS: `tokens`, `base`, `layout`, `componentes`, `secoes`.
- JS modular clássico; dados gerados em `js/dados/*` a partir de `conteudo/*.json`.
- Publicação: GitHub Pages; `noindex`/`nofollow` (não é autenticação).
- Qualidade: `npm run validate` (generate, encoding, lint HTML/CSS/JS, testes unitários e e2e).

Fontes canônicas de conteúdo do site: `conteudo/*.json`, `conteudo/*.md`.  
Referência pastoral (não editar no site): `fontes/guia-mestre/`.  
Não editar manualmente `js/dados/*.js` nem o bloco gerado `FALLBACK-DADOS` em `index.html`.

---

## Dúvidas e lacunas encontradas

Registradas sem preenchimento inventado:

1. **Definição institucional completa** do Projeto Caserna de Adulão (missão, governança, escopo) — ausente no repositório.
2. **Virtude, tema e temaRef** dos Módulos 3 e 4 estão `null` em `modulos.json` (já documentado em `conteudo/LEIA-ME.md`) — omitir na UI.
3. **Arte oficial** da logomarca/brasão: apenas estudos visuais; homologação pendente.
4. **Licença** de código e conteúdo pastoral: indefinida.
5. **Política de acesso**: prévia pública vs. área restrita real — pendente (`TODO.md`).
6. **Papel exacto do Pr. Glaydston** em relação à autoria e à liderança do Projeto.
7. **Integração operacional** Discipulando × Projeto (como o programa se encaixa na rotina ministerial do Projeto) — só implícita.
8. **Domínio próprio / remoção de `noindex`**: decisão futura.
9. **Dossiê de apreciação em PDF** (previsto na seção 15): arquivo ainda não versionado no repositório — link só quando o PDF existir.
10. **Nota histórica:** commits `fea9267` e `b837b6d` adicionaram o Guia Mestre em `fontes/`; as mensagens falavam em seções 8–15/16–20, mas esses commits não publicaram essas seções no `index.html`.

---

## Próxima etapa recomendada

Manter fidelidade a `conteudo/`, completar coerência visual da Direção A onde ainda faltar, e respeitar as pendências humanas do `TODO.md` (apreciação pastoral, marca oficial, licença, indexação).
