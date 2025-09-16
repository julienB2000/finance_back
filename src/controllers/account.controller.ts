import { type NextFunction, type Response } from "express";
import { getUserAccount, postAnAccount } from "../services/account.service.js";
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

export const getMyAccounts = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const myId = req.user.id;
    const myAccounts = await getUserAccount(myId);
    res
      .status(202)
      .json({ message: "Here are your accounts", accounts: myAccounts });
  } catch (error) {
    next(error);
  }
};
