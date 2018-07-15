import { Router } from 'express';
import Boom from 'boom';
import * as AuthService from '../services/authService';

const router = Router();

router.post('/login' , async(req,res,next) => {
    console.log('==================starts here======================');
    // AuthService
    // .checkLogin(req.body)
    // .then(res.json({ data }))
    // .catch(res.json({data:'data is not defined'}));

    try{
        const response =  await AuthService.checkLogin(req.body);
        res.json(response);
    }catch(err){
        res.json(err);
    }
})

export default router;