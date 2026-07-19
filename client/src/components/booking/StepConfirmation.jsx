import { Link } from "react-router-dom";
import { PartyPopper } from "lucide-react";
import { useHotelConfig } from "../../context/HotelConfigContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../ui/Button";

export function StepConfirmation({ booking }) {
  const { config } = useHotelConfig();

  return (
    <div className="mx-auto max-w-lg text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
        <PartyPopper className="h-8 w-8 text-gold" strokeWidth={1.5} />
      </div>
      <h2 className="mt-6 font-display text-3xl text-ink">Booking Confirmed</h2>
      <p className="mt-3 text-sm text-stone">
        A confirmation has been sent to {booking?.guestDetails?.email}. We look forward to welcoming you to{" "}
        {config.hotelName}.
      </p>

      <div className="mt-8 space-y-3 rounded-2xl border border-ink/10 bg-white p-7 text-left text-sm">
        <div className="flex justify-between border-b border-ink/5 pb-3">
          <span className="text-stone">Confirmation Code</span>
          <span className="font-medium text-ink">{booking?.confirmationCode}</span>
        </div>
        <div className="flex justify-between border-b border-ink/5 pb-3">
          <span className="text-stone">Room</span>
          <span className="font-medium text-ink">
            {booking?.room?.name}
            {booking?.roomsCount > 1 ? ` (${booking.roomsCount} rooms)` : ""}
          </span>
        </div>
        <div className="flex justify-between border-b border-ink/5 pb-3">
          <span className="text-stone">Dates</span>
          <span className="font-medium text-ink">
            {booking && new Date(booking.checkIn).toLocaleDateString()} &rarr;{" "}
            {booking && new Date(booking.checkOut).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between pt-1">
          <span className="text-stone">Total Paid</span>
          <span className="font-display text-lg text-ink">
            {formatCurrency(booking?.totalPrice || 0, booking?.currency)}
          </span>
        </div>
      </div>

      <Button as={Link} to="/" variant="primary" className="mt-8">
        Return Home
      </Button>
    </div>
  );
}
