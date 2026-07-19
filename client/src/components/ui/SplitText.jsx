import { motion } from "framer-motion";
import { staggerContainer, viewportOnce } from "../../animations/variants";

const word = {
  hidden: { opacity: 0, y: "100%" },
  show: { opacity: 1, y: "0%", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export function SplitText({ text, className, as: Tag = "h1" }) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer(0.08)}
        className="inline"
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-top">
            <motion.span variants={word} className="inline-block">
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
