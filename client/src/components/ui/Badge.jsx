import clsx from "clsx";

export function Badge({ children, className }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-gold",
        className
      )}
    >
      {children}
    </span>
  );
}
