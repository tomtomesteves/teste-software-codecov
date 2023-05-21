# teste-software-codecov
Trabalho prático da disciplina de teste de software

[![codecov](https://codecov.io/gh/tomtomesteves/teste-software-codecov/branch/main/graph/badge.svg?token=FOUNB5JTWD)](https://codecov.io/gh/tomtomesteves/teste-software-codecov)

Grupos:
- Thomas Esteves
- Rafael Massoni
- Lucas Mariz
- Evaldo Martins

## Resumo

#### Sistema
Crud completo web de cadastro de tasks

#### Backend:
- Python
- Flask
- Pytest

#### Frontend:
- Typescript
- React
- Jest

#### Infra:
- Docker
- Postgres

## Sistema

O sistema é uma aplicação web CRUD completa para gerenciamento de tarefas. Ele permite que os usuários criem, leiam, atualizem e excluam tarefas. Cada tarefa possui um título, descrição e status. A aplicação é composta por um frontend construído com React e TypeScript, e um backend construído com Flask e Python, usando PostgreSQL como banco de dados.

### Frontend
#### Tecnologias
O frontend da aplicação é construído usando React e TypeScript. React é uma biblioteca JavaScript para a construção de interfaces de usuário interativas. TypeScript é um superset de JavaScript que adiciona tipos estáticos, o que pode ajudar a detectar erros mais cedo no processo de desenvolvimento.

#### Estrutura
A estrutura do projeto React é baseada em componentes. Os componentes são reutilizáveis e podem ser combinados para criar a interface do usuário completa. A aplicação inclui componentes para exibir a lista de tarefas, um formulário para criar e atualizar tarefas, e botões para editar e excluir tarefas.

### Backend
#### Tecnologias
O backend é construído com Flask, um microframework Python para desenvolvimento web, e usa PostgreSQL como banco de dados. O Flask fornece as ferramentas necessárias para construir a API REST que o frontend usa para interagir com o banco de dados.

#### Estrutura
O backend segue a estrutura de projeto padrão do Flask. O aplicativo Flask é definido em um arquivo app.py, que inclui rotas para lidar com solicitações CRUD para tarefas. As tarefas são armazenadas em uma tabela no banco de dados PostgreSQL, com colunas para o título, descrição e status de cada tarefa.

### Banco de Dados
#### Tecnologia
O sistema usa o PostgreSQL, um sistema de banco de dados relacional open-source poderoso e flexível.

### Estrutura
O banco de dados contém uma tabela tasks para armazenar as tarefas. Cada tarefa na tabela tem os seguintes campos:

id: um identificador único para a tarefa
title: o título da tarefa
description: uma descrição detalhada da tarefa
status: o status da tarefa (por exemplo, "Não iniciado", "Em andamento", "Concluído")


## Coveragex
https://codecov.io/gh/tomtomesteves/teste-software-codecov/branch/main/graphs/tree.svg?token=FOUNB5JTWD