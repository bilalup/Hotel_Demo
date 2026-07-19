import { Star } from "lucide-react";
import { useHotelConfig } from "../../context/HotelConfigContext";
import { Section, Eyebrow } from "../ui/Section";
import { RevealOnScroll } from "../ui/RevealOnScroll";
import { blurReveal, fadeUp } from "../../animations/variants";
import { optimizeImage } from "../../utils/imageUrl";

export function AboutTeaser() {
  const { config } = useHotelConfig();
  const image = config.galleryImages?.[2]?.url || config.heroImages?.[1];

  return (
    <Section className="cv-auto bg-white">
      <div className="grid items-center gap-14 md:grid-cols-2">
        <RevealOnScroll variants={blurReveal} className="order-2 md:order-1">
          <Eyebrow>Our Story</Eyebrow>
          <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
            A Sanctuary Shaped by the Sea
          </h2>
          <p className="mt-6 text-base leading-relaxed text-stone md:text-lg">{config.description}</p>
          <p className="mt-4 text-base leading-relaxed text-stone md:text-lg">
            Every element of {config.hotelName} — from the hand-selected materials to the pace of
            service — is designed around a single idea: that true luxury is measured in calm, not noise.
          </p>
        </RevealOnScroll>

        <RevealOnScroll variants={fadeUp} className="relative order-1 md:order-2">
          <div className="group aspect-[4/5] overflow-hidden rounded-2xl">
            {image && (
              <img
                src={optimizeImage(image, 900)}
                alt={config.hotelName}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            )}
          </div>
          <div className="absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-2xl bg-ink px-6 py-5 shadow-xl sm:flex">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/10">
              <Star className="h-5 w-5 fill-gold text-gold" />
            </div>
            <div>
              <p className="font-display text-lg text-warm-white">Five-Star Rated</p>
              <p className="text-xs text-warm-white/50">By guests, worldwide</p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </Section>
  );
}
