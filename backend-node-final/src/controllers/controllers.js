/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/controllers/auth.controller.js
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

function generarToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generarToken(user._id),
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generarToken(user._id),
    });
  } catch (err) {
    next(err);
  }
}
