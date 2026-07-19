import crypto from "crypto";
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import HotelSettings from "../models/HotelSettings.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { assertRoomAvailable, getAvailableRoomsCount } from "../services/availabilityService.js";

function nightsBetween(checkIn, checkOut) {
  const ms = new Date(checkOut).setHours(0, 0, 0, 0) - new Date(checkIn).setHours(0, 0, 0, 0);
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

function generateConfirmationCode() {
  return `AUR-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
}

export const checkAvailability = asyncHandler(async (req, res) => {
  const { roomId, checkIn, checkOut, roomsCount } = req.query;
  if (!roomId || !checkIn || !checkOut) {
    throw new ApiError(400, "roomId, checkIn, and checkOut are required");
  }

  const requestedCount = Number(roomsCount) || 1;
  const availableCount = await getAvailableRoomsCount(roomId, new Date(checkIn), new Date(checkOut));
  const available = availableCount >= requestedCount;
  res.json({ success: true, data: { available, availableCount } });
});

export const createBooking = asyncHandler(async (req, res) => {
  const { roomId, checkIn, checkOut, guests, guestDetails } = req.body;
  const roomsCount = Number(req.body.roomsCount) || 1;

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const room = await assertRoomAvailable(roomId, checkInDate, checkOutDate, roomsCount);

  const nights = nightsBetween(checkInDate, checkOutDate);
  if (nights < 1) throw new ApiError(400, "Stay must be at least 1 night");

  const totalGuests = (guests?.adults || 1) + (guests?.children || 0);
  if (totalGuests > room.maxGuests * roomsCount) {
    throw new ApiError(400, `Selected rooms accommodate up to ${room.maxGuests * roomsCount} guests`);
  }

  const settings = await HotelSettings.findOne({ slug: "default" });
  const taxRate = settings?.bookingRules?.taxRatePercent || 0;
  const currency = settings?.bookingRules?.currency || "USD";

  const subtotal = room.pricePerNight * nights * roomsCount;
  const taxAmount = Math.round(subtotal * (taxRate / 100) * 100) / 100;
  const totalPrice = Math.round((subtotal + taxAmount) * 100) / 100;

  const booking = await Booking.create({
    room: room._id,
    roomsCount,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    guests,
    guestDetails,
    nights,
    pricePerNight: room.pricePerNight,
    subtotal,
    taxAmount,
    totalPrice,
    currency,
    status: "pending",
    paymentStatus: "unpaid",
    confirmationCode: generateConfirmationCode(),
  });

  await booking.populate("room");

  res.status(201).json({ success: true, data: booking });
});

export const listBookings = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;

  const filter = {};
  if (status) filter.status = status;

  const skip = (Number(page) - 1) * Number(limit);
  const [bookings, total] = await Promise.all([
    Booking.find(filter).populate("room").sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Booking.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: bookings,
    meta: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / Number(limit)) },
  });
});

export const getBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("room");
  if (!booking) throw new ApiError(404, "Booking not found");
  res.json({ success: true, data: booking });
});

export const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status, paymentStatus } = req.body;

  const update = {};
  if (status) update.status = status;
  if (paymentStatus) update.paymentStatus = paymentStatus;

  const booking = await Booking.findByIdAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true,
  }).populate("room");
  if (!booking) throw new ApiError(404, "Booking not found");

  res.json({ success: true, data: booking });
});

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalBookings, pendingCount, confirmedCount, rooms, recentBookings, revenueAgg, roomUnitsAgg] =
    await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: "pending" }),
      Booking.countDocuments({ status: "confirmed" }),
      Room.countDocuments({ isActive: true }),
      Booking.find().populate("room").sort({ createdAt: -1 }).limit(8),
      Booking.aggregate([
        { $match: { status: { $ne: "cancelled" } } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } },
      ]),
      Room.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: null, total: { $sum: "$totalRooms" } } },
      ]),
    ]);

  res.json({
    success: true,
    data: {
      totalBookings,
      pendingCount,
      confirmedCount,
      activeRooms: rooms,
      totalRoomUnits: roomUnitsAgg[0]?.total || 0,
      totalRevenue: revenueAgg[0]?.total || 0,
      recentBookings,
    },
  });
});
