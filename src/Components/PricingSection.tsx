import { useEffect, useRef, useState } from 'react'

type BillingCycle = 'monthly' | 'yearly'

interface Plan {
    name: string
    badge?: string
    price: Record<BillingCycle, string>
    priceSuffix?: string
    description: string
    features: string[]
    cta: string
    highlighted?: boolean
}

interface ComparisonRow {
    feature: string
    basic: boolean
    premium: boolean
    business: boolean
}

const plans: Plan[] = [
    {
        name: 'Basic',
        price: { monthly: 'Free', yearly: 'Free' },
        description: 'Perfect for occasional Parkers',
        features: ['Find parking spots', 'Standard search filter', 'Basic support'],
        cta: 'Get Started',
    },
    {
        name: 'Premium',
        badge: 'Most Popular',
        price: { monthly: '$9', yearly: '$7' },
        priceSuffix: '/month',
        description: 'For frequent and smart updates',
        features: ['Everything in Basic', 'Live navigation', 'Advance Filter'],
        cta: 'Start Free Trial',
        highlighted: true,
    },
    {
        name: 'Business',
        price: { monthly: 'Custom', yearly: 'Custom' },
        description: 'For businesses and fleets',
        features: ['Find parking spots', 'Standard search filter', 'Basic support'],
        cta: 'Contact Sales',
    },
]

const comparisonRows: ComparisonRow[] = [
    { feature: 'Find Parking Spots', basic: true, premium: true, business: true },
    { feature: 'Live Availability', basic: true, premium: true, business: true },
    { feature: 'Advance Filters', basic: true, premium: true, business: true },
    { feature: 'Navigation', basic: false, premium: true, business: true },
    { feature: 'Flexible Booking', basic: false, premium: true, business: true },
    { feature: 'Multiple Payment Options', basic: false, premium: true, business: true },
    { feature: 'Booking History', basic: false, premium: true, business: true },
    { feature: 'Priority Support', basic: false, premium: true, business: true },
    { feature: 'Team Dashboard', basic: false, premium: false, business: true },
    { feature: 'Billing & Invoices', basic: false, premium: false, business: true },
    { feature: 'Account Manager', basic: false, premium: false, business: true },
]

function useInView(
    threshold = 0.15
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


function Check({ color = 'neutral' }: { color?: 'neutral' | 'green' | 'orange' }) {
    const colors: Record<string, string> = {
        neutral: 'text-neutral-900',
        green: 'text-emerald-500',
        orange: 'text-orange-500',
    }
    return (
        <svg viewBox="0 0 20 20" className={`h-4 w-4 shrink-0 ${colors[color]}`} fill="none">
            <path
                d="M5 10.5 8.5 14 15 6.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function Dash() {
    return <span className="text-neutral-300">—</span>
}

function BillingToggle({
    cycle,
    onChange,
}: {
    cycle: BillingCycle
    onChange: (cycle: BillingCycle) => void
}) {
    return (
        <div className="mx-auto  flex w-fit items-center gap-1 rounded-full border border-neutral-200 bg-white p-1">
            <button
                type="button"
                onClick={() => onChange('monthly')}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${cycle === 'monthly' ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-700'
                    }`}
            >
                Monthly
            </button>
            <button
                type="button"
                onClick={() => onChange('yearly')}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${cycle === 'yearly' ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-700'
                    }`}
            >
                Yearly{' '}
                <span className={cycle === 'yearly' ? 'text-emerald-400' : 'text-emerald-600'}>
                    (Save 20%)
                </span>
            </button>
        </div>
    )
}

function PriceTag({ plan, cycle }: { plan: Plan; cycle: BillingCycle }) {
    const isNumeric = plan.price[cycle] !== 'Free' && plan.price[cycle] !== 'Custom'
    return (
        <div key={cycle} className="mb-1 flex items-end justify-center gap-1 animate-fade-up">
            <span className="text-3xl font-extrabold text-neutral-900">{plan.price[cycle]}</span>
            {plan.priceSuffix && isNumeric && (
                <span className="pb-1 text-sm text-neutral-500">{plan.priceSuffix}</span>
            )}
        </div>
    )
}

function PlanCard({ plan, cycle, delay }: { plan: Plan; cycle: BillingCycle; delay: number }) {
    const [ref, inView] = useInView(0.15)

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}s` }}
            className={`relative rounded-2xl border p-6 text-center transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:translate-y-0 ${plan.highlighted ? 'border-orange-400 shadow-md' : 'border-neutral-200'
                } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
            {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                    {plan.badge}
                </span>
            )}

            <h3 className="mt-2 text-lg font-bold text-neutral-900">{plan.name}</h3>
            <PriceTag plan={plan} cycle={cycle} />
            <p className="mb-5 text-sm text-neutral-500">{plan.description}</p>

            <ul className="mb-6 space-y-2.5 text-left">
                {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-neutral-700">
                        <Check color={plan.highlighted ? 'orange' : 'neutral'} />
                        {feature}
                    </li>
                ))}
            </ul>

            <button
                type="button"
                className={`w-full rounded-lg py-2.5 text-sm font-semibold transition-colors duration-200 ${plan.highlighted
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'border border-neutral-300 text-neutral-900 hover:bg-neutral-50'
                    }`}
            >
                {plan.cta}
            </button>
        </div>
    )
}

function ComparisonTable() {
    const [ref, inView] = useInView(0.1)

    return (
        <div
            ref={ref}
            className={`overflow-hidden rounded-2xl border border-neutral-200 transition-all duration-700 motion-reduce:transition-none motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
        >
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                        <th className="px-5 py-3 font-medium text-neutral-500">Features</th>
                        <th className="px-5 py-3 text-center font-medium text-neutral-500">Basic</th>
                        <th className="px-5 py-3 text-center font-medium text-orange-500">Premium</th>
                        <th className="px-5 py-3 text-center font-medium text-neutral-500">Business</th>
                    </tr>
                </thead>
                <tbody>
                    {comparisonRows.map((row, i) => (
                        <tr
                            key={row.feature}
                            style={{ transitionDelay: inView ? `${i * 0.04}s` : '0s' }}
                            className={`border-b border-neutral-100 transition-all duration-500 hover:bg-neutral-50 motion-reduce:transition-none ${inView ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <td className="px-5 py-3 text-neutral-700">{row.feature}</td>
                            <td className="px-5 py-3 text-center">
                                {row.basic ? <Check color="green" /> : <Dash />}
                            </td>
                            <td className="px-5 py-3 text-center">
                                {row.premium ? <Check color="orange" /> : <Dash />}
                            </td>
                            <td className="px-5 py-3 text-center">
                                {row.business ? <Check color="green" /> : <Dash />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default function PricingSection() {
    const [cycle, setCycle] = useState<BillingCycle>('monthly')

    return (
        <section className="bg-white mt-10 px-6 py-16">
            <div className="mx-auto max-w-3xl text-center">
                <span className="mb-4 inline-block rounded-full border border-orange-300 px-4 py-1 text-xs font-medium text-orange-500 animate-rise-in">
                    Pricing Plan
                </span>

                <h1 className="mb-3 text-3xl font-extrabold leading-tight text-neutral-900 animate-rise-in [animation-delay:0.08s]">
                    Simple, Transparent <br />
                    Pricing for <span className="text-orange-500">Everyone</span>
                </h1>

                <p className="mx-auto mb-8 max-w-md text-sm text-neutral-500 animate-rise-in [animation-delay:0.16s]">
                    Choose the perfect plan that fits your needs. Upgrade or downgrade anytime.
                </p>

                <div className="mb-12 animate-rise-in [animation-delay:0.24s]">
                    <BillingToggle cycle={cycle} onChange={setCycle} />
                </div>
            </div>

            <div className="mx-auto mb-16 grid max-w-5xl gap-6 sm:grid-cols-3">
                {plans.map((plan, i) => (
                    <PlanCard key={plan.name} plan={plan} cycle={cycle} delay={i * 0.12} />
                ))}
            </div>

            <div className="mx-auto max-w-4xl">
                <h2 className="mb-8 text-center text-2xl font-extrabold text-neutral-900">Compare Plans</h2>
                <ComparisonTable />
            </div>
        </section>
    )
}