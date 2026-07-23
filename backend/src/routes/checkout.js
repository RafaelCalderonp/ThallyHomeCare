import { Router } from "express";
import Stripe from "stripe";
import { prisma } from "../lib/prisma.js";
import { buildOrderFromCart } from "../lib/orders.js";

const router = Router();

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === "sk_test_xxx") {
    return null;
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

router.post("/session", async (req, res) => {
  const stripe = getStripe();
  if (!stripe) {
    return res.status(503).json({
      error:
        "El pago en línea no está configurado todavía. Define STRIPE_SECRET_KEY en el backend.",
    });
  }

  try {
    const order = await buildOrderFromCart({ ...req.body, channel: "online" });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: order.customerEmail,
      line_items: order.items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.unitPrice * 100),
          product_data: { name: item.product.name },
        },
      })),
      success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel?order_id=${order.id}`,
      metadata: { orderId: order.id },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/confirm", async (req, res) => {
  const stripe = getStripe();
  const { session_id } = req.query;
  if (!stripe || !session_id) {
    return res.status(400).json({ error: "Falta session_id" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const orderId = session.metadata?.orderId;
    if (!orderId) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    if (session.payment_status === "paid") {
      await prisma.order.update({ where: { id: orderId }, data: { status: "paid" } });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    });
    res.json({ order, paid: session.payment_status === "paid" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
