/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */

// src/routes/upload.routes.js
import { Router } from "express";
import multer from "multer";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";
// ❌ IMPORTANTE: por ahora NO usamos auth acá
// import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = Router();

// 📁 Multer: guarda temporalmente en /uploads
const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: Subida de imágenes a Cloudinary
 */

/**
 * @swagger
 * /api/upload/imagen-producto:
 *   post:
 *     summary: Subir imagen de producto a Cloudinary
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagen subida correctamente
 *       400:
 *         description: Error al subir imagen
 */
router.post(
  "/imagen-producto",
  // protect, adminOnly,   👈 POR AHORA COMENTADO / BORRADO
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No se envió ninguna imagen" });
      }

      const resultado = await cloudinary.uploader.upload(req.file.path, {
        folder: "elcajonsecreto/productos",
      });

      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error borrando archivo temporal:", err);
      });

      res.json({
        url: resultado.secure_url,
        public_id: resultado.public_id,
      });
    } catch (error) {
      console.error("Error subiendo imagen a Cloudinary:", error);
      res
        .status(400)
        .json({ message: "Error subiendo imagen", error: error.message });
    }
  }
);

export default router;
