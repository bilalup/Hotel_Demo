import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useHotelConfig } from "../../context/HotelConfigContext";
import { SplitText } from "../ui/SplitText";
import { Button } from "../ui/Button";
import { optimizeImage } from "../../utils/imageUrl";

export function Hero() {
  const { config } = useHotelConfig();
  const heroImage = config.heroImages?.[0];
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={sectionRef} className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden bg-ink">
      {heroImage && (
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: imageY }}
          className="absolute inset-0"
        >
          <img
            src={optimizeImage(heroImage, 1920)}
            alt={config.hotelName}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-[125%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/70" />
        </motion.div>
      )}

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-6 flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-gold-light"
        >
          <span className="h-px w-8 bg-gold-light/60" />
          {config.hotelName}
          <span className="h-px w-8 bg-gold-light/60" />
        </motion.p>

        <SplitText
          as="h1"
          text={config.tagline || "An Escape Beyond the Ordinary"}
          className="font-display text-4xl leading-[1.15] text-warm-white sm:text-5xl md:text-7xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mx-auto mt-6 max-w-xl text-sm text-warm-white/80 md:text-base"
        >
          {config.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button as={Link} to="/rooms" variant="gold">
            Explore Rooms &amp; Suites
          </Button>
          <Button as="a" href="#booking-widget" variant="outlineLight">
            Check Availability
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-32 left-1/2 z-10 -translate-x-1/2 text-warm-white/70 md:bottom-10"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="h-6 w-6" strokeWidth={1} />
        </motion.div>
      </motion.div>
    </section>
  );
}
