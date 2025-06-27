import { z } from "zod";

export const updateCounterActionSchema = z.object({
  habitId: z.string().cuid(),
  count: z.number().min(1),
});

export type updateActionSchema = z.infer<typeof updateCounterActionSchema>;
