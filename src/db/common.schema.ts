// src/schemas/common.schema.ts
import { z } from "zod";

export const idParamSchema = z.object({
  id: z.coerce
    .number()
    .int({ message: "L'ID doit être un nombre entier" })
    .positive({ message: "L'ID doit être un nombre positif" }),
});
