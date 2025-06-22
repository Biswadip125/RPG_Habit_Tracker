import { JSX } from "react";
import { BookText, Dumbbell, GlassWater, Timer } from "lucide-react";
export const habitIconMap: Record<string, JSX.Element> = {
  "drink water": <GlassWater />,
  workout: <Dumbbell />,
  read: <BookText />,
  timer: <Timer size={23} />,
  default: <span>🔥</span>,
};
