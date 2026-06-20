
import { useEffect, useRef, useState } from 'react'

interface Feature {
  title: string
  description: string
  icon: 'clock' | 'coin' | 'parking'
}

interface Stat {
  target: number
  divide: number
  suffix: string
  label: string
  icon: 'car' | 'parking' | 'star'
}

const HERO_IMAGE = 'https://res.cloudinary.com/dquki4xol/image/upload/v1781961885/ChatGPT_Image_Jun_17_2026_05_21_20_PM_1_qsgnhb.png'

const features: Feature[] = [
  { title: 'Save Time', description: 'Quick search and instant booking.', icon: 'clock' },
  { title: 'Save Money', description: 'Affordable options that fit your budget.', icon: 'coin' },
  { title: 'Stress-Free', description: 'Navigate, park, and enjoy your day.', icon: 'parking' },
]

const stats: Stat[] = [
  { target: 50000, divide: 1000, suffix: 'K+', label: 'Happy Users', icon: 'car' },
  { target: 10000, divide: 1000, suffix: 'K+', label: 'Parking Spots', icon: 'parking' },
  { target: 98, divide: 1, suffix: '%', label: 'Satisfaction Rate', icon: 'star' },
]

function useInView(
  threshold = 0.2
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

function FeatureIcon({ name }: { name: Feature['icon'] }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (name) {
    case 'clock':
      return (
        <svg {...common} className="h-5 w-5">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l3 2" />
        </svg>
      )
    case 'coin':
      return (
        <svg {...common} className="h-5 w-5">
          <ellipse cx="12" cy="8" rx="7" ry="3.2" />
          <path d="M5 8v8c0 1.8 3.1 3.2 7 3.2s7-1.4 7-3.2V8" />
          <path d="M5 12c0 1.8 3.1 3.2 7 3.2s7-1.4 7-3.2" />
        </svg>
      )
    case 'parking':
      return (
        <svg {...common} className="h-5 w-5">
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M10 16V8h2.6a2.4 2.4 0 0 1 0 4.8H10" />
        </svg>
      )
    default:
      return null
  }
}

function StatIcon({ name }: { name: Stat['icon'] }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (name) {
    case 'car':
      return (
        <svg {...common} className="h-6 w-6">
          <path d="M4 16v-3.5L6 8h12l2 4.5V16" />
          <path d="M4 16h16" />
          <circle cx="8" cy="16.5" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="16" cy="16.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'parking':
      return (
        <svg {...common} className="h-6 w-6">
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M10 16V8h2.6a2.4 2.4 0 0 1 0 4.8H10" />
        </svg>
      )
    case 'star':
      return (
        <svg {...common} className="h-6 w-6" fill="currentColor" stroke="none">
          <path d="M12 3.5 14.6 9l6 .9-4.3 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.4 9.9l6-.9Z" />
        </svg>
      )
    default:
      return null
  }
}

function HeroBackground({ src, alt }: { src: string; alt: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

 useEffect(() => {
  let frame = 0;

  function onScroll() {
    cancelAnimationFrame(frame);

    frame = requestAnimationFrame(() => {
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;

      setOffset(Math.max(-16, Math.min(16, center * -0.05)));
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  return () => {
    window.removeEventListener("scroll", onScroll);
    cancelAnimationFrame(frame);
  };
}, []);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 overflow-hidden animate-hero-zoom motion-reduce:animate-none"
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{ transform: `translateY(${offset}px) scale(1.1)` }}
      />
    </div>
  )
}

function FeatureItem({ feature, index }: { feature: Feature; index: number }) {
  const [ref, inView] = useInView(0.3)
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 0.15}s` }}
      className={`text-white transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:scale-100 ${
        inView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
      }`}
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900">
        <FeatureIcon name={feature.icon} />
      </div>
      <p className="text-sm font-bold">{feature.title}</p>
      <p className="text-xs text-white/70">{feature.description}</p>
    </div>
  )
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const [ref, inView] = useInView(0.3)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const shown = stat.target / stat.divide
    const duration = 1100
    let start: number | null = null
    let frame: number

    function step(ts: number) {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(shown * eased))
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [inView, stat.target, stat.divide])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 0.12}s` }}
      className={`rounded-2xl border border-neutral-200 p-6 text-center transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:translate-y-0 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="mb-3 flex justify-center text-orange-500 transition-transform duration-300 hover:scale-110">
        <StatIcon name={stat.icon} />
      </div>
      <p className="text-2xl font-extrabold text-neutral-900">
        {value}
        {stat.suffix}
      </p>
      <p className="text-sm text-neutral-500">{stat.label}</p>
    </div>
  )
}

function SectionHeading() {
  const [ref, inView] = useInView(0.4)
  return (
    <div ref={ref} className="mb-10 text-center">
      <h2 className="relative inline-block text-2xl font-extrabold text-neutral-900 animate-rise-in">
        Why Thousands Choose Verveor?
        <span
          className={`absolute -bottom-2 left-0 h-[3px] w-full origin-left bg-orange-500 transition-transform duration-700 ease-out motion-reduce:transition-none ${
            inView ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </h2>
      <p className="mt-4 text-sm text-neutral-500 animate-rise-in [animation-delay:0.08s]">
        We simplify parking so you can focus on what matters most
      </p>
    </div>
  )
}

export default function HeroAndStatsSection() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="relative mx-auto mb-16 max-w-4xl overflow-hidden rounded-2xl">
        <HeroBackground src={HERO_IMAGE} alt="City street at night" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

        <div className="relative z-10 px-8 py-10">
          <h2 className="mb-10 max-w-xs text-2xl font-extrabold leading-tight text-white animate-rise-in">
            Designed for a Hassle-Free Parking Experience
          </h2>

          <div className="grid grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <FeatureItem key={feature.title} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <SectionHeading />

        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}