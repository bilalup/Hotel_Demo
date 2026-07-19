import clsx from "clsx";

export function StatCard({ label, value, icon: Icon, accent = false, className }) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-ink/10 bg-white p-6 shadow-sm",
        accent && "border-gold/30 bg-gradient-to-br from-gold/5 to-transparent",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-stone">{label}</p>
        {Icon && <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />}
      </div>
      <p className="mt-3 font-display text-3xl text-ink">{value}</p>
    </div>
  );
}
