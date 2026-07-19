import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useHotelConfig } from "../../context/HotelConfigContext";

export function WhatsAppButton() {
  const { config } = useHotelConfig();
  const number = config.contact?.whatsapp;
  if (!number) return null;

  return (
    <motion.a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 md:bottom-8 md:right-8"
    >
      <FaWhatsapp className="h-7 w-7" />
    </motion.a>
  );
}
