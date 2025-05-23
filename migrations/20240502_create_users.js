/** @param {import('knex').Knex} knex */
export function up(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username").notNullable().unique();
    table.string("email").notNullable().unique();
    table.string("password_hash").notNullable();
    table.string("role").notNullable().defaultTo("user");
    table.timestamps(true, true);
  });
}

/** @param {import('knex').Knex} knex */
export function down(knex) {
  return knex.schema.dropTable("users");
}
