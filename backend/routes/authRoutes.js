import express from 'express';
import { login, logout, forgotPassword, register } from '../controller/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgot-password', forgotPassword);

export default router;
