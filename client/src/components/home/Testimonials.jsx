import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star, Quote } from "lucide-react";
import { fetchTestimonials } from "../../api/testimonials";
import { Section, SectionHeading } from "../ui/Section";
import { RevealOnScroll } from "../ui/RevealOnScroll";
import { scaleIn } from "../../animations/variants";
import { optimizeImage } from "../../utils/imageUrl";

import "swiper/css";
import "swiper/css/pagination";

export function Testimonials() {
  const { data: testimonials = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  if (!testimonials.length) return null;

  return (
    <Section className="cv-auto bg-warm-white">
      <SectionHeading eyebrow="Guest Stories" title="Words From Our Guests" align="center" className="mx-auto text-center" />

      <RevealOnScroll variants={scaleIn}>
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={32}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-14"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t._id}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white p-8 transition-shadow duration-500 hover:shadow-xl hover:shadow-ink/5">
                <Quote className="absolute -right-2 -top-2 h-20 w-20 text-gold/[0.07]" strokeWidth={1} />
                <div className="relative mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="relative flex-1 font-display text-lg leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</p>
                <div className="relative mt-6 flex items-center gap-3 border-t border-ink/5 pt-5">
                  {t.avatarUrl && (
                    <img
                      src={optimizeImage(t.avatarUrl, 100)}
                      alt={t.guestName}
                      loading="lazy"
                      decoding="async"
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-gold/10"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-ink">{t.guestName}</p>
                    <p className="text-xs text-stone">{t.guestLocation}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </RevealOnScroll>
    </Section>
  );
}
