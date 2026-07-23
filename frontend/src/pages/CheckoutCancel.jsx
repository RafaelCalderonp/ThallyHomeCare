import { Link } from "react-router-dom";

export default function CheckoutCancel() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-5xl">✕</div>
      <h1 className="mt-4 text-2xl font-bold text-slate-800">Pago cancelado</h1>
      <p className="mt-2 text-slate-600">
        No se realizó ningún cargo. Tu carrito sigue disponible por si deseas intentarlo de
        nuevo.
      </p>
      <Link to="/carrito" className="mt-8 inline-block text-brand-600 font-medium">
        Volver al carrito
      </Link>
    </div>
  );
}
