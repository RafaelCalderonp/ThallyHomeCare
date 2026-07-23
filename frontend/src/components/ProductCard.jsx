import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <Link to={`/producto/${product.id}`} className="block aspect-4/3 bg-slate-100 overflow-hidden">
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </Link>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="text-xs uppercase tracking-wide text-brand-600 font-medium">
          {product.category}
        </span>
        <Link to={`/producto/${product.id}`} className="font-semibold text-slate-800 hover:text-brand-700">
          {product.name}
        </Link>
        <p className="text-sm text-slate-500 line-clamp-2 flex-1">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-brand-800">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addItem(product, 1)}
            className="px-3 py-1.5 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
