import { Router } from "express";
import { postUser, loginUser } from "../controllers/user.controller.js"; // On importe la fonction du contrôleur
import { validate } from "../middlewares/validation.middleware.js";
import { loginUserSchema, registerUserSchema } from "../db/auth.schema.js";

const router = Router();

router.post("/register", validate(registerUserSchema), postUser);
router.get("/login", validate(loginUserSchema), loginUser);

export default router;
