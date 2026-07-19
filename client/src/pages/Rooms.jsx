import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Frown } from "lucide-react";
import { fetchRooms } from "../api/rooms";
import { useHotelConfig } from "../context/HotelConfigContext";
import { Section } from "../components/ui/Section";
import { RoomFilters } from "../components/rooms/RoomFilters";
import { RoomCard } from "../components/rooms/RoomCard";
import { RevealOnScroll } from "../components/ui/RevealOnScroll";
import { PageLoader } from "../components/ui/PageLoader";

export default function Rooms() {
  const { config } = useHotelConfig();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    type: "",
    guests: searchParams.get("guests") || "",
    minPrice: "",
    maxPrice: "",
  });

  const checkIn = searchParams.get("checkIn") || undefined;
  const checkOut = searchParams.get("checkOut") || undefined;

  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ["rooms", filters, checkIn, checkOut],
    queryFn: () =>
      fetchRooms({
        type: filters.type || undefined,
        guests: filters.guests || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        checkIn,
        checkOut,
      }),
  });

  return (
    <>
      <Helmet>
        <title>Rooms &amp; Suites — {config.hotelName}</title>
        <meta name="description" content={`Explore rooms and suites at ${config.hotelName}.`} />
      </Helmet>

      <div className="bg-ink pb-20 pt-40 text-center text-warm-white">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold-light">Accommodation</p>
        <h1 className="font-display text-4xl md:text-6xl">Rooms &amp; Suites</h1>
      </div>

      <Section className="bg-warm-white pt-16">
        <div className="mb-12">
          <RoomFilters filters={filters} onChange={setFilters} />
        </div>

        {isLoading ? (
          <PageLoader />
        ) : rooms.length ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RevealOnScroll key={room._id}>
                <RoomCard room={room} />
              </RevealOnScroll>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-20 text-stone">
            <Frown className="h-8 w-8" strokeWidth={1.25} />
            <p>No rooms match your criteria. Try adjusting the filters.</p>
          </div>
        )}
      </Section>
    </>
  );
}
