import { Router } from "express";
import {
  listTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", listTestimonials);
router.post("/", protect, authorize("admin"), createTestimonial);
router.put("/:id", protect, authorize("admin"), updateTestimonial);
router.delete("/:id", protect, authorize("admin"), deleteTestimonial);

export default router;
