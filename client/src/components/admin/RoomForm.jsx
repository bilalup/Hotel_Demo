import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/Button";

const emptyRoom = {
  name: "",
  slug: "",
  type: "deluxe",
  description: "",
  shortDescription: "",
  pricePerNight: "",
  maxGuests: 2,
  sizeSqm: "",
  bedType: "King Bed",
  images: "",
  amenities: "",
  totalRooms: 1,
  featured: false,
  isActive: true,
};

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function RoomForm({ initialRoom, onSubmit, onClose, isSubmitting }) {
  const [form, setForm] = useState(() =>
    initialRoom
      ? {
          ...initialRoom,
          images: (initialRoom.images || []).join("\n"),
          amenities: (initialRoom.amenities || []).join(", "),
        }
      : emptyRoom
  );

  function update(key, value) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "name" && !initialRoom) next.slug = slugify(value);
      return next;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      pricePerNight: Number(form.pricePerNight),
      maxGuests: Number(form.maxGuests),
      sizeSqm: Number(form.sizeSqm),
      totalRooms: Number(form.totalRooms),
      images: form.images.split("\n").map((s) => s.trim()).filter(Boolean),
      amenities: form.amenities.split(",").map((s) => s.trim()).filter(Boolean),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl text-ink">{initialRoom ? "Edit Room" : "New Room"}</h2>
          <button onClick={onClose} aria-label="Close"><X className="h-5 w-5 text-stone" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Name</span>
              <input value={form.name} onChange={(e) => update("name", e.target.value)} required className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Slug</span>
              <input value={form.slug} onChange={(e) => update("slug", e.target.value)} required className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm" />
            </label>
          </div>

          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Short Description</span>
            <input value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm" />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Description</span>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm" />
          </label>

          <div className="grid gap-5 sm:grid-cols-3">
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Type</span>
              <select value={form.type} onChange={(e) => update("type", e.target.value)} className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm">
                {["standard", "deluxe", "suite", "villa", "penthouse"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Price / Night</span>
              <input type="number" min={0} value={form.pricePerNight} onChange={(e) => update("pricePerNight", e.target.value)} required className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Total Rooms</span>
              <input type="number" min={1} value={form.totalRooms} onChange={(e) => update("totalRooms", e.target.value)} required className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm" />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Max Guests</span>
              <input type="number" min={1} value={form.maxGuests} onChange={(e) => update("maxGuests", e.target.value)} required className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Size (m&sup2;)</span>
              <input type="number" min={0} value={form.sizeSqm} onChange={(e) => update("sizeSqm", e.target.value)} className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Bed Type</span>
              <input value={form.bedType} onChange={(e) => update("bedType", e.target.value)} className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm" />
            </label>
          </div>

          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Image URLs (one per line)</span>
            <textarea value={form.images} onChange={(e) => update("images", e.target.value)} rows={3} className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm" />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Amenities (comma separated)</span>
            <input value={form.amenities} onChange={(e) => update("amenities", e.target.value)} className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm" />
          </label>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-ink">
              <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} /> Featured
            </label>
            <label className="flex items-center gap-2 text-sm text-ink">
              <input type="checkbox" checked={form.isActive} onChange={(e) => update("isActive", e.target.checked)} /> Active
            </label>
          </div>

          <div className="flex gap-4 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            <Button type="submit" variant="primary" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Room"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
