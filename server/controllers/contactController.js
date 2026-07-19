import Message from "../models/Message.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createMessage = asyncHandler(async (req, res) => {
  const message = await Message.create(req.body);
  res.status(201).json({ success: true, data: message });
});

export const listMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json({ success: true, data: messages });
});

export const markMessageRead = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );
  if (!message) throw new ApiError(404, "Message not found");
  res.json({ success: true, data: message });
});
