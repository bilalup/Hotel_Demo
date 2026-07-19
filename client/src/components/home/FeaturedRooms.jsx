import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchRooms } from "../../api/rooms";
import { Section, SectionHeading } from "../ui/Section";
import { RevealOnScroll } from "../ui/RevealOnScroll";
import { RoomCard } from "../rooms/RoomCard";
import { Button } from "../ui/Button";

export function FeaturedRooms() {
  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ["rooms", { featured: true }],
    queryFn: () => fetchRooms(),
  });

  const featured = rooms.filter((r) => r.featured).slice(0, 3);

  return (
    <Section className="bg-warm-white">
      <SectionHeading
        eyebrow="Accommodation"
        title="Rooms &amp; Suites"
        description="Each residence is designed as a private retreat — considered spaces where ocean light, natural materials, and quiet luxury meet."
      />

      {!isLoading && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {featured.map((room) => (
            <RevealOnScroll key={room._id}>
              <RoomCard room={room} />
            </RevealOnScroll>
          ))}
        </div>
      )}

      <div className="mt-14 text-center">
        <Button as={Link} to="/rooms" variant="outline">
          View All Rooms
        </Button>
      </div>
    </Section>
  );
}
