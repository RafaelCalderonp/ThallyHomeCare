export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-display text-3xl font-bold text-brand-700">
        Sobre Thally Home &amp; Care Cosmetic
      </h1>
      <p className="mt-4 text-slate-600">
        Thally Home &amp; Care Cosmetic nace con la misión de acercar perfumería, maquillaje y
        productos de cuidado personal de calidad a cada hogar. Creemos que consentirte y cuidar
        tu piel merece la misma dedicación y calidez que le das a tu familia.
      </p>
      <div className="mt-10 grid sm:grid-cols-3 gap-6">
        <div>
          <h3 className="font-semibold text-accent-600">Misión</h3>
          <p className="mt-1 text-sm text-slate-500">
            Facilitar el acceso a productos de belleza y cuidado personal de calidad, con
            atención cercana y de confianza.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-accent-600">Visión</h3>
          <p className="mt-1 text-sm text-slate-500">
            Ser la marca de referencia en cosmética y cuidado personal en la región, reconocida
            por su calidez y calidad.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-accent-600">Valores</h3>
          <p className="mt-1 text-sm text-slate-500">
            Empatía, calidad, honestidad y compromiso con el bienestar de cada cliente.
          </p>
        </div>
      </div>
    </div>
  );
}
