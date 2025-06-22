import Link from "next/link";
import React from "react";

const AddHabitButton = () => {
  return (
    <Link href="/add-habit">
      <button className="w-full sm:w-fit relative px-3 py-2 text-md font-semibold text-gray-100 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-2 border-cyan-500/30 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] hover:scale-105 transition-all duration-300 cursor-pointer active:scale-95">
        ✨ Add Habit
        <span className="absolute inset-0 bg-cyan-500/20 rounded-xl blur-md -z-10 "></span>
      </button>
    </Link>
  );
};

export default AddHabitButton;
