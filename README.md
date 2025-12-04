# Cliniq - Guia de Inicialização

Este guia explica como configurar e iniciar o projeto Cliniq para testes locais.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **Yarn** (gerenciador de pacotes)
- **MySQL** (banco de dados)
- **Git**

## 🗄️ Configuração do Banco de Dados

1. Crie um banco de dados MySQL:

CREATE DATABASE cliniq CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;2. Anote as credenciais do banco de dados (host, porta, usuário, senha) para usar na configuração do backend.

## 🔧 Configuração do Backend (API)

### 1. Instalar Dependências

Navegue até a pasta `api` e instale as dependências:

cd api
yarn install
### 2. Configurar Variáveis de Ambiente

Execute o comando abaixo, isso fará com que as env's basicas sejam geradas e com isso fazemos as alterações necessárias
```
yarn generate:env
```
# Envs:
```
### Servidor
PORT=3001

NODE_ENV=development

TIMEZONE=America/Sao_Paulo

### Logger
LOGGING=true
DEBUG_MODE=false
LOG_PERSIST_MODE=none
LOG_DIRECTORY=logs
MAX_MEMORY_LOGS=100
LOG_REQUEST_LEVEL=all

### Database
DB_NAME=cliniq
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario_mysql
DB_PASSWORD=sua_senha_mysql

# JWT
JWT_SECRET_KEY=sua_chave_secreta_jwt_aqui
JWT_EXPIRES_IN=7d
```
- Substitua `seu_usuario_mysql` e `sua_senha_mysql` pelas credenciais do seu MySQL
- Gere uma chave secreta segura para `JWT_SECRET_KEY` (pode usar um gerador online ou comando `openssl rand -base64 32`) ou apenas utilizar um uuid

### 3. Executar Migrations

Execute as migrations para criar as tabelas no banco de dados:
```
yarn sequelize db:migrate
```
### 4. Executar Seeds (Opcional)

Execute os seeds para criar dados iniciais (como usuário administrador):

```
yarn sequelize db:seed:all### 5. Iniciar o Servidor
```
Para desenvolvimento (com hot-reload):
```
yarn dev
```
O servidor estará rodando em `http://localhost:3001` (ou na porta configurada no `.env`).

## 🎨 Configuração do Frontend (Web)

### 1. Instalar Dependências

Navegue até a pasta `web` e instale as dependências:
```
cd web
yarn install
```
### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na pasta `web` com as seguintes variáveis:
```
NULLSTACK_PROJECT_NAME="[dev] Cliniq"
NULLSTACK_PROJECT_DOMAIN="localhost"
NULLSTACK_PROJECT_COLOR="#D22365"
NULLSTACK_SERVER_PORT="3000"
NULLSTACK_ENDPOINT="http://localhost:3001"
```
**Importante:**
- `NULLSTACK_ENDPOINT` deve apontar para a URL do backend (ajuste a porta se necessário)

### 3. Iniciar o Frontend

Para desenvolvimento:
```
yarn dev
```
O frontend estará rodando em `http://localhost:3000`.

## 🚀 Iniciando o Projeto Completo

Para testar o projeto completo, você precisa ter **dois terminais** abertos:

### Terminal 1 - Backend
```
cd api
yarn dev
```
### Terminal 2 - Frontend:
```
cd web
yarn dev
```
Depois, acesse:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001

## 📝 Comandos Úteis

### Backend (API)

- `yarn dev` - Inicia o servidor em modo desenvolvimento
- `yarn build` - Compila o TypeScript para produção
- `yarn start` - Inicia o servidor em modo produção (após build)
- `yarn sequelize db:migrate` - Executa migrations pendentes
- `yarn sequelize db:migrate:undo` - Reverte a última migration
- `yarn sequelize db:seed:all` - Executa todos os seeds
- `yarn format` - Formata o código usando Biome

### Frontend (Web)

- `yarn dev` - Inicia o servidor de desenvolvimento
- `yarn build` - Gera build de produção

## 🔍 Verificando se Está Funcionando

1. **Backend:** Verifique se aparece a mensagem "Database connected" no terminal
2. **Frontend:** Acesse http://localhost:3000 e verifique se a página carrega
3. **Login:** Tente fazer login com as credenciais criadas pelo seed (se executou)

## ⚠️ Troubleshooting

### Erro de conexão com o banco de dados
- Verifique se o MySQL está rodando
- Confirme as credenciais no arquivo `.env` do backend
- Verifique se o banco de dados foi criado

### Erro de porta já em uso
- Altere a porta no arquivo `.env` (backend ou frontend)
- Certifique-se de que não há outros processos usando as portas 3000 ou 3001

### Erro ao executar migrations
- Verifique se o banco de dados existe
- Confirme se as credenciais estão corretas
- Execute `yarn sequelize db:migrate:status` para ver o status das migrations

### Frontend não consegue conectar com o backend
- Verifique se o backend está rodando
- Confirme se a variável `NULLSTACK_ENDPOINT` no `.env` do frontend está correta
- Verifique se não há problemas de CORS (o backend deve estar configurado para aceitar requisições do frontend)

## 📚 Estrutura do Projeto

```
cliniq/
├── api/              # Backend (API REST)
│   ├── src/
│   │   ├── config/   # Configurações
│   │   ├── database/ # Models, migrations e seeds
│   │   ├── modules/  # Módulos da aplicação
│   │   └── server.ts # Ponto de entrada
│   └── .env          # Variáveis de ambiente
│
└── web/              # Frontend (Nullstack)
    ├── src/
    │   ├── modules/  # Módulos da aplicação
    │   └── util/     # Utilitários
    └── .env          # Variáveis de ambiente
```

## 🆘 Suporte

Se encontrar problemas, verifique:
1. Versões do Node.js e Yarn
2. Logs do terminal (backend e frontend)
3. Console do navegador (F12)
4. Status do banco de dados MySQL

## Print

<img width="500" height="966" alt="Screenshot 2025-12-04 at 11 47 13" src="https://github.com/user-attachments/assets/82ea446a-ea58-45be-8111-60a9181267bf" />
<img width="500" height="966" alt="Screenshot 2025-12-04 at 11 47 32" src="https://github.com/user-attachments/assets/b25ed31e-93e9-4919-ab18-38c5d55d44fc" />
<img width="500" height="966" alt="Screenshot 2025-12-04 at 11 49 21" src="https://github.com/user-attachments/assets/7d1a6fd8-42a8-44f0-aeb6-9b3f03b856ee" />
<img width="500" height="966" alt="Screenshot 2025-12-04 at 11 49 57" src="https://github.com/user-attachments/assets/3ceefbef-84de-499b-8bd4-5ad4b79752c1" />
<img width="500" height="966" alt="Screenshot 2025-12-04 at 11 50 07" src="https://github.com/user-attachments/assets/3e31ffb4-dd10-4584-94d5-ff0c1233cc3b" />
<img width="500" height="966" alt="Screenshot 2025-12-04 at 11 50 50" src="https://github.com/user-attachments/assets/6f081898-ea84-43d2-91bc-a3072b4ba5e1" />
<img width="500" height="966" alt="Screenshot 2025-12-04 at 11 51 04" src="https://github.com/user-attachments/assets/8d694cde-1a32-4591-a414-4c69d65bc138" />
<img width="500" height="966" alt="Screenshot 2025-12-04 at 11 51 21" src="https://github.com/user-attachments/assets/c27780de-b8f8-4af5-8917-9e0121e6faba" />

