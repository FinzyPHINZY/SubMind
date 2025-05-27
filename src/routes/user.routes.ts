import express from 'express';

const router = express.Router();

import * as UserController from '../controller/user.controller.js';

router.get('/', UserController.GetUsers);

router.get('/:id', UserController.GetUserById);

router.post('/', UserController.CreateUser);

router.put('/:id', UserController.UpdateUser);

router.delete('/:id', UserController.DeleteUser);

export default router;
