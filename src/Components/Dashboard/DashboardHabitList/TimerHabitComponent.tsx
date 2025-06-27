"use client";

import { Pause, Play } from "lucide-react";
import HabitCategoryBadge from "./HabitCategoryBadge";
import { getHabitIcon } from "@/lib/getHabitIcon";
import { useState } from "react";
import { Habit } from "@/generated/prisma";
type TimerHabitComponentProps = {
  habit: Habit;
};
const TimerHabitComponent: React.FC<TimerHabitComponentProps> = ({ habit }) => {
  const [isPlayed, setIsPlayed] = useState<boolean>(false);
  return (
    <div className="bg-[rgba(255,255,255,0.03)] min-h-32 lg:w-74 md:w-65 backdrop-blur-2xl p-2 rounded-lg flex flex-col gap-2 ">
      <HabitCategoryBadge habitCategoryKey={habit.category} />
      <div className="flex flex-col gap-3  justify-center ml-2">
        <h1 className="text-2xl font-bold ">{habit.title}</h1>

        <div className="flex gap-4">
          <div className="flex gap-1 bg-[rgba(255,255,255,0.10)] px-2 max-w-fit w-full h-8 items-center justify-center rounded-md">
            {getHabitIcon(habit.title)}
            <p className="text-lg  mt-[2px]">
              {habit.unit === "hours" ? (
                <>
                  <span>
                    00:00:
                    {habit.progress < 10
                      ? `0${habit.progress}`
                      : habit.progress}
                  </span>{" "}
                  / {habit.goal}:00:00
                </>
              ) : habit.unit === "minutes" ? (
                <>
                  <span>
                    00:
                    {habit.progress < 10
                      ? `0${habit.progress}`
                      : habit.progress}
                  </span>{" "}
                  / {habit.goal}:00
                </>
              ) : (
                <>
                  <span>
                    00:
                    {habit.progress < 10
                      ? `0${habit.progress}`
                      : habit.progress}
                  </span>{" "}
                  / 00:{habit.goal}
                </>
              )}
            </p>
          </div>
          <button
            className="bg-[rgba(255,255,255,0.10)] w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 hover:bg-[rgba(255,255,255,0.20)]"
            aria-label="Start time"
          >
            {isPlayed ? (
              <Pause size={20} onClick={() => setIsPlayed(!isPlayed)} />
            ) : (
              <Play size={20} onClick={() => setIsPlayed(!isPlayed)} />
            )}
          </button>
        </div>
        <p className="">
          Points : <span className="text-cyan-500">+{habit.xp} xp</span>
        </p>
      </div>
    </div>
  );
};

export default TimerHabitComponent;
