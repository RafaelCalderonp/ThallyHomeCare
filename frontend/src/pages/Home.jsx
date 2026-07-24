import { Link } from "react-router-dom";

const services = [
  {
    title: "Perfumería y fragancias",
    desc: "Perfumes y colonias seleccionados para realzar tu esencia en cada ocasión.",
    icon: "🌸",
  },
  {
    title: "Maquillaje y color",
    desc: "Labiales, bases y productos de color para lucir radiante todos los días.",
    icon: "💄",
  },
  {
    title: "Cuidado de la piel",
    desc: "Cremas, sérums y aceites para nutrir e hidratar tu piel en casa.",
    icon: "✨",
  },
];

export default function Home() {
  return (
    <div>
      <section className="bg-black">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 grid sm:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand-300 leading-tight">
              Belleza y cuidado, con la calidez de tu hogar
            </h1>
            <p className="mt-4 text-lg text-neutral-300">
              En Thally Home &amp; Care Cosmetic encontrarás perfumería, maquillaje y productos
              de cuidado personal para realzar tu belleza todos los días.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/catalogo"
                className="px-5 py-3 rounded-md bg-gradient-to-r from-brand-500 to-brand-600 text-black font-semibold hover:from-brand-400 hover:to-brand-500 transition-colors"
              >
                Ver catálogo
              </Link>
              <Link
                to="/contacto"
                className="px-5 py-3 rounded-md border border-accent-400 text-accent-300 font-medium hover:bg-accent-900/30 transition-colors"
              >
                Contáctanos
              </Link>
            </div>
          </div>
          <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-lg ring-1 ring-brand-800">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000"
              alt="Productos de cosmética Thally"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-brand-700 text-center">
          ¿Qué ofrecemos?
        </h2>
        <div className="mt-8 grid sm:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="p-6 rounded-xl border border-brand-100 bg-white">
              <span className="text-3xl">{s.icon}</span>
              <h3 className="mt-3 font-semibold text-slate-800">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-accent-600 to-accent-700">
        <div className="max-w-6xl mx-auto px-4 py-14 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            ¿Lista para consentirte?
          </h2>
          <p className="mt-2 text-accent-100">
            Explora nuestro catálogo y realiza tu pedido en línea o por WhatsApp.
          </p>
          <Link
            to="/catalogo"
            className="mt-6 inline-block px-6 py-3 rounded-md bg-black text-brand-300 font-semibold hover:bg-neutral-900 transition-colors"
          >
            Ir al catálogo
          </Link>
        </div>
      </section>
    </div>
  );
}
