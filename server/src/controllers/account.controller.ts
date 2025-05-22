import { Request, Response } from "express";
import { Account } from "../models/account.model";
import mongoose from "mongoose";
import { sendMoneyValidator } from "../validators/account.validator";

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

export const sendMoney = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const parsed = sendMoneyValidator.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  if (parsed.data.amount <= 0) {
    res.status(400).json({ error: "Amount must be greater than 0" });
    return;
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const senderAccount = await Account.findOne({
      userId: req.user.id,
    }).session(session);
    const recipientAccount = await Account.findOne({
      userId: parsed.data.recipientId,
    }).session(session);
    if (!senderAccount || !recipientAccount) {
      res.status(404).json({ error: "Sender or recipient account not found" });
      return;
    }

    if (
      senderAccount.userId.toString() === recipientAccount.userId.toString()
    ) {
      res.status(400).json({ error: "Cannot send money to yourself" });
      return;
    }

    if (senderAccount.balance < parsed.data.amount) {
      res.status(400).json({ error: "Insufficient balance" });
      return;
    }

    senderAccount.balance -= parsed.data.amount;
    recipientAccount.balance += parsed.data.amount;

    await senderAccount.save({ session });
    await recipientAccount.save({ session });

    await session.commitTransaction();

    res.status(200).json({
      message: "Money sent successfully",
      newBalance: senderAccount.balance,
    });
  } catch (err) {
    await session.abortTransaction();

    console.error("Error sending money:", err);

    res.status(500).json({ error: "Internal server error" });
  } finally {
    session.endSession;
  }
};
