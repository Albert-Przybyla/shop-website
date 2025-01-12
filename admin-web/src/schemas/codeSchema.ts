import { z } from "zod";

export const CodeSchema = z.object({
  code: z
    .string({
      required_error: "Pole wymagane.",
    })
    .min(6, {
      message: "Kod musi być dłuższy niż 6 znaków.",
    })
    .max(20, {
      message: "Kod nie może być dłuższy niż 20 znaków.",
    })
    .regex(/^[A-Za-z0-9_-]+$/, {
      message: "Kod może zawierać tylko litery, cyfry, myślniki i podkreślenia.",
    }),
  value: z
    .number({
      required_error: "Pole wymagane.",
    })
    .min(1, {
      message: "Wartość kodu musi być większa niż 0.",
    })
    .max(100, {
      message: "Wartość kodu musi być mniejsza niż 100.",
    }),
  max_uses: z.number().optional(),
  description: z.string().optional(),
  expiration: z
    .date()
    .min(new Date(), {
      message: "Data wygasniecia musi byc w przyszlosci.",
    })
    .optional(),
});

export type CodeModel = z.infer<typeof CodeSchema>;
