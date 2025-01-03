import { z } from "zod";

export const LoginSchema = z.object({
  password: z.string().min(6, {
    message: "Hasło musi być dłuższe niż 6 znaków.",
  }),
  email: z.string().email({
    message: "Podaj poprawny email.",
  }),
});

export type LoginModel = z.infer<typeof LoginSchema>;
