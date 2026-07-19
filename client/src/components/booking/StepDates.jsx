import { useState } from "react";
import { todayISODate, addDaysISO, nightsBetween } from "../../utils/dateHelpers";
import { Button } from "../ui/Button";

export function StepDates({ data, onNext }) {
  const today = todayISODate();
  const [checkIn, setCheckIn] = useState(data.checkIn || today);
  const [checkOut, setCheckOut] = useState(data.checkOut || addDaysISO(today, 2));
  const [guests, setGuests] = useState(data.guests || 2);
  const [roomsCount, setRoomsCount] = useState(data.roomsCount || 1);
  const nights = nightsBetween(checkIn, checkOut);

  function handleSubmit(e) {
    e.preventDefault();
    onNext({ checkIn, checkOut, guests, roomsCount });
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
      <h2 className="font-display text-3xl text-ink">When would you like to stay?</h2>
      <p className="mt-2 text-sm text-stone">Select your dates and party size to begin.</p>

      <div className="mt-8 grid grid-cols-2 gap-5">
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Check In</span>
          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => setCheckIn(e.target.value)}
            className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Check Out</span>
          <input
            type="date"
            value={checkOut}
            min={addDaysISO(checkIn, 1)}
            onChange={(e) => setCheckOut(e.target.value)}
            className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm"
            required
          />
        </label>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5">
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Guests</span>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Rooms</span>
          <select
            value={roomsCount}
            onChange={(e) => setRoomsCount(Number(e.target.value))}
            className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n} Room{n > 1 ? "s" : ""}</option>
            ))}
          </select>
        </label>
      </div>

      {nights > 0 && <p className="mt-4 text-sm text-stone">{nights} night{nights > 1 ? "s" : ""}</p>}

      <Button type="submit" variant="primary" className="mt-8 w-full">
        Continue
      </Button>
    </form>
  );
}
