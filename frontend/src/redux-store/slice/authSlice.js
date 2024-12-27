import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { setCookie, deleteCookie } from "./cookieUtils";
import { loginApi } from "../api/loginApi";

const initialState = {
   token: null,
   user: null,
   isLoading: false,
   error: null,
};

export const loginUser = createAsyncThunk(
   "auth/loginUser",
   async (credentials, { rejectWithValue }) => {
      try {
         const response = await loginApi(credentials);
         return response;
      } catch (error) {
         return rejectWithValue(error.message || "Login failed");
      }
   }
);

// Redux slice
const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      logoutUser: (state) => {
         state.token = null;
         state.user = null;
         deleteCookie("token");
         deleteCookie("user");
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            const { token, user } = action.payload;

            state.isLoading = false;
            state.token = token;
            state.user = user;

            if (token) setCookie("token", token);
            if (user) setCookie("user", JSON.stringify(user));
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || "Login failed";
         });
   },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
