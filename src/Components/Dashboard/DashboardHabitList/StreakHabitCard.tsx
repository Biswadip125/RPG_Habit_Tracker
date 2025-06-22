import React from "react";
import HabitCategoryBadge from "./HabitCategoryBadge";
import { getHabitIcon } from "@/lib/getHabitIcon";
import { Habit } from "@/generated/prisma";
type StreakHabitCardProps = {
  habit: Habit;
};
const StreakHabitCard: React.FC<StreakHabitCardProps> = ({ habit }) => {
  return (
    <div className="bg-[rgba(255,255,255,0.03)] min-h-32 lg:w-74 md:w-65 backdrop-blur-2xl p-2 rounded-lg flex flex-col gap-2 ">
      <HabitCategoryBadge habitCategoryKey={habit.category} />
      <div className="flex flex-col gap-3  justify-center ml-2">
        <h1 className="text-2xl font-bold ">{habit.title}</h1>

        <div className="flex gap-4 flex-col">
          <div className="flex gap-1 bg-[rgba(255,255,255,0.10)] h-8 items-center  rounded-md p-2 min-w-fit">
            Current Streak :{getHabitIcon(habit.title)}
            <p className="text-lg  mt-[2px]">
              <span>{habit.progress}</span> days
            </p>
          </div>
          <button
            className="bg-[rgba(255,255,255,0.10)] w-32 py-1 flex items-center justify-center rounded-lg cursor-pointer hover:scale-105 hover:bg-[rgba(255,255,255,0.20)]"
            aria-label="Mark habit as done"
          >
            Mark as done
          </button>
        </div>
        <p className="">
          Points : <span className="text-cyan-500"> +{habit.xp} xp today</span>
        </p>
      </div>
    </div>
  );
};

export default StreakHabitCard;
