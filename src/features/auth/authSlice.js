import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: "",
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      (state.isLoggedIn = true), (state.user = action.payload.user.username);
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      (state.isLoggedIn = false), (state.user = "");
      state.token = "";
    },
    setAutoLogin: (state, action) => {
      (state.isLoggedIn = true), (state.token = action.payload.token);
    },
  },
});

export const { setLogin, setLogout, setAutoLogin } = authSlice.actions;
export default authSlice.reducer;
