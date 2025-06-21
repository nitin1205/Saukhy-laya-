import { Schema, Types, model } from "mongoose";
import bcrypt from "bcryptjs";
import env from "../utils/env.utils";

export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserDocument extends User {
  _id: Types.ObjectId;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(env.saltWorkFactor);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    return next();
  }
  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  let user = this as UserDocument;
  return await bcrypt
    .compare(candidatePassword, user.password)
    .catch((e) => false);
};

export const UserModel = model<UserDocument>("User", UserSchema);
