/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */

// src/server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"; // 👈 requerido por consigna

import { connectDB } from "./config/db.js";
import productsRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import paymentsRoutes from "./routes/payments.routes.js";
import uploadRoutes from "./routes/upload.routes.js";   // 👈 SOLO ACÁ
import { errorHandler } from "./middlewares/error.middleware.js";
import { swaggerDocs } from "./config/swagger.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Función para levantar todo ordenado
async function startServer() {
  try {
    // 1) Conectar a la base de datos
    await connectDB();

    // 2) Middlewares globales
    app.use(
      cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
      })
    );
    app.use(helmet());
    app.use(morgan("dev"));

    // 👉 Usa body-parser (lo pide la consigna)
    app.use(bodyParser.json());
    // app.use(express.json()); // opcional

    app.use(cookieParser());

    // 3) Ruta base de prueba
    app.get("/", (req, res) => {
      res.send("API Sex Shop PRO funcionando ✅");
    });

    // 4) Rutas principales
    app.use("/api/auth", authRoutes);
    app.use("/api/productos", productsRoutes);
    app.use("/api/ordenes", ordersRoutes);
    app.use("/api/pagos", paymentsRoutes);
    app.use("/api/upload", uploadRoutes);   // 👈 ACÁ VA LA DE CLOUDINARY

    // 4.5) 👉 Swagger ANTES del 404
    swaggerDocs(app); // 📘 http://localhost:4000/api/docs

    // 5) Middleware 404 (Rutas inexistentes)
    app.use((req, res, next) => {
      res.status(404).json({
        message: "Ruta no encontrada",
        path: req.originalUrl,
      });
    });

    // 6) Manejo de errores global
    app.use(errorHandler);

    // 7) Levantar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor Sex Shop PRO en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error iniciando el servidor:", error);
    process.exit(1);
  }
}

// Ejecutar
startServer();
