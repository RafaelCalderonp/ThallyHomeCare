import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { api } from "../api/client";
import PaymentBadges from "../components/PaymentBadges";

export default function Cart() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(null); // "online" | "whatsapp" | null
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    if (!form.name || !form.email || !form.phone) {
      setError("Nombre, correo y teléfono son requeridos.");
      return false;
    }
    if (items.length === 0) {
      setError("Tu carrito está vacío.");
      return false;
    }
    return true;
  }

  const payload = {
    customerName: form.name,
    customerEmail: form.email,
    customerPhone: form.phone,
    customerAddress: form.address,
    items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
  };

  async function handleStripeCheckout() {
    setError(null);
    if (!validate()) return;
    setLoading("online");
    try {
      const { data } = await api.post("/checkout/session", payload);
      window.location.href = data.url;
    } catch (err) {
      setError(err.response?.data?.error || "No se pudo iniciar el pago en línea.");
      setLoading(null);
    }
  }

  async function handleWhatsappOrder() {
    setError(null);
    if (!validate()) return;
    setLoading("whatsapp");
    try {
      const { data } = await api.post("/orders/whatsapp", payload);
      clearCart();
      window.open(data.whatsappUrl, "_blank");
      navigate("/checkout/whatsapp-enviado");
    } catch (err) {
      setError(err.response?.data?.error || "No se pudo generar el pedido.");
      setLoading(null);
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-brand-900">Tu carrito está vacío</h1>
        <Link to="/catalogo" className="mt-4 inline-block text-brand-600 font-medium">
          Ir al catálogo →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-brand-900">Tu carrito</h1>

      <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
        {items.map((item) => (
          <div key={item.productId} className="py-4 flex items-center gap-4">
            <div className="w-16 h-16 rounded-md bg-slate-100 overflow-hidden shrink-0">
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-800">{item.name}</p>
              <p className="text-sm text-slate-500">${item.price.toFixed(2)} c/u</p>
            </div>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
              className="w-16 rounded-md border border-slate-300 px-2 py-1 text-center"
            />
            <p className="w-20 text-right font-medium text-slate-800">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <button
              onClick={() => removeItem(item.productId)}
              className="text-slate-400 hover:text-red-600"
              aria-label="Eliminar"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end text-lg font-bold text-brand-900">
        Total: ${total.toFixed(2)}
      </div>

      <div className="mt-10 grid sm:grid-cols-2 gap-8">
        <div>
          <h2 className="font-semibold text-slate-800 mb-3">Tus datos</h2>
          <div className="space-y-3">
            <input
              name="name"
              placeholder="Nombre completo"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2"
            />
            <input
              name="email"
              type="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2"
            />
            <input
              name="phone"
              placeholder="Teléfono"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2"
            />
            <textarea
              name="address"
              placeholder="Dirección de entrega (opcional)"
              value={form.address}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2"
              rows={2}
            />
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-slate-800 mb-3">¿Cómo quieres finalizar tu pedido?</h2>
          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
          <div className="space-y-3">
            <button
              onClick={handleStripeCheckout}
              disabled={loading !== null}
              className="w-full px-5 py-3 rounded-md bg-brand-500 text-black font-semibold hover:bg-brand-400 transition-colors disabled:opacity-50"
            >
              {loading === "online" ? "Redirigiendo..." : "Pagar en línea (tarjeta)"}
            </button>
            <PaymentBadges />
            <button
              onClick={handleWhatsappOrder}
              disabled={loading !== null}
              className="w-full px-5 py-3 rounded-md bg-accent-600 text-white font-medium hover:bg-accent-700 transition-colors disabled:opacity-50"
            >
              {loading === "whatsapp" ? "Enviando..." : "Pedir por WhatsApp"}
            </button>
            <p className="text-xs text-slate-500">
              Con WhatsApp, tu pedido se registra y se abre una conversación para coordinar el
              pago y la entrega directamente con nosotros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
