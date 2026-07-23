import { prisma } from "./prisma.js";

// Recalcula el pedido en el servidor a partir de precios reales en BD,
// para no confiar en los precios que envía el cliente.
export async function buildOrderFromCart({
  customerName,
  customerEmail,
  customerPhone,
  customerAddress,
  channel,
  items,
}) {
  if (!customerName || !customerEmail || !customerPhone) {
    throw new Error("Nombre, correo y teléfono del cliente son requeridos");
  }
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("El carrito está vacío");
  }

  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, active: true },
  });
  const productMap = new Map(products.map((p) => [p.id, p]));

  const orderItemsData = [];
  let total = 0;

  for (const item of items) {
    const product = productMap.get(item.productId);
    const quantity = Number(item.quantity) || 0;
    if (!product || quantity <= 0) continue;
    const unitPrice = product.price;
    total += unitPrice * quantity;
    orderItemsData.push({ productId: product.id, quantity, unitPrice });
  }

  if (orderItemsData.length === 0) {
    throw new Error("Ningún producto del carrito es válido");
  }

  const order = await prisma.order.create({
    data: {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress: customerAddress || null,
      channel,
      total,
      items: { create: orderItemsData },
    },
    include: { items: { include: { product: true } } },
  });

  return order;
}

export function buildWhatsappLink(order) {
  const number = process.env.WHATSAPP_NUMBER;
  const lines = [
    `Nuevo pedido de ${order.customerName}`,
    `Tel: ${order.customerPhone}`,
    `Email: ${order.customerEmail}`,
    "",
    ...order.items.map(
      (i) => `- ${i.quantity} x ${i.product.name} ($${i.unitPrice.toFixed(2)} c/u)`
    ),
    "",
    `Total: $${order.total.toFixed(2)}`,
    `Pedido #${order.id}`,
  ];
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${number}?text=${text}`;
}
