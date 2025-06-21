import { omit } from "lodash";
import { JwtPayload } from "jsonwebtoken";

import { UserModel } from "../models/userModel";
import { LoginUserInput } from "../schema/userSchema";
import { signJwt, verifyJwt } from "../utils/jwtUtilities";
import env from "../utils/env.utils";

export async function validatePasswordService({
  email,
  password,
}: LoginUserInput) {
  const user = await UserModel.findOne({ email }).exec();
  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function reIssueAccessTokenService({
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
