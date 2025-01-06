import { z } from "zod";

export const AdminSchema = z.object({
  email: z.string().email({
    message: "Podaj poprawny email.",
  }),
  password: z.string().min(6, {
    message: "Hasło musi być dłuższe niż 6 znaków.",
  }),
  first_name: z.string().min(1, {
    message: "Pole wymagane.",
  }),
  last_name: z.string().min(1, {
    message: "Pole wymagane.",
  }),
});

export type AdminModel = z.infer<typeof AdminSchema>;
