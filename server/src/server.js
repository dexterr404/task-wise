import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import passport from "./config/passport.js"
import taskRoutes from "./routes/taskRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"
import teamRoutes from "./routes/teamRoutes.js"
import teamTaskRoutes from "./routes/teamTaskRoutes.js"
import commentsRoutes from "./routes/commentsRoutes.js"
import teamInboxRoutes from "./routes/teamInbox.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(
    cors({
        origin: ["http://localhost:5173",process.env.APP_BASE_URL]
    })
);
app.use(express.json());
app.use(passport.initialize());
app.use(rateLimiter);

app.use("/api/users",userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/personal",taskRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/teams", teamTaskRoutes);
app.use("/api/teams", commentsRoutes);
app.use("/api/teams", teamInboxRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    });
});