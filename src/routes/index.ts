import { Router } from "express";
import userRoutes from "./user.routes.js";
import accountRoutes from "./account.routes.js";

const router = Router();

// On dit au routeur principal d'utiliser les routes des utilisateurs
// pour tout ce qui commence par /users
router.use("/users", userRoutes);
router.use("/accounts", accountRoutes);

export default router;
