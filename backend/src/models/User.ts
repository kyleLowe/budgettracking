import bcrypt from "bcrypt";
import { Document, InferSchemaType, Schema, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
}

export const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, select: false },
  email: { type: String, required: true, unique: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

type User = InferSchemaType<typeof userSchema>;
export default model<IUser>("User", userSchema);
