import jwt from "jsonwebtoken";
import env from "./env.utils";
import logger from "./logger";

const privateKey = env.privateKey;
const publicKey = env.publicKey;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    logger.error(error.message);
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}
