import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config";

// On crée une "piscine" de connexions.
// Pool est assez intelligent pour lire l'URL de connexion.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: false, // Important pour le développement local avec Docker
});

// On donne cette piscine à Drizzle pour qu'il puisse l'utiliser.
export const db = drizzle(pool);
