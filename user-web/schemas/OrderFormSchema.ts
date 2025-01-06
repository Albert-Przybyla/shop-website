import { z } from "zod";

export const OrderSchema = z.object({
  first_name: z
    .string({
      required_error: "Pole wymagane.",
    })
    .min(1, "Pole wymagane."),
  last_name: z
    .string({
      required_error: "Pole wymagane.",
    })
    .min(1, "Pole wymagane."),
  email: z
    .string({
      required_error: "Pole wymagane.",
    })
    .email("Nieprawidłowy adres email."),
  phone: z
    .string({
      required_error: "Pole wymagane.",
    })
    .min(1, "Pole wymagane."),
  address: z
    .string({
      required_error: "Pole wymagane.",
    })
    .min(1, "Pole wymagane."),
  postal_code: z
    .string({
      required_error: "Pole wymagane.",
    })
    .min(1, "Pole wymagane."),
  city: z
    .string({
      required_error: "Pole wymagane.",
    })
    .min(1, "Pole wymagane."),
  country: z
    .string({
      required_error: "Pole wymagane.",
    })
    .min(1, "Pole wymagane."),
  products: z.array(z.object({ product_id: z.string(), quantity: z.number(), size_id: z.string() })),
  delivery_method_id: z
    .string({
      required_error: "Pole wymagane.",
      invalid_type_error: "Pole wymagane.",
    })
    .min(1, "Pole wymagane."),
  delivery_method_additional_info: z.string().optional(),
  note: z.string().optional(),
});

export type OrderModel = z.infer<typeof OrderSchema>;
