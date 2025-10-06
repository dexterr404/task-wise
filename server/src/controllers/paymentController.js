import axios from "axios";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_WEBHOOK_ID = process.env.PAYPAL_WEBHOOK_ID;

// PayPal API base URL
const PAYPAL_API = process.env.NODE_ENV === "production"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

// Base64 encode client ID and secret for basic auth
const PAYPAL_AUTH = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");

// Helper to get PayPal access token
async function getPayPalAccessToken() {
  try {
    const response = await axios.post(
      `${PAYPAL_API}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${PAYPAL_AUTH}`,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting PayPal access token:", error);
    throw error;
  }
}

// Helper to get subscription details from PayPal
async function getPayPalSubscriptionDetails(subscriptionId) {
  try {
    const accessToken = await getPayPalAccessToken();
    const response = await axios.get(
      `${PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching PayPal subscription:", error);
    return null;
  }
}

// Verify PayPal webhook
async function verifyWebhook(headers, body) {
  try {
    const res = await axios.post(
      `${PAYPAL_API}/v1/notifications/verify-webhook-signature`,
      {
        auth_algo: headers["paypal-auth-algo"],
        cert_url: headers["paypal-cert-url"],
        transmission_id: headers["paypal-transmission-id"],
        transmission_sig: headers["paypal-transmission-sig"],
        transmission_time: headers["paypal-transmission-time"],
        webhook_id: PAYPAL_WEBHOOK_ID,
        webhook_event: body
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${PAYPAL_AUTH}`
        }
      }
    );

    return res.data.verification_status === "SUCCESS";
  } catch (err) {
    console.error("Error verifying webhook:", err.response?.data || err);
    return false;
  }
}

export const handlePaypalWebhook = async (req, res) => {
  const webhookEvent = req.body;
  const headers = req.headers;

  try {
    const isVerified = await verifyWebhook(headers, webhookEvent);

    if (!isVerified) {
      console.error("PayPal webhook verification failed");
      return res.status(400).send("Webhook verification failed");
    }

    // Handle subscription events
    switch (webhookEvent.event_type) {
      case "BILLING.SUBSCRIPTION.ACTIVATED": {
        const subscriptionId = webhookEvent.resource.id;
        const startDate = new Date(webhookEvent.resource.start_time);
        const nextBillingDate = webhookEvent.resource.billing_info?.next_billing_time
          ? new Date(webhookEvent.resource.billing_info.next_billing_time)
          : null;

        await User.findOneAndUpdate(
          { "subscription.paypalSubscriptionId": subscriptionId },
          {
            $set: {
              "subscription.status": "active",
              "subscription.plan": "pro",
              "subscription.startDate": startDate,
              "subscription.nextBillingDate": nextBillingDate,
              "subscription.endDate": null,
              "subscription.canceledAt": null,
              "subscription.failedPaymentAttempts": 0,
              "subscription.paymentFailedAt": null,
            },
            $push: {
              invoices: {
                subscriptionId,
                amount: 5,
                currency: "USD",
                paidAt: startDate,
                paypalPaymentId: `init-${subscriptionId}`,
              },
            },
          }
        );

        console.log("Activated subscription + initial invoice:", subscriptionId);
        break;
      }

      case "BILLING.SUBSCRIPTION.CANCELLED": {
        const subscriptionId = webhookEvent.resource.id;
        
        // Get the subscription details to find when current period ends
        const subscription = await getPayPalSubscriptionDetails(subscriptionId);
        const billingPeriodEnd = subscription?.billing_info?.next_billing_time 
          ? new Date(subscription.billing_info.next_billing_time)
          : new Date(); // Fallback to now if can't get billing date

        await User.findOneAndUpdate(
          { "subscription.paypalSubscriptionId": subscriptionId },
          { 
            $set: {
              "subscription.status": "canceled",
              "subscription.endDate": billingPeriodEnd, // User keeps Pro until this date
              "subscription.canceledAt": new Date(),
              "subscription.nextBillingDate": null,
            }
          }
        );
        
        console.log(`Subscription cancelled - Pro access until ${billingPeriodEnd}:`, subscriptionId);
        break;
      }

      case "BILLING.SUBSCRIPTION.PAYMENT.SUCCEEDED": {
        const subscriptionId = webhookEvent.resource.billing_agreement_id || webhookEvent.resource.id;
        const amount = webhookEvent.resource.amount?.value
          ? parseFloat(webhookEvent.resource.amount.value)
          : 0;
        const currency = webhookEvent.resource.amount?.currency_code || "USD";
        const paidAt = new Date(webhookEvent.resource.time || webhookEvent.resource.create_time);
        const paypalPaymentId = webhookEvent.resource.id;

        // Get next billing date from PayPal
        const subscription = await getPayPalSubscriptionDetails(subscriptionId);
        const nextBillingDate = subscription?.billing_info?.next_billing_time 
          ? new Date(subscription.billing_info.next_billing_time)
          : null;

        await User.findOneAndUpdate(
          { "subscription.paypalSubscriptionId": subscriptionId },
          {
            $set: { 
              "subscription.status": "active",
              "subscription.plan": "pro",
              "subscription.nextBillingDate": nextBillingDate,
              "subscription.endDate": null, // Clear any previous end date
              "subscription.failedPaymentAttempts": 0, // Reset failed attempts
              "subscription.paymentFailedAt": null,
            },
            $push: {
              invoices: {
                subscriptionId,
                amount,
                currency,
                paidAt,
                paypalPaymentId,
              },
            },
          }
        );

        console.log("Payment succeeded, invoice saved:", paypalPaymentId);
        break;
      }

      // Payment failed - DON'T downgrade immediately, PayPal will retry
      case "BILLING.SUBSCRIPTION.PAYMENT.FAILED": {
        const subscriptionId = webhookEvent.resource.billing_agreement_id || webhookEvent.resource.id;

        const user = await User.findOneAndUpdate(
          {
            "subscription.paypalSubscriptionId": subscriptionId,
            "subscription.status": { $ne: "canceled" }
          },
          {
            $set: {
              "subscription.status": "past_due",
              "subscription.paymentFailedAt": new Date(),
            },
            $inc: {
              "subscription.failedPaymentAttempts": 1,
            }
          },
          { new: true }
        );

        if (user) {
          console.log(`Payment failed for ${user.email} - marked as past_due (attempt ${user.subscription.failedPaymentAttempts || 1})`);
          console.log(`User keeps Pro access while PayPal retries payment`);
          // TODO: Send email notification to user to update payment method
        } else {
          console.log(`Payment failed for subscriptionId ${subscriptionId}, but no active user found.`);
        }

        // NOTE: User keeps Pro access during past_due status
        // PayPal will retry automatically, and eventually send CANCELLED if all retries fail
        break;
      }

      // Subscription suspended (after multiple payment failures)
      case "BILLING.SUBSCRIPTION.SUSPENDED": {
        const subscriptionId = webhookEvent.resource.id;

        await User.findOneAndUpdate(
          { "subscription.paypalSubscriptionId": subscriptionId },
          {
            $set: {
              "subscription.status": "suspended",
              "subscription.suspendedAt": new Date(),
            }
          }
        );

        console.log("Subscription suspended after multiple payment failures:", subscriptionId);
        console.log("User still has Pro access but subscription will cancel soon if not resolved");
        // TODO: Send urgent email to user
        break;
      }
      
      default:
        console.log("Unhandled PayPal event:", webhookEvent.event_type);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error handling PayPal webhook:", error);
    res.sendStatus(500);
  }
};

// Save subscription from frontend onApprove
export const paypalSaveSubscription = async (req, res) => {
  const { subscriptionId } = req.body;
  const userId = req.user._id;

  if (!userId || !subscriptionId) {
    return res.status(400).json({ message: "Missing userId or subscriptionId" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        "subscription.paypalSubscriptionId": subscriptionId,
        "subscription.status": "active",
        "subscription.startDate": new Date(),
        "subscription.plan": "pro"
      },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Subscription saved", subscription: user.subscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Cancel subscription but keep pro access until the end of the billing cycle
export const cancelPaypalSubscription = async (req, res) => {
  const { subscriptionId, reason } = req.body;
  const userId = req.user._id;

  try {
    // Get subscription details before cancellation
    const { data: subscriptionDetails } = await axios.get(
      `${PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${PAYPAL_AUTH}`,
        },
      }
    );

    const nextBillingDate = subscriptionDetails.billing_info?.next_billing_time
      ? new Date(subscriptionDetails.billing_info.next_billing_time)
      : new Date(); // Fallback to now if billing date unavailable

    // Cancel subscription on PayPal
    await axios.post(
      `${PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}/cancel`,
      { reason: reason || "User requested cancellation" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${PAYPAL_AUTH}`,
        },
      }
    );

    // Update local user - keep Pro until billing period ends
    await User.findOneAndUpdate(
      { _id: userId, "subscription.paypalSubscriptionId": subscriptionId },
      {
        $set: {
          "subscription.status": "canceled",
          "subscription.plan": "pro", // Keep Pro plan
          "subscription.endDate": nextBillingDate, // Access until this date
          "subscription.canceledAt": new Date(),
        }
      }
    );

    res.status(200).json({ 
      message: "Subscription canceled. Pro access active until next billing date.",
      endDate: nextBillingDate 
    });
  } catch (error) {
    console.error("Error canceling subscription:", error);
    res.status(500).json({ message: "Failed to cancel PayPal subscription." });
  }
};

export const getBilling = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const subscription = {
      plan: user.subscription.plan,
      status: user.subscription.status,
      nextBillingDate: user.subscription.nextBillingDate,
      endDate: user.subscription.endDate, // Include end date for canceled subscriptions
    };

    // Latest invoice = last payment
    const latestInvoice = user.invoices[user.invoices.length - 1] || null;
    if (latestInvoice) {
      subscription.price = latestInvoice.amount;
      subscription.currency = latestInvoice.currency;
    } else {
      subscription.price = user.subscription.plan === "pro" ? 5 : 0;
      subscription.currency = "USD";
    }

    res.json({
      subscription,
      invoices: user.invoices,
    });
  } catch (error) {
    console.error("Error fetching billing details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Run this every hour via node-cron or your task scheduler
export const enforceSubscriptionEndDates = async () => {
  try {
    const now = new Date();

    // Find users whose subscription has ended but are still on pro plan
    const expiredUsers = await User.updateMany(
      {
        "subscription.status": { $in: ["canceled", "suspended"] },
        "subscription.endDate": { $lte: now },
        "subscription.plan": "pro"
      },
      {
        $set: {
          "subscription.plan": "free",
          "subscription.paypalSubscriptionId": null,
        }
      }
    );

    console.log(`[Cron] Downgraded ${expiredUsers.modifiedCount} expired subscriptions to free tier`);

    // (in case webhook for CANCELLED was missed)
    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    
    const stalePastDue = await User.updateMany(
      {
        "subscription.status": "past_due",
        "subscription.paymentFailedAt": { $lte: fourteenDaysAgo },
        "subscription.plan": "pro"
      },
      {
        $set: {
          "subscription.plan": "free",
          "subscription.status": "canceled",
          "subscription.endDate": new Date(),
          "subscription.paypalSubscriptionId": null,
        }
      }
    );

    console.log(`[Cron] Downgraded ${stalePastDue.modifiedCount} stale past_due subscriptions`);

  } catch (error) {
    console.error("[Cron] Error enforcing subscription end dates:", error);
  }
};