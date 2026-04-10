import { type NextFunction, type Response } from "express";
import type { RequestWithUser } from "../middlewares/auth.middleware.js";
import { getSummary } from "../services/stats.service.js";
import type { summaryQuerySchemaDto } from "../schemas/stats.schema.js";

export const getStats = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user.id;
    const filter = { ...req.query };
    const year = Number(filter.year);
    const month = filter.month ? Number(filter.month) : undefined;
    const date = { year: year, month: month };
    const result = await getSummary(userId, date);
    res.status(201).json({
      message: `Here are your transactions for the year ${year} and month ${month} for a total amout of ${result.total}`,
      transactions: result.transactions,
    });
  } catch (error) {
    next(error);
  }
};
