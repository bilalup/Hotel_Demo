import clsx from "clsx";
import { Container } from "./Container";
import { RevealOnScroll } from "./RevealOnScroll";
import { blurReveal } from "../../animations/variants";

export function Section({ children, className, containerClassName, id }) {
  return (
    <section id={id} className={clsx("py-20 md:py-32", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className }) {
  return (
    <p className={clsx("mb-4 text-xs font-medium uppercase tracking-[0.25em] text-gold", className)}>
      {children}
    </p>
  );
}

export function SectionHeading({ eyebrow, title, description, align = "left", className }) {
  return (
    <RevealOnScroll
      variants={blurReveal}
      className={clsx(
        "mb-14 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">{title}</h2>
      {description && <p className="mt-5 text-base leading-relaxed text-stone md:text-lg">{description}</p>}
    </RevealOnScroll>
  );
}
