import { HabitType } from "@/generated/prisma";

export function calculateXp(habit: {
  type: HabitType;
  goal: number | undefined;
}): number {
  switch (habit.type) {
    case "timer":
      return Math.round((habit.goal ?? 0) / 2);

    case "count":
      return Math.round((habit.goal ?? 0) / 2);

    case "streak":
      return 10;

    default:
      return 5;
  }
}
