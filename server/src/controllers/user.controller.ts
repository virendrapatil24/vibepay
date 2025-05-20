import { Request, Response } from "express";
import {
  userCreateSchema,
  userLoginSchema,
} from "../validators/user.validator";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import { generateToken } from "../auth/authentication";
import { Types } from "mongoose";

export const createUser = async (req: Request, res: Response) => {
  const parsed = userCreateSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const emailLowerCase = parsed.data.email.toLocaleLowerCase();
  const existingUser = await User.findOne({
    $or: [{ email: emailLowerCase }, { phone: parsed.data.phone }],
  });
  if (existingUser) {
    const duplicateField =
      existingUser.email === parsed.data.email ? "Email" : "Phone number";
    return res.status(422).json({ error: `${duplicateField} already exists` });
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
  return res.status(201).json({ message: "User created successfully" });
};

export const loginUser = async (req: Request, res: Response) => {
  const parsed = userLoginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const emailLowerCase = parsed.data.email.toLocaleLowerCase();
  const existingUser = await User.findOne({ email: emailLowerCase });
  if (!existingUser) {
    return res.status(400).json({ error: "User not found" });
  }
  const isPasswordValid = await bcrypt.compare(
    parsed.data.password,
    existingUser.password
  );
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const { error, token } = generateToken({
    id: (existingUser._id as Types.ObjectId).toString(),
  });

  if (error) {
    return res.status(500).json({ error: "Token generation failed" });
  }

  return res
    .status(200)
    .json({ message: "User logged in successfully", authToken: token });
};
