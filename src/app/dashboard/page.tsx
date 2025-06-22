import { auth } from "@/auth";
import DashboardContent from "@/Components/Dashboard/DashboardContent/DashboardContent";
import DashboardSidebar from "@/Components/Dashboard/DashboardSidebar/DashboardSidebar";
import UserDropdown from "@/Components/UserDropdown";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();
  if (!session) redirect("/login");
  return (
    <div className="flex flex-col flex-1 h-full  w-full p-4">
      <div className="flex flex-1 min-h-0 ">
        <DashboardSidebar />

        <div className="divider ml-0 mr-2 divider-horizontal w-2 hidden 2xl:flex "></div>

        <DashboardContent />
        <UserDropdown />
      </div>
    </div>
  );
};

export default DashboardPage;
