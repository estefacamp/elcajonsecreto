/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/services/product.service.js

import { Product } from "../models/Product.js"

// 📦 Obtener todos los productos activos
async function getAllProducts() {
  return await Product.find({ isActive: true })
}

// 🎯 Obtener un producto por ID
async function getProductById(id) {
  return await Product.findById(id)
}

// ➕ Crear un producto nuevo
async function createProduct(data) {
  const nuevo = new Product(data)
  return await nuevo.save()
}

// ✏️ Actualizar un producto
async function updateProduct(id, data) {
  return await Product.findByIdAndUpdate(id, data, { new: true })
}

// 🗑 Desactivar (soft delete) un producto
async function deactivateProduct(id) {
  return await Product.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  )
}

// 👑 Export del "service" como objeto
export const productService = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deactivateProduct,
}
