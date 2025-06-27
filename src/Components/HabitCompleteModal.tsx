"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/lib/store/store";
import { toggleModal } from "@/lib/store/features/habitCompletionModal/habitCompletionModalSlice";
const HabitCompleteModal = () => {
  const { showModal, currentHabitCompleted } = useSelector(
    (store: RootState) => store.habitCompletionModal
  );
  const dispatch = useDispatch();
  if (!showModal) return null;
  return (
    <dialog open className="modal modal-open ">
      <div className="modal-box text-center bg-white/10 backdrop-blur-2xl  w-84 h-50 rel">
        <h3 className="font-bold text-2xl">🎉 Congrats!</h3>
        <p className="py-4">
          You have completed:
          <strong>{currentHabitCompleted && currentHabitCompleted}</strong>
        </p>
        <div className="modal-action justify-center">
          <button
            className="btn bg-white/10 "
            onClick={() => dispatch(toggleModal())}
          >
            Awesome! Keep Doing{" "}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default HabitCompleteModal;
