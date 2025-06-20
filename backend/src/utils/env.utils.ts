import { coerce, number, object, string } from "zod";
import { config } from "dotenv";

config({ path: process.env.DOTENV_CONFIG });

const envSchema = object({
  PORT: coerce.number().int().default(3001),
  origin: coerce.string(),
  DB_CONNECTION_URL: coerce.string(),
  saltWorkFactor: coerce.number().default(10),
  privateKey: coerce.string(),
  publicKey: coerce.string(),
  accessTokenTtl: coerce.number().default(14400),
  refreshTokenTtl: coerce.number().default(86400),
  NODE_ENV: coerce.string(),
});

const env = envSchema.parse(process.env);

export default env;
