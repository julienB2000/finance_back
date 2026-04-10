import { z } from "zod";

export const summaryQuerySchema = z.object({
  year: z.coerce
    .number({
      error: (issue) =>
        issue.input === undefined ? "The year is required" : "Not a number",
    })
    .int()
    .min(2000, "L'année doit être après 2000")
    .max(2050, "L'année est trop lointaine"),

  month: z.coerce
    .number({
      error: (issue) => "Not a number",
    })
    .int()
    .min(1, "Le mois doit être entre 1 et 12")
    .max(12, "Le mois doit être entre 1 et 12")
    .optional(),
});

export type summaryQuerySchemaDto = z.infer<typeof summaryQuerySchema>;
