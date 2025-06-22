-- CreateEnum
CREATE TYPE "HabitUnit" AS ENUM ('hours', 'minutes', 'seconds');

-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "unit" "HabitUnit";
