import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { idParamSchema } from "../schemas/common.schema.js";
import { summaryQuerySchema } from "../schemas/stats.schema.js";
import { getStats } from "../controllers/stats.controller.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  validate(summaryQuerySchema, "query"),
  getStats,
);
export default router;
