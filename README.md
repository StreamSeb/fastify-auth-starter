# Fastify Auth Starter

A modern, type-safe Fastify API starter with authentication, database integration, and TypeScript support.

## Features

- 🚀 Fastify 4.x with TypeScript
- 🔐 JWT Authentication
- 🗄️ PostgreSQL with Knex.js
- 📝 TypeScript for type safety
- 🔄 Hot reloading in development
- 🛡️ Rate limiting
- 🏗️ Modular architecture (plugins, services, controllers)

## Prerequisites

- Node.js 18 or higher
- PostgreSQL 12 or higher
- pnpm (recommended) or npm

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/fastify-auth-starter.git
cd fastify-auth-starter
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=fastify_api

# JWT Configuration
JWT_SECRET=your-secret-key

# Server Configuration
PORT=3001

# Authentication Mode (jwt, api-key, or none)
AUTH_MODE=jwt
```

4. Start the database:

```bash
docker-compose up -d
```

5. Run migrations:

```bash
pnpm migrate
```

6. Start the development server:

```bash
pnpm dev
```

The server will be running at `http://localhost:3001` with hot reloading enabled.

## Project Structure

```
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── plugins/        # Fastify plugins
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── types/          # TypeScript type definitions
│   └── index.ts        # Application entry point
├── migrations/         # Database migrations
├── seeds/             # Database seed files
├── dist/              # Compiled JavaScript (ignored in git)
└── docker-compose.yml # Docker configuration
```

## Available Scripts

- `pnpm dev` - Start development server with hot reloading
- `pnpm build` - Build TypeScript files
- `pnpm start` - Start production server
- `pnpm start:prod` - Start production server with production environment
- `pnpm migrate` - Run database migrations
- `pnpm migrate:reset` - Reset and rerun all migrations
- `pnpm migrate:prod` - Run migrations in production environment

## API Endpoints

### Authentication

- `POST /api/login` - Login and get JWT token
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

### Users

- `GET /api/users` - Get all users (requires authentication)
- `POST /api/users` - Create a new user
  ```json
  {
    "username": "new_user",
    "email": "user@example.com",
    "password": "password123",
    "role": "user"
  }
  ```
- `PUT /api/users/:id` - Update a user (requires authentication)
- `DELETE /api/users/:id` - Delete a user (requires authentication)

## Authentication Modes

The API supports three authentication modes, configured via the `AUTH_MODE` environment variable:

1. `jwt` (default) - JWT-based authentication
2. `api-key` - API key authentication (requires `API_KEY` in .env)
3. `none` - No authentication (not recommended for production)

## Development

### TypeScript

This project uses TypeScript for type safety. The source code is in the `src` directory, and the compiled JavaScript is output to the `dist` directory.

Key TypeScript features:

- Strict type checking
- Interface definitions for all data structures
- Type-safe database queries
- Type-safe request/response handling

### Database Migrations

Migrations are written in JavaScript with JSDoc type annotations for IDE support. To create a new migration:

```bash
pnpm knex migrate:make migration_name
```

### Database Seeds

Seed files are also in JavaScript with JSDoc type annotations. To create a new seed:

```bash
pnpm knex seed:make seed_name
```

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Set `DATABASE_URL` with your production database connection string
3. Build the TypeScript files:

```bash
pnpm build
```

4. Start the production server:

```bash
pnpm start:prod
```

## License

MIT
