# API Gerador de Provas

## Aluna
**Nome completo:** Emilly Tainá da Silva Alves

---

## Sobre a atividade

Esta atividade teve como objetivo desenvolver uma API para gerenciamento de um sistema de geração de provas, utilizando Node.js, Express, Prisma ORM e PostgreSQL.

Durante o desenvolvimento foi realizada a criação da estrutura do banco de dados, configuração do Prisma, criação das migrations e implementação dos relacionamentos entre as entidades do sistema.

A API permite o gerenciamento de:

- Usuários (professores e administradores);
- Disciplinas/matérias;
- Questões de provas.

Também foram desenvolvidas rotas para consulta dos dados e validação do funcionamento da aplicação através do Bruno, realizando testes das requisições HTTP.

## Como executar o projeto

Instalar dependências
```bash
npm install
```
Executar as migrations do Prisma:
```bash
npx prisma migrate dev
```
Gerar o Prisma Client:
```bash
npx prisma generate
```
Iniciar a API:
```bash
npm run dev
```
A API estará disponível em:
```bash
http://localhost:3000
```
## Créditos

Projeto desenvolvido com auxílio do ChatGPT (OpenAI) para tirar dúvidas, ajudar na configuração do projeto, corrigir erros e entender melhor as tecnologias utilizadas.
