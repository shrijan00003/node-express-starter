import { Router } from 'express';
import Boom from 'boom';
import * as AuthService from '../services/authService';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.post('/login' , async(req,res,next) => {
    console.log('==================starts here======================');
    try{
        const response =  await AuthService.checkLogin(req.body);
        if(response.error){
            res.status(403).json(response)
        }else{
            res.json(response);
        }
    }catch(err){
        next(err);
    }
});

router.post('/refresh',  async(req,res,next) => {
    console.log(`=============refresh  user id ${req.body.user_id} token is ${req.body.refresh_token}=================`);
    const userId = req.body.user_id;
    const refreshToken = req.body.refresh_token;
    try{
        const response = await AuthService.refresh( userId, refreshToken );
        res.json(response);
    }catch(err){
        next(err);
    }
});


router.post('/logout', authenticate, async(req, res, next) =>{
    const userId = req.body.user_id;
    const refreshToken =  req.body.refresh_token;
    try{
        const response =  await AuthService.logout( userId , refreshToken );
        res.json(response);
    }catch(err){
        console.log(`--------------you are not authenticate from controller  ${err}------------`);
        next(err);
    }

});
export default router;