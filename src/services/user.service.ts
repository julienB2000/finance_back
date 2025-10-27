import { users } from "../db/schema.js";
import { db } from "../db/index.js";
import bcrypt from "bcryptjs";
import type { RegisterUserDto, safeUser } from "../schemas/auth.schema.js";
import { and, eq } from "drizzle-orm";

import jwt from "jsonwebtoken";

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

  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!);

  const { passwordHash, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
}

export async function getMe(id: number, email: string): safeUser {
  const meArray = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email), eq(users.id, id)))
    .limit(1);
  const me = meArray[0];

  if (!me) {
    const error = new Error("Utilisateur non trouvé.");
    (error as any).statusCode = 404;
    throw error;
  }

  const { passwordHash, ...meWithoutPassword } = me;
  return meWithoutPassword;
}

export async function deleteUser(id: number): safeUser {
  const deletedUserArray = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();
  const deletedUser = deletedUserArray[0];
  if (!deletedUser) {
    const error = new Error("User not found");
    (error as any).statusCode = 404;
    throw error;
  }
  const { passwordHash, ...userWithoutPassword } = deletedUser;
  return userWithoutPassword;
}
