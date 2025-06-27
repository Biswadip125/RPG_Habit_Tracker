"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib";
import {
  updateActionSchema,
  updateCounterActionSchema,
} from "@/schema/UpdateActionSchemas";

type counterUpdateActionState =
  | {
      status: "error";
      errors?: Partial<Record<keyof updateActionSchema, string[]>>;
      formError?: string;
    }
  | {
      status: "success";
      message: string;
    };

export const counterUpdate = async (
  data: updateActionSchema
): Promise<counterUpdateActionState> => {
  const result = updateCounterActionSchema.safeParse(data);

  if (!result.success) {
    return {
      status: "error",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { habitId, count } = result.data;

  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      status: "error",
      formError: "User is not authenticated",
    };
  }
  try {
    const existedHabit = await prisma.habit.findUnique({
      where: {
        id: habitId,
      },
    });

    if (!existedHabit) {
      return {
        status: "error",
        formError: "Habit with this Id not found",
      };
    }

    if (existedHabit.goal && count > existedHabit.goal) {
      return {
        status: "error",
        formError: "Progress can't exceed the goal",
      };
    }

    await prisma.habit.update({
      where: {
        id: habitId,
      },
      data: {
        progress: count,
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        xp: (user?.xp ? user.xp : 0) + existedHabit.xp,
      },
    });
  } catch (err) {
    console.log(err);

    if (err instanceof Error) {
      return {
        status: "error",
        formError: err.message,
      };
    } else {
      return {
        status: "error",
        formError: "Something went wrong",
      };
    }
  }

  return {
    status: "success",
    message: "Progress Updated Successfully",
  };
};
