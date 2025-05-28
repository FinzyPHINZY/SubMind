import express from 'express';

import * as SubscriptionController from '../controller/susbscription.controller.js';
import { authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authorize, SubscriptionController.CreateSubscription);

router.get('/', authorize, SubscriptionController.GetUserSubscriptions);

router.get('/:id', SubscriptionController.GetSubscriptionById);

router.put('/:id', SubscriptionController.UpdateSubscription);

router.delete('/:id', SubscriptionController.DeleteSubscription);

router.get('/user/:id', SubscriptionController.GetSubscriptionsByUserId);

router.put('/:id/cancel', SubscriptionController.CancelSubscription);

router.get('/upcoming-renewals', SubscriptionController.GetUpcomingRenewals);

export default router;
