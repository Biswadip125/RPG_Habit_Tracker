import { z } from "zod";

const habitTypeEnum = z.enum(["count", "checklist", "timer", "streak"], {
  errorMap: () => ({ message: "Please select a valid habit type" }),
});

const habitCategoryEnum = z.enum(
  [
    "fitness",
    "learning",
    "selfImprovement",
    "health",
    "mindset",
    "productivity",
  ],
  {
    errorMap: () => ({
      message: "Please select a valid habit category",
    }),
  }
);

export const HabitFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title should be more than 3 characters long" }),
  type: habitTypeEnum,
  category: habitCategoryEnum,
  goal: z.coerce
    .number()
    .min(1, { message: "Goal must be atleast 1" })
    .optional(),
  unit: z
    .enum(["minutes", "hours", "seconds"], {
      errorMap: () => ({
        message: "Please select a unit",
      }),
    })
    .optional(),
});

export type HabitSchema = z.infer<typeof HabitFormSchema>;
