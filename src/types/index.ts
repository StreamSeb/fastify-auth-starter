import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { JWT } from "@fastify/jwt";

// User related types
export interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserWithoutPassword {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export interface UpdateUserDTO {
  username?: string;
  email?: string;
  password?: string;
  role?: string;
}

// Request/Response types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: UserWithoutPassword;
}

// Fastify instance with custom properties
export interface FastifyInstanceWithServices extends FastifyInstance {
  usersService: UsersService;
  jwt: JWT;
}

// Service interfaces
export interface UsersService {
  getAllUsers(): Promise<UserWithoutPassword[]>;
  createUser(userData: CreateUserDTO): Promise<UserWithoutPassword>;
  updateUser(id: number, userData: UpdateUserDTO): Promise<UserWithoutPassword>;
  deleteUser(id: number): Promise<number>;
  authenticateUser(
    username: string,
    password: string
  ): Promise<UserWithoutPassword | null>;
  getUserByUsername(username: string): Promise<UserWithoutPassword | null>;
}

// Controller interfaces
export interface UsersController {
  getUsers(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  createUser(
    request: FastifyRequest<{ Body: CreateUserDTO }>,
    reply: FastifyReply
  ): Promise<void>;
  updateUser(
    request: FastifyRequest<{ Params: { id: string }; Body: UpdateUserDTO }>,
    reply: FastifyReply
  ): Promise<void>;
  deleteUser(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void>;
}

// Plugin options
export interface AuthPluginOptions {
  usersService: UsersService;
}

export interface DbPluginOptions {
  // Add any database plugin options here
}
