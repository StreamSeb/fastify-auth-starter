import Fastify from "fastify";
import dotenv from "dotenv";
import dbPlugin from "./plugins/db.js";
import authPlugin from "./plugins/auth.js";
import userRoutes from "./routes/users.js";
import UsersServiceImpl from "./services/usersService.js";
import UsersControllerImpl from "./controllers/usersController.js";

// Load environment variables
dotenv.config();

const server = Fastify({
  logger: true,
});

// Register database plugin
await server.register(dbPlugin);

// Create services
const usersService = new UsersServiceImpl(server.db);

// Create controllers
const usersController = new UsersControllerImpl(usersService);

// Register auth plugin
await server.register(authPlugin, { usersService });

// Register routes
await server.register(userRoutes, { usersController });

// Start server
try {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
  await server.listen({ port, host: "0.0.0.0" });
  console.log(`Server is running on port ${port}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
