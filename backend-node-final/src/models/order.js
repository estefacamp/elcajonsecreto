/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pendiente", "pagada", "enviada", "cancelada"],
      default: "pendiente",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);

