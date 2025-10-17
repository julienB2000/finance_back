import { type NextFunction, type Response } from "express";
import type { RequestWithUser } from "../middlewares/auth.middleware.js";
import { postACategory } from "../services/category.service.js";

export const postCategory = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const myId = req.user.id;
    const category = req.body;
    const categoryPosted = await postACategory(category, myId);
    res
      .status(201)
      .json({ message: "account Created", account: categoryPosted });
  } catch (error) {
    next(error);
  }
};