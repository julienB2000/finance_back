import { and, eq } from "drizzle-orm";
import type { CreateAccountDto } from "../schemas/account.schema.js";
import { db } from "../db/index.js";
import { accounts, type Account } from "../db/schema.js";

export async function postAnAccount(name: CreateAccountDto, userId: number) {
  const createdAccount = await db
    .insert(accounts)
    .values({
      name: name.name,
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

export async function getUserAccount(userId: number) {
  const userAccounts = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, userId));

  if (!userAccounts) {
    const error = new Error("You dont have any account");
    (error as any).statusCode = 409;
    throw error;
  }
  return userAccounts;
}

export async function deleteUserAccount(userId: number, accountId: number) {
  const deletedAccountArray = await db
    .delete(accounts)   
    .where(and(eq(accounts.userId, userId), eq(accounts.id, accountId))).returning();
  const deletedAccount = deletedAccountArray[0]
  if (!deletedAccount) {
    const error = new Error("This account cannot be deleted");
    (error as any).statusCode = 409;    
    throw error;
  }
  return deletedAccount;
}
