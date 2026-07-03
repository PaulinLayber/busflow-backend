Tecnologias
Node.js
NestJS
TypeScript
Prisma ORM
MariaDB
Python
Docker
REST API

Estrutura do projeto
busflow/

├── backend/
│   ├── src/
│   │   ├── horarios/
│   │   ├── database/
│   │   └── ...
│   ├── prisma/
│   └── Dockerfile
│
├── scraper/
│   ├── scraper.py
│   └── horarios_planeta.json
│
└── docker-compose.yml
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

🗄 Banco de Dados

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

📖 Aprendizados

Durante o desenvolvimento deste projeto foram aplicados conceitos importantes de backend, incluindo:

Arquitetura modular com NestJS
Separação de responsabilidades
Web Scraping
Persistência utilizando Prisma ORM
Modelagem de banco de dados
APIs REST
Organização de projeto em múltiplos serviços
👨‍💻 Autor

Paulo Layber

Desenvolvedor Backend focado em Node.js, NestJS e TypeScript.

LinkedIn:
https://www.linkedin.com/in/paulolayber/
