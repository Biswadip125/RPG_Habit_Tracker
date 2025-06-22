import LoginForm from "@/Components/Login/LoginForm";
import LoginWithProviders from "@/Components/Login/LoginWithProviders";
import UserDropdown from "@/Components/UserDropdown";

const LoginPage = () => {
  return (
    <div className="flex items-center h-full w-full px-30 py-28 max-w-[1280px] mx-auto">
      <LoginForm />
      <div className="divider md:divider-horizontal divider-vertical">OR</div>
      <LoginWithProviders />
      <UserDropdown />
    </div>
  );
};

export default LoginPage;
