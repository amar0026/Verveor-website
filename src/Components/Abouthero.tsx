import { useEffect, useRef, useState } from "react";

const PARKING_IMAGE =
  "https://res.cloudinary.com/dquki4xol/image/upload/v1781953396/ChatGPT_Image_Jun_17_2026_01_50_10_PM_1_y0nu6l.png";

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

export default function AboutHero() {
  const { ref, inView } = useInView();
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 overflow-hidden">
      <div ref={ref} className="max-w-3xl mx-auto">

        {/* Badge — bounces down */}
        <div
          className={`flex justify-center mt-5  mb-5 transition-all duration-600 ease-out
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
        >
          <span className="border border-orange-400 text-orange-500 text-xs font-semibold px-4 py-1.5 rounded-full animate-badge-pulse">
            About Us
          </span>
        </div>

        {/* Heading — words slide up one by one */}
        <div
          className={`text-center mb-4 transition-all duration-700 ease-out delay-150
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            <span
              className={`inline-block transition-all duration-500 ease-out delay-[200ms]
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              Building the Future
            </span>
            <br />
            <span
              className={`inline-block transition-all duration-500 ease-out delay-[350ms]
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              of{" "}
              <span className="text-orange-500 relative inline-block">
                Smart
                {/* underline draw */}
                <span
                  className={`absolute -bottom-1 left-0 h-[3px] bg-orange-400 rounded-full transition-all duration-700 delay-[700ms]
                    ${inView ? "w-full" : "w-0"}`}
                />
              </span>{" "}
              Parking
            </span>
          </h1>
        </div>

        {/* Subtext — fade up */}
        <div
          className={`text-center mb-10 transition-all duration-600 ease-out delay-[500ms]
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
            Verveor is on a mission to make parking simple, convenient and stress-free for everyone
          </p>
        </div>

        {/* Image — scale reveal with shine sweep */}
        <div
          className={`relative w-full rounded-2xl overflow-hidden shadow-xl transition-all duration-900 ease-out delay-[600ms]
            ${inView ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-10"}`}
        >
          <img
            src={PARKING_IMAGE}
            alt="Smart Parking"
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-56 md:h-72 lg:h-80 object-cover transition-all duration-700
              ${imgLoaded ? "blur-0 scale-100" : "blur-sm scale-105"}`}
          />

          {/* Shine sweep on load */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
              transition-all duration-700 ease-in-out
              ${inView && imgLoaded ? "translate-x-full opacity-0" : "-translate-x-full opacity-100"}`}
            style={{ transitionDelay: "800ms" }}
          />

          {/* Subtle dark overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

      </div>

      <style>{`
        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.35); }
          50%       { box-shadow: 0 0 0 6px rgba(249,115,22,0); }
        }
        .animate-badge-pulse {
          animation: badge-pulse 2.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}