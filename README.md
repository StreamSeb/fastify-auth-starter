# 🚀 Fastify Auth Starter

Hey there! 👋 This is my first public repository, and I'm excited to share it with you! This is a lightweight, secure, and flexible authentication API built with Fastify, JWT, and PostgreSQL. Think of it as your friendly neighborhood authentication system that's ready to protect your applications! 🛡️

## ✨ Features

- 🔐 JWT-based authentication (because who doesn't love secure tokens?)
- 🔒 Secure password hashing with bcrypt (your passwords are safer than my social life)
- 📦 PostgreSQL database with Knex.js (for when you need to store things properly)
- ⚡ Fastify for high performance (it's fast, like really fast)
- 🛡️ Rate limiting (to keep those pesky bots at bay)
- 🔄 Flexible authentication modes (JWT, API Key, or None - because options are nice)
- 🐳 Docker support (containers are cool, right?)

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher) - because we're not living in the past
- PostgreSQL - the database that never lets you down
- pnpm (recommended) or npm - your package manager of choice

### Installation

1. Clone the repository (because copying is caring):

```bash
git clone https://github.com/yourusername/fastify-auth-starter.git
cd fastify-auth-starter
```

2. Install dependencies (this is where the magic begins):

```bash
pnpm install
```

3. Set up your environment variables (the secret sauce):

```bash
cp .env.example .env
```

Edit `.env` with your configuration (don't worry, we've got defaults):

```env
# Database Configuration
# Option 1: Use DATABASE_URL (recommended for production)
DATABASE_URL=postgres://postgres:postgres@localhost:5432/fastify_api

# Option 2: Use individual DB variables (recommended for development)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=fastify_api

# Server Configuration
PORT=3001
NODE_ENV=production

# Authentication Configuration
# Options: none, api-key, jwt
# none: No authentication required (living dangerously)
# api-key: Use x-api-key header for authentication (the classic)
# jwt: Use JWT tokens for authentication (the modern way)
AUTH_MODE=jwt

# JWT Configuration (required if AUTH_MODE=jwt)
# Generate a strong secret for production
JWT_SECRET=your-secret-key

# API Key Configuration (required if AUTH_MODE=api-key)
# Generate a strong API key for production
API_KEY=your-api-key-here
```

4. Start the database (Docker to the rescue):

```bash
# This will start a PostgreSQL database with these default settings:
# - Username: postgres
# - Password: postgres
# - Database name: fastify_api
# - Port: 5432
docker-compose up -d
```

You can customize the database settings by setting these variables in your `.env` file:

```env
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

To stop the database (when you need a break):

```bash
docker-compose down
```

To stop and remove all data (the nuclear option):

```bash
docker-compose down -v
```

5. Run migrations (let's get that database structure ready):

```bash
pnpm migrate
```

6. Start the server (the moment we've all been waiting for):

```bash
pnpm dev
```

## 📚 API Endpoints

### Public Endpoints (no secret handshake required)

#### Register a new user

```http
POST /api/users
Content-Type: application/json

{
  "username": "newuser",
  "email": "user@example.com",
  "password": "securepassword123",
  "role": "user"
}
```

#### Login (where the magic happens)

```http
POST /api/login
Content-Type: application/json

{
  "username": "newuser",
  "password": "securepassword123"
}
```

### Protected Endpoints (bring your JWT token)

#### Get all users

```http
GET /api/users
Authorization: Bearer <your-jwt-token>
```

#### Update user

```http
PUT /api/users/:id
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "username": "updateduser",
  "email": "updated@example.com"
}
```

#### Delete user

```http
DELETE /api/users/:id
Authorization: Bearer <your-jwt-token>
```

## 🔧 Configuration

### Authentication Modes (pick your poison)

The API supports three authentication modes, configurable via `AUTH_MODE` in `.env`:

- `jwt`: JWT-based authentication (default)
  - Requires `JWT_SECRET` to be set
  - Uses Bearer token authentication
- `api-key`: API key authentication
  - Requires `API_KEY` to be set
  - Uses x-api-key header
- `none`: No authentication (for when you're feeling adventurous)

### Rate Limiting

Default rate limit is 100 requests per minute. Adjust in `src/plugins/auth.js` if needed (because sometimes you need to let loose).

## 🛠️ Development

### Available Scripts (your new best friends)

- `pnpm dev`: Start development server (with hot reload, because we're not savages)
- `pnpm start`: Start server in default mode (for when you're feeling basic)
- `pnpm migrate`: Run database migrations (keeping things organized)
- `pnpm migrate:reset`: Reset and run all migrations (when you need a fresh start)

### Project Structure (where the magic lives)

```
├── src/
│   ├── controllers/    # Request handlers (the traffic controllers)
│   ├── services/       # Business logic (where the real work happens)
│   ├── routes/         # Route definitions (the road map)
│   └── plugins/        # Fastify plugins (the cool add-ons)
├── migrations/         # Database migrations (the database's diary)
├── seeds/             # Database seeds (planting the data)
└── knexfile.js        # Knex configuration (the database's instruction manual)
```

## 🔒 Security Features

- Password hashing with bcrypt (because plain text is so 1990s)
- JWT token expiration (1 hour, because nothing lasts forever)
- Rate limiting (to keep the bad guys at bay)
- Input validation (because we don't trust anyone)
- Secure password storage (your secrets are safe with us)

## 🤝 Contributing

Found a bug? Want to add a feature? Feel free to submit a Pull Request! This is my first public repository, so be gentle (but thorough) with your feedback! 😊

## 📝 License

This project is licensed under the ISC License. (It's basically the "do whatever you want, just don't blame me" license)

## 🙏 Acknowledgments

- [Fastify](https://www.fastify.io/) - For being fast and awesome
- [Knex.js](https://knexjs.org/) - For making database stuff less painful
- [PostgreSQL](https://www.postgresql.org/) - The database that never lets you down

Made with ❤️ and probably too much coffee ☕
