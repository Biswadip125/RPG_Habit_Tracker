import React from "react";
import ChecklistHabitCard from "./ChecklistHabitCard";
import CountHabitCard from "./CountHabitCard";
import TimerHabitComponent from "./TimerHabitComponent";
import StreakHabitCard from "./StreakHabitCard";
import { Habit } from "@/generated/prisma";
type habitCardProps = {
  habit: Habit;
};

export const habitCategoriesMap = {
  fitness: "Fitness",
  learning: "Learning",
  selfImprovement: "Self-Improvement",
  health: "Health",
  mindset: "Mindset",
  productivity: "Productivity",
};

const HabitCard: React.FC<habitCardProps> = ({ habit }) => {
  switch (habit.type) {
    case "count":
      return <CountHabitCard habit={habit} />;
    case "checklist":
      return <ChecklistHabitCard habit={habit} />;
    case "timer":
      return <TimerHabitComponent habit={habit} />;
    case "streak":
      return <StreakHabitCard habit={habit} />;
    default:
      return <CountHabitCard habit={habit} />;
  }
};

export default HabitCard;
