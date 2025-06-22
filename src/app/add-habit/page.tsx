import AddHabit from "@/Components/AddHabit/AddHabit";
import DashboardSidebar from "@/Components/Dashboard/DashboardSidebar/DashboardSidebar";
import UserDropdown from "@/Components/UserDropdown";

const page = () => {
  return (
    <div>
      <AddHabit />
      <UserDropdown />
      <DashboardSidebar />
    </div>
  );
};

export default page;
