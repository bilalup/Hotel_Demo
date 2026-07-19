import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`[server] Aurelia Hotel API running on ${PORT}`);
    });
  } catch (err) {
    console.error("[server] Failed to start:", err);
    process.exit(1);
  }
}

start();
