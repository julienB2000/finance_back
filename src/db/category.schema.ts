import z from "zod";

export const categorySchema = z.object({
    name: z.string().min(1, { message: "Un nom est requis" }),
})

export type CreateCategoryDto = z.infer<typeof categorySchema>;