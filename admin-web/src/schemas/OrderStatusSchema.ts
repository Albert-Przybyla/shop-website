import { z } from "zod";

export const OrderStatusSchema = z.object({
  status: z.string({
    required_error: "Pole wymagane.",
  }),
  tracking_url: z.string().optional(),
  confirmation: z.literal("TAK", {
    errorMap: () => ({ message: "Pole musi zawierać wartość 'TAK'." }),
  }),
});

export type OrderStatusModel = z.infer<typeof OrderStatusSchema>;
