import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.js";
import { accountSchema } from "../schemas/account.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getMyAccounts,
  postAccount,
} from "../controllers/account.controller.js";
import { categorySchema } from "../schemas/category.schema.js";
import { postCategory } from "../controllers/category.controller.js";

const router = Router();

router.post("/", validate(categorySchema, "body"), authMiddleware, postCategory);

export default router;