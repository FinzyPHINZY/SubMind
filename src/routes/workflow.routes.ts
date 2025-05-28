import { Router } from 'express';

const router = Router();
import * as WorkflowController from '../controller/workflow.controller.js';

router.post('/subscription/reminder', WorkflowController.sendReminders);

export default router;
