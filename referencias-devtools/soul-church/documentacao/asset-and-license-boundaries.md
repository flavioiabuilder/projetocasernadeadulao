# Fronteiras de ativos e licença — Átrio

Este estudo investiga um site de terceiro. Estas são as regras que separam
**estudar** de **copiar**, e como cada uma é verificada.

---

## 1. O que não foi copiado

Nenhum destes itens existe neste repositório, em nenhuma forma:

**Identidade** — logotipo, nome como marca da reconstrução, slogan, paleta
de marca, tratamento fotográfico.

**Conteúdo** — texto editorial, títulos, descrições, nomes de eventos,
horários reais, endereço, telefone, e-mail, dados de CMS, informações
pessoais.

**Mídia** — fotografia, vídeo, ilustração, ícone proprietário, áudio,
Lottie, animação exportada.

**Código** — folhas de estilo, JavaScript, bundles, export do Webflow,
runtime do Webflow, código de formulário, endpoints, identificadores de
integração.

**Tipografia** — nenhum arquivo `.woff`, `.woff2`, `.ttf`, `.otf` ou `.eot`.
Nem das famílias Typekit (`rama-gothic-e`, `rocky-condensed`,
`rocky-extra-condensed`, `neue-haas-grotesk-text`), nem das do Google Fonts.

**Rastreamento** — analytics, pixel, cookie, script de consentimento,
identificador de contêiner.

---

## 2. Sem hotlink, sem runtime externo

A reconstrução **não faz requisição a domínio algum**. Nem à referência, nem
ao Webflow, nem a Google Fonts, nem a CDN de biblioteca.

Verificado de duas formas:

1. **Estaticamente** — `../testes/fronteiras.test.js` varre todos os
   arquivos de runtime procurando URL absoluta em `src`/`href`/`url()`/
   `@import`, domínios da referência, chamadas de rede (`fetch`,
   `XMLHttpRequest`, `sendBeacon`, `WebSocket`, `EventSource`) e APIs de
   armazenamento.
2. **Em execução** — o teste e2e observa **todas** as requisições da página
   e exige que a lista de hosts externos seja vazia.

Confirmado também por inspeção manual no Chrome DevTools MCP: 11 requisições,
todas locais; a única com erro é `/favicon.ico`, pedida pelo navegador e não
pela página.

---

## 3. Substituições adotadas

| Item da referência                 | Substituição                                                                         | Diferença esperada                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Darker Grotesque (Google, display) | pilha `"Atrio Display", Archivo, "Inter Tight", "Helvetica Neue", Arial, sans-serif` | quebra de linha diferente; a razão de escala é preservada, a largura por caractere não |
| rama-gothic-e (Typekit, cartaz)    | pilha `"Atrio Cartaz", "Archivo Narrow", Oswald, "Arial Narrow", sans-serif`         | menos condensada que a original; frases de cartaz ocupam mais largura                  |
| DM Sans (Google, corpo)            | pilha `"Atrio Texto", Inter, system-ui, …`                                           | métricas próximas; impacto pequeno                                                     |
| DM Mono (Google, legal)            | pilha `"Atrio Mono", ui-monospace, …`                                                | irrelevante no tamanho em que é usada                                                  |
| Fotografia                         | gradientes CSS originais em molduras com proporção reservada                         | **perda real** — ver §5                                                                |
| Vídeo do hero                      | mesmo tratamento                                                                     | idem                                                                                   |
| Logotipo                           | disco tipográfico com nome fictício                                                  | —                                                                                      |
| Ícones sociais                     | não reproduzidos                                                                     | não eram necessários à demonstração                                                    |
| Lottie do menu                     | três traços em CSS que viram X por `transform`                                       | mesma leitura, sem ativo                                                               |
| Conteúdo de CMS                    | dados fictícios em `demo.js`                                                         | —                                                                                      |
| Endpoints de formulário            | nenhum; envio interceptado                                                           | —                                                                                      |
| Integrações                        | nenhuma; mapeadas na documentação                                                    | —                                                                                      |

**Nenhuma fonte é carregada.** As pilhas nomeiam famílias open source
plausíveis primeiro e caem em fontes de sistema. A consequência é honesta: em
uma máquina sem Archivo instalada, o display renderiza numa grotesca de
sistema. As **proporções** do sistema (8.33em, entrelinha 0.70, razão 1.85
entre os dois primeiros degraus) são preservadas; o desenho da letra não.

**Ajuste compensatório aplicado:** `text-wrap: balance` nos títulos, para que
a diferença de largura por caractere não produza uma linha órfã de uma
palavra. Não corrige a diferença — apenas evita seu pior efeito.

---

## 4. Identidade demonstrativa

A reconstrução chama-se **Átrio**. A demonstração usa uma organização
fictícia, **Centro Comunitário Vale do Bosque**, com endereço, contato,
horários, eventos e valores inventados.

Escolhas deliberadas para impedir confusão:

- nome sem relação sonora ou semântica com a referência;
- setor genérico (centro comunitário), não igreja;
- `exemplo.invalid` como domínio de e-mail — TLD reservado que nunca resolve;
- endereço e telefone que não correspondem a lugar real;
- aviso explícito no rodapé, no menu e no formulário;
- nenhum evento, horário ou mensagem que possa ser confundido com os da
  referência.

Um teste automatizado reprova a presença de `soul church` em qualquer arquivo
de runtime.

---

## 5. O que se perde — e por quê

A atmosfera acolhedora da referência depende **substancialmente de
fotografia de pessoas reais**: rostos, gestos, luz de ambiente cheio. Esse é
o insumo que carrega a mensagem, e ele não pode ser copiado nem substituído
por gradiente.

O que o Átrio preserva é o **sistema que enquadra** essa fotografia: a
proporção, o arco, a ancoragem acima do centro, o espaço negativo ao lado, a
escala relativa ao texto, o comportamento de entrada. Com fotografia própria
no lugar dos placeholders, o sistema entrega a mesma experiência.

Sem ela, a demonstração é mais fria que a referência. Isso é limitação
declarada, não falha de execução.

---

## 6. Capturas de auditoria

11 capturas em `../auditoria/capturas/`, em WebP com qualidade 70–72, na
resolução mínima para sustentar as medições.

| Regra                                 | Verificação                                                                 |
| ------------------------------------- | --------------------------------------------------------------------------- |
| Não são carregadas por nenhuma página | teste estático que procura `src`/`href`/`url()` apontando para `auditoria/` |
| Não são espelho do site               | 11 imagens de estados distintos, não uma varredura                          |
| Não são redistribuídas como arte      | declarado no manifesto e nesta página                                       |
| Nenhuma em resolução de reuso         | maior é 1440×900 comprimida                                                 |

Citar o caminho `auditoria/` em comentário ou em metadados de proveniência —
como faz `tokens.json` no campo `$meta.origem` — é legítimo e não conta como
carregamento.

---

## 7. Nota sobre privacidade na coleta

Antes de qualquer medição, os cookies não essenciais foram **recusados** no
banner de consentimento da referência. Nenhuma conta foi criada, nenhum
formulário foi submetido, nenhum dado pessoal foi coletado ou armazenado.

Durante a auditoria observou-se que o analytics da referência dispara mesmo
com o consentimento recusado (auditoria §8.2). O achado está registrado
porque é relevante para o estudo; nenhuma tentativa foi feita de contornar,
explorar ou reproduzir esse comportamento.

---

## 8. Licença deste estudo

O código, os tokens, a documentação e o conteúdo demonstrativo do Átrio são
originais deste repositório e seguem a licença do projeto — que, como
registra o `TODO.md` do programa principal, **ainda não foi definida**.

Até que seja, este material é de uso interno do repositório. Nada aqui
concede direito sobre qualquer ativo da referência estudada, que permanece
integralmente com seus titulares.
