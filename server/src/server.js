import express from "express"
import cors from "cors";
import dotenv from "dotenv"

import taskRoutes from "./routes/taskRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(
    cors({
        origin: ["http://localhost:5173","http://192.168.0.118:5173"]
    })
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api/users",userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks",taskRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    });
});