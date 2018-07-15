import * as  jwtUtil from '../utils/jwtUtils';
import * as UserService from './userService';


export async function checkLogin(bodyParam) {
    
    const { email , password } = bodyParam;

    const user = await UserService.fetchByEmail(email);

   const match = await jwtUtil.verifyUser(password, user);

   if(match){
       const accessToken = jwtUtil.createAccessToken(user.id);
       const refreshToken = jwtUtil.createRefreshToken();
       await UserService.updateUserRefreshToken(user.id, refreshToken );

        return {
            accessToken: accessToken,
            refreshToken:refreshToken,
            id : user.id
        }
    }else{
        return {
            message :'credentials is not  is not matcthed'
        }
    } 
    
}

export async function logout(refreshToken){
    jwtUtil.verifyRefreshToken(refreshToken);
    const response = await UserService.removeRefreshToken(refreshToken);
    return response;
}
