import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .regex(/^[A-Za-z0-9\s]*$/, "Title must contain only English letters"),
  description: z.string(),
  image: z.instanceof(File).nullable(),
});
