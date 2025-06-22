"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
const AuthToast = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    const loginToastShown = sessionStorage.getItem("login-toast-shown");
    const logoutToastShown = sessionStorage.getItem("logout-toast-shown");
    const wasAuthenticated = sessionStorage.getItem("was-authenticated");

    if (status === "authenticated" && !loginToastShown) {
      toast.success(`Welcome ${session?.user?.name || "Adventurer"} `);
      sessionStorage.setItem("login-toast-shown", "true");
      sessionStorage.setItem("was-authenticated", "true");
      sessionStorage.removeItem("logout-toast-shown");
    }

    if (status === "unauthenticated" && wasAuthenticated && !logoutToastShown) {
      toast.success("Logged out successfully");
      sessionStorage.setItem("logout-toast-shown", "true");
      sessionStorage.removeItem("was-authenticated");
    }
  }, [status, session]);
  return null;
};

export default AuthToast;
