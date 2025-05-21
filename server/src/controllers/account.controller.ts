import { Request, Response } from "express";
import { Account } from "../models/account.model";

export const getAccountBalance = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const userId = req.user.id;

  const account = await Account.findOne({ userId });

  if (!account) {
    res.status(404).json({ error: "Account not found" });
    return;
  }

  res.status(200).json({
    message: "Account balance retrieved successfully",
    balance: account.balance,
  });
};
