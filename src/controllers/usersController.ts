import { FastifyRequest, FastifyReply } from "fastify";
import {
  UsersController,
  CreateUserDTO,
  UpdateUserDTO,
} from "../types/index.js";

export default class UsersControllerImpl implements UsersController {
  constructor(private usersService: any) {}

  async getUsers(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const users = await this.usersService.getAllUsers();
    return reply.send({ users });
  }

  async createUser(
    request: FastifyRequest<{ Body: CreateUserDTO }>,
    reply: FastifyReply
  ): Promise<void> {
    const { username, email, password, role } = request.body;

    if (!username || !email || !password) {
      return reply.code(400).send({
        error: "Bad Request",
        details: "Username, email, and password are required",
      });
    }

    const user = await this.usersService.createUser({
      username,
      email,
      password,
      role,
    });

    return reply.code(201).send(user);
  }

  async updateUser(
    request: FastifyRequest<{ Params: { id: string }; Body: UpdateUserDTO }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = parseInt(request.params.id);
    const { username, email, password, role } = request.body;

    if (!username && !email && !password && !role) {
      return reply.code(400).send({
        error: "Bad Request",
        details:
          "At least one field (username, email, password, or role) must be provided",
      });
    }

    const user = await this.usersService.updateUser(id, {
      username,
      email,
      password,
      role,
    });

    return reply.send(user);
  }

  async deleteUser(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = parseInt(request.params.id);
    await this.usersService.deleteUser(id);
    return reply.code(204).send();
  }
}
