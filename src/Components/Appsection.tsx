import { useEffect, useRef, useState } from "react";

const COMBINED_IMG =
"https://res.cloudinary.com/dquki4xol/image/upload/v1781873521/ChatGPT_Image_Jun_19__2026__06_11_55_PM-removebg-preview_ny6lsr.png"
const APP_FEATURES = [
  { title: "Search Nearby", desc: "Find parking spots around you." },
  { title: "Reserve Instantly", desc: "Book your favorite spot easily." },
  { title: "Secure Payments", desc: "Pay securely with your preferred method." },
  { title: "Booking History", desc: "Manage your bookings in one place." },
];

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

export default function AppSection() {
  const { ref, inView } = useInView();

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12">
      <div ref={ref} className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">

        {/* Left — Text + Store Buttons */}
        <div
          className={`flex-shrink-0 w-full lg:w-64 flex flex-col gap-5
            transition-all duration-700 ease-out
            ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest">
            The App
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
            All Your Parking <br /> Needs in One App
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            A powerful app built to make parking simple, fast and reliable.
          </p>

          {/* Store Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 mt-2">
            <a
              href="#"
              className="flex items-center gap-3 bg-black text-white rounded-xl px-4 py-3 w-fit hover:bg-gray-800 active:scale-95 transition-all duration-200"
            >
              <svg className="w-6 h-6 fill-white flex-shrink-0" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div>
                <p className="text-[10px] text-gray-300 leading-none">Download on the</p>
                <p className="text-sm font-semibold leading-tight">App Store</p>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 bg-black text-white rounded-xl px-4 py-3 w-fit hover:bg-gray-800 active:scale-95 transition-all duration-200"
            >
              <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M3.18 23.76c.3.16.64.2.97.1l11.5-11.5L12 8.71 3.18 23.76z" fill="#EA4335"/>
                <path d="M20.93 10.4l-2.6-1.48-3.2 3.2 3.2 3.2 2.62-1.5c.75-.43.75-1.99-.02-2.42z" fill="#FBBC05"/>
                <path d="M3.18.24C2.86.08 2.5.07 2.18.24L14.07 12 3.18.24z" fill="#4285F4"/>
                <path d="M2.18.24C1.45.65 1 1.43 1 2.34v19.32c0 .9.45 1.69 1.18 2.1L14.07 12 2.18.24z" fill="#34A853"/>
              </svg>
              <div>
                <p className="text-[10px] text-gray-300 leading-none">GET IT ON</p>
                <p className="text-sm font-semibold leading-tight">Google Play</p>
              </div>
            </a>
          </div>
        </div>

        {/* Right — Single combined image of all 4 screens */}
        <div className="flex-1 w-full">
          <div
            className={`w-full transition-all duration-700 ease-out
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <img
              src={COMBINED_IMG}
              alt="App screens preview"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Feature captions row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mt-6">
            {APP_FEATURES.map((feature, i) => (
              <div
                key={feature.title}
                style={{ transitionDelay: `${i * 120}ms` }}
                className={`text-center transition-all duration-600 ease-out
                  ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <p className="text-sm font-bold text-gray-900">{feature.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile dots */}
          <div className="flex justify-center gap-1.5 mt-6 lg:hidden">
            {APP_FEATURES.map((_, i) => (
              <span
                key={i}
                className={`block rounded-full ${i === 0 ? "w-4 h-2 bg-orange-500" : "w-2 h-2 bg-gray-300"}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}