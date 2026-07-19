import mongoose from "mongoose";

const { Schema } = mongoose;

const BookingSchema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    roomsCount: { type: Number, required: true, min: 1, default: 1 },

    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: {
      adults: { type: Number, required: true, min: 1, default: 2 },
      children: { type: Number, default: 0, min: 0 },
    },

    guestDetails: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      specialRequests: { type: String, default: "" },
    },

    nights: { type: Number, required: true, min: 1 },
    pricePerNight: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    taxAmount: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
    currency: { type: String, default: "USD" },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },

    confirmationCode: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

BookingSchema.index({ room: 1, checkIn: 1, checkOut: 1 });

export default mongoose.model("Booking", BookingSchema);
