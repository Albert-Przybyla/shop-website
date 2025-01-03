import { z } from "zod";

export const ProductDiscountSchema = z.object({
  discount: z
    .number()
    .min(0, {
      message: "Zniżka musi być większa niż 0%",
    })
    .max(100, {
      message: "Zniżka musi być mniejsza niż 100%",
    }),
});

export type ProductDiscountModel = z.infer<typeof ProductDiscountSchema>;
