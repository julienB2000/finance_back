import type { CreateCategoryDto } from "../schemas/category.schema.js";
import { db } from "../db/index.js";
import { categories } from "../db/schema.js";

export async function postACategory(category: CreateCategoryDto, userId: number) {
  const createdAccount = await db
    .insert(categories)
    .values({
      name: category.name,
      userId: userId,
    })
    .returning();

  if (!createdAccount || createdAccount == undefined) {
    const error = new Error("Error creating an account");
    (error as any).statusCode = 409;
    throw error;
  }
  return createdAccount[0];
}