import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js"
import { connectDB } from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log("Server is running on Port :", PORT);
    connectDB();
});





