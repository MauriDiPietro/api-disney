import express from 'express';
import { createUser, loginUser, getUserById } from '../controllers/user.controllers.js';
import { refreshToken } from '../auth/refreshToken.js'
import { verifyToken } from '../auth/verifyToken.js'
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/home/:id', verifyToken, getUserById);

export default router;