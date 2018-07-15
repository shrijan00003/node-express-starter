import Boom from 'boom';
import { verifyAccessToken } from '../utils/jwtUtils';
import * as UserService from '../services/userService';

export async function authenticate(req, res, next){
    const accessToken = req.get('authorization');
    try{
        const tokenData = await verifyAccessToken(accessToken);
        req.userId = tokenData.data;
        next();
    }catch(err){
        next(err);
    }
}//end of authenticateToken