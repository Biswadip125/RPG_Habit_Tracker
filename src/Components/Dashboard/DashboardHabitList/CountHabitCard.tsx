"use client";

import { getHabitIcon } from "@/lib/getHabitIcon";
import { Minus, Plus } from "lucide-react";
import HabitCategoryBadge from "./HabitCategoryBadge";
import { Habit } from "@/generated/prisma";
type CounterHabitCardProps = {
  habit: Habit;
};
const CountHabitCard: React.FC<CounterHabitCardProps> = ({ habit }) => {
  return (
    <div className="bg-[rgba(255,255,255,0.03)] min-h-32 lg:w-74 md:w-65 backdrop-blur-2xl p-2 rounded-lg flex flex-col gap-2 ">
      <HabitCategoryBadge habitCategoryKey={habit.category} />
      <div className="flex flex-col gap-3  justify-center ml-2">
        <h1 className="text-2xl font-bold ">{habit.title}</h1>

        <div className="flex gap-4">
          <button className="bg-[rgba(255,255,255,0.10)] w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-all duration-100 hover:scale-110 hover:bg-[rgba(255,255,255,0.20)]">
            <Minus />
          </button>

          <div className="flex gap-1 bg-[rgba(255,255,255,0.10)] w-18 h-8 items-center justify-center rounded-md">
            {getHabitIcon("go to gym")}
            <p className="text-lg">
              (<span>{habit.progress}</span>/{habit.goal})
            </p>
          </div>
          <button className="bg-[rgba(255,255,255,0.10)] w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 hover:bg-[rgba(255,255,255,0.20)]">
            <Plus />
          </button>
        </div>
        <p className="">
          Points: <span className="text-cyan-500"> +{habit.xp} xp</span>
        </p>
      </div>
    </div>
  );
};

export default CountHabitCard;
