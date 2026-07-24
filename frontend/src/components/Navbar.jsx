import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? "text-brand-400" : "text-neutral-300 hover:text-brand-300"
  }`;

export default function Navbar() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur border-b border-brand-900">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          {/* TODO: reemplazar por <img src="/logo.png" alt="Thally Home & Care Cosmetic" className="h-10 w-auto" /> cuando se tenga el archivo del logo */}
          <span className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-300 to-brand-600 text-black flex items-center justify-center font-bold font-display">
            T
          </span>
          <span className="font-display font-semibold text-lg text-brand-300 tracking-wide">
            Thally <span className="text-accent-400">Cosmetic</span>
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            Inicio
          </NavLink>
          <NavLink to="/catalogo" className={linkClass}>
            Catálogo
          </NavLink>
          <NavLink to="/nosotros" className={linkClass}>
            Nosotros
          </NavLink>
          <NavLink to="/contacto" className={linkClass}>
            Contacto
          </NavLink>
        </nav>

        <Link
          to="/carrito"
          className="relative flex items-center gap-2 px-3 py-2 rounded-md bg-gradient-to-r from-brand-500 to-brand-600 text-black text-sm font-semibold hover:from-brand-400 hover:to-brand-500 transition-colors"
        >
          Carrito
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
