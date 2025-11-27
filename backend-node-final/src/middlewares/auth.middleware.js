/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/middlewares/auth.middleware.js

import jwt from "jsonwebtoken"
import { User } from "../models/User.js"   // 👈 CAMBIO IMPORTANTE

export async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization
    let token

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1]
    }

    if (!token) {
      return res.status(401).json({ message: "No autorizado, falta token" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id).select("-password")

    if (!req.user) {
      return res.status(401).json({ message: "Usuario no encontrado" })
    }

    next()
  } catch (error) {
    console.error("Error en protect:", error)
    res.status(401).json({ message: "Token inválido o expirado" })
  }
}

export function adminOnly(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Solo administradores" })
  }
  next()
}
