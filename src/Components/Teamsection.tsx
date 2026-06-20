// src/components/TeamSection.tsx
import { useEffect, useRef, useState } from 'react'

interface TeamMember {
  name: string
  role: string
  img: string
}

interface Stat {
  target: number
  divide: number
  suffix: string
  label: string
}

const team: TeamMember[] = [
  {
    name: 'Jhon Smith',
    role: 'CEO & Founder',
    img: 'https://res.cloudinary.com/dquki4xol/image/upload/v1781957451/ChatGPT_Image_Jun_17_2026_03_48_43_PM_1_fjrz6t.png',
  },
  {
    name: 'Sara Jonathon',
    role: 'Head of Department',
    img: 'https://res.cloudinary.com/dquki4xol/image/upload/v1781957450/ChatGPT_Image_Jun_17_2026_03_50_07_PM_1_yatnnd.png',
  },
  {
    name: 'Michle Lee',
    role: 'CTO',
    img: 'https://res.cloudinary.com/dquki4xol/image/upload/v1781957450/ChatGPT_Image_Jun_17_2026_04_02_30_PM_1_rq0rk3.png',
  },
]

const stats: Stat[] = [
  { target: 50000, divide: 1000, suffix: 'K+', label: 'Happy Users' },
  { target: 10000, divide: 1000, suffix: 'K+', label: 'Parking Spots' },
  { target: 50, divide: 1, suffix: '+', label: 'Cities Covered' },
  { target: 10000, divide: 1000, suffix: 'K+', label: 'Satisfaction Rate' },
]

function useInView(
  threshold = 0.25
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
interface CounterProps extends Stat {
  inView: boolean
}

function Counter({ target, divide, suffix, inView }: CounterProps) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return

    const shown = target / divide
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
  }, [inView, target, divide])

  return (
    <span className="block text-2xl font-extrabold text-white mb-1.5">
      {value}
      {suffix}
    </span>
  )
}

function TeamCard({ member, delay }: { member: TeamMember; delay: number }) {
  const [ref, inView] = useInView(0.2)

  return (
    <div
      ref={ref}
      className={`group text-center transition-all duration-[600ms] ease-out motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="relative mb-3.5 aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl motion-reduce:transition-none motion-reduce:translate-y-0">
        <img
          src={member.img}
          alt={member.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="text-base font-bold text-neutral-900">{member.name}</h3>
      <p className="text-[13px] text-neutral-500">{member.role}</p>
    </div>
  )
}

export default function TeamSection() {
  const [statsRef, statsInView] = useInView(0.25)

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="text-center mb-12 animate-rise-in motion-reduce:animate-none motion-reduce:opacity-100">
          <h1 className="text-3xl font-extrabold text-neutral-900 mb-3">Meet Our Team</h1>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-neutral-500">
            A dedicated team of innovators working towards a smarter tomorrow
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 mb-11">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} delay={i * 0.12} />
          ))}
        </div>

        <div
          ref={statsRef}
          className={`grid grid-cols-2 sm:grid-cols-4 gap-6 rounded-2xl bg-neutral-950 px-4 py-9 text-center transition-all duration-700 motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
            statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <Counter {...stat} inView={statsInView} />
              <span className="text-[13px] text-neutral-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}