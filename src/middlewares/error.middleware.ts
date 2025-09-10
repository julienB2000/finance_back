import type { ErrorRequestHandler } from "express";

// src/middlewares/error.middleware.ts
export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  // On lit le statut attaché. Si absent, c'est une erreur 500 (inattendue).
  const statusCode = err.statusCode || 500;
  const message = err.message || "Erreur interne du serveur";

  // En production, on ne devrait jamais envoyer les détails d'une erreur 500 au client.
  // Mais on doit les logger pour le débogage.
  if (statusCode === 500) {
    console.error(err);
  }

  // On envoie la réponse JSON finale.
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
