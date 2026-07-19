import Testimonial from "../models/Testimonial.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listTestimonials = asyncHandler(async (req, res) => {
  const filter = req.query.includeUnpublished ? {} : { isPublished: true };
  const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, data: testimonials });
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json({ success: true, data: testimonial });
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!testimonial) throw new ApiError(404, "Testimonial not found");
  res.json({ success: true, data: testimonial });
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) throw new ApiError(404, "Testimonial not found");
  res.json({ success: true, data: {} });
});
