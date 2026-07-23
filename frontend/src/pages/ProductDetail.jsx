import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/client";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch(() => setError("Producto no encontrado."));
  }, [id]);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-600">{error}</p>
        <Link to="/catalogo" className="text-brand-600 font-medium">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  if (!product) {
    return <div className="max-w-4xl mx-auto px-4 py-16 text-slate-500">Cargando...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 grid sm:grid-cols-2 gap-10">
      <div className="aspect-square rounded-xl overflow-hidden bg-slate-100">
        {product.imageUrl && (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        )}
      </div>
      <div>
        <span className="text-xs uppercase tracking-wide text-brand-600 font-medium">
          {product.category}
        </span>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">{product.name}</h1>
        <p className="mt-4 text-slate-600">{product.description}</p>
        <p className="mt-6 text-3xl font-bold text-brand-800">${product.price.toFixed(2)}</p>
        <p className="mt-1 text-sm text-slate-500">
          {product.stock > 0 ? `${product.stock} disponibles` : "Agotado temporalmente"}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-20 rounded-md border border-slate-300 px-3 py-2"
          />
          <button
            onClick={() => {
              addItem(product, quantity);
              setAdded(true);
              setTimeout(() => setAdded(false), 2000);
            }}
            disabled={product.stock <= 0}
            className="px-5 py-2.5 rounded-md bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors disabled:opacity-50"
          >
            Agregar al carrito
          </button>
        </div>
        {added && <p className="mt-2 text-sm text-brand-700">Agregado al carrito ✓</p>}

        <Link to="/carrito" className="block mt-6 text-brand-600 font-medium">
          Ir al carrito →
        </Link>
      </div>
    </div>
  );
}
