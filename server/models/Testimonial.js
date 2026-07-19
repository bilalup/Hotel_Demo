import mongoose from "mongoose";

const { Schema } = mongoose;

const TestimonialSchema = new Schema(
  {
    guestName: { type: String, required: true },
    guestLocation: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    quote: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", TestimonialSchema);
