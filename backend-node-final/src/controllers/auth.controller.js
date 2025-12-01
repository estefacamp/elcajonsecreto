/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */

// src/controllers/auth.controller.js

import jwt from "jsonwebtoken"
import { User } from "../models/User.js"

// ---- CREAR TOKEN ----
function crearToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido en el .env")
  }

  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )
}

// ---- REGISTER ----
export const register = async (req, res) => {
  try {
    console.log("📥 Body recibido en /api/auth/register:", req.body)

    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Faltan datos" })
    }

    const existe = await User.findOne({ email })
    if (existe) {
      return res.status(400).json({ message: "El email ya está registrado" })
    }

    console.log("🧩 Creando usuario en MongoDB...")
    const user = await User.create({ name, email, password })

    console.log("🔐 Creando token...")
    const token = crearToken(user)

    console.log("✅ Usuario registrado:", user.email)

    return res.status(201).json({
      message: "Usuario registrado correctamente",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("🔥 Error en register:", error)
    return res.status(500).json({ message: "Error en servidor" })
  }
}

// ---- LOGIN ----
export const login = async (req, res) => {
  try {
    console.log("📥 Body recibido en /api/auth/login:", req.body)

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Faltan datos" })
    }

    const user = await User.findOne({ email })
    console.log("🔎 Usuario encontrado:", user ? user.email : "NO")

    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" })
    }

    const esValido = await user.comparePassword(password)
    console.log("🔐 ¿Password válido?", esValido)

    if (!esValido) {
      return res.status(400).json({ message: "Credenciales inválidas" })
    }

    const token = crearToken(user)

    console.log("✅ Login exitoso de:", user.email)

    return res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("🔥 Error en login:", error)
    return res.status(500).json({ message: "Error en servidor" })
  }
}
