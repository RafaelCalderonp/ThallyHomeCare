import { useEffect, useState } from "react";
import { api } from "../../api/client";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  category: "",
  stock: "",
  active: true,
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    api
      .get("/products/admin/all")
      .then(({ data }) => setProducts(data))
      .catch(() => setError("No se pudieron cargar los productos."))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  function startEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl || "",
      category: product.category,
      stock: product.stock,
      active: product.active,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, form);
      } else {
        await api.post("/products", form);
      }
      cancelEdit();
      load();
    } catch (err) {
      setError(err.response?.data?.error || "No se pudo guardar el producto.");
    }
  }

  async function handleDelete(id) {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      await api.delete(`/products/${id}`);
      load();
    } catch {
      setError("No se pudo eliminar el producto.");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Productos</h1>

      <form onSubmit={handleSubmit} className="mt-6 grid sm:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className="rounded-md border border-slate-300 px-3 py-2"
          required
        />
        <input
          name="category"
          placeholder="Categoría"
          value={form.category}
          onChange={handleChange}
          className="rounded-md border border-slate-300 px-3 py-2"
          required
        />
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          className="rounded-md border border-slate-300 px-3 py-2"
          required
        />
        <input
          name="stock"
          type="number"
          placeholder="Existencias"
          value={form.stock}
          onChange={handleChange}
          className="rounded-md border border-slate-300 px-3 py-2"
        />
        <input
          name="imageUrl"
          placeholder="URL de imagen"
          value={form.imageUrl}
          onChange={handleChange}
          className="rounded-md border border-slate-300 px-3 py-2 sm:col-span-2"
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          className="rounded-md border border-slate-300 px-3 py-2 sm:col-span-2"
          rows={2}
          required
        />
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
          Activo (visible en el catálogo)
        </label>

        {error && <p className="text-red-600 text-sm sm:col-span-2">{error}</p>}

        <div className="sm:col-span-2 flex gap-3">
          <button
            type="submit"
            className="px-5 py-2 rounded-md bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors"
          >
            {editingId ? "Guardar cambios" : "Crear producto"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-5 py-2 rounded-md border border-slate-300 text-slate-600"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="mt-8 text-slate-500">Cargando...</p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200">
                <th className="py-2 pr-4">Nombre</th>
                <th className="py-2 pr-4">Categoría</th>
                <th className="py-2 pr-4">Precio</th>
                <th className="py-2 pr-4">Stock</th>
                <th className="py-2 pr-4">Estado</th>
                <th className="py-2 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-slate-100">
                  <td className="py-2 pr-4">{p.name}</td>
                  <td className="py-2 pr-4">{p.category}</td>
                  <td className="py-2 pr-4">${p.price.toFixed(2)}</td>
                  <td className="py-2 pr-4">{p.stock}</td>
                  <td className="py-2 pr-4">
                    {p.active ? (
                      <span className="text-emerald-600">Activo</span>
                    ) : (
                      <span className="text-slate-400">Inactivo</span>
                    )}
                  </td>
                  <td className="py-2 pr-4 flex gap-2">
                    <button onClick={() => startEdit(p)} className="text-brand-600 hover:underline">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
