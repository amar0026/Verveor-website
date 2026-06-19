import { useState } from "react";


const navLinks: string[] = ["Features", "Pricing", "How it works", "About Us", "Contact"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-600 z-50  px-6 md:px-10 py-4 flex items-center justify-between">

      {/* Logo */}
      <div className="flex items-center select-none">
        <img src="https://res.cloudinary.com/dquki4xol/image/upload/v1781849829/WhatsApp_Image_2026-06-19_at_11.20.49_AM_s7bxjh.jpg" alt="Vervoer Logo" className="h-8 w-auto" />
      </div>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex items-center gap-8">
        {navLinks.map((link: string) => (
          <li key={link}>
            <a
              href="#"
              className="text-white text-sm font-medium hover:text-orange-400 hover:underline underline-offset-4 transition-all duration-200"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop CTA Button */}
      <button className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 whitespace-nowrap cursor-pointer">
        Download App
      </button>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#12151C] border-t border-white/10 flex flex-col items-start px-6 py-4 gap-4 md:hidden z-50">
          {navLinks.map((link: string) => (
            <a
              key={link}
              href="#"
              className="text-white text-sm font-medium hover:text-orange-400 hover:underline underline-offset-4 transition-all duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 w-full cursor-pointer">
            Download App
          </button>
        </div>
      )}
    </nav>
  );
}