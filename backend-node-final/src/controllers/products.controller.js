/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/controllers/products.controller.js
import mongoose from "mongoose";
import { Product } from "../models/product.js";

// GET /api/productos → lista todos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// GET /api/productos/:id → detalle
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Validar formato de ObjectId antes de ir a la DB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    // 2️⃣ Buscar en Mongo
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // 3️⃣ Todo ok
    res.json(product);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// POST /api/productos → crear
export const createProduct = async (req, res) => {
  try {
    const nuevo = await Product.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res
      .status(400)
      .json({ message: "Datos inválidos", error: error.message });
  }
};

