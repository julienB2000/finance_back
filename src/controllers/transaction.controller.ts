import { type NextFunction, type Response } from "express";
import type { RequestWithUser } from "../middlewares/auth.middleware.js";
import {
  deleteATransaction,
  getUserTransaction,
  postATransaction,
  updateATransaction,
} from "../services/transaction.service.js";

export const postTransaction = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const transaction = req.body;
    const postedTransaction = await postATransaction(transaction, userId);
    res
      .status(201)
      .json({ message: "category Created", account: postedTransaction });
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const transactionId = parseInt(req.params.id as string);
    const deletedTransaction = await deleteATransaction(transactionId, userId);
    res
      .status(201)
      .json({ message: "Transaction Deleted", account: deletedTransaction });
  } catch (error) {
    next(error);
  }
};

export const getTransactions = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const userTransactions = await getUserTransaction(userId);
    res
      .status(201)
      .json({ message: "Your Transactions", account: userTransactions });
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const transactionId = parseInt(req.params.id as string);
    const transaction = req.body;

    const updatedTransaction = await updateATransaction(
      transaction,
      userId,
      transactionId
    );
    res
      .status(201)
      .json({ message: "Transaction Deleted", account: updatedTransaction });
  } catch (error) {
    next(error);
  }
};
