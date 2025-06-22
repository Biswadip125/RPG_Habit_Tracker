-- CreateEnum
CREATE TYPE "HabitType" AS ENUM ('count', 'checklist', 'timer', 'streak');

-- CreateEnum
CREATE TYPE "HabitCategory" AS ENUM ('fitness', 'learning', 'selfImprovement', 'health', 'mindset', 'productivity');

-- CreateTable
CREATE TABLE "Habit" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "HabitType" NOT NULL,
    "category" "HabitCategory" NOT NULL,
    "goal" INTEGER NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "xp" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
