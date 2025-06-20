import { omit } from "lodash";

import { UserDocument, UserModel } from "../models/userModel";
import { LoginUserInput, RegisterUserDBInput } from "../schema/userSchema";
import { signJwt, verifyJwt } from "../utils/jwtUtilities";
import { JwtPayload } from "jsonwebtoken";
import env from "../utils/env.utils";

export async function registerUser(input: RegisterUserDBInput) {
  try {
    let user = await UserModel.findOne({
      email: input.email,
    });

    if (user) {
      throw new Error("User already exists");
    }
    user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (error) {
    throw new Error(error);
  }
}

export async function validatePassword({ email, password }: LoginUserInput) {
  const user = await UserModel.findOne({ email }).exec();
  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded) throw new Error("Invalid refreshToken");

  const user = await UserModel.findOne({ _id: (decoded as JwtPayload).userId });

  if (!user) throw new Error("Invalid User");

  const newAccessToken = signJwt(
    { userId: user._id },
    { expiresIn: env.accessTokenTtl }
  );

  return newAccessToken;
}
