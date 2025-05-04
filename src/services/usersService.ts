import bcrypt from "bcrypt";
import { Knex } from "knex";
import {
  User,
  UserWithoutPassword,
  CreateUserDTO,
  UpdateUserDTO,
  UsersService,
} from "../types/index.js";

const saltRounds = 10;

export default class UsersServiceImpl implements UsersService {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async getAllUsers(): Promise<UserWithoutPassword[]> {
    const users = await this.db("users").select(
      "id",
      "username",
      "email",
      "role",
      "created_at",
      "updated_at"
    );
    return users;
  }

  async createUser(userData: CreateUserDTO): Promise<UserWithoutPassword> {
    const { username, email, password, role = "user" } = userData;

    // Hash the password
    const password_hash = await bcrypt.hash(password, saltRounds);

    const [user] = await this.db("users")
      .insert({
        username,
        email,
        password_hash,
        role,
        created_at: new Date(),
        updated_at: new Date(),
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

  async updateUser(
    id: number,
    userData: UpdateUserDTO
  ): Promise<UserWithoutPassword> {
    const { username, email, password, role } = userData;
    const updateData: Partial<User> = {
      ...(username && { username }),
      ...(email && { email }),
      ...(role && { role }),
      updated_at: new Date(),
    };

    // If password is provided, hash it
    if (password) {
      updateData.password_hash = await bcrypt.hash(password, saltRounds);
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

  async deleteUser(id: number): Promise<number> {
    return await this.db("users").where({ id }).del();
  }

  async authenticateUser(
    username: string,
    password: string
  ): Promise<UserWithoutPassword | null> {
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

  async getUserByUsername(
    username: string
  ): Promise<UserWithoutPassword | null> {
    const user = await this.db("users").where({ username }).first();

    if (!user) {
      return null;
    }

    // Return user data without password_hash
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
