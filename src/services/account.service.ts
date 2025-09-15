import type { CreateAccountDto } from "../db/account.schema.js";
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
}
