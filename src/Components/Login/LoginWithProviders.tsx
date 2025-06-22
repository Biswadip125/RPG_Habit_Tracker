import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import Button from "../Button";
import * as motion from "motion/react-client";
import { logInWithGithub, logInWithGoogle } from "@/actions/sign-in";

const LoginWithProviders = () => {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
      className="w-full h-full flex flex-col py-10 gap-10 justify-center"
    >
      <h1 className="text-2xl font-bold text-center">Login With Providers</h1>
      <div className="flex flex-col justify-center gap-4 ">
        <form action={logInWithGoogle}>
          <Button
            buttonText={"Login with Google"}
            buttonLogo={<FcGoogle size={20} />}
          />
        </form>
        <form action={logInWithGithub}>
          <Button
            buttonText={"Login with Github"}
            buttonLogo={<FaGithub size={20} />}
          />
        </form>
      </div>
    </motion.div>
  );
};

export default LoginWithProviders;
