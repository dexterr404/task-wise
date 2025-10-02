import express from "express"
import { cancelPaypalSubscription, handlePaypalWebhook, paypalSaveSubscription } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/paypal/webhook", handlePaypalWebhook);
router.post("/paypal/save-subscription", protect, paypalSaveSubscription);
router.post("/paypal/cancel-subscription", protect, cancelPaypalSubscription);

export default router;