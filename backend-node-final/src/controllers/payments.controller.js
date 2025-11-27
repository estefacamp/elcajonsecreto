/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */

// src/controllers/payments.controller.js
import { crearPreferencia } from "../services/payments.service.js";

export const crearPreferenciaHandler = async (req, res) => {
  try {
    console.log("📥 Body recibido en /api/pagos/crear-preferencia:", req.body);

    const { items } = req.body;

    // Validar que vengan items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "No hay items para crear la preferencia de pago" });
    }

    // Llamar al servicio que crea la preferencia en Mercado Pago
    const preference = await crearPreferencia(items);

    // Devolver datos importantes al front
    return res.status(201).json({
      id: preference.id,
      init_point: preference.init_point,
      sandbox_init_point: preference.sandbox_init_point,
    });
  } catch (error) {
    console.error("❌ Error creando preferencia de pago:", error);

    return res.status(500).json({
      message: "Error al crear la preferencia de pago",
      error: error.message,
    });
  }
};
