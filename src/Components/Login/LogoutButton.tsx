"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleLogout = async () => {
    sessionStorage.removeItem("login-toast-shown");
    await signOut({ redirectTo: "/login" });
  };
  return (
    <button
      className="btn btn-primary sm:block hidden rounded-xl shadow-md bg-cyan-500/60 hover:scale-105 transition duration-300 active:scale-95"
      onClick={handleLogout}
    >
      Log out
    </button>
  );
};

export default LogoutButton;
