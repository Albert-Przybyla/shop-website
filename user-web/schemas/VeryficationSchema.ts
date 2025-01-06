import { z } from "zod";

export const VeryficationSchema = z.object({
  confirmation_code: z
    .string({
      required_error: "Pole wymagane.",
    })
    .min(1, "Pole wymagane."),
});

export type VeryficationModel = z.infer<typeof VeryficationSchema>;
