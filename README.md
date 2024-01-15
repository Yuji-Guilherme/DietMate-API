# 📁 Diet Mate API

## ✔ Resumo do Projeto
Api do Diet Mate, website para criar dietas e treinos.

> Os dados utilizados na listagem de alimentos são os mesmos que o do projeto [``Quantas calorias tem?``](https://github.com/Yuji-Guilherme/Quantas-calorias-tem)

## Funcionalidades
1. Acesso a uma lista de alimentos
2. Acesso a uma lista de exercícios
3. CRUD de usuário
4. CRUD das dietas do usuário
5. CRUD dos treinos do usuário

## 🛠 Tecnologias e Ferramentas utilizadas
- ``Node.js``
- ``Express``
- ``Typescript``
- ``Bcrypt.js``
- ``Dotenv``
- ``Cors``
- ``JsonWebToken``
- ``Mongoose``
- ``Swagger``
- ``Eslint``
- ``Prettier``
- ``Vitest``
- ``Supertest``
- ``Tsup``
- ``Tsx``

## 🍪 Cookies
Ao autenticar o usuário, são gerados dois tokens: um de refresh, utilizado para regenerar os tokens, e um de acesso necessário para as rotas que modificarão, buscarão ou deletarão informações ou o próprio usuário.

## 🧪 Testes
Para os testes de integração realizados, foram utilizados o Vitest + Supertest. Os arquivos de teste estão na pasta ``tests``.

> A pasta ``tests`` está fora de ``src`` para não ser compilada quando ocorrer o build do projeto.

## 🗎 Documentação
A documentação da API foi feita com o Swagger e é acessível na rota ``/doc``.
