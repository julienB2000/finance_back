import { type Request, type Response, type NextFunction } from "express";
import { ZodError, type ZodSchema } from "zod";

// C'est une "factory" : une fonction qui retourne une autre fonction (le middleware).
// Elle prend un schéma Zod en argument.
export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      // On essaie de valider le corps de la requête avec le schéma fourni.
      schema.parse(req.body);

      // Si la validation réussit, on passe au prochain middleware ou au contrôleur.
      next();
    } catch (error) {
      // Si la validation échoue, Zod lève une ZodError.
      if (error instanceof ZodError) {
        // On formate les erreurs pour que le client sache ce qui ne va pas.
        const errorMessages = error.issues.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message.toLowerCase()}`,
        }));
        return res
          .status(400)
          .json({ error: "Invalid data", details: errorMessages });
      }

      // Pour tout autre type d'erreur, on envoie une erreur 500.
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
