import express from 'express';
import * as AuthController from '../controller/auth.controller.js';

const router = express.Router();

router.post('/sign-up', AuthController.SignUp);

router.post('/sign-in', AuthController.SignIn);

router.post('/sign-out', AuthController.SignOut);

export default router;
