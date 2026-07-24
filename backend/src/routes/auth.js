import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }

  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const token = jwt.sign({ sub: admin.id, email: admin.email }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });

  res.json({ token, email: admin.email });
});

// Cuentas con acceso completo al panel (vendedores/administradores)
router.get("/users", requireAdmin, async (req, res) => {
  const users = await prisma.adminUser.findMany({
    select: { id: true, email: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });
  res.json(users);
});

router.post("/users", requireAdmin, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres" });
  }

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: "Ya existe una cuenta con ese correo" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.adminUser.create({
    data: { email, passwordHash },
    select: { id: true, email: true, createdAt: true },
  });
  res.status(201).json(user);
});

router.delete("/users/:id", requireAdmin, async (req, res) => {
  if (req.params.id === req.admin.sub) {
    return res.status(400).json({ error: "No puedes eliminar tu propia cuenta" });
  }

  const count = await prisma.adminUser.count();
  if (count <= 1) {
    return res.status(400).json({ error: "Debe quedar al menos una cuenta con acceso" });
  }

  try {
    await prisma.adminUser.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch {
    res.status(404).json({ error: "Cuenta no encontrada" });
  }
});

export default router;
