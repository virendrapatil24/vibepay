import jwt from "jsonwebtoken";

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
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined");
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return { token };
  } catch (err) {
    return { error: "Token generation failed" };
  }
};

export const verifyToken = (token: string) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined");
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
