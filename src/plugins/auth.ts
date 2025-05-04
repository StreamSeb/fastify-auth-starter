import jwt from "@fastify/jwt";
import rateLimit from "@fastify/rate-limit";
import fp from "fastify-plugin";
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import {
  AuthPluginOptions,
  LoginRequest,
  LoginResponse,
} from "../types/index.js";

export default fp(async function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions & AuthPluginOptions
): Promise<void> {
  const { usersService } = opts;

  // Register JWT plugin
  if (!process.env.JWT_SECRET) {
    throw new Error(
      "JWT_SECRET must be set in environment variables when using JWT authentication"
    );
  }

  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET,
    sign: {
      expiresIn: "1h", // Token expires in 1 hour
    },
  });

  // Register rate limit plugin
  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
  });

  // Authentication middleware
  fastify.addHook(
    "onRequest",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const authMode = process.env.AUTH_MODE || "jwt";

      // Skip authentication for public endpoints
      const isPublicEndpoint =
        (request.url === "/api/users" && request.method === "POST") ||
        request.url === "/api/login";

      if (isPublicEndpoint) {
        return;
      }

      if (authMode === "none") {
        return;
      }

      if (authMode === "api-key") {
        if (!process.env.API_KEY) {
          throw new Error(
            "API_KEY must be set in environment variables when using API key authentication"
          );
        }

        const apiKey = request.headers["x-api-key"];
        if (!apiKey || apiKey !== process.env.API_KEY) {
          return reply.code(401).send({ error: "Invalid API key" });
        }
        return;
      }

      // JWT authentication
      try {
        await request.jwtVerify();
      } catch (err) {
        return reply.code(401).send({ error: "Unauthorized" });
      }
    }
  );

  // Login route
  fastify.post<{ Body: LoginRequest }>(
    "/api/login",
    async (request, reply): Promise<LoginResponse> => {
      const { username, password } = request.body;

      if (!username || !password) {
        return reply.code(400).send({
          error: "Bad Request",
          details: "Username and password are required",
        });
      }

      const user = await usersService.authenticateUser(username, password);

      if (!user) {
        return reply.code(401).send({ error: "Invalid credentials" });
      }

      const token = fastify.jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        {
          expiresIn: "1h", // Token expires in 1 hour
        }
      );

      return { token, user };
    }
  );
});
