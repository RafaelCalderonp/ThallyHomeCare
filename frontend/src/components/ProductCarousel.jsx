import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCarousel({ products }) {
  const [index, setIndex] = useState(0);
  const count = products.length;

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 4500);
    return () => clearInterval(timer);
  }, [count]);

  if (count === 0) return null;

  function prev() {
    setIndex((i) => (i - 1 + count) % count);
  }
  function next() {
    setIndex((i) => (i + 1) % count);
  }

  return (
    <div className="relative rounded-2xl overflow-hidden bg-black ring-1 ring-brand-900">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/producto/${product.id}`}
            className="relative w-full shrink-0 grid sm:grid-cols-2 items-center gap-6 px-6 py-8 sm:px-10 sm:py-12"
          >
            <div>
              <span className="text-xs uppercase tracking-wide text-accent-400 font-medium">
                {product.category}
              </span>
              <h3 className="font-display mt-1 text-2xl sm:text-3xl font-bold text-brand-200">
                {product.name}
              </h3>
              <p className="mt-2 text-neutral-300 text-sm line-clamp-2">{product.description}</p>
              <p className="mt-4 text-2xl font-bold text-brand-300">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <div className="aspect-4/3 rounded-xl overflow-hidden">
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </Link>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-brand-300 hover:bg-black/80 flex items-center justify-center"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Siguiente"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-brand-300 hover:bg-black/80 flex items-center justify-center"
          >
            ›
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Ir a la diapositiva ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === index ? "bg-brand-400" : "bg-neutral-600"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
