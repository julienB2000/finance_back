import { users, type User } from "../db/schema.js";
import { db } from "../db/index.js";
import bcrypt from "bcryptjs";
import type { loginUserDto, RegisterUserDto } from "../db/auth.schema.js";
import { and, eq } from "drizzle-orm";

export async function register(user: RegisterUserDto) {
  // Promise<Omit<User, "passwordHash">>
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
    .returning({
      id: users.id,
      email: users.email,
      createdAt: users.createdAt,
    });

  if (!userCreated || userCreated.length === 0) {
    const error = new Error(
      "La création de l'utilisateur a échoué après l'insertion."
    );
    (error as any).statusCode = 500;
    throw error;
  }
  return userCreated[0];
}

export async function login(email: string, password: string) {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  const user = existingUser[0];

  if (!user) throw new Error("Email ou mot de passe incorrect.");

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordCorrect) {
    throw new Error("Email ou mot de passe incorrect.");
  }
  const { passwordHash, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
