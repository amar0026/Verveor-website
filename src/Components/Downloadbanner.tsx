import { useEffect, useRef, useState } from "react";

const BG_IMAGE =
  "https://res.cloudinary.com/dquki4xol/image/upload/v1781851222/ChatGPT_Image_Jun_15_2026_01_17_32_PM_bpg61i.png";
// ↑ Replace with your actual dark city background image

const PHONE_IMAGE =
  "https://res.cloudinary.com/dquki4xol/image/upload/v1781851222/ChatGPT_Image_Jun_15_2026_01_24_18_PM_fisksu.png";
// ↑ Replace with your actual phone mockup image

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

export default function DownloadBanner() {
  const { ref, inView } = useInView();

  return (
    <section className="relative w-full overflow-hidden rounded-none">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${BG_IMAGE}')` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0d1b2a]/80" />

      {/* Content */}
      <div
        ref={ref}
        className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8"
      >

        {/* Left — Text + Buttons */}
        <div
          className={`flex flex-col gap-5 max-w-sm transition-all duration-700 ease-out
            ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-2">
              Download the Verveor App
            </h2>
            <p className="text-white/60 text-sm">
              Book, Pay and Park — all in one app
            </p>
          </div>

          {/* Store Buttons */}
          <div className="flex flex-wrap gap-3">
            {/* Google Play */}
            <a
              href="#"
              className="flex items-center gap-3 bg-black border border-white/20 text-white rounded-xl px-4 py-2.5 hover:bg-white/10 active:scale-95 transition-all duration-200"
            >
              <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M3.18 23.76c.3.16.64.2.97.1l11.5-11.5L12 8.71 3.18 23.76z" fill="#EA4335"/>
                <path d="M20.93 10.4l-2.6-1.48-3.2 3.2 3.2 3.2 2.62-1.5c.75-.43.75-1.99-.02-2.42z" fill="#FBBC05"/>
                <path d="M3.18.24C2.86.08 2.5.07 2.18.24L14.07 12 3.18.24z" fill="#4285F4"/>
                <path d="M2.18.24C1.45.65 1 1.43 1 2.34v19.32c0 .9.45 1.69 1.18 2.1L14.07 12 2.18.24z" fill="#34A853"/>
              </svg>
              <div>
                <p className="text-[9px] text-gray-400 leading-none uppercase tracking-wide">Get it on</p>
                <p className="text-sm font-semibold leading-tight">Google Play</p>
              </div>
            </a>

            {/* App Store */}
            <a
              href="#"
              className="flex items-center gap-3 bg-black border border-white/20 text-white rounded-xl px-4 py-2.5 hover:bg-white/10 active:scale-95 transition-all duration-200"
            >
              <svg className="w-6 h-6 fill-white flex-shrink-0" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div>
                <p className="text-[9px] text-gray-400 leading-none uppercase tracking-wide">Download on the</p>
                <p className="text-sm font-semibold leading-tight">App Store</p>
              </div>
            </a>
          </div>
        </div>

        {/* Right — Phone Mockup */}
        <div
          className={`  mr-65 shrink-0 transition-all duration-800 ease-out delay-300
            ${inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}
        >
          <img
            src={PHONE_IMAGE}
            alt="Vervoer App"
            className="w-48 md:w-56 lg:w-64 object-contain drop-shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}