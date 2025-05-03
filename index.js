import Fastify from "fastify";
import dotenv from "dotenv";
import dbConnector from "./src/plugins/db.js";
import authPlugin from "./src/plugins/auth.js";
import UsersService from "./src/services/usersService.js";
import UsersController from "./src/controllers/usersController.js";
import userRoutes from "./src/routes/users.js";

dotenv.config();
const fastify = Fastify({ logger: true });

// Register plugins
await fastify.register(dbConnector);
await fastify.register(authPlugin);

// Initialize services and controllers
const usersService = new UsersService(fastify.db);
const usersController = new UsersController(usersService);

// Register routes
await fastify.register(userRoutes, { usersController });

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3001, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
