import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.js";
import { accountSchema } from "../db/account.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getMyAccounts,
  postAccount,
} from "../controllers/account.controller.js";

const router = Router();

router.post("/", validate(accountSchema, "body"), authMiddleware, postAccount);
router.get("/", authMiddleware, getMyAccounts);

export default router;
