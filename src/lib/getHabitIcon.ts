import { habitIconMap } from "./HabitIconMap";

export const getHabitIcon = (title: string) => {
  const normalized = title.toLowerCase();
  if (normalized.includes("water")) return habitIconMap["drink water"];
  if (
    normalized.includes("workout") ||
    normalized.includes("exercise") ||
    normalized.includes("gym")
  )
    return habitIconMap["workout"];
  if (normalized.includes("read")) return habitIconMap["read"];

  if (normalized.includes("minutes")) return habitIconMap["timer"];

  return habitIconMap["default"];
};
