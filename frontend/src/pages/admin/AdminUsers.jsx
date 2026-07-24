import { useEffect, useState } from "react";
import { api } from "../../api/client";
import { useAuth } from "../../context/AuthContext";

export default function AdminUsers() {
  const { email: currentEmail } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);

  function load() {
    setLoading(true);
    api
      .get("/auth/users")
      .then(({ data }) => setUsers(Array.isArray(data) ? data : []))
      .catch(() => setError("No se pudieron cargar las cuentas."))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setCreating(true);
    try {
      await api.post("/auth/users", form);
      setForm({ email: "", password: "" });
      load();
    } catch (err) {
      setError(err.response?.data?.error || "No se pudo crear la cuenta.");
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(user) {
    if (!confirm(`¿Eliminar el acceso de ${user.email}?`)) return;
    try {
      await api.delete(`/auth/users/${user.id}`);
      load();
    } catch (err) {
      setError(err.response?.data?.error || "No se pudo eliminar la cuenta.");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Usuarios</h1>
      <p className="mt-1 text-sm text-slate-500">
        Cuentas con acceso completo al panel (productos y pedidos), por ejemplo para tu equipo de
        ventas.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-wrap gap-3 items-start bg-white p-4 rounded-xl border border-slate-200"
      >
        <input
          type="email"
          required
          placeholder="Correo"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-md border border-slate-300 px-3 py-2 flex-1 min-w-[200px]"
        />
        <input
          type="password"
          required
          minLength={8}
          placeholder="Contraseña (mín. 8 caracteres)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="rounded-md border border-slate-300 px-3 py-2 flex-1 min-w-[200px]"
        />
        <button
          type="submit"
          disabled={creating}
          className="px-5 py-2 rounded-md bg-brand-500 text-black font-semibold hover:bg-brand-400 transition-colors disabled:opacity-50"
        >
          {creating ? "Creando..." : "Agregar cuenta"}
        </button>
      </form>

      {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}

      {loading ? (
        <p className="mt-8 text-slate-500">Cargando...</p>
      ) : (
        <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
          {users.map((user) => (
            <div key={user.id} className="py-3 flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800">
                  {user.email}
                  {user.email === currentEmail && (
                    <span className="ml-2 text-xs text-brand-600 font-normal">(tú)</span>
                  )}
                </p>
                <p className="text-xs text-slate-400">
                  Creada el {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(user)}
                disabled={user.email === currentEmail}
                className="text-red-600 hover:underline disabled:opacity-30 disabled:no-underline disabled:cursor-not-allowed"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
