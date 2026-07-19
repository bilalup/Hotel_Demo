import HotelSettings from "../models/HotelSettings.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await HotelSettings.findOne({ slug: "default" });
  if (!settings) throw new ApiError(404, "Hotel settings not configured — run the seed script");
  res.json({ success: true, data: settings });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await HotelSettings.findOneAndUpdate({ slug: "default" }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!settings) throw new ApiError(404, "Hotel settings not configured — run the seed script");
  res.json({ success: true, data: settings });
});
