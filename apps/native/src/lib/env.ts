import { z } from "zod";

const envSchema = z.object({
  APP_ENV: z.union([z.literal("development"), z.literal("preview"), z.literal("production")]).default("development"),
});

const env = envSchema.parse(process.env);

export { env };
