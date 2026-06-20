import { useEffect, useRef, useState } from "react";
import {
  CalendarCheck, Radio, ShieldCheck, Navigation,
  BookOpen, Zap, MapPin, Clock
} from "lucide-react";

const PHONE_IMAGE =
  "https://res.cloudinary.com/dquki4xol/image/upload/v1781851222/ChatGPT_Image_Jun_15_2026_01_24_18_PM_fisksu.png";
// ↑ Replace with your actual center phone image

const LEFT_FEATURES = [
  {
    icon: <CalendarCheck className="w-5 h-5 text-orange-500" />,
    title: "Easy Booking",
    desc: "Find and book parking spots in a few taps. Real-time availability right here.",
  },
  {
    icon: <Radio className="w-5 h-5 text-orange-500" />,
    title: "Live Availability",
    desc: "See real-time parking availability and choose the best spot near you.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-orange-500" />,
    title: "Secure Payments",
    desc: "Make payments securely with multiple options, including cards, UPI and wallets.",
  },
  {
    icon: <Navigation className="w-5 h-5 text-orange-500" />,
    title: "Smart Navigation",
    desc: "Get step-by-step navigation to your reserved parking spot without any hassle.",
  },
];

const RIGHT_FEATURES = [
  {
    icon: <BookOpen className="w-5 h-5 text-orange-500" />,
    title: "Booking History",
    desc: "You can manage all your past and upcoming parking reservations in one place.",
  },
  {
    icon: <Zap className="w-5 h-5 text-orange-500" />,
    title: "Instant Confirmation",
    desc: "Get instant confirmation for every booking with all details straight to your app.",
  },
  {
    icon: <Clock className="w-5 h-5 text-orange-500" />,
    title: "24/7 Support",
    desc: "Our support team is available 24/7 to help you with any difficulty that arises.",
  },
  {
    icon: <MapPin className="w-5 h-5 text-orange-500" />,
    title: "Multiple Locations",
    desc: "Find parking across the city in malls, airports, hospitals, offices and more.",
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

function FeatureCard({
  icon, title, desc, delay, align, inView,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: number;
  align: "left" | "right";
  inView: boolean;
}) {
  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className={`flex gap-3 transition-all duration-600 ease-out
        ${align === "right" ? "flex-row-reverse text-right" : "flex-row text-left"}
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {/* Icon circle */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900 mb-0.5">{title}</p>
        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const { ref, inView } = useInView();

  return (
    <section className="w-full bg-[#f9f9f9] py-16 px-6 md:px-12">
      <div ref={ref} className="max-w-6xl mx-auto">

        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ease-out
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="text-orange-500 text-xs mt-5 font-semibold uppercase tracking-widest mb-2">
            And Much More!
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
            Everything You Need for a{" "}
            <span className="text-orange-500">Smarter</span> Parking Experience
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Vervoer combines technology and convenience to make parking simple, fast and always free.
          </p>
        </div>

        {/* 3-column layout: features | phone | features */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-6">

          {/* Left features */}
          <div className="flex-1 flex flex-col gap-7">
            {LEFT_FEATURES.map((f, i) => (
              <FeatureCard
                key={f.title}
                {...f}
                align="left"
                delay={i * 120}
                inView={inView}
              />
            ))}
          </div>

          {/* Center phone mockup */}
          <div
            className={`flex-shrink-0 w-52 lg:w-60 transition-all duration-800 ease-out delay-200
              ${inView ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-8"}`}
          >
            <img
              src={PHONE_IMAGE}
              alt="App Preview"
              className="w-full object-contain drop-shadow-2xl"
            />
          </div>

          {/* Right features */}
          <div className="flex-1 flex flex-col gap-7">
            {RIGHT_FEATURES.map((f, i) => (
              <FeatureCard
                key={f.title}
                {...f}
                align="right"
                delay={i * 120 + 100}
                inView={inView}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}