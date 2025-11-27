/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
import { Router } from "express";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";
import { productService } from "../services/product.service.js";

const router = Router();

// GET todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await productService.getAllProducts();
    res.json(productos);
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// POST crear producto (admin)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const guardado = await productService.createProduct(req.body);
    res.status(201).json(guardado);
  } catch (error) {
    console.error("Error creando producto:", error);
    res.status(400).json({ message: "Datos inválidos", error: error.message });
  }
});

// GET producto por id
router.get("/:id", async (req, res) => {
  try {
    const producto = await productService.getProductById(req.params.id);

    if (!producto)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json(producto);
  } catch (error) {
    console.error("Error buscando producto:", error);
    res.status(400).json({ message: "ID inválido" });
  }
});

// PUT editar producto (admin)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const actualizado = await productService.updateProduct(
      req.params.id,
      req.body
    );

    if (!actualizado)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json(actualizado);
  } catch (error) {
    console.error("Error actualizando producto:", error);
    res.status(400).json({ message: "Datos inválidos" });
  }
});

// DELETE desactivar producto (admin)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const eliminado = await productService.deactivateProduct(req.params.id);

    if (!eliminado)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto desactivado" });
  } catch (error) {
    console.error("Error eliminando producto:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

export default router;

