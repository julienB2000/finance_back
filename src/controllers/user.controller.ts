import { type NextFunction, type Request, type Response } from "express";
import { register } from "../services/user.service.js";
import type { RegisterUserDto } from "../db/auth.schema.js";

export const postUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData: RegisterUserDto = req.body;
  try {
    const returnUser = await register(userData);
    res.status(201).json({ user: returnUser });
  } catch (error) {
    next(error);
  }
};
