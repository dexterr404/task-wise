export function isProActive(subscription) {
  if (!subscription) return false;

  const { plan, status, nextBillingDate } = subscription;

  // Only Pro users can be active
  if (plan !== "pro") return false;

  const now = new Date();
  const nextBilling = nextBillingDate ? new Date(nextBillingDate) : null;

  // If subscription is canceled but the current billing period hasn't ended
  if (status === "canceled" && nextBilling && nextBilling > now) {
    return true; // still within paid period
  }

  // Active or approved subscriptions are valid
  if (status === "active" || status === "approved") {
    return true;
  }

  return false;
}
