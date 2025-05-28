import { createRequire } from 'node:module';
import Subscription from '../models/subscription.model';
import dayjs from 'dayjs';

const require = createRequire(import.meta.url);

const { serve } = require('@upstash/workflow/express');

const REMINDERS = [7, 5, 3, 2, 1];

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;

  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== 'active') return;

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(`Renewal date for subscription ${subscriptionId} has passed.`);
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, 'day');
    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder for ${daysBefore} days before renewal`,
        reminderDate
      );
    }

    await triggerReminder(
      context,
      `Reminder for ${daysBefore} days before renewal`
    );
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run('get subscription', async () => {
    return Subscription.findById(subscriptionId).populate('user', 'email name');
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label) => {
  return await context.run(label, () => {
    console.log(`Triggering ${label} reminder`);
    // send reminder
  });
};
