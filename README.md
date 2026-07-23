# Thally HomeCare

Sitio web de presentación de la empresa, con catálogo de productos, carrito de
compras, checkout con pago real (Stripe) y pedidos por WhatsApp, más un panel
de administración para gestionar productos y pedidos.

## Estructura del proyecto

```
backend/    API en Node.js + Express + Prisma (SQLite)
frontend/   Sitio en React (Vite) + Tailwind CSS
```

## Backend

```bash
cd backend
npm install
cp .env.example .env   # ajusta las variables (ver abajo)
npx prisma migrate dev --name init
npm run seed            # crea el admin y productos de ejemplo
npm run dev              # http://localhost:4000
```

Variables de entorno (`backend/.env`):

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Ruta del archivo SQLite (por defecto `file:./dev.db`) |
| `PORT` | Puerto del backend (por defecto 4000) |
| `CORS_ORIGIN` | Origen permitido para el frontend |
| `JWT_SECRET` | Clave para firmar los tokens del panel admin |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Credenciales del admin creadas por `npm run seed` |
| `STRIPE_SECRET_KEY` | Clave secreta de Stripe (modo test) para habilitar el pago en línea |
| `FRONTEND_URL` | URL del frontend, usada en las redirecciones de Stripe |
| `WHATSAPP_NUMBER` | Número de WhatsApp que recibe los pedidos (con código de país, sin `+` ni espacios) |

Si no defines `STRIPE_SECRET_KEY`, el botón de "Pagar en línea" mostrará un
mensaje indicando que el pago no está configurado, pero el resto del sitio
(catálogo, pedidos por WhatsApp, panel admin) funciona con normalidad.

### Probar pagos con Stripe

1. Crea una cuenta en [Stripe](https://dashboard.stripe.com) y copia tu clave
   secreta de **modo test** (`sk_test_...`).
2. Colócala en `STRIPE_SECRET_KEY`.
3. En el checkout, usa la tarjeta de prueba `4242 4242 4242 4242`, cualquier
   fecha futura y cualquier CVC.

## Frontend

```bash
cd frontend
npm install
cp .env.example .env   # ajusta VITE_WHATSAPP_NUMBER
npm run dev              # http://localhost:5173
```

El servidor de desarrollo de Vite tiene configurado un proxy de `/api` hacia
`http://localhost:4000`, así que solo necesitas tener el backend corriendo en
paralelo.

## Funcionalidades

- **Sitio público**: presentación de la empresa (inicio, nosotros, contacto),
  catálogo de productos con filtro por categoría, ficha de producto y
  carrito de compras.
- **Checkout**: el cliente puede pagar en línea con tarjeta (Stripe Checkout)
  o enviar su pedido directamente por WhatsApp con el detalle y el total.
- **Panel de administración** (`/admin/login`): CRUD de productos (crear,
  editar, activar/desactivar, eliminar) y listado de pedidos con su canal
  (en línea / WhatsApp), estado y datos del cliente.

## Notas de producción

- La base de datos es SQLite por simplicidad; para producción se recomienda
  migrar a PostgreSQL cambiando el `provider` y `DATABASE_URL` en
  `backend/prisma/schema.prisma`.
- El estado de los pedidos pagados con Stripe se confirma en el momento en
  que el cliente vuelve a `/checkout/success` (se verifica la sesión de
  Stripe contra el backend). Para mayor robustez en producción, se puede
  añadir un webhook de Stripe (`checkout.session.completed`).
