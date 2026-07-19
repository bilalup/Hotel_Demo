import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { useHotelConfig } from "../../context/HotelConfigContext";
import { Container } from "../ui/Container";

export function Footer() {
  const { config } = useHotelConfig();

  return (
    <footer className="bg-ink pt-20 text-warm-white/70">
      <Container>
        <div className="grid gap-12 pb-16 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-2xl text-warm-white">{config.hotelName}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">{config.tagline}</p>
            <div className="mt-6 flex gap-4">
              {config.social?.instagram && (
                <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  <FaInstagram className="h-4 w-4" />
                </a>
              )}
              {config.social?.facebook && (
                <a href={config.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  <FaFacebookF className="h-4 w-4" />
                </a>
              )}
              {config.social?.twitter && (
                <a href={config.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  <FaTwitter className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold">Explore</p>
            <ul className="space-y-3 text-sm">
              <li><Link to="/rooms" className="hover:text-warm-white">Rooms &amp; Suites</Link></li>
              <li><Link to="/contact" className="hover:text-warm-white">Contact</Link></li>
              <li><Link to="/booking" className="hover:text-warm-white">Book a Stay</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold">Contact</p>
            <ul className="space-y-3 text-sm">
              {config.contact?.address && <li>{config.contact.address}</li>}
              {config.contact?.phone && <li>{config.contact.phone}</li>}
              {config.contact?.email && <li>{config.contact.email}</li>}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-warm-white/10 py-8 text-xs md:flex-row">
          <p>&copy; {new Date().getFullYear()} {config.hotelName}. All rights reserved.</p>
          <p>Check-in {config.policies?.checkInTime} &middot; Check-out {config.policies?.checkOutTime}</p>
        </div>
      </Container>
    </footer>
  );
}
