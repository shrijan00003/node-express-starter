import Boom from 'boom';
import Todo from '../models/todo';
import Category from '../models/category';

/**
 * Get all Todos.
 *
 * @return {Promise}
 */
export function getAllTodos() {
  return Todo.fetchAll();
}
  // if(query.title){
  //   return new Todo({ title : query.title }).fetch().then(todo => {
  //     if (!todo) {
  //       throw new Boom.notFound('Todo not found');
  //     }
  
  //     return todo;
  //   });
  // }else if(query.category_name){
  //       return new Todo().fetch({
  //     // withRelated : ['categories']
  //     withRelated: ['categories',
  //       { categories: function(qb) { 
  //         qb.where('category_name', query.category_name ); 
  //       }}
  //     ]
  //   }).then(todo => {
  //     if (!todo) {
  //       throw new Boom.notFound('Todo not found');
  //     }
  
  //     return todo;
  //   });
  // }else{

  //   return Todo.fetchAll();
  // }

  
// }

/**
 * 
 * @param {*} title 
 */
export function getFilteredByTitle(titleParam){
  console.log(titleParam,'===============================================================');
  if(titleParam){
    return new Todo({ title : titleParam }).fetch().then(todo => {
      if (!todo) {
            throw new Boom.notFound('Todo not found');
            }
          return todo;
    });
  }
}

  export function getFilteredByCategoryId(cat_id){
    if(cat_id){
      return new Category({ id : cat_id }).fetch({
        withRelated : 'todos'
      }).then( category => {
          if(!category){
            throw new Boom.notFound(' ')
          }
          return category;
      })
    }
  }
  // else{
  //   return Todo.fetchAll();
  // }

  // else if(queryParam.category_name){
  //   let categoryName = queryParam.category_name;
  //   return new Todo().fetch({
  //     withRelated : ['categories']
  //   })
  //   .then(todo => {
  //     if(!todo){
  //       throw new Boom.notFound('')
  //     }
  //   })
  // }
// }//end of getFilteredTodos

/**
 * 
 * @param {*} type 
 * @param {*} sort 
 */
export function getSortedTodos(type, sortBy){
    return Todo.forge( { }).query(function(qb){
      qb.orderBy(sortBy , type);
    }).fetchAll().then(todo => {
      if(!todo){
        throw new Boom.notFound('not possible to sort');
   
      }
      return todo;
    })
   }

/**
 * 
 * @param {*} page 
 * @param {*} perpage 
 */
export function getOffsetPages(page,perPage){
    //using offset 
    // let pageSize = 3;
    // let offset = (page - 1)* pageSize;
    // return Todo.forge()
    //   .query(function(qb){
    //       qb.offset(offset).limit(perPage);
    //   })
    //   .fetchAll().then(todo => {
    //     if(!todo){
    //       throw new Boom.notFound('error in page handler');
    //     }
    //     return todo;
    //   });


  return new Todo()
    .fetchPage({

      pageSize : parseInt(perPage),
      page: parseInt(page)

    }).then(
      todo => {
        if(!todo){
          throw new Boom.notFound('Pagination Not Possible');
        }
        return todo;
      }
    ).catch(err => next(err));


}

/**
 * Get a Todo.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getTodo(id) {
  return new Todo({ id }).fetch().then(todo => {
    if (!todo) {
      throw new Boom.notFound('Todo not found');
    }

    return todo;
  });
}

/**
 * Create new Todo.
 *
 * @param  {Object}  Todo
 * @return {Promise}
 */
export function createTodo(todo) {
  return new Todo({ 
      updated_at : todo.updated_at,
      title : todo.title,
      details : todo.details
    }).save().then(todo => todo.refresh());
}

/**
 * Update a Todo.
 *
 * @param  {Number|String}  id
 * @param  {Object}         Todo
 * @return {Promise}
 */
export function updateTodo(id, todo) {
  return new Todo({ id }).save({
    updated_at : new Date(),
    title : todo.title,
    details : todo.details
    }).then(todo => todo.refresh());
}

/**
 * Delete a Todo.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteTodo(id) {
  return new Todo({ id }).fetch().then(todo => todo.destroy());
}



