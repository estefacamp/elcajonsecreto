/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/routes/orders.routes.js

import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

// Ruta demo pero protegida:
router.get("/", protect, (req, res) => {
  res.json({
    message: "Ordenes funcionando (modo demo)",
    user: req.user, // opcional: para ver quién se autenticó
  });
});

export default router;

