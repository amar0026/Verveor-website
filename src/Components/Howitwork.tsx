import { useEffect, useRef, useState } from "react";
import { Search, List, CalendarCheck, Navigation } from "lucide-react";

const CAR_IMAGE =
  "https://res.cloudinary.com/dquki4xol/image/upload/v1781864516/ChatGPT_Image_Jun_15_2026_04_07_07_PM_l2dthv.png";

const steps = [
  {
    number: 1,
    icon: <Search className="w-6 h-6 text-white" />,
    title: "Search",
    desc: "Find parking near you",
  },
  {
    number: 2,
    icon: <List className="w-6 h-6 text-white" />,
    title: "Choose",
    desc: "Select the best spot for you",
  },
  {
    number: 3,
    icon: <CalendarCheck className="w-6 h-6 text-white" />,
    title: "Reserve",
    desc: "Book your spot in seconds",
  },
  {
    number: 4,
    icon: <Navigation className="w-6 h-6 text-white" />,
    title: "Navigate & Park",
    desc: "Get directions and park with ease",
  },
];

// Step delay: 0, 400, 800, 1200ms — then car at 1800ms
const STEP_DELAY = 400;
const CAR_DELAY = steps.length * STEP_DELAY + 200;

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

export default function HowItWorks() {
  const { ref, inView } = useInView();
  const [activeStep, setActiveStep] = useState(-1);
  const [showCar, setShowCar] = useState(false);
  const [lineProgress, setLineProgress] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    if (!inView) return;

    // Animate each step sequentially
    steps.forEach((_, idx) => {
      setTimeout(() => {
        setActiveStep(idx);
        // Grow the connector line after icon appears
        if (idx < steps.length - 1) {
          setTimeout(() => {
            setLineProgress((prev) => {
              const next = [...prev];
              next[idx] = 100;
              return next;
            });
          }, 150);
        }
        // After last step, show car
        if (idx === steps.length - 1) {
          setTimeout(() => setShowCar(true), CAR_DELAY - idx * STEP_DELAY);
        }
      }, idx * STEP_DELAY);
    });
  }, [inView]);

  return (
    <section className="w-full bg-[#f9f9f9] py-14 px-6 md:px-12 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">

        {/* Left — Text + Steps */}
        <div className="flex-1">
          {/* Label */}
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-2">
            How It Works
          </p>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-10">
            Park in 4 Simple Steps
          </h2>

          {/* Steps Row */}
          <div className="flex flex-col sm:flex-row items-start gap-0 relative">
            {steps.map((step, idx) => {
              const isActive = activeStep >= idx;
              return (
                <div
                  key={step.number}
                  className="flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-0 flex-1 relative"
                >
                  {/* Icon + Line */}
                  <div className="flex items-center w-full">
                    {/* Circle icon */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10
                        transition-all duration-500 ease-out
                        ${isActive
                          ? "bg-gray-900 scale-100 opacity-100 shadow-lg shadow-gray-900/30"
                          : "bg-gray-300 scale-75 opacity-40"
                        }`}
                      style={{ transitionDelay: isActive ? "0ms" : "0ms" }}
                    >
                      {/* Ripple on active */}
                      {isActive && (
                        <span className="absolute w-12 h-12 rounded-full bg-orange-400/20 animate-ping" />
                      )}
                      {step.icon}
                    </div>

                    {/* Dashed connector line with fill animation */}
                    {idx < steps.length - 1 && (
                      <div className="flex-1 hidden sm:block relative h-[2px] mx-2 bg-gray-200 overflow-hidden rounded-full">
                        <div
                          className="absolute left-0 top-0 h-full bg-orange-400 rounded-full transition-all duration-500 ease-in-out"
                          style={{ width: `${lineProgress[idx]}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Step Text */}
                  <div
                    className={`mt-3 pr-4 sm:pr-2 transition-all duration-500 ease-out
                      ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                  >
                    <p className="text-xs text-gray-400 mb-0.5">
                      {step.number}.{" "}
                      <span className="font-bold text-gray-900 text-sm">{step.title}</span>
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right — Car Illustration (appears after steps) */}
        <div
          className={`shrink-0 w-full md:w-72 lg:w-80 flex justify-center md:justify-end
            transition-all duration-700 ease-out
            ${showCar ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-16 scale-95"}`}
        >
          <img
            src={CAR_IMAGE}
            alt="Parking Illustration"
            className={`w-64 md:w-full rounded-4xl object-contain drop-shadow-xl
              ${showCar ? "animate-float-car" : ""}`}
          />
        </div>

      </div>

      <style>{`
        @keyframes float-car {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        .animate-float-car {
          animation: float-car 3.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}