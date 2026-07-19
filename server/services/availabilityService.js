import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * A Room document represents a room *type* with `totalRooms` physical units.
 * Availability = totalRooms minus the sum of `roomsCount` across bookings whose
 * date range overlaps the requested range (excluding cancelled bookings).
 */
export async function getOverlappingBookingsCount(roomId, checkIn, checkOut, excludeBookingId = null) {
  const query = {
    room: new mongoose.Types.ObjectId(roomId),
    status: { $ne: "cancelled" },
    checkIn: { $lt: checkOut },
    checkOut: { $gt: checkIn },
  };
  if (excludeBookingId) query._id = { $ne: new mongoose.Types.ObjectId(excludeBookingId) };

  const [result] = await Booking.aggregate([
    { $match: query },
    { $group: { _id: null, total: { $sum: "$roomsCount" } } },
  ]);
  return result?.total || 0;
}

export async function getAvailableRoomsCount(roomId, checkIn, checkOut) {
  const room = await Room.findById(roomId);
  if (!room || !room.isActive) return 0;
  if (checkIn >= checkOut) return 0;

  const booked = await getOverlappingBookingsCount(roomId, checkIn, checkOut);
  return Math.max(room.totalRooms - booked, 0);
}

export async function assertRoomAvailable(roomId, checkIn, checkOut, roomsCount = 1) {
  const room = await Room.findById(roomId);
  if (!room || !room.isActive) throw new ApiError(404, "Room not found");

  if (checkIn >= checkOut) {
    throw new ApiError(400, "Check-out date must be after check-in date");
  }

  const booked = await getOverlappingBookingsCount(roomId, checkIn, checkOut);
  if (booked + roomsCount > room.totalRooms) {
    throw new ApiError(409, "Not enough rooms of this type available for the selected dates");
  }

  return room;
}

export async function isRoomAvailable(roomId, checkIn, checkOut, roomsCount = 1) {
  const room = await Room.findById(roomId);
  if (!room || !room.isActive) return false;
  if (checkIn >= checkOut) return false;

  const booked = await getOverlappingBookingsCount(roomId, checkIn, checkOut);
  return booked + roomsCount <= room.totalRooms;
}
