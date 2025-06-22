import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDropdownOpen: false,
};

export const userDropdownSlice = createSlice({
  name: "userDropdown",
  initialState,
  reducers: {
    toggleUserDropdown: (state) => {
      state.isDropdownOpen = !state.isDropdownOpen;
    },
  },
});

export const { toggleUserDropdown } = userDropdownSlice.actions;
export default userDropdownSlice.reducer;
