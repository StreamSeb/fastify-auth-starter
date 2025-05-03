export default class UsersService {
  constructor(db) {
    this.db = db;
  }

  async getAllUsers() {
    return await this.db("users").select("*");
  }

  async createUser(userData) {
    const [user] = await this.db("users").insert(userData).returning("*");
    return user;
  }

  async updateUser(id, userData) {
    const [user] = await this.db("users")
      .where({ id })
      .update({ ...userData, updated_at: new Date() })
      .returning("*");
    return user;
  }

  async deleteUser(id) {
    return await this.db("users").where({ id }).del();
  }
}
