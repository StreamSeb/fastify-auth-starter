export default class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  async getUsers(request, reply) {
    const users = await this.usersService.getAllUsers();
    return { users };
  }

  async createUser(request, reply) {
    const { name } = request.body;
    if (!name) {
      return reply.status(400).send({ error: "Name is required" });
    }

    const user = await this.usersService.createUser({ name });
    return reply.code(201).send({ user });
  }

  async updateUser(request, reply) {
    const { id } = request.params;
    const { name } = request.body;

    if (!name) {
      return reply.status(400).send({ error: "Name is required" });
    }

    const user = await this.usersService.updateUser(id, { name });
    if (!user) {
      return reply.status(404).send({ error: "User not found" });
    }

    return reply.send({ user });
  }

  async deleteUser(request, reply) {
    const { id } = request.params;
    const deleted = await this.usersService.deleteUser(id);

    if (deleted === 0) {
      return reply.status(404).send({ error: "User not found" });
    }

    return reply.send({ message: "User deleted" });
  }
}
