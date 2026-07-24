import { useEffect, useMemo, useRef, useState } from "react";
import { api } from "../api/client";
import ProductCard from "../components/ProductCard";
import ProductCarousel from "../components/ProductCarousel";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("Todas");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    api
      .get("/products")
      .then(({ data }) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setError("No se pudo cargar el catálogo. Intenta de nuevo más tarde.");
        }
      })
      .catch(() => setError("No se pudo cargar el catálogo. Intenta de nuevo más tarde."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ["Todas", ...unique];
  }, [products]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = category === "Todas" || p.category === category;
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [products, category, search]);

  const featured = useMemo(() => products.slice(0, 5), [products]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-brand-700">Catálogo de productos</h1>
      <p className="mt-2 text-slate-600">
        Perfumería, maquillaje y cuidado personal, listo para pedir en línea o por WhatsApp.
      </p>

      {loading && <p className="mt-10 text-slate-500">Cargando productos...</p>}
      {error && <p className="mt-10 text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          {featured.length > 0 && (
            <div className="mt-8">
              <ProductCarousel products={featured} />
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-md border border-slate-200 bg-white text-slate-700 hover:border-brand-300 transition-colors"
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                <span className="text-lg leading-none">☰</span>
                <span className="text-sm font-medium">
                  {category === "Todas" ? "Categorías" : category}
                </span>
              </button>
              {menuOpen && (
                <div className="absolute z-20 mt-2 w-56 rounded-lg border border-slate-200 bg-white shadow-lg py-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCategory(c);
                        setMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        category === c
                          ? "bg-brand-50 text-brand-700 font-medium"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative flex-1 min-w-[200px]">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full rounded-md border border-slate-200 px-4 py-2 pl-9 focus:outline-none focus:ring-2 focus:ring-brand-300"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {filtered.length === 0 && (
              <p className="text-slate-500 col-span-full">
                No hay productos que coincidan con tu búsqueda.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
