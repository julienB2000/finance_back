import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.js";
import { accountSchema } from "../db/account.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { postAccount } from "../controllers/account.controller.js";

const router = Router();

router.post("/", validate(accountSchema, "body"), authMiddleware, postAccount);

export default router;
