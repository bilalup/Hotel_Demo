import { Waves, Umbrella, Sparkles, UtensilsCrossed, Dumbbell, BellRing, Star } from "lucide-react";
import { useHotelConfig } from "../../context/HotelConfigContext";
import { Section, SectionHeading } from "../ui/Section";
import { RevealOnScroll } from "../ui/RevealOnScroll";
import { staggerContainer, fadeUp } from "../../animations/variants";
import { motion } from "framer-motion";

const iconMap = {
  waves: Waves,
  umbrella: Umbrella,
  sparkles: Sparkles,
  utensils: UtensilsCrossed,
  dumbbell: Dumbbell,
  "concierge-bell": BellRing,
};

export function Amenities() {
  const { config } = useHotelConfig();
  const amenities = config.amenities || [];

  return (
    <Section className="cv-auto bg-ink text-warm-white">
      <SectionHeading
        eyebrow="Resort Amenities"
        title="Curated for Quiet Indulgence"
        description="From sunrise to last light, every amenity is designed to feel effortless."
        className="text-warm-white [&_p]:text-warm-white/60"
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer(0.1)}
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {amenities.map((amenity) => {
          const Icon = iconMap[amenity.icon] || Star;
          return (
            <motion.div
              key={amenity.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-warm-white/10 p-8 transition-colors hover:border-gold/40"
            >
              <Icon className="h-7 w-7 text-gold transition-transform duration-500 group-hover:scale-110" strokeWidth={1.25} />
              <h3 className="mt-5 font-display text-xl">{amenity.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-warm-white/60">{amenity.description}</p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
