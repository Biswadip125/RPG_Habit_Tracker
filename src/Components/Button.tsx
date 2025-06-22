import React from "react";

type buttonProps = {
  buttonText: string;
  buttonLogo: React.ReactNode;
};
const Button: React.FC<buttonProps> = ({ buttonText, buttonLogo }) => {
  return (
    <button
      className="btn relative overflow-hidden bg-gradient-to-r text-white from-cyan-500/70 to-cyan-900/80 max-w-md w-full mx-auto shadow-none hover:before:opacity-100 before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-400/70 before:to-cyan-50/50 before:opacity-0 before:transition-opacity before:duration-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-500 "
      type="submit"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <>
          {buttonText}
          {buttonLogo}
        </>
      </span>
    </button>
  );
};

export default Button;
