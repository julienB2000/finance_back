import { and, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { transactions, type Transaction } from "../db/schema.js";
import type {
  createTransactionSchemaDto,
  UpdateTransactionDto,
} from "../schemas/transaction.schema.js";

export async function postATransaction(
  transaction: createTransactionSchemaDto,
  userId: number
): Promise<Transaction> {
  const { amount, transactionDate, ...restOfTransaction } = transaction;

  const dataToInsert = {
    ...restOfTransaction,
    amount: amount.toString(),
    userId: userId,
    transactionDate: transactionDate.toString(),
  };
  const addedTransaction = await db
    .insert(transactions)
    .values(dataToInsert)
    .returning();

  if (!addedTransaction[0] || addedTransaction[0] == undefined) {
    const error = new Error("Error creating an account");
    (error as any).statusCode = 409;
    throw error;
  }
  return addedTransaction[0];
}

export async function getUserTransaction(
  userId: number
): Promise<Array<Transaction>> {
  const userTransactions = await db
    .select()
    .from(transactions)
    .where(eq(transactions.userId, userId));

  if (!userTransactions || userTransactions == undefined) {
    const error = new Error("Error deleting a transaction");
    (error as any).statusCode = 409;
    throw error;
  }
  return userTransactions;
}

export async function deleteATransaction(
  transactionId: number,
  userId: number
): Promise<Transaction> {
  const deletedTransaction = await db
    .delete(transactions)
    .where(
      and(eq(transactions.id, transactionId), eq(transactions.userId, userId))
    )
    .returning();

  if (!deletedTransaction[0] || deletedTransaction[0] == undefined) {
    const error = new Error("Error deleting a transaction");
    (error as any).statusCode = 409;
    throw error;
  }
  return deletedTransaction[0];
}

export async function updateATransaction(
  transaction: UpdateTransactionDto,
  userId: number,
  transactionId: number
): Promise<Transaction> {
  const { amount, transactionDate, ...restOfTransaction } = transaction;

  const dataToInsert = {
    ...restOfTransaction,
    amount: amount?.toString(),
    transactionDate: transactionDate?.toString(),
  };
  const deletedTransaction = await db
    .update(transactions)
    .set(dataToInsert)
    .where(
      and(eq(transactions.id, transactionId), eq(transactions.userId, userId))
    )
    .returning();

  if (!deletedTransaction[0] || deletedTransaction[0] == undefined) {
    const error = new Error("Error deleting a transaction");
    (error as any).statusCode = 409;
    throw error;
  }
  return deletedTransaction[0];
}
