/** @param {import('knex').Knex} knex */
export async function seed(knex) {
  await knex("users").del();
  await knex("users").insert([
    { name: "Alice" },
    { name: "Bob" },
    { name: "Charlie" },
  ]);
}
