import { useEffect, useRef, useState } from "react";

const BG_IMAGE =
  "https://res.cloudinary.com/dquki4xol/image/upload/v1781851222/ChatGPT_Image_Jun_15_2026_01_17_32_PM_bpg61i.png";

const PHONE_IMAGE =
  "https://res.cloudinary.com/dquki4xol/image/upload/v1781851222/ChatGPT_Image_Jun_15_2026_01_24_18_PM_fisksu.png";

const AVATARS = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/75.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
];

// Hook: triggers animation when element enters viewport
function useInView(threshold = 0.15) {
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

export default function Hero() {
  const { ref, inView } = useInView();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // slight delay so CSS transitions fire after mount
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const base = "transition-all duration-700 ease-out";
  const hidden = "opacity-0 translate-y-8";
  const visible = "opacity-100 translate-y-0";

  return (
    <section className="relative w-full min-h-screen pt-24 bg-[#0d1b2a] overflow-hidden">

      {/* Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${base} duration-1000 ${mounted ? "opacity-55" : "opacity-0"}`}
        style={{ backgroundImage: `url('${BG_IMAGE}')` }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b2a] via-[#0d1b2ab3] to-transparent" />

      {/* Floating glow orb */}
      <div
        className={`absolute top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none ${base} duration-1000 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
      />

      {/* Main Content */}
      <div ref={ref} className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 pb-36">

          {/* Left — Text */}
          <div className="flex-1 max-w-xl flex flex-col gap-0">

            {/* Badge — delay 0 */}
            <div className={`${base} delay-[0ms] ${inView ? visible : hidden} mb-6`}>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-medium px-4 py-1.5 rounded-full">
                <span className="text-orange-500 animate-pulse">★</span>
                #1 Smart Parking App
              </div>
            </div>

            {/* Headline — delay 150ms */}
            <h1 className={`${base} delay-[150ms] ${inView ? visible : hidden} text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.15] mb-4`}>
              Smarter Parking.<br />
              Better{" "}
              <span className="text-orange-500 relative inline-block">
                Everyday.
                {/* underline draw animation */}
                <span
                  className={`absolute -bottom-1 left-0 h-[3px] bg-orange-500 rounded-full transition-all duration-700 delay-500 ${inView ? "w-full" : "w-0"}`}
                />
              </span>
            </h1>

            {/* Subtext — delay 300ms */}
            <p className={`${base} delay-[300ms] ${inView ? visible : hidden} text-white/65 text-sm md:text-base mb-8 leading-relaxed`}>
              Find, reserve, and manage parking spaces{" "}
              <br className="hidden md:block" />
              in seconds with Vervoer
            </p>

            {/* Buttons — delay 450ms */}
            <div className={`${base} delay-[450ms] ${inView ? visible : hidden} flex flex-wrap items-center gap-4 mb-8`}>
              <button className="group flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 cursor-pointer shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50">
                Download for Free
                <span className="bg-white text-orange-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </button>
              <button className="group flex items-center gap-2 border border-white/35 hover:border-white active:scale-95 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 cursor-pointer hover:bg-white/5">
                Watch Demo
                <span className="border border-white/35 rounded-full w-6 h-6 flex items-center justify-center text-[10px] group-hover:scale-110 transition-transform duration-200">
                  ▶
                </span>
              </button>
            </div>

            {/* Trusted Users — delay 600ms */}
            <div className={`${base} delay-[600ms] ${inView ? visible : hidden} flex items-center gap-3`}>
              <div className="flex -space-x-2.5">
                {AVATARS.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Driver ${i + 1}`}
                    style={{ transitionDelay: `${700 + i * 80}ms` }}
                    className={`w-9 h-9 rounded-full border-2 border-[#0d1b2a] object-cover transition-all duration-500 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                  />
                ))}
              </div>
              <p className="text-white/65 text-sm">
                Trusted by Over{" "}
                <span className="text-white font-semibold">50,000+</span> drivers
              </p>
            </div>
          </div>

          {/* Right — Phone Mockup with float animation */}
          <div
            className={`hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-1000 delay-300 ease-out ${inView ? "opacity-100 translate-y-[-50%] scale-100" : "opacity-0 translate-y-[-40%] scale-95"}`}
          >
            <img
              src={PHONE_IMAGE}
              alt="Vervoer App"
              className="w-56 lg:w-60 xl:w-80 drop-shadow-2xl object-contain translate-x-35 animate-float"
            />
          </div>

        </div>
      </div>

      {/* Floating keyframe via style tag */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(8.75rem); }
          50%       { transform: translateY(-14px) translateX(8.75rem); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

    </section>
  );
}