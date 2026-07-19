import dotenv from "dotenv";
dotenv.config();

import { connectDB, disconnectDB } from "../config/db.js";
import HotelSettings from "../models/HotelSettings.js";
import Room from "../models/Room.js";
import Testimonial from "../models/Testimonial.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";

const img = (id) => `https://images.unsplash.com/photo-${id}?q=80&w=1600&auto=format&fit=crop`;

const settingsData = {
  slug: "default",
  hotelName: "Aurelia Bay Resort & Spa",
  tagline: "Where the Horizon Meets Serenity",
  description:
    "Set along a private stretch of coastline, Aurelia Bay Resort & Spa is an intimate sanctuary of barefoot luxury — where cinematic ocean views, quiet craftsmanship, and unhurried service create a stay that lingers in memory long after departure.",
  logoUrl: "",
  faviconUrl: "",
  colors: { primary: "#0B0B0C", secondary: "#C6A15B", accent: "#F7F3EC" },
  contact: {
    email: "reservations@aureliabay.com",
    phone: "+1 (305) 555-0142",
    whatsapp: "13055550142",
    address: "1 Horizon Point, Aurelia Bay, Seychelles",
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=55.40%2C-4.75%2C55.55%2C-4.60&layer=mapnik",
    lat: -4.6796,
    lng: 55.492,
  },
  social: {
    instagram: "https://instagram.com/aureliabayresort",
    facebook: "https://facebook.com/aureliabayresort",
    twitter: "https://twitter.com/aureliabay",
    youtube: "",
  },
  heroImages: [
    img("1566073771259-6a8506099945"),
    img("1520250497591-112f2f40a3f4"),
    img("1455587734955-081b22074882"),
  ],
  galleryImages: [
    { url: img("1566073771259-6a8506099945"), category: "rooms", caption: "Ocean View Deluxe Room" },
    { url: img("1582719478250-c89cae4dc85b"), category: "pool", caption: "Infinity Pool at dusk" },
    { url: img("1571896349842-33c89424de2d"), category: "hotel", caption: "The Grand Lobby" },
    { url: img("1611892440504-42a792e24d32"), category: "rooms", caption: "Suite interior" },
    { url: img("1544161515-4ab6ce6db874"), category: "dining", caption: "The Horizon Restaurant" },
    { url: img("1600891964599-f61ba0e24092"), category: "spa", caption: "Aurelia Spa treatment room" },
    { url: img("1519449556851-5720b33024e7"), category: "hotel", caption: "Private beach" },
    { url: img("1493857671505-72967e2e2760"), category: "dining", caption: "Fine dining interior" },
    { url: img("1584132967334-10e028bd69f7"), category: "rooms", caption: "Grand Suite living area" },
    { url: img("1551882547-ff40c63fe5fa"), category: "hotel", caption: "Resort at twilight" },
  ],
  amenities: [
    { title: "Infinity Pool", description: "A horizon-edge pool overlooking the bay, open until midnight.", icon: "waves" },
    { title: "Private Beach", description: "500 metres of private, powder-white sand reserved for guests.", icon: "umbrella" },
    { title: "Aurelia Spa & Wellness", description: "Signature treatments blending island ritual with modern therapy.", icon: "sparkles" },
    { title: "The Horizon Restaurant", description: "Fine dining helmed by a Michelin-trained executive chef.", icon: "utensils" },
    { title: "Fitness & Yoga Pavilion", description: "Oceanfront training studio with private instruction on request.", icon: "dumbbell" },
    { title: "24-Hour Concierge", description: "Bespoke itineraries, private transfers, and in-villa dining, any hour.", icon: "concierge-bell" },
  ],
  policies: {
    checkInTime: "15:00",
    checkOutTime: "12:00",
    cancellationPolicy:
      "Complimentary cancellation up to 7 days before arrival. Cancellations within 7 days are subject to a one-night charge.",
    childrenPolicy: "Children of all ages are welcome. Guests under 12 stay complimentary in a parent's room.",
    petsPolicy: "We welcome well-behaved pets under 15kg in select Garden Terrace rooms with advance notice.",
  },
  bookingRules: {
    minStayNights: 1,
    maxStayNights: 21,
    maxGuestsPerRoom: 6,
    currency: "ETB",
    taxRatePercent: 12,
  },
  seo: {
    title: "Aurelia Bay Resort & Spa — Luxury Oceanfront Escape",
    description:
      "Discover Aurelia Bay Resort & Spa, an intimate five-star sanctuary on a private stretch of coastline. Ocean-view suites, overwater villas, and a signature spa await.",
    keywords: ["luxury resort", "beach resort", "overwater villa", "spa resort", "Aurelia Bay"],
    ogImage: img("1566073771259-6a8506099945"),
  },
};

const roomsData = [
  {
    name: "Ocean View Deluxe Room",
    slug: "ocean-view-deluxe-room",
    type: "deluxe",
    description:
      "Floor-to-ceiling windows frame uninterrupted ocean views in this 42sqm sanctuary, appointed with hand-selected linens, a private balcony, and a marble rain shower.",
    shortDescription: "Uninterrupted ocean views with a private balcony.",
    pricePerNight: 8500,
    maxGuests: 2,
    sizeSqm: 42,
    bedType: "King Bed",
    images: [img("1566073771259-6a8506099945"), img("1591088398332-8a7791972843"), img("1611892440504-42a792e24d32")],
    amenities: ["Ocean view", "Private balcony", "Rain shower", "Air conditioning", "Complimentary minibar", "Nespresso machine"],
    totalRooms: 10,
    featured: true,
    rating: 4.8,
    reviewsCount: 214,
  },
  {
    name: "Garden Terrace Suite",
    slug: "garden-terrace-suite",
    type: "suite",
    description:
      "A tranquil 65sqm suite opening onto a private tropical garden terrace, with a separate living area and soaking tub for slow, unhurried mornings.",
    shortDescription: "Private garden terrace with a separate living area.",
    pricePerNight: 13500,
    maxGuests: 3,
    sizeSqm: 65,
    bedType: "King Bed + Daybed",
    images: [img("1542314831-068cd1dbfeeb"), img("1601565415267-724dbc5cf9b5"), img("1584132967334-10e028bd69f7")],
    amenities: ["Private garden terrace", "Separate living area", "Soaking tub", "Walk-in closet", "Complimentary minibar", "Butler service on request"],
    totalRooms: 8,
    featured: false,
    rating: 4.9,
    reviewsCount: 168,
  },
  {
    name: "Aurelia Grand Suite",
    slug: "aurelia-grand-suite",
    type: "suite",
    description:
      "Our signature 90sqm suite spans a full corner of the resort, with panoramic bay views, a private plunge pool, and a dedicated dining terrace for in-suite meals.",
    shortDescription: "Panoramic bay views with a private plunge pool.",
    pricePerNight: 19500,
    maxGuests: 4,
    sizeSqm: 90,
    bedType: "King Bed + Twin Beds",
    images: [img("1584132967334-10e028bd69f7"), img("1520250497591-112f2f40a3f4"), img("1571896349842-33c89424de2d")],
    amenities: ["Private plunge pool", "Panoramic bay views", "Dining terrace", "Butler service", "Walk-in closet", "Premium sound system"],
    totalRooms: 5,
    featured: true,
    rating: 5.0,
    reviewsCount: 96,
  },
  {
    name: "Overwater Villa",
    slug: "overwater-villa",
    type: "villa",
    description:
      "Suspended above the lagoon, this 120sqm villa features a glass floor panel over the reef, a private overwater deck, and direct lagoon access via a private staircase.",
    shortDescription: "Suspended over the lagoon with direct water access.",
    pricePerNight: 28500,
    maxGuests: 4,
    sizeSqm: 120,
    bedType: "King Bed",
    images: [img("1590490360182-c33d57733427"), img("1519449556851-5720b33024e7"), img("1445019980597-93fa8acb246c")],
    amenities: ["Glass floor panel", "Private overwater deck", "Direct lagoon access", "Outdoor rain shower", "Private bar", "24-hour butler"],
    totalRooms: 4,
    featured: true,
    rating: 5.0,
    reviewsCount: 74,
  },
  {
    name: "Horizon Penthouse",
    slug: "horizon-penthouse",
    type: "penthouse",
    description:
      "The resort's crown jewel — a 180sqm penthouse with 270-degree ocean views, a private rooftop infinity pool, and a dedicated culinary team available for private dining.",
    shortDescription: "270-degree ocean views with a private rooftop pool.",
    pricePerNight: 45000,
    maxGuests: 6,
    sizeSqm: 180,
    bedType: "2 King Beds + Twin Beds",
    images: [img("1520250497591-112f2f40a3f4"), img("1551882547-ff40c63fe5fa"), img("1445019980597-93fa8acb246c")],
    amenities: ["Private rooftop pool", "270-degree ocean views", "Private chef on request", "Home theatre", "Wine cellar", "Dedicated butler team"],
    totalRooms: 1,
    featured: false,
    rating: 5.0,
    reviewsCount: 22,
  },
];

const testimonialsData = [
  {
    guestName: "Charlotte Whitfield",
    guestLocation: "London, UK",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    quote:
      "Every detail felt considered. From the moment we arrived, Aurelia Bay set a new standard for what a resort stay could be.",
  },
  {
    guestName: "James Ferreira",
    guestLocation: "São Paulo, Brazil",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    quote:
      "The Overwater Villa exceeded every photo we'd seen. Waking up to the lagoon through the glass floor panel is unforgettable.",
  },
  {
    guestName: "Amara Okafor",
    guestLocation: "Lagos, Nigeria",
    avatarUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    quote:
      "Impeccable, quiet luxury. The spa alone is worth the trip — but the entire team made us feel like the only guests on the island.",
  },
  {
    guestName: "Elena Kovač",
    guestLocation: "Zagreb, Croatia",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    rating: 4,
    quote:
      "A genuinely serene escape. The Horizon Restaurant's tasting menu was the best meal of our entire trip through the region.",
  },
  {
    guestName: "Noah Bennett",
    guestLocation: "Sydney, Australia",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    quote:
      "We've stayed at resorts across three continents — Aurelia Bay's staff and setting are simply in a different class.",
  },
];

async function seed() {
  await connectDB();

  console.log("[seed] Clearing existing demo data...");
  await Promise.all([
    HotelSettings.deleteMany({}),
    Room.deleteMany({}),
    Testimonial.deleteMany({}),
    User.deleteMany({}),
    Booking.deleteMany({}),
  ]);

  console.log("[seed] Inserting hotel settings...");
  await HotelSettings.create(settingsData);

  console.log("[seed] Inserting rooms...");
  await Room.insertMany(roomsData);

  console.log("[seed] Inserting testimonials...");
  await Testimonial.insertMany(testimonialsData);

  console.log("[seed] Creating admin user...");
  await User.create({
    name: process.env.ADMIN_NAME || "Aurelia Admin",
    email: (process.env.ADMIN_EMAIL || "admin@aureliabay.com").toLowerCase(),
    password: process.env.ADMIN_PASSWORD || "AureliaBay2026!",
    role: "admin",
  });

  console.log("[seed] Done. Demo hotel: Aurelia Bay Resort & Spa");
  console.log(`[seed] Admin login: ${process.env.ADMIN_EMAIL || "admin@aureliabay.com"} / ${process.env.ADMIN_PASSWORD || "AureliaBay2026!"}`);

  await disconnectDB();
  process.exit(0);
}

seed().catch(async (err) => {
  console.error("[seed] Failed:", err);
  await disconnectDB();
  process.exit(1);
});
