import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";
import fs from "fs";
import path from "path";
import job from "./lib/cron.js";

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;
const pubDir = path.join(process.cwd(), "public");

app.use(express.json());

app.use("/api/webhooks/clerk",express.raw({type:"application/json"}), clerkWebhook)

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);

app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

if (fs.existsSync(pubDir)) {
  app.use(express.static(pubDir));
  app.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(pubDir, "index.html"), (err) => next(err));
  });
}

app.listen(3000, () => {
  connectDB();
  console.log(`Server is running on PORT ${PORT}`);

  if (process.env.NODE_ENV === "production") {
    job.start();
  }
});
