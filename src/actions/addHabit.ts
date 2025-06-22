"use server";

import { auth } from "@/auth";
import { HabitType } from "@/generated/prisma";
import { prisma } from "@/lib";
import { calculateXp } from "@/lib/calculateXp";
import { HabitFormSchema, HabitSchema } from "@/schema/HabitFormSchema";

type addHabitFormState =
  | {
      status: "error";
      errors?: Partial<Record<keyof HabitSchema, string[]>>;
      formError?: string;
    }
  | {
      status: "success";
      message: string;
    };

export const addHabit = async (
  data: HabitSchema
): Promise<addHabitFormState> => {
  const result = HabitFormSchema.safeParse(data);

  if (!result.success) {
    return {
      status: "error",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { title, type, category, goal, unit } = result.data;

  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      status: "error",
      formError: "User is not authenticated",
    };
  }
  try {
    await prisma.habit.create({
      data: {
        title,
        type,
        category,
        ...(goal !== undefined ? { goal } : {}),
        ...(unit && { unit }),
        xp: calculateXp({ type: type.toLowerCase() as HabitType, goal }),
        userId: session.user.id,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error", formError: error.message };
    } else {
      return { status: "error", formError: "Something went wrong" };
    }
  }

  return { status: "success", message: "Habit Created Successfully" };
};
