"use client";
import { CheckCircle, Circle } from "lucide-react";
import React, { useState } from "react";

import HabitCategoryBadge from "./HabitCategoryBadge";
import { Habit } from "@/generated/prisma";
type ChecklistHabitCardProps = {
  habit: Habit;
};
const ChecklistHabitCard: React.FC<ChecklistHabitCardProps> = ({ habit }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="bg-[rgba(255,255,255,0.03)] h-32 lg:w-74 md:w-65 backdrop-blur-2xl p-2 rounded-lg flex flex-col gap-3 ">
      <div className="flex items-center justify-start">
        <HabitCategoryBadge habitCategoryKey={habit.category} />
      </div>
      <div className="flex flex-col gap-3 ml-1">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            setIsChecked((prev) => !prev);
          }}
        >
          {/* <input type="checkbox" className="accent-cyan-500 w-5 h-5 rounded-md" /> */}

          <div>{isChecked ? <CheckCircle color="cyan" /> : <Circle />}</div>
          <h1 className="text-2xl font-bold ">{habit?.title}</h1>
        </div>

        <p className="ml-0.5">
          Points: <span className="text-cyan-500">+{habit.xp} xp</span>
        </p>
      </div>
    </div>
  );
};

export default ChecklistHabitCard;
