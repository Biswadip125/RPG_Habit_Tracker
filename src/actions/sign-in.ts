"use server";
import { signIn } from "@/auth";

export const logInWithGithub = async () => {
  await signIn("github", { redirectTo: "/dashboard" });
};

export const logInWithGoogle = async () => {
  await signIn("google", { redirectTo: "/dashboard" });
};
