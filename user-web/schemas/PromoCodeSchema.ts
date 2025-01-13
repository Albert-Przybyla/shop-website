import { z } from "zod";

export const PromoCodeSchema = z.object({
  code: z
    .string({
      required_error: "Prosze wprowadzić kod przed sprzedaniem jego poprawności.",
    })
    .min(1, "Prosze wprowadzić kod przed sprzedaniem jego poprawności."),
});

export type PromoCodeModel = z.infer<typeof PromoCodeSchema>;
