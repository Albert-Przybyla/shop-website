import { z } from "zod";

export const DeliveryMethodSchema = z.object({
  name: z.string({
    required_error: "Pole wymagane.",
  }),
  price: z
    .number({
      required_error: "Pole wymagane.",
    })
    .min(0, {
      message: "Cena musi być większa niż 0 PLN",
    }),
  aditional_info_label: z.string().optional(),
});

export type DeliveryMethodModel = z.infer<typeof DeliveryMethodSchema>;
