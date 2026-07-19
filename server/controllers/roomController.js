import Room from "../models/Room.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getAvailableRoomsCount } from "../services/availabilityService.js";

export const listRooms = asyncHandler(async (req, res) => {
  const { minPrice, maxPrice, guests, type, includeInactive, checkIn, checkOut } = req.query;

  const filter = {};
  if (!includeInactive) filter.isActive = true;
  if (type) filter.type = type;
  if (guests) filter.maxGuests = { $gte: Number(guests) };
  if (minPrice || maxPrice) {
    filter.pricePerNight = {};
    if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
    if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
  }

  const rooms = await Room.find(filter).sort({ featured: -1, pricePerNight: 1 }).lean();

  if (checkIn && checkOut) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    await Promise.all(
      rooms.map(async (room) => {
        room.availableCount = await getAvailableRoomsCount(room._id, checkInDate, checkOutDate);
      })
    );
  }

  res.json({ success: true, data: rooms });
});

export const getRoom = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const { checkIn, checkOut } = req.query;
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);

  const room = await Room.findOne(isObjectId ? { _id: idOrSlug } : { slug: idOrSlug }).lean();
  if (!room) throw new ApiError(404, "Room not found");

  if (checkIn && checkOut) {
    room.availableCount = await getAvailableRoomsCount(room._id, new Date(checkIn), new Date(checkOut));
  }

  res.json({ success: true, data: room });
});

export const createRoom = asyncHandler(async (req, res) => {
  const room = await Room.create(req.body);
  res.status(201).json({ success: true, data: room });
});

export const updateRoom = asyncHandler(async (req, res) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!room) throw new ApiError(404, "Room not found");
  res.json({ success: true, data: room });
});

export const deleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findByIdAndDelete(req.params.id);
  if (!room) throw new ApiError(404, "Room not found");
  res.json({ success: true, data: {} });
});
