"use client";

import { toggleUserDropdown } from "@/lib/store/features/userDropdown/userDropdown";
import { LayoutDashboardIcon, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/lib/store/store";
import { usePathname } from "next/navigation";
const UserDropdown = () => {
  const isDropdownOpen = useSelector(
    (state: RootState) => state.userDropdown.isDropdownOpen
  );

  const dispatch = useDispatch();
  const pathname = usePathname();

  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = async () => {
    sessionStorage.removeItem("login-toast-shown");
    await signOut({ redirectTo: "/login" });
  };

  const bgLocations = ["/add-habit"];

  useEffect(() => {
    if (!isDropdownOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const isClickedOutside = !dropDownRef.current?.contains(
        event.target as Node
      );

      if (isClickedOutside) {
        dispatch(toggleUserDropdown());
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div
      className={`absolute top-19 sm:right-32 right-4 z-50 ${
        isDropdownOpen ? "block" : "hidden"
      } h-auto w-40 ${
        bgLocations.includes(pathname) ? "bg-white/5" : ""
      } backdrop-blur-3xl rounded-md px-3 py-2`}
      ref={dropDownRef}
    >
      <div className="flex items-center gap-2 hover:cursor-pointer hover:bg-white/10 px-2 py-1 rounded-md">
        <User size={20} />
        <h1>Profile</h1>
      </div>

      <div className="divider my-1"></div>

      <Link href={"/dashboard"}>
        <div className="flex items-center gap-2  hover:cursor-pointer hover:bg-white/10 px-3 py-1 rounded-md">
          <LayoutDashboardIcon size={20} />
          <h1>Dashboard</h1>
        </div>
      </Link>

      <div className="divider my-1 sm:hidden flex"></div>

      <div
        className="sm:hidden flex items-center gap-2 hover:cursor-pointer hover:bg-white/10 px-3 py-1 rounded-md"
        onClick={() => handleLogout()}
      >
        <LogOut size={20} />
        <h1>Logout</h1>
      </div>
    </div>
  );
};

export default UserDropdown;
