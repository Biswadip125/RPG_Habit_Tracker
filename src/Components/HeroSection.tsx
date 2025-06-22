import Image from "next/image";
import HeroImage from "../../public/Hero_Image.png";
import * as motion from "motion/react-client";
import Link from "next/link";
const HeroSection = () => {
  return (
    <motion.div className="min-h-[calc(100vh-75px)] w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10 gap-8">
      {/* Left Content */}
      <div className="flex flex-col gap-6 max-w-xl">
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold text-cyan-300 tracking-wide drop-shadow-md"
        >
          RPG Habit Tracker
        </motion.h1>

        <motion.p
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
          className="text-gray-300 text-lg leading-relaxed"
        >
          Level up your real life by completing daily quests, building streaks,
          and unlocking rewards. Turn your habits into an adventure.
        </motion.p>

        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
        >
          <Link href={"/dashboard"}>
            <button className="btn btn-neutral bg-cyan-500/60 border-0 w-fit rounded-xl shadow-lg hover:scale-105 transition duration-300 ease-in active:scale-95">
              Get Started
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Right Side Image  */}
      <motion.div
        initial={{ x: 50, opacity: 0, scale: 0.95 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Image
          src={HeroImage} // Create or find a cool RPG/Stats Illustration
          width={500}
          height={250}
          className="drop-shadow-lg hover:scale-105 transition-all duration-400 ease-in"
          alt="hero-image"
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
