import { Request, Response, NextFunction } from "express";
import { IPayload, verifyToken } from "./auth.utils";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid token." });
    return;
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    req.user = decoded as IPayload;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
