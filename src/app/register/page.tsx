import LoginWithProviders from "@/Components/Login/LoginWithProviders";
import RegisterForm from "@/Components/Register/RegisterForm";

const page = () => {
  return (
    <div className="flex items-center h-full w-full px-30 py-8 max-w-[1280px] mx-auto">
      <RegisterForm />
      <div className="divider md:divider-horizontal divider-vertical">OR</div>
      <LoginWithProviders />
    </div>
  );
};

export default page;
