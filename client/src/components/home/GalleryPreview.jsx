import { motion } from "framer-motion";
import { useHotelConfig } from "../../context/HotelConfigContext";
import { Section, SectionHeading } from "../ui/Section";
import { staggerContainer, scaleIn } from "../../animations/variants";
import { optimizeImage } from "../../utils/imageUrl";

export function GalleryPreview() {
  const { config } = useHotelConfig();
  const images = (config.galleryImages || []).slice(0, 6);

  return (
    <Section className="cv-auto bg-white">
      <SectionHeading eyebrow="Gallery" title="Moments at the Bay" align="center" className="mx-auto text-center" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer(0.08)}
        className="grid grid-cols-2 gap-4 md:grid-cols-3"
      >
        {images.map((image, i) => (
          <motion.div
            key={image.url + i}
            variants={scaleIn}
            className={`group relative overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2 md:col-span-1" : ""}`}
          >
            <img
              src={optimizeImage(image.url, i === 0 ? 800 : 500)}
              alt={image.caption}
              loading="lazy"
              decoding="async"
              className="aspect-square h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {image.caption && (
              <p className="absolute bottom-4 left-4 right-4 translate-y-2 text-sm font-medium text-warm-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {image.caption}
              </p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
