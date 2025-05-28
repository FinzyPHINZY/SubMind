import type { NextFunction, Request, Response } from 'express';
import Subscription from '../models/subscription.model.js';
import { workflowClient } from '../config/upstash.js';

export const CreateSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subscriptionData = req.body;

    const subscription = await Subscription.create({
      ...subscriptionData,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${process.env.SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        'content-type': 'application/json',
      },
      retries: 0,
    });

    if (!subscription) {
      const error = new Error('Subscription creation failed') as Error & {
        statusCode: number;
      };
      error.statusCode = 400;
      throw error;
    }

    res.status(201).json({
      success: true,
      message: 'Subscription created successfully',
      data: {
        subscription,
        workflowRunId,
      },
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    next(error);
  }
};

export const GetUserSubscriptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subscriptions = await Subscription.find({
      user: req.user._id,
    }).lean();

    if (!subscriptions) {
      res.status(404).json({ message: 'No subscriptions found' });
    }
    res.status(200).json({
      message: 'Subscriptions fetched successfully',
      data: { subscriptions },
    });
  } catch (error) {
    console.error('Error fetching subscription by ID:', error);
    next(error);
  }
};

export const GetSubscriptionById = async (req, res) => {
  try {
    const subscriptionId = req.params.id;
    // Simulate fetching subscription by ID
    res.status(200).json({
      message: `Subscription with ID ${subscriptionId} fetched successfully`,
      subscription: {},
    });
  } catch (error) {
    console.error('Error fetching subscription by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const UpdateSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.id;
    const subscriptionData = req.body;
    // Simulate subscription update
    res.status(200).json({
      message: `Subscription with ID ${subscriptionId} updated successfully`,
      subscription: subscriptionData,
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const DeleteSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.id;
    // Simulate subscription deletion
    res.status(200).json({
      message: `Subscription with ID ${subscriptionId} deleted successfully`,
    });
  } catch (error) {
    console.error('Error deleting subscription:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const GetSubscriptionsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    // Simulate fetching subscriptions by user ID
    res.status(200).json({
      message: `Subscriptions for user ID ${userId} fetched successfully`,
      subscriptions: [],
    });
  } catch (error) {
    console.error('Error fetching subscriptions by user ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const CancelSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.id;
    // Simulate subscription cancellation
    res.status(200).json({
      message: `Subscription with ID ${subscriptionId} cancelled successfully`,
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const GetUpcomingRenewals = async (req, res) => {
  try {
    // Simulate fetching upcoming renewals
    res.status(200).json({
      message: 'Upcoming renewals fetched successfully',
      renewals: [],
    });
  } catch (error) {
    console.error('Error fetching upcoming renewals:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
