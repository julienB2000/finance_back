import { Router } from "express";
import {
  postUser,
  loginUser,
  me,
  removeUser,
} from "../controllers/user.controller.js"; // On importe la fonction du contrôleur
import { validate } from "../middlewares/validation.middleware.js";
import { loginUserSchema, registerUserSchema } from "../schemas/auth.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { idParamSchema } from "../schemas/common.schema.js";

const router = Router();

router.post("/register", validate(registerUserSchema, "body"), postUser);
router.get("/login", validate(loginUserSchema, "body"), loginUser);
router.get("/me", authMiddleware, me);
router.delete(
  "/:id",
  validate(idParamSchema, "params"),
  authMiddleware,
  removeUser
);

export default router;
