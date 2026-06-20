import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

interface NavLinkItem {
  name: string;
  path: string;
  end?: boolean;
}

const navLinks: NavLinkItem[] = [
  { name: "Home", path: "/", end: true },
  { name: "Features", path: "/features" },
  { name: "Pricing", path: "/pricing" },
  { name: "How it works", path: "/how-it-works" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function NavItem({
  name,
  path,
  end,
  onClick,
}: NavLinkItem & { onClick?: () => void }) {
  return (
    <NavLink to={path} end={end} onClick={onClick} className="group relative inline-block">
      {({ isActive }) => (
        <>
          <span
            className={`text-sm font-medium transition-colors duration-200 ${
              isActive ? "text-orange-400" : "text-white group-hover:text-orange-400"
            }`}
          >
            {name}
          </span>
          <span
            className={`absolute -bottom-1.5 left-0 h-0.5 w-full origin-left bg-orange-400 transition-transform duration-300 ease-out ${
              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </>
      )}
    </NavLink>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-600 z-50 px-6 md:px-10 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center select-none">
        <img
          src="https://res.cloudinary.com/dquki4xol/image/upload/v1781849829/WhatsApp_Image_2026-06-19_at_11.20.49_AM_s7bxjh.jpg"
          alt="Vervoer Logo"
          className="h-8 w-auto"
        />
      </Link>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <li key={link.name}>
            <NavItem {...link} />
          </li>
        ))}
      </ul>

      {/* Desktop Button */}
      <button className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200">
        Download App
      </button>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex flex-col gap-1.5"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full overflow-hidden bg-[#12151C] transition-all duration-300 ease-out md:hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 py-4">
          {navLinks.map((link) => (
            <NavItem key={link.name} {...link} onClick={() => setMenuOpen(false)} />
          ))}
        </div>
      </div>
    </nav>
  );
}