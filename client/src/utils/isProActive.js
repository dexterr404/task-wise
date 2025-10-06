export const isProActive = (subscription) => {
  if (!subscription) return false;

  const now = new Date();

  // For active subscriptions, also use nextBillingDate
  const end = subscription.nextBillingDate
    ? new Date(subscription.nextBillingDate)
    : subscription.endDate
    ? new Date(subscription.endDate)
    : null;

  if (!end) return false;

  const stillActive = now.getTime() < end.getTime();
  const isProPlan = subscription.plan === "pro";

  return isProPlan && stillActive;
};