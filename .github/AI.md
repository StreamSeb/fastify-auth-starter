# Fastify Auth Starter - AI Documentation

## Project Overview

This is a TypeScript-based Fastify API starter template that provides authentication and database integration. It's designed to be a foundation for building secure, scalable APIs.

## Key Components

### Authentication

- JWT-based authentication
- Multiple auth modes (JWT, API Key, None)
- Secure password handling
- Role-based access control

### Database

- PostgreSQL with Knex.js
- Type-safe database queries
- Migration and seeding support
- Connection pooling

### API Structure

- RESTful endpoints
- Modular architecture
- Type-safe request/response handling
- Rate limiting

## File Structure

```
src/
├── config/         # Configuration files (knexfile, env vars)
├── controllers/    # Request handlers
├── plugins/        # Fastify plugins (auth, db)
├── routes/         # API route definitions
├── services/       # Business logic
├── types/          # TypeScript type definitions
└── index.ts        # Application entry point
```

## Development Guidelines

- Use TypeScript for all new code
- Follow the existing architectural patterns
- Keep migrations and seeds in JavaScript with JSDoc
- Maintain type safety throughout the codebase

## Common Tasks

1. Adding new endpoints:

   - Create route in `routes/`
   - Add controller in `controllers/`
   - Add service in `services/`
   - Update types in `types/`

2. Database changes:

   - Create migration in `migrations/`
   - Update types in `types/`
   - Add seed data if needed

3. Authentication:
   - Use existing auth plugin
   - Add roles/permissions as needed
   - Update user types

## Testing

- Manual testing via API endpoints
- Environment variables for different configurations
- Database seeding for test data

## Deployment

- Build TypeScript to JavaScript
- Use environment variables for configuration
- Run migrations in production
- Use connection pooling
