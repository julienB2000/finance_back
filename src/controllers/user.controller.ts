import { type NextFunction, type Request, type Response } from "express";
import {
  register,
  login,
  getMe,
  deleteUser,
} from "../services/user.service.js";
import type { loginUserDto, RegisterUserDto } from "../schemas/auth.schema.js";
import type { RequestWithUser } from "../middlewares/auth.middleware.js";

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

export const me = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const me = await getMe(req.user.id, req.user.email);
    res.status(201).json({ message: "This is me", me: me });
  } catch (error) {
    next(error);
  }
};

export const removeUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id as string);
    const deletedUser = await deleteUser(id);
    res.status(201).json({ message: `User is deleted`, user: deletedUser });
  } catch (error) {
    next(error);
  }
};
