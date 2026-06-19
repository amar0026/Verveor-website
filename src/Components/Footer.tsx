import { Mail, MapPin, Phone } from "lucide-react";

const FOOTER_LINKS = {
  Products: ["Features", "Pricing", "How it Work", "App Updates"],
  Company: ["About Us", "Blog", "Carrier", "Press"],
  Resources: ["Help Center", "FAQs", "Term of service", "Privacy Policy"],
};

const CONTACT = [
  { icon: Mail, text: "hello@gmail.com" },
  { icon: Phone, text: "+1234567890" },
  { icon: MapPin, text: "xyz, US" },
];

// Inline SVGs — lucide-react removed brand/logo icons (Facebook, Instagram,
// LinkedIn, Twitter/X) in recent versions, so these are hand-drawn instead
// of imported, avoiding the "has no exported member" build error.
const SOCIALS = [
  {
    label: "Facebook",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z" />
      </svg>
    ),
  },
  {
    label: "X",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-7.1l-5.21-6.82-5.97 6.82H1.23l7.73-8.84L.8 2.25h7.28l4.71 6.23z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#0c0c0c] text-white px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-8">

        {/* Brand */}
        <div className="col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-orange-500 flex items-center justify-center font-bold text-black text-sm">
              V
            </div>
            <span className="text-lg font-bold">Verveor</span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed max-w-[220px]">
            Making parking simple, convinent and smarter for everyone
          </p>

          <div className="flex items-center gap-3">
            {SOCIALS.map(({ svg, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center
                  hover:bg-orange-500 hover:border-orange-500 transition-colors duration-200"
              >
                {svg}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title} className="flex flex-col gap-3">
            <p className="font-semibold text-white">{title}</p>
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 text-sm hover:text-orange-500 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-white">Contact</p>
          <ul className="flex flex-col gap-3">
            {CONTACT.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2 text-gray-400 text-sm">
                <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  );
}