import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Maximize, Users, DoorOpen } from "lucide-react";
import clsx from "clsx";
import { useHotelConfig } from "../../context/HotelConfigContext";
import { useWishlist } from "../../context/WishlistContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { optimizeImage } from "../../utils/imageUrl";

export function RoomCard({ room }) {
  const { config } = useHotelConfig();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(room._id);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link to={`/rooms/${room.slug}`}>
          <img
            src={optimizeImage(room.images?.[0], 640)}
            alt={room.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </Link>
        <button
          onClick={() => toggleWishlist(room._id)}
          aria-label="Toggle wishlist"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-colors hover:bg-white"
        >
          <Heart className={clsx("h-4 w-4", wishlisted ? "fill-gold text-gold" : "text-ink")} strokeWidth={1.5} />
        </button>
        {room.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-warm-white backdrop-blur">
            Featured
          </span>
        )}
        {typeof room.availableCount === "number" && (
          <span
            className={clsx(
              "absolute bottom-4 left-4 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider backdrop-blur",
              room.availableCount === 0
                ? "bg-red-600/90 text-white"
                : room.availableCount <= 2
                  ? "bg-gold/90 text-ink"
                  : "bg-white/90 text-ink"
            )}
          >
            {room.availableCount === 0
              ? "Fully Booked"
              : `${room.availableCount} Room${room.availableCount > 1 ? "s" : ""} Left`}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">{room.type}</p>
        <Link to={`/rooms/${room.slug}`} className="mt-2 font-display text-xl text-ink hover:text-gold">
          {room.name}
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone">{room.shortDescription}</p>

        <div className="mt-4 flex items-center gap-4 text-xs text-stone">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {room.maxGuests} Guests
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="h-3.5 w-3.5" /> {room.sizeSqm} m&sup2;
          </span>
          <span className="flex items-center gap-1">
            <DoorOpen className="h-3.5 w-3.5" /> {room.totalRooms} Room{room.totalRooms > 1 ? "s" : ""}
          </span>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-ink/5 pt-5">
          <div>
            <span className="font-display text-2xl text-ink">
              {formatCurrency(room.pricePerNight, config.bookingRules?.currency)}
            </span>
            <span className="text-xs text-stone"> / night</span>
          </div>
          <Link
            to={`/rooms/${room.slug}`}
            className="text-xs font-medium uppercase tracking-wider text-ink underline decoration-gold underline-offset-4 hover:text-gold"
          >
            View Room
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
