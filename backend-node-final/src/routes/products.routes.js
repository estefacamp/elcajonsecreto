/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */

// src/routes/products.routes.js
import { Router } from "express";
// ❗ POR AHORA quitamos auth hasta que armes panel admin
// import { protect, adminOnly } from "../middlewares/auth.middleware.js";
import { productService } from "../services/product.service.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Endpoints de productos del Sex Shop PRO
 */

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get("/", async (req, res) => {
  try {
    const productos = await productService.getAllProducts();
    res.json(productos);
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/", async (req, res) => {
  try {
    const producto = await productService.createProduct(req.body);
    res.status(201).json(producto);
  } catch (error) {
    console.error("Error creando producto:", error);
    res.status(400).json({ message: "Datos inválidos" });
  }
});

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", async (req, res) => {
  try {
    const producto = await productService.getProductById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    console.error("Error obteniendo producto:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await productService.updateProduct(
      req.params.id,
      req.body
    );
    if (!actualizado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(actualizado);
  } catch (error) {
    console.error("Error actualizando producto:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await productService.deleteProduct(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error eliminando producto:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

export default router;
