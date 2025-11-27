/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ["vibradores", "lenceria", "masajes", "bdsm", "anal", "otros"],
      default: "otros",
    },
    description: { type: String, default: "" },
    image: { type: String, default: "/placeholder.svg" },
    rating: { type: Number, default: 4.8 },
    reviews: { type: Number, default: 0 },
    stock: { type: Number, default: 10 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
