import { Request, Response } from "express";
import { userCreateSchema } from "../validators/user.validator";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";

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
