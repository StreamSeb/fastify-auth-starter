import fp from "fastify-plugin";
import knex from "knex";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { DbPluginOptions } from "../types/index.js";
import knexfile from "../config/knexfile.js";

// Extend FastifyInstance to include db
declare module "fastify" {
  interface FastifyInstance {
    db: ReturnType<typeof knex>;
  }
}

export default fp(async function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions & DbPluginOptions
) {
  const db = knex(
    process.env.NODE_ENV === "production"
      ? knexfile.production
      : knexfile.development
  );

  fastify.decorate("db", db);

  fastify.addHook("onClose", (instance, done) => {
    if (instance.db === db) {
      instance.db.destroy(done);
    }
  });
});
