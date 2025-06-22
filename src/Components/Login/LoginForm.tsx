"use client";
import Link from "next/link";
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { motion, AnimatePresence } from "motion/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, LoginSchema } from "@/schema/loginFormSchema";
import AnimatedErrorMessage from "../AnimatedErrorMessage";
import { login } from "@/actions/login";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const { update } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    const result = await login(data);
    if (result.status === "error") {
      const { errors, formError } = result;

      if (errors) {
        Object.entries(errors).forEach(([key, messages]) => {
          setError(key as keyof LoginSchema, {
            type: "manual",
            message: messages[0],
          });
        });
      } else if (formError) {
        toast.error(formError);
      }
    } else {
      if (result.status === "success") {
        await update();
        reset();
        router.push("/dashboard");
        router.refresh();
      }
    }
  };

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      className="relative max-w-lg w-full overflow-hidden rounded-md p-[1px]"
    >
      {/* Glassmorphic Background Layer */}
      <div className="absolute inset-0 z-0 rounded-md backdrop-blur-lg bg-gradient-to-tr from-gray-800/60 to-gray-700/40 " />

      {/* Foreground Content */}
      <div className="relative z-10 p-6 border rounded-md border-gray-700 hover:border-cyan-500/30 transition-all duration-300 shadow-none hover:shadow-cyan-500/10">
        <h1 className="text-2xl font-bold text-center">
          Login <span className="text-cyan-500/90">RPG Habit Tracker</span>
        </h1>

        <form
          className="mt-10 flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            <AnimatePresence>
              {errors.password && (
                <AnimatedErrorMessage errorMessage={errors.password.message} />
              )}
            </AnimatePresence>
          </div>

          <Link href={"/register"}>
            <p className="text-center text-gray-400 hover:text-cyan-500 transition duration-500 hover:text-shadow-[0_0_20px_rgba(6,182,212,0.2)] text-shadow-none">
              Do not have an account? Register
            </p>
          </Link>

          <button
            className="btn btn-neutral bg-cyan-500/60 mt-2 shadow-none hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:bg-cyan-600/90 transition-all duration-500 ease-in-out active:scale-95"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                Please Wait
                <Loader2 className="animate-spin" />
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};
export default LoginForm;
