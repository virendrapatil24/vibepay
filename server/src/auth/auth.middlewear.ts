import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./auth.utils";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token." });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};
