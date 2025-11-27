/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
import mercadopago from "mercadopago";

if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
  throw new Error("MERCADOPAGO_ACCESS_TOKEN no está definido en el .env");
}

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export async function crearPreferencia(items) {
  console.log("📦 Items recibidos en service:", items);

  const preference = {
    items: items.map((item) => ({
      title: item.name,
      quantity: item.quantity,
      currency_id: "ARS",
      unit_price: Number(item.price),
    })),
    back_urls: {
      success: `${CLIENT_URL}/checkout?status=success`,
      failure: `${CLIENT_URL}/checkout?status=failure`,
      pending: `${CLIENT_URL}/checkout?status=pending`,
    },
    // ❌ sacamos esto por ahora:
    // auto_return: "approved",
  };

  console.log(
    "🧾 Preferencia que se envía a MP:",
    JSON.stringify(preference, null, 2)
  );

  try {
    const response = await mercadopago.preferences.create(preference);
    console.log("✅ Preferencia creada OK:", response.body.id);
    return response.body;
  } catch (error) {
    console.error("❌ Error creando preferencia en Mercado Pago:", error);
    throw new Error("No se pudo crear la preferencia");
  }
}
