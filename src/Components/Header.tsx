"use client";
import Image from "next/image";
import HeaderImage from "../../public/Header.png";
import { User2 } from "lucide-react";
import Link from "next/link";
import * as motion from "motion/react-client";
import LogoutButton from "./Login/LogoutButton";
import { FiSidebar } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/lib/store/features/sidebarNavigation/sidebarSlice";
import { toggleUserDropdown } from "@/lib/store/features/userDropdown/userDropdown";
const Header = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full py-3 bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-between px-4 md:px-6 border border-gray-500/30 shadow-lg backdrop-blur-sm rounded-md"
    >
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <FiSidebar
          size={22}
          className="text-cyan-500/80 2xl:hidden hover:cursor-pointer"
          onClick={() => dispatch(toggleSidebar())}
        />
        <h1 className="text-md md:text-2xl font-extrabold font-mono text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] tracking-wide ">
          RPG Habit Tracker
        </h1>

        <Image
          src={HeaderImage}
          width={40}
          height={40}
          className="hover:scale-110 transition duration-300 ease-in-out "
          alt="header-image"
        />
      </div>

      {/* Right Side */}
      <div className="flex gap-4 items-center">
        {session?.user ? (
          <div className="avatar avatar-placeholder">
            {session?.user?.image ? (
              <div className="relative xs:h-[45px] xs:w-[45px] h-[40px] w-[40px] rounded-full overflow-hidden ">
                <Image
                  src={session?.user?.image || ""}
                  alt="user-image"
                  fill
                  className="rounded-full hover:brightness-110 transition cursor-pointer sm:w-[30px] sm:h-[35px] md:w-[45px] md:h-[40px]"
                  onClick={() => dispatch(toggleUserDropdown())}
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-800 hover:brightness-110 transition cursor-pointer">
                <span className="text-gray-200/90 text-lg">
                  {session.user?.name ? session.user.name[0] : "G"}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:brightness-110 transition cursor-pointer">
            <User2
              color="#ccd0d9"
              size={28}
              className="hover:text-cyan-500 transition"
            />
          </div>
        )}

        {session?.user?.id ? (
          <LogoutButton />
        ) : (
          <Link href="/login">
            <button className="btn btn-neutral border-0 bg-cyan-500/60 rounded-xl shadow-md hover:scale-105 transition duration-300 active:scale-95 ">
              Log In
            </button>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default Header;
