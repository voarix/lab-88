import { z } from "zod";

export const commentFormSchema = z.object({
  text: z.string().min(5, "Text must be more than 5 characters"),
});
