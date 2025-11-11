// Fichier: src/schemas/transaction.schema.ts

import { z } from "zod";

export const createTransactionSchema = z.object({
  amount: z.coerce
    .number({
      error: (issue) =>
        issue.input === undefined ? "The amount is required" : "Not a number",
    })
    .positive({ message: "Le montant doit être supérieur à zéro" }),

  type: z.enum(["expense", "income"], {
    error: (issue) =>
      issue.input === undefined
        ? "The transaction type is required"
        : "Not a good transaction Type",
  }),

  description: z.string().min(1).optional(),

  transactionDate: z.coerce.date({
    error: (issue) =>
      issue.input === undefined ? "This field is required" : "Not a date",
  }),

  accountId: z.coerce
    .number({
      error: (issue) =>
        issue.input === undefined ? "This field is required" : "Not a number",
    })
    .int({ message: "L'ID du compte doit être un entier" })
    .positive({ message: "L'ID du compte doit être positif" }),

  categoryId: z.coerce
    .number({
      error: (issue) =>
        issue.input === undefined ? "This field is required" : "Not a number",
    })
    .int({ message: "L'ID de la catégorie doit être un entier" })
    .positive({ message: "L'ID de la catégorie doit être positif" })
    .optional(),
});

export type createTransactionSchemaDto = z.infer<
  typeof createTransactionSchema
>;

export const updateTransactionSchema = createTransactionSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Le corps de la requête ne peut pas être vide.",
  });

export type UpdateTransactionDto = z.infer<typeof updateTransactionSchema>;
