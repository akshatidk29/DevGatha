import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";

import authRoutes from "./routes/auth.routes.js"
import runcodeRoutes from "./routes/runcode.routes.js"
import snippetRoutes from "./routes/snippet.routes.js"
import lessonRoute from "./routes/lesson.routes.js"
import progressRoute from "./routes/progress.routes.js"
import userProfileRoute from "./routes/userProfile.route.js"
import chatbotRoutes from "./routes/chatbot.routes.js";




import { connectDB } from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/run", runcodeRoutes);
app.use("/api/snippets", snippetRoutes);
app.use("/api/lessons", lessonRoute);
app.use("/api/progress", progressRoute);
app.use("/api/user", userProfileRoute);
app.use("/api/chatbot", chatbotRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  })
}

app.listen(PORT, () => {
  console.log("Server Running");
  connectDB();
});





