/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// index.js — Proyecto Final Node.js

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// -----------------------------
//  CLIENTES
// -----------------------------
let clientes = [
  { id: 1, nombre: "María Gómez", email: "maria@example.com" },
  { id: 2, nombre: "Juan Pérez", email: "juan@example.com" },
];

app.get("/api/clientes", (req, res) => {
  res.json(clientes);
});

app.post("/api/clientes", (req, res) => {
  const nuevo = {
    id: Date.now(),
    nombre: req.body.nombre,
    email: req.body.email,
  };
  clientes.push(nuevo);
  res.status(201).json(nuevo);
});

// -----------------------------
//  PRODUCTOS
// -----------------------------
let productos = [
  {
    id: 1,
    name: "Pack Degustación",
    price: 3500,
    category: "gomitas",
    image: "https://picsum.photos/seed/pack1/400/300",
    rating: 4.9,
    reviews: 31,
  },
  {
    id: 2,
    name: "Combo Mayorista",
    price: 12500,
    category: "gomitas",
    image: "https://picsum.photos/seed/pack2/400/300",
    rating: 4.7,
    reviews: 18,
  },
];

app.get("/api/productos", (req, res) => {
  res.json(productos);
});

app.post("/api/productos", (req, res) => {
  const nuevo = {
    id: Date.now(),
    name: req.body.name,
    price: Number(req.body.price),
    category: req.body.category ?? "general",
    image: req.body.image ?? "https://picsum.photos/seed/nuevo/400/300",
    rating: req.body.rating ?? 4.8,
    reviews: req.body.reviews ?? 10,
  };

  productos.push(nuevo);
  res.status(201).json(nuevo);
});

// -----------------------------
//  SERVER
// -----------------------------
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

