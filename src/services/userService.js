import Boom from 'boom';
import User from '../models/user';
import * as jwtUtils from '../utils/jwtUtils';

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllUsers() {
  return User.fetchAll();
}

/**
 * Get a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getUser(id) {
  return new User({ id }).fetch().then(user => {
    if (!user) {
      throw new Boom.notFound('User not found');
    }

    return user;
  });
}

/**
 * Create new user.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
export async function createUser(user) {
  return new User({
     name: user.name ,
     email : user.email,
     password : await jwtUtils.getHash(user.password)
    }).save().then(user => user.refresh());

}

/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         user
 * @return {Promise}
 */
export function updateUser(id, user) {
  return new User({ id })
  .save({ 
    name: user.name,
    email: user.email,
    password: user.password,
    refresh_token: user.refresh_token,
    deleted_at: user.deleted_at
  })
  .then(user => user.refresh());
}

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteUser(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}

export function fetchByEmail(emailParam){
  if(emailParam){
    return User.forge({ email: emailParam})
    .fetch()
    .then(user => {
      if(!user){
        throw new Boom.notFound('User not found');
      }
      return user;
    })
  }
}

export function updateUserRefreshToken(idParam,refreshTokenParam){
  if(idParam){
    return User.forge({id:idParam})
    .save({
      refresh_token : refreshTokenParam
    })
    .then( user => user.refresh );
  }
}
