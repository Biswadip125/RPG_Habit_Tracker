"use client";

import { getHabitIcon } from "@/lib/getHabitIcon";
import { Minus, Plus } from "lucide-react";
import HabitCategoryBadge from "./HabitCategoryBadge";
import { Habit } from "@/generated/prisma";
import { useEffect, useState } from "react";
import { counterUpdate } from "@/actions/updateActionsOfHabits/counterUpdate";
import toast from "react-hot-toast";
import ConfettiCelebration from "@/Components/ConfettiCelebration";
import {
  setCurrentHabitCompleted,
  toggleModal,
} from "@/lib/store/features/habitCompletionModal/habitCompletionModalSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import HabitProgressBadge from "@/Components/HabitProgressBadge";

type CounterHabitCardProps = {
  habit: Habit;
};

const CountHabitCard: React.FC<CounterHabitCardProps> = ({ habit }) => {
  const dispatch = useDispatch();

  const [count, setCount] = useState<number>(habit?.progress);
  const [isProgressChanged, setIsProgressChanged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isProgressChanged) return;

    const timeout = setTimeout(() => {
      setIsProgressChanged(false);
      setCount(habit.progress);
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isProgressChanged, count, habit.progress]);

  useEffect(() => {
    if (!showConfetti) return;
    const timeout = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [showConfetti]);

  const updateCounterValue = async ({
    habitId,
    count,
  }: {
    habitId: string;
    count: number;
  }) => {
    setLoading(true);
    const result = await counterUpdate({ habitId, count });

    if (result.status === "error") {
      if (
        result.errors &&
        result.errors.habitId &&
        Array.isArray(result.errors.habitId)
      ) {
        toast.error(result.errors.habitId[0]);
      } else if (
        result.errors &&
        result.errors.count &&
        Array.isArray(result.errors.count)
      ) {
        toast.error(result.errors.count[0]);
      } else {
        if (result.formError) {
          toast.error(result.formError);
        }
      }
    } else {
      if (result.status === "success") {
        setLoading(false);
        toast.success(result.message);
        if (count === habit.goal) {
          dispatch(toggleModal());
          dispatch(setCurrentHabitCompleted(habit.title));
          setShowConfetti(true);
          router.refresh();
        }
        setIsProgressChanged(false);
      }
    }
  };
  return (
    <>
      <div
        className={`bg-[rgba(255,255,255,0.03)] min-h-32 lg:w-74 md:w-65 backdrop-blur-2xl p-2 rounded-lg flex flex-col gap-2 transition-height duration-300 ${
          count === habit?.goal ? "opacity-60" : "opacity-100"
        }`}
      >
        <div className="flex items-center justify-between">
          <HabitCategoryBadge habitCategoryKey={habit.category} />

          <HabitProgressBadge currentProgress={count} goal={habit.goal ?? 0} />
        </div>
        <div className="flex flex-col gap-3  justify-center ml-2">
          <h1 className="text-2xl font-bold ">{habit.title}</h1>

          <div className="flex gap-4">
            <button
              className="bg-[rgba(255,255,255,0.10)] w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-all duration-100 hover:scale-110 hover:bg-[rgba(255,255,255,0.20)] disabled:opacity-60 disabled:hover:scale-100"
              disabled={count === 0 || count === habit?.goal}
            >
              <Minus
                onClick={() => {
                  setIsProgressChanged(true);
                  setCount(count - 1);
                }}
              />
            </button>

            <div className="flex gap-1 bg-[rgba(255,255,255,0.10)] w-24 h-8 items-center justify-center rounded-md">
              {getHabitIcon("go to gym")}
              <p className="text-lg">
                (<span>{count}</span>/{habit.goal})
              </p>
            </div>
            <button
              className="bg-[rgba(255,255,255,0.10)] w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 hover:bg-[rgba(255,255,255,0.20)] disabled:opacity-60 disabled:hover:scale-100"
              disabled={count === habit.goal}
            >
              <Plus
                onClick={() => {
                  setIsProgressChanged(true);
                  setCount(count + 1);
                }}
              />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <p className="">
              Points : <span className="text-cyan-500"> +{habit.xp} xp</span>
            </p>
            {isProgressChanged && (
              <button
                className="backdrop-blur-3xl px-6 py-1 rounded-full cursor-pointer hover:bg-white/10 transition-all duration-300 disabled:opacity-60"
                disabled={loading}
                onClick={() => updateCounterValue({ habitId: habit.id, count })}
              >
                {" "}
                {loading ? "Saving" : " Save"}
              </button>
            )}
          </div>
        </div>
      </div>
      <ConfettiCelebration isVisible={showConfetti} />
    </>
  );
};

export default CountHabitCard;
