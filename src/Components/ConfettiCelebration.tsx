import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

type ConfettiCelebrationProps = {
  isVisible: boolean;
};

const ConfettiCelebration: React.FC<ConfettiCelebrationProps> = ({
  isVisible,
}) => {
  const { width, height } = useWindowSize();

  if (!isVisible) return null;
  return (
    <>
      {isVisible && (
        <Confetti width={width} height={height} numberOfPieces={500} />
      )}
    </>
  );
};

export default ConfettiCelebration;
