import { useEffect, useMemo, useState } from "react";
import { api } from "../api/client";
import ProductCard from "../components/ProductCard";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("Todas");

  useEffect(() => {
    api
      .get("/products")
      .then(({ data }) => setProducts(data))
      .catch(() => setError("No se pudo cargar el catálogo. Intenta de nuevo más tarde."))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ["Todas", ...unique];
  }, [products]);

  const filtered = useMemo(
    () => (category === "Todas" ? products : products.filter((p) => p.category === category)),
    [products, category]
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-brand-700">Catálogo de productos</h1>
      <p className="mt-2 text-slate-600">
        Perfumería, maquillaje y cuidado personal, listo para pedir en línea o por WhatsApp.
      </p>

      {!loading && !error && (
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                category === c
                  ? "bg-brand-500 text-black border-brand-500 font-medium"
                  : "bg-white text-slate-600 border-slate-200 hover:border-brand-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {loading && <p className="mt-10 text-slate-500">Cargando productos...</p>}
      {error && <p className="mt-10 text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filtered.length === 0 && (
            <p className="text-slate-500 col-span-full">No hay productos en esta categoría.</p>
          )}
        </div>
      )}
    </div>
  );
}
