/**
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.alterTable('categories_todos', table => {
    table.renameColumn('todos_id','todo_id');
  });
}

/**
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('categories_todos' , table =>{
    table.renameColumn('todo_id','todos_id');
  });
}
