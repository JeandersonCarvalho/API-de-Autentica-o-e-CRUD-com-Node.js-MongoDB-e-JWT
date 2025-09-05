# API de Autenticação e CRUD com Node.js, MongoDB e JWT

## 📌 Descrição

Esta é uma **API REST** desenvolvida em **Node.js** com **MongoDB** e **JWT** para autenticação.
Ela permite:

* Registro e login de usuários com **hash de senhas (bcrypt)**.
* Autenticação baseada em **access e refresh tokens**.
* CRUD protegido de itens (antes chamado de "todos"), associado ao dono.
* Validação de entrada com **Zod**.
* Suporte a **CORS** para requisições externas.

---

## 🛠 Tecnologias Utilizadas

* **Node.js**
* **Express.js**
* **MongoDB** + **Mongoose**
* **JWT (jsonwebtoken)**
* **bcryptjs**
* **Zod** para validação
* **Postman** para testes
* **dotenv** para variáveis de ambiente
* **CORS** habilitado

---

## 📂 Estrutura de Pastas

```
src/
├─ config/
│   └─ db.js
│
├─ controllers/
│   ├─ authController.js
│   └─ modelControllers.js
│
├─ middlewares/
│   ├─ authenticate.js
│   └─ validate.js
│
├─ models/
│   ├─ Users.js
│   └─ Model.js
│
├─ routes/
│   ├─ authRoutes.js
│   └─ modelRoutes.js
|
├─ utils/
│   └─ token.js
│
├─ server.js
.env
```

---

## 🔑 Rotas da API

### **Autenticação**

| Método | Rota             | Descrição                                                     |
| ------ | ---------------- | ------------------------------------------------------------- |
| POST   | `/auth/register` | Cria um novo usuário (`name`, `email`, `password`)            |
| POST   | `/auth/login`    | Realiza login e retorna `{accessToken, refreshToken, user}`   |
| POST   | `/auth/refresh`  | Recebe `refreshToken` e retorna novos tokens                  |
| GET    | `/auth/me`       | Retorna dados do usuário autenticado (necessita access token) |
| DELETE | `/auth//id`      | Delete o usuário por (`ID`)                                       |
| GET    | `/auth/`         | Retorna dados de todos os usuários (necessita access token)   |

### **CRUD de Itens**

| Método | Rota         | Descrição                               |
| ------ | ------------ | --------------------------------------- |
| POST   | `/items`     | Cria um item (`title`, `done` opcional) |
| GET    | `/items`     | Lista apenas os itens do usuário logado |
| GET    | `/items/:id` | Retorna um item específico do usuário   |
| PUT    | `/items/:id` | Atualiza um item do usuário             |
| DELETE | `/items/:id` | Remove um item do usuário               |

> Todas as rotas `/items` são **protegidas** pelo middleware `authenticate`.

---

## 🔐 Autenticação

* **Access token:** expira em \~15 minutos.
* **Refresh token:** expira em \~7 a 30 dias.
* Senhas são armazenadas **somente com hash (bcrypt)**.
* Para acessar rotas protegidas, envie o header:

```
Authorization: Bearer <accessToken>
```

---

## 🧪 Testes

* A API foi testada usando **Postman**.
* Foi criada uma **collection de teste** contendo todas as rotas, validações e exemplos de requests/responses.
* Para testar:

  1. Faça registro e login de um usuário.
  2. Use o `accessToken` para acessar `/me` e as rotas `/items`.
  3. Use `/auth/refresh` para renovar tokens expirados.

---

## ⚙️ Instalação e Execução

1. Clonar o repositório:

```bash
git clone <seu-repositório>
cd <nome-do-projeto>
```

2. Instalar dependências:

```bash
npm install
```

3. Criar arquivo `.env` com as variáveis:

```
PORT=3000
MONGODB_URI=<sua-string-mongodb>
JWT_ACCESS_SECRET=<secret-access>
JWT_REFRESH_SECRET=<secret-refresh>
ACCESS_EXPIRES=15m
REFRESH_EXPIRES=7d
```

4. Rodar o servidor:

```bash
npm run dev
```

5. A API estará disponível em:

```
http://localhost:3000
```



## 📌 Observações

* Todas as entradas são validadas com **Zod**.
* Mensagens de erro detalhadas retornam em caso de dados inválidos.
* Rotas `/items` são sempre associadas ao usuário logado via `owner = userId`.

