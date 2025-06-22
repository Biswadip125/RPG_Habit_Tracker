"use client";
import { useDispatch, useSelector } from "react-redux";
import DashboardSidebarMenuItems from "./DashboardSidebarMenuItems";
import { X } from "lucide-react";
import { closeSidebar } from "@/lib/store/features/sidebarNavigation/sidebarSlice";
import DashboardFooter from "./DashboardFooter";

const DashboardSidebar = () => {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  return (
    <div
      className={`fixed top-0 left-0 z-50
    h-full  text-white
    transition-transform duration-500 ease-in-out 2xl:flex flex-col w-70 rounded-lg py-2 px-2 backdrop-blur-3xl
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    2xl:relative 2xl:translate-x-0 2xl:block ${isOpen ? "flex" : "hidden"}`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cyan-500/90">Menubar</h1>
        <X
          className="2xl:hidden block hover:cursor-pointer"
          onClick={() => dispatch(closeSidebar())}
        />
      </div>
      <div className="divider my-1"></div>
      <DashboardSidebarMenuItems />
      <DashboardFooter />
    </div>
  );
};

export default DashboardSidebar;
