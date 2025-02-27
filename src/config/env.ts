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
  JWT_SECRET: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
