import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const products = [
  {
    name: "Silla de ruedas plegable",
    description:
      "Silla de ruedas ligera y plegable, ideal para traslados dentro y fuera del hogar. Reposapies removibles y frenos de seguridad.",
    price: 189.99,
    imageUrl: "https://images.unsplash.com/photo-1576765607924-3f7b9c1f6d51?w=800",
    category: "Movilidad",
    stock: 12,
  },
  {
    name: "Cama de hospital eléctrica",
    description:
      "Cama articulada con control eléctrico de altura y respaldo, barandales de seguridad incluidos. Ideal para cuidado en casa.",
    price: 899.0,
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
    category: "Equipo médico",
    stock: 4,
  },
  {
    name: "Andadera con ruedas y asiento",
    description:
      "Andadera plegable de 4 ruedas con asiento y cesta, frenos de mano ajustables para mayor estabilidad al caminar.",
    price: 124.5,
    imageUrl: "https://images.unsplash.com/photo-1576671414121-aa2d5b0d1e5f?w=800",
    category: "Movilidad",
    stock: 20,
  },
  {
    name: "Oxímetro de pulso digital",
    description:
      "Mide saturación de oxígeno y frecuencia cardiaca de forma rápida y precisa. Pantalla LED de fácil lectura.",
    price: 24.99,
    imageUrl: "https://images.unsplash.com/photo-1584931423298-c576fda54bd2?w=800",
    category: "Monitoreo",
    stock: 50,
  },
  {
    name: "Colchón anti-escaras",
    description:
      "Colchón de presión alterna para prevención de úlceras por presión en pacientes encamados. Incluye bomba de aire silenciosa.",
    price: 149.0,
    imageUrl: "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800",
    category: "Equipo médico",
    stock: 10,
  },
  {
    name: "Kit de cuidado personal a domicilio",
    description:
      "Set de higiene y confort para pacientes en cama: cuñas, esponjas desechables, guantes y toallas absorbentes.",
    price: 39.9,
    imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800",
    category: "Cuidado personal",
    stock: 35,
  },
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@thallyhomecare.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash },
  });
  console.log(`Admin listo: ${adminEmail}`);

  for (const product of products) {
    const existing = await prisma.product.findFirst({ where: { name: product.name } });
    if (!existing) {
      await prisma.product.create({ data: product });
    }
  }
  console.log(`Productos de ejemplo cargados (${products.length}).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
