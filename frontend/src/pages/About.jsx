export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-brand-900">Sobre Thally HomeCare</h1>
      <p className="mt-4 text-slate-600">
        Thally HomeCare nace con la misión de acercar equipo médico y productos de cuidado
        personal de calidad a las familias que atienden a sus seres queridos en casa. Creemos
        que el cuidado en el hogar merece el mismo nivel de confianza y profesionalismo que en
        cualquier centro de salud.
      </p>
      <div className="mt-10 grid sm:grid-cols-3 gap-6">
        <div>
          <h3 className="font-semibold text-brand-800">Misión</h3>
          <p className="mt-1 text-sm text-slate-500">
            Facilitar el acceso a productos de cuidado y equipo médico confiable para el hogar.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-brand-800">Visión</h3>
          <p className="mt-1 text-sm text-slate-500">
            Ser la referencia en cuidado domiciliario en la región, con atención cercana y humana.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-brand-800">Valores</h3>
          <p className="mt-1 text-sm text-slate-500">
            Empatía, calidad, honestidad y compromiso con el bienestar de cada familia.
          </p>
        </div>
      </div>
    </div>
  );
}
