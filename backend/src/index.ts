import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";

import env from "./utils/env.utils";
import logger from "./utils/logger";
import connectDB from "./utils/dbConnection";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/auth";
import myHotelsRoutes from "./routes/my-hotels";
import HotelsRoutes from "./routes/hotels";
import deserializeUser from "./middlewares/deserializeUser";
import { cloudinaryConfig } from "./utils/cloudinaryUtils";

const app = express();

app.use(
  cors({
    origin: env.origin,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

cloudinaryConfig();
app.use(cookieParser());
app.use(bodyParser.json({}));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  if (err instanceof SyntaxError) {
    res.status(400).json({
      status: "fail",
      message: "Invalid JSON payload",
    });
  }
  next();
  return;
});
app.use(bodyParser.urlencoded({ extended: true }));

app.use(deserializeUser);

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "ok" });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/my-hotels", myHotelsRoutes);
app.use("/api/hotels", HotelsRoutes);

// app.get("*", async (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
// });

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  res.status(500).send({ statusCode: err.statusCode, type: err.type });
  return next();
});

app.listen(env.PORT, async () => {
  logger.info(`Listening to PORT:-${env.PORT}`);
  await connectDB();
});
