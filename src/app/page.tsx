import { auth } from "@/auth";
import HeroSection from "@/Components/HeroSection";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="">
      <HeroSection />
    </div>
  );
}
