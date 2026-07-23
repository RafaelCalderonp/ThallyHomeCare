import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/auth.js";
import { buildOrderFromCart, buildWhatsappLink } from "../lib/orders.js";

const router = Router();

// Pedido por WhatsApp: se crea el pedido como referencia y se devuelve el link de wa.me
router.post("/whatsapp", async (req, res) => {
  try {
    const order = await buildOrderFromCart({ ...req.body, channel: "whatsapp" });
    const whatsappUrl = buildWhatsappLink(order);
    res.status(201).json({ order, whatsappUrl });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", requireAdmin, async (req, res) => {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });
  res.json(orders);
});

router.patch("/:id/status", requireAdmin, async (req, res) => {
  const { status } = req.body;
  const allowed = ["pending", "paid", "contacted", "cancelled"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: "Estado inválido" });
  }
  try {
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
      include: { items: { include: { product: true } } },
    });
    res.json(order);
  } catch {
    res.status(404).json({ error: "Pedido no encontrado" });
  }
});

export default router;
