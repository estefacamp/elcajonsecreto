/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URI = process.env.MONGO_URI;

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB", error.message);
    process.exit(1);
  }
}
  
