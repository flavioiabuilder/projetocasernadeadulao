# Ficha — Deixe seu Código Limpo e Brilha

| Campo | Valor |
| ----- | ----- |
| Slug | `deixe-seu-codigo-limpo-e-brilha` |
| Título | Deixe seu Código Limpo e Brilha |
| Autor | José Yoshiriro |
| Editora | Casa do Código |
| ISBN impresso | 978-85-5519-337-8 |
| ISBN digital | 978-85-5519-336-1 |
| Natureza | Livro de terceiros (inspirado em *Clean Code*, Uncle Bob; **não** é tradução) |
| Uso neste repo | Consulta local do agente — não publicar em Pages |
| Origem | [`../origem/deixe-seu-codigo-limpo-e-brilha/`](../origem/deixe-seu-codigo-limpo-e-brilha/) |
| Markdown | [`../md/deixe-seu-codigo-limpo-e-brilha.md`](../md/deixe-seu-codigo-limpo-e-brilha.md) |

## Tags

`clean-code` · `refatoracao` · `nomes` · `funcoes` · `comentarios` · `formatacao` · `objetos` · `erros` · `testes` · `classes` · `java` · `python`

## Quando acionar

- Nomear variáveis, funções, classes ou módulos.
- Extrair/encurtar funções; reduzir parâmetros e efeitos colaterais.
- Decidir se um comentário explica *porquê* ou só repete o óbvio.
- Formatar código para leitura em equipe.
- Modelar objetos/classes com responsabilidade clara.
- Tratar erros sem engolir exceções nem misturar fluxo feliz com ruído.
- Escrever ou melhorar testes unitários.
- Revisar PR ou refatorar código legado ilegível.

## Tese (para o agente)

1. **Funcionar não basta** — código ilegível atrasa manutenção, onboarding e evolução; o caminho até o resultado importa tanto quanto o resultado.
2. **Nomes revelam intenção** — claros, sem confusão (0/O/l/1), sem “graça”, sem mapeamento mental; verbos para funções, substantivos para classes.
3. **Funções pequenas e com um propósito** — poucas responsabilidades, poucos parâmetros; preferir legibilidade a “esperteza”.
4. **Comentários são custo** — preferir código autoexplicativo; comentar *porquê* e restrições, não o óbvio.
5. **Formatação é comunicação** — consistência vertical/horizontal ajuda o olho a achar estrutura.
6. **Objetos e classes com foco** — coesão alta; evitar “classes faz-tudo”.
7. **Erros explícitos** — não silenciar falhas; separar tratamento do fluxo principal quando possível.
8. **Testes unitários sustentam mudança** — cobrir comportamento; testes claros também são documentação.
9. **Limpeza é progressiva** — não exige 100% perfeito de uma vez; melhore o que toca (boy scout).
10. **Exemplos do livro são Java/Python para iniciantes** — adaptar o espírito às convenções deste repositório (HTML/CSS/JS clássico, Node de ferramentas, etc.).

## Capítulos (âncoras no MD)

1. O que é Código Limpo  
2. Bons nomes  
3. Funções  
4. Comentários de código  
5. Formatação de código  
6. Objetos  
7. Tratamento de erros  
8. Testes de unidade  
9. Classes  
10–12. Apêndices (convenções, ferramentas, referências)

O Markdown convertido preserva o texto, mas headings `#` são raros (quebras de linha do PDF). Use Grep por títulos de seção (`2.1`, `Bons nomes`, etc.).

## Limites

- **Não substitui** regras do repositório, ADRs, `metodo/CONVENCOES.md` nem o stack do piloto (HTML estático + JS clássico).
- Exemplos Java/Python do livro **não** viram mandato de framework ou linguagem neste repo.
- Em conflito: **ADRs e rules do projeto vencem**.
- Direitos autorais da obra pertencem ao autor/editora; não redistribuir o PDF nem o MD como publicação do projeto.
