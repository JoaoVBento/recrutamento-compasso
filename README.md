
#  CompassAPI
  
  
Aplicação de gerenciamento de cidades e cliente, que se relacionam entre si.
  
  
##  Instalação
  
  
Use o gerenciador de pacotes [npm](https://www.npmjs.com/) para instalar todas as dependências.
  
  
```bash 
git clone https://github.com/JoaoVBento/recrutamento-compasso.git
  
cd recrutamento-compasso
  
npm install  
```
  
  
##  Usabilidade
  
  
Inicie a API com o seguinte comando.
  
```bash 
npm run docs 
```
  
Accesse do navegador.
  
  
[http://localhost:3000/doc]()


Para iniciar a rotina de testes utilize o seguinte comando.

```bash
npm t
```
  
##  Logging
  
  
A aplicação gera logs, para que possamos ter registro de tudo que acontece à aplicação durante seu uso e analisarmos erros e exceções a qualquer momento, os logs são guardados nos seguintes paths: `logs/app/*.log` - para logs de aplicação; `logs/http/*log` - para logs http. Para visualizar os logs a aplicação faz uso do pacote `json-log-viewer` , para visualizá-los utilize os comandos abaixo.
  
```bash
npm install --global json-log-viewer

jv log-you-want-to-visualize.log --timestamp  
```
  
Para saber mais sobre [json-log-viewer](https://github.com/gistia/json-log-viewer) visite sua documentação.
  
  
##  Funcionalidades
  
  
-   Cadastrar cidade
-   Cadastrar cliente
Obs: pata cadastrar o cliente, a sua `dataNascimento` deve estar no formato `MM-dd-yyyy` que é o padrão norte-americano de datas
Obs: para cadastrar o cliente, o seu nome deve ser completo, ou seja, ele não aceitará nomes únicos (apenas "joao", por exemplo), sendo obrigatório especificar seu sobrenome (Ex: "João Bento")
-   Consultar cidade pelo nome
-   Consultar cidade pelo estado
-   Consultar cliente pelo nome
-   Consultar cliente pelo Id
-   Remover cliente
-   Alterar o nome do cliente
Obs: a mesma regra do nome que se aplica à rota de cadastro de cliente se aplica a essa rota
  
##  Licença
  
ISC.
  
  
##  Status do projeto
  
Em desenvolvimento.
