import bookshelf from '../db';
import Todo from './todo';

const TABLE_NAME = 'users';

/**
 * User model.
 */
class User extends bookshelf.Model {
  
  todos(){
    return this.hasMany(Todo);
  }
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
}

export default User;
