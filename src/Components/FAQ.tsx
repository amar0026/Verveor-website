import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How do I book a parking spot?",
    a: "Simply enter your destination, select your preferred parking location, choose the date and time, and complete the booking through our website or mobile app.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept major credit and debit cards, UPI, net banking, and popular digital wallets for secure and convenient payments.",
  },
  {
    q: "Can I cancel or modify my booking?",
    a: "Yes, you can cancel or modify your booking through your account dashboard. Cancellation and modification policies may vary depending on the parking provider.",
  },
  {
    q: "Is my payment information secure?",
    a: "Absolutely. We use industry-standard encryption and secure payment gateways to ensure that your personal and payment information remains protected at all times.",
  },
  {
    q: "How do I get directions to my parking spot?",
    a: "After booking, you will receive turn-by-turn navigation directly in the app to guide you to your reserved parking spot with ease.",
  },
  {
    q: "Can I book parking in advance?",
    a: "Yes! You can book parking spots days or even weeks in advance to ensure availability, especially in busy areas.",
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function FAQ() {
  const { ref, inView } = useInView();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [animatingIdx, setAnimatingIdx] = useState<number | null>(null);

  const toggle = (i: number) => {
    setAnimatingIdx(i);
    setTimeout(() => setAnimatingIdx(null), 400);
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 overflow-hidden">
      <div ref={ref} className="max-w-2xl mx-auto">

        {/* Header — fade down */}
        <div
          className={`text-center mb-10 transition-all duration-700 ease-out
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">FAQs</h2>
          <p className="text-gray-400 text-sm">Still have questions? We've got answers.</p>
        </div>

        {/* Accordion wrapper — scale in */}
        <div
          className={`border border-gray-200 rounded-2xl overflow-hidden transition-all duration-700 ease-out delay-200
            ${inView ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"}`}
        >
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            const isLast = i === faqs.length - 1;
            const isAnimating = animatingIdx === i;

            return (
              <div
                key={i}
                style={{ transitionDelay: `${i * 60}ms` }}
                className={`${!isLast ? "border-b border-gray-200" : ""}
                  transition-all duration-500 ease-out
                  ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className={`w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer group
                    transition-colors duration-200
                    ${isOpen ? "bg-orange-50/60" : "hover:bg-gray-50"}`}
                >
                  <span
                    className={`text-sm font-semibold leading-snug transition-colors duration-200
                      ${isOpen ? "text-orange-500" : "text-gray-800 group-hover:text-orange-400"}`}
                  >
                    {faq.q}
                  </span>

                  {/* Animated +/- icon */}
                  <span
                    className={`flex-shrink-0 ml-4 w-7 h-7 rounded-full flex items-center justify-center
                      transition-all duration-300 ease-out
                      ${isOpen
                        ? "bg-orange-500 text-white rotate-180 scale-110"
                        : "bg-gray-100 text-gray-500 rotate-0 scale-100 group-hover:bg-orange-100 group-hover:text-orange-500"
                      }
                      ${isAnimating ? "scale-125" : ""}`}
                  >
                    {isOpen
                      ? <Minus className="w-3.5 h-3.5" />
                      : <Plus className="w-3.5 h-3.5" />
                    }
                  </span>
                </button>

                {/* Answer — smooth height expand with fade */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out
                    ${isOpen ? "max-h-56 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div
                    className={`px-5 pb-5 pt-1 transition-all duration-400 ease-out
                      ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
                  >
                    <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      

      </div>

      <style>{`
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(249,115,22,0.4); }
          70% { box-shadow: 0 0 0 8px rgba(249,115,22,0); }
          100% { box-shadow: 0 0 0 0 rgba(249,115,22,0); }
        }
      `}</style>
    </section>
  );
}