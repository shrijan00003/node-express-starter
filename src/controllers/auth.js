import { Router } from 'express';
import * as AuthService from '../services/authService';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.post('/login', async (req, res, next) => {
  try {
    const response = await AuthService.checkLogin(req.body);
    if (response.error) {
      res.status(403).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/refresh', async (req, res, next) => {
  const userId = req.body.user_id;
  const refreshToken = req.body.refresh_token;
  try {
    const response = await AuthService.refresh(userId, refreshToken);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: 'User Not found' });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/logout', authenticate, async (req, res, next) => {
  // const userId = req.body.user_id;
  const userId = req.userId;
  const refreshToken = req.body.refresh_token;
  try {
    const response = await AuthService.logout(userId, refreshToken);
    if (response) {
      res.json(200).json(response);
    } else {
      res.json(401).json({
        message: 'Not logged out',
      });
    }
  } catch (err) {
    next(err);
    res.status(401).json(err);
  }
});
export default router;
