import { Request, Response, RequestHandler } from "express";

import { validatePasswordService } from "../service/authService";
import { LoginUserInput } from "../schema/userSchema";
import env from "../utils/env.utils";
import { signJwt } from "../utils/jwtUtilities";
import logger from "../utils/logger";

export const userLoginHandler: RequestHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response
): Promise<void> => {
  try {
    const user = await validatePasswordService(req.body);

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
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
    res.status(200).json({ user: user._id });
    return;
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "Something went wrong" });

    return;
  }
};

export const validateTokenHandler: RequestHandler = (
  req: Request,
  res: Response
) => {
  res.status(200).json({ userId: req.userId });
  return;
};

export const logoutUserHandler: RequestHandler = (
  req: Request,
  res: Response
) => {
  try {
    res.cookie("accessToken", "", {
      expires: new Date(0),
    });
    res.cookie("refreshToken", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: env.NODE_ENV === "production",
    });
    res.status(200).json({
      message: "Successfully logged out",
    });
    return;
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "Something went wrong" });

    return;
  }
};
