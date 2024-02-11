import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const initialState = {
  user: null,
  isAuthenticated: false,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.role = action.payload.role;
      // Update session storage
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("role", JSON.stringify(action.payload.role));
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.role = null;

      // Clear session storage
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("role");
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

// Select user directly from sessionStorage
export const selectUser = () => {
  const storedUser = sessionStorage.getItem("user");
  return JSON.parse(storedUser);
};

// Select isAuthenticated directly from sessionStorage
export const selectIsAuthenticated = () => {
  const storedIsAuthenticated = sessionStorage.getItem("isAuthenticated");
  return storedIsAuthenticated === "true";
};

export const selectIsAdmin = () => {
  const storedRole = sessionStorage.getItem("role");
  return storedRole === JSON.stringify("admin");
};
export default authSlice.reducer;
