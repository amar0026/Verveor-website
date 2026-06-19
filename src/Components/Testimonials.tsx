import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "John D.",
    role: "Verified User",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "Vervoer has completely changed the way I park. I save so much time every day!",
  },
  {
    name: "Sarah K.",
    role: "Verified User",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "Super easy to use and very reliable. Highly recommended for everyone.",
  },
  {
    name: "Michael T.",
    role: "Verified User",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
    text: "Finally, a parking app that just works. Love the real-time availability!",
  },
  {
    name: "Emily R.",
    role: "Verified User",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    text: "Booking a spot takes seconds. I use it every single day for work commute.",
  },
  {
    name: "David M.",
    role: "Verified User",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 5,
    text: "The navigation feature is spot on. No more circling around looking for parking!",
  },
];

const VISIBLE = 3; // cards visible at once
const AUTO_PLAY_DELAY = 4000;

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-orange-400 text-orange-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = testimonials.length;

  const goTo = (idx: number, dir: "left" | "right") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent((idx + total) % total);
      setAnimating(false);
    }, 350);
  };

  const prev = () => goTo(current - 1, "left");
  const next = () => goTo(current + 1, "right");

  // Auto-play
  useEffect(() => {
    autoRef.current = setInterval(() => goTo(current + 1, "right"), AUTO_PLAY_DELAY);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [current]);

  // Get 3 visible cards indices
  const visibleIndices = Array.from({ length: VISIBLE }, (_, i) => (current + i) % total);

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-2">
          Testimonials
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          What Our Users Say
        </h2>
      </div>

      {/* Slider */}
      <div className="relative max-w-5xl mx-auto flex items-center gap-4">

        {/* Prev Button */}
        <button
          onClick={prev}
          className="flex-shrink-0 w-9 h-9 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center hover:border-orange-400 hover:text-orange-500 transition-all duration-200 cursor-pointer z-10"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Cards Container */}
        <div className="flex-1 overflow-hidden">
          <div
            className={`flex gap-5 transition-all duration-350 ease-in-out
              ${animating
                ? direction === "right"
                  ? "-translate-x-4 opacity-0"
                  : "translate-x-4 opacity-0"
                : "translate-x-0 opacity-100"
              }`}
          >
            {visibleIndices.map((tIdx, cardPos) => {
              const t = testimonials[tIdx];
              const isCenter = cardPos === 1;
              return (
                <div
                  key={`${tIdx}-${cardPos}`}
                  className={`flex-1 min-w-0 rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-500
                    ${isCenter
                      ? "border-orange-200 shadow-lg shadow-orange-100/60 scale-[1.03] bg-white"
                      : "border-gray-100 shadow-sm bg-white scale-100 opacity-80"
                    }`}
                >
                  {/* Quote + Stars */}
                  <div className="flex items-start justify-between">
                    <svg className="w-8 h-8 text-orange-400 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <StarRating count={t.rating} />
                  </div>

                  {/* Text */}
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    {t.text}
                  </p>

                  {/* User */}
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-orange-100"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-900">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={next}
          className="flex-shrink-0 w-9 h-9 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center hover:border-orange-400 hover:text-orange-500 transition-all duration-200 cursor-pointer z-10"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? "right" : "left")}
            className={`rounded-full transition-all duration-300 cursor-pointer
              ${i === current
                ? "w-6 h-2 bg-orange-500"
                : "w-2 h-2 bg-gray-300 hover:bg-orange-300"
              }`}
          />
        ))}
      </div>
    </section>
  );
}