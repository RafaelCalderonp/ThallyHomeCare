import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCarousel({ products }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = products.length;

  useEffect(() => {
    if (count <= 1 || paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 5500);
    return () => clearInterval(timer);
  }, [count, paused]);

  if (count === 0) return null;

  function prev() {
    setIndex((i) => (i - 1 + count) % count);
  }
  function next() {
    setIndex((i) => (i + 1) % count);
  }

  return (
    <div
      className="relative h-[420px] sm:h-[480px] rounded-2xl overflow-hidden bg-black ring-1 ring-brand-900 shadow-xl shadow-black/40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {products.map((product, i) => (
        <div
          key={product.id}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {product.imageUrl && (
            <img
              src={product.imageUrl}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                i === index ? "scale-110" : "scale-100"
              }`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

          <Link
            to={`/producto/${product.id}`}
            className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-accent-300 font-medium">
              {product.category}
            </span>
            <h3 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-brand-100 max-w-lg">
              {product.name}
            </h3>
            <p className="mt-3 text-neutral-300 text-sm max-w-md hidden sm:block">
              {product.description}
            </p>
            <p className="mt-4 font-display text-2xl text-brand-300">
              ${product.price.toFixed(2)}
            </p>
          </Link>
        </div>
      ))}

      {count > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute z-20 left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-brand-300/40 bg-black/30 text-brand-200 backdrop-blur-sm hover:bg-black/60 hover:border-brand-300 transition-colors flex items-center justify-center"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Siguiente"
            className="absolute z-20 right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-brand-300/40 bg-black/30 text-brand-200 backdrop-blur-sm hover:bg-black/60 hover:border-brand-300 transition-colors flex items-center justify-center"
          >
            ›
          </button>
          <div className="absolute z-20 top-6 right-8 flex gap-2">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Ir a la diapositiva ${i + 1}`}
                className={`h-0.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-brand-300" : "w-4 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
