import { Request, RequestHandler, Response } from "express";

import { RegisterUserInput } from "../schema/userSchema";
import { registerUserService } from "../service/userService";
import logger from "../utils/logger";
import env from "../utils/env.utils";
import { signJwt } from "../utils/jwtUtilities";

export const registerUserHandler: RequestHandler = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response
): Promise<void> => {
  try {
    const user = await registerUserService(req.body);
    if (user._id) {
      const accessToken = signJwt(
        { userId: user._id },
        { expiresIn: env.accessTokenTtl }
      );

      const refreshToken = signJwt(
        { userId: user._id },
        { expiresIn: env.refreshTokenTtl }
      );
      res.cookie("accessToken", accessToken, {
        maxAge: 14400000, //4 hours
        httpOnly: true,
        secure: env.NODE_ENV === "production",
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 86400000, //1 day
        httpOnly: true,
        secure: env.NODE_ENV === "production",
      });
      res.status(201).json({ message: "User registered successfully" });
      return;
    }
    return;
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: error.message.replace(/^Error: |$/g, "") });
    return;
  }
};
