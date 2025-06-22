import { configureStore } from "@reduxjs/toolkit";
import { sidebarSlice } from "./features/sidebarNavigation/sidebarSlice";
import { userDropdownSlice } from "./features/userDropdown/userDropdown";

export const store = configureStore({
  reducer: {
    sidebar: sidebarSlice.reducer,
    userDropdown: userDropdownSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
