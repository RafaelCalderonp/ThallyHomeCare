export default function Contact() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hola, quisiera más información sobre sus productos."
  )}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-brand-900">Contáctanos</h1>
      <p className="mt-4 text-slate-600">
        Escríbenos por WhatsApp o correo y con gusto te ayudaremos a elegir el producto ideal.
      </p>
      <div className="mt-8 grid sm:grid-cols-2 gap-6">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <span className="text-3xl">💬</span>
          <div>
            <h3 className="font-semibold text-slate-800">WhatsApp</h3>
            <p className="text-sm text-slate-500">+{whatsappNumber}</p>
          </div>
        </a>
        <a
          href="mailto:contacto@thallyhomecare.com"
          className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <span className="text-3xl">✉️</span>
          <div>
            <h3 className="font-semibold text-slate-800">Correo</h3>
            <p className="text-sm text-slate-500">contacto@thallyhomecare.com</p>
          </div>
        </a>
      </div>
    </div>
  );
}
