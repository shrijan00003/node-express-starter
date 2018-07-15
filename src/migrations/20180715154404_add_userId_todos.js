/**
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.alterTable('todos', table => {
    table.integer('user_id').references('users.id');
  });
}

/**
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.alterTable('todos', table => {
    table.dropColumn('user_id');
  });
}
