import { z } from "zod";

export const AddSizeToProductSchema = z.object({
  size: z.string({
    required_error: "Rozmiar wymagany.",
  }),
});

export type AddSizeToProductModel = z.infer<typeof AddSizeToProductSchema>;
