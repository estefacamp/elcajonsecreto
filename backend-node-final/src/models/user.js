/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
  // src/models/User.js

  import mongoose from "mongoose"
  import bcrypt from "bcryptjs"

  const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true,
      },

      email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true,
        trim: true,
        lowercase: true,
      },

      password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minlength: [6, "La contraseña debe tener mínimo 6 caracteres"],
      },

      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
    },
    { timestamps: true }
  )

  // =====================
  // ENCRIPTAR PASSWORD
  // =====================
  userSchema.pre("save", async function (next) {
    // Si la contraseña NO fue modificada → sigue
    if (!this.isModified("password")) return next()

    try {
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
      next()
    } catch (error) {
      next(error)
    }
  })

  // =====================
  // MÉTODO PARA LOGIN
  // =====================
  userSchema.methods.comparePassword = async function (passwordIngresada) {
    return await bcrypt.compare(passwordIngresada, this.password)
  }

  // Crear modelo
  export const User = mongoose.model("User", userSchema)
