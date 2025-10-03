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
      case "BILLING.SUBSCRIPTION.ACTIVATED":
        await User.findOneAndUpdate(
          { "subscription.paypalSubscriptionId": webhookEvent.resource.id },
          { "subscription.status": "active", "subscription.startDate": new Date(webhookEvent.resource.start_time), 
            "subscription.nextBillingDate": webhookEvent.resource.billing_info?.next_billing_time
            ? new Date(webhookEvent.resource.billing_info.next_billing_time)
            : null 
          }
        );
        console.log("Activated subscription:", webhookEvent.resource.id);
        break;

      case "BILLING.SUBSCRIPTION.CANCELLED":
        await User.findOneAndUpdate(
          { "subscription.paypalSubscriptionId": webhookEvent.resource.id },
          { "subscription.status": "canceled", "subscription.endDate": new Date() }
        );
        console.log("Cancelled subscription:", webhookEvent.resource.id);
        break;

      case "BILLING.SUBSCRIPTION.PAYMENT.FAILED":
        await User.findOneAndUpdate(
          { "subscription.paypalSubscriptionId": webhookEvent.resource.id },
          { "subscription.status": "past_due" }
        );
        console.log("Payment failed:", webhookEvent.resource.id);
        break;

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

// Cancel subscription
export const cancelPaypalSubscription = async (req, res) => {
  const { subscriptionId, reason } = req.body;
  const userId = req.user._id;
  try {
    await axios.post(
      `${PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}/cancel`,
      { reason: reason || "User requested cancellation" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${PAYPAL_AUTH}`
        }
      }
    );

    await User.findOneAndUpdate(
      { _id: userId, "subscription.paypalSubscriptionId": subscriptionId },
      { "subscription.status": "canceled", "subscription.endDate": new Date(), "subscription.plan": "free" }
    );

    res.status(200).json({ message: "Subscription cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling subscription:", error.response?.data || error);
    res.status(500).json({ message: "Failed to cancel subscription" });
  }
};

export const getBilling = async(req,res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({ message: "User not found" });

    let paymentMethod = null;
    let invoices = [];
    let price = 0;
    let nextBillingDate = null;

    if(user.subscription.paypalSubscriptionId) {
      const subscriptionId = user.subscription.paypalSubscriptionId;

      //Fetch subscription info from Paypal
      const response = await axios.get(`${process.env.PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64")}`,
          },
        }
      );

      nextBillingDate = subscriptionData.billing_info?.next_billing_time
        ? new Date(subscriptionData.billing_info.next_billing_time)
        : null;

      const subscriptionData = response.data;

      //Card info
      const card = subscriptionData.billing_info?.last_payment_source?.card;
      if(card) {
        paymentMethod = {
          brand: card.brand,
          last4: card.last_digits,
          expMonth: card.exp_month,
          expYear: card.exp_year,
        }
      }
      

      //Price per billing cycle
      price = subscriptionData.billing_info?.cycle_executions?.[0]?.amount?.value || 0;

      res.json({
      subscription: {
        plan: user.subscription.plan,
        status: user.subscription.status,
        nextBillingDate,
        price,
      },
      paymentMethod,
      billingInfo: {
        company: user.billingInfo?.company || "Acme Corp",
        taxId: user.billingInfo?.taxId || "PH-1234567",
        address: user.billingInfo?.address || "123 Main St, Manila, PH",
      },
    });
    }
  } catch (error) {
    console.log("Error fetching billing details");
    res.status(500).json({ message: "Internal server error" });
  }
}