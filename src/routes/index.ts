import { Router } from "express";
import userRoutes from "./user.routes.js"; // On importera les routes des utilisateurs ici

const router = Router();

// On dit au routeur principal d'utiliser les routes des utilisateurs
// pour tout ce qui commence par /users
router.use("/users", userRoutes);

export default router;
