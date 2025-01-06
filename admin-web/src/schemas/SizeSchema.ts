import { z } from "zod";

export const SizeSchema = z.object({
  label: z.string({
    required_error: "Pole wymagane.",
  }),
});

export type SizeModel = z.infer<typeof SizeSchema>;
