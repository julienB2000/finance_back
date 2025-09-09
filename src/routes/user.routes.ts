import { Router } from "express";
import { postUser } from "../controllers/user.controller.js"; // On importe la fonction du contrôleur
import { validate } from "../middlewares/validation.middleware.js";
import { registerUserSchema } from "../db/auth.schema.js";

const router = Router();

router.post("/register", validate(registerUserSchema), postUser);

export default router;
