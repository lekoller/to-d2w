# To D2W - minha aplicação de ToDo List

Esta é a minha proposta de solução ao teste. Utilizei Vite para auxiliar a criação do front em React e Flask Restful para a API. Gerei a documentação da API no insomnia, e o arquivo pode ser importado do arquivo `insomnia_doc.json`, aqui na raiz.

## Rodando a aplicação

Tomei a liberdade de commitar os arquivos `.env` do backend e do front para facilitar a execução do teste, portando basta verificar se as portas `8000` e `8080` estão diponíveis para executar a aplicação com o comando `docker-compose up` ou `docker compose up`, a depender da versão e a configuração do Docker na sua máquina. Então, ao fim da inicialização dos containter, o front-end deve estar disponível em `http://localhost:8080`.

## Observações

- Na primeira execução o backend provavelmente tentará acessar o banco antes deste estar pronto e o restart do container cuidará disso.

- Na necessidade de alterar as portas, é preciso alterar o arquivo `docker-compose.yml` e os respectivos `Dockerfile` e `.env` dos subdiretórios `/back` e `/front`.