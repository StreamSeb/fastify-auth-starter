# 🚀 Fastify JWT Authentication API

A lightweight, secure, and flexible authentication API built with Fastify, JWT, and PostgreSQL. Perfect for handling user authentication in your applications!

## ✨ Features

- 🔐 JWT-based authentication
- 🔒 Secure password hashing with bcrypt
- 📦 PostgreSQL database with Knex.js
- ⚡ Fastify for high performance
- 🛡️ Rate limiting
- 🔄 Flexible authentication modes (JWT, API Key, or None)
- 🐳 Docker support

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/fastify-knex-api.git
cd fastify-knex-api
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up your environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=fastify_api

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=3001

# Auth Mode (jwt, api-key, or none)
AUTH_MODE=jwt
```

4. Start the database (using Docker):

```bash
docker-compose up -d
```

5. Run migrations:

```bash
pnpm migrate
```

6. Start the server:

```bash
pnpm dev
```

## 📚 API Endpoints

### Public Endpoints

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

#### Login

```http
POST /api/login
Content-Type: application/json

{
  "username": "newuser",
  "password": "securepassword123"
}
```

### Protected Endpoints (Requires JWT)

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

### Authentication Modes

The API supports three authentication modes, configurable via `AUTH_MODE` in `.env`:

- `jwt`: JWT-based authentication (default)
- `api-key`: API key authentication
- `none`: No authentication (for development)

### Rate Limiting

Default rate limit is 100 requests per minute. Adjust in `src/plugins/auth.js` if needed.

## 🛠️ Development

### Available Scripts

- `pnpm dev`: Start development server
- `pnpm start`: Start production server
- `pnpm migrate`: Run database migrations
- `pnpm migrate:reset`: Reset and run all migrations

### Project Structure

```
├── src/
│   ├── controllers/    # Request handlers
│   ├── services/       # Business logic
│   ├── routes/         # Route definitions
│   └── plugins/        # Fastify plugins
├── migrations/         # Database migrations
├── seeds/             # Database seeds
└── knexfile.js        # Knex configuration
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token expiration (1 hour)
- Rate limiting
- Input validation
- Secure password storage

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- [Fastify](https://www.fastify.io/)
- [Knex.js](https://knexjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
