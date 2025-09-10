import { users, type User } from "../db/schema.js";
import { db } from "../db/index.js";
import bcrypt from "bcryptjs";
import type { RegisterUserDto } from "../db/auth.schema.js";
import { eq } from "drizzle-orm";

export async function register(user: RegisterUserDto): Promise<User> {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, user.email))
    .limit(1);

  if (existingUser[0]) {
    const error = new Error("Un utilisateur avec cet email existe déjà.");
    (error as any).statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(user.password, 10);

  const userCreated = await db
    .insert(users)
    .values({
      email: user.email,
      passwordHash: passwordHash,
    })
    .returning();

  if (!userCreated || userCreated.length === 0) {
    const error = new Error(
      "La création de l'utilisateur a échoué après l'insertion."
    );
    (error as any).statusCode = 500;
    throw error;
  }
  return userCreated[0];
}
