import { Router } from "express";
import { body } from "express-validator";
import {
  checkAvailability,
  createBooking,
  listBookings,
  getBooking,
  updateBookingStatus,
  getDashboardStats,
} from "../controllers/bookingController.js";
import { validate } from "../middleware/validate.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

const bookingValidators = [
  body("roomId").isMongoId().withMessage("Valid roomId is required"),
  body("checkIn").isISO8601().withMessage("Valid checkIn date is required"),
  body("checkOut").isISO8601().withMessage("Valid checkOut date is required"),
  body("roomsCount").optional().isInt({ min: 1 }).withMessage("Rooms count must be at least 1"),
  body("guests.adults").isInt({ min: 1 }).withMessage("At least 1 adult is required"),
  body("guestDetails.fullName").notEmpty().withMessage("Full name is required"),
  body("guestDetails.email").isEmail().withMessage("Valid email is required"),
  body("guestDetails.phone").notEmpty().withMessage("Phone number is required"),
];

router.get("/availability", checkAvailability);
router.post("/", bookingValidators, validate, createBooking);

router.get("/stats", protect, authorize("admin"), getDashboardStats);
router.get("/", protect, authorize("admin"), listBookings);
router.get("/:id", protect, authorize("admin"), getBooking);
router.patch("/:id/status", protect, authorize("admin"), updateBookingStatus);

export default router;
