import { Router } from "express";
import { body } from "express-validator";
import {
  listRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController.js";
import { validate } from "../middleware/validate.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

const roomValidators = [
  body("name").notEmpty().withMessage("Name is required"),
  body("slug").notEmpty().withMessage("Slug is required"),
  body("pricePerNight").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("maxGuests").isInt({ min: 1 }).withMessage("Max guests must be at least 1"),
  body("totalRooms").isInt({ min: 1 }).withMessage("Total rooms must be at least 1"),
];

router.get("/", listRooms);
router.get("/:idOrSlug", getRoom);
router.post("/", protect, authorize("admin"), roomValidators, validate, createRoom);
router.put("/:id", protect, authorize("admin"), updateRoom);
router.delete("/:id", protect, authorize("admin"), deleteRoom);

export default router;
