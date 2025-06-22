"use client";
import { User2 } from "lucide-react";
import Link from "next/link";
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { motion, AnimatePresence } from "motion/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormSchema,
  RegisterSchema,
} from "@/schema/registerFormSchema";
import { createAccount } from "@/actions/register";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import AnimatedErrorMessage from "../AnimatedErrorMessage";

const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterFormSchema),
  });
  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    const result = await createAccount(data);

    if (result.status === "error") {
      const { errors, formError } = result;

      if (errors) {
        Object.entries(errors).forEach(([key, messages]) => {
          setError(key as keyof RegisterSchema, {
            type: "manual",
            message: messages[0],
          });
        });
      } else if (formError) {
        toast.error(formError);
      }
    } else {
      if (result.status === "success") {
        toast.success("Account Created Successfully");
      }
      reset();
      router.push("/login");
    }
  };
  return (
    <motion.div
      layout
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      className="relative max-w-lg w-full overflow-hidden rounded-lg p-[1px]  "
    >
      <div className="absolute inset-0 z-0 backdrop-blur-lg bg-gradient-to-tr from-gray-800/60  to-gray-700/40 " />

      <div className="relative z-10 p-6 rounded-md border border-gray-700 hover:border-cyan-500/40 transition-all duration-300">
        <h1 className="text-2xl font-bold text-center ">
          Register <span className="text-cyan-500/90">RPG Habit Tracker</span>
        </h1>
        <form
          className="mt-10 flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-3">
            <label className="text-start font-semibold text-lg">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="abcd@gmail.com"
                className="input input-md w-full focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 pl-10"
                {...register("fullName")}
              />
              <User2
                className="absolute inset-y-2.5 left-2"
                size={20}
                color="gray"
              />
            </div>
            <AnimatePresence mode="wait">
              {errors.fullName && (
                <AnimatedErrorMessage errorMessage={errors.fullName.message} />
              )}
            </AnimatePresence>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-start font-semibold text-lg">Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="abcd@gmail.com"
                className="input input-md w-full focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 pl-10"
                {...register("email")}
              />
              <CiMail
                className="absolute inset-y-2.5 left-2"
                size={20}
                color="gray"
              />
            </div>
            <AnimatePresence mode="wait">
              {errors.email && (
                <AnimatedErrorMessage errorMessage={errors.email.message} />
              )}
            </AnimatePresence>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-start font-semibold text-lg">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="******"
                className="input input-md w-full focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 pl-10"
                {...register("password")}
              />
              <RiLockPasswordLine
                className="absolute inset-y-2.5 left-2"
                size={20}
                color="gray"
              />
            </div>
            <AnimatePresence mode="wait">
              {errors.password && (
                <AnimatedErrorMessage errorMessage={errors.password.message} />
              )}
            </AnimatePresence>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-start font-semibold text-lg">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="******"
                className="input input-md w-full focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 pl-10"
                {...register("confirmPassword")}
              />
              <RiLockPasswordLine
                className="absolute inset-y-2.5 left-2"
                size={20}
                color="gray"
              />
            </div>
            <AnimatePresence mode="wait">
              {errors.confirmPassword && (
                <AnimatedErrorMessage
                  errorMessage={errors.confirmPassword.message}
                />
              )}
            </AnimatePresence>
          </div>
          <Link href={"/login"}>
            <p className="text-center text-gray-400 hover:text-cyan-500 transition duration-500 hover:text-shadow-[0_0_20px_rgba(6,182,212,0.2)] text-shadow-none">
              Already have an account? Login
            </p>
          </Link>
          <button className="btn btn-neutral bg-cyan-500/60 mt-2 shadow-none hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:bg-cyan-600/90 transition-all duration-500 ease-in-out active:scale-95">
            {isSubmitting ? "Submitting" : "Login"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default RegisterForm;
