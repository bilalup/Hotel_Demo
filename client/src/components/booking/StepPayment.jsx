import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Lock, CircleAlert } from "lucide-react";
import { createBooking } from "../../api/bookings";
import { useHotelConfig } from "../../context/HotelConfigContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { nightsBetween } from "../../utils/dateHelpers";
import { optimizeImage } from "../../utils/imageUrl";
import { Button } from "../ui/Button";

export function StepPayment({ data, onNext, onBack }) {
  const { config } = useHotelConfig();
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "", name: "" });
  const [error, setError] = useState("");

  const roomsCount = data.roomsCount || 1;
  const nights = nightsBetween(data.checkIn, data.checkOut);
  const subtotal = (data.room?.pricePerNight || 0) * nights * roomsCount;
  const taxRate = config.bookingRules?.taxRatePercent || 0;
  const tax = Math.round(subtotal * (taxRate / 100) * 100) / 100;
  const total = subtotal + tax;
  const currency = config.bookingRules?.currency;

  const bookingMutation = useMutation({
    mutationFn: () =>
      createBooking({
        roomId: data.roomId,
        roomsCount,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        guests: { adults: data.guests, children: 0 },
        guestDetails: data.guestDetails,
      }),
    onSuccess: (booking) => onNext({ booking }),
    onError: (err) => setError(err.message),
  });

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (card.number.replace(/\s/g, "").length < 12 || !card.expiry || card.cvc.length < 3 || !card.name) {
      setError("Please complete all payment fields.");
      return;
    }
    bookingMutation.mutate();
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-10 md:grid-cols-2">
      <form onSubmit={handleSubmit}>
        <h2 className="font-display text-3xl text-ink">Payment</h2>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-stone">
          <Lock className="h-3.5 w-3.5" /> Simulated payment — no charge will be made.
        </p>

        <div className="mt-8 space-y-5">
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Name on Card</span>
            <input
              value={card.name}
              onChange={(e) => setCard({ ...card, name: e.target.value })}
              className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Card Number</span>
            <input
              value={card.number}
              onChange={(e) => setCard({ ...card, number: e.target.value })}
              placeholder="4242 4242 4242 4242"
              className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm"
            />
          </label>
          <div className="grid grid-cols-2 gap-5">
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Expiry</span>
              <input
                value={card.expiry}
                onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                placeholder="MM/YY"
                className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-stone">CVC</span>
              <input
                value={card.cvc}
                onChange={(e) => setCard({ ...card, cvc: e.target.value })}
                placeholder="123"
                className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm"
              />
            </label>
          </div>
        </div>

        {error && (
          <div className="mt-5 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            <CircleAlert className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1" disabled={bookingMutation.isPending}>
            Back
          </Button>
          <Button type="submit" variant="gold" className="flex-1" disabled={bookingMutation.isPending}>
            {bookingMutation.isPending ? "Processing..." : `Confirm & Pay ${formatCurrency(total, currency)}`}
          </Button>
        </div>
      </form>

      <div className="rounded-2xl border border-ink/10 bg-white p-7">
        <h3 className="font-display text-xl text-ink">Order Summary</h3>
        <div className="mt-5 flex gap-4">
          <img
            src={optimizeImage(data.room?.images?.[0], 160)}
            alt={data.room?.name}
            loading="lazy"
            decoding="async"
            className="h-16 w-20 rounded-lg object-cover"
          />
          <div>
            <p className="text-sm font-medium text-ink">{data.room?.name}</p>
            <p className="text-xs text-stone">{data.checkIn} &rarr; {data.checkOut}</p>
          </div>
        </div>
        <div className="mt-6 space-y-2 border-t border-ink/5 pt-5 text-sm text-stone">
          <div className="flex justify-between">
            <span>
              {formatCurrency(data.room?.pricePerNight || 0, currency)} &times; {nights} nights &times; {roomsCount} room
              {roomsCount > 1 ? "s" : ""}
            </span>
            <span>{formatCurrency(subtotal, currency)}</span>
          </div>
          {taxRate > 0 && (
            <div className="flex justify-between">
              <span>Taxes ({taxRate}%)</span>
              <span>{formatCurrency(tax, currency)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-ink/5 pt-3 font-display text-lg text-ink">
            <span>Total</span>
            <span>{formatCurrency(total, currency)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
