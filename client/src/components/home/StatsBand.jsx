import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchRooms } from "../../api/rooms";
import { useCountUp } from "../../hooks/useCountUp";
import { staggerContainer, fadeUp } from "../../animations/variants";

function Stat({ value, decimals = 0, suffix = "", label }) {
  const [ref, display] = useCountUp(value, { decimals });
  return (
    <motion.div ref={ref} variants={fadeUp} className="text-center">
      <p className="font-display text-4xl text-gold md:text-5xl">
        {display}
        {suffix}
      </p>
      <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-warm-white/60 md:text-xs">{label}</p>
    </motion.div>
  );
}

export function StatsBand() {
  const { data: rooms = [] } = useQuery({
    queryKey: ["rooms", "stats-band"],
    queryFn: () => fetchRooms(),
  });

  const totalKeys = rooms.reduce((sum, r) => sum + (r.totalRooms || 0), 0);
  const avgRating = rooms.length ? rooms.reduce((sum, r) => sum + (r.rating || 0), 0) / rooms.length : 0;
  const suiteTypes = rooms.length;

  return (
    <section className="cv-auto border-y border-gold/10 bg-ink py-16">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer(0.12)}
        className="mx-auto grid max-w-5xl grid-cols-2 gap-y-10 px-6 md:grid-cols-4"
      >
        <Stat value={avgRating} decimals={1} label="Guest Rating" />
        <Stat value={totalKeys} label="Ocean-View Keys" />
        <Stat value={suiteTypes} label="Suite Collections" />
        <Stat value={24} suffix="/7" label="Concierge Service" />
      </motion.div>
    </section>
  );
}
