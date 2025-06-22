import { habitCategoryIcons } from "@/lib/HabitCategoryIcon";
import { habitCategoriesMap } from "./HabitCard";
type habitCategoryBadgeProps = {
  habitCategoryKey: keyof typeof habitCategoriesMap;
};
const HabitCategoryBadge: React.FC<habitCategoryBadgeProps> = ({
  habitCategoryKey,
}) => {
  return (
    <div className="flex gap-2 items-center justify-start badge bg-cyan-950 rounded-full ">
      <div className=" text-sm font-semibold text-cyan-500 md:">
        Category :{" "}
        <span className="text-cyan-400">
          {habitCategoriesMap[habitCategoryKey]}
        </span>
      </div>
      {habitCategoryIcons[habitCategoriesMap[habitCategoryKey]]}
    </div>
  );
};

export default HabitCategoryBadge;
