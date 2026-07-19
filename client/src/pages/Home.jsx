import { Helmet } from "react-helmet-async";
import { useHotelConfig } from "../context/HotelConfigContext";
import { Hero } from "../components/home/Hero";
import { BookingWidget } from "../components/home/BookingWidget";
import { FeaturedRooms } from "../components/home/FeaturedRooms";
import { StatsBand } from "../components/home/StatsBand";
import { AboutTeaser } from "../components/home/AboutTeaser";
import { Amenities } from "../components/home/Amenities";
import { GalleryPreview } from "../components/home/GalleryPreview";
import { Testimonials } from "../components/home/Testimonials";
import { LocationSection } from "../components/home/LocationSection";

export default function Home() {
  const { config } = useHotelConfig();

  return (
    <>
      <Helmet>
        <title>{config.seo?.title || config.hotelName}</title>
        <meta name="description" content={config.seo?.description || config.tagline} />
        <meta property="og:title" content={config.seo?.title || config.hotelName} />
        <meta property="og:description" content={config.seo?.description} />
        {config.seo?.ogImage && <meta property="og:image" content={config.seo.ogImage} />}
        <meta property="og:type" content="website" />
      </Helmet>

      <Hero />
      <BookingWidget />
      <FeaturedRooms />
      <StatsBand />
      <AboutTeaser />
      <Amenities />
      <GalleryPreview />
      <Testimonials />
      <LocationSection />
    </>
  );
}
