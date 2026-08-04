import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  SESSION_SECRET: z
    .string()
    .min(32, "SESSION_SECRET must be at least 32 characters long"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
});

const _env = envSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

if (!_env.success) {
  console.error("Invalid environment variables:", _env.error.format());
  throw new Error(
    "Invalid environment variables. Check your .env file or Railway configuration.",
  );
}

export const env = _env.data;
