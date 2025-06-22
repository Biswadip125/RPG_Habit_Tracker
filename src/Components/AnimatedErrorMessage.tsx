import { motion } from "motion/react";
import React from "react";
type AnimatedrrorMessageProps = {
  errorMessage: string | undefined;
};

const AnimatedErrorMessage: React.FC<AnimatedrrorMessageProps> = ({
  errorMessage,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0, y: -4 }}
      animate={{ opacity: 1, height: "auto", y: 0 }}
      exit={{ opacity: 0, height: 0, y: -4 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-orange-500/90"
      >
        {errorMessage}
      </motion.p>
    </motion.div>
  );
};

export default AnimatedErrorMessage;
