import clsx from "clsx";
import { forwardRef, useMemo } from "react";
import { motion } from "framer-motion";

const variants = {
  primary: "bg-ink text-warm-white hover:bg-charcoal",
  gold: "bg-gold text-ink hover:bg-gold-light",
  outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-warm-white",
  ghost: "text-ink hover:text-gold",
  outlineLight: "border border-warm-white/40 text-warm-white hover:bg-warm-white hover:text-ink",
};

const sizes = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3.5 text-sm",
  lg: "px-9 py-4 text-sm",
};

export const Button = forwardRef(function Button(
  { as: Comp = "button", variant = "primary", size = "md", className, children, ...props },
  ref
) {
  const MotionComp = useMemo(() => motion(Comp), [Comp]);

  return (
    <MotionComp
      ref={ref}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={clsx(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap uppercase tracking-[0.15em] transition-colors duration-300",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </MotionComp>
  );
});
