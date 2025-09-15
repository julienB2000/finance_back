import { type Request, type Response, type NextFunction } from "express";
import { ZodError, type ZodSchema } from "zod";

// Notre usine accepte maintenant le schéma ET la source des données
export const validate =
  (schema: ZodSchema, source: "body" | "params" | "query") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // On choisit la bonne partie de la requête à valider
      let dataToValidate;
      switch (source) {
        case "body":
          dataToValidate = req.body;
          break;
        case "params":
          dataToValidate = req.params;
          break;
        case "query":
          dataToValidate = req.query;
          break;
      }

      // On parse les données sélectionnées
      schema.parse(dataToValidate);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));
        return res
          .status(400)
          .json({ error: "Invalid data", details: errorMessages });
      }

      res.status(500).json({ error: "Internal Server Error" });
    }
  };
