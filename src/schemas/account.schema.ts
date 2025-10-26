import { z } from "zod";

export const accountSchema = z.object({
  name: z.string().min(1, { message: "Un nom est requis" }),
}); 

export type CreateAccountDto = z.infer<typeof accountSchema>;
