import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "";

export interface IPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IPayload;
    }
  }
}

export const generateToken = (payload: IPayload) => {
  try {
    if (!SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined");
    }
    const token = jwt.sign(payload, SECRET_KEY);
    return { token };
  } catch (err) {
    return { error: "token generation failed" };
  }
};

export const verifyToken = (token: string) => {
  try {
    if (!SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined");
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
