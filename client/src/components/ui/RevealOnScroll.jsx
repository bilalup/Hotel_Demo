import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../../animations/variants";

export function RevealOnScroll({ children, variants = fadeUp, className, as = "div" }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag initial="hidden" whileInView="show" viewport={viewportOnce} variants={variants} className={className}>
      {children}
    </MotionTag>
  );
}
