import fp from "fastify-plugin";
import knex from "knex";
import config from "../../knexfile.js";

async function dbConnector(fastify) {
  const db = knex(config.development);
  fastify.decorate("db", db);
}

export default fp(dbConnector);
