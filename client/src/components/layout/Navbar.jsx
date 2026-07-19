import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { useHotelConfig } from "../../context/HotelConfigContext";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import { Button } from "../ui/Button";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Rooms & Suites", to: "/rooms" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const { config } = useHotelConfig();
  const { isScrolled } = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const solid = isScrolled || !isHome;

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          solid ? "bg-warm-white/90 py-4 shadow-sm backdrop-blur-md" : "bg-transparent py-7"
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:px-10">
          <Link to="/" className={clsx("font-display text-xl tracking-wide", solid ? "text-ink" : "text-warm-white")}>
            {config.hotelName}
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  clsx(
                    "text-xs font-medium uppercase tracking-[0.15em] transition-colors",
                    solid ? "text-ink/80 hover:text-ink" : "text-warm-white/80 hover:text-warm-white",
                    isActive && (solid ? "text-gold" : "text-gold-light")
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button as={Link} to="/rooms" variant={solid ? "primary" : "outlineLight"} size="sm">
              Book Now
            </Button>
          </nav>

          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className={clsx("md:hidden", solid ? "text-ink" : "text-warm-white")}
          >
            <Menu className="h-7 w-7" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <AnimatePresence>{menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} links={navLinks} />}</AnimatePresence>
    </>
  );
}
