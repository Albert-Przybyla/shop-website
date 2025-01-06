import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(6, {
    message: "Nazwa musi być dłuższa niż 6 znaków.",
  }),
  description: z.string().min(6, {
    message: "Opis musi być dłuższy niż 6 znaków.",
  }),
  aditional_description: z.string().min(1, {
    message: "Pole wymagane.",
  }),
  material: z.string().min(1, {
    message: "Pole wymagane.",
  }),
  price: z.number().min(6, {
    message: "Cena musi być większa niż 6 PLN",
  }),
});

export type ProductModel = z.infer<typeof ProductSchema>;
