import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { categorySchema, updateCategorySchema } from "../schemas/category.schema.js";
import { deleteCategory, getCategory, postCategory, updateCategory } from "../controllers/category.controller.js";
import { idParamSchema } from "../schemas/common.schema.js";

const router = Router();

router.post("/", validate(categorySchema, "body"), authMiddleware, postCategory);
router.get("/", authMiddleware, getCategory)
router.delete("/:id", validate(idParamSchema, "params"), authMiddleware, deleteCategory)
router.patch("/:id", validate(idParamSchema, "params"), validate(updateCategorySchema, "body"), authMiddleware, updateCategory)

export default router;