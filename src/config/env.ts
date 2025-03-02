import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("3000"),
  DATABASE_URL: z.string(),
  JWT_AUTH_SECRET: z.string(),
  JWT_AUTH_SECRET_EXPIRES_IN: z.string(),
  RESEND_KEY: z.string(),
  JWT_EMAIL_SECRET: z.string(),
  JWT_EMAIL_SECRET_EXPIRES_IN: z.string(),
  FRONTEND_URL: z.string(),
  BACKEND_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
