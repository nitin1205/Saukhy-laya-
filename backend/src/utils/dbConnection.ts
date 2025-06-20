import mongoose from "mongoose";
import "dotenv/config";

import logger from "./logger";
import env from "./env.utils";

export default async function connectDB() {
  const dbURL = env.DB_CONNECTION_URL;

  let retries = 3;

  while (retries > 0) {
    try {
      await mongoose.connect(dbURL);
      logger.info(`connected to DB`);
      break;
    } catch (error: any) {
      retries--;
      logger.error(`Failed to connect to DB`);
      logger.error(
        `ErrMsg:-${error.errmsg}, ErrCode:-${error.code}, ErrCodeName:-${error.codeName}`
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  if (!retries) process.exit(1);
}
