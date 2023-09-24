import * as z from "zod";

export const CreateThreadValidation = z.object({
  text: z
    .string()
    .min(0, "Thread Content Must be longer than 3 characters")
    .max(1000),
});
