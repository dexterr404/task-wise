import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import cron from "node-cron"
import passport from "./config/passport.js"
import taskRoutes from "./routes/taskRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"
import teamRoutes from "./routes/teamRoutes.js"
import teamTaskRoutes from "./routes/teamTaskRoutes.js"
import commentsRoutes from "./routes/commentsRoutes.js"
import teamInboxRoutes from "./routes/teamInbox.js"
import notificationRoutes from "./routes/notificationRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"

import { connectDB } from "./config/db.js"
import { enforceSubscriptionEndDates } from "./controllers/paymentController.js";
import { createServer } from 'http'
import { initializeSocket } from "./services/socket/socketServer.js";
import { customRateLimiter } from "./middleware/rateLimiter.js";


dotenv.config();

cron.schedule('0 * * * *', () => {
  console.log('[Cron] Running subscription end date enforcement...');
  enforceSubscriptionEndDates();
});

const app = express();
const httpServer = createServer(app);

//initialize Socket.io
const io = initializeSocket(httpServer);

const PORT = process.env.PORT || 5001;

app.use(
    cors({
        origin: ["http://localhost:5173", process.env.APP_BASE_URL],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    })
);

app.use(express.json());
app.use(passport.initialize());


app.use("/api/auth", customRateLimiter({ max: 200, window: "60s" }), authRoutes);
app.use("/api/payment", customRateLimiter({ max: 200, window: "60s" }), paymentRoutes);
app.use("/api/ai", customRateLimiter({ max: 200, window: "60s" }), aiRoutes);
app.use("/api/users", customRateLimiter({ max: 200, window: "60s" }), userRoutes);
app.use("/api/notifications", customRateLimiter({ max: 500, window: "60s" }), notificationRoutes);
app.use("/api/teams", customRateLimiter({ max: 500, window: "60s" }), teamRoutes);
app.use("/api/teams", customRateLimiter({ max: 500, window: "60s" }), teamTaskRoutes);
app.use("/api/teams", customRateLimiter({ max: 500, window: "60s" }), commentsRoutes);
app.use("/api/teams", customRateLimiter({ max: 500, window: "60s" }), teamInboxRoutes);
app.use("/api/personal", customRateLimiter({ max: 500, window: "60s" }), taskRoutes);


connectDB().then(() => {
    httpServer.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    });
});