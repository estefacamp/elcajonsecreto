/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
  // src/controllers/auth.controller.js

  import jwt from "jsonwebtoken"
  import { User } from "../models/User.js";


  // ========= FUNCIÓN PARA CREAR TOKEN ==========
  function crearToken(user) {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no está definido en las variables de entorno")
    }

    return jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // 7 días
    )
  }

  // ========= REGISTER ==========
  export const register = async (req, res) => {
    try {
      console.log("📥 Body recibido en /api/auth/register:", req.body)

      const { name, email, password } = req.body

      // Validación simple
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Faltan datos" })
      }

      // Verificar si ya existe el email
      console.log("🔎 Buscando usuario por email:", email)
      const existe = await User.findOne({ email })

      if (existe) {
        return res
          .status(400)
          .json({ message: "El email ya está registrado" })
      }

      // Crear usuario (el modelo se encarga de encriptar la contraseña)
      console.log("🧩 Creando usuario nuevo en MongoDB...")
      const user = await User.create({
        name,
        email,
        password,
        role: "user", // por si el esquema tiene este campo
      })

      // Crear token
      console.log("🔐 Creando token JWT...")
      const token = crearToken(user)

      console.log("✅ Usuario registrado OK:", user.email)

      // Respuesta
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
      return res.status(500).json({ message: "Error en el servidor" })
    }
  }

  // ========= LOGIN (básico, se puede mejorar después) ==========
  export const login = async (req, res) => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ message: "Faltan datos" })
      }

      // Buscar usuario
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: "Credenciales inválidas" })
      }

      // Comparar password (suponiendo método en el modelo: user.comparePassword)
      const esValido = await user.comparePassword(password)
      if (!esValido) {
        return res.status(400).json({ message: "Credenciales inválidas" })
      }

      const token = crearToken(user)

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
      return res.status(500).json({ message: "Error en el servidor" })
    }
  }
