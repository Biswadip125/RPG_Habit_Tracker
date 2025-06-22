"use client";

import { HabitFormSchema, HabitSchema } from "@/schema/HabitFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import AnimatedErrorMessage from "../AnimatedErrorMessage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addHabit } from "@/actions/addHabit";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export const habitCategoriesMap = {
  Fitness: "fitness",
  Learning: "learning",
  "Self-improvement": "selfImprovement",
  Health: "health",
  Mindset: "mindset",
  Productivity: "productivity",
} as const;

const habitTypesMap = {
  Timer: "timer",
  Count: "count",
  Checklist: "checklist",
  Streak: "streak",
};

const habitUnitsMap = {
  Hours: "hours",
  Minutes: "minutes",
  Seconds: "seconds",
};

const AddHabit = () => {
  // const { data: session } = useSession();

  const router = useRouter();

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!session) {
  //       router.push("/login");
  //     }
  //   }, 2000);
  // }, [session, router]);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<HabitSchema>({
    resolver: zodResolver(HabitFormSchema),
    shouldUnregister: true,
    defaultValues: {
      type: "timer",
    },
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const onSubmit: SubmitHandler<HabitSchema> = async (data) => {
    if (data.type === "checklist") {
      delete data.goal;
    }
    const result = await addHabit(data);

    if (result.status === "error") {
      const { errors, formError } = result;

      if (errors) {
        Object.entries(errors).forEach(([key, messages]) => {
          setError(key as keyof HabitSchema, {
            type: "manual",
            message: messages[0],
          });
        });
      } else if (formError) {
        toast.error(formError);
      }
    } else {
      if (result.status === "success") {
        reset();
        router.push("/dashboard");
        toast.success(result.message);
      }
    }
  };

  return (
    <div className="w-full h-screen p-4">
      <Link href="/dashboard">
        <button className="btn btn-link text-white no-underline pl-0 gap-2 flex items-center justify-center">
          <FaArrowLeft /> Go back To Dashboard
        </button>
      </Link>

      <h1 className="text-2xl font-bold mb-4"> Add a New Habit</h1>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 sm:gap-10 gap-4">
          <div className="flex flex-col gap-2">
            <label
              className="text-start font-semibold text-lg"
              htmlFor="habit-title"
            >
              Title
            </label>
            <div className="relative">
              <input
                type="text"
                id="habit-title"
                placeholder="Enter your title here"
                className="input input-md w-full 
                 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                {...register("title")}
              />
              <AnimatePresence mode="wait">
                {errors.title && (
                  <AnimatedErrorMessage errorMessage={errors.title.message} />
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-start font-semibold text-lg">Type</label>
            <div className="">
              <select
                className="select w-full focus:outline-0 outline-0 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 "
                {...register("type")}
              >
                <option disabled value="" className="bg-transparent">
                  Choose a type
                </option>
                {Object.entries(habitTypesMap).map(([label, value]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <AnimatePresence mode="wait">
                {errors.type && (
                  <AnimatedErrorMessage errorMessage={errors.type.message} />
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-start font-semibold text-lg">Category</label>
            <div className="">
              <select
                className="select w-full  focus:outline-0 outline-0 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 "
                {...register("category")}
              >
                <option disabled value="" className="bg-transparent">
                  Choose a type
                </option>
                {Object.entries(habitCategoriesMap).map(([label, value]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <AnimatePresence mode="wait">
                {errors.category && (
                  <AnimatedErrorMessage
                    errorMessage={errors.category.message}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          {watch("type") !== "checklist" && (
            <div className="flex flex-col gap-2">
              <label className="text-start font-semibold text-lg">Goal</label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  placeholder="Enter your Goal here ( Ex : 5 reps/ 30 minutes)"
                  className="input input-md w-full focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                  {...register("goal", { valueAsNumber: true })}
                />
                <AnimatePresence mode="wait">
                  {errors.goal && (
                    <AnimatedErrorMessage errorMessage={errors.goal.message} />
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
          {watch("type") === "timer" && (
            <div className="flex flex-col gap-2">
              <label className="text-start font-semibold text-lg">Unit</label>
              <select
                {...register("unit")}
                className="select w-full  focus:outline-0 outline-0 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 "
              >
                <option value="">Select unit</option>
                {Object.entries(habitUnitsMap).map(([label, value]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <AnimatePresence mode="wait">
                {errors.unit && (
                  <AnimatedErrorMessage errorMessage={errors.unit.message} />
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
        <button
          className="w-full sm:w-fit px-6 py-2 btn btn-neutral bg-cyan-500/60 mt-2 shadow-none hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:bg-cyan-600/90 transition-all duration-500 ease-in-out active:scale-95 rounded-lg"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <>
              Please Wait <Loader2 className="animate-spin" />
            </>
          ) : (
            "Add Habit"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddHabit;
