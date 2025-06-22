import {
  BicepsFlexed,
  BookOpenIcon,
  Brain,
  ChartNoAxesCombined,
  HeartPulseIcon,
  Sparkles,
} from "lucide-react";
import { JSX } from "react";

export const habitCategoryIcons: Record<string, JSX.Element> = {
  Fitness: <BicepsFlexed className="text-green-400 w-4 h-4 mt-[1px]" />,
  "Self-Improvement": <Sparkles className="w-4 h-4 text-yellow-500 mt-[1px]" />,
  Learning: <BookOpenIcon className="w-4 h-4 text-blue-500 mt-[3px]" />,
  Mindset: <Brain className="w-4 h-4 text-purple-500" />,
  Health: <HeartPulseIcon className="h-4 w-4 text-pink-600" />,
  Productivity: <ChartNoAxesCombined className="h-4 w-4 text-teal-400" />,
};
