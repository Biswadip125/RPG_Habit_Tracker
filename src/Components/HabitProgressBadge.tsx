import { Check, Hourglass } from "lucide-react";

type HabitProgressBadgeProps = {
  currentProgress: number;
  goal: number;
};

const HabitProgressBadge = ({
  currentProgress,
  goal,
}: HabitProgressBadgeProps) => {
  console.log("rendered");
  return currentProgress === goal ? (
    <div className="bg-cyan-950 px-3 text-sm text-green-400/90 rounded-full flex items-center justify-center ">
      <Check />
    </div>
  ) : (
    <div className="bg-cyan-950 px-3 text-sm text-white rounded-full flex items-center justify-between gap-2">
      <>
        <Hourglass size={15} className="hover:animate-spin" />
        <span className="text-sm font-semibold">Pending</span>
      </>
    </div>
  );
};

export default HabitProgressBadge;
