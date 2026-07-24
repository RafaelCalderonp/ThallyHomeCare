import { Link } from "react-router-dom";

export default function Footer() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  const instagramHandle = "thally_cosmetic";

  return (
    <footer className="bg-black text-neutral-300 mt-16 border-t border-brand-900">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <h3 className="font-display text-brand-300 font-semibold mb-2 text-lg">
            Thally <span className="text-accent-400">Cosmetic</span>
          </h3>
          <p className="text-sm text-neutral-400">
            Perfumería, maquillaje y cuidado personal para realzar tu belleza, con la calidez y
            confianza que mereces.
          </p>
        </div>
        <div>
          <h4 className="text-brand-300 font-semibold mb-2">Enlaces</h4>
          <ul className="text-sm space-y-1">
            <li>
              <Link to="/catalogo" className="hover:text-brand-300">
                Catálogo
              </Link>
            </li>
            <li>
              <Link to="/nosotros" className="hover:text-brand-300">
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="hover:text-brand-300">
                Contacto
              </Link>
            </li>
            <li>
              <Link to="/admin/login" className="hover:text-brand-300">
                Acceso administrador
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-brand-300 font-semibold mb-2">Contacto</h4>
          <p className="text-sm">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent-400"
            >
              WhatsApp: +{whatsappNumber}
            </a>
          </p>
          <p className="text-sm">
            <a
              href={`https://instagram.com/${instagramHandle}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent-400"
            >
              Instagram: @{instagramHandle}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-neutral-800 text-center text-xs text-neutral-500 py-4">
        © {new Date().getFullYear()} Thally Home & Care Cosmetic. Todos los derechos reservados.
      </div>
    </footer>
  );
}
