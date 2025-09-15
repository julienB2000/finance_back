import { type NextFunction, type Response } from "express";
import { postAnAccount } from "../services/account.service.js";
import type { RequestWithUser } from "../middlewares/auth.middleware.js";

export const postAccount = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const myId = req.user.id;
    const account = req.body;
    const accountPosted = await postAnAccount(account, myId);
    res
      .status(201)
      .json({ message: "account Created", account: accountPosted });
  } catch (error) {
    next(error);
  }
};
