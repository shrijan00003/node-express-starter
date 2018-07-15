import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SALT_WORK_FACTOR } from '../constants/auth';
import uid from 'uuid/v4';

const salt = bcrypt.genSalt( SALT_WORK_FACTOR );

export async function getHash(pass){  
    return await bcrypt.hash(pass, salt);
}

export async function verifyUser(password ,user){
    const dbPass = user.attributes.password;
    const match = await bcrypt.compare(password , dbPass);
    return match;
}   

export function createAccessToken(data){
    return jwt.sign( {data}, process.env.ACCESS_TOKEN_CONST, { expiresIn: 60 * 60 * 30} ); 
}

export function createRefreshToken(data){
    return uid();
}

export function verifyAccessToken(token){
    const res =  jwt.verify( token , process.env.ACCESS_TOKEN_CONST );
    return res;
}

