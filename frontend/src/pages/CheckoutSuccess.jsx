import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../api/client";
import { useCart } from "../context/CartContext";

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("loading"); // loading | paid | error
  const [order, setOrder] = useState(null);
  const { clearCart } = useCart();

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }
    api
      .get(`/checkout/confirm?session_id=${sessionId}`)
      .then(({ data }) => {
        setOrder(data.order);
        setStatus(data.paid ? "paid" : "error");
        if (data.paid) clearCart();
      })
      .catch(() => setStatus("error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      {status === "loading" && <p className="text-slate-500">Confirmando tu pago...</p>}
      {status === "paid" && (
        <>
          <div className="text-5xl">✅</div>
          <h1 className="mt-4 text-2xl font-bold text-brand-900">¡Pago confirmado!</h1>
          <p className="mt-2 text-slate-600">
            Gracias {order?.customerName}, hemos recibido tu pago por ${order?.total.toFixed(2)}.
            Te contactaremos pronto para coordinar la entrega.
          </p>
          <p className="mt-1 text-sm text-slate-400">Pedido #{order?.id}</p>
        </>
      )}
      {status === "error" && (
        <>
          <div className="text-5xl">⚠️</div>
          <h1 className="mt-4 text-2xl font-bold text-slate-800">
            No pudimos confirmar el pago
          </h1>
          <p className="mt-2 text-slate-600">
            Si el cargo fue realizado, contáctanos y con gusto lo verificamos.
          </p>
        </>
      )}
      <Link to="/catalogo" className="mt-8 inline-block text-brand-600 font-medium">
        Volver al catálogo
      </Link>
    </div>
  );
}
