import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Star, Users, Maximize, BedDouble, DoorOpen, Check, CircleAlert } from "lucide-react";
import { fetchRoom } from "../api/rooms";
import { checkAvailability } from "../api/bookings";
import { useHotelConfig } from "../context/HotelConfigContext";
import { formatCurrency } from "../utils/formatCurrency";
import { todayISODate, addDaysISO, nightsBetween } from "../utils/dateHelpers";
import { Section } from "../components/ui/Section";
import { RevealOnScroll } from "../components/ui/RevealOnScroll";
import { RoomGallerySwiper } from "../components/rooms/RoomGallerySwiper";
import { Button } from "../components/ui/Button";
import { PageLoader } from "../components/ui/PageLoader";

export default function RoomDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { config } = useHotelConfig();

  const { data: room, isLoading } = useQuery({
    queryKey: ["room", slug],
    queryFn: () => fetchRoom(slug),
  });

  const today = todayISODate();
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(addDaysISO(today, 2));
  const [guests, setGuests] = useState(2);
  const [roomsCount, setRoomsCount] = useState(1);
  const [availability, setAvailability] = useState(null);

  const availabilityMutation = useMutation({
    mutationFn: () => checkAvailability({ roomId: room._id, checkIn, checkOut, roomsCount }),
    onSuccess: (result) => setAvailability(result),
  });

  if (isLoading) return <PageLoader />;
  if (!room) return null;

  const nights = nightsBetween(checkIn, checkOut);
  const currency = config.bookingRules?.currency;

  function handleCheckAvailability(e) {
    e.preventDefault();
    setAvailability(null);
    availabilityMutation.mutate();
  }

  function handleBookNow() {
    const params = new URLSearchParams({
      roomId: room._id,
      checkIn,
      checkOut,
      guests: String(guests),
      roomsCount: String(roomsCount),
    });
    navigate(`/booking?${params.toString()}`);
  }

  return (
    <>
      <Helmet>
        <title>{room.name} — {config.hotelName}</title>
        <meta name="description" content={room.shortDescription} />
      </Helmet>

      <Section className="bg-warm-white pt-32">
        <RevealOnScroll>
          <RoomGallerySwiper images={room.images} name={room.name} />
        </RevealOnScroll>

        <div className="mt-14 grid gap-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">{room.type}</p>
            <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">{room.name}</h1>

            <div className="mt-4 flex items-center gap-5 text-sm text-stone">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-gold text-gold" /> {room.rating} ({room.reviewsCount} reviews)
              </span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {room.maxGuests} Guests</span>
              <span className="flex items-center gap-1"><Maximize className="h-4 w-4" /> {room.sizeSqm} m&sup2;</span>
              <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" /> {room.bedType}</span>
              <span className="flex items-center gap-1">
                <DoorOpen className="h-4 w-4" /> {room.totalRooms} Room{room.totalRooms > 1 ? "s" : ""} of This Type
              </span>
            </div>

            <p className="mt-8 text-base leading-relaxed text-stone">{room.description}</p>

            <div className="mt-10">
              <h2 className="font-display text-2xl text-ink">Room Amenities</h2>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {(room.amenities || []).map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-stone">
                    <Check className="h-4 w-4 shrink-0 text-gold" /> {a}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-ink/10 p-8">
              <h2 className="font-display text-2xl text-ink">Policies</h2>
              <dl className="mt-5 space-y-3 text-sm text-stone">
                <div className="flex justify-between border-b border-ink/5 pb-3">
                  <dt>Check-in</dt><dd className="text-ink">{config.policies?.checkInTime}</dd>
                </div>
                <div className="flex justify-between border-b border-ink/5 pb-3">
                  <dt>Check-out</dt><dd className="text-ink">{config.policies?.checkOutTime}</dd>
                </div>
                {config.policies?.cancellationPolicy && (
                  <div>
                    <dt className="mb-1">Cancellation</dt>
                    <dd className="text-ink">{config.policies.cancellationPolicy}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          <div>
            <form
              onSubmit={handleCheckAvailability}
              className="sticky top-28 rounded-2xl border border-ink/10 bg-white p-7 shadow-sm"
            >
              <p className="font-display text-2xl text-ink">
                {formatCurrency(room.pricePerNight, currency)}
                <span className="text-sm font-normal text-stone"> / night</span>
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Check In</span>
                  <input
                    type="date"
                    value={checkIn}
                    min={today}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="rounded-lg border border-ink/10 px-3 py-2 text-sm"
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
                    className="rounded-lg border border-ink/10 px-3 py-2 text-sm"
                    required
                  />
                </label>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Guests</span>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="rounded-lg border border-ink/10 px-3 py-2 text-sm"
                  >
                    {Array.from({ length: room.maxGuests * roomsCount }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Rooms</span>
                  <select
                    value={roomsCount}
                    onChange={(e) => setRoomsCount(Number(e.target.value))}
                    className="rounded-lg border border-ink/10 px-3 py-2 text-sm"
                  >
                    {Array.from({ length: room.totalRooms }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n} Room{n > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </label>
              </div>

              {nights > 0 && (
                <div className="mt-5 space-y-2 border-t border-ink/5 pt-4 text-sm text-stone">
                  <div className="flex justify-between">
                    <span>
                      {formatCurrency(room.pricePerNight, currency)} &times; {nights} nights &times; {roomsCount} room
                      {roomsCount > 1 ? "s" : ""}
                    </span>
                    <span>{formatCurrency(room.pricePerNight * nights * roomsCount, currency)}</span>
                  </div>
                </div>
              )}

              <Button type="submit" variant="primary" className="mt-6 w-full" disabled={availabilityMutation.isPending}>
                {availabilityMutation.isPending ? "Checking..." : "Check Availability"}
              </Button>

              {availability?.available === true && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                  <Check className="h-4 w-4" /> Available &mdash; {availability.availableCount} room
                  {availability.availableCount > 1 ? "s" : ""} left for these dates.
                </div>
              )}
              {availability?.available === false && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                  <CircleAlert className="h-4 w-4" />
                  {availability.availableCount > 0
                    ? ` Only ${availability.availableCount} room${availability.availableCount > 1 ? "s" : ""} left — reduce your room count.`
                    : " Fully booked for these dates."}
                </div>
              )}

              {availability?.available === true && (
                <Button onClick={handleBookNow} variant="gold" className="mt-3 w-full">
                  Book This Room
                </Button>
              )}

              <p className="mt-4 text-center text-xs text-stone">
                Need help? <Link to="/contact" className="underline">Contact us</Link>
              </p>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}
