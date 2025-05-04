import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { UsersController } from "../types/index.js";

export default async function userRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions & { usersController: UsersController }
): Promise<void> {
  const { usersController } = options;

  fastify.get("/api/users", usersController.getUsers.bind(usersController));
  fastify.post("/api/users", usersController.createUser.bind(usersController));
  fastify.put(
    "/api/users/:id",
    usersController.updateUser.bind(usersController)
  );
  fastify.delete(
    "/api/users/:id",
    usersController.deleteUser.bind(usersController)
  );
}
