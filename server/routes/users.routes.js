import { Router } from "express";
import { body } from "express-validator";
import { listUsers, updateUserRole } from "../controllers/userController.js";
import { validate } from "../middleware/validate.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.use(protect, authorize("admin"));

router.get("/", listUsers);
router.patch(
  "/:id/role",
  [body("role").isIn(["admin", "staff"]).withMessage("Role must be admin or staff")],
  validate,
  updateUserRole
);

export default router;
