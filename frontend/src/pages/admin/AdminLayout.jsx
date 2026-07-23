import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const linkClass = ({ isActive }) =>
  `block px-4 py-2 rounded-md text-sm font-medium ${
    isActive ? "bg-brand-600 text-white" : "text-slate-600 hover:bg-brand-50"
  }`;

export default function AdminLayout() {
  const { email, logout } = useAuth();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid sm:grid-cols-[200px_1fr] gap-8">
      <aside>
        <p className="text-xs text-slate-400 mb-3 truncate">{email}</p>
        <nav className="space-y-1">
          <NavLink to="/admin/productos" className={linkClass}>
            Productos
          </NavLink>
          <NavLink to="/admin/pedidos" className={linkClass}>
            Pedidos
          </NavLink>
        </nav>
        <button
          onClick={logout}
          className="mt-6 w-full text-left px-4 py-2 rounded-md text-sm text-red-600 hover:bg-red-50"
        >
          Cerrar sesión
        </button>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
