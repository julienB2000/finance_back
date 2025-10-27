import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  integer,
  numeric,
  pgEnum,
  date
} from "drizzle-orm/pg-core";

// On définit la table "users" avec ses colonnes
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: varchar('role').default('USER').notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100}).notNull(),
  userId: integer("user_id").notNull().references(() => users.id, {onDelete: "cascade"}),
});

export const transactionTypeEnum = pgEnum('transaction_type', ["expense", "income"])

export const transactions = pgTable("transaction", {
    id: serial("id").primaryKey(),
    amount: numeric("amount", {precision: 10, scale: 2}).notNull(),
    type: transactionTypeEnum('type').notNull(),
    description: text('description'),
    transactionDate: date('transaction_date').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
    accountId: integer('account_id')
    .notNull()
    .references(() => accounts.id, { onDelete: 'cascade' }),
    categoryId: integer('category_id')
    .references(() => categories.id, { onDelete: 'set null' }),
});

export type Transaction = typeof transactions.$inferSelect;

export type User = typeof users.$inferSelect;

export type Account = typeof accounts.$inferSelect;

export type Categories = typeof categories.$inferSelect;
