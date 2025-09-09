import type { NextFunction, Request, Response } from "express";
import { users } from "../db/schema.js";
import { db } from "../db/index.js";

export async function register(user: any) {
  const userCreated = await db.insert(users).values(user).returning();
  return userCreated;
}
