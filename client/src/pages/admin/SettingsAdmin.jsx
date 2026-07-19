import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { fetchSettings, updateSettings } from "../../api/settings";
import { Topbar } from "../../components/admin/Topbar";
import { Button } from "../../components/ui/Button";
import { PageLoader } from "../../components/ui/PageLoader";

const currencyOptions = ["ETB", "USD", "EUR", "GBP"];

const fieldGroups = [
  {
    title: "General",
    fields: [
      { path: "hotelName", label: "Hotel Name" },
      { path: "tagline", label: "Tagline" },
      { path: "description", label: "Description", textarea: true },
    ],
  },
  {
    title: "Contact",
    fields: [
      { path: "contact.email", label: "Email" },
      { path: "contact.phone", label: "Phone" },
      { path: "contact.whatsapp", label: "WhatsApp Number", hint: "Digits only, e.g. 251911234567" },
      { path: "contact.address", label: "Address" },
      { path: "contact.mapEmbedUrl", label: "Map Embed URL" },
    ],
  },
  {
    title: "Social Links",
    fields: [
      { path: "social.instagram", label: "Instagram" },
      { path: "social.facebook", label: "Facebook" },
      { path: "social.twitter", label: "Twitter / X" },
      { path: "social.youtube", label: "YouTube" },
    ],
  },
  {
    title: "Policies",
    fields: [
      { path: "policies.checkInTime", label: "Check-in Time" },
      { path: "policies.checkOutTime", label: "Check-out Time" },
      { path: "policies.cancellationPolicy", label: "Cancellation Policy", textarea: true },
      { path: "policies.childrenPolicy", label: "Children Policy", textarea: true },
      { path: "policies.petsPolicy", label: "Pets Policy", textarea: true },
    ],
  },
];

function getPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function setPath(obj, path, value) {
  const keys = path.split(".");
  const next = { ...obj };
  let cursor = next;
  keys.forEach((key, i) => {
    if (i === keys.length - 1) {
      cursor[key] = value;
    } else {
      cursor[key] = { ...cursor[key] };
      cursor = cursor[key];
    }
  });
  return next;
}

export default function SettingsAdmin() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  });

  const [form, setForm] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: (payload) => updateSettings(payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(["settings"], updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    },
  });

  if (isLoading || !form) return <PageLoader />;

  function update(path, value) {
    setForm((prev) => setPath(prev, path, value));
  }

  function handleSubmit(e) {
    e.preventDefault();
    saveMutation.mutate(form);
  }

  return (
    <>
      <Topbar title="Hotel Settings" />

      <form onSubmit={handleSubmit} className="space-y-10 p-8">
        {fieldGroups.map((group) => (
          <div key={group.title} className="rounded-2xl border border-ink/10 bg-white p-7">
            <h2 className="font-display text-xl text-ink">{group.title}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {group.fields.map((field) => (
                <label
                  key={field.path}
                  className={`flex flex-col gap-1 ${field.textarea ? "sm:col-span-2" : ""}`}
                >
                  <span className="text-[11px] font-medium uppercase tracking-wider text-stone">{field.label}</span>
                  {field.textarea ? (
                    <textarea
                      value={getPath(form, field.path) || ""}
                      onChange={(e) => update(field.path, e.target.value)}
                      rows={3}
                      className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm"
                    />
                  ) : (
                    <input
                      value={getPath(form, field.path) || ""}
                      onChange={(e) => update(field.path, e.target.value)}
                      className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm"
                    />
                  )}
                  {field.hint && <span className="text-[11px] text-stone">{field.hint}</span>}
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="rounded-2xl border border-ink/10 bg-white p-7">
          <h2 className="font-display text-xl text-ink">Booking Rules</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Currency</span>
              <select
                value={form.bookingRules?.currency || "ETB"}
                onChange={(e) => update("bookingRules.currency", e.target.value)}
                className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm"
              >
                {currencyOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Tax Rate (%)</span>
              <input
                type="number"
                min={0}
                max={100}
                value={form.bookingRules?.taxRatePercent ?? 0}
                onChange={(e) => update("bookingRules.taxRatePercent", Number(e.target.value))}
                className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Min Stay (nights)</span>
              <input
                type="number"
                min={1}
                value={form.bookingRules?.minStayNights ?? 1}
                onChange={(e) => update("bookingRules.minStayNights", Number(e.target.value))}
                className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Max Stay (nights)</span>
              <input
                type="number"
                min={1}
                value={form.bookingRules?.maxStayNights ?? 30}
                onChange={(e) => update("bookingRules.maxStayNights", Number(e.target.value))}
                className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" variant="primary" disabled={saveMutation.isPending}>
            {saveMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-green-700">
              <Check className="h-4 w-4" /> Saved
            </span>
          )}
          {saveMutation.isError && (
            <span className="text-sm text-red-600">{saveMutation.error.message}</span>
          )}
        </div>
      </form>
    </>
  );
}
