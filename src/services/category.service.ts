
import { and, eq } from "drizzle-orm";
import type { CreateCategoryDto, UpdateCategoryDto } from "../schemas/category.schema.js";
import { db } from "../db/index.js";
import { categories, type Categories } from "../db/schema.js";

export async function postACategory(category: CreateCategoryDto, userId: number): Promise<Categories> {
  const createdAccount = await db
    .insert(categories)
    .values({
      name: category.name,
      userId: userId,
    })
    .returning();

  if (!createdAccount[0]  || createdAccount[0] == undefined) {
    const error = new Error("Error creating an account");
    (error as any).statusCode = 409;
    throw error;
  }
  return createdAccount[0];
}

export async function getUserCategory(userId: number): Promise<Array<Categories>>{
  const userCategories = await db.select().from(categories).where(eq(categories.userId, userId ))

  if (!userCategories) {
    const error = new Error("You dont have any category");
    (error as any).statusCode = 409;
    throw error;
  }
  return userCategories
}

export async function updateUserCategory(category: UpdateCategoryDto, categoryId: number, userId: number): Promise<Categories> {
  const modifiedCategory = await db.update(categories).set(category).where(and(eq(categories.id, categoryId), eq(categories.userId, userId))).returning()

    if (!modifiedCategory[0] || modifiedCategory[0] == undefined) {
      const error = new Error("This category does not exist");
      (error as any).statusCode = 409;
      throw error;
    }
    return modifiedCategory[0];
}

export async function deleteUserCategory(categoryId: number, userId: number): Promise<Categories> {
  const deletedCategory = await db.delete(categories).where(and(eq(categories.userId, userId), eq(categories.id, categoryId))).returning()

    if (!deletedCategory[0] || deletedCategory[0] == undefined) {
    const error = new Error("You dont have any category");
    (error as any).statusCode = 409;
    throw error;
  }
  return deletedCategory[0]
}