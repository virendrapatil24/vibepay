import mongoose, { Document, Schema, Types } from "mongoose";

export interface IAccount extends Document {
  userId: Types.ObjectId;
  balance: number;
}

const AccountSchema: Schema<IAccount> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, required: true, default: 0 },
});

export const Account = mongoose.model<IAccount>("Account", AccountSchema);
