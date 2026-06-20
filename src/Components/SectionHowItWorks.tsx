
import { useEffect, useRef, useState } from 'react'

type IconName = 'search' | 'calendar' | 'card' | 'parking'

interface Step {
  id: number
  title: string
  description: string
  icon: IconName
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Search',
    description: 'Find parking spots near you in seconds.',
    icon: 'search',
  },
  {
    id: 2,
    title: 'Book',
    description: 'Choose your preferred spot and book instantly.',
    icon: 'calendar',
  },
  {
    id: 3,
    title: 'Pay',
    description: 'Make secure payments using your preferred method.',
    icon: 'card',
  },
  {
    id: 4,
    title: 'Park',
    description: 'Navigate to your spot and park with ease.',
    icon: 'parking',
  },
]

function useInView(
  threshold = 0.2
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function StepIcon({ name }: { name: IconName }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (name) {
    case 'search':
      return (
        <svg {...common} className="h-5 w-5">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M20 20 15.5 15.5" />
        </svg>
      )
    case 'calendar':
      return (
        <svg {...common} className="h-5 w-5">
          <rect x="3.5" y="5" width="17" height="15" rx="2" />
          <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
          <path d="M8 13.5h.01M12 13.5h.01M16 13.5h.01" />
        </svg>
      )
    case 'card':
      return (
        <svg {...common} className="h-5 w-5">
          <rect x="3" y="5.5" width="18" height="13" rx="2" />
          <path d="M3 9.5h18" />
          <path d="M6.5 14.5h4" />
        </svg>
      )
    case 'parking':
      return (
        <svg {...common} className="h-5 w-5">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9.5 16V8h2.7a2.5 2.5 0 0 1 0 5H9.5" />
        </svg>
      )
  }
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
      <path d="M6 17h12l-1.4-1.6a2 2 0 0 1-.6-1.4V10a4 4 0 0 0-8 0v4a2 2 0 0 1-.6 1.4L6 17Z" />
      <path d="M10.5 20a1.5 1.5 0 0 0 3 0" />
    </svg>
  )
}

function PhoneMockup() {
  const [ref, inView] = useInView(0.2)

  return (
    <div
      ref={ref}
      className={`mx-auto w-[260px] transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:translate-x-0 ${
        inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
      }`}
    >
      <div className="animate-float rounded-[2.4rem] border-[6px] border-neutral-900 bg-neutral-900 p-1.5 shadow-xl motion-reduce:animate-none">
        <div className="overflow-hidden rounded-[1.9rem] bg-white">
          <div className="flex items-center justify-between px-4 pt-3 text-[11px] font-semibold text-neutral-900">
            <span>9:41</span>
            <div className="h-3.5 w-16 rounded-full bg-neutral-900" />
            <span>●●●</span>
          </div>

          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-[10px] text-neutral-400">Hello,</p>
              <p className="text-sm font-bold text-neutral-900">Salman Khan</p>
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
              <BellIcon />
            </div>
          </div>

          <div className="relative mx-3 mb-3 h-40 overflow-hidden rounded-xl bg-emerald-50">
            <div className="absolute left-4 top-6 h-px w-32 rotate-[8deg] bg-emerald-200" />
            <div className="absolute left-2 top-16 h-px w-36 -rotate-[6deg] bg-emerald-200" />
            <div className="absolute left-10 top-2 h-24 w-px rotate-[10deg] bg-emerald-200" />

            <PinDot className="left-7 top-5" />
            <PinDot className="left-24 top-9" />
            <PinDot className="left-12 top-24" />

            <div className="absolute left-[46%] top-[42%]">
              <span className="absolute inline-flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-orange-400 opacity-60 motion-reduce:hidden" />
              <span className="relative block h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-orange-500" />
            </div>
          </div>

          <div className="mx-3 mb-3 rounded-xl border border-neutral-100 p-2.5 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-neutral-200" />
              <div className="flex-1">
                <p className="text-[12px] font-bold text-neutral-900">Central City Mall</p>
                <p className="text-[10px] text-neutral-400">C-D Block · 4.6 ★</p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm font-bold text-neutral-900">
                $10.00<span className="text-[10px] font-normal text-neutral-400">/hr</span>
              </p>
              <button
                type="button"
                className="rounded-full bg-orange-500 px-3 py-1 text-[10px] font-semibold text-white transition-colors duration-200 hover:bg-orange-600"
              >
                Reserve Now
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 pb-3">
            <p className="text-[11px] font-semibold text-neutral-900">Recent Booking</p>
            <p className="text-[10px] text-neutral-400">View All</p>
          </div>

          <div className="flex items-center justify-around border-t border-neutral-100 px-4 py-2.5 text-neutral-400">
            <StepIcon name="parking" />
            <StepIcon name="calendar" />
            <StepIcon name="card" />
            <StepIcon name="search" />
          </div>
        </div>
      </div>
    </div>
  )
}

function PinDot({ className }: { className: string }) {
  return (
    <span className={`absolute h-2.5 w-2.5 rounded-full border-2 border-white bg-neutral-900 ${className}`} />
  )
}

function StepRow({ step, index, total }: { step: Step; index: number; total: number }) {
  const [ref, inView] = useInView(0.3)

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 0.12}s` }}
      className={`relative flex gap-4 transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:translate-y-0 ${
        index < total - 1 ? 'pb-10' : ''
      } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-bold text-white">
        {step.id}
      </div>

      <div className="flex flex-1 items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-neutral-900">{step.title}</h3>
          <p className="text-sm text-neutral-500">{step.description}</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-neutral-200 text-neutral-800">
          <StepIcon name={step.icon} />
        </div>
      </div>
    </div>
  )
}

function StepsTimeline() {
  const [lineRef, lineInView] = useInView(0.15)

  return (
    <div ref={lineRef} className="relative">
      <div
        className={`absolute left-5 top-5 bottom-10 w-0 border-l-2 border-dashed border-orange-300 transition-transform duration-[1100ms] ease-out motion-reduce:transition-none ${
          lineInView ? 'scale-y-100' : 'scale-y-0'
        }`}
        style={{ transformOrigin: 'top' }}
      />
      {steps.map((step, i) => (
        <StepRow key={step.id} step={step} index={i} total={steps.length} />
      ))}
    </div>
  )
}

export default function HowItWorksSection() {
  return (
    <section className="bg-white mt-5  px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mb-4 inline-block rounded-full border border-orange-300 px-4 py-1 text-xs font-medium text-orange-500 animate-rise-in">
          How its work
        </span>

        <h1 className="mb-3 text-3xl font-extrabold leading-tight text-neutral-900 animate-rise-in [animation-delay:0.08s]">
          Park Smarter in <br />
          <span className="text-orange-500">4 Simple Steps</span>
        </h1>

        <p className="mx-auto mb-14 max-w-sm text-sm text-neutral-500 animate-rise-in [animation-delay:0.16s]">
          Verveor makes parking seamless from search to park
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl items-center gap-12 md:grid-cols-2">
        <StepsTimeline />
        <PhoneMockup />
      </div>
    </section>
  )
}