import { Router } from 'express';
import Boom from 'boom';
import * as AuthService from '../services/authService';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.post('/login' , async(req,res,next) => {
    console.log('==================starts here======================');
    try{
        const response =  await AuthService.checkLogin(req.body);
        res.json(response);
    }catch(err){
        next(err);
    }
});

router.post('/refresh',  async(req,res,next) => {
    console.log('==========================refresh starts here=================');
    const userId = req.body.userId;
    const refreshToken = req.body.refreshToken;
    try{
        const response = await AuthService.refresh( userId, refreshToken );
        res.json(response);
    }catch(err){
        next(err);
    }
});


router.post('/logout', authenticate, async(req, res, next) =>{
    const userId = req.body.userId;
    const refreshToken =  req.body.refreshToken;
    try{
        const response =  await AuthService.logout( userId , refreshToken );
        res.json(response);
    }catch(err){
        next(err);
    }

});
export default router;