import express from "express"
import taskRoutes from "./routes/taskRoutes.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

connectDB();

app.use(express.json());

app.use("/api/tasks",taskRoutes);

app.listen(5001, () => {
    console.log("Server started on PORT:", PORT);
})