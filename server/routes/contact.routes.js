import { Router } from "express";
import { body } from "express-validator";
import { createMessage, listMessages, markMessageRead } from "../controllers/contactController.js";
import { validate } from "../middleware/validate.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("message").notEmpty().withMessage("Message is required"),
  ],
  validate,
  createMessage
);

router.get("/", protect, authorize("admin"), listMessages);
router.patch("/:id/read", protect, authorize("admin"), markMessageRead);

export default router;
