# Podcastzada

Repositório público de desenvolvimento de um sistema de podcast utilizando Node.js e arquitetura de microsserviços.

## Instruções

Requisito: 
    Para executar o projeto é necessário ter o docker instalado e configurado.
    Saiba mais aqui: https://www.docker.com/ 

Clone este repositório em sua máquina com o comando: 
` git clone https://github.com/FelipeSoupinski/Podcastzada.git `

Abra o projeto em um terminal.

Execute esse comando para criar a network do projeto:
` docker network create podcastzada `

Navegue até cada pasta iniciada por 'MS_' e dê o comando:
` docker compose up `

Após isso, a aplicação deverá estar funcionando.

Para acesso pela interface, abra o projeto no gerenciador de arquivos.
Vá até o caminho FRONT/Login/ e abra o arquivo login.html em seu navegador.

## Regras de negócio

RN1 - O usuário precisa estar logado no sistema para acessar os recursos/serviços.
    Solução: rota de login retorna jsonwebtoken que é passado nos headers das demais requisições.

RN2 - Um usuário só deve conseguir apagar seus favoritos.
    Solução: verificação, antes de apagar um favorito, de se o favorito pertence ao usuario logado.

RN3 - Um usuário só pode possuir um canal.
    Solução: verificação antes de criar um canal se o usuário já possui um canal.
