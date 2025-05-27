import express from 'express';

import * as SubscriptionController from '../controller/susbscription.controller.js';

const router = express.Router();

router.get('/', SubscriptionController.GetSubscriptions);

router.get('/:id', SubscriptionController.GetSubscriptionById);

router.post('/', SubscriptionController.CreateSubscription);

router.put('/:id', SubscriptionController.UpdateSubscription);

router.delete('/:id', SubscriptionController.DeleteSubscription);

router.get('/user/:id', SubscriptionController.GetSubscriptionsByUserId);

router.put('/:id/cancel', SubscriptionController.CancelSubscription);

router.get('/upcoming-renewals', SubscriptionController.GetUpcomingRenewals);

export default router;
