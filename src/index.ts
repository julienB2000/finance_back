// src/index.ts
import express from "express";
import mainRouter from "./routes/index.js"; // On importe le routeur principal
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser le JSON des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// On dit à Express d'utiliser notre routeur principal
// pour toutes les routes qui commencent par /api
app.use("/api", mainRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
