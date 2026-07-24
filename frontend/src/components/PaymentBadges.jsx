function VisaBadge() {
  return (
    <div className="h-6 px-2 rounded bg-white flex items-center justify-center shadow-sm">
      <span className="font-black italic text-[13px] tracking-tight text-[#1a1f71]">VISA</span>
    </div>
  );
}

function MastercardBadge() {
  return (
    <div className="h-6 w-9 rounded bg-white flex items-center justify-center shadow-sm">
      <div className="relative w-6 h-4">
        <div className="absolute left-0 w-4 h-4 rounded-full bg-[#eb001b]" />
        <div className="absolute right-0 w-4 h-4 rounded-full bg-[#f79e1b] mix-blend-multiply" />
      </div>
    </div>
  );
}

function AmexBadge() {
  return (
    <div className="h-6 px-2 rounded bg-[#2e77bc] flex items-center justify-center shadow-sm">
      <span className="font-bold text-[10px] tracking-tight text-white">AMEX</span>
    </div>
  );
}

export default function PaymentBadges() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <VisaBadge />
      <MastercardBadge />
      <AmexBadge />
      <span className="flex items-center gap-1 text-xs text-neutral-400 ml-1">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
        Pago seguro con Stripe
      </span>
    </div>
  );
}
