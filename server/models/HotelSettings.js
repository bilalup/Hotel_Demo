import mongoose from "mongoose";

const { Schema } = mongoose;

const HotelSettingsSchema = new Schema(
  {
    // Only one settings document should exist per deployment (single-tenant white-label instance)
    slug: { type: String, required: true, unique: true, default: "default" },

    hotelName: { type: String, required: true },
    tagline: { type: String, default: "" },
    description: { type: String, default: "" },

    logoUrl: { type: String, default: "" },
    faviconUrl: { type: String, default: "" },

    colors: {
      primary: { type: String, default: "#0B0B0C" },
      secondary: { type: String, default: "#C6A15B" },
      accent: { type: String, default: "#F7F3EC" },
    },

    contact: {
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      whatsapp: { type: String, default: "" },
      address: { type: String, default: "" },
      mapEmbedUrl: { type: String, default: "" },
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
    },

    social: {
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },

    heroImages: [{ type: String }],
    galleryImages: [
      {
        url: { type: String, required: true },
        category: { type: String, default: "hotel" },
        caption: { type: String, default: "" },
      },
    ],

    amenities: [
      {
        title: { type: String, required: true },
        description: { type: String, default: "" },
        icon: { type: String, default: "sparkles" },
      },
    ],

    policies: {
      checkInTime: { type: String, default: "15:00" },
      checkOutTime: { type: String, default: "11:00" },
      cancellationPolicy: { type: String, default: "" },
      childrenPolicy: { type: String, default: "" },
      petsPolicy: { type: String, default: "" },
    },

    bookingRules: {
      minStayNights: { type: Number, default: 1 },
      maxStayNights: { type: Number, default: 30 },
      maxGuestsPerRoom: { type: Number, default: 4 },
      currency: { type: String, default: "USD" },
      taxRatePercent: { type: Number, default: 0 },
    },

    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      keywords: [{ type: String }],
      ogImage: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("HotelSettings", HotelSettingsSchema);
