# BusFlow

Sistema desenvolvido para automatizar a coleta, armazenamento e disponibilização de horários de ônibus.

O projeto utiliza **Web Scraping** para extrair os horários diretamente do site da empresa de transporte, processa os dados e os disponibiliza através de uma API REST construída com **NestJS**.

> Projeto desenvolvido com foco em arquitetura backend, automação de dados e boas práticas utilizando Node.js.

---

# Objetivo

O BusFlow nasceu para resolver um problema comum:

Os horários de ônibus normalmente ficam disponíveis apenas em páginas HTML pouco estruturadas, dificultando consultas, integrações e reutilização dos dados.

O sistema automatiza esse processo em três etapas:

1. Coleta dos horários através de Web Scraping
2. Tratamento e normalização dos dados
3. Disponibilização através de uma API REST

---

#  Arquitetura

```

```
          Site da empresa
                 │
                 ▼
        Python Web Scraper
                 │
          JSON Processado
                 │
                 ▼
         Importação (NestJS)
                 │
                 ▼
             MariaDB
                 │
                 ▼
           API REST (NestJS)
```





Tecnologias:
 Node.js
 NestJS
 TypeScript
 Prisma ORM
 MariaDB
 Python
 Docker
 REST API

 Funcionalidades
- Extração automática de horários
- Importação de dados para banco
- API REST para consulta
- Persistência utilizando Prisma ORM
- Arquitetura modular do NestJS
- Separação entre scraper e backend
  
 Endpoints
  Buscar todos os horários
  GET /horarios

Resposta

[
  {
    "linha": "Centro",
    "horario": "06:30"
  }
]
Importar horários
POST /horarios/import

Executa a importação dos dados extraídos pelo scraper.

Banco de Dados

O projeto utiliza:

MariaDB
Prisma ORM
Migrations

Modelo simplificado:

Horario

id
linha
horario
sentido
dias

Como executar
Clonar
git clone https://github.com/seuusuario/busflow.git
Backend
cd backend

npm install
Banco

Configure o arquivo .env

DATABASE_URL="..."

Execute as migrations

npx prisma migrate deploy

Inicie a aplicação

npm run start:dev
Scraper
cd scraper

pip install -r requirements.txt

python scraper.py

Aprendizados:

Durante o desenvolvimento deste projeto foram aplicados conceitos importantes de backend, incluindo:

Arquitetura modular com NestJS
Separação de responsabilidades
Web Scraping
Persistência utilizando Prisma ORM
Modelagem de banco de dados
APIs REST
Organização de projeto em múltiplos serviços

Autor:

Paulo Layber

Desenvolvedor Backend focado em Node.js, NestJS e TypeScript.

LinkedIn:
https://www.linkedin.com/in/paulolayber/
