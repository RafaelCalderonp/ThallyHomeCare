import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <h3 className="text-white font-semibold mb-2">Thally HomeCare</h3>
          <p className="text-sm text-brand-200">
            Cuidado y equipo médico para el hogar, con la calidez y confianza que tu familia
            merece.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Enlaces</h4>
          <ul className="text-sm space-y-1">
            <li>
              <Link to="/catalogo" className="hover:text-white">
                Catálogo
              </Link>
            </li>
            <li>
              <Link to="/nosotros" className="hover:text-white">
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="hover:text-white">
                Contacto
              </Link>
            </li>
            <li>
              <Link to="/admin/login" className="hover:text-white">
                Acceso administrador
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Contacto</h4>
          <p className="text-sm">WhatsApp: +{import.meta.env.VITE_WHATSAPP_NUMBER}</p>
          <p className="text-sm">Email: contacto@thallyhomecare.com</p>
        </div>
      </div>
      <div className="border-t border-brand-800 text-center text-xs text-brand-300 py-4">
        © {new Date().getFullYear()} Thally HomeCare. Todos los derechos reservados.
      </div>
    </footer>
  );
}
