import { prisma } from "@/lib";
import AddHabitButton from "./AddHabitButton";
import HabitCard from "./HabitCard";

const DashboardHabits = async () => {
  const habits = await prisma.habit.findMany();
  return (
    <div className="flex flex-col h-full w-full gap-4 ">
      <div className="flex sm:flex-row justify-between flex-col sm:gap-0 gap-2">
        <h1 className="text-2xl font-semibold font-mono flex items-center justify-center sm:justify-start">
          Your All habits ({habits.length})
        </h1>

        <AddHabitButton />
      </div>

      <div className="flex-grow overflow-y-auto h-full gap-4 lg:space-y-4  scrollbar-hide transition-all duration-500 scroll-smooth">
        <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 3xl:columns-5">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="break-inside-avoid lg:mb-4 md:mb-2 mb-4"
            >
              <HabitCard habit={habit} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHabits;
