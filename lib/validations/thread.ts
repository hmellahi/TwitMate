import * as z from "zod";

export const CreateThreadValidation = z.object({
  text: z.string().min(4).max(100),
});
