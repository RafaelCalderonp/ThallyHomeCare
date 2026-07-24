import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const products = [
  {
    name: "Perfume Golden Bloom",
    description:
      "Fragancia floral con notas doradas de vainilla y ámbar, en elegante frasco de cristal. Larga duración.",
    price: 45.99,
    imageUrl: "/products/perfume-golden-bloom.jpg",
    category: "Perfumería",
    stock: 15,
  },
  {
    name: "Labial mate Rosé Kiss",
    description:
      "Labial de acabado mate en tono rosa intenso, fórmula de larga duración e hidratante.",
    price: 14.99,
    imageUrl: "/products/labial-rose-kiss.jpg",
    category: "Maquillaje",
    stock: 30,
  },
  {
    name: "Crema facial Silk Glow",
    description:
      "Crema hidratante con manteca de karité y vitamina E, para una piel suave y luminosa.",
    price: 22.5,
    imageUrl: "/products/crema-silk-glow.jpg",
    category: "Cuidado de la piel",
    stock: 20,
  },
  {
    name: "Sérum facial Vitamina C",
    description:
      "Sérum concentrado antioxidante que unifica el tono de la piel y aporta luminosidad.",
    price: 28.0,
    imageUrl: "/products/serum-vitamina-c.jpg",
    category: "Cuidado de la piel",
    stock: 18,
  },
  {
    name: "Body mist Blossom",
    description:
      "Bruma corporal perfumada de flores blancas, ligera y refrescante para uso diario.",
    price: 18.9,
    imageUrl: "/products/body-mist-blossom.jpg",
    category: "Perfumería",
    stock: 25,
  },
  {
    name: "Loción corporal perfumada",
    description:
      "Loción corporal de rápida absorción, con aroma suave y efecto humectante todo el día.",
    price: 16.5,
    imageUrl: "/products/locion-corporal.jpg",
    category: "Cuidado personal",
    stock: 22,
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
    if (existing) {
      await prisma.product.update({ where: { id: existing.id }, data: product });
    } else {
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
