import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let memoryServer = null;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (uri) {
    await mongoose.connect(uri);
    console.log(`[db] Connected to MongoDB at ${uri.replace(/\/\/.*@/, "//***@")}`);
    return;
  }

  const dbPath = path.join(__dirname, "..", ".mongo-data");
  fs.mkdirSync(dbPath, { recursive: true });

  const { MongoMemoryServer } = await import("mongodb-memory-server");
  memoryServer = await MongoMemoryServer.create({
    instance: {
      dbPath,
      dbName: "aurelia-hotel",
    },
  });
  const memUri = memoryServer.getUri("aurelia-hotel");
  await mongoose.connect(memUri);
  console.log("[db] MONGODB_URI not set — started local in-memory MongoDB for dev.");
  console.log(`[db] Data persists at server/.mongo-data across restarts.`);
}

export async function disconnectDB() {
  await mongoose.disconnect();
  if (memoryServer) await memoryServer.stop();
}
