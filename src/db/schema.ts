import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

// On définit la table "users" avec ses colonnes
export const users = pgTable("users", {
  // Un ID numérique qui s'auto-incrémente (classique)
  id: serial("id").primaryKey(),

  // Une adresse email qui doit être unique
  email: varchar("email", { length: 255 }).notNull().unique(),

  // Le mot de passe haché
  passwordHash: text("password_hash").notNull(),

  // La date de création, avec une valeur par défaut
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
