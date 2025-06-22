import DashboardHabits from "../DashboardHabitList/DashboardHabits";
import DashboardHeader from "../DashboardHeader";

const DashboardContent = async () => {
  return (
    <div className="h-full w-full flex flex-col gap-4 ">
      <DashboardHeader />
      <div className="flex flex-1 min-h-0 ">
        <DashboardHabits />
      </div>
    </div>
  );
};

export default DashboardContent;
