import { and, between, eq, gte, lte, sql, sum } from "drizzle-orm";
import { db } from "../db/index.js";
import { categories, transactions, type Categories } from "../db/schema.js";
import { monthToNewYear } from "../tools/tools.js";
import type { summaryQuerySchemaDto } from "../schemas/stats.schema.js";

export async function getSummary(userId: number, date: summaryQuerySchemaDto) {
  const { year, month } = date;

  const beginDateStr =
    month === undefined
      ? `${year}-01-01`
      : new Date(year, month - 1, 1).toISOString().split("T")[0]!;

  const endDateStr =
    month === undefined
      ? `${year}-12-31`
      : new Date(year, month, 0).toISOString().split("T")[0]!;

  console.log("BEGIN = ", beginDateStr);
  console.log("END = ", endDateStr);

  const filteredTransactions = await db
    .select()
    .from(transactions)
    .where(
      and(
        eq(transactions.userId, userId),
        between(transactions.transactionDate, beginDateStr, endDateStr),
      ),
    );

  const totalAmountResult = await db
    .select({
      total: sql<string>`
      SUM(
        CASE 
          WHEN type = 'income' THEN ${transactions.amount} 
          ELSE -${transactions.amount} 
        END
      )
    `.mapWith(String),
    })
    .from(transactions)
    .where(
      and(
        eq(transactions.userId, userId),
        between(transactions.transactionDate, beginDateStr, endDateStr),
      ),
    );
  return {
    total: totalAmountResult[0] ? totalAmountResult[0].total : 0,
    transactions: filteredTransactions,
  };
}
