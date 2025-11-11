import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
  createTransactionSchema,
  updateTransactionSchema,
} from "../schemas/transaction.schema.js";
import {
  deleteTransaction,
  getTransactions,
  postTransaction,
  updateTransaction,
} from "../controllers/transaction.controller.js";
import { idParamSchema } from "../schemas/common.schema.js";

const router = Router();

router.post(
  "/",
  validate(createTransactionSchema, "body"),
  authMiddleware,
  postTransaction
);
router.get("/", authMiddleware, getTransactions);
router.delete(
  "/:id",
  validate(idParamSchema, "params"),
  authMiddleware,
  deleteTransaction
);

router.patch(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateTransactionSchema, "body"),
  authMiddleware,
  updateTransaction
);
export default router;
