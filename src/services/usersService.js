import bcrypt from "bcrypt";

export default class UsersService {
  constructor(db) {
    this.db = db;
  }

  async getAllUsers() {
    return await this.db("users").select(
      "id",
      "username",
      "email",
      "role",
      "created_at",
      "updated_at"
    );
  }

  async createUser(userData) {
    const { username, email, password, role = "user" } = userData;

    // Hash the password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const [user] = await this.db("users")
      .insert({
        username,
        email,
        password_hash,
        role,
      })
      .returning([
        "id",
        "username",
        "email",
        "role",
        "created_at",
        "updated_at",
      ]);

    return user;
  }

  async updateUser(id, userData) {
    const { username, email, password, role } = userData;
    const updateData = { ...userData, updated_at: new Date() };

    // If password is provided, hash it
    if (password) {
      const saltRounds = 10;
      updateData.password_hash = await bcrypt.hash(password, saltRounds);
      delete updateData.password;
    }

    const [user] = await this.db("users")
      .where({ id })
      .update(updateData)
      .returning([
        "id",
        "username",
        "email",
        "role",
        "created_at",
        "updated_at",
      ]);

    return user;
  }

  async deleteUser(id) {
    return await this.db("users").where({ id }).del();
  }

  async authenticateUser(username, password) {
    const user = await this.db("users").where({ username }).first();

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return null;
    }

    // Return user data without password_hash
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUserByUsername(username) {
    const user = await this.db("users").where({ username }).first();

    if (!user) {
      return null;
    }

    // Return user data without password_hash
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
