/**
 * White-label static defaults.
 *
 * This file is the fallback/skeleton for a hotel brand. At runtime,
 * HotelConfigContext fetches GET /api/settings (the HotelSettings document
 * in MongoDB) and deep-merges it over these defaults, so the *content* that
 * actually renders lives in the database and can be swapped per client
 * without touching component code. To rebrand this platform for a new
 * hotel, edit the seed data / DB content — not this file or any component.
 */
const hotelConfig = {
  hotelName: "Your Hotel Name",
  tagline: "",
  description: "",
  logoUrl: "",
  faviconUrl: "/favicon.svg",

  colors: {
    primary: "#0B0B0C",
    secondary: "#C6A15B",
    accent: "#F7F3EC",
  },

  contact: {
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    mapEmbedUrl: "",
    lat: null,
    lng: null,
  },

  social: {
    instagram: "",
    facebook: "",
    twitter: "",
    youtube: "",
  },

  heroImages: [],
  galleryImages: [],
  amenities: [],

  policies: {
    checkInTime: "15:00",
    checkOutTime: "11:00",
    cancellationPolicy: "",
    childrenPolicy: "",
    petsPolicy: "",
  },

  bookingRules: {
    minStayNights: 1,
    maxStayNights: 30,
    maxGuestsPerRoom: 4,
    currency: "USD",
    taxRatePercent: 0,
  },

  seo: {
    title: "",
    description: "",
    keywords: [],
    ogImage: "",
  },
};

export default hotelConfig;
