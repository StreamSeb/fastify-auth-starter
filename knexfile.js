// knexfile.js
import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      database: process.env.DB_NAME || "fastify_api",
    },
    migrations: {
      directory: "./migrations",
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./migrations",
    },
  },
};
