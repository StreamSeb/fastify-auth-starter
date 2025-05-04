import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import rateLimit from "@fastify/rate-limit";

async function authPlugin(fastify, options) {
  const authMode = process.env.AUTH_MODE || "jwt";

  // Register JWT plugin if needed
  if (authMode === "jwt") {
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
  }

  // Register rate limit plugin
  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
  });

  // Add a hook that runs before each route
  fastify.addHook("preHandler", async (request, reply) => {
    // Skip authentication for login route
    if (request.url === "/api/login") {
      return;
    }

    // Skip all authentication if mode is 'none'
    if (authMode === "none") {
      return;
    }

    try {
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
      } else if (authMode === "jwt") {
        await request.jwtVerify();
      }
    } catch (err) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
  });

  // Add a login route (only available in jwt mode)
  if (authMode === "jwt") {
    fastify.post("/api/login", async (request, reply) => {
      try {
        const body = request.body;

        if (!body || !body.username || !body.password) {
          return reply.code(400).send({
            error: "Invalid request",
            details: "Username and password are required",
          });
        }

        if (body.username === "admin" && body.password === "password") {
          const token = fastify.jwt.sign(
            {
              username: body.username,
              role: "admin",
            },
            {
              expiresIn: "1h", // Token expires in 1 hour
            }
          );
          return { token };
        }

        return reply.code(401).send({ error: "Invalid credentials" });
      } catch (error) {
        return reply.code(500).send({ error: "Internal server error" });
      }
    });
  }
}

export default fp(authPlugin);
