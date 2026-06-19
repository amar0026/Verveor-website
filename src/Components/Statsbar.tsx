const stats = [
  {
    icon: (
      // Users / People icon
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-orange-500" stroke="currentColor" strokeWidth={1.8}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    value: "50K+",
    label: "Happy User",
  },
  {
    icon: (
      // P in circle icon
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-orange-500" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="10" />
        <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
      </svg>
    ),
    value: "10K+",
    label: "Parking Spots",
  },
  {
    icon: (
      // Building / City icon
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-orange-500">
        <path d="M4 2h10v20H4V2zm2 2v16h6V4H6zm3 2h2v2H9V6zm0 4h2v2H9v-2zm0 4h2v2H9v-2zM14 8h6v14h-6V8zm2 2v10h2V10h-2zm0 2h2v2h-2v-2z" />
      </svg>
    ),
    value: "50+",
    label: "Cities Covered",
  },
  {
    icon: (
      // Star outline icon
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-orange-500" stroke="currentColor" strokeWidth={1.8}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    value: "98%",
    label: "Satisfaction Rate",
  },
];

export default function StatsBar() {
  return (
    <div className="w-full relative z-20 -translate-y-1/2 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 px-6 md:px-10 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            className={`flex items-center gap-3 ${
              idx !== stats.length - 1
                ? "md:border-r md:border-gray-100 md:pr-6"
                : ""
            }`}
          >
            {/* Icon */}
            <div className="shrink-0">{stat.icon}</div>

            {/* Text */}
            <div>
              <p className="text-xl md:text-2xl font-extrabold text-gray-900 leading-tight">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}