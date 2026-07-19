import { MapPin, Phone, Mail } from "lucide-react";
import { useHotelConfig } from "../../context/HotelConfigContext";
import { Section, Eyebrow } from "../ui/Section";
import { RevealOnScroll } from "../ui/RevealOnScroll";

export function LocationSection() {
  const { config } = useHotelConfig();

  return (
    <Section className="cv-auto bg-white">
      <div className="grid gap-14 md:grid-cols-2">
        <RevealOnScroll>
          <Eyebrow>Find Us</Eyebrow>
          <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">Set Upon the Bay</h2>
          <ul className="mt-8 space-y-5 text-sm text-stone md:text-base">
            {config.contact?.address && (
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                {config.contact.address}
              </li>
            )}
            {config.contact?.phone && (
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                {config.contact.phone}
              </li>
            )}
            {config.contact?.email && (
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                {config.contact.email}
              </li>
            )}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-stone/10 ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-2xl hover:shadow-ink/10">
            {config.contact?.mapEmbedUrl && (
              <iframe
                title="Resort location"
                src={config.contact.mapEmbedUrl}
                className="h-full w-full grayscale-[20%] transition-all duration-500 hover:grayscale-0"
                loading="lazy"
              />
            )}
          </div>
        </RevealOnScroll>
      </div>
    </Section>
  );
}
