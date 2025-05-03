/** @param {import('knex').Knex} knex */
export function up(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.timestamps(true, true);
  });
}

/** @param {import('knex').Knex} knex */
export function down(knex) {
  return knex.schema.dropTable("users");
}
