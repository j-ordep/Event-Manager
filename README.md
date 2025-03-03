# Event-Manager

O Event Manager é uma API REST (CRUD) desenvolvida para gerenciar inscrições em eventos. O sistema permite que usuários convidem outras pessoas, contabilizando esses convites para diferentes propósitos, como premiações para aqueles que mais convidaram ou sorteios com maiores chances para quem possui mais convites acumulados.

## Tecnologias Utilizadas

- TypeScript
- Fastify (Framework web leve e otimizado para alta performance)
- Drizzle ORM (Gerenciamento de banco de dados)
- PostgreSQL (Banco de dados relacional)
- Redis (Cache e armazenamento de convites)
- Docker (Containerização para facilitar o ambiente de desenvolvimento e produção)
- Swagger (Documentação da API)

### Estrutura do Projeto

#### O sistema segue um modelo RESTful para manipulação de dados e opera por meio das seguintes entidades principais:

- Usuários: Pessoas que se inscrevem nos eventos e podem convidar outros participantes.

- Eventos: Representam os eventos que podem ser gerenciados.

- Convites: Relação entre usuários e eventos, contabilizando os convites realizados.

## Arquitetura

#### A estrutura do projeto é modular e baseada em handlers do Fastify, sem uma separação explícita de camadas como Controller, Service e Repository. O fluxo principal do sistema está organizado em:

- Rotas: Definição dos endpoints da API no Fastify.

- Banco de Dados: Gerenciado pelo Drizzle ORM, realizando interação direta com o PostgreSQL.

- Cache: Utilização do Redis para otimizar a contagem de convites.

- Lógica de Convites: Mecanismo para contabilizar convites e determinar elegibilidade para premiações ou sorteios.

## Funcionalidades Principais

- CRUD completo para eventos e usuários.

- Gerenciamento de inscrições em eventos.

- Contabilização de convites realizados por usuários.

- Implementação de premiação e sorteios baseados na quantidade de convites.

- Uso de cache com Redis para otimizar consultas e desempenho.

## Documentação

A API conta com documentação interativa utilizando Swagger, permitindo explorar os endpoints e testar as requisições diretamente pela interface.

## Execução do Projeto

Para rodar o projeto localmente utilizando Docker:

#### Subir os containers do banco de dados e cache
`docker-compose up -d`

#### Instalar dependências
`npm install`

#### Rodar a aplicação
`npm run dev`
