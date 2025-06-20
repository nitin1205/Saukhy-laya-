import { Request, Response, NextFunction } from "express";

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req?.userId;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  return next();
};

export default verifyUser;
