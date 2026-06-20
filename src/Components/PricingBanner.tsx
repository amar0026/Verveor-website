import { useEffect, useRef, useState } from "react";

const BG_IMAGE =
  "https://res.cloudinary.com/dquki4xol/image/upload/v1781962220/ChatGPT_Image_Jun_18_2026_03_58_03_PM_w5fmjr.png";
// ↑ Replace with your dark car/parking background image

function useInView(threshold = 0.2) {
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

export default function PricingBanner() {
  const { ref, inView } = useInView();

  return (
    <section className="w-full px-6 md:px-12 py-10">
      <div
        ref={ref}
        className={`relative max-w-5xl mx-auto rounded-2xl overflow-hidden
          transition-all duration-700 ease-out
          ${inView ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"}`}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${BG_IMAGE}')` }}
        />

        {/* Dark overlay — stronger on left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b2a]/90 via-[#0d1b2a]/70 to-[#0d1b2a]/30" />

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-8 md:px-12 py-10 gap-6">

          {/* Left — Text + Button */}
          <div
            className={`max-w-md transition-all duration-700 ease-out delay-200
              ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <h2 className="text-xl md:text-2xl font-extrabold text-white leading-snug mb-2">
              Still not sure which plan is right for you?
            </h2>
            <p className="text-white/60 text-sm mb-6">
              Our team is here to help you choose the best plan for your needs.
            </p>
            <button
              className="group flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95
                text-white font-semibold text-sm px-6 py-3 rounded-full
                transition-all duration-200 cursor-pointer shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
            >
              Contact Us
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>
          </div>

          {/* Right — car image naturally from bg, just spacer on desktop */}
          <div className="hidden md:block w-64 h-24" />
        </div>
      </div>
    </section>
  );
}