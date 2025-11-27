/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */

// src/routes/payments.routes.js
import { Router } from "express";
import { crearPreferenciaHandler } from "../controllers/payments.controller.js";

const router = Router();

// POST /api/pagos/crear-preferencia
router.post("/crear-preferencia", crearPreferenciaHandler);

export default router;
