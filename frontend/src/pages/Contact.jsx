import { WhatsAppButton, InstagramButton } from "../components/SocialButtons";

export default function Contact() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  const instagramHandle = "thally_cosmetic";

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="font-display text-3xl font-bold text-brand-700">Contáctanos</h1>
      <p className="mt-4 text-slate-600">
        Escríbenos por WhatsApp o síguenos en Instagram y con gusto te ayudaremos a elegir el
        producto ideal.
      </p>
      <div className="mt-8 flex items-center justify-center gap-6">
        <WhatsAppButton number={whatsappNumber} size="w-16 h-16" iconSize="w-7 h-7" />
        <InstagramButton handle={instagramHandle} size="w-16 h-16" iconSize="w-7 h-7" />
      </div>
    </div>
  );
}
