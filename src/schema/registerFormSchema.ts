import { z } from "zod";
export const RegisterFormSchema = z
  .object({
    fullName: z.string().min(3, "fullname must be 3 characters long"),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter  ")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter ")
      .regex(/[\d]/, "Password must conatin at least one digit ")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "password must contain at least one special character "
      ),
    confirmPassword: z
      .string()
      .min(8, "confirm password must be 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof RegisterFormSchema>;
