import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, Users } from "lucide-react";
import { todayISODate, addDaysISO } from "../../utils/dateHelpers";
import { Button } from "../ui/Button";

export function BookingWidget() {
  const navigate = useNavigate();
  const today = todayISODate();
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(addDaysISO(today, 2));
  const [guests, setGuests] = useState(2);

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams({ checkIn, checkOut, guests: String(guests) });
    navigate(`/rooms?${params.toString()}`);
  }

  return (
    <motion.form
      id="booking-widget"
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-20 mx-auto -mt-20 w-full max-w-5xl scroll-mt-28 px-6 md:-mt-10"
    >
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-white/90 shadow-2xl shadow-ink/10 backdrop-blur-xl sm:grid-cols-2 md:grid-cols-4">
        <label className="flex flex-col gap-1 px-6 py-5">
          <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-stone">
            <CalendarDays className="h-3.5 w-3.5" /> Check In
          </span>
          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => setCheckIn(e.target.value)}
            className="bg-transparent text-sm text-ink outline-none"
            required
          />
        </label>

        <label className="flex flex-col gap-1 px-6 py-5">
          <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-stone">
            <CalendarDays className="h-3.5 w-3.5" /> Check Out
          </span>
          <input
            type="date"
            value={checkOut}
            min={addDaysISO(checkIn, 1)}
            onChange={(e) => setCheckOut(e.target.value)}
            className="bg-transparent text-sm text-ink outline-none"
            required
          />
        </label>

        <label className="flex flex-col gap-1 px-6 py-5">
          <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-stone">
            <Users className="h-3.5 w-3.5" /> Guests
          </span>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="bg-transparent text-sm text-ink outline-none"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} Guest{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </label>

        <Button type="submit" variant="primary" className="w-full rounded-none py-6 sm:col-span-2 md:col-span-1">
          Check Availability
        </Button>
      </div>
    </motion.form>
  );
}
