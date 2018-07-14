/**
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.renameTable('todos_categories', 'categories_todos');
}

/**
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  // return knex.schema.dropTable('table_name');
}
