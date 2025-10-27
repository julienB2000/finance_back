import { type NextFunction, type Response } from "express";
import type { RequestWithUser } from "../middlewares/auth.middleware.js";
import { deleteUserCategory, getUserCategory, postACategory, updateUserCategory } from "../services/category.service.js";

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
      .json({ message: "category Created", account: categoryPosted });
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const userCategories = await getUserCategory(userId)
    res.status(200).json({message: "Here are you User Categories", categories: userCategories})
  } catch(error) {
    next(error)
  }
}

export const deleteCategory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const categoryId = parseInt(req.params.id as string)
    const deletedCategory = await deleteUserCategory(categoryId, userId)
    res.status(301).json({message: "Here is your deleted Categories", Category: deletedCategory})
  } catch(error) {
    next(error)
  }
}

export const updateCategory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const categoryId = parseInt(req.params.id as string)
    const updateData = req.body;
    console.log(updateData)
    const updatedCategory = await updateUserCategory(updateData, categoryId, userId)
    res.status(200).json({message: "You updated This category", category: updatedCategory})
  } catch(error) {
    next(error)
  }
}