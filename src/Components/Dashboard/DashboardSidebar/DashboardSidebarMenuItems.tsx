import DashboardSidebarMenuItem from "./DashboardSidebarMenuItem";

const DashboardSidebarMenuItems = () => {
  const menuItems = ["Habit Lists", "Daliy Progress", "Shop", "Our own Habits"];
  return (
    <div className="flex flex-col flex-1 gap-4">
      {menuItems.map((item: string) => {
        return <DashboardSidebarMenuItem key={item} menuItem={item} />;
      })}
    </div>
  );
};

export default DashboardSidebarMenuItems;
