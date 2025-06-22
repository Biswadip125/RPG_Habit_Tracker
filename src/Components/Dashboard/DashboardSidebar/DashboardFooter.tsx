"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

const DashboardFooter = () => {
  const { data: session } = useSession();
  return (
    <div className="h-12 flex items-center gap-2 hover:bg-white/10 rounded-md cursor-pointer 2xl:hidden">
      {session?.user?.image ? (
        <Image
          src={session?.user?.image || ""}
          alt="user-image"
          height={40}
          width={40}
          className="rounded-full"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-800 hover:brightness-110 transition cursor-pointer">
          <span className="text-gray-200/90 text-lg">
            {session?.user?.name ? session.user.name[0] : "G"}
          </span>
        </div>
      )}
      <h1>{session?.user?.name}</h1>
    </div>
  );
};

export default DashboardFooter;
