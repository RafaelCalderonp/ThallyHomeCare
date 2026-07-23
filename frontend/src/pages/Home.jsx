import { Link } from "react-router-dom";

const services = [
  {
    title: "Equipo médico para el hogar",
    desc: "Camas eléctricas, sillas de ruedas, andaderas y más, listos para tu comodidad.",
    icon: "🛏️",
  },
  {
    title: "Cuidado y monitoreo",
    desc: "Oxímetros, tensiómetros y accesorios para dar seguimiento a la salud en casa.",
    icon: "💗",
  },
  {
    title: "Asesoría personalizada",
    desc: "Te ayudamos a elegir el producto ideal según la condición de tu familiar.",
    icon: "🤝",
  },
];

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 grid sm:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-brand-900 leading-tight">
              Cuidado profesional, en la comodidad de tu hogar
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              En Thally HomeCare ofrecemos equipo médico y productos de cuidado personal para que
              tu familia reciba la mejor atención sin salir de casa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/catalogo"
                className="px-5 py-3 rounded-md bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors"
              >
                Ver catálogo
              </Link>
              <Link
                to="/contacto"
                className="px-5 py-3 rounded-md border border-brand-300 text-brand-700 font-medium hover:bg-brand-50 transition-colors"
              >
                Contáctanos
              </Link>
            </div>
          </div>
          <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000"
              alt="Cuidado en el hogar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-brand-900 text-center">¿Qué ofrecemos?</h2>
        <div className="mt-8 grid sm:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="p-6 rounded-xl border border-slate-200 bg-white">
              <span className="text-3xl">{s.icon}</span>
              <h3 className="mt-3 font-semibold text-slate-800">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-600">
        <div className="max-w-6xl mx-auto px-4 py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            ¿Necesitas equipo para el cuidado de un ser querido?
          </h2>
          <p className="mt-2 text-brand-100">
            Explora nuestro catálogo y realiza tu pedido en línea o por WhatsApp.
          </p>
          <Link
            to="/catalogo"
            className="mt-6 inline-block px-6 py-3 rounded-md bg-white text-brand-700 font-semibold hover:bg-brand-50 transition-colors"
          >
            Ir al catálogo
          </Link>
        </div>
      </section>
    </div>
  );
}
