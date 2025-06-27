import { auth } from "@/auth";
import { prisma } from "@/lib";
import * as motion from "motion/react-client";
import { LuSwords } from "react-icons/lu";
const DashboardHeader = async () => {
  const session = await auth();
  const userDetails = await prisma.user.findFirst({
    where: {
      id: session?.user?.id,
    },
  });

  return (
    <div className="flex justify-between w-full xs:flex-row flex-col xs:gap-0 gap-2">
      <div className="flex gap-2 items-center">
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl text-gray-200/90 font-mono">
          Welcome {session?.user?.name} 🖐️
        </h1>
      </div>
      <div className="flex gap-4 items-center justify-end xs:gap-0">
        <div className="flex gap-2 items-center">
          <div className="flex flex-col ">
            <div className="flex gap-2">
              <div className="sm:h-3.5 h-3 w-52 bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden">
                <motion.div
                  className="w-1/2 bg-white/80 rounded-lg h-full"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "104px", opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                ></motion.div>
              </div>
              <LuSwords
                size={17}
                className="text-cyan-400/70 drop-shadow-[0_0_4px_rgba(34,211,238,0.5)] -mt-[1px]"
              />
            </div>
            <p className="sm:text-md text-sm text-end font-semibold">
              XP: {userDetails?.xp === null ? 0 : userDetails?.xp}/100
            </p>
          </div>
          <div className="sm:w-12 sm:h-12 h-10 w-10 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center text-xl font-bold">
            {userDetails?.level === null ? 0 : userDetails?.level}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
