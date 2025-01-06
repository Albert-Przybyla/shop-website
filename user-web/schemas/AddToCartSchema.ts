import { z } from "zod";

export const AddToCartSchema = z.object({
  product_id: z.string({
    required_error: "Pole wymagane.",
  }),
  size_id: z
    .string({
      required_error: "Pole wymagane.",
    })
    .min(1, "Pole wymagane."),
  quantity: z
    .number({
      required_error: "Pole wymagane.",
    })
    .min(1),
});

export type AddToCartModel = z.infer<typeof AddToCartSchema>;
