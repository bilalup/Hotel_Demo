import mongoose from "mongoose";

const { Schema } = mongoose;

const RoomSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    type: {
      type: String,
      enum: ["standard", "deluxe", "suite", "villa", "penthouse"],
      default: "deluxe",
    },
    description: { type: String, default: "" },
    shortDescription: { type: String, default: "" },

    pricePerNight: { type: Number, required: true, min: 0 },
    maxGuests: { type: Number, required: true, min: 1, default: 2 },
    sizeSqm: { type: Number, default: 0 },
    bedType: { type: String, default: "King Bed" },

    images: [{ type: String }],
    amenities: [{ type: String }],

    totalRooms: { type: Number, required: true, min: 1, default: 3 },

    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    rating: { type: Number, default: 4.8, min: 0, max: 5 },
    reviewsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

RoomSchema.index({ pricePerNight: 1 });
RoomSchema.index({ type: 1 });

export default mongoose.model("Room", RoomSchema);
