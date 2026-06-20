import { MapPin, ShieldCheck, Navigation, Search } from "lucide-react";

const features = [
  {
    icon: <MapPin className="w-6 h-6 text-orange-500" />,
    title: "Easy Booking",
    desc: "Find and book parking spots in just a few tips",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-orange-500" />,
    title: "Secure Payments",
    desc: "100% secure payments with multiple options.",
  },
  {
    icon: <Navigation className="w-6 h-6 text-orange-500" />,
    title: "Live Navigation",
    desc: "Real-time directions to your reserved spot.",
  },
  {
    icon: <Search className="w-6 h-6 text-orange-500" />,
    title: "Smart Search",
    desc: "Filter by price, distance, availability & more.",
  },
];

export default function Features() {
  return (
    <section className="w-full bg-white  px-6 md:px-12">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-2">
          Why Choose Vervoer?
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          Everything You Need <br />
          for a Hassle-Free Parking Experience
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col items-center text-center bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 px-6 py-8 gap-4"
          >
            {/* Icon Circle */}
            <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-gray-900">{feature.title}</h3>

            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}