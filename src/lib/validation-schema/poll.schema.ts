import { z } from "zod";

export const pollSchema = z.object({
  question: z
    .union([z.string().min(1, "Question is required").max(255), z.literal("")])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  options: z
    .array(z.string().min(1, "Option text is required"))
    .min(2, "At least 2 options are required")
    .max(10, "Maximum 10 options allowed"),
  email: z.email("Invalid email").optional(),
});

export type PollInput = z.infer<typeof pollSchema>;
