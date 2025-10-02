import express from "express"
import { handlePaypalWebhook, paypalSaveSubscription } from "../controllers/paymentController";

const router = express.Router();

router.post("/paypal/webhook", handlePaypalWebhook);
router.post("/paypal/save-subscription", paypalSaveSubscription);

export default router;