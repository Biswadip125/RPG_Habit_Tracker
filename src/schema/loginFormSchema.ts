import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export type LoginSchema = z.infer<typeof LoginFormSchema>;
