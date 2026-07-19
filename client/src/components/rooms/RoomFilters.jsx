import { SlidersHorizontal } from "lucide-react";

const roomTypes = [
  { label: "All Types", value: "" },
  { label: "Deluxe", value: "deluxe" },
  { label: "Suite", value: "suite" },
  { label: "Villa", value: "villa" },
  { label: "Penthouse", value: "penthouse" },
];

export function RoomFilters({ filters, onChange }) {
  function update(key, value) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-ink/10 bg-white p-6 md:flex-row md:items-end md:justify-between">
      <div className="flex items-center gap-2 text-sm font-medium text-ink">
        <SlidersHorizontal className="h-4 w-4 text-gold" strokeWidth={1.5} />
        Refine your stay
      </div>

      <div className="grid flex-1 grid-cols-2 gap-5 md:grid-cols-4">
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Type</span>
          <select
            value={filters.type}
            onChange={(e) => update("type", e.target.value)}
            className="rounded-lg border border-ink/10 bg-transparent px-3 py-2 text-sm text-ink outline-none"
          >
            {roomTypes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Guests</span>
          <select
            value={filters.guests}
            onChange={(e) => update("guests", e.target.value)}
            className="rounded-lg border border-ink/10 bg-transparent px-3 py-2 text-sm text-ink outline-none"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n}+ Guests</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Min Price</span>
          <input
            type="number"
            min={0}
            placeholder="$0"
            value={filters.minPrice}
            onChange={(e) => update("minPrice", e.target.value)}
            className="rounded-lg border border-ink/10 bg-transparent px-3 py-2 text-sm text-ink outline-none"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Max Price</span>
          <input
            type="number"
            min={0}
            placeholder="Any"
            value={filters.maxPrice}
            onChange={(e) => update("maxPrice", e.target.value)}
            className="rounded-lg border border-ink/10 bg-transparent px-3 py-2 text-sm text-ink outline-none"
          />
        </label>
      </div>
    </div>
  );
}
