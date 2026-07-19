import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useHotelConfig } from "../context/HotelConfigContext";
import { Section } from "../components/ui/Section";
import { BookingStepper } from "../components/booking/BookingStepper";

export default function Booking() {
  const { config } = useHotelConfig();
  const [searchParams] = useSearchParams();

  const initialData = {
    roomId: searchParams.get("roomId") || null,
    checkIn: searchParams.get("checkIn") || null,
    checkOut: searchParams.get("checkOut") || null,
    guests: Number(searchParams.get("guests")) || 2,
    roomsCount: Number(searchParams.get("roomsCount")) || 1,
    guestDetails: null,
    room: null,
  };

  return (
    <>
      <Helmet>
        <title>Book Your Stay — {config.hotelName}</title>
      </Helmet>

      <Section className="bg-warm-white pt-40">
        <BookingStepper initialData={initialData} />
      </Section>
    </>
  );
}
