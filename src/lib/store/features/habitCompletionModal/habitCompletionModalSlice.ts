import { createSlice } from "@reduxjs/toolkit";

type HabitCompletionModalState = {
  showModal: boolean;
  currentHabitCompleted: string | null;
};

const initialState: HabitCompletionModalState = {
  showModal: false,
  currentHabitCompleted: null,
};

export const habitCompletionModalSlice = createSlice({
  name: "habitCompletionModal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.showModal = !state.showModal;
    },
    setCurrentHabitCompleted: (state, action) => {
      state.currentHabitCompleted = action.payload;
    },
  },
});

export const { toggleModal, setCurrentHabitCompleted } =
  habitCompletionModalSlice.actions;

export default habitCompletionModalSlice.reducer;
