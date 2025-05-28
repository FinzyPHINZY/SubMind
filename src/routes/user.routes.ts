import express from 'express';

import * as UserController from '../controller/user.controller.js';
import { authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', UserController.GetUsers);

router.get('/:id', authorize, UserController.GetUserById);

router.post('/', UserController.CreateUser);

router.put('/:id', UserController.UpdateUser);

router.delete('/:id', UserController.DeleteUser);

export default router;
