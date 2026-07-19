import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Check, CircleAlert, Users } from "lucide-react";
import clsx from "clsx";
import { fetchRooms } from "../../api/rooms";
import { checkAvailability } from "../../api/bookings";
import { useHotelConfig } from "../../context/HotelConfigContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { optimizeImage } from "../../utils/imageUrl";
import { Button } from "../ui/Button";
import { PageLoader } from "../ui/PageLoader";

export function StepRoom({ data, onNext, onBack }) {
  const { config } = useHotelConfig();
  const [selectedRoomId, setSelectedRoomId] = useState(data.roomId || null);
  const [error, setError] = useState("");

  const roomsCount = data.roomsCount || 1;

  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ["rooms", { guests: data.guests, checkIn: data.checkIn, checkOut: data.checkOut }],
    queryFn: () => fetchRooms({ guests: data.guests, checkIn: data.checkIn, checkOut: data.checkOut }),
  });

  const availabilityMutation = useMutation({
    mutationFn: (roomId) =>
      checkAvailability({ roomId, checkIn: data.checkIn, checkOut: data.checkOut, roomsCount }),
  });

  async function handleContinue() {
    setError("");
    if (!selectedRoomId) {
      setError("Please select a room to continue.");
      return;
    }
    const { available, availableCount } = await availabilityMutation.mutateAsync(selectedRoomId);
    if (!available) {
      setError(
        availableCount > 0
          ? `Only ${availableCount} room${availableCount > 1 ? "s" : ""} of this type left — reduce your room count or choose another room.`
          : "This room is not available for your selected dates. Please choose another."
      );
      return;
    }
    const room = rooms.find((r) => r._id === selectedRoomId);
    onNext({ roomId: selectedRoomId, room });
  }

  if (isLoading) return <PageLoader />;

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-center font-display text-3xl text-ink">Select Your Room</h2>
      <p className="mt-2 text-center text-sm text-stone">
        Showing rooms available for {data.guests} guest{data.guests > 1 ? "s" : ""}, {roomsCount} room
        {roomsCount > 1 ? "s" : ""}.
      </p>

      <div className="mt-8 space-y-4">
        {rooms.map((room) => {
          const selected = selectedRoomId === room._id;
          return (
            <button
              type="button"
              key={room._id}
              onClick={() => setSelectedRoomId(room._id)}
              className={clsx(
                "flex w-full items-center gap-5 rounded-2xl border p-4 text-left transition-colors",
                selected ? "border-gold bg-gold/5" : "border-ink/10 hover:border-ink/30"
              )}
            >
              <img
                src={optimizeImage(room.images?.[0], 200)}
                alt={room.name}
                loading="lazy"
                decoding="async"
                className="h-20 w-24 shrink-0 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-display text-lg text-ink">{room.name}</p>
                <p className="flex items-center gap-1 text-xs text-stone">
                  <Users className="h-3.5 w-3.5" /> Up to {room.maxGuests} guests
                </p>
                {typeof room.availableCount === "number" && (
                  <p className={clsx("mt-1 text-xs font-medium", room.availableCount <= 2 ? "text-gold" : "text-stone")}>
                    {room.availableCount === 0
                      ? "Fully booked for these dates"
                      : `${room.availableCount} room${room.availableCount > 1 ? "s" : ""} left`}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="font-display text-xl text-ink">
                  {formatCurrency(room.pricePerNight, config.bookingRules?.currency)}
                </p>
                <p className="text-xs text-stone">/ night</p>
              </div>
              <div
                className={clsx(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border",
                  selected ? "border-gold bg-gold text-ink" : "border-ink/20"
                )}
              >
                {selected && <Check className="h-4 w-4" />}
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <div className="mt-5 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          <CircleAlert className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}

      <div className="mt-8 flex gap-4">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={handleContinue}
          disabled={availabilityMutation.isPending}
          className="flex-1"
        >
          {availabilityMutation.isPending ? "Checking..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}
