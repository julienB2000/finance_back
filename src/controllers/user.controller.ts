import { type Request, type Response } from "express";
import { register } from "../services/user.service.js";

// Une fonction simple qui gère la requête GET /users
export const postUser = (req: Request, res: Response) => {
  console.log("body = ", req);
  let user = req.body;
  const returnUser = register(user);
  res.status(200).json({ user: returnUser });
};
