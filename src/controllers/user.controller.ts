import { type NextFunction, type Request, type Response } from "express";
import { register, login } from "../services/user.service.js";
import type { loginUserDto, RegisterUserDto } from "../db/auth.schema.js";

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

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const credentials: loginUserDto = req.body;
  try {
    const returnUser = await login(credentials.email, credentials.password);
    res.status(201).json({ user: returnUser });
  } catch (error) {
    next(error);
  }
};
