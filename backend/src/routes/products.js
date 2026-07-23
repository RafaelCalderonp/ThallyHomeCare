import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

// Público: lista solo productos activos
router.get("/", async (req, res) => {
  const { category } = req.query;
  const products = await prisma.product.findMany({
    where: {
      active: true,
      ...(category ? { category } : {}),
    },
    orderBy: { createdAt: "desc" },
  });
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await prisma.product.findUnique({ where: { id: req.params.id } });
  if (!product || !product.active) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(product);
});

// Admin: ve todos, incluidos inactivos
router.get("/admin/all", requireAdmin, async (req, res) => {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  res.json(products);
});

router.post("/", requireAdmin, async (req, res) => {
  const { name, description, price, imageUrl, category, stock, active } = req.body;
  if (!name || !description || price == null || !category) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }
  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: Number(price),
      imageUrl: imageUrl || null,
      category,
      stock: Number(stock) || 0,
      active: active ?? true,
    },
  });
  res.status(201).json(product);
});

router.put("/:id", requireAdmin, async (req, res) => {
  const { name, description, price, imageUrl, category, stock, active } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price: Number(price) }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(category !== undefined && { category }),
        ...(stock !== undefined && { stock: Number(stock) }),
        ...(active !== undefined && { active }),
      },
    });
    res.json(product);
  } catch {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

export default router;
