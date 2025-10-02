import paypal from "@paypal/checkout-server-sdk";
import User from "../models/User.js";
import dotenv from "dotenv"

dotenv.config();

// Configure PayPal client
//const environment = new paypal.core.LiveEnvironment(
  //process.env.PAYPAL_CLIENT_ID,
  //process.env.PAYPAL_CLIENT_SECRET
//);

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
 );

const client = new paypal.core.PayPalHttpClient(environment);

export const handlePaypalWebhook = async (req, res) => {
  const webhookEvent = req.body;

  // PayPal webhook headers
  const transmissionId = req.headers["paypal-transmission-id"];
  const timestamp = req.headers["paypal-transmission-time"];
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  const signature = req.headers["paypal-transmission-sig"];
  const certUrl = req.headers["paypal-cert-url"];
  const authAlgo = req.headers["paypal-auth-algo"];

  try {
    // Verify webhook signature
    const request = new paypal.notifications.VerifyWebhookSignatureRequest();
    request.requestBody({
      auth_algo: authAlgo,
      cert_url: certUrl,
      transmission_id: transmissionId,
      transmission_sig: signature,
      transmission_time: timestamp,
      webhook_id: webhookId,
      webhook_event: webhookEvent
    });

    const response = await client.execute(request);

    if (response.result.verification_status !== "SUCCESS") {
      console.error("PayPal webhook verification failed");
      return res.status(400).send("Webhook verification failed");
    }

    // Handle subscription events
    switch (webhookEvent.event_type) {
      case "BILLING.SUBSCRIPTION.ACTIVATED":
        await User.findOneAndUpdate(
          { "subscription.paypalSubscriptionId": webhookEvent.resource.id },
          { "subscription.status": "active", "subscription.startDate": new Date() }
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

    // Respond to PayPal
    res.sendStatus(200);
  } catch (error) {
    console.error("Error handling PayPal webhook:", error);
    res.sendStatus(500);
  }
};

export const paypalSaveSubscription = async(req,res) => {
  const { userId, subscriptionId } = req.body;

  if (!userId || !subscriptionId) {
    return res.status(400).json({ message: "Missing userId or subscriptionId" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { "subscription.paypalSubscriptionId": subscriptionId, "subscription.status": "active", "subscription.startDate": new Date() },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Subscription saved", subscription: user.subscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
