import mongoose, { Schema } from "mongoose";
import { IUser } from "./interfaces";

const UserSchema: Schema<IUser> = new Schema({
  firstName: { type: String, required: true, trim: true, maxlength: 50 },
  lastName: { type: String, required: true, trim: true, maxlength: 50 },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
});

export const User = mongoose.model<IUser>("User", UserSchema);
