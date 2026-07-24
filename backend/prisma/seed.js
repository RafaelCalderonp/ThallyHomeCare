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
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800",
    category: "Perfumería",
    stock: 15,
  },
  {
    name: "Labial mate Rosé Kiss",
    description:
      "Labial de acabado mate en tono rosa intenso, fórmula de larga duración e hidratante.",
    price: 14.99,
    imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800",
    category: "Maquillaje",
    stock: 30,
  },
  {
    name: "Crema facial Silk Glow",
    description:
      "Crema hidratante con manteca de karité y vitamina E, para una piel suave y luminosa.",
    price: 22.5,
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800",
    category: "Cuidado de la piel",
    stock: 20,
  },
  {
    name: "Sérum facial Vitamina C",
    description:
      "Sérum concentrado antioxidante que unifica el tono de la piel y aporta luminosidad.",
    price: 28.0,
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800",
    category: "Cuidado de la piel",
    stock: 18,
  },
  {
    name: "Body mist Blossom",
    description:
      "Bruma corporal perfumada de flores blancas, ligera y refrescante para uso diario.",
    price: 18.9,
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800",
    category: "Perfumería",
    stock: 25,
  },
  {
    name: "Loción corporal perfumada",
    description:
      "Loción corporal de rápida absorción, con aroma suave y efecto humectante todo el día.",
    price: 16.5,
    imageUrl: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=800",
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
