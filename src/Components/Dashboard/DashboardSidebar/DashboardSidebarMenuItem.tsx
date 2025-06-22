type DashboardSidebarMenuItemProps = {
  menuItem: string;
};

const DashboardSidebarMenuItem: React.FC<DashboardSidebarMenuItemProps> = ({
  menuItem,
}) => {
  return (
    <div className="w-full h-auto hover:bg-white/10 px-2 py-1 rounded-lg cursor-pointer transition-all duration-200 ">
      <h1 className="text-lg font-semibold">{menuItem}</h1>
    </div>
  );
};

export default DashboardSidebarMenuItem;
