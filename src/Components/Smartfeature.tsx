import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal, Heart, CalendarDays, Receipt, Bell, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <SlidersHorizontal className="w-5 h-5 text-orange-500" />,
    title: "Filter & Search",
    desc: "Find by price, distance, ratings, and more.",
  },
  {
    icon: <Heart className="w-5 h-5 text-orange-500" />,
    title: "Favorite Spots",
    desc: "Save your preferred locations for quick access.",
  },
  {
    icon: <CalendarDays className="w-5 h-5 text-orange-500" />,
    title: "Flexible Booking",
    desc: "Book for hourly, daily, or monthly needs.",
  },
  {
    icon: <Receipt className="w-5 h-5 text-orange-500" />,
    title: "Digital Receipts",
    desc: "Get digital receipts for easy tracking and payment.",
  },
  {
    icon: <Bell className="w-5 h-5 text-orange-500" />,
    title: "Updates & Alerts",
    desc: "Get notified about bookings, offers, and reminders.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-orange-500" />,
    title: "Safe & Reliable",
    desc: "Verified parking partners for a safe experience.",
  },
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

export default function SmartFeatures() {
  const { ref, inView } = useInView();

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12">
      <div ref={ref} className="max-w-5xl mx-auto">

        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ease-out
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
            Smart Features for Everyday Convenience
          </h2>
          <p className="text-gray-400 text-sm">
            Designed to save your time, money, and stress every day.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`flex items-start gap-4 border border-gray-200 rounded-2xl p-5
                hover:border-orange-200 hover:shadow-md hover:shadow-orange-50
                transition-all duration-500 ease-out cursor-default
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              {/* Icon box */}
              <div className="shrink-0 w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
                {f.icon}
              </div>

              {/* Text */}
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">{f.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}