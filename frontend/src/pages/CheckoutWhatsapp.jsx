import { Link } from "react-router-dom";

export default function CheckoutWhatsapp() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-5xl">💬</div>
      <h1 className="mt-4 text-2xl font-bold text-brand-900">¡Pedido enviado por WhatsApp!</h1>
      <p className="mt-2 text-slate-600">
        Se abrió una conversación de WhatsApp con el detalle de tu pedido. Coordina con nosotros
        el pago y la entrega directamente por ese medio.
      </p>
      <Link to="/catalogo" className="mt-8 inline-block text-brand-600 font-medium">
        Volver al catálogo
      </Link>
    </div>
  );
}
