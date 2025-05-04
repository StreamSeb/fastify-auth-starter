export default class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  async getUsers(request, reply) {
    const users = await this.usersService.getAllUsers();
    return { users };
  }

  async createUser(request, reply) {
    const { username, email, password, role } = request.body;

    // Validate required fields
    if (!username || !email || !password) {
      return reply.code(400).send({
        error: "Missing required fields",
        details: "Username, email, and password are required",
      });
    }

    try {
      const user = await this.usersService.createUser({
        username,
        email,
        password,
        role,
      });
      return reply.code(201).send({ user });
    } catch (error) {
      // Handle unique constraint violations
      if (error.code === "23505") {
        // PostgreSQL unique violation code
        return reply.code(400).send({
          error: "User already exists",
          details: "Username or email is already taken",
        });
      }
      throw error;
    }
  }

  async updateUser(request, reply) {
    const { id } = request.params;
    const { username, email, password, role } = request.body;

    // Validate that at least one field is provided
    if (!username && !email && !password && !role) {
      return reply.code(400).send({
        error: "No update data provided",
        details:
          "At least one field (username, email, password, or role) must be provided",
      });
    }

    try {
      const user = await this.usersService.updateUser(id, {
        username,
        email,
        password,
        role,
      });

      if (!user) {
        return reply.code(404).send({ error: "User not found" });
      }

      return reply.send({ user });
    } catch (error) {
      // Handle unique constraint violations
      if (error.code === "23505") {
        return reply.code(400).send({
          error: "Update failed",
          details: "Username or email is already taken",
        });
      }
      throw error;
    }
  }

  async deleteUser(request, reply) {
    const { id } = request.params;
    const deleted = await this.usersService.deleteUser(id);

    if (deleted === 0) {
      return reply.code(404).send({ error: "User not found" });
    }

    return reply.send({ message: "User deleted" });
  }
}
