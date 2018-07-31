import { verifyAccessToken } from '../utils/jwtUtils';

export async function authenticate(req, res, next) {
  const accessToken = req.get('authorization');
  try {
    const tokenData = await verifyAccessToken(accessToken);
    req.userId = tokenData.data;
    next();
  } catch (err) {
    next(err + '-----------You are not authenticate to do so---------- ');
    res.status(401).json({
      err,
    });
  }
} // end of authenticateToken
