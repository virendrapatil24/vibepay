import { Request, Response } from "express";
import {
  userCreateSchema,
  userLoginSchema,
  userUpdateSchema,
} from "../validators/user.validator";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import { generateToken } from "../auth/auth.utils";
import { Types } from "mongoose";
import { Account } from "../models/account.model";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const parsed = userCreateSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const emailLowerCase = parsed.data.email.toLocaleLowerCase();
  const existingUser = await User.findOne({
    $or: [{ email: emailLowerCase }, { phone: parsed.data.phone }],
  });
  if (existingUser) {
    const duplicateField =
      existingUser.email === emailLowerCase ? "Email" : "Phone number";
    res.status(422).json({ error: `${duplicateField} already exists` });
    return;
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
  const newUser = new User({
    email: emailLowerCase,
    phone: parsed.data.phone,
    firstName: parsed.data.firstName,
    lastName: parsed.data.lastName,
    password: hashedPassword,
  });
  await newUser.save();

  const userId = newUser._id;

  await Account.create({
    userId,
    balance: 1 + Math.floor(Math.random() * 1000000),
  });

  res.status(201).json({ message: "User created successfully" });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const parsed = userLoginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const emailLowerCase = parsed.data.email.toLocaleLowerCase();
  const existingUser = await User.findOne({ email: emailLowerCase });
  if (!existingUser) {
    res.status(400).json({ error: "User not found" });
    return;
  }
  const isPasswordValid = await bcrypt.compare(
    parsed.data.password,
    existingUser.password
  );
  if (!isPasswordValid) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  const { error, token } = generateToken({
    id: (existingUser._id as Types.ObjectId).toString(),
  });

  if (error) {
    res.status(500).json({ error: "Token generation failed" });
    return;
  }

  res.status(200).json({
    message: "User logged in successfully",
    authToken: token,
    user: existingUser,
  });
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const parsed = userUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const updatePayload = { ...parsed.data };
  if (updatePayload.password) {
    const hashedPassword = await bcrypt.hash(updatePayload.password, 10);
    updatePayload.password = hashedPassword;
  }

  const userId = req.user.id;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updatePayload },
    { new: true }
  );

  res.status(200).json({
    message: "User updated successfully",
    user: updatedUser,
  });
};

export const getUserByName = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const { userName } = req.query || "";

  const bulkUsers = await User.find({
    $or: [
      { firstName: { $regex: userName, $options: "i" } },
      { lastName: { $regex: userName, $options: "i" } },
    ],
  });

  if (bulkUsers.length === 0) {
    res.status(404).json({ message: "No users found" });
    return;
  }

  const userId = req.user.id;
  const users = bulkUsers
    .filter((user) => user.id !== userId)
    .map((user) => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    }));

  res.status(200).json({
    message: "Users found",
    users,
  });
};
