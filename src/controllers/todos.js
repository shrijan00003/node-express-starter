import { Router } from 'express';
import * as todoService from '../services/todoService';


const router = Router();
/**
 * findTodo
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @description FINDING TODO FROM TODO SERVICES
 */
function findTodo(req, res, next) {
  return todoService
    .getTodo(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * GET /api/todos
 */
router.get('/', (req, res, next) => {
  console.log(req.query.title);
  
  if(req.query.cat_id){
    todoService
    .getFilteredByCategoryId(req.query.cat_id)
    .then(data => res.json({ data }))
    .catch(err => next(err));

  }else if(req.query.title){
    todoService
    .getFilteredByTitle(req.query.title)
    .then(data => res.json({ data } ))
    .catch(err => next(err));

  }else if(req.query.sortBy){
    todoService
    .getSortedTodos(req.query.type, req.query.sortBy)
    .then(data => res.json({ data }))
    .catch(err => next(err));

  }else if(req.query.page){
    todoService
    .getOffsetPages(req.query.page, req.query.perpage)
    .then(data => res.json({ data }))
    .catch(err => next(err));
  }
  else{
    todoService
      .getAllTodos()
      .then(data => res.json({ data }))
      .catch(err => next(err));
  }   
});


/**
 * GET /api/todos/:id
 */
router.get('/:id', (req, res, next) => {
  todoService
    .getTodo(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/todos
 */
router.post('/',(req, res, next) => {
  todoService
    .createTodo(req.body)
    .then(data => res.status(200).json({ data }))
    .catch(err => next(err));
});

/**
 * PUT /api/todos/:id
 */
router.put('/:id', findTodo, (req, res, next) => {
  todoService
    .updateTodo(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * DELETE /api/todos/:id
 */
router.delete('/:id', findTodo, (req, res, next) => {
  todoService
    .deleteTodo(req.params.id)
    .then(data => res.status(200).json({ data }))
    .catch(err => next(err));
});


export default router;
