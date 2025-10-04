export const isProActive = (subscription) => {
  if (!subscription) return false;

  const now = new Date();

  // Use nextBillingDate if exists, otherwise fallback to endDate
  const end = subscription.nextBillingDate
    ? new Date(subscription.nextBillingDate)
    : subscription.endDate
    ? new Date(subscription.endDate)
    : null;

  if (!end) return false;

  const stillActive = now < end;

  const wasPro = subscription.plan === "pro" || subscription.status === "canceled";

  return wasPro && stillActive;
};
