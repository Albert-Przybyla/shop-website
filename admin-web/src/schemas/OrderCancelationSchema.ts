import { z } from "zod";

export const OrderCancelationSchema = z.object({
  confirmation: z.literal("TAK", {
    errorMap: () => ({ message: "Pole musi zawierać wartość 'TAK'." }),
  }),
});

export type OrderCancelationModel = z.infer<typeof OrderCancelationSchema>;
