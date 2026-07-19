import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useHotelConfig } from "../../context/HotelConfigContext";
import { Button } from "../ui/Button";

export function MobileMenu({ onClose, links }) {
  const { config } = useHotelConfig();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[70] bg-ink"
    >
      <div className="flex items-center justify-between px-6 py-7">
        <span className="font-display text-xl text-warm-white">{config.hotelName}</span>
        <button aria-label="Close menu" onClick={onClose} className="text-warm-white">
          <X className="h-7 w-7" strokeWidth={1.5} />
        </button>
      </div>

      <nav className="flex flex-col gap-2 px-6 pt-10">
        {links.map((link, i) => (
          <motion.div
            key={link.to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to={link.to}
              onClick={onClose}
              className="block border-b border-warm-white/10 py-5 font-display text-3xl text-warm-white"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + links.length * 0.07, duration: 0.5 }}
          className="mt-8"
        >
          <Button as={Link} to="/rooms" onClick={onClose} variant="gold" className="w-full">
            Book Now
          </Button>
        </motion.div>
      </nav>
    </motion.div>
  );
}
