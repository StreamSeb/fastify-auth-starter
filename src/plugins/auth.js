import fp from "fastify-plugin";

async function authPlugin(fastify, options) {
  // Add a hook that runs before each route
  fastify.addHook("preHandler", async (request, reply) => {
    // Skip authentication in development mode
    if (process.env.NODE_ENV !== "production") {
      fastify.log.info("Auth: Development mode - skipping authentication");
      return;
    }

    const apiKey = request.headers["x-api-key"];

    if (!apiKey) {
      fastify.log.warn("Auth: No API key provided");
      return reply.code(401).send({ error: "API key is required" });
    }

    if (apiKey !== process.env.API_KEY) {
      fastify.log.warn("Auth: Invalid API key provided");
      return reply.code(403).send({ error: "Invalid API key" });
    }
  });
}

export default fp(authPlugin);
