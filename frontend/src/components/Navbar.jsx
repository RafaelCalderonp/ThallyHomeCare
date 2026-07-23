import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? "bg-brand-100 text-brand-800" : "text-slate-600 hover:text-brand-700"
  }`;

export default function Navbar() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold">
            T
          </span>
          <span className="font-semibold text-lg text-brand-900">Thally HomeCare</span>
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
          className="relative flex items-center gap-2 px-3 py-2 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
        >
          Carrito
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
