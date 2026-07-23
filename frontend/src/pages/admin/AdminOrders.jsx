import { useEffect, useState } from "react";
import { api } from "../../api/client";

const statusLabels = {
  pending: "Pendiente",
  paid: "Pagado",
  contacted: "Contactado",
  cancelled: "Cancelado",
};

const statusColors = {
  pending: "text-amber-600",
  paid: "text-emerald-600",
  contacted: "text-sky-600",
  cancelled: "text-slate-400",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function load() {
    setLoading(true);
    api
      .get("/orders")
      .then(({ data }) => setOrders(data))
      .catch(() => setError("No se pudieron cargar los pedidos."))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function updateStatus(id, status) {
    try {
      await api.patch(`/orders/${id}/status`, { status });
      load();
    } catch {
      setError("No se pudo actualizar el estado.");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Pedidos</h1>
      {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
      {loading ? (
        <p className="mt-8 text-slate-500">Cargando...</p>
      ) : orders.length === 0 ? (
        <p className="mt-8 text-slate-500">Aún no hay pedidos.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="flex flex-wrap justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-800">{order.customerName}</p>
                  <p className="text-sm text-slate-500">
                    {order.customerEmail} · {order.customerPhone}
                  </p>
                  {order.customerAddress && (
                    <p className="text-sm text-slate-500">{order.customerAddress}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-800">${order.total.toFixed(2)}</p>
                  <p className="text-xs uppercase text-slate-400">
                    {order.channel === "whatsapp" ? "WhatsApp" : "Pago en línea"}
                  </p>
                </div>
              </div>

              <ul className="mt-3 text-sm text-slate-600 space-y-1">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.quantity} x {item.product.name} (${item.unitPrice.toFixed(2)} c/u)
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex items-center gap-3">
                <span className={`text-sm font-medium ${statusColors[order.status]}`}>
                  {statusLabels[order.status]}
                </span>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="text-sm rounded-md border border-slate-300 px-2 py-1"
                >
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <span className="text-xs text-slate-400 ml-auto">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
