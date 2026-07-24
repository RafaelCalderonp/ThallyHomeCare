# Thally HomeCare

Sitio web de presentación de la empresa, con catálogo de productos, carrito de
compras, checkout con pago real (Stripe) y pedidos por WhatsApp, más un panel
de administración para gestionar productos y pedidos.

## Estructura del proyecto

```
backend/    API en Node.js + Express + Prisma (PostgreSQL)
frontend/   Sitio en React (Vite) + Tailwind CSS
render.yaml Blueprint de despliegue del backend + base de datos en Render
```

## Backend

Necesitas una base de datos PostgreSQL (local o remota, por ejemplo la de
Render).

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
| `DATABASE_URL` | Cadena de conexión de PostgreSQL |
| `PORT` | Puerto del backend (por defecto 4000) |
| `CORS_ORIGIN` | Uno o varios orígenes permitidos, separados por coma |
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

En desarrollo, el servidor de Vite tiene configurado un proxy de `/api` hacia
`http://localhost:4000`, así que solo necesitas tener el backend corriendo en
paralelo y no hace falta definir `VITE_API_URL`.

## Funcionalidades

- **Sitio público**: presentación de la empresa (inicio, nosotros, contacto),
  catálogo de productos con filtro por categoría, ficha de producto y
  carrito de compras.
- **Checkout**: el cliente puede pagar en línea con tarjeta (Stripe Checkout)
  o enviar su pedido directamente por WhatsApp con el detalle y el total.
- **Panel de administración** (`/admin/login`): CRUD de productos (crear,
  editar, activar/desactivar, eliminar) y listado de pedidos con su canal
  (en línea / WhatsApp), estado y datos del cliente.

## Despliegue: Backend + BD en Render, Frontend en Cloudflare Pages

### 1. Backend y base de datos en Render

La forma más rápida es usar el blueprint incluido (`render.yaml`) desde el
[dashboard de Render](https://dashboard.render.com):

1. **New > Blueprint**, selecciona este repositorio. Render detecta
   `render.yaml` y crea automáticamente:
   - Una base de datos PostgreSQL (`thallyhomecare-db`).
   - Un servicio web (`thallyhomecare-backend`) con `rootDir: backend`, que
     ejecuta `npm install && npm run build` (genera el cliente Prisma y
     aplica las migraciones con `prisma migrate deploy`) y luego
     `npm start`.
   - `DATABASE_URL` y `JWT_SECRET` se generan/conectan solos.
2. Completa en el dashboard las variables marcadas como manuales:
   `CORS_ORIGIN`, `FRONTEND_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`,
   `STRIPE_SECRET_KEY`, `WHATSAPP_NUMBER`. `CORS_ORIGIN` y `FRONTEND_URL`
   deben apuntar al dominio que te asigne Cloudflare Pages (puedes
   actualizarlos después de crearlo).
3. Tras el primer deploy, corre el seed una sola vez desde la pestaña
   **Shell** del servicio en Render:
   ```bash
   npm run seed
   ```

Si prefieres configurarlo a mano (sin blueprint): crea una base de datos
PostgreSQL en Render, luego un "Web Service" apuntando a la carpeta
`backend/`, con build command `npm install && npm run build` y start command
`npm start`, y define las mismas variables de entorno de la tabla anterior
usando la `DATABASE_URL` que te da la base de datos de Render.

### 2. Frontend en Cloudflare Pages

1. En el dashboard de Cloudflare, **Workers & Pages > Create > Pages >
   Connect to Git**, selecciona este repositorio.
2. Configura el build:
   - **Root directory**: `frontend`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
3. Define las variables de entorno del proyecto (Settings > Environment
   variables):
   - `VITE_WHATSAPP_NUMBER`: tu número de WhatsApp.
   - `VITE_API_URL`: la URL pública del backend en Render seguida de `/api`,
     por ejemplo `https://thallyhomecare-backend.onrender.com/api`.
4. Despliega. El archivo `frontend/public/_redirects` ya está incluido para
   que las rutas de React Router (`/catalogo`, `/admin/login`, etc.)
   funcionen correctamente en Cloudflare Pages.
5. Una vez tengas el dominio de Cloudflare Pages, actualiza `CORS_ORIGIN` y
   `FRONTEND_URL` en Render con esa URL (puedes incluir tanto el dominio de
   producción como el de previews, separados por coma) y vuelve a desplegar
   el backend.

Si prefieres la CLI en vez del dashboard, `frontend/wrangler.toml` ya define
`pages_build_output_dir`, así que puedes desplegar con:
```bash
cd frontend
npm run build
npx wrangler pages deploy
```

## Notas de producción

- El estado de los pedidos pagados con Stripe se confirma en el momento en
  que el cliente vuelve a `/checkout/success` (se verifica la sesión de
  Stripe contra el backend). Para mayor robustez en producción, se puede
  añadir un webhook de Stripe (`checkout.session.completed`).
- El plan free de Render "duerme" el servicio tras un rato de inactividad;
  la primera petición después de eso puede tardar unos segundos.
