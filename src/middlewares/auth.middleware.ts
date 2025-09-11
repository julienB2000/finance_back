import { type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

import { type Request } from "express";
export interface RequestWithUser extends Request {
  user?: any;
}

export const authMiddleware = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé : token manquant." });
  }

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = decodedPayload;

    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Accès interdit : token invalide." });
  }
};
