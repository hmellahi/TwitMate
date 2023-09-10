import * as z from "zod";

export const CreateThreadValidation = z.object({
  text: z.string().min(0).max(300),
});
