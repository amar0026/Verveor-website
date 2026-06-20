import { useEffect, useRef, useState } from "react";
import { Route, Eye } from "lucide-react";

const STORY_IMAGE =
  "https://res.cloudinary.com/dquki4xol/image/upload/v1781953396/ChatGPT_Image_Jun_17_2026_01_50_10_PM_1_y0nu6l.png";
// ↑ Replace with your couple-in-car image URL

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

export default function OurStory() {
  const { ref, inView } = useInView();

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 overflow-hidden">
      <div ref={ref} className="max-w-4xl mx-auto flex flex-col gap-10">

        {/* Our Story — text left, image right */}
        <div className="flex flex-col md:flex-row items-center gap-8">

          {/* Left — Text */}
          <div
            className={`flex-1 transition-all duration-700 ease-out
              ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
              Our Story
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-3">
              Vimor was founded with a simple idea — parking should never be a hassle.
              We saw the daily struggle people face finding safe, affordable, and
              convenient parking spots. So we built a platform that connects drivers
              with the best parking spaces in real-time.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Today, Vimor is trusted by thousands of drivers and businesses across the city.
            </p>
          </div>

          {/* Right — Image */}
          <div
            className={`flex-shrink-0 w-full md:w-64 lg:w-72 transition-all duration-800 ease-out delay-200
              ${inView ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-95"}`}
          >
            <img
              src={STORY_IMAGE}
              alt="Our Story"
              className="w-full h-48 md:h-52 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Mission + Vision cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Our Mission */}
          <div
            className={`border border-gray-200 rounded-2xl p-6 hover:border-orange-200 hover:shadow-md hover:shadow-orange-50
              transition-all duration-500 ease-out delay-[300ms]
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                <Route className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="text-base font-extrabold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              To create smarter cities by solving parking challenges through technology and innovation.
            </p>
          </div>

          {/* Our Vision */}
          <div
            className={`border border-gray-200 rounded-2xl p-6 hover:border-orange-200 hover:shadow-md hover:shadow-orange-50
              transition-all duration-500 ease-out delay-[450ms]
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                <Eye className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="text-base font-extrabold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              A world where parking is effortless, accessible, and available for all.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}