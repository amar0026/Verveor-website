import { useState, useEffect, useRef, type RefObject } from "react";

interface Plan {
  name: string;
  price: string;
  period?: string;
  subtitle: string;
  features: string[];
  cta: string;
  highlight: boolean;
  badge?: string;
  ctaStyle: "filled" | "border";
}

const plans: Plan[] = [
  {
    name: "Basic",
    price: "Free",
    subtitle: "Perfect for occasional parkers.",
    features: ["Find parking spots", "Standard search filters", "Basic support"],
    cta: "Get Started",
    highlight: false,
    ctaStyle: "border",
  },
  {
    name: "Premium",
    price: "$9",
    period: "/month",
    subtitle: "For frequent and smart parkers.",
    features: [
      "Everything in Basic",
      "Live navigation",
      "Advance filters",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlight: true,
    badge: "MOST POPULAR",
    ctaStyle: "filled",
  },
  {
    name: "Business",
    price: "Custom",
    subtitle: "For businesses and fleets.",
    features: [
      "Everything in Premium",
      "Team dashboard",
      "Billing & invoices",
      "Account manager",
    ],
    cta: "Contact Sales",
    highlight: false,
    ctaStyle: "border",
  },
];

function useInView(threshold = 0.15): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#FF6B2B" fillOpacity="0.12" />
      <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#FF6B2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface PricingCardProps {
  plan: Plan;
  index: number;
  inView: boolean;
}

function PricingCard({ plan, index, inView }: PricingCardProps) {
  const delay = `${index * 120}ms`;
  return (
    <div
      className={`
        relative flex flex-col rounded-2xl transition-all duration-700
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        ${plan.highlight
          ? "bg-white ring-2 ring-orange-500 shadow-2xl shadow-orange-100 scale-[1.04] z-10"
          : "bg-white ring-1 ring-gray-200 shadow-md"
        }
      `}
      style={{ transitionDelay: delay }}
    >
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-orange-500 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase shadow">
            {plan.badge}
          </span>
        </div>
      )}

      <div className="p-6 pb-4 text-center border-b border-gray-100">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
          {plan.name}
        </p>
        <div className="flex items-end justify-center gap-0.5 mb-1">
          <span className="text-4xl font-extrabold text-gray-900 leading-none">{plan.price}</span>
          {plan.period && (
            <span className="text-sm text-gray-400 mb-1 font-medium">{plan.period}</span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">{plan.subtitle}</p>
      </div>

      <ul className="flex flex-col gap-2.5 p-6 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
            <CheckIcon />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="px-6 pb-6">
        <button
          className={`
            w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
            active:scale-95
            ${plan.ctaStyle === "filled"
              ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-200"
              : "border-2 border-gray-300 text-gray-700 hover:border-orange-400 hover:text-orange-500"
            }
          `}
        >
          {plan.cta}
        </button>
      </div>
    </div>
  );
}

function FloatingPhone() {
  return (
    <div className="relative w-32 h-56 flex-shrink-0 select-none animate-float">
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[2rem] bg-white/20 border-2 border-white/40 backdrop-blur-sm shadow-2xl overflow-hidden">
        {/* Screen mockup */}
        <div className="absolute inset-1 rounded-[1.6rem] bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden">
          {/* Map placeholder */}
          <div className="absolute inset-0 bg-[#1e293b]">
            {/* Streets */}
            <svg viewBox="0 0 128 220" className="w-full h-full opacity-50">
              <line x1="20" y1="0" x2="20" y2="220" stroke="#334155" strokeWidth="6" />
              <line x1="60" y1="0" x2="60" y2="220" stroke="#334155" strokeWidth="4" />
              <line x1="100" y1="0" x2="100" y2="220" stroke="#334155" strokeWidth="6" />
              <line x1="0" y1="50" x2="128" y2="50" stroke="#334155" strokeWidth="6" />
              <line x1="0" y1="110" x2="128" y2="110" stroke="#334155" strokeWidth="4" />
              <line x1="0" y1="170" x2="128" y2="170" stroke="#334155" strokeWidth="6" />
              {/* Blocks */}
              <rect x="24" y="54" width="32" height="52" fill="#0f172a" rx="2" />
              <rect x="64" y="54" width="32" height="52" fill="#0f172a" rx="2" />
              <rect x="24" y="114" width="32" height="52" fill="#0f172a" rx="2" />
              <rect x="64" y="114" width="32" height="52" fill="#0f172a" rx="2" />
            </svg>
            {/* Pin */}
            <div className="absolute top-[38%] left-[44%] animate-pulse-soft">
              <div className="w-5 h-5 bg-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <div className="w-1 h-2 bg-orange-500 mx-auto" />
            </div>
          </div>
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 h-7 bg-slate-900/80 flex items-center px-2">
            <div className="w-12 h-1.5 bg-white/10 rounded-full" />
          </div>
          {/* Bottom card */}
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-white/95 rounded-t-xl px-2 pt-2">
            <div className="text-[7px] font-bold text-orange-500 leading-none">P Parking Spot</div>
            <div className="text-[6px] text-gray-500 mt-0.5">2 min away • Free</div>
            <div className="mt-1 bg-orange-500 text-white text-[6px] font-bold py-0.5 px-2 rounded-full w-fit">
              Navigate
            </div>
          </div>
        </div>
      </div>
      {/* Glow */}
      <div className="absolute -inset-3 bg-orange-400/20 rounded-[3rem] blur-2xl -z-10" />
    </div>
  );
}

export default function PricingSection() {
  const [cardsRef, cardsInView] = useInView(0.1);
  const [bannerRef, bannerInView] = useInView(0.15);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-14px) rotate(2deg); }
        }
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.18); }
        }
        .animate-float { animation: float 3.8s ease-in-out infinite; }
        .animate-pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }
      `}</style>

      {/* Header */}
      <div className="text-center pt-14 pb-4 px-4">
        <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">
          Simple &amp; Transparent Pricing
        </p>
        <h2 className="text-3xl font-extrabold text-gray-900">
          Choose your plan
        </h2>
      </div>

      {/* Cards */}
      <div
        ref={cardsRef}
        className="max-w-4xl mx-auto px-4 pb-12 grid grid-cols-1 sm:grid-cols-3 gap-5 items-center mt-6"
      >
        {plans.map((plan, i) => (
          <PricingCard key={plan.name} plan={plan} index={i} inView={cardsInView} />
        ))}
      </div>

      {/* CTA Banner */}
      <div
        ref={bannerRef}
        className={`
          mx-4 mb-10 rounded-3xl overflow-hidden transition-all duration-700
          ${bannerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
        style={{ background: "linear-gradient(135deg, #FF6B2B 0%, #FF9A5C 60%, #FFB347 100%)" }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-8 gap-6 max-w-4xl mx-auto">
          {/* Left text */}
          <div className="flex-1">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
              Ready to Park Smarter?
            </h3>
            <p className="text-orange-100 text-sm max-w-xs">
              Download the Verveor app and find your perfect parking spot today!
            </p>
          </div>

          {/* Phone */}
          <div className="flex-shrink-0 flex items-center justify-center px-4">
            <FloatingPhone />
          </div>

          {/* Store buttons */}
          <div className="flex flex-col gap-3 flex-shrink-0">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 bg-black text-white px-4 py-2.5 rounded-xl hover:bg-gray-900 transition-colors shadow-lg min-w-[148px]"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div>
                <div className="text-[9px] text-gray-300 leading-none">Download on the</div>
                <div className="text-sm font-bold leading-tight">App Store</div>
              </div>
            </a>

            <a
              href="https://play.google.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 bg-black text-white px-4 py-2.5 rounded-xl hover:bg-gray-900 transition-colors shadow-lg min-w-[148px]"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
                <path d="M3.18 23.76c.33.18.7.22 1.06.13l12.04-6.96-2.56-2.56-10.54 9.39z" fill="#EA4335"/>
                <path d="M21.37 10.24l-2.8-1.62-2.87 2.55 2.87 2.87 2.82-1.63c.8-.46.8-1.71-.02-2.17z" fill="#FBBC04"/>
                <path d="M4.24.24C3.88.15 3.51.19 3.18.37L13.72 10.9l2.56-2.56L4.24.24z" fill="#4285F4"/>
                <path d="M3.18.37c-.47.27-.76.77-.76 1.4v20.46c0 .63.29 1.13.76 1.4L13.72 13l-10.54-12.63z" fill="#34A853"/>
              </svg>
              <div>
                <div className="text-[9px] text-gray-300 leading-none">GET IT ON</div>
                <div className="text-sm font-bold leading-tight">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}