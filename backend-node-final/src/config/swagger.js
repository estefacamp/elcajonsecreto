/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/config/swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "El Cajón Secreto API",
      version: "1.0.0",
      description: "Documentación de la API para el Sex Shop PRO 💋",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  // 👇 Escanea automáticamente tus rutas
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app) {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger listo en http://localhost:4000/api/docs");
}
