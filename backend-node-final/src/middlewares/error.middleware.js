/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/middlewares/error.middleware.js
export function errorHandler(err, req, res, next) {
    console.error("🔥 Error:", err);
  
    const status = err.statusCode || 500;
    const message = err.message || "Error interno del servidor";
  
    res.status(status).json({
      message,
    });
  }
  