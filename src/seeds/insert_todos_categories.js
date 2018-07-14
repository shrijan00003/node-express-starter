/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('todos_categories')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('todos_categories').insert([
          {
            updated_at : new Date(),
            todos_id: 11,
            category_id: 3
          },
          {
            updated_at : new Date(),
            todos_id: 13,
            category_id: 4
          }
        ])
      ]);
    });
}
