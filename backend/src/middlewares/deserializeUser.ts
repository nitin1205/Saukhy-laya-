import { Request, Response, NextFunction } from "express";

import { verifyJwt } from "../utils/jwtUtilities";
import { JwtPayload } from "jsonwebtoken";
import { reIssueAccessToken } from "../service/userService";
import env from "../utils/env.utils";
import logger from "../utils/logger";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies["accessToken"];
  const refreshToken = req.cookies["refreshToken"];
  if (!accessToken) return next();

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    req.userId = (decoded as JwtPayload).userId;
    return next();
  }

  if (expired && refreshToken) {
    try {
      const newAccessToken = await reIssueAccessToken({ refreshToken });

      if (newAccessToken) {
        res.cookie("accessToken", newAccessToken, {
          maxAge: 14400000, //4 hours
          httpOnly: true,
          secure: env.NODE_ENV === "production",
        });

        const { decoded } = verifyJwt(newAccessToken);
        req.userId = (decoded as JwtPayload).userId;
        return next();
      }
    } catch (error) {
      logger.error("Token refresh failed:", error);
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
    }
  }

  return next();
};

export default deserializeUser;
