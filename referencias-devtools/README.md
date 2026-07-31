# Referências DevTools

Estudos técnicos de experiências externas realizados com ferramentas de
desenvolvimento do navegador, reconstruídos localmente para pesquisa.

Cada referência registra evidências, documenta decisões reutilizáveis e, quando
fizer sentido, hospeda uma reconstrução independente. Nada aqui é código de
produção do Discipulando a Caserna.

## Finalidade

- estudar padrões de interface;
- registrar evidências técnicas;
- extrair decisões reutilizáveis;
- reconstruir comportamentos de forma independente;
- servir como referência para produtos futuros.

## O que este diretório não é

- não é uma coleção de cópias integrais de sites;
- não é código de produção do Discipulando a Caserna;
- não é uma biblioteca de ativos proprietários;
- não é uma autorização para copiar marcas, textos, modelos, imagens, fontes ou
  código de terceiros.

## Convenção para futuras referências

Cada novo site recebe um slug próprio:

```text
referencias-devtools/<slug-do-site>/
```

Estrutura recomendada:

```text
README.md
auditoria/
documentacao/
design-system/ ou reconstrucao/
ferramentas/
testes/
```

Nem toda referência precisará usar todos os diretórios. A separação entre
evidência, documentação e reconstrução deve ser preservada.

## Requisitos mínimos para novos estudos

Cada nova referência deve:

- identificar a URL original;
- informar a data da auditoria;
- distinguir evidência de inferência;
- documentar ferramentas utilizadas;
- registrar limites da investigação;
- declarar fronteiras de ativos e licença;
- não realizar hotlink;
- não carregar recursos do site original em runtime;
- não redistribuir ativos proprietários;
- permanecer isolada do produto oficial;
- incluir instruções para execução e validação.

## Referências neste repositório

| Slug                                           | Referência                | Reconstrução |
| ---------------------------------------------- | ------------------------- | ------------ |
| [`aramco-birth-of-oil/`](aramco-birth-of-oil/) | Aramco — The Birth of Oil | Estratos     |
