import { omit } from "lodash";

import { UserModel } from "../models/userModel";
import { RegisterUserDBInput } from "../schema/userSchema";

export async function registerUserService(input: RegisterUserDBInput) {
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
